/**
 * Created by bjhl on 16/1/14.
 */
const path = require('path');
const write = require('write');

const util = require('../tool/util');
const config = require('../config');

exports.write = function (fileName, content, fun) {
    fileName = util.getFilterFileName(fileName);

    var outer = '';
    // 模板文件
    if (util.isHtml(fileName)) {
        outer = path.join(config.view, fileName);
    } else {
        // 静态资源文件
        outer = path.join(config['public'], fileName);
    }
    // console.log(outer);
    write(outer, content, function (err) {
        if (err) {
            throw new Error('writeFile:' + err);
        } else {
            fun && fun();
        }
    });
};