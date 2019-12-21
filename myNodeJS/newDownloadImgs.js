const fs = require('fs');
const request = require('request');
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