/**
 * @file 获取用户存储空间信息
 * @path /storage/usage
 */
var mockCreatFunction = function () {
    'use strict';
    var obj = {};

    obj = {
        code: 0,
        data: null,
        error: null,
        pageDto: null
    };
    obj.data = {
        "used_size": 18977641888,
        "max_size": 10737418240
    }

    return obj;
};
