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
        _data: {"code":0,"msg":"succ","data":{"title":"\u5c0f\u554a\u53bb\u8bf4\u7684\u6587\u7ae0","articles":[{"title":"\u57fa\u4e8e\u7528\u6237\u884c\u4e3a\u7684\u5174\u8da3\u6807\u7b7e\u6a21\u578b","summary":"\u968f\u7740\u7f51\u7ad9\u89c4\u6a21\u7684\u6269\u5927\uff0c\u5185\u5bb9\u4e5f\u76f8\u5e94\u7684\u4e0e\u65e5\u4ff1\u589e\uff0c\u6db5\u76d6\u7684\u9891\u9053\u4e5f\u8d8a\u6765\u8d8a\u7e41\u6742\uff0c\u5728\u5982\u6b64\u6d77\u91cf\u7684\u4fe1\u606f\u5e73\u53f0\u4e0b\uff0c\u5982\u4f55\u66f4\u597d\u7684\u670d\u52a1\u7528\u6237\u6210\u4e86\u5404\u95e8\u6237\u7f51\u7ad9\u7684\u9996\u8981\u4efb\u52a1\u3002\u4ece\u7528\u6237\u9700\u6c42\u7684\u89d2\u5ea6\u8003\u8651\uff0c\u5bf9\u5185\u5bb9\u7684\u5224\u65ad\u6807\u51c6\u65e0\u7591\u662f\u7528\u6237\u5bf9\u6b64\u5185\u5bb9\u662f\u5426\u611f\u5174\u8da3","publish_at":"2016-10-20 10:40:24","cover":"http:\/\/test-img.gsxservice.com\/0xuexitoutiao\/yunying\/757944_rf4ux2oe.png","detail_url":"http:\/\/dev-web.xxtoutiao.com\/gsx\/feed\/get?itemId=1693122450513715&itemType=1","upvotes":2},{"title":"Principles of good RESTful API","summary":"Good restful API design is hard! An API represents a contract between you and those who Consume your","publish_at":"2016-10-19 20:33:33","cover":"http:\/\/test-img.gsxservice.com\/0xuexitoutiao\/yunying\/780867_zpxnv5t0.jpg","detail_url":"http:\/\/dev-web.xxtoutiao.com\/gsx\/feed\/get?itemId=1688041372013704&itemType=1","upvotes":1}],"more_article_url":"http:\/\/dev-news.m.genshuixue.com\/","pager":{"has_more":false,"next_page":2,"current_page":1,"total":2}},"ts":1479802996,"declare_config":{"declareTpl":"teacher\/articles"}}
    };
};

/* eslint-enable fecs-camelcase */
