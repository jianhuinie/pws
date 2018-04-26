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
                "query_one_on_one_course": {
                    "number": "17041347571610",
                    "lesson_ways": [
                        "STUDENT",
                        "TEACHER"
                    ],
                    "categories": [
                        {
                            "name": "一年级",
                            "normal_course_id": "637486738",
                            "price_online": "4.00",
                            "price_teacher": "1.00",
                            "price_student": "3.00"
                        },
                        {
                            "name": "二年级",
                            "normal_course_id": "637486738",
                            "price_online": "40.00",
                            "price_teacher": "10.00",
                            "price_student": "30.00"
                        },
                        {
                            "name": "高考冲刺",
                            "normal_course_id": "637486738",
                            "price_online": "210.00",
                            "price_teacher": "190.00",
                            "price_student": "204.00"
                        }
                    ],
                    "teacher": {
                        "combos": [
                            {
                                "id": "163845",
                                "name": "对方方法",
                                "discount": "10",
                                "hours": "10"
                            },
                            {
                                "id": "163879",
                                "name": "&#39;222&#39;",
                                "discount": "10",
                                "hours": "20"
                            },
                            {
                                "id": "163888",
                                "name": "&#39;222&#39;",
                                "discount": "10",
                                "hours": "30"
                            }
                        ]
                    }
                }
            }
        }
    };
};

/* eslint-enable fecs-camelcase */
