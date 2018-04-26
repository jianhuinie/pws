/**
 * @file 获取用户存储空间信息
 * @path  /api/user/storageInfo
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
        max_size: 2000,
        used_size: 1000,
        user_role: 6
    }

    return obj;
};
