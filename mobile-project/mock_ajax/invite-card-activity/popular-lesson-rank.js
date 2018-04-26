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
            "message": "请求成功",
            "data": {
                "items": [
                    {
                        "name": "ddwd",
                        "imgurl": "https://test-imgs.genshuixue.com/752661_od310z7t.jpeg",
                        "invite_count": "26",
                        "rank_order": parseInt(Math.random() * 1000)
                    },
                    {
                        "name": "jkasdhfksdhfk",
                        "imgurl": "http://test-img.gsxservice.com/823529_9inmddqv.jpeg",
                        "invite_count": "10",
                        "rank_order": parseInt(Math.random() * 1000)
                    },
                    {
                        "name": "我是审核失败的视频课",
                        "imgurl": "http://test-img.gsxservice.com/520905_uenffynh.jpeg",
                        "invite_count": "4",
                        "rank_order": parseInt(Math.random() * 1000)
                    },
                    {
                        "name": "美美美",
                        "imgurl": "http://test-img.gsxservice.com/827825_tlrb7ffo.jpeg",
                        "invite_count": "3",
                        "rank_order": parseInt(Math.random() * 1000)
                    },
                    {
                        "name": "U盟-新视频课-机构",
                        "imgurl": "http://test-img.gsxservice.com/828063_q7drbs5r.jpeg",
                        "invite_count": "3",
                        "rank_order": parseInt(Math.random() * 1000)
                    },
                    {
                        "name": "高清卡卡",
                        "imgurl": "http://test-img.gsxservice.com/823719_8m6xkzxc.jpeg",
                        "invite_count": "3",
                        "rank_order": parseInt(Math.random() * 1000)
                    },
                    {
                        "name": "可我就对对对度啦啦啦啦啦哈哈哈哈",
                        "imgurl": "https://test-imgs.genshuixue.com/747357_t16j2ku8.png",
                        "invite_count": "2",
                        "rank_order": parseInt(Math.random() * 1000)
                    },
                    {
                        "name": "哈哈哈哈",
                        "imgurl": "http://test-img.gsxservice.com/775026_g6juatua.jpeg",
                        "invite_count": "1",
                        "rank_order": parseInt(Math.random() * 1000)
                    },
                    {
                        "name": "免费的视频课0001（变付费）",
                        "imgurl": "https://test-imgs.genshuixue.com/863213_8b3eryr4.jpeg",
                        "invite_count": "1",
                        "rank_order": parseInt(Math.random() * 1000)
                    },
                    {
                        "name": "机构老师视频课",
                        "imgurl": "https://test-imgs.genshuixue.com/834534_c20uxwdu.jpeg",
                        "invite_count": "0",
                        "rank_order": parseInt(Math.random() * 1000)
                    }
                ],
                "current": {
                    "course": {
                        "name": "ddwd",
                        "imgurl": "https://test-imgs.genshuixue.com/752661_od310z7t.jpeg"
                    },
                    "rank": {
                        "rank_order": 1,
                        "invite_count": 26
                    }
                },
                "pager": {
                    "has_more": true,
                    "next_page": 2,
                    "current_page": 1,
                    "total": 13,
                    "per_page": 10
                }
            }
        }
    };
};

/* eslint-enable fecs-camelcase */
