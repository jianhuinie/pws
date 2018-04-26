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
            "code": 0,
            "message": "succ",
            "data": {
                "title": "吕媛媛的文章",
                "article_list": [
                    {
                        "headline": "吕媛媛老师的自我介绍！",
                        "like_times": 4,
                        "covers": [
                            "http://img.gsxservice.com/6675374_i10fht1v.jpeg"
                        ],
                        "url": "http://news.m.genshuixue.com/16020843650.html",
                        "create_at": "02-08 17:19"
                    }
                ],
                "more_article_url": "http://news.m.genshuixue.com/",
                "has_more": 0,
                "next_cursor": 2,
                "total_number": 1,
                "tpl": "<div class=\"teacher-article\">   <ul class=\"relative-info home-news\">      <li class=\"item-content border-bottom right-image\">  <a href=\"http://news.m.genshuixue.com/16020843650.html\" class=\"item-article\" > <div> <div class=\"right-img-a\">   <div class=\"right-img-content\"> <img width=\"100%\" height=\"100%\" data-src=\"http://img.gsxservice.com/6675374_i10fht1v.jpeg\"> </div>  <div class=\"child-content child-pad\"> <h3 class=\"double-line\">吕媛媛老师的自我介绍！</h3> </div> <p class=\"news-teacher-name\"> <span> 02-08 17:19 </span>  <i class=\"icon icon-praise\"></i> 4  </p>  </div> </div> </a> </li>  </ul>  </div>"
            },
            "html": "",
            "msg": "succ"
        }
    };
};

/* eslint-enable fecs-camelcase */
