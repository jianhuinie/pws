/**
 * @file 把ES2015 module 转换为 amd
 * @date 2017/03/29
 */
const path = require('path');
const fs = require('fs');

const biz = require('../../tool/biz');
const writeTask = require('write');
const config = require('../config');

const baseUrl = process.cwd();
const compileName = config.COMPILE_DIR_NAME;
let outputDirName;

function generateHtml() {
    let content = biz.readFileSync(path.join(baseUrl, '_build/react/tpl/index.html'));
    const strLen = compileName.length;
    const moduleName = outputDirName.substr(outputDirName.indexOf(compileName) + strLen + 1)
    
    content = content.replace('${path}', moduleName);
    writeTask(path.join(outputDirName, 'index.html'), content, function () {});
}

function copyJs() {
    const content = biz.readFileSync(path.join(baseUrl, '_build/react/tpl/main.js'));
    writeTask(path.join(outputDirName, 'main.js'), content, function () {});
    // fs.copyFile(path.join(baseUrl, '_build/react/tpl/main.js'), path.join(outputDirName, 'main.js'), (err) => {
    //     if (err) throw err;
    // });
}

/**
 * @param {string} pagePath page.json的路径
 */
exports.init = function (pagePath) {
    outputDirName = path.dirname(pagePath).replace('/src/', '/' + compileName + '/');
    generateHtml();
    copyJs();
};
