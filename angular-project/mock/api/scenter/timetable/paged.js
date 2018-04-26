/**
 * @file 学生直播助手课表页接口 api/scenter/timetable/paged
 * @author niejianhui
 * @date 2017/08/04
 */
var mockCreatFunction = function () {
    'use strict';

    var data = {
        code: 0,
        message: '请求成功',
        error: null
    };

    data.data = {
        items: [
            {
                course: {
                    name: "篮球初级教学",
                    cover_url: "https://imgs.genshuixue.com/38515321_6d2e7tff.jpg",
                    course_type: 1,
                    course_number: "150830542912"
                },
                schedule_collect: {
                    current: 1,
                    count: 1
                },
                teacher_name: "一九八零零九",
                begin_time: "2017-08-01 20:00:00",
                end_time: "2017-08-01 22:00:00",
                live_room_params_pc: {
                    location: "http://masixun-www.test.genshuixue.com/live/lesson?room_no=150902774224",
                    token: "ODZ2djdmM3BmcGQ1NnUyZnNtcG82bzNzZzM=",
                    timestamp: 1501815461,
                    button_status: 'BEFORE'
                }
            },
            {
                course: {
                    name: "篮球高级教学",
                    cover_url: "https://imgs.genshuixue.com/38515838_pwrldj81.jpg",
                    course_type: 2,
                    course_number: "150830542912"
                },
                schedule_collect: {
                    current: 1,
                    count: 1
                },
                teacher_name: "一九八零零九",
                begin_time: "2017-08-04 12:00:00",
                end_time: "2017-08-04 15:00:00",
                live_room_params_pc: {
                    location: "http://masixun-www.test.genshuixue.com/live/lesson?room_no=150902774224",
                    token: "ODZ2djdmM3BmcGQ1NnUyZnNtcG82bzNzZzM=",
                    timestamp: 1501815461,
                    button_status: 'ING'
                }
            },
            {
                course: {
                    name: "篮球初级教学",
                    cover_url: "https://imgs.genshuixue.com/38515321_6d2e7tff.jpg",
                    course_type: 5,
                    course_number: "150830542912"
                },
                schedule_collect: {
                    current: 1,
                    count: 1
                },
                teacher_name: "一九八零零九",
                begin_time: "2017-08-04 20:00:00",
                end_time: "2017-08-04 22:00:00",
                live_room_params_pc: {
                    location: "http://masixun-www.test.genshuixue.com/live/lesson?room_no=150902774224",
                    token: "ODZ2djdmM3BmcGQ1NnUyZnNtcG82bzNzZzM=",
                    timestamp: 1501815461,
                    button_status: 'AFTER'
                }
            }
        ],
        pager: {
            has_more: null,
            next_page: 323676122,
            total: 446257288
        }
    };

    return data;
};