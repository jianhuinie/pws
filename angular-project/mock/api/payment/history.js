/**
 * @file 历史购买记录
 * @path /payment/history
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
    obj.data = [
        {
            "origin_type_cn": "购买",
            "size_gb": "10G",
            "data_range": "2016-12-16至2017-12-16",
            "status_cn": "未过期",
            "create_time": "2016-12-16 10:37:13"
        },
        {
            "origin_type_cn": "购买",
            "size_gb": "10G",
            "data_range": "2016-12-16至2017-12-16",
            "status_cn": "未过期",
            "create_time": "2016-12-16 10:37:50"
        },
        {
            "origin_type_cn": "购买",
            "size_gb": "10G",
            "data_range": "2016-12-16至2017-12-16",
            "status_cn": "未过期",
            "create_time": "2016-12-16 10:38:09"
        },
        {
            "origin_type_cn": "购买",
            "size_gb": "10G",
            "data_range": "2016-12-16至2017-12-16",
            "status_cn": "未过期",
            "create_time": "2016-12-16 10:38:30"
        }
    ]

    return obj;
};
