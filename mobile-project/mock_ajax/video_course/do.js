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
module.exports = function(path, queryParam, postParam) {
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
                "can_access": true,
                "video": {
                    "video_id": "0",
                    "video_unique": "vu74523",
                    "user_unique": "a72978133a",
                    "player_name": "347019",
                    "check_code": "GZP6UI38zC0YKY7ssCW4KFs8dLBSau_eQ3OXqfRo7uQFcqQ8_8PjUh-BqBitRagymeJw6CXYBdc$SoCq-KoRyFU",
                    "video_play_url": "https:\/\/test.genshuixue.com\/video\/view\/12687?t=GZP6UI38zC0YKY7ssCW4KFs8dLBSau_eQ3OXqfRo7uQFcqQ8_8PjUh-BqBitRagymeJw6CXYBdc$SoCq-KoRyFU"
                },
                "set_index_result": false
            },
            "ts": 1484790490,
            "declare_config": {
                "declareTpl": ""
            }
        }
    };
};

/* eslint-enable fecs-camelcase */