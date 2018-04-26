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
            "render": "json",
            "message": "请求成功",
            "data": {
                "filter": {
                    "course": {
                        "selected": [
                            976,
                            976,
                            978
                        ],
                        "selected_name": [
                            "小初高",
                            "小学",
                            "数学"
                        ]
                    },
                    "lesson_way": [
                        {
                            "name": "不限",
                            "value": 0,
                            "selected": true
                        },
                        {
                            "name": "在线上课",
                            "value": 2,
                            "selected": false
                        },
                        {
                            "name": "老师上门",
                            "value": 8,
                            "selected": false
                        },
                        {
                            "name": "学生上门",
                            "value": 4,
                            "selected": false
                        }
                    ],
                    "sort": [
                        {
                            "name": "智能排序",
                            "id": "all",
                            "selected": true
                        },
                        {
                            "name": "人气最高",
                            "id": "popular",
                            "selected": false
                        },
                        {
                            "name": "离我最近",
                            "id": "distance",
                            "selected": false
                        },
                        {
                            "name": "评价最高",
                            "id": "comment",
                            "selected": false
                        }
                    ],
                    "approach": {
                        "sex": [
                            {
                                "name": "不限",
                                "value": 0,
                                "selected": true
                            },
                            {
                                "name": "女老师",
                                "value": 1,
                                "selected": false
                            },
                            {
                                "name": "男老师",
                                "value": 2,
                                "selected": false
                            }
                        ],
                        "school_age": [
                            {
                                "name": "不限",
                                "value": 0,
                                "selected": true
                            },
                            {
                                "name": "5年以下",
                                "value": 1,
                                "selected": false
                            },
                            {
                                "name": "5-10年",
                                "value": 2,
                                "selected": false
                            },
                            {
                                "name": "11-15年",
                                "value": 3,
                                "selected": false
                            },
                            {
                                "name": "15年以上",
                                "value": 4,
                                "selected": false
                            }
                        ],
                        "price_range": [
                            {
                                "name": "不限",
                                "value": 0,
                                "selected": true
                            },
                            {
                                "name": "200以下",
                                "value": 1,
                                "selected": false
                            },
                            {
                                "name": "200-400",
                                "value": 2,
                                "selected": false
                            },
                            {
                                "name": "400以上",
                                "value": 3,
                                "selected": false
                            }
                        ]
                    }
                },
                "teacher_list": [
                    {
                        "number": "17050354182410",
                        "avatar": "https://test-imgs.genshuixue.com/926999_2pxjdqmv.jpeg",
                        "name": "王倩倩",
                        "stars": "3.7",
                        "hours": "0",
                        "tag": [
                            {
                                "name": "30年以上教龄"
                            },
                            {
                                "name": "效果明显"
                            },
                            {
                                "name": "全程指导"
                            },
                            {
                                "name": "文艺青年"
                            },
                            {
                                "name": "免费试听"
                            },
                            {
                                "name": "激发兴趣"
                            }
                        ],
                        "case_name": "111111111111",
                        "price": "45.0",
                        "distance": "237Km",
                        "area": "是大家还是觉得黄金时代好几十倒计时的痕迹",
                        "lesson_way": 2,
                        "courses": []
                    },
                    {
                        "number": "17050354285210",
                        "avatar": "https://test-imgs.genshuixue.com/926999_2pxjdqmv.jpeg",
                        "name": "王倩倩",
                        "stars": "3.7",
                        "hours": "0",
                        "tag": [
                            {
                                "name": "30年以上教龄"
                            },
                            {
                                "name": "效果明显"
                            },
                            {
                                "name": "全程指导"
                            },
                            {
                                "name": "文艺青年"
                            },
                            {
                                "name": "免费试听"
                            },
                            {
                                "name": "激发兴趣"
                            }
                        ],
                        "case_name": "121122",
                        "price": "44.0",
                        "distance": "237Km",
                        "area": "是大家还是觉得黄金时代好几十倒计时的痕迹",
                        "lesson_way": 0,
                        "courses": []
                    },
                    {
                        "number": "17050347578410",
                        "avatar": "https://test-imgs.genshuixue.com/926999_2pxjdqmv.jpeg",
                        "name": "王倩倩",
                        "stars": "3.7",
                        "hours": "0",
                        "tag": [
                            {
                                "name": "30年以上教龄"
                            },
                            {
                                "name": "效果明显"
                            },
                            {
                                "name": "全程指导"
                            },
                            {
                                "name": "文艺青年"
                            },
                            {
                                "name": "免费试听"
                            },
                            {
                                "name": "激发兴趣"
                            }
                        ],
                        "case_name": "15",
                        "price": "15.0",
                        "distance": "237Km",
                        "area": "是大家还是觉得黄金时代好几十倒计时的痕迹",
                        "lesson_way": 0,
                        "courses": []
                    },
                    {
                        "number": "17050354297610",
                        "avatar": "https://test-imgs.genshuixue.com/926999_2pxjdqmv.jpeg",
                        "name": "王倩倩",
                        "stars": "3.7",
                        "hours": "0",
                        "tag": [
                            {
                                "name": "30年以上教龄"
                            },
                            {
                                "name": "效果明显"
                            },
                            {
                                "name": "全程指导"
                            },
                            {
                                "name": "文艺青年"
                            },
                            {
                                "name": "免费试听"
                            },
                            {
                                "name": "激发兴趣"
                            }
                        ],
                        "case_name": "1333333333333",
                        "price": "13.0",
                        "distance": "237Km",
                        "area": "是大家还是觉得黄金时代好几十倒计时的痕迹",
                        "lesson_way": 0,
                        "courses": []
                    },
                    {
                        "number": "17050354182810",
                        "avatar": "https://test-imgs.genshuixue.com/926999_2pxjdqmv.jpeg",
                        "name": "王倩倩",
                        "stars": "3.7",
                        "hours": "0",
                        "tag": [
                            {
                                "name": "30年以上教龄"
                            },
                            {
                                "name": "效果明显"
                            },
                            {
                                "name": "全程指导"
                            },
                            {
                                "name": "文艺青年"
                            },
                            {
                                "name": "免费试听"
                            },
                            {
                                "name": "激发兴趣"
                            }
                        ],
                        "case_name": "4444444444444",
                        "price": "22.0",
                        "distance": "237Km",
                        "area": "是大家还是觉得黄金时代好几十倒计时的痕迹",
                        "lesson_way": 2,
                        "courses": []
                    },
                    {
                        "number": "17050354234010",
                        "avatar": "https://test-imgs.genshuixue.com/926999_2pxjdqmv.jpeg",
                        "name": "王倩倩",
                        "stars": "3.7",
                        "hours": "0",
                        "tag": [
                            {
                                "name": "30年以上教龄"
                            },
                            {
                                "name": "效果明显"
                            },
                            {
                                "name": "全程指导"
                            },
                            {
                                "name": "文艺青年"
                            },
                            {
                                "name": "免费试听"
                            },
                            {
                                "name": "激发兴趣"
                            }
                        ],
                        "case_name": "33333333333333333333",
                        "price": "5.0",
                        "distance": "237Km",
                        "area": "是大家还是觉得黄金时代好几十倒计时的痕迹",
                        "lesson_way": 0,
                        "courses": []
                    },
                    {
                        "number": "17050354246810",
                        "avatar": "https://test-imgs.genshuixue.com/926999_2pxjdqmv.jpeg",
                        "name": "王倩倩",
                        "stars": "3.7",
                        "hours": "0",
                        "tag": [
                            {
                                "name": "30年以上教龄"
                            },
                            {
                                "name": "效果明显"
                            },
                            {
                                "name": "全程指导"
                            },
                            {
                                "name": "文艺青年"
                            },
                            {
                                "name": "免费试听"
                            },
                            {
                                "name": "激发兴趣"
                            }
                        ],
                        "case_name": "1444444444444",
                        "price": "235.0",
                        "distance": "237Km",
                        "area": "是大家还是觉得黄金时代好几十倒计时的痕迹",
                        "lesson_way": 2,
                        "courses": []
                    },
                    {
                        "number": "17050354195610",
                        "avatar": "https://test-imgs.genshuixue.com/926999_2pxjdqmv.jpeg",
                        "name": "王倩倩",
                        "stars": "3.7",
                        "hours": "0",
                        "tag": [
                            {
                                "name": "30年以上教龄"
                            },
                            {
                                "name": "效果明显"
                            },
                            {
                                "name": "全程指导"
                            },
                            {
                                "name": "文艺青年"
                            },
                            {
                                "name": "免费试听"
                            },
                            {
                                "name": "激发兴趣"
                            }
                        ],
                        "case_name": "44444444444444",
                        "price": "44.0",
                        "distance": "237Km",
                        "area": "是大家还是觉得黄金时代好几十倒计时的痕迹",
                        "lesson_way": 0,
                        "courses": []
                    },
                    {
                        "number": "17050354298010",
                        "avatar": "https://test-imgs.genshuixue.com/926999_2pxjdqmv.jpeg",
                        "name": "王倩倩",
                        "stars": "3.7",
                        "hours": "0",
                        "tag": [
                            {
                                "name": "30年以上教龄"
                            },
                            {
                                "name": "效果明显"
                            },
                            {
                                "name": "全程指导"
                            },
                            {
                                "name": "文艺青年"
                            },
                            {
                                "name": "免费试听"
                            },
                            {
                                "name": "激发兴趣"
                            }
                        ],
                        "case_name": "14141441444",
                        "price": "14.0",
                        "distance": "237Km",
                        "area": "是大家还是觉得黄金时代好几十倒计时的痕迹",
                        "lesson_way": 0,
                        "courses": []
                    },
                    {
                        "number": "17050354233610",
                        "avatar": "https://test-imgs.genshuixue.com/926999_2pxjdqmv.jpeg",
                        "name": "王倩倩",
                        "stars": "3.7",
                        "hours": "0",
                        "tag": [
                            {
                                "name": "30年以上教龄"
                            },
                            {
                                "name": "效果明显"
                            },
                            {
                                "name": "全程指导"
                            },
                            {
                                "name": "文艺青年"
                            },
                            {
                                "name": "免费试听"
                            },
                            {
                                "name": "激发兴趣"
                            }
                        ],
                        "case_name": "11111111111111",
                        "price": "2.0",
                        "distance": "澳门",
                        "lesson_way": 0,
                        "courses": []
                    },
                    {
                        "number": "17050354195210",
                        "avatar": "https://test-imgs.genshuixue.com/926999_2pxjdqmv.jpeg",
                        "name": "王倩倩",
                        "stars": "3.7",
                        "hours": "0",
                        "tag": [
                            {
                                "name": "30年以上教龄"
                            },
                            {
                                "name": "效果明显"
                            },
                            {
                                "name": "全程指导"
                            },
                            {
                                "name": "文艺青年"
                            },
                            {
                                "name": "免费试听"
                            },
                            {
                                "name": "激发兴趣"
                            }
                        ],
                        "case_name": "55555555555555",
                        "price": "5.0",
                        "distance": "237Km",
                        "area": "是大家还是觉得黄金时代好几十倒计时的痕迹",
                        "lesson_way": 0,
                        "courses": []
                    },
                    {
                        "number": "17050354144010",
                        "avatar": "https://test-imgs.genshuixue.com/926999_2pxjdqmv.jpeg",
                        "name": "王倩倩",
                        "stars": "3.7",
                        "hours": "0",
                        "tag": [
                            {
                                "name": "30年以上教龄"
                            },
                            {
                                "name": "效果明显"
                            },
                            {
                                "name": "全程指导"
                            },
                            {
                                "name": "文艺青年"
                            },
                            {
                                "name": "免费试听"
                            },
                            {
                                "name": "激发兴趣"
                            }
                        ],
                        "case_name": "12345678901234567890123",
                        "price": "1.0",
                        "distance": "237Km",
                        "area": "是大家还是觉得黄金时代好几十倒计时的痕迹",
                        "lesson_way": 2,
                        "courses": []
                    },
                    {
                        "number": "17050354246410",
                        "avatar": "https://test-imgs.genshuixue.com/926999_2pxjdqmv.jpeg",
                        "name": "王倩倩",
                        "stars": "3.7",
                        "hours": "0",
                        "tag": [
                            {
                                "name": "30年以上教龄"
                            },
                            {
                                "name": "效果明显"
                            },
                            {
                                "name": "全程指导"
                            },
                            {
                                "name": "文艺青年"
                            },
                            {
                                "name": "免费试听"
                            },
                            {
                                "name": "激发兴趣"
                            }
                        ],
                        "case_name": "111111111111",
                        "price": "89.0",
                        "distance": "澳门",
                        "lesson_way": 0,
                        "courses": []
                    },
                    {
                        "number": "17050347578810",
                        "avatar": "https://test-imgs.genshuixue.com/926999_2pxjdqmv.jpeg",
                        "name": "王倩倩",
                        "stars": "3.7",
                        "hours": "0",
                        "tag": [
                            {
                                "name": "30年以上教龄"
                            },
                            {
                                "name": "效果明显"
                            },
                            {
                                "name": "全程指导"
                            },
                            {
                                "name": "文艺青年"
                            },
                            {
                                "name": "免费试听"
                            },
                            {
                                "name": "激发兴趣"
                            }
                        ],
                        "case_name": "16",
                        "price": "16.0",
                        "distance": "澳门",
                        "lesson_way": 0,
                        "courses": []
                    },
                    {
                        "number": "17050354284810",
                        "avatar": "https://test-imgs.genshuixue.com/926999_2pxjdqmv.jpeg",
                        "name": "王倩倩",
                        "stars": "3.7",
                        "hours": "0",
                        "tag": [
                            {
                                "name": "30年以上教龄"
                            },
                            {
                                "name": "效果明显"
                            },
                            {
                                "name": "全程指导"
                            },
                            {
                                "name": "文艺青年"
                            },
                            {
                                "name": "免费试听"
                            },
                            {
                                "name": "激发兴趣"
                            }
                        ],
                        "case_name": "4444444444444",
                        "price": "33.0",
                        "distance": "澳门",
                        "lesson_way": 0,
                        "courses": []
                    }
                ],
                "condition": {
                    "sort": "all",
                    "subject_id": "108",
                    "sex": "0",
                    "lesson_way": "0",
                    "school_age": "0",
                    "price_range": "0",
                    "address": ""
                },
                "has_more": 1,
                "next_cursor": 2,
                "total_number": 16
            }
        }
    };
};

/* eslint-enable fecs-camelcase */
