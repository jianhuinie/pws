/**
 * @file 工具方法
 * @type musicode
 */

var fs = require('fs');
var path = require('path');
var crypto = require('crypto');
var util = require('amd-deploy/lib/util');
var minimatch = require('minimatch');

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
    return str.slice(8, -1).toLowerCase();
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
 * 是否是相对路径
 *
 * @param {string}  url
 * @return {boolean}
 */
exports.isRelativePath = function (path) {
    return /^[a-z0-9]/i.test(path)
        || path.indexOf('./') === 0
        || path.indexOf('../') === 0;
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
        pattern instanceof RegExp ? pattern : createPattern(pattern, 'g'),
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
    var terms = url.split('?');
    if (terms.length > 1) {
        var query = terms.pop();
        if (query && query.length > 0) {
            return url.substr(
                0,
                url.length - (query.length + 1)
            );
        }
    }
    return url;
};


/**
 * 文件路径移除扩展名
 *
 * @param {string} file
 * @return {string}
 */
exports.removeExtname = function (file) {

    var prefix = './';

    // "./a.js" 重命名为 "./a_123.js"
    // 但是 path.join('.', 'a.js') 会变成 a.js

    if (file.indexOf(prefix) !== 0) {
        prefix = '';
    }

    var extName = path.extname(file);

    var result = path.join(
        path.dirname(file),
        path.basename(file, extName)
    );

    if (prefix) {
        result = prefix + result;
    }

    return result;

};

/**
 * 改写文件名，添加 hash 后缀
 *
 * @inner
 * @param {string} file
 * @param {string} hash
 * @return {string}
 */
exports.getHashedFile = function (file, hash) {

    return exports.removeExtname(file)
         + '_'
         + hash
         + path.extname(file);

};

/**
 * 路径匹配
 *
 * @param {string} target
 * @param {Array} patterns
 * @return {boolean}
 */
exports.match = function (target, patterns) {
    var result = false;
    if (typeof patterns === 'string') {
        patterns = [ patterns ];
    }
    for (var i = 0, len = patterns.length; i < len; i++) {
        if (minimatch(target, patterns[i])) {
            result = true;
            break;
        }
    }
    return result;
};

/**
 * 计算耗时
 */
exports.benchmark = function (title) {
    var start = Date.now();
    return function () {
        var end = Date.now();
        console.log(title + ((end - start) / 1000) + 's');
    };
};