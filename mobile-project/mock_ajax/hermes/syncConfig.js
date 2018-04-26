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
                "polling_delta": [1, 3, 5, 7, 10],
                "close_polling": 0,
                "sys_user": {
                    "cmd": {"number": 100000000, "role": 100},
                    "sys": {"number": 100000100, "role": 100},
                    "kefu": {
                        "number": 100000110,
                        "role": 7,
                        "avatar": "http:\/\/img.gsxservice.com\/0asset\/kf_im.png"
                    },
                    "kefu_proxy": {"number": 100000111, "role": 7},
                    "admin": {"number": 100000120, "role": 100},
                    "ad": {"number": 100000130, "role": 100},
                    "forum_user": {"number": 100000140, "role": 90},
                    "forum_sys": {"number": 100000150, "role": 90}
                },
                "heart_beat": {"pc": {"status": 1, "delta": 120}, "app": {"status": 1, "delta": 120}},
                "user_last_msg_id": 40010721
            },
            "ts": 1454393983
        }
    };
};

/* eslint-enable fecs-camelcase */
