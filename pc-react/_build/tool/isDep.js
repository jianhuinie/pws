/**
 * Created by bjhl on 15/12/5.
 */
const path = require('path');

const util = require('./util');
const config = require('../config');
const manifest = require('./manifestEdit').getManifest();

// 判断是否在依赖包里，如果存在，则返回绝对路径
exports.isDepExist = (function () {
    // 数组转化对象
    const _lib = (function () {
        var _obj = {};
        util.each(manifest.packages, function (item) {
            if (item.name) {
                _obj[item.name] = item;
            };
        });
        return _obj;
    }());

    return function (fileName) {
        var dirname = fileName.replace(/\.[\s\S\n]*$/ig, '');
        var string = dirname.split('/');
        var libKey = string[0];
        var libValue = string[1] || '';

        if (libKey) {
            libValue = dirname.replace(libKey, '');
        }
        // 找到相应的item
        var item = _lib[libKey];
        if (item) {
            return path.join(config.projectRoot, manifest.baseUrl, item.location, libValue || item.main) + path.extname(fileName);
        }

        return false;
    };
}());