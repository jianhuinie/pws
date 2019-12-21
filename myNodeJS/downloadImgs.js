/**
 * 批量下载图片到本地
 * https.get / http.get
 */
const fs = require('fs');
const https = require('https');
const  xlsx = require('node-xlsx');


const sheets = xlsx.parse('./employees.xls');

const baseUrl = './lottery/avatars';
const imageList = [];

sheets.forEach(function(sheet) {
    // 读取每行内容
    for(let rowId in sheet['data']) {
        // console.log(sheet['data'][rowId]);
        const [number = '', name = '', avatarUrl = ''] = sheet['data'][rowId];
        const imgUrl = `${number}---${avatarUrl}`;
        // console.log(imgUrl);

        imageList.push(imgUrl);
    }
});



function doDownloadImg(url, saveName) {
    https
        .get(url, (res) => {
            const { statusCode } = res;
            let error;
            if (statusCode !== 200) {
                error = new Error('Request Failed.\n' +
                                `Status Code: ${statusCode}`);
            }
            if (error) {
                console.error(error.message);
                res.resume();
                return;
            }

            // buffer + appendFile方式写入
            // res.setEncoding('utf8'); 不需要设置encooding
            let imageBuffer = [];
            res.on('data', (chunk) => {
                const buffer = new Buffer(chunk)
                imageBuffer.push(buffer);
            });

            res.on('end', () => {
                try {
                        const fileName = baseUrl + '/' + saveName;
                        const totalBuff = Buffer.concat(imageBuffer);
                        fs.appendFile(fileName, totalBuff, function(err){
                            console.log(err);
                        });
                    }
                catch (e) {
                    console.error(e.message);
                }
            });
        })
        .on('error', (e) => {
            console.error(`Got error: ${e.message}`);
        });
}

doDownloadImg('https://ehr.baijiahulian.com/GET/file/file.json?file=02609ace-8a26-46f2-936d-31fbec123e0a.png', 'A9107.png');

// imageList.forEach(function(item) {
//     const employee = item.substr(0, 5);
//     const employeeAvatarUrl = item.substring(8) || '';
//     const saveName = employee + '.png';
//     console.log(employeeAvatarUrl, saveName);
//     doDownloadImg(employeeAvatarUrl, saveName);
// });