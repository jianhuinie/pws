/**
 * @file 类目搜索
 * hurry
 */
var mockCreatFunction = function () {
    'use strict';
    var types = [
        // 没有记录
        'lest',
        // 10个以下
        'less',
        // 50个以下
        'more',
        // 50以上
        'tooMuch'
    ];
    var result = {
        code: 0,
        pageDto: null,
        error: null,
        data: {
            type: types[Math.floor(Math.random() * types.length)],
            list: {}
        }
    };

    // for (var i = 0; i < Math.ceil(Math.random() * 20); i++) {
    //     result.data.list['高中' + i] = [];
    //     for (var j = 0; j < Math.ceil(Math.random() * 10); j++) {
    //         result.data.list['高中' + i].push({
    //             "1": {
    //                 "id": 266 + i + j,
    //                 "remarkName": "高中" + (i + j),
    //                 "name": "高中" + (i + j),
    //                 "level": "1"
    //             },
    //             "2": {
    //                 "id": 267 + (i + j),
    //                 "remarkName": "数学" + (i + j),
    //                 "name": "数学" + (i + j),
    //                 "level": "2"
    //             },
    //             "3": {
    //                 "id": 268  + (i + j),
    //                 "remarkName": "高中数学" + (i + j),
    //                 "name": "全部" + (i + j),
    //                 "level": "3"
    //             }
    //         });
    //     }
    // }

    // 空处理
    if (Math.random() > 0.8) {
        result.data.list = null;
    }

    return result;
};
