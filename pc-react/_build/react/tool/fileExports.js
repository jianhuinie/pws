const path = require('path');
const fs = require('fs');
// const stat = fs.stat;
const config = require('../config');

exports.init = function () {
    var filesPath = [];
    const fileReg = /(.+)\.htm[l]?$/ig;
    function getFileName(src) {
        var files = fs.readdirSync(src);
        if (files) {
            files.forEach(function (fileName) {
                const _src = path.resolve(src, fileName);
                const st = fs.statSync(_src);
                if (st) {
                    // 判断是否为文件
                    if (st.isFile() && _src.match(fileReg)) {
                        filesPath.push(_src);
                    } else if (st.isDirectory()) {
                        // 如果是目录则递归调用自身
                        getFileName(_src);
                    }
                }
            });
        }
    }
    getFileName(config.COMPILE_DIR);

    return filesPath;
};