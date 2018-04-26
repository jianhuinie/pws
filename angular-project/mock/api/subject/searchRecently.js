/**
 * @file 最近使用类目
 * hurry
 */
var mockCreatFunction = function () {
    'use strict';
    var result = {
        code: 0,
        pageDto: null,
        error: null,
        data: []
    };

    for (var i = 0; i < 20; i++) {
        result.data.push({
            "1": {
                "id": 975 + i,
                "name": "艺术" + i,
                "remarkName": "艺术" + i,
                "level": 1,
                "parentId": 0
            },
            "2": {
                "id": 921 + i,
                "name": "体育" + i,
                "remarkName": "体育" + i,
                "level": 2,
                "parentId": 975 + i
            },
            "3": {
                "id": 897 + i,
                "name": "生活技能" + i,
                "remarkName": "生活技能" + i,
                "level": 3,
                "parentId": 921 + i
            }
        });
    }

    return result;
};
