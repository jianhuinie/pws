/**
 * @file get章节模式
 * wuxuelan
 */
var mockCreatFunction = function (params) {
    'use strict';
    var result = {
        code: 0,
        pageDto: null,
        error: null,
        data: {
            "chapter_mode" : 2,  // 课程模式，0：未设置 1：多节模式，2：章节模式，
            "is_modified": 1,
            "price": 0,
            "chapter_list": [   // 章节列表
                {
                    "id":0, // 章id
                    "title": "章标题",
                    "introduce": "章简介",
                    "index": 1,  // 顺序
                    "item_list":[   // 节列表
                        {
                            "section_id": 15112146000,    // 课节id
                            "index": 1,
                            "file_name": "PM100-产品经理第二节课_第1节_201603192321.mp4", // 视频文件名称
                            "video_id": "12754",    // video_id
                            "media_id": "12754",    // media_id
                            "media_status": 70,   // 转码状态(70:成功，30：转码中，50：转码失败)
                            "title": "1视频课1", // 标题
                            "type": "1",            // 付费状态标志1:免费，2:收费，3:试听
                            "introduce":"课节简介",
                        },
                        {
                            "section_id": 15112146001,    // 课节id
                            "index": 2,
                            "file_name": "PM100-产品经理第二节课_第1节_201603192321.mp4", // 视频文件名称
                            "video_id": "12754",    // video_id
                            "media_id": "12754",    // media_id
                            "media_status": 70,   // 转码状态(70:成功，30：转码中，50：转码失败)
                            "title": "1视频课2", // 标题
                            "type": "1",            // 付费状态标志1:免费，2:收费，3:试听
                            "introduce":"课节简介",
                        },
                        {
                            "section_id": 15112146002,    // 课节id
                            "index": 3,
                            "file_name": "PM100-产品经理第二节课_第1节_201603192321.mp4", // 视频文件名称
                            "video_id": "12754",    // video_id
                            "media_id": "12754",    // media_id
                            "media_status": 70,   // 转码状态(70:成功，30：转码中，50：转码失败)
                            "title": "1视频课3", // 标题
                            "type": "1",            // 付费状态标志1:免费，2:收费，3:试听
                            "introduce":"课节简介",
                        },
                        {
                            "section_id": 15112146003,    // 课节id
                            "index": 4,
                            "file_name": "PM100-产品经理第二节课_第1节_201603192321.mp4", // 视频文件名称
                            "video_id": "12754",    // video_id
                            "media_id": "12754",    // media_id
                            "media_status": 70,   // 转码状态(70:成功，30：转码中，50：转码失败)
                            "title": "1视频课4", // 标题
                            "type": "1",            // 付费状态标志1:免费，2:收费，3:试听
                            "introduce":"课节简介",
                        }
                    ]
                },
                {
                    "id":"1232", // 章id
                    "title": "章标题2",
                    "introduce": "章简介",
                    "index": 2,  // 顺序
                    "item_list":[   // 节列表
                        {
                            "section_id": 15112146004,    // 课节id
                            "index": 1,
                            "file_name": "PM100-产品经理第二节课_第1节_201603192321.mp4", // 视频文件名称
                            "video_id": "12754",    // video_id
                            "media_id": "12754",    // media_id
                            "media_status": 70,   // 转码状态(70:成功，30：转码中，50：转码失败)
                            "title": "2视频课1", // 标题
                            "type": "1",            // 付费状态标志1:免费，2:收费，3:试听
                            "introduce":"课节简介",
                        },
                        {
                            "section_id": 15112146005,    // 课节id
                            "index": 2,
                            "file_name": "PM100-产品经理第二节课_第1节_201603192321.mp4", // 视频文件名称
                            "video_id": "12754",    // video_id
                            "media_id": "12754",    // media_id
                            "media_status": 70,   // 转码状态(70:成功，30：转码中，50：转码失败)
                            "title": "2视频课2", // 标题
                            "type": "1",            // 付费状态标志1:免费，2:收费，3:试听
                            "introduce":"课节简介",
                        }
                    ]
                }
            ]
        }
    };


    return result;
};
