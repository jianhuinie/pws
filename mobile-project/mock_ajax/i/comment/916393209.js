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
                "header": {
                    "id": "62759",
                    "number": "916393209",
                    "name": "qianqian Studio",
                    "domain": "xiaoqian",
                    "tags": [
                        {
                            "name": "IT教育"
                        }
                    ],
                    "brief": "这里是长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长的一句话简介",
                    "logo": "https://test-imgs.genshuixue.com/822484_4hh74x7r.jpg",
                    "location": "北京",
                    "org_type": {
                        "type": "1",
                        "name": "工作室",
                        "certify": "身份证"
                    },
                    "area_id": 17039360,
                    "support_tianxiao": false
                },
                "comment": {
                    "addition": {
                        "face_type": {
                            "total": 8,
                            "great": 4,
                            "middle": 2,
                            "lower": 2
                        },
                        "comment_type": {
                            "total": 8,
                            "normal": 1,
                            "invite": 0,
                            "class": 0,
                            "video": 0,
                            "xnormal": 5,
                            "xclass": 2
                        },
                        "total": "8",
                        "total_score": "3.0",
                        "_total_score": "3.0",
                        "greate_rate": "50%",
                        "score": {
                            "normal": {
                                "total": 1,
                                "lower": 0,
                                "great": 1,
                                "middle": 0,
                                "has_photo": 0
                            },
                            "class": {
                                "total": 0,
                                "lower": 0,
                                "great": 0,
                                "middle": 0,
                                "has_photo": 0
                            },
                            "invite": {
                                "total": 0,
                                "lower": 0,
                                "great": 0,
                                "middle": 0,
                                "has_photo": 0
                            },
                            "trial": {
                                "total": 0,
                                "lower": 0,
                                "great": 0,
                                "middle": 0,
                                "has_photo": 0
                            },
                            "video": {
                                "total": 0,
                                "lower": 0,
                                "great": 0,
                                "middle": 0,
                                "has_photo": 0
                            },
                            "xnormal": {
                                "total": 5,
                                "lower": 3,
                                "great": 2,
                                "middle": 0,
                                "has_photo": 0
                            },
                            "xclass": {
                                "total": 2,
                                "lower": 0,
                                "great": 1,
                                "middle": 1,
                                "has_photo": 0
                            },
                            "total": {
                                "total": 8,
                                "lower": 3,
                                "great": 4,
                                "middle": 1,
                                "has_photo": 0
                            },
                            "total_score": {
                                "total": 8,
                                "one": 2,
                                "two": 2,
                                "three": 0,
                                "four": 2,
                                "five": 2,
                                "total_rate": "1.00",
                                "one_rate": "0.25",
                                "two_rate": "0.25",
                                "three_rate": "0.00",
                                "four_rate": "0.25",
                                "five_rate": "0.25"
                            },
                            "invite_comment": 0,
                            "user_comment": 8
                        }
                    },
                    "navigation": [
                        {
                            "type": 0,
                            "name": "全部"
                        },
                        {
                            "type": 1,
                            "name": "好评(4)"
                        },
                        {
                            "type": 2,
                            "name": "中评(2)"
                        },
                        {
                            "type": 3,
                            "name": "差评(2)"
                        },
                        {
                            "type": 4,
                            "name": "未回应(8)"
                        },
                        {
                            "type": 5,
                            "name": "邀请评价(0)"
                        }
                    ],
                    "current_total": 8,
                    "has_more": false,
                    "next_cursor": 2,
                    "comment_list": [
                        {
                            "purchase_id": "1116112964348683",
                            "face_type": "3",
                            "info": "????经历过咯我了可口可乐了考虑考虑dfdgaaa",
                            "create_time": "11月29日 21:21",
                            "fr": "0",
                            "course_type": "11",
                            "course_number": "48436278451011",
                            "total_score": "2.0",
                            "comment_id": "40714",
                            "course": "一对一：底导相关-一对一线下1    总课程",
                            "course_info": {
                                "name": "底导相关-一对一线下1",
                                "url": "https://test-m.genshuixue.com/org_course/one2oneDetail/48436278451011"
                            },
                            "total_score_desc": "中评",
                            "user": {
                                "display_name": "何宣朗",
                                "avatar_url": "https://test-imgs.genshuixue.com/179641_8m4g0gh7.jpeg",
                                "detail_url": "https://test-m.genshuixue.com/x/835036828",
                                "number": "835036828"
                            },
                            "if_can_delete": false,
                            "if_can_addition": true,
                            "if_can_reply": true,
                            "photo_list": [],
                            "additional": []
                        },
                        {
                            "purchase_id": "1116112964416026",
                            "face_type": "1",
                            "info": "????经历过咯我了可口可乐了考虑考虑dfdgaaa",
                            "create_time": "11月29日 22:41",
                            "fr": "0",
                            "course_type": "11",
                            "course_number": "82069418476011",
                            "total_score": "4.0",
                            "comment_id": "40716",
                            "course": "一对一：线下一对一消课时    总课程",
                            "course_info": {
                                "name": "线下一对一消课时",
                                "url": "https://test-m.genshuixue.com/org_course/one2oneDetail/82069418476011"
                            },
                            "total_score_desc": "好评",
                            "user": {
                                "display_name": "一九八零零八",
                                "avatar_url": "https://test-imgs.genshuixue.com/126_e9qssago.jpeg",
                                "detail_url": "https://test-m.genshuixue.com/x/835693628",
                                "number": "835693628"
                            },
                            "if_can_delete": false,
                            "if_can_addition": true,
                            "if_can_reply": true,
                            "photo_list": [],
                            "additional": []
                        },
                        {
                            "purchase_id": "1116113064414091",
                            "face_type": "3",
                            "info": "????经历过咯我了可口可乐了考虑考虑dfdgaaa",
                            "create_time": "11月30日 16:41",
                            "fr": "0",
                            "course_type": "11",
                            "course_number": "48436278451011",
                            "total_score": "1.0",
                            "comment_id": "40722",
                            "course": "一对一：底导相关-一对一线下1    总课程",
                            "course_info": {
                                "name": "底导相关-一对一线下1",
                                "url": "https://test-m.genshuixue.com/org_course/one2oneDetail/48436278451011"
                            },
                            "total_score_desc": "差评",
                            "user": {
                                "display_name": "匿名用户",
                                "avatar_url": "https://test-imgs.genshuixue.com/0common/ic_anonymous_user_n.png",
                                "detail_url": "",
                                "number": "835036828"
                            },
                            "if_can_delete": false,
                            "if_can_addition": true,
                            "if_can_reply": true,
                            "photo_list": [],
                            "additional": []
                        },
                        {
                            "purchase_id": "1116120160172851",
                            "face_type": "1",
                            "info": "????经历过咯我了可口可乐了考虑考虑dfdgaaa",
                            "create_time": "12月03日 10:08",
                            "fr": "0",
                            "course_type": "12",
                            "course_number": "81676137649012",
                            "total_score": "5.0",
                            "comment_id": "40730",
                            "course": "班课：前4小时开课1    总课程",
                            "course_info": {
                                "name": "前4小时开课1",
                                "url": "https://test-m.genshuixue.com/org_course/classDetail/81676137649012"
                            },
                            "total_score_desc": "好评",
                            "user": {
                                "display_name": "孙立军8",
                                "avatar_url": "https://test-imgs.genshuixue.com/346023_0t182k3v.jpeg",
                                "detail_url": "https://test-m.genshuixue.com/x/877452438",
                                "number": "877452438"
                            },
                            "if_can_delete": false,
                            "if_can_addition": true,
                            "if_can_reply": true,
                            "photo_list": [],
                            "additional": []
                        },
                        {
                            "purchase_id": "1116122464637243",
                            "face_type": "2",
                            "info": "????经历过咯我了可口可乐了考虑考虑dfdgaaa",
                            "create_time": "12月24日 20:40",
                            "fr": "0",
                            "course_type": "12",
                            "course_number": "80417859417012",
                            "total_score": "2.0",
                            "comment_id": "40795",
                            "course": "班课：拆表—直播课付费    总课程",
                            "course_info": {
                                "name": "拆表—直播课付费",
                                "url": "https://test-m.genshuixue.com/org_course/classDetail/80417859417012"
                            },
                            "total_score_desc": "中评",
                            "user": {
                                "display_name": "何宣朗",
                                "avatar_url": "https://test-imgs.genshuixue.com/179641_8m4g0gh7.jpeg",
                                "detail_url": "https://test-m.genshuixue.com/x/835036828",
                                "number": "835036828"
                            },
                            "if_can_delete": false,
                            "if_can_addition": true,
                            "if_can_reply": true,
                            "photo_list": [],
                            "additional": []
                        },
                        {
                            "purchase_id": "1116122464635451",
                            "face_type": "1",
                            "info": "????经历过咯我了可口可乐了考虑考虑dfdgaaa",
                            "create_time": "12月24日 20:56",
                            "fr": "0",
                            "course_type": "11",
                            "course_number": "80417860082011",
                            "total_score": "4.0",
                            "comment_id": "40796",
                            "course": "一对一：拆表—1V1线下付费    总课程",
                            "course_info": {
                                "name": "拆表—1V1线下付费",
                                "url": "https://test-m.genshuixue.com/org_course/one2oneDetail/80417860082011"
                            },
                            "total_score_desc": "好评",
                            "user": {
                                "display_name": "何宣朗",
                                "avatar_url": "https://test-imgs.genshuixue.com/179641_8m4g0gh7.jpeg",
                                "detail_url": "https://test-m.genshuixue.com/x/835036828",
                                "number": "835036828"
                            },
                            "if_can_delete": false,
                            "if_can_addition": true,
                            "if_can_reply": true,
                            "photo_list": [],
                            "additional": []
                        },
                        {
                            "purchase_id": "1116122464700714",
                            "face_type": "3",
                            "info": "????经历过咯我了可口可乐了考虑考虑dfdgaaa",
                            "create_time": "12月24日 21:37",
                            "fr": "0",
                            "course_type": "11",
                            "course_number": "53574314677011",
                            "total_score": "1.0",
                            "comment_id": "40797",
                            "course": "一对一：拆表—1V1线下免费    总课程",
                            "course_info": {
                                "name": "拆表—1V1线下免费",
                                "url": "https://test-m.genshuixue.com/org_course/one2oneDetail/53574314677011"
                            },
                            "total_score_desc": "差评",
                            "user": {
                                "display_name": "何宣朗",
                                "avatar_url": "https://test-imgs.genshuixue.com/179641_8m4g0gh7.jpeg",
                                "detail_url": "https://test-m.genshuixue.com/x/835036828",
                                "number": "835036828"
                            },
                            "if_can_delete": false,
                            "if_can_addition": true,
                            "if_can_reply": true,
                            "photo_list": [],
                            "additional": []
                        },
                        {
                            "purchase_id": "1117042497996163",
                            "face_type": "1",
                            "info": "您是园丁，为祖国山川添秀色；您如春雨，润育桃李，神州大地尽芳菲。在这喜庆的节日里，让我献上一支心灵的鲜花，向您表达衷心的祝愿。您的岗位永不调换，您的足迹却遍布四方；您的两鬓会有一天斑白，您的青春却百年不衰。                    莘莘学子心，难忘恩师情。辛勤的汗水是您无私的奉献，桃李满天下是您最高的荣誉。祝您：节日快乐！幸福永远！             ",
                            "create_time": "04月25日 18:58",
                            "fr": "0",
                            "course_type": "1",
                            "course_number": "319747059527",
                            "total_score": "5.0",
                            "comment_id": "41266",
                            "course": "一对一：幼升小·纪律养成·纪律养成    第1课节(04月25日)",
                            "course_info": {
                                "name": "幼升小·纪律养成·纪律养成",
                                "url": "https://test-m.genshuixue.com/teacher/one2oneCourseDetail/319747059527"
                            },
                            "total_score_desc": "好评",
                            "user": {
                                "display_name": "李凡",
                                "avatar_url": "https://test-imgs.genshuixue.com/126_e9qssago.jpeg",
                                "detail_url": "https://test-m.genshuixue.com/x/665995828",
                                "number": "665995828"
                            },
                            "if_can_delete": false,
                            "if_can_addition": true,
                            "if_can_reply": true,
                            "photo_list": [],
                            "additional": []
                        }
                    ]
                },
                "page_title": "【qianqian Studio怎么样】qianqian Studio评价_好不好_评论-跟谁学官网",
                "page_keywords": "qianqian Studio怎么样,qianqian Studio评价怎么样,qianqian Studio好不好",
                "description": "qianqian Studio怎么样？qianqian StudioIT教育怎么样?qianqian Studio好不好？跟谁学为您提供qianqian Studio怎么样的大量真实评价。qianqian Studio,,这里是长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长的一句话简介。qianqian Studio提供IT教育的课程、老师、视频、相册、评价怎么样,方便学生和家长全方位了解qianqian Studio。找好老师,上跟谁学！",
                "lbs": {
                    "province": "北京",
                    "city": "北京",
                    "coord": {
                        "lng": 116.39564503788,
                        "lat": 39.92998577808
                    }
                }
            },
            "ts": 1495419944,
            "declare_config": {
                "declareTpl": "org/comments"
            }
        }
    };
};

/* eslint-enable fecs-camelcase */
