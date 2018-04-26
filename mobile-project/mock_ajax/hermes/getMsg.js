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
                "users": [{
                    "user_number": "709268571",
                    "user_name": "\u8bbf\u5ba2_4XXT3",
                    "area_id": "17039360",
                    "location": "\u5317\u4eac",
                    "user_role": -1,
                    "avatar": "http:\/\/img.gsxservice.com\/headpic_sexless.jpg"
                }, {
                    "user_number": 100000110,
                    "user_role": 7,
                    "avatar": "http:\/\/img.gsxservice.com\/0asset\/kf_im.png"
                }],
                "groups": [],
                "msgs": [{
                    "msg_id": "40903068",
                    "chat_t": "0",
                    "sender": "100000110",
                    "sender_r": "7",
                    "receiver": "709268571",
                    "receiver_r": "-1",
                    "msg_t": "0",
                    "create_at": 1454427999,
                    "ext": "\"\"",
                    "related_msg_id": "0",
                    "body": "{\"type\":0,\"content\":\"\u8ddf\u8c01\u5b66\u6b22\u8fce\u60a8\uff0c\u6211\u662f\u5ba2\u670d\u2f29\u79d8\u4e66\uff0c\u2f08\u5de5\u670d\u52a1\u65f6\u95f48:00-23:00\uff0c\u60a8\u53ef\u4ee5\u76f4\u63a5\u7559\u2f94\u8bf4\u660e\u9700\u6c42\u5e76\u7559\u4e0b\u8054\u7cfb\u65b9\u5f0f\uff0c\u6216\u70b9\u51fb\u4e0b\u65b9\u94fe\u63a5\u8bf4\u660e\u60a8\u7684\u9700\u6c42\uff0c\u6211\u4f1a\u7b2c\u2f00\u65f6\u95f4\u56de\u590d\u60a8\u54e6~\"}"
                }, {
                    "msg_id": "40903069",
                    "chat_t": "0",
                    "sender": "100000110",
                    "sender_r": "7",
                    "receiver": "709268571",
                    "receiver_r": "-1",
                    "msg_t": "5",
                    "create_at": 1454427999,
                    "ext": "\"\"",
                    "related_msg_id": "0",
                    "body": "{\"title\":\"\u8ddf\u8c01\u5b66-15\u5206\u949f\u5e2e\u60a8\u63a8\u8350\u597d\u8001\u5e08\",\"content\":\"\u5168\u7403\u6700\u5927\u7684\u627e\u8001\u5e08\u5e73\u53f0\uff0c15\u5206\u949f\u5e2e\u60a8\u63a8\u8350\u597d\u8001\u5e08\",\"type\":0,\"url\":\"http:\\\/\\\/m.genshuixue.com\\\/recommend\\\/fill_info?source=genshuixue\",\"thumb\":\"http:\\\/\\\/img.gsxservice.com\\\/0asset\\\/illustration.png\"}"
                }],
                "unread_number": [],
                "ops": []
            },
            "ts": 1454428001
        }
    };
};

/* eslint-enable fecs-camelcase */
