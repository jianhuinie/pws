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

                "comment": {
                    "addition": {
                        "face_type": {
                            "total": 180,
                            "great": 155,
                            "middle": 24,
                            "lower": 1
                        },
                        "total": "180",
                        "total_score": 4.66,
                        "greate_rate": "86.11%"
                    },
                    "navigation": [{
                        "type": 0,
                        "name": "全部"
                    }, {
                        "type": 1,
                        "name": "好评(155)"
                    }, {
                        "type": 2,
                        "name": "中评(24)"
                    }, {
                        "type": 3,
                        "name": "差评(1)"
                    }, {
                        "type": 4,
                        "name": "未回应(161)"
                    }, {
                        "type": 5,
                        "name": "邀请评价(7)"
                    }],
                    "has_more": true,
                    "next_cursor": 2,
                    "comment_list": [{
                        "info": "sadfasfsafadsf sdafadsfadsf asdfasf asdfasfd asdfasdf adsfsafsaf",
                        "create_time": "11月24日 11:42",
                        "fr": "0",
                        "total_score": "4.0",
                        "comment_id": "38716",
                        "course": "班课：班课评价 总课程 老师：唐星红",
                        "total_score_desc": "好评",
                        "user": {
                            "display_name": "匿名用户",
                            "avatar_url": "http://img.gsxservice.com/0common/ic_anonymous_user_n.png",
                            "detail_url": ""
                        },
                        "if_can_delete": false,
                        "if_can_addition": true,
                        "if_can_reply": true,
                        "photo_list": [
                            "http://test-img.gsxservice.com/397273_1p3jm7nd.jpeg",
                            "http://test-img.gsxservice.com/397274_t9yiq0gy.jpeg",
                            "http://test-img.gsxservice.com/397275_0a7obovj.jpeg",
                            "http://test-img.gsxservice.com/397276_bo46gnn0.jpeg",
                            "http://test-img.gsxservice.com/397277_a3x1uns1.jpeg"
                        ],
                        "additional": [

                        ]
                    }, {
                        "info": "很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好",
                        "create_time": "12月04日 13:55",
                        "fr": "0",
                        "total_score": "5.0",
                        "comment_id": "38788",
                        "course": "一对一：出国留学 课节1-1 老师：唐星红",
                        "total_score_desc": "好评",
                        "user": {
                            "display_name": "ccx",
                            "avatar_url": "http://test-img.gsxservice.com/126_e9qssago.jpeg",
                            "detail_url": "http://wanghaohua-m.test.genshuixue.com/x/329569448"
                        },
                        "if_can_delete": false,
                        "if_can_addition": true,
                        "if_can_reply": false,
                        "photo_list": [

                        ],
                        "additional": [{
                            "info": "??????? ??????",
                            "type": 3,
                            "create_time": "01月01日 08:00"
                        }]
                    }, {
                        "info": "好啦中评哈哈你吃不吃合sadfadsfasdfasf",
                        "create_time": "03月23日 11:21",
                        "fr": "2",
                        "total_score": "5.0",
                        "comment_id": "39839",
                        "course": "",
                        "total_score_desc": "好评",
                        "user": {
                            "display_name": "刘美玉同学a%$",
                            "avatar_url": "http://test-img.gsxservice.com/408072_of2rs6cd.jpeg",
                            "detail_url": "http://wanghaohua-m.test.genshuixue.com/x/877451078"
                        },
                        "if_can_delete": true,
                        "if_can_addition": true,
                        "if_can_reply": true,
                        "photo_list": [

                        ],
                        "additional": [

                        ]
                    }, {
                        "info": "改为好评测试；匿名；班课课节评价，三星；班课课节评价，三星；班课课节评价，三星；班课课节评价，三星；班课课节评价，三星；班课课节评价，三星；班课课节评价，三星；班课课节评价，三星；班课课节评价，三星；班课课节评价，三星；班课课节评价，三星；班课课节评价，三星；班课课节评价，三星；班课课节评价，三星；班课课节评价，三星；班课课节评价，三星；班课课节评价，三星；班课课节评价，三星；班课课节评价6677",
                        "create_time": "03月23日 14:42",
                        "fr": "0",
                        "total_score": "5.0",
                        "comment_id": "39842",
                        "course": "班课：上课中可插班-有人报名暂停招生和继续招生 第1课节(11月16日) 老师：唐星红",
                        "total_score_desc": "好评",
                        "user": {
                            "display_name": "匿名用户",
                            "avatar_url": "http://img.gsxservice.com/0common/ic_anonymous_user_n.png",
                            "detail_url": ""
                        },
                        "if_can_delete": false,
                        "if_can_addition": true,
                        "if_can_reply": false,
                        "photo_list": [
                            "http://test-img.gsxservice.com/5542_f40qbayy.jpeg",
                            "http://test-img.gsxservice.com/5542_f40qbayy.jpeg"
                        ],
                        "additional": [{
                            "info": "input",
                            "type": 3,
                            "create_time": "01月01日 08:00"
                        }]
                    }, {
                        "info": "的范德萨范德萨范德萨范德萨发负数发顺丰发都是发发的发的",
                        "create_time": "03月24日 14:11",
                        "fr": "2",
                        "total_score": "5.0",
                        "comment_id": "39861",
                        "course": "",
                        "total_score_desc": "好评",
                        "user": {
                            "display_name": "19766666667",
                            "avatar_url": "http://test-img.gsxservice.com/81_xvle7ck2.jpeg",
                            "detail_url": "http://wanghaohua-m.test.genshuixue.com/x/666722608"
                        },
                        "if_can_delete": true,
                        "if_can_addition": true,
                        "if_can_reply": false,
                        "photo_list": [
                            "http://test-img.gsxservice.com/436927_nuhcacef.jpeg",
                            "http://test-img.gsxservice.com/436928_0fpbq4sb.jpeg"
                        ],
                        "additional": [{
                            "info": "????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????",
                            "type": 3,
                            "create_time": "01月01日 08:00"
                        }]
                    }, {
                        "info": "sdfdsafasfvb r dsfverygood",
                        "create_time": "03月22日 14:19",
                        "fr": "0",
                        "total_score": "4.0",
                        "comment_id": "39804",
                        "course": "班课：直播回放&直播回放&直播回放&直播回放& 第2课节(03月22日) 老师：唐星红",
                        "total_score_desc": "好评",
                        "user": {
                            "display_name": "刘美玉同学a%$",
                            "avatar_url": "http://test-img.gsxservice.com/408072_of2rs6cd.jpeg",
                            "detail_url": "http://wanghaohua-m.test.genshuixue.com/x/877451078"
                        },
                        "if_can_delete": false,
                        "if_can_addition": true,
                        "if_can_reply": false,
                        "photo_list": [

                        ],
                        "additional": [{
                            "info": "dadadda",
                            "type": 3,
                            "create_time": "01月01日 08:00"
                        }]
                    }, {
                        "info": "邀请评价改为好评；2016-03-21；邀请评价改为好评；2016-03-21；邀请评价改为好评；2016-03-21；邀请评价改为好评；2016-03-21；邀请评价改为好评；2016-03-21；邀请评价改为好评；2016-03-21；邀请评价改为好评；2016-03-21；邀请评价改为好评；2016-03-21；邀请评价改为好评；2016-03-21；邀请评价改为好评；2016-03-21Q",
                        "create_time": "03月21日 11:11",
                        "fr": "2",
                        "total_score": "5.0",
                        "comment_id": "39740",
                        "course": "",
                        "total_score_desc": "好评",
                        "user": {
                            "display_name": "刘美玉同学a%$",
                            "avatar_url": "http://test-img.gsxservice.com/408072_of2rs6cd.jpeg",
                            "detail_url": "http://wanghaohua-m.test.genshuixue.com/x/877451078"
                        },
                        "if_can_delete": true,
                        "if_can_addition": true,
                        "if_can_reply": true,
                        "photo_list": [

                        ],
                        "additional": [

                        ]
                    }, {
                        "info": "班课评价：中评改为好评；班课评价：中评改为好评；",
                        "create_time": "11月24日 11:12",
                        "fr": "0",
                        "total_score": "5.0",
                        "comment_id": "38713",
                        "course": "班课：班课评价 课节1-1 老师：唐星红",
                        "total_score_desc": "好评",
                        "user": {
                            "display_name": "匿名用户",
                            "avatar_url": "http://img.gsxservice.com/0common/ic_anonymous_user_n.png",
                            "detail_url": ""
                        },
                        "if_can_delete": false,
                        "if_can_addition": false,
                        "if_can_reply": false,
                        "photo_list": [

                        ],
                        "additional": [{
                            "info": "dadadda",
                            "type": 3,
                            "create_time": "01月01日 08:00"
                        }, {
                            "info": "dadadda",
                            "type": 3,
                            "create_time": "01月01日 08:00"
                        }]
                    }, {
                        "info": "sadfasfsafsafasfa",
                        "create_time": "04月01日 14:11",
                        "fr": "2",
                        "total_score": "5.0",
                        "comment_id": "39878",
                        "course": "",
                        "total_score_desc": "好评",
                        "user": {
                            "display_name": "Alex",
                            "avatar_url": "http://test-img.gsxservice.com/362335_bjye237c.jpeg",
                            "detail_url": "http://wanghaohua-m.test.genshuixue.com/x/454744998"
                        },
                        "if_can_delete": true,
                        "if_can_addition": true,
                        "if_can_reply": false,
                        "photo_list": [

                        ],
                        "additional": [{
                            "info": "fsadfsdfsadfsafsa",
                            "type": 3,
                            "create_time": "01月01日 08:00"
                        }]
                    }, {
                        "info": "付费发的发的发的 发的发发的1",
                        "create_time": "03月22日 17:06",
                        "fr": "0",
                        "total_score": "5.0",
                        "comment_id": "39829",
                        "course": "班课：直播回放&直播回放&直播回放&直播回放& 第11课节(03月22日) 老师：唐星红",
                        "total_score_desc": "好评",
                        "user": {
                            "display_name": "刘美玉同学a%$",
                            "avatar_url": "http://test-img.gsxservice.com/408072_of2rs6cd.jpeg",
                            "detail_url": "http://wanghaohua-m.test.genshuixue.com/x/877451078"
                        },
                        "if_can_delete": false,
                        "if_can_addition": true,
                        "if_can_reply": false,
                        "photo_list": [

                        ],
                        "additional": [{
                            "info": "vffsgfdgf",
                            "type": 3,
                            "create_time": "01月01日 08:00"
                        }]
                    }, {
                        "info": "asdfasfsafasf",
                        "create_time": "03月23日 16:27",
                        "fr": "2",
                        "total_score": "5.0",
                        "comment_id": "39845",
                        "course": "",
                        "total_score_desc": "好评",
                        "user": {
                            "display_name": "梵蒂冈的",
                            "avatar_url": "http://test-img.gsxservice.com/126_e9qssago.jpeg",
                            "detail_url": "http://wanghaohua-m.test.genshuixue.com/x/835670438"
                        },
                        "if_can_delete": true,
                        "if_can_addition": true,
                        "if_can_reply": true,
                        "photo_list": [

                        ],
                        "additional": [

                        ]
                    }, {
                        "info": "服务态度超好",
                        "create_time": "11月24日 16:32",
                        "fr": "0",
                        "total_score": "5.0",
                        "comment_id": "38717",
                        "course": "一对一：化学 课节2-1 老师：唐星红",
                        "total_score_desc": "好评",
                        "user": {
                            "display_name": "ccx",
                            "avatar_url": "http://test-img.gsxservice.com/126_e9qssago.jpeg",
                            "detail_url": "http://wanghaohua-m.test.genshuixue.com/x/329569448"
                        },
                        "if_can_delete": false,
                        "if_can_addition": true,
                        "if_can_reply": true,
                        "photo_list": [

                        ],
                        "additional": [

                        ]
                    }, {
                        "info": "c vv b........................",
                        "create_time": "01月05日 11:37",
                        "fr": "0",
                        "total_score": "5.0",
                        "comment_id": "39335",
                        "course": "班课：班课封面A 总课程 老师：唐星红",
                        "total_score_desc": "好评",
                        "user": {
                            "display_name": "Haha让他自己",
                            "avatar_url": "http://test-img.gsxservice.com/741990_6kl0nera.jpeg",
                            "detail_url": "http://wanghaohua-m.test.genshuixue.com/x/875074348"
                        },
                        "if_can_delete": false,
                        "if_can_addition": true,
                        "if_can_reply": false,
                        "photo_list": [

                        ],
                        "additional": [{
                            "info": "sdfasdfsafsafa",
                            "type": 3,
                            "create_time": "01月01日 08:00"
                        }]
                    }, {
                        "info": "34455",
                        "create_time": "12月29日 14:25",
                        "fr": "0",
                        "total_score": "5.0",
                        "comment_id": "39280",
                        "course": "班课：验证班课封面 总课程 老师：唐星红",
                        "total_score_desc": "好评",
                        "user": {
                            "display_name": "匿名用户",
                            "avatar_url": "http://img.gsxservice.com/0common/ic_anonymous_user_n.png",
                            "detail_url": ""
                        },
                        "if_can_delete": false,
                        "if_can_addition": true,
                        "if_can_reply": true,
                        "photo_list": [

                        ],
                        "additional": [

                        ]
                    }, {
                        "info": "888888888888888",
                        "create_time": "01月05日 11:37",
                        "fr": "0",
                        "total_score": "5.0",
                        "comment_id": "39336",
                        "course": "班课：班课封面A 课节2-2 老师：唐星红",
                        "total_score_desc": "好评",
                        "user": {
                            "display_name": "匿名用户",
                            "avatar_url": "http://img.gsxservice.com/0common/ic_anonymous_user_n.png",
                            "detail_url": ""
                        },
                        "if_can_delete": false,
                        "if_can_addition": true,
                        "if_can_reply": true,
                        "photo_list": [

                        ],
                        "additional": [

                        ]
                    }]
                },
                "page_title": "【古典艺术怎么样】古典艺术评价_好不好_评论-跟谁学官网",
                "page_keywords": "古典艺术怎么样,古典艺术评价怎么样,古典艺术好不好",
                "description": "古典艺术怎么样？古典艺术1111怎么样?古典艺术好不好？跟谁学为您提供古典艺术怎么样的大量真实评价。古典艺术,,11111sd sf s sf sf sf sf。古典艺术提供1111的课程、老师、视频、相册、评价怎么样,方便学生和家长全方位了解古典艺术。找好老师,上跟谁学！",
                "lbs": {
                    "province": "北京",
                    "city": "北京",
                    "coord": {
                        "lng": 116.39564503788,
                        "lat": 39.92998577808
                    }
                }
            },
            "ts": 1477896776,
            "declare_config": {
                "declareTpl": "org/comments"
            }
        }
    };
};

/* eslint-enable fecs-camelcase */