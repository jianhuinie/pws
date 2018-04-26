/**
 * @file 获取左导信息
 * @path /api/tcenter/nav/list
 * @author niejianhui
 */
var mockCreatFunction = function () {
    'use strict';

    var data = {
        code: 0,
        pageDto: null,
        error: null
    };

    data.data = [
        {
            "name": "课程管理",
            "url": 'http://www.genshuixue.com/teacher_center/timetable',
            "items": [
                {
                "name": "我的课表",
                "url": "http://www.genshuixue.com/teacher_center/timetable"
                },
                {
                "name": "我的课表",
                "active": true,
                "url": "http://www.genshuixue.com/teacher_center/timetable"
                },
                {
                "name": "我的课表",
                "url": "http://www.genshuixue.com/teacher_center/timetable"
                }
            ]
        },
        {
            "name": "课程管理",
            "items": [
                {
                "name": "我的课表",
                "url": "http://www.genshuixue.com/teacher_center/timetable"
                },
                {
                "name": "我的课表",
                "url": "http://www.genshuixue.com/teacher_center/timetable"
                },
                {
                "name": "我的课表",
                "url": "http://www.genshuixue.com/teacher_center/timetable"
                }
            ]
        }
    ];

    return data;
};
