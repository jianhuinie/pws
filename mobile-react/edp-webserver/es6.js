/**
 * @file es6文件解析解析
 * @author hurry
 * @date 2017/04/06
 */

const fs = require("fs");
const path = require("path");
const babel = require('babel-core');
const config = require('../_build/react/config');
// const baseUrl = __dirname;
const baseUrl = process.cwd();
// 不做babel处理的文件
const excludeFiles = config.BABEL.EXCLUDE_FILES;

exports.init = function () {
    return {
        location: function (request) {
            var fileName = request.pathname.substr(1);
            var extName = path.extname(fileName);
            console.log(fileName);
            if (extName === ".js" && fileName.indexOf('/spa/') > -1 && excludeFiles.indexOf(fileName) === -1) {
                return true;
            }
            return false;
        },
        handler: [
            function (context) {
                var request = context.request;
                var url = request.url;
                console.log(url);
                if (url.indexOf('/src/spa/') > -1) {
                    url = url.replace('.js', '.jsx');
                }
                var result = babel.transformFileSync(path.join(baseUrl, url));
                context.header['Content-Type'] = 'text/javascript';
                var content = result.code.replace(/\.jsx/ig, '.js');
                context.content = content;
            }
        ]
    }
};