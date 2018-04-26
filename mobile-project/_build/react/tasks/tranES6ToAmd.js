/**
 * @file 把ES2015 module 转换为 amd
 * @date 2017/03/29
 */
const path = require('path');
const fs = require('fs');
const config = require('../config');
const util = require('../util');

// const baseUrl = __dirname;
const baseUrl = process.cwd();
const orgDir = config.ROOT_DIR_NAME + config.SRC_DIR_NAME;
const outputDir = config.ROOT_DIR_NAME + config.COMPILE_DIR_NAME;
const srcDir = config.SRC_DIR;
// const fileObjs = {};

exports.init = function () {
    // 获取多页面的每个入口文件，用于配置中的entry
    const getEntryFiles = function (src) {
        var dirs = fs.readdirSync(src);
        var matchs = [];
        dirs.forEach(function (item) {
            matchs = item.match(/(.+)\.js[x]?$/);
            var fsPath = path.resolve(src, item);
            if (matchs) {
                const output = fsPath.replace('/spa/', '/' + config.COMPILE_DIR_NAME + '/').replace(/\.js[x]?$/, '.js');
                var key = fsPath.substr(baseUrl.length + 1);
                if (config.BABEL.EXCLUDE_FILES.indexOf(key) > -1){
                    util.copyAllFile(fsPath, output)
                    return;
                }
                try {
                    util.transEs6ToAmd(fsPath, output);
                } catch (e) {
                    console.error('【出错文件】:' + fsPath);
                    console.error('【出错信息】:' + e);
                    process.exit(1);
                }
            }
            else if (fs.statSync(fsPath).isDirectory()) {
                getEntryFiles(fsPath);
            }
        });
    };
    getEntryFiles(srcDir);
};
