/**
 * @file mock data
 * @author autoresponse
 */

/* eslint-disable fecs-camelcase */

/**
 * 获取 mock 响应数据
 *
 * @param {string} path 请求路径名
 * @param {Object} queryParam 查询参数信息
 * @param {Object} postParam post 的查询参数信息
 * @return {Object}
 */
module.exports = function (path, queryParam, postParam) {
    return {
        // 可以通过该属性来设置响应的延时，也可以设为值为'0,100'，表示随机 0-100ms 的延时，默认 0
        _timeout: 0,

        // 通过该状态来设置响应的 http 的状态码，默认 200
        _status: 200,

        // 对于要响应的 json 数据可以统一放在该字段里，也可以不使用该字段，直接跟 _xx 属性平级放
        _data: {
    "code": 0,
    "message": "请求成功",
    "data": {
        "order": {
            "subject_name": "益智",
            "min_price": "200",
            "max_price": "400",
            "lesson_way_cn_array": [
                "协商地点",
                "在线授课"
            ],
            "class_time_array": [
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                1,
                0
            ],
            "class_address": "中国某地",
            "remark": null,
            "create_time": "2017-04-06 16:16:43"
        },
        "teacher_self": {
            "timetable": [
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                1,
                0
            ],
            "distance": "5.50",
            "status": 3
        },
        "sign_teacher": {
            "recommend_teacher": {
                    "user_id": "342169",
                    "display_name": "小唐老师",
                    "vip_level": 3,
                    "home_url": "http://test-m.genshuixue.com/835527078",
                    "avatar_url_mobile": "https://imgs.genshuixue.com/headpic_woman_06.jpg",
                    "audio_url": "http://test-img.gsxservice.com/399959_d76rm1yp.mp3",
                    "sign_time": "2017-04-06 18:10:54",
                    "comment_score": "4.6",
                    "comment_count": 127,
                    "video_url": "15298"
                },
            "no_recommend_teacher": [
                {
                    "user_id": "342169",
                    "display_name": "小唐老师",
                    "vip_level": 3,
                    "home_url": "http://test-m.genshuixue.com/835527078",
                    "avatar_url_mobile": "https://imgs.genshuixue.com/headpic_woman_06.jpg",
                    "audio_url": "http://test-img.gsxservice.com/399959_d76rm1yp.mp3",
                    "sign_time": "2017-04-06 18:10:54",
                    "comment_score": "4.6",
                    "comment_count": 127,
                    "video_url": "15298"
                },
                {
                    "user_id": "346197",
                    "display_name": "黄小萌",
                    "vip_level": 0,
                    "home_url": "http://test-m.genshuixue.com/458038588",
                    "avatar_url_mobile": "https://test-imgs.genshuixue.com/783358_gk3dy411.jpeg",
                    "audio_url": null,
                    "sign_time": "2017-04-06 18:10:57",
                    "comment_score": "0.0",
                    "comment_count": 0,
                    "video_url": null
                },
                {
                    "user_id": "343717",
                    "display_name": "黄小萌",
                    "vip_level": 0,
                    "home_url": "http://test-m.genshuixue.com/835117948",
                    "avatar_url_mobile": "https://test-imgs.genshuixue.com/416332_pdczhzc0.jpeg",
                    "audio_url": null,
                    "sign_time": "2017-04-06 18:10:56",
                    "comment_score": "5.0",
                    "comment_count": 1,
                    "video_url": "17352"
                },
                {
                    "user_id": "342112",
                    "display_name": true,
                    "vip_level": 0,
                    "home_url": "http://test-m.genshuixue.com/876956828",
                    "avatar_url_mobile": "https://test-imgs.genshuixue.com/421243_wf3k6kw5.jpeg",
                    "audio_url": null,
                    "sign_time": "2017-04-06 18:10:55",
                    "comment_score": "1.0",
                    "comment_count": 1,
                    "video_url": "16840"
                },
                {
                    "user_id": "342110",
                    "display_name": "黄小萌",
                    "vip_level": 0,
                    "home_url": "http://test-m.genshuixue.com/877451078",
                    "avatar_url_mobile": "https://test-imgs.genshuixue.com/817503_yugf8wfu.jpeg",
                    "audio_url": null,
                    "sign_time": "2017-04-06 18:10:53",
                    "comment_score": "4.5",
                    "comment_count": 31,
                    "video_url": "17301"
                }
            ]
        }
    }
}
    };
};

/* eslint-enable fecs-camelcase */
