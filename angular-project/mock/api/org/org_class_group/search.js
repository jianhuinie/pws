/**
 * @file 获取分组
 * @path /orgClassGroup/search.do
 */
var mockCreatFunction = function () {
    'use strict';

    var obj = {
        code: 0,
        error: null,
        data: []
    };

    obj.data.push({
        "id": 333,
        "name": '默认分组'
    });
    obj.data.push({
        "id": 33,
        "name": '选中我'
    });

    var i = 0;

    for (i = 0; i < 8; i++) {
        obj.data.push({
            "id": 123 + i,
            "name": '分组' + i,
        });
    }

    return obj;
};
