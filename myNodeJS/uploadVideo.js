const fs = require('fs');
const request = require('request');
const path = require('path');
const xlsx = require('node-xlsx');


const sheets = xlsx.parse('./hasVideo.xlsx');

const hasEnrolledStudents = [];
sheets.forEach(function(sheet) {
    // 读取每行内容
    for(let rowId in sheet['data']) {
        const row = sheet['data'][rowId][0];
        hasEnrolledStudents.push(row);
    }
});

const splitSize =  1024 * 1024;
let fileCursor = 0;

let videofileList = [];
const pathUrl = './video1'
let hasErrorText = false;

const acceptTypes = ['mp4', 'mov'];

fs.unlink('./error1.txt', function (err) {
    if (err) {
        console.log('删除失败');
    }
})

const apppendFailedFile = text => {
    if (!hasErrorText) {
        hasErrorText = true;

        fs.writeFile('./error1.txt', text, { flag: 'a' }, function(err) {
            if (err) {
                console.log(`写入文件错误${err}`);
            }
        });
    }
    else {
        fs.appendFile("./error1.txt", `\n${text}` , (error)  => {
            if (error) {
                return console.log("追加文件失败" + error.message);
            }
        });
    }
}

const fileSplit = (inputFile, splitSize, fileName) => {
    console.log('文件读取切片中...');

    let fileChunkList = [];
    const fileSize = fs.statSync(inputFile).size;
    let start = 0;

    // 存取数据buffer;
    let readStream = null;
    let endFinally = 0;
    readStream = fs.createReadStream(inputFile, {highWaterMark: splitSize, start: 0, end: fileSize});

    readStream.on('data', chunk => {
        const end = start + chunk.length;
        const fileChunkItem = {
            data: chunk,
            start: start + 1,
            end: start + chunk.length,
            fileSize,
            fileName
        };
        console.log(start + 1, end, fileSize);
        start = start + chunk.length;

        fileChunkList.push(fileChunkItem);
    })

    readStream.on('close', () => {
        console.log('end,', fileSize, endFinally);
        console.log('读取流关闭');
    })


    readStream.on('end', chunk => {
        sendFileChunkList(fileChunkList, fileName, fileSize);
        readStream.close();
    })

}

const isValidVideo = (file) => {
    return acceptTypes.includes(file.split('.')[1].toLowerCase());
}

const hasEnrolled = (file) => {
    return hasEnrolledStudents.includes(file.substr(0, 11));
}

// 获取文件下所有的
const getAllFileNameList = function () {
    const fileList = fs.readdirSync(path.join(__dirname, pathUrl));
    apppendFailedFile(`${fileList.length}: 总共视频个数`);


    const hasEnrolledFileList = fileList.filter(file => isValidVideo(file) && hasEnrolled(file));
    apppendFailedFile(`${hasEnrolledFileList}: 已报名且上传视频`);

    videofileList = fileList.filter(file => isValidVideo(file) && !hasEnrolled(file));
    fileSplit(path.join(__dirname, `${pathUrl}/${videofileList[fileCursor]}`), splitSize, videofileList[fileCursor]);
}

getAllFileNameList('./video');


const sendFileChunkList = function (fileChunkList, filename, fileSize) {
    console.log('获得上传的url中...');

    const getUploadUrl = function () {
        let options = {

            url: '',
            method: "POST",
            body: JSON.stringify({
                filename,
                totalSize: fileSize
            })
        };

        const callback = function (error, response, body) {
            if (!error && response.statusCode == 200) {
                const res = JSON.parse(body);
                const {data: uploadParam} = res;

                chunkUpload(0, fileChunkList, uploadParam, filename, fileSize);
            }
        }

        request(options, callback);
    }

    getUploadUrl();
}

const startNextFile = function () {
    ++fileCursor;

    console.log('------------------------------------------------------------------');

    setTimeout(() => {
        fileSplit(path.join(__dirname, `${pathUrl}/${videofileList[fileCursor]}`), splitSize, videofileList[fileCursor]);
    }, 1000);

}


const videoBindUser = function(fileName, fid) {
    const mobile = fileName.split('.')[0];
    console.log('mobile', mobile);
    const options = {
        url: '',
        // 设置请求头
        method: "POST",
        body: JSON.stringify({
            mobile,
            fid,
            avatar: 0
        })
    };

    const callback = function(error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log('this is body');
            if (body) {
                const res = JSON.parse(body)
                const {code, msg} = res;
                console.log(msg);

                if (code === 1) {
                    // 失败, 保存错误信息下一个~
                    apppendFailedFile(`${fileName}: ${msg}`);
                } else {
                    apppendFailedFile(`${fileName}: 上传成功`);
                }

                startNextFile()

            }
        }
    }

    request(options, callback);
}

const chunkUpload = function(cursor, fileChunkList, uploadParam, filename, filesize, time = 0) {
    // console.log(fileChunkList);
    console.log(`开始上传${filename}, 正在上传第${cursor + 1}分片, 还有${fileChunkList.length - cursor - 1}`)
    const chunk = fileChunkList[cursor];
    const fileCount = fileChunkList.length;
    const options = {
        url: uploadParam.uploadUrl,
        // 设置请求头
        headers: {
            'X_FILENAME': encodeURIComponent(filename),
            'Content-Range': `bytes ${chunk.start}-${chunk.end}/${filesize}`,
            'X-Requested-With': 'XMLHttpRequest',
            'content-type': 'multipart/form-data',
        },
        method: "POST",
        body: chunk.data,
    };

    // console.log(options);

    const callback = function(error, response, body) {

        if (error) {
            console.log('Error :', error);
        }

        if (error && error.code === 'EPIPE') {
            // 退出
            process.exit(0);
        }

        if (time > 10) {

            console.log('sorry upload fail');
            apppendFailedFile(`${filename}: 上传文件失败, 接口原因`);
            return;
        }

        if (!error && response.statusCode == 200) {
            // console.log('返回值', body);
            if (body) {
                const res = JSON.parse(body);
                console.log(body);
                // 上传失败
                if (res.code === 0) {
                    ++time;
                    chunkUpload(cursor, fileChunkList, uploadParam, filename, filesize, time);
                    return;
                }
                // 此分片上传成功继续上传
                else if (res.code === 1){
                    if (cursor < fileCount - 1) {
                        console.log('继续上传');
                        setTimeout(() => {
                            chunkUpload(++cursor, fileChunkList, uploadParam, filename, filesize);
                        }, 1000);
                    }

                    // 上传整个文件完、
                    if (cursor >= fileCount - 1) {
                        console.log('绑定用户关系');
                        // 调用php 另一个接口
                        videoBindUser(filename, res.fid);
                    }
                }

                // 分片没有上传完成继续上传

            }
            else {
                console.log('上传失败, 正在重试');
                ++time;
                setTimeout(() => {
                    chunkUpload(cursor, fileChunkList, uploadParam, filename, filesize, time);
                }, 1000)
            }
        }
        return;
    }

    request(options, callback);
}


