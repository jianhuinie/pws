const fs = require('fs');
const xlsx = require('node-xlsx');


const sheets = xlsx.parse('./employees.xlsx');

const AList = [];
const BList = [];
const CList = [];

sheets.forEach(function(sheet) {
    // 读取每行内容
    for(let rowId in sheet['data']) {
        const [number = '', name = '', avatarUrl = ''] = sheet['data'][rowId];
        if (number.indexOf('A') > -1) {
            AList.push(sheet['data'][rowId]);
        } else if (number.indexOf('B') > -1) {
            BList.push(sheet['data'][rowId]);
        } else if (number.indexOf('C') > -1) {
            CList.push(sheet['data'][rowId]);
        }
    }
});
console.log(BList)
const data = [
    {
        name: 'sheet1',
        data: AList
    },
    {
        name: 'sheet2',
        data:BList
    },
    {
        name: 'sheet3',
        data: CList
    }
];

const buffer = xlsx.build(data);

// 写入文件
fs.writeFile('formalEmployee.xlsx', buffer, function(err) {
    if (err) {
        console.log("Write failed: " + err);
        return;
    }

    console.log("Write completed.");
});