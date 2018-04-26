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
            code : 0,
            data : {
                "news_list": [
                    {
                        "cover": {
                            "height": 148,
                            "url": "http://superfile.baijiahulian.com/news/xinsheng_s_pic.jpg",
                            "width": 245
                        },
                        "paper_id": 5,
                        "paper_snippet": "新生入学防骗指南哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈和哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈",
                        "paper_title": "新生入学防骗指南和哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈和哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈",
                        "paper_url": "http://interface.zhixue100.cn/wap/fangpian.html",
                        "paper_views": 18723
                    },
                    {
                        "cover": {
                            "height": 148,
                            "url": "http://superfile.baijiahulian.com/news/yiliunian_s_pic.jpg",
                            "width": 245
                        },
                        "paper_id": 5,
                        "paper_snippet": "新生入学防骗指南",
                        "paper_title": "新生入学防骗指南",
                        "paper_url": "http://interface.zhixue100.cn/wap/fangpian.html",
                        "paper_views": 18723
                    },
                    {
                        "cover": {
                            "height": 148,
                            "url": "http://superfile.baijiahulian.com/news/xinsheng_s_pic.jpg",
                            "width": 245
                        },
                        "paper_id": 5,
                        "paper_snippet": "新生入学防骗指南",
                        "paper_title": "新生入学防骗指南",
                        "paper_url": "http://interface.zhixue100.cn/wap/fangpian.html",
                        "paper_views": 18723
                    }
                ]
            }
        }
    };
};

/* eslint-enable fecs-camelcase */
