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
            "code": 3,
            "message": "课程信息不匹配",
            "data": [
                {
                  "number": 161029491203,
                  "name": "分期-线下课",
                  "type": 2,
                  "price": "￥0.1"
                },
                {
                  "number": 161029490563,
                  "name": "分期-直播课插班价",
                  "type": 2,
                  "price": "￥0.3"
                },
                {
                  "number": 161029490183,
                  "name": "分期-直播课",
                  "type": 1,
                  "price": "￥0.29"
                },
                {
                  "number": 161029491203,
                  "name": "分期-线下课",
                  "type": 1,
                  "price": "￥0.1"
                },
                {
                  "number": 161029490563,
                  "name": "分期-直播课插班价",
                  "type": 8,
                  "price": "￥0.3"
                },
                {
                  "number": 161029490183,
                  "name": "分期-直播课",
                  "type": 2,
                  "price": "￥0.29"
                },
                {
                  "number": 161029491203,
                  "name": "分期-线下课",
                  "type": 2,
                  "price": "￥0.1"
                },
                {
                  "number": 161029490563,
                  "name": "分期-直播课插班价",
                  "type": 2,
                  "price": "￥0.3"
                },
                {
                  "number": 161029490183,
                  "name": "分期-直播课",
                  "type": 2,
                  "price": "￥0.29"
                }
            ],
            "render": null
        }
    };
};

/* eslint-enable fecs-camelcase */
