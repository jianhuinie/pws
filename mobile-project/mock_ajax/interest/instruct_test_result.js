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

        _data: {"code":0,"msg":"succ","data":{"title":"2016\u6211\u7684\u8131\u5355\u97f3\u4e50\u79d8\u7c4d\u662f\u5706\u53f7","content":"\u8fd8\u6ca1\u8131\u79bb\u5355\u8eab\u72d7\u7684\u884c\u5217\uff1f\u5feb\u6765\u8fd9\u91cc\u770b\u4e13\u5c5e\u4f60\u7684\u8131\u5355\u97f3\u4e50\u79d8\u7c4d\uff01","text":"\u8fd8\u6ca1\u8131\u79bb\u5355\u8eab\u72d7\u7684\u884c\u5217\uff1f\u5feb\u6765\u8fd9\u91cc\u770b\u4e13\u5c5e\u4f60\u7684\u8131\u5355\u97f3\u4e50\u79d8\u7c4d\uff01","img":"http:\/\/img.gsxservice.com\/0cms\/d\/file\/content\/2016\/03\/56e8c95dd55f3.jpg","img_url":"http:\/\/img.gsxservice.com\/0cms\/d\/file\/content\/2016\/03\/56e8c95dd55f3.jpg","url":"http:\/\/test-m.genshuixue.com\/activity\/instruct_test","share_weixin":{"title":"2016\u6211\u7684\u8131\u5355\u97f3\u4e50\u79d8\u7c4d\u662f\u5706\u53f7","content":"\u8fd8\u6ca1\u8131\u79bb\u5355\u8eab\u72d7\u7684\u884c\u5217\uff1f\u5feb\u6765\u8fd9\u91cc\u770b\u4e13\u5c5e\u4f60\u7684\u8131\u5355\u97f3\u4e50\u79d8\u7c4d\uff01","url":"http:\/\/test-m.genshuixue.com\/activity\/instruct_test","img":"http:\/\/img.gsxservice.com\/0cms\/d\/file\/content\/2016\/03\/56e8c95dd55f3.jpg"},"share_pyq":{"title":"2016\u6211\u7684\u8131\u5355\u97f3\u4e50\u79d8\u7c4d\u662f\u5706\u53f7","content":"","url":"http:\/\/test-m.genshuixue.com\/activity\/instruct_test","img":"http:\/\/img.gsxservice.com\/0cms\/d\/file\/content\/2016\/03\/56e8c95dd55f3.jpg"}},"ts":1458197777}
    };
};

/* eslint-enable fecs-camelcase */
