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
            code : 0,
            data : {
                "user_infos": [
                    {
                        "name": "黄小猛",
                        "user_id": "343483",
                        "vote_count": "398",
                        "avatar": null,
                        "talent": "网球",
                        "number": "835775478",
                        "rank": "1",
                        'has_pay': 1,
                        "url":"234243"
                    },
                    {
                        "name": "黄小猛1",
                        "user_id": "343483",
                        "vote_count": "398",
                        "avatar": null,
                        "talent": "网球",
                        "number": "835775478",
                        "rank": "1",
                        "url":"234243"
                    },
                    {
                        "name": "黄小猛2",
                        "user_id": "343483",
                        "vote_count": "398",
                        "avatar": null,
                        "talent": "网球",
                        "number": "835775478",
                        "rank": "2",
                        "url":"234243"
                    },
                    {
                        "name": "黄小猛3",
                        "user_id": "343483",
                        "vote_count": "398",
                        "avatar": null,
                        "talent": "网球",
                        "number": "835775478",
                        "rank": null,
                        "url":"234243"
                    }
                ],
                "page_info": {
                    "curr_page": 1,
                    "next_page": 2,
                    "has_more": 0
                }
            }
        }
    };
};

/* eslint-enable fecs-camelcase */
