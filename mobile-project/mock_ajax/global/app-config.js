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
    var pageType = queryParam.statistics_url && queryParam.statistics_url.replace(/\//g, '-');
    return {
        // 可以通过该属性来设置响应的延时，也可以设为值为'0,100'，表示随机 0-100ms 的延时，默认 0
        _timeout: 0,

        // 通过该状态来设置响应的 http 的状态码，默认 200
        _status: 200,

        // 对于要响应的 json 数据可以统一放在该字段里，也可以不使用该字段，直接跟 _xx 属性平级放
        _data: {
            "code": 0,
            "message": "请求成功",
            "data": {
                "site_config": {
                    "env": "test",
                    "staticBaseUri": "http://test-m.genshuixue.com/",
                    "staticBaseLiveUri": "http://m-test-live.gsxservice.com",
                    "baseUri": "http://local-m.genshuixue.com",
                    "mainUri": "https://test-m.genshuixue.com",
                    "protocol": "http"
                },
                "ext_data": {
                    "is_app": false,
                    "is_sapp": false,
                    "is_tapp": false,
                    "is_iapp": false,
                    "is_zhidahao": 0,
                    "is_baidu_app": false,
                    "app_version": "3.4.0",
                    "platform": "",
                    "browser": "",
                    "curr_city": {
                        "id": "17039360",
                        "name": "北京",
                        "pinyin": "bei'jing",
                        "province": "北京",
                        "province_id": "16777216",
                        "alpha": "b",
                        "display_order": "2",
                        "domain": "bj",
                        "order": "2",
                        "is_center": "1"
                    },
                    "is_weixin": false,
                    "wx_config": null,
                    "page": pageType || 'global-app-config'
                },
                "log_data": {
                    "page_type": pageType || 'global-app-config'
                },
                "f00_number": "4000-910-910"
            }
        }
    };
};

/* eslint-enable fecs-camelcase */
