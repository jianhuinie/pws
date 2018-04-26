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
                "item": [
                    {
                        "lesson_way": "4",
                        "number": "121893427348927",
                        "detail_url":"http://www.baidu.com",
                        "create_time": "2017-04-06 16:16:43",
                        "subject_id": "22",
                        "min_price": "200",
                        "max_price": "400",
                        "class_time": "1",
                        "class_address": "中国某地",
                        "distance": "5.50",
                        "order_status": "5",
                        "teacher_order_status": "3",
                        "display_status": 5,
                        "subject_name": "早教益智",
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
                            0,
                            1
                        ]
                    },
                    {
                        "lesson_way": "4",
                        "create_time": "2017-04-06 16:16:43",
                        "subject_id": "22",
                        "min_price": "200",
                        "max_price": "400",
                        "class_time": "1",
                        "class_address": "中国某地",
                        "distance": "5.50",
                        "order_status": "5",
                        "teacher_order_status": "3",
                        "display_status": 0,
                        "subject_name": "早教益智",
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
                            0,
                            1
                        ]
                    },
                    {
                        "lesson_way": "4",
                        "create_time": "2017-04-06 16:16:43",
                        "subject_id": "22",
                        "min_price": "200",
                        "max_price": "400",
                        "class_time": "1",
                        "class_address": "中国某地",
                        "distance": "5.50",
                        "order_status": "5",
                        "teacher_order_status": "3",
                        "display_status": 3,
                        "subject_name": "早教益智",
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
                            0,
                            1
                        ]
                    }, {
                        "lesson_way": "4",
                        "create_time": "2017-04-06 16:16:43",
                        "subject_id": "22",
                        "min_price": "200",
                        "max_price": "400",
                        "class_time": [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        "class_address": "中国某地",
                        "distance": "5.50",
                        "order_status": "6",
                        "teacher_order_status": "4",
                        "display_status": 3
                    },
                    {
                        "lesson_way": "4",
                        "create_time": "2017-04-06 16:16:43",
                        "subject_id": "22",
                        "min_price": "200",
                        "max_price": "400",
                        "class_time": [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        "class_address": "中国某地",
                        "distance": "5.50",
                        "order_status": "6",
                        "teacher_order_status": "4",
                        "display_status": 4
                    },
                    {
                        "lesson_way": "4",
                        "create_time": "2017-04-06 16:16:43",
                        "subject_id": "22",
                        "min_price": "200",
                        "max_price": "400",
                        "class_time": [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        "class_address": "中国某地",
                        "distance": "5.50",
                        "order_status": "6",
                        "teacher_order_status": "4",
                        "display_status": 0
                    }

                ],
                "pager": {
                    "has_more": true,
                    "next_page": 2,
                    "current_page": 1,
                    "page_size": 20,
                    "total": 1
                }
            }
        }

    };
};

/* eslint-enable fecs-camelcase */
