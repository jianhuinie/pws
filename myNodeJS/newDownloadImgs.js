const fs = require('fs');
const request = require('request');
const  xlsx = require('node-xlsx');


const sheets = xlsx.parse('./employees.xls');

const baseUrl = '../lottery/avatars';
const imageList = [];

sheets.forEach(function(sheet) {
    // 读取每行内容
    for(let rowId in sheet['data']) {
        const [number = '', name = '', avatarUrl = ''] = sheet['data'][rowId];
        const imgUrl = `${number}---${avatarUrl}`;

        imageList.push(imgUrl);
    }
});


function doDownloadImg(url, saveName) {
    console.log(url);
    request(url).pipe(fs.createWriteStream(baseUrl + '/' + saveName));

}

imageList.forEach(function(item) {
    const employee = item.substr(0, 5);
    const employeeAvatarUrl = item.substring(8) || '';
    const saveName = employee + '.png';

    employeeAvatarUrl && doDownloadImg(employeeAvatarUrl, saveName);
});