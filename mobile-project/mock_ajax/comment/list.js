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
    "data": {
        "comment_paged": {
            "items": [
                {
                    "id": "38931",
                    "score": 3.2,
                    "content": "994状态对不对哦，天回电话回电话BD本地化",
                    "thumb_count": 0,
                    "create_time": "2017-04-18 20:27:26",
                    "user": {
                        "avatar_url": "https://test-imgs.genshuixue.com/822937_gj8gzom4.jpeg",
                        "display_name": "吱吱",
                        "number": 791812058
                    },
                    "fold_comments": [
                        {
                            "id": "389312",
                            "content": "994状态对不对哦，天回电话回电话BD本地化",
                            "thumb_count": 0,
                            "create_time": "2017-04-18 20:27:26",
                            "score": 5,
                        },
                        {
                            "id": "3893133",
                            "content": "994状态对不对哦，天回电话回电话BD本地化",
                            "thumb_count": 0,
                            "create_time": "2017-04-18 20:27:26",
                            "score": 5,
                        }
                    ],
                    "reply_comments": [
                        {
                            "id": "38931",
                            "content": "994状态对不对哦，天回电话回电话BD本地化"
                        },
                        {
                            "id": "38931",
                            "content": "994状态对不对哦，天回电话回电话BD本地化"
                        }
                    ],
                    "addition_comments": [
                        {
                            "id": "38931",
                            "content": "994状态对不对哦，天回电话回电话BD本地化"
                        },
                        {
                            "id": "38931",
                            "content": "994状态对不对哦，天回电话回电话BD本地化"
                        }
                    ]
                },
                {
                    "id": "3893122234",
                    "score": 5,
                    "content": "994状态对不对哦，天回电话回电话BD本地化",
                    "thumb_count": 0,
                    "create_time": "2017-04-18 20:27:26",
                    "user": {
                        "avatar_url": "https://test-imgs.genshuixue.com/822937_gj8gzom4.jpeg",
                        "display_name": "吱吱",
                        "number": 791812058
                    },
                    "fold_comments": [
                        {
                            "id": "38931",
                            "content": "994状态对不对哦，天回电话回电话BD本地化",
                            "thumb_count": 0,
                            "create_time": "2017-04-18 20:27:26",
                            "score": 5,
                        },
                        {
                            "id": "38931",
                            "content": "994状态对不对哦，天回电话回电话BD本地化",
                            "thumb_count": 0,
                            "create_time": "2017-04-18 20:27:26",
                            "score": 5,
                        }
                    ],
                    "reply_comments": [
                        {
                            "id": "38931",
                            "content": "994状态对不对哦，天回电话回电话BD本地化"
                        },
                        {
                            "id": "38931",
                            "content": "994状态对不对哦，天回电话回电话BD本地化"
                        }
                    ],
                    "addition_comments": [
                        {
                            "id": "38931",
                            "content": "994状态对不对哦，天回电话回电话BD本地化"
                        },
                        {
                            "id": "38931",
                            "content": "994状态对不对哦，天回电话回电话BD本地化"
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
