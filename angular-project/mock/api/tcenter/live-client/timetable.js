/**
 * @file 获取直播助手老师课程
 * @path /api/tcenter/live-client/timetable
 * @author niejianhui
 */
var mockCreatFunction = function () {
    'use strict';

    var data = {
        code: 0,
        message: '请求成功',
        error: null
    };

    data.data = {
        query_teacher_timetable_live_client: [
            {
                id: "1468556393",
                begin_time: "2017-08-01 20:00:00",
                end_time: "2017-08-01 22:00:00",
                course_number: "1103540283",
                course: {
                    name: "篮球初级教学",
                    cover_url: "https://imgs.genshuixue.com/38515321_6d2e7tff.jpg",
                    type: "CLASS_COURSE"
                },
                student: {
                    display_name: 'niejianhui',
                    avatar_url: 'https://test-imgs.genshuixue.com/780065_6sj96y5a.jpeg'
                },
                live_room_params_pc: {
                    location: "http://www.genshuixue.com/live/teacher_trial?number=374614178",
                    button_status: 'BEFORE'
                }
            },
            {
                id: "1468556393",
                begin_time: "2017-08-09 11:00:0",
                end_time: "2017-08-09 12:00:00",
                course_number: "1103540283",
                course: {
                    name: "篮球高级教学",
                    cover_url: "https://imgs.genshuixue.com/38515838_pwrldj81.jpg",
                    type: "NORMAL_COURSE"
                },
                student: {
                    display_name: 'niejianhui',
                    avatar_url: 'https://test-imgs.genshuixue.com/780065_6sj96y5a.jpeg'
                },
                live_room_params_pc: {
                    location: "http://www.genshuixue.com/live/teacher_trial?number=374614178",
                    button_status: 'ING'
                }
            },
            {
                id: "1468556393",
                begin_time: "2017-08-10 20:00:00",
                end_time: "2017-08-10 22:00:00",
                course_number: "1103540283",
                course: {
                    name: "篮球初级教学",
                    cover_url: "https://imgs.genshuixue.com/38515321_6d2e7tff.jpg",
                    type: "CLASS_COURSE"
                },
                student: {
                    display_name: 'niejianhui',
                    avatar_url: 'https://test-imgs.genshuixue.com/780065_6sj96y5a.jpeg'
                },
                live_room_params_pc: {
                    location: "http://www.genshuixue.com/live/teacher_trial?number=374614178",
                    button_status: 'AFTER'
                }
            },
        ],
    };

    return data;
};
