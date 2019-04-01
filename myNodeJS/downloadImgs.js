/**
 * 批量下载图片到本地
 * https.get / http.get
 */
const fs = require('fs');
const https = require('https');
const path = require('path');


const baseUrl = './lottery/avatars';
const imageList = []

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
imageList.forEach(function(item) {
    const employeeNumber = item.substr(0, 5);
    const employeeAvatarUrl = item.substring(8) || '';
    const saveName = employeeNumber + '.jpg';
    doDownloadImg(employeeAvatarUrl, saveName);
});