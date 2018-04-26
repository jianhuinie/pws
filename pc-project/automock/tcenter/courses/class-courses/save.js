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
        _data: [
        {"code":991105,"data":[],"ts":1472646541,"msg":"\u7b2c1\u8282\u4e0e\u73ed\u8bfe\u300a\u627e\u5929\u534e\u770b\u4e0b\u300b\u7b2c1\u8282\u65f6\u95f4\u51b2\u7a81\uff0c\u60a8\u786e\u8ba4\u8981\u8fd9\u6837\u5417\uff1f"}
        ]
    };
};

/* eslint-enable fecs-camelcase */
