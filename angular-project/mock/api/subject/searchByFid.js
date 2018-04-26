/**
 * @file 查询查询
 * hurry
 */
var mockCreatFunction = function (params) {
    'use strict';
    var result = {
        code: 0,
        pageDto: null,
        error: null,
        data: []
    };

    for (var i = 0; i < Math.ceil(Math.random() * 10); i++) {
        result.data.push({
            "id": 975 + i,
            "name": "艺术" + i,
            "remarkName": "艺术" + i,
            "level": 1,
            "parentId": params.id
        });
    }

    return result;
};
