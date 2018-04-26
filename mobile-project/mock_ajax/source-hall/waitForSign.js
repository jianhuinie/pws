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
                "order": [
                    {
                        "distance": "5.50",
                        "number": "3128052378003",
                        "min_price": "100",
                        "max_price": "500",
                        "lesson_way_cn_array": [
                            "协商地点",
                            "在线授课",
                            "学生上门"
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
                            1,
                            0,
                            0,
                            0
                        ],
                        "class_address": "北京",
                        "remark": null,
                        "create_time": "2017-04-08 15:19:54",
                        "subject_name": "益智",
                        "detail_url": "http://test-m.genshuixue.com/source-hall/studentOrderDetail?number=3128052378003"
                    },
                    {
                        "distance": "5.50",
                        "number": "3128052582803",
                        "min_price": "100",
                        "max_price": "500",
                        "lesson_way_cn_array": [
                            "协商地点",
                            "在线授课",
                            "学生上门"
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
                            1,
                            0,
                            0,
                            0
                        ],
                        "class_address": "北京",
                        "remark": null,
                        "create_time": "2017-04-08 16:32:06",
                        "subject_name": "益智",
                        "detail_url": "http://test-m.genshuixue.com/source-hall/studentOrderDetail?number=3128052582803"
                    }
                ],
                "pager": {
                    "has_more": false,
                    "next_page": 2,
                    "current_page": 1,
                    "page_size": 20,
                    "total": 10
                }
            }
        }
    };
};

/* eslint-enable fecs-camelcase */
