const fs = require('fs');
const xlsx = require('node-xlsx');


const sheetsData = xlsx.parse('myNodeJS/liveClientParser/liveClient.xlsx')[0].data;
const sheetsDataLen = sheetsData.length;

console.log(sheetsData);

// 统计多少个版本的数据
let versionCount = 1;

for (let i = 2; i < sheetsDataLen; i++) {
    if (sheetsData[i + 1][0] === sheetsData[i][0]) {
        versionCount++
    }
    else {
        break;
    }

}

console.log(versionCount);

const resultData = [];

// 最多统计 10 个版本
const maxVersionCount = 8;

// 统计天数
const sumDays = 7

// 统计求和
function sumCurrentVersion(j) {
    let count = 0;

    for (let k = 0; k < sumDays; k++) {
        count += sheetsData[2 + j + k * (versionCount)][4];
    }

    return count;
}

for (let j = 0; j < maxVersionCount; j++) {
    const tempArr = [];
    tempArr[0] = sheetsData[2 + j][3];
    tempArr[1] = sumCurrentVersion(j);

    resultData.push(tempArr);
}

resultData.sort((a, b ) => b[1] - a[1]);

const resultDataLen = resultData.length;

// 计算总数
let sumDaysCount = 0;
for (let l = 0; l < resultDataLen; l++) {
    sumDaysCount += resultData[l][1];
}

console.log(sumDaysCount);

// 计算百分比
for (let m = 0; m < resultDataLen; m++) {
    resultData[m][2] = `${Number(resultData[m][1] / sumDaysCount * 100).toFixed(1)}%` ;
}



const data = [
    {
        name: 'sheet1',
        data: resultData
    }
];

const buffer = xlsx.build(data);

// 写入文件
fs.writeFile('myNodeJS/liveClientParser/result.xlsx', buffer, function(err) {
    if (err) {
        console.log("Write failed: " + err);
        return;
    }

    console.log("Write completed.");
});