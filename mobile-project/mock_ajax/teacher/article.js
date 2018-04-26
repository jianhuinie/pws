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
module.exports = function(path, queryParam, postParam) {
    return {
        // 可以通过该属性来设置响应的延时，也可以设为值为'0,100'，表示随机 0-100ms 的延时，默认 0
        _timeout: 0,

        // 通过该状态来设置响应的 http 的状态码，默认 200
        _status: 200,

        // 对于要响应的 json 数据可以统一放在该字段里，也可以不使用该字段，直接跟 _xx 属性平级放
        _data: {
            "code": 0,
            "msg": "succ",
            "data": {
                "title": "曹炜的文章",
                "articles": [{
                    "item_id": "10239840443469404",
                    "item_type": 1,
                    "title": "其实这个也考数学思维：照片中到底有几个女孩？",
                    "summary": "其实这个也考数学思维：照片中到底有几个女孩？",
                    "publish_at": "2016-03-19 15:46:38",
                    "cover": "http://img.gsxservice.com/8118244_vqk551sc.jpeg",
                    "detail_url": "http://www.xuexitoutiao.com/gsx/feed/get?itemId=10239840443469404&itemType=1&gsxUserId=1811280",
                    "upvotes": 1
                }],
                "more_article_url": "http://news.m.genshuixue.com/",
                "pager": {
                    "has_more": false,
                    "next_page": 2,
                    "current_page": 1,
                    "total": 10
                }
            },
            "ts": 1480580926,
            "declare_config": {
                "declareTpl": "teacher/articles"
            }
        }
    };
};

/* eslint-enable fecs-camelcase */