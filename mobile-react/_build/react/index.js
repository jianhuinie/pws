/**
 * @file react构建入口函数
 * @author hurry
 * @date 2017/04/17
 */
var exec = require('child_process').exec;
var path = require('path');

const jsBuilder = require('./builder/js');
const cssBuilder = require('./builder/css');
const htmlBuilder = require('./builder/html');
const config = require('./config');

const baseUrl = process.cwd();

const complie = function () {
    const delDir = path.join(baseUrl, config.ROOT_DIR_NAME, config.COMPILE_DIR_NAME);
    exec('rm -rf ' + delDir, function (error) {
        if (error) {
            console.error(error);
            process.exit(1);
        } else {
            try {
                jsBuilder.init();
                cssBuilder.init();
                htmlBuilder.init();
            } catch (e) {
                console.error('【出错信息】:' + e);
                process.exit(1);
            }
        }
    });  
};

complie();

// 正常构建
exports.compile = function () {
    jsBuilder.init();
    cssBuilder.init();
    htmlBuilder.init();
};

// // 增量构建
exports.delta = function () {
    complie();
};