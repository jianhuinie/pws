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
        _data: {"code":0,"data":[{"id":36,"path_crumbs":"\u5b66\u524d>\u5e7c\u513f\u56ed>\u6570\u5b66"},{"id":110,"path_crumbs":"\u5c0f\u5b66>\u6570\u5b66>\u4e00\u5e74\u7ea7"},{"id":923,"path_crumbs":"\u4f53\u80b2>\u8fd0\u52a8>\u7fbd\u6bdb\u7403"},{"id":928,"path_crumbs":"\u4f53\u80b2>\u8fd0\u52a8>\u6e38\u6cf3"},{"id":977,"path_crumbs":"\u827a\u672f>\u5668\u4e50>\u94a2\u7434"},{"id":978,"path_crumbs":"\u827a\u672f>\u5668\u4e50>\u5409\u4ed6"},{"id":979,"path_crumbs":"\u827a\u672f>\u5668\u4e50>\u53e4\u7b5d"},{"id":1014,"path_crumbs":"\u827a\u672f>\u58f0\u4e50>\u6d41\u884c"}],"ts":1470390963,"msg":"succ"}
    };
};

/* eslint-enable fecs-camelcase */
