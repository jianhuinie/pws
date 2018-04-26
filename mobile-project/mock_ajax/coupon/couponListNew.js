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
            "msg": "succ",
            "data": {
                "coupon_list": [
                    {
                        "serial_num": "19488966083737",
                        "effect_time": "2017.04.22",
                        "expire_time": "2017.05.22",
                        "cond_threshold": 0,
                        "balance": 1000,
                        "status_name": "已领取",
                        "status_type": "has_get",
                        "course_list": [
                            {
                                "name": "免息分期直播课",
                                "number": "170227804810",
                                "url": "http://test-m.genshuixue.com/teacher/classCourseDetail/170227804810",
                                "logo_url": "https://test-imgs.genshuixue.com/747306_e75j2mbg.png"
                            }
                        ],
                        "cond_course_type": "2",
                        "cond_limit": "可购买指定课程"
                    },
                    {
                        "serial_num": "19488966083737",
                        "effect_time": "2017.04.22",
                        "expire_time": "2017.05.22",
                        "cond_threshold": 0,
                        "balance": 1000,
                        "status_name": "已领取",
                        "status_type": "has_get",
                        "course_list": [
                            {
                                "name": "免息分期直播课",
                                "number": "170227804810",
                                "url": "http://test-m.genshuixue.com/teacher/classCourseDetail/170227804810",
                                "logo_url": "https://test-imgs.genshuixue.com/747306_e75j2mbg.png"
                            }
                        ],
                        "cond_course_type": "2",
                        "cond_limit": "可购买指定课程"
                    },
                    {
                        "serial_num": "19488966083737",
                        "effect_time": "2017.04.22",
                        "expire_time": "2017.05.22",
                        "cond_threshold": 0,
                        "balance": 1000,
                        "status_name": "已领取",
                        "status_type": "has_get",
                        "course_list": [
                            {
                                "name": "免息分期直播课",
                                "number": "170227804810",
                                "url": "http://test-m.genshuixue.com/teacher/classCourseDetail/170227804810",
                                "logo_url": "https://test-imgs.genshuixue.com/747306_e75j2mbg.png"
                            }
                        ],
                        "cond_course_type": "2",
                        "cond_limit": "可购买指定课程"
                    }
                ]
            },
            "ts": 1495182765,
            "declare_config": {
                "declareTpl": null
            }
        }
    };
};

/* eslint-enable fecs-camelcase */