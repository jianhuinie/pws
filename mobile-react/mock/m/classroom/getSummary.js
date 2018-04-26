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
            code: 200,
            data: {
                headUrl: 'https://imgs.genshuixue.com/0cms/d/file/content/2017/12/5a44cfc38ca62.png',
                name: '的端口打开了都看得到打开了都看得到打开了都看得到打开了都看得到',
                yesterdayFollowers: 1234,
                totalFollowers: 1234,
                yesterdayIncome: 123.50,
                authStatus: 0
            }
        }
    };
};

/* eslint-enable fecs-camelcase */
