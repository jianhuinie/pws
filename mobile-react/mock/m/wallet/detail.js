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
    var data = [];
    for (var i = 0; i < 10; i++) {
        data.push({
            id: i + Number(new Date()),
            type: i % 5,
            remark: `${new Date().getSeconds()}艾绘18寒假【手绘表现班】手绘表现班手绘表现班`,
            money: 1215.00,
            time: 32323232
        });
    }
    return {
        // 可以通过该属性来设置响应的延时，也可以设为值为'0,100'，表示随机 0-100ms 的延时，默认 0
        _timeout: 0,

        // 通过该状态来设置响应的 http 的状态码，默认 200
        _status: 200,

        // 对于要响应的 json 数据可以统一放在该字段里，也可以不使用该字段，直接跟 _xx 属性平级放
        _data: {
            code: 200,
            data: {
                details: data
            }
        }
    };
};

/* eslint-enable fecs-camelcase */
