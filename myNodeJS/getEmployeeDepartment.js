const fs = require('fs');
const xlsx = require('node-xlsx');


const sheets = xlsx.parse('/Users/bjhl/Workspace/pws/myNodeJS/employees.xlsx');

// 增加了 department 编号的 sheet 数据
const resultList = [];
const [resultSheet, employeeSheet, departmentSheet] = sheets;


const employeeList = [];
const employeeObj = {};


// 员工数据去重
for(let employeeRowId in employeeSheet['data']) {
    const employeeSheetRowData = employeeSheet['data'][employeeRowId];
    const displayNumber = employeeSheetRowData[0];

    if(!employeeObj[displayNumber]) {
        employeeList.push(employeeSheetRowData);
        employeeObj[displayNumber] = 1;
    }
}
// console.log(employeeList);
console.log(employeeList.length);



// 从名单数据里匹配对应的部门编号
for(let employeeRowId in employeeList) {
    // console.log(employeeSheet['data'][rowId])
    const employeeSheetRowData = employeeList[employeeRowId];
    const displayNumber = employeeSheetRowData[0];
    const department = employeeSheetRowData[6];

    for(let resultRowId in resultSheet['data']) {
        const resultSheetRowData = resultSheet['data'][resultRowId];
        const number = resultSheetRowData[2];

        if (number == displayNumber) {
            resultSheetRowData.push('' + department);
            resultList.push(resultSheetRowData);
        }
    }
}

console.log(resultSheet['data'].length);
console.log(resultList.length);


const writeResultList = [];
// 从部门数据里匹配找对应的部门
for(let  departmentRowId in departmentSheet['data']) {
    const  departmentSheetRowData =  departmentSheet['data'][ departmentRowId];
    const departmentNumber = departmentSheetRowData[0];
    const departmentName = departmentSheetRowData[1];

    for(let resultRowId in resultList) {
        const resultSheetRowData = resultList[resultRowId];
        const department = resultSheetRowData[6];

        if (department == departmentNumber) {
            // console.log(departmentName);
            resultSheetRowData.push(departmentName);
            writeResultList.push(resultSheetRowData);
        }
    }
}

// console.log(resultList);
console.log(writeResultList.length);

function getPrizeName(prizeProductName) {
    let prizeName = '犇向幸福奖';

    switch(prizeProductName) {
        case '苏泊尔榨汁杯':
            prizeName = '犇向幸福奖';
            break;

        case '小熊多功能早餐机':
        case '欧乐B电动牙刷':
        case '小度在家触屏智能音响':
        case '象印保温杯':
        case '蓓慈泡脚盆':
            prizeName = '爱而美好奖';
            break;

        case '小米空气净化器':
        case 'SK2神仙水套装':
        case '新秀丽行李箱':
            prizeName = '诗和远方奖';
            break;

        case '华为平板电脑':
        case 'bose降噪耳机':
        case '周大福纯金吊坠':
            prizeName = '牛气冲天奖';
            break;

        case 'Mac Book Air':
        case 'Mac Book Pro':
            prizeName = 'Larry 特别奖';
            break;

        default:
            prizeName = '犇向幸福奖';
    }

    return prizeName;

}

// 增加奖项名称数据
for(let writeResultIndex in writeResultList) {
    const prizeProductName = writeResultList[writeResultIndex][1];
    const prizeName = getPrizeName(prizeProductName);
    writeResultList[writeResultIndex].unshift(prizeName);
}

writeResultList.unshift(['奖项名称', '抽奖轮次', '奖品名称', '工号', '姓名', '姓名拼音', '邮箱', '部门编号', '部门名字'])

const data = [
    {
        name: 'sheet1',
        data: writeResultList
    },
];

const buffer = xlsx.build(data);

// 写入文件
fs.writeFile('./resultList.xlsx', buffer, function(err) {
    if (err) {
        console.log("Write failed: " + err);
        return;
    }

    console.log("Write completed.");
});