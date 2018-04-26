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
            "msg": "succ",
            "data": {
                "news_list": {
                    "list": [
                        {
                            "type": "新闻资讯",
                            "title": "发布了一条新闻咨询的黑板报啦啦啦啦啦啦啦",
                            "brief": "这里是正文部分这里是正文部分这里是正文部分这里是正文部分这里是正文部分这里是正文部分这里是正文部分这里是正文部分这里是正文部分这里是正文部分这里是正文部分这里是正文部分这里是正文部分这里是正文部分这里是正文部分这里是正文部分这里是正文部分这里是正文部分这里是正文部分这里是正文部分这里是正文部分这里是正文部分这里是正文部分这里是正文部分这里是正文部分这里是正文部分这里是正文部分这里是正文部分这里是正文部分这里是正文部分这里是正文部分这里是正文部分这里是正文部分这里是正文部分这里是正文部分这里是正文部分这里是正文部分这里是正文部分",
                            "create_time": "2016-11-07 14:48",
                            "url": "https://test-m.genshuixue.com/i/blackDetail/842.html",
                            "read_times": 11,
                            "support_num": "3",
                            "course_info": []
                        },
                        {
                            "type": "动态",
                            "title": "其他其他其他其他其他其他其他其他其他其他",
                            "brief": "其他其他其他其他其他其他其他其他其他其他其他其他其他其他其他其他其他其他其他其他其他其他其他其他其他其他其他其他其他其他其他其他其他其他其他其他其他其他其他其他其他其他其他其他其他其他其他其他其他其他其他其他其他其他其他其他其他其他其他其他其他其他其他其他其他其他其他其他其他其他其他其他其他其他其他其他其他其他其他其他其他其他其他其他其他其他其他其他其他其他其他",
                            "create_time": "2016-11-09 11:23",
                            "url": "https://test-m.genshuixue.com/i/blackDetail/843.html",
                            "read_times": 4,
                            "support_num": "2",
                            "course_info": {
                                "preface": "https://test-img.genshuixue.com/752660_e3ac9fkz.jpeg",
                                "price": "333.00",
                                "name": "机构老师开课直播课机构老师开课直播课",
                                "course_type": "直播课"
                            }
                        }
                    ]
                },
                "pager": {
                    "total_number": 2,
                    "next_cursor": 2,
                    "has_more": 0
                }
            },
            "ts": 1495419685,
            "declare_config": {
                "declareTpl": null
            }
        }
    };
};

/* eslint-enable fecs-camelcase */
