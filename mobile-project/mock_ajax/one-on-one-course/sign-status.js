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
            // "code": [0, 401][Math.floor(Math.random() * 2)],
            "code": 0,
            "message": "请求成功",
            "data": {
                "status": [0, 1, 2, 3][Math.floor(Math.random() * 4)]
            },
            'redirect_url': '\/static\/login?usertype=0&next=https%3A%2F%2Ftest-m.genshuixue.com%2Fwebapp%2F'
            // 'code': 990000,
            // 'message': '\u9700\u8981\u4f7f\u7528\u8001\u5e08\u8eab\u4efd\u767b\u9646',
            // 'data': {
            //     'url': '\/static\/login?usertype=0&next=https%3A%2F%2Ftest-m.genshuixue.com%2Fwebapp%2F'
            // }
        }
    };
};

/* eslint-enable fecs-camelcase */
