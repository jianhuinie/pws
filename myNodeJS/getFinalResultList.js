const fs = require('fs');
const xlsx = require('node-xlsx');


const sheets = xlsx.parse('/Users/bjhl/Workspace/pws/myNodeJS/resultList.xlsx');



// 增加了 department 编号的 sheet 数据
let resultList = [];
const [employeeList, resultSheet] = sheets;

// console.log(employeeList['data']);


// 从名单数据里匹配对应的部门编号
for(let employeeRowId in employeeList['data']) {
    // console.log(employeeList['data'][employeeRowId]);
    const employeeSheetRowData = employeeList['data'][employeeRowId];
    const displayNumber = employeeSheetRowData[3];
    const department = employeeSheetRowData[8];

    for(let resultRowId in resultSheet['data']) {
        const resultSheetRowData = resultSheet['data'][resultRowId];
        const number = resultSheetRowData[3];

        if (number == displayNumber) {
            resultSheetRowData.push('' + department);
            // resultList.push(resultSheetRowData);
        }
    }
    resultList = resultSheet['data'];
}

// console.log(resultSheet['data'].length);
console.log(resultList.length);



// console.log(resultList);
// console.log(resultList.length);

const data = [
    {
        name: 'sheet1',
        data: resultList
    },
];

const buffer = xlsx.build(data);

// 写入文件
fs.writeFile('./finalResultList.xlsx', buffer, function(err) {
    if (err) {
        console.log("Write failed: " + err);
        return;
    }

    console.log("Write completed.");
});