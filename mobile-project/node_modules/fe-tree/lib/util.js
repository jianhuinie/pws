/**
 * @file 工具方法
 * @type musicode
 */

var fs = require('fs');
var path = require('path');
var crypto = require('crypto');
var util = require('amd-deploy/lib/util');

exports.each = util.each;
exports.merge = util.merge;
exports.extend = util.extend;
exports.generateCode = util.generateCode;

/**
 * 获取对象的类型
 *
 * @param {*} obj
 * @return {string}
 */
exports.type = function (obj) {
    var str = Object.prototype.toString.call(obj);
    return type.slice(8, -1).toLowerCase();
};

/**
 * 读取 json 数据
 *
 * @param {string} file
 * @return {Object?}
 */
exports.readJSON = function (file) {

    var json;

    try {
        json = fs.readFileSync(file).toString();
        json = JSON.parse(json);
    }
    catch (e) {
        json = null;
    }

    return json;

};

/**
 * 持久化 json 数据
 *
 * @param {string} file
 * @param {Object|Array} json
 */
exports.writeJSON = function (file, json) {
    try {
        fs.writeFileSync(
            file,
            JSON.stringify(json, null, 4)
        );
    }
    catch (e) {

    }
};

/**
 * 计算 md5
 *
 * @param {Buffer} buffer
 * @return {string}
 */
exports.md5 = function (buffer) {
    var hash = crypto.createHash('md5');
    return hash.update(buffer).digest('hex').slice(0, 10);
};

/**
 * 是否是绝对路径
 *
 * @param {string}  url
 * @return {boolean}
 */
exports.isAbsoluteUrl = function (url) {
    return /^(?:https?|data|javascript):/i.test(url);
};

/**
 * 正则替换
 *
 * @param {string} content
 * @param {string} pattern
 * @param {string|Function} replacement
 * @return {string}
 */
exports.replace = function (content, pattern, replacement) {
    return content.replace(
        createPattern(pattern, 'g'),
        replacement
    );
};

/**
 * 创建一个正则表达式
 *
 * @inner
 * @param {string} pattern
 * @param {string} flags
 * @return {RegExp}
 */
function createPattern(pattern, flags) {
    pattern = pattern.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
    return flags
         ? new RegExp(pattern, flags)
         : new RegExp(pattern);
}

/**
 * 清掉 url 的 query 后缀
 *
 * @param {string} url
 * @return {string}
 */
exports.cleanQuery = function (url) {
    var query = path.extname(url).split('?')[1];
    if (query && query.length > 0) {

        return url.substr(
            0,
            url.length - (query.length + 1)
        );
    }
    return url;
};

