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
                "comment_paged": {
                    "items": [
                        {
                            "id": "2",
                            "score": 5,
                            "content": "好评",
                            "thumb_count": 0,
                            "create_time": "2015-11-02 10:13:23",
                            "user": {
                                "avatar_url": "http://test-img.gsxservice.com/741990_6kl0nera.jpeg",
                                "display_name": "发放更好",
                                "number": 875074348
                            },
                            "fold_comments": [
                                {
                                    "id": "1",
                                    "content": "范冰冰冰",
                                    "score": 5,
                                    "thumb_count": 0,
                                    "create_time": "2015-11-02 10:13:23",
                                }
                            ],
                            "reply_comments": [
                                {
                                    "id": "3",
                                    "content": "范冰冰冰"
                                }
                            ],
                            "addition_comments": [
                                {
                                    "id": "5",
                                    "content": "g?g?2222"
                                }
                            ]
                        },{
                            "id": "2",
                            "score": 3.4,
                            "content": "好评",
                            "thumb_count": 0,
                            "create_time": "2015-11-02 10:13:23",
                            "user": {
                                "avatar_url": "http://test-img.gsxservice.com/741990_6kl0nera.jpeg",
                                "display_name": "发放更好",
                                "number": 875074348
                            },
                            "fold_comments": [
                                {
                                    "id": "1",
                                    "content": "范冰冰冰",
                                    "score": 4.2,
                                    "thumb_count": 0,
                                    "create_time": "2015-11-02 10:13:23",
                                },
                                {
                                    "id": "1",
                                    "content": "范冰冰冰",
                                    "score": 4.1,
                                    "thumb_count": 0,
                                    "create_time": "2015-11-02 10:13:23",
                                },
                                {
                                    "id": "1",
                                    "content": "范冰冰冰",
                                    "score": 3.2,
                                    "thumb_count": 0,
                                    "create_time": "2015-11-02 10:13:23",
                                }
                            ],
                            "reply_comments": [
                                {
                                    "id": "3",
                                    "content": "范冰冰冰"
                                }
                            ],
                            "addition_comments": [
                                {
                                    "id": "5",
                                    "content": "g?g?2222"
                                }
                            ]
                        }
                    ],
                    "pager": {
                        "has_more": true,
                        "next_page": 2,
                        "current_page": 1,
                        "total": 1
                    }
                }
            }
        }
    };
};

/* eslint-enable fecs-camelcase */
