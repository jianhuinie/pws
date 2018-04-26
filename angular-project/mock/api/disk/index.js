/**
 * @file 获取资料库列表
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
        "path_list": [
            {
                "name": "一级文件夹",
                "path": "/system/video/aaa",
                "items": [
                    {
                        "name": "视频库",
                        "path": "",
                    }
                ]
            },
            {
                "name": "二级文件夹",
                "path": "/system/video/bbb",
                "items": [
                    {
                        "name": "视频库",
                        "path": "",
                    }
                ]
            }
        ],
        "used_size": 10684266000,
        "max_size": 53687091200
    };
    return obj;
}