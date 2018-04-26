const gaze = require('gaze');
const path = require('path');

const config = require('../config');
const util = require('../util');
const generateTpl = require('../tasks/generateTpl');


// Also accepts an array of patterns 
console.log('监听开始');
gaze('**/*', { cwd: config.SRC_DIR }, function () {
    // Get all watched files 
    this.on('all', function (event, filePath) {
        if (filePath.indexOf(config.COMPILE_DIR_NAME) > -1) {
            return;
        }
        if (event === 'deleted') {
            console.log('deleted:' + filePath);
            util.delFile(filePath);
            return;
        }
        
        // if (event === 'added' && filePath.indexOf('page.json') > -1) {
        //     generateTpl.init(filePath);
        //     return;
        // }
        if (filePath.indexOf('page.json') > -1) {
            if (event === 'added') {
                generateTpl.init(filePath);
            }
            return;
        }
        console.log('update:' + filePath);
        if (['.jsx'].indexOf(path.extname(filePath)) > -1) {
            util.transEs6ToAmd(filePath);
            return;
        }
        console.log(filePath);
        util.copyAllFile(filePath);
    });
});

// gaze('**/*', { cwd: config.SRC_DIR }, function () {
//     this.on('added', function (filepath) {
//         console.log(filepath + ' was added');
//     });
// });

process.on('uncaughtException', function () {
    console.log('发生异常了，告诉进程重启服务');
    // 改动，发送自杀信号
    process.send({
        act: 'suicide'
    });
    setTimeout(function () {
        process.exit(1);
    }, 100);
});