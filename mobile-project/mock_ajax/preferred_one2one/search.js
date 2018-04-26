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
                "filter": {
                    "course": {
                        "selected": 975,
                        "selected_name": "艺术",
                        "level1_list": [
                            {
                                "name": "全部",
                                "value": 0,
                                "selected": false
                            },
                            {
                                "name": "艺术",
                                "value": 975,
                                "selected": false
                            },
                            {
                                "name": "体育",
                                "value": 921,
                                "selected": false
                            },
                            {
                                "name": "管理",
                                "value": "455",
                                "selected": false
                            },
                            {
                                "name": "财经金融",
                                "value": "472",
                                "selected": true
                            },
                            {
                                "name": "公务员",
                                "value": "817",
                                "selected": false
                            },
                            {
                                "name": "司法",
                                "value": "852",
                                "selected": false
                            },
                            {
                                "name": "职业技能",
                                "value": "502",
                                "selected": false
                            },
                            {
                                "name": "资格考试",
                                "value": "634",
                                "selected": false
                            },
                            {
                                "name": "孕婴辅导",
                                "value": "1",
                                "selected": false
                            },
                            {
                                "name": "夏令营",
                                "value": "373",
                                "selected": false
                            },
                            {
                                "name": "国际游学",
                                "value": "376",
                                "selected": false
                            },
                            {
                                "name": "其他",
                                "value": "1104",
                                "selected": false
                            }
                        ]
                    },
                    "lesson_way": [
                        {
                            "name": "不限",
                            "value": 0,
                            "selected": false
                        },
                        {
                            "name": "在线上课",
                            "value": 1,
                            "selected": true
                        },
                        {
                            "name": "老师上门",
                            "value": 2,
                            "selected": false
                        },
                        {
                            "name": "学生上门",
                            "value": 3,
                            "selected": false
                        }
                    ],
                    "sort": [
                        {
                            "name": "智能排序",
                            "id": "all",
                            "selected": false
                        },
                        {
                            "name": "人气最高",
                            "id": "popular",
                            "selected": false
                        },
                        {
                            "name": "离我最近",
                            "id": "distance",
                            "selected": true
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
                                "value": 0,
                                "name": "不限",
                                "selected": false
                            },
                            {
                                "value": 1,
                                "name": "女老师",
                                "selected": true
                            },
                            {
                                "value": 2,
                                "name": "男老师",
                                "selected": false
                            }
                        ],
                        "school_age": [
                            {
                                "value": 0,
                                "name": "不限",
                                "selected": false
                            },
                            {
                                "value": 1,
                                "name": "5年以下",
                                "selected": true
                            },
                            {
                                "value": 2,
                                "name": "5-10年",
                                "selected": false
                            },
                            {
                                "value": 3,
                                "name": "11-15年",
                                "selected": false
                            },
                            {
                                "value": 4,
                                "name": "15年以上",
                                "selected": false
                            }
                        ],
                        "price_range": [
                            {
                                "value": 0,
                                "name": "不限",
                                "selected": false
                            },
                            {
                                "value": 1,
                                "name": "200以下",
                                "selected": true
                            },
                            {
                                "value": 2,
                                "name": "200-400",
                                "selected": false
                            },
                            {
                                "value": 3,
                                "name": "400以上",
                                "selected": false
                            }
                        ]
                    }
                },
                "teacher_list": [
                    {
                        "avatar": "http://img.gsxservice.com/18581122_izuw3605.jpeg",
                        "name": "张三" + parseInt(Math.random() * 1000),
                        "stars": 4.7,
                        "hours": "10",
                        "tag": [
                            {
                                "name": "14年教龄"
                            },
                            {
                                "name": "知名机构"
                            }
                        ],
                        "case_name": "获奖第一名",
                        "price": "122.00",
                        "distance": "3.0lkm",
                        "lesson_way": 1
                    },
                    {
                        "avatar": "http://img.gsxservice.com/18581122_izuw3605.jpeg",
                        "name": "张三" + parseInt(Math.random() * 1000),
                        "stars": 3.2,
                        "hours": "10",
                        "tag": [
                            {
                                "name": "14年教龄"
                            },
                            {
                                "name": "知名机构"
                            }
                        ],
                        "case_name": "获奖第一名",
                        "price": "122.00",
                        "distance": "3.0lkm",
                        "lesson_way": 1
                    },
                    {
                        "avatar": "http://img.gsxservice.com/18581122_izuw3605.jpeg",
                        "name": "张三",
                        "stars": 3.1,
                        "hours": "10",
                        "tag": [
                            {
                                "name": "14年教龄"
                            },
                            {
                                "name": "知名机构"
                            }
                        ],
                        "case_name": "获奖第一名",
                        "price": "122.00",
                        "distance": "3.0lkm",
                        "lesson_way": 1
                    },{
                        "avatar": "http://img.gsxservice.com/18581122_izuw3605.jpeg",
                        "name": "张三",
                        "stars": 2.7,
                        "hours": "10",
                        "tag": [
                            {
                                "name": "14年教龄"
                            },
                            {
                                "name": "知名机构"
                            }
                        ],
                        "case_name": "获奖第一名",
                        "price": "122.00",
                        "distance": "3.0lkm",
                        "lesson_way": 1
                    },{
                        "avatar": "http://img.gsxservice.com/18581122_izuw3605.jpeg",
                        "name": "张三",
                        "stars": 4.1,
                        "hours": "10",
                        "tag": [
                            {
                                "name": "14年教龄"
                            },
                            {
                                "name": "知名机构"
                            }
                        ],
                        "case_name": "获奖第一名",
                        "price": "122.00",
                        "distance": "3.0lkm",
                        "lesson_way": 1
                    },{
                        "avatar": "http://img.gsxservice.com/18581122_izuw3605.jpeg",
                        "name": "张三",
                        "stars": 4.2,
                        "hours": "10",
                        "tag": [
                            {
                                "name": "14年教龄"
                            },
                            {
                                "name": "知名机构"
                            }
                        ],
                        "case_name": "获奖第一名",
                        "price": "122.00",
                        "distance": "3.0lkm",
                        "lesson_way": 1
                    },{
                        "avatar": "http://img.gsxservice.com/18581122_izuw3605.jpeg",
                        "name": "张三",
                        "stars": 3.7,
                        "hours": "10",
                        "tag": [
                            {
                                "name": "14年教龄"
                            },
                            {
                                "name": "知名机构"
                            }
                        ],
                        "case_name": "获奖第一名",
                        "price": "122.00",
                        "distance": "3.0lkm",
                        "lesson_way": 1
                    },
                    {
                        "avatar": "http://img.gsxservice.com/18581122_izuw3605.jpeg",
                        "name": "张三",
                        "stars": 3.7,
                        "hours": "10",
                        "tag": [
                            {
                                "name": "14年教龄"
                            },
                            {
                                "name": "知名机构"
                            }
                        ],
                        "case_name": "获奖第一名",
                        "price": "122.00",
                        "distance": "3.0lkm",
                        "lesson_way": 1
                    },{
                        "avatar": "http://img.gsxservice.com/18581122_izuw3605.jpeg",
                        "name": "张三",
                        "stars": 3.7,
                        "hours": "10",
                        "tag": [
                            {
                                "name": "14年教龄"
                            },
                            {
                                "name": "知名机构"
                            }
                        ],
                        "case_name": "获奖第一名",
                        "price": "122.00",
                        "distance": "3.0lkm",
                        "lesson_way": 1
                    },{
                        "avatar": "http://img.gsxservice.com/18581122_izuw3605.jpeg",
                        "name": "张三",
                        "stars": 3.7,
                        "hours": "10",
                        "tag": [
                            {
                                "name": "14年教龄"
                            },
                            {
                                "name": "知名机构"
                            }
                        ],
                        "case_name": "获奖第一名",
                        "price": "122.00",
                        "distance": "3.0lkm",
                        "lesson_way": 1
                    },{
                        "avatar": "http://img.gsxservice.com/18581122_izuw3605.jpeg",
                        "name": "张三",
                        "stars": 3.7,
                        "hours": "10",
                        "tag": [
                            {
                                "name": "14年教龄"
                            },
                            {
                                "name": "知名机构"
                            }
                        ],
                        "case_name": "获奖第一名",
                        "price": "122.00",
                        "distance": "3.0lkm",
                        "lesson_way": 1
                    }
                ],
                "condition": {
                    "sort": "distance",
                    "subject_id": 975,
                    "sex": 0,
                    "lesson_way": 1,
                    "school_age": 2,
                    "price_range": 1
                },
                "total_number": 1000,
                "has_more": 1,
                "next_cursor": 2
            },
            "ts": 1492066540,
            "declare_config": {
                "declareTpl": "v2/resources/page/teacherCenter/teacherMain/teacherMain"
            }
        }
    };
};

/* eslint-enable fecs-camelcase */
