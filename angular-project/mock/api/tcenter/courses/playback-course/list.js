/**
 * @file 获取老师直播回放课程列表
 * @path /api/tcenter/courses/playback-course/list
 * @author niejianhui
 */
var mockCreatFunction = function() {
    'use strict';

    var data = {
        code: 0,
        pageDto: null,
        error: null
    };

    data.data = {
        "courses": [
            {
                "number": '170509803931',
                "course_type": 2,
                "name": '云端回云端回放1云端回放1放1',
                "playback_end_day": "2017-05-23",
                "playback_expire_day": 10,
                "create_time": "2017-05-23",
                "begin_time": "2017-08-21 19:40:00",
                "end_time": "2017-08-29 16:00:00",
                "playback_status": 1,
                "user": {
                        "avatar_url": "https://test-imgs.genshuixue.com/3366_8lkracyi.png",
                        "display_name": "一下次出差刚刚好测得恐龙妹龙膜咯哦哦哦哦",
                        "number": 539548408
                 },
                "cover_url": "http://img.gsxservice.com/29907295_9oj221wb.jpeg",
                "schedules": [
                    {
                        "schedule_id": "121888",
                        "index": 1,
                        "schedule_name": "第1节",
                        "begin_time": "2017-05-09 11:30",
                        "end_time": "2017-05-09 15:30",
                        "playback_id": "1118",
                        "media_expire": "2017-05-19",
                        "media_status": "70",
                        "verify_status": "3",
                        "room_no": 34568765432,
                        "verify_outer_reasons": {
                            "id": 921,
                            "name": "未知字段",
                            "reasons": [
                                "视频中有广告",
                                "视频来源不真实"
                            ]
                        },
                        "cloud_playback_url": "http://test.genshuixue.com/live/playback?classid=17050970714664",
                        "video_course_url": "http://test.genshuixue.com/live/playback?classid=17050970714664",
                        "video_item_exist": 1,
                        "actions": [
                            {
                                "name": '预览',
                                "action":  'PREVIEW'
                            },
                            {
                                "name": '已转视频课',
                                "disable": true,
                                "action":  'CONVERT_VIDEO'
                            },
                            {
                                "name": '更换回放视频',
                                "action":  'REPLACE_VIDEO'
                            }
                        ]
                    },
                    {
                        "schedule_id": "121889",
                        "schedule_name": "第2节第2节第2节第2节第2节第2节第2节第2节第2节",
                        "begin_time": "2017-05-09 18:00",
                        "end_time": "2017-05-10 15:30",
                        "playback_id": "1125",
                        "index": 2,
                        "verify_status": "5",
                        "verify_outer_reasons": null,
                        "media_expire": "2017-05-19",
                        "media_status": "30",
                        "room_no": 34568765432,
                        "cloud_playback_url": "http://test.genshuixue.com/live/playback?classid=17050970716712",
                        "video_course_url": "http://test.genshuixue.com/live/playback?classid=17050970716712",
                        "video_item_exist": 0,
                        "actions": [
                            {
                                "name": '预览',
                                "action":  'PREVIEW'
                            },
                            {
                                "name": '查看视频课',
                                "action":  'VIEW_VIDEO'
                            },
                            {
                                "name": '补传回放视频',
                                "action":  'SUPPLY_VIDEO'
                            }
                        ]
                    }
                ]
            },
            {
                "number": '170509803931',
                "course_type": 2,
                "name": '云端回云端回放1云端回放1放1',
                "playback_end_day": "2017-05-23",
                "playback_expire_day": 10,
                "create_time": "2017-05-23",
                "begin_time": "2017-08-21 19:40:00",
                "end_time": "2017-08-29 16:00:00",
                "playback_status": 1,
                "user": {
                        "avatar_url": "https://test-imgs.genshuixue.com/3366_8lkracyi.png",
                        "display_name": "丁泽",
                        "number": 539548408
                 },
                "cover_url": "http://img.gsxservice.com/29907295_9oj221wb.jpeg",
                "schedules": [
                    {
                        "schedule_id": "121888",
                        "index": 1,
                        "schedule_name": "第1节",
                        "begin_time": "2017-05-09 11:30",
                        "end_time": "2017-05-09 15:30",
                        "playback_id": "1118",
                        "media_expire": "2017-05-19",
                        "media_status": "70",
                        "verify_status": "3",
                        "room_no": 34568765432,
                        "verify_outer_reasons": {
                            "id": 921,
                            "name": "未知字段",
                            "reasons": [
                                "视频中有广告",
                                "视频来源不真实"
                            ]
                        },
                        "cloud_playback_url": "http://test.genshuixue.com/live/playback?classid=17050970714664",
                        "video_course_url": "http://test.genshuixue.com/live/playback?classid=17050970714664",
                        "video_item_exist": 1,
                        "actions": [
                            {
                                "name": '预览',
                                "action":  'PREVIEW'
                            },
                            {
                                "name": '已转视频课',
                                "disable": true,
                                "action":  'CONVERT_VIDEO'
                            },
                            {
                                "name": '更换回放视频',
                                "action":  'REPLACE_VIDEO'
                            }
                        ]
                    },
                    {
                        "schedule_id": "121889",
                        "schedule_name": "第2节第2节第2节第2节第2节第2节第2节第2节第2节",
                        "begin_time": "2017-05-09 18:00",
                        "end_time": "2017-05-09 15:30",
                        "playback_id": "1125",
                        "index": 2,
                        "verify_status": "5",
                        "verify_outer_reasons": null,
                        "media_expire": "2017-05-19",
                        "media_status": "70",
                        "room_no": 34568765432,
                        "cloud_playback_url": "http://test.genshuixue.com/live/playback?classid=17050970716712",
                        "video_course_url": "http://test.genshuixue.com/live/playback?classid=17050970716712",
                        "video_item_exist": 0,
                        "actions": [
                            {
                                "name": '预览',
                                "action":  'PREVIEW'
                            },
                            {
                                "name": '查看视频课',
                                "action":  'VIEW_VIDEO'
                            },
                            {
                                "name": '更换回放视频',
                                "action":  'REPLACE_VIDEO'
                            }
                        ]
                    }
                ]
            },
            {
                "number": '170509803931',
                "course_type": 2,
                "name": '云端回云端回放1云端回放1放1',
                "playback_end_day": "2017-05-23",
                "playback_expire_day": 10,
                "create_time": "2017-05-23",
                "begin_time": "2017-08-21 19:40:00",
                "end_time": "2017-08-29 16:00:00",
                "playback_status": 1,
                "user": {
                        "avatar_url": "https://test-imgs.genshuixue.com/3366_8lkracyi.png",
                        "display_name": "丁泽",
                        "number": 539548408
                 },
                "cover_url": "http://img.gsxservice.com/29907295_9oj221wb.jpeg",
                "schedules": [
                    {
                        "schedule_id": "121888",
                        "index": 1,
                        "schedule_name": "第1节",
                        "begin_time": "2017-05-09 11:30",
                        "end_time": "2017-05-09 15:30",
                        "playback_id": "1118",
                        "media_expire": "2017-05-19",
                        "media_status": "70",
                        "verify_status": "3",
                        "room_no": 34568765432,
                        "verify_outer_reasons": {
                            "id": 921,
                            "name": "未知字段",
                            "reasons": [
                                "视频中有广告",
                                "视频来源不真实"
                            ]
                        },
                        "cloud_playback_url": "http://test.genshuixue.com/live/playback?classid=17050970714664",
                        "video_course_url": "http://test.genshuixue.com/live/playback?classid=17050970714664",
                        "video_item_exist": 1,
                        "actions": [
                            {
                                "name": '预览',
                                "action":  'PREVIEW'
                            },
                            {
                                "name": '已转视频课',
                                "disable": true,
                                "action":  'CONVERT_VIDEO'
                            },
                            {
                                "name": '更换回放视频',
                                "action":  'REPLACE_VIDEO'
                            }
                        ]
                    },
                    {
                        "schedule_id": "121889",
                        "schedule_name": "第2节第2节第2节第2节第2节第2节第2节第2节第2节",
                        "begin_time": "2017-05-09 18:00",
                        "end_time": "2017-05-09 15:30",
                        "playback_id": "1125",
                        "index": 2,
                        "verify_status": "5",
                        "verify_outer_reasons": null,
                        "media_expire": "2017-05-19",
                        "media_status": "70",
                        "room_no": 34568765432,
                        "cloud_playback_url": "http://test.genshuixue.com/live/playback?classid=17050970716712",
                        "video_course_url": "http://test.genshuixue.com/live/playback?classid=17050970716712",
                        "video_item_exist": 0,
                        "actions": [
                            {
                                "name": '预览',
                                "action":  'PREVIEW'
                            },
                            {
                                "name": '查看视频课',
                                "action":  'VIEW_VIDEO'
                            },
                            {
                                "name": '更换回放视频',
                                "action":  'REPLACE_VIDEO'
                            }
                        ]
                    }
                ]
            },
            
        ],
        "pager": {
            "has_more": false,
            "next_page": 2,
            "current_page": 1,
            "page_size": 20,
            "total": 50
        }
    };

    return data;
};