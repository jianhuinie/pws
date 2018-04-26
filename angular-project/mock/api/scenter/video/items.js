/**
 * @file 学生直播助手我的视频课接口 /api/scenter/video/paged
 * @author niejianhui
 * @date 2017/11/28
 */
var mockCreatFunction = function () {
    'use strict';

    var data = {
        code: 0,
        message: '请求成功',
        error: null
    };

    data.data = {
        "list": [
            // {
            //     "index": "1",
            //     "section_id": "17092182710",
            //     "title": "2",
            //     "display_time": "7秒"
            // }
        ],
        "list_chapter": [
            {
                "title": "是你的快递杰尼索夫卡文迪什 v",
                "index": 0,
                "item_list": [
                    {
                        "index": "2",
                        "section_id": "17101044721",
                        "title": "第一节可试听",
                        "display_time": "5分钟"
                    }
                ]
            },
            {
                "title": "你时刻菲尼克斯分快",
                "index": 1,
                "item_list": [
                    {
                        "index": "1",
                        "section_id": "17101044713",
                        "title": "第二节不可试听",
                        "display_time": "1分钟"
                    }
                ]
            }
        ]
    };

    return data;
};