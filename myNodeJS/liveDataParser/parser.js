const fs = require('fs');
const xlsx = require('node-xlsx');


const sheetsData = xlsx.parse('myNodeJS/liveDataParser/liveData.xlsx')[0].data;

console.log(sheetsData);

const resultData = [
    ['直播首帧时间 Win', `${sheetsData[7][0]}s(${sheetsData[2][0]}s)`],
    ['直播首帧时间 Mac', `${sheetsData[8][0]}s(${sheetsData[3][0]}s)`],
    ['直播首帧时间 Andr', `${sheetsData[5][0]}s(${sheetsData[0][0]}s)`],
    ['直播首帧时间 Ios', `${sheetsData[6][0]}s(${sheetsData[1][0]}s)`],
    ['直播首帧时间 Msite', `${sheetsData[9][0]}s(${sheetsData[4][0]}s)`],

    ['直播时均卡顿次数 Win', `${sheetsData[7][4]}(${sheetsData[2][4]})`],
    ['直播时均卡顿次数 Mac', `${sheetsData[8][4]}(${sheetsData[3][4]})`],
    ['直播时均卡顿次数 Andr', `${sheetsData[5][4]}(${sheetsData[0][4]})`],
    ['直播时均卡顿次数 Ios', `${sheetsData[6][4]}(${sheetsData[1][4]})`],
    ['直播时均卡顿次数 Msite', `${sheetsData[9][4]}(${sheetsData[4][4]})`],

    ['回放视频首帧时间 Win', `${sheetsData[16][0]}s(${sheetsData[12][0]}s)`],
    ['回放视频首帧时间 Mac', `${sheetsData[17][0]}s(${sheetsData[13][0]}s)`],
    ['回放视频首帧时间 Andr', `${sheetsData[14][0]}s(${sheetsData[10][0]}s)`],
    ['回放视频首帧时间 Ios', `${sheetsData[15][0]}s(${sheetsData[11][0]}s)`],

    ['回放视频时均卡顿次数 Win', `${sheetsData[16][4]}(${sheetsData[12][4]})`],
    ['回放视频时均卡顿次数 Mac', `${sheetsData[17][4]}(${sheetsData[13][4]})`],
    ['回放视频时均卡顿次数 Andr', `${sheetsData[14][4]}(${sheetsData[10][4]})`],
    ['回放视频时均卡顿次数 Ios', `${sheetsData[15][4]}(${sheetsData[11][4]})`],
];

const data = [
    {
        name: 'sheet1',
        data: resultData
    }
];

const buffer = xlsx.build(data);

// 写入文件
fs.writeFile('myNodeJS/liveDataParser/result.xlsx', buffer, function(err) {
    if (err) {
        console.log("Write failed: " + err);
        return;
    }

    console.log("Write completed.");
});