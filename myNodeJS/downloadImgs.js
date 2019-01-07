/**
 * 批量下载图片到本地
 * https.get / http.get
 */
const fs = require('fs');
const https = require('https');
const path = require('path');


const baseUrl = './myNodeJs/downloadImgs';
const imageList = [
    'https://imgs.genshuixue.com//90512403_tb2yxlp7.jpeg',
    'https://imgs.genshuixue.com//94985754_9nv2hhba.jpeg',
    'https://imgs.genshuixue.com/47869090_v1r998ui.jpeg',
];

function doDownloadImg(url) {
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
                        const fileName = baseUrl + '/' + path.basename(url);
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
// doDownloadImg('https://imgs.genshuixue.com//90512403_tb2yxlp7.jpeg');
imageList.forEach(function(item) {
    doDownloadImg(item);
});