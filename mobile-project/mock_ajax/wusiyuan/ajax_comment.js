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
            "message": "succ",
            "data": {
                "comment_list": [{
                    "serial_number": "0",
                    "user_id": "1564668",
                    "teacher_user_id": "3527148",
                    "desc_match": "5.0",
                    "teach_result": "5.0",
                    "service_attitude": "5.0",
                    "face_type": "1",
                    "info": "老师很年轻，词汇讲的很详细，容易记",
                    "create_time": "2017-01-21 13:29",
                    "fr": "0",
                    "course_type": "2",
                    "course_number": "161229561541",
                    "thumb_up": "0",
                    "has_photo": "0",
                    "display_title": "总课程",
                    "anonymous": "0",
                    "total_score": "5.0",
                    "comment_num": "1",
                    "teacher_user_number": "623999678",
                    "private_domain": "wusiyuan",
                    "comment_id": "1569857",
                    "has_thumb_up": false,
                    "comprehensive_score": "5.0",
                    "course": {
                        "course_number": "161229561541",
                        "course_url": "http://m.genshuixue.com/teacher/classCourseDetail/161229561541",
                        "teacher_name": "吴斯源",
                        "course_type": "2",
                        "course_name": "【2018考研英语】 你必须知晓的词汇语法秘籍"
                    },
                    "user": {
                        "display_name": "馍馍",
                        "avatar_url": "https://imgs.genshuixue.com/27411179_sk72cv0h.jpeg",
                        "number": "627399638",
                        "url": "http://www.genshuixue.com/x/627399638"
                    },
                    "photo_list": [],
                    "is_my_comment": false,
                    "if_can_addition": false,
                    "if_can_review": false,
                    "additional": {
                        "teacher": {
                            "teacher_comment_id": "1569857",
                            "info": "哈哈，看来我的外貌的确有欺骗性哦~",
                            "type": "2",
                            "create_time": "17187天后追评：",
                            "org_create_time": "2017-01-21 19:49:50"
                        }
                    },
                    "has_more": 0,
                    "can_open": 0
                }, {
                    "serial_number": "170113684713",
                    "user_id": "1366048",
                    "teacher_user_id": "3527148",
                    "desc_match": "4.0",
                    "teach_result": "4.0",
                    "service_attitude": "4.0",
                    "face_type": "1",
                    "info": "吴老师，继续来班上看你哦，了解为大。",
                    "create_time": "2017-01-20 21:54",
                    "fr": "0",
                    "course_type": "2",
                    "course_number": "161229561541",
                    "thumb_up": "0",
                    "has_photo": "0",
                    "display_title": "第1课节(01月20日)",
                    "anonymous": "0",
                    "total_score": "4.0",
                    "comment_num": "1",
                    "teacher_user_number": "623999678",
                    "private_domain": "wusiyuan",
                    "comment_id": "1569104",
                    "has_thumb_up": false,
                    "comprehensive_score": "4.0",
                    "course": {
                        "course_number": "161229561541",
                        "course_url": "http://m.genshuixue.com/teacher/classCourseDetail/161229561541",
                        "teacher_name": "吴斯源",
                        "course_type": "2",
                        "course_name": "【2018考研英语】 你必须知晓的词汇语法秘籍"
                    },
                    "user": {
                        "display_name": "艺海朝阳",
                        "avatar_url": "https://imgs.genshuixue.com/2830414_fgoqlqlq.jpeg",
                        "number": "584676488",
                        "url": "http://www.genshuixue.com/x/584676488"
                    },
                    "photo_list": [],
                    "is_my_comment": false,
                    "if_can_addition": false,
                    "if_can_review": false,
                    "additional": {
                        "teacher": {
                            "teacher_comment_id": "1569104",
                            "info": "谢谢亲~可最后那颗星为什么没点亮呢？宝宝不解哦",
                            "type": "2",
                            "create_time": "17187天后追评：",
                            "org_create_time": "2017-01-21 19:52:18"
                        }
                    },
                    "has_more": 0,
                    "can_open": 0
                }, {
                    "serial_number": "170103671780",
                    "user_id": "3810821",
                    "teacher_user_id": "3527148",
                    "desc_match": "5.0",
                    "teach_result": "5.0",
                    "service_attitude": "5.0",
                    "face_type": "1",
                    "info": "老师讲单词，长难句都很棒。以前什么都不会。跟着老师学，慢慢懂了好多。",
                    "create_time": "2017-01-20 21:41",
                    "fr": "0",
                    "course_type": "2",
                    "course_number": "161229561541",
                    "thumb_up": "0",
                    "has_photo": "0",
                    "display_title": "第1课节(01月20日)",
                    "anonymous": "0",
                    "total_score": "5.0",
                    "comment_num": "1",
                    "teacher_user_number": "623999678",
                    "private_domain": "wusiyuan",
                    "comment_id": "1569045",
                    "has_thumb_up": false,
                    "comprehensive_score": "5.0",
                    "course": {
                        "course_number": "161229561541",
                        "course_url": "http://m.genshuixue.com/teacher/classCourseDetail/161229561541",
                        "teacher_name": "吴斯源",
                        "course_type": "2",
                        "course_name": "【2018考研英语】 你必须知晓的词汇语法秘籍"
                    },
                    "user": {
                        "display_name": "?(^o^)",
                        "avatar_url": "https://imgs.genshuixue.com/14854429_9l03084k.jpeg",
                        "number": "686881808",
                        "url": "http://www.genshuixue.com/x/686881808"
                    },
                    "photo_list": [],
                    "is_my_comment": false,
                    "if_can_addition": false,
                    "if_can_review": false,
                    "additional": {
                        "teacher": {
                            "teacher_comment_id": "1569045",
                            "info": "加油！燕子！么么哒~",
                            "type": "2",
                            "create_time": "17187天后追评：",
                            "org_create_time": "2017-01-21 19:52:45"
                        }
                    },
                    "has_more": 0,
                    "can_open": 0
                }, {
                    "serial_number": "170120926254",
                    "user_id": "4434152",
                    "teacher_user_id": "3527148",
                    "desc_match": "5.0",
                    "teach_result": "5.0",
                    "service_attitude": "5.0",
                    "face_type": "1",
                    "info": "老师讲得很好哦，解决了很多问题。",
                    "create_time": "2017-01-20 21:37",
                    "fr": "0",
                    "course_type": "2",
                    "course_number": "161229561541",
                    "thumb_up": "0",
                    "has_photo": "0",
                    "display_title": "第1课节(01月20日)",
                    "anonymous": "0",
                    "total_score": "5.0",
                    "comment_num": "1",
                    "teacher_user_number": "623999678",
                    "private_domain": "wusiyuan",
                    "comment_id": "1569021",
                    "has_thumb_up": false,
                    "comprehensive_score": "5.0",
                    "course": {
                        "course_number": "161229561541",
                        "course_url": "http://m.genshuixue.com/teacher/classCourseDetail/161229561541",
                        "teacher_name": "吴斯源",
                        "course_type": "2",
                        "course_name": "【2018考研英语】 你必须知晓的词汇语法秘籍"
                    },
                    "user": {
                        "display_name": "leeminoz",
                        "avatar_url": "https://imgs.genshuixue.com/23670885_v3abjn9j.jpeg",
                        "number": "709564198",
                        "url": "http://www.genshuixue.com/x/709564198"
                    },
                    "photo_list": [],
                    "is_my_comment": false,
                    "if_can_addition": false,
                    "if_can_review": false,
                    "additional": {
                        "teacher": {
                            "teacher_comment_id": "1569021",
                            "info": "很开心哦~",
                            "type": "2",
                            "create_time": "17187天后追评：",
                            "org_create_time": "2017-01-21 19:53:30"
                        }
                    },
                    "has_more": 0,
                    "can_open": 0
                }, {
                    "serial_number": "170118755128",
                    "user_id": "4509758",
                    "teacher_user_id": "3527148",
                    "desc_match": "5.0",
                    "teach_result": "5.0",
                    "service_attitude": "5.0",
                    "face_type": "1",
                    "info": "老师讲的关于英语单词学习记忆的方法很好，对我很有启发。",
                    "create_time": "2017-01-20 21:30",
                    "fr": "0",
                    "course_type": "2",
                    "course_number": "161229561541",
                    "thumb_up": "0",
                    "has_photo": "0",
                    "display_title": "第1课节(01月20日)",
                    "anonymous": "0",
                    "total_score": "5.0",
                    "comment_num": "1",
                    "teacher_user_number": "623999678",
                    "private_domain": "wusiyuan",
                    "comment_id": "1568980",
                    "has_thumb_up": false,
                    "comprehensive_score": "5.0",
                    "course": {
                        "course_number": "161229561541",
                        "course_url": "http://m.genshuixue.com/teacher/classCourseDetail/161229561541",
                        "teacher_name": "吴斯源",
                        "course_type": "2",
                        "course_name": "【2018考研英语】 你必须知晓的词汇语法秘籍"
                    },
                    "user": {
                        "display_name": "谁--纯学习",
                        "avatar_url": "https://imgs.genshuixue.com/24342099_zoqf8jyp.gif",
                        "number": "581730098",
                        "url": "http://www.genshuixue.com/x/581730098"
                    },
                    "photo_list": [],
                    "is_my_comment": false,
                    "if_can_addition": false,
                    "if_can_review": false,
                    "additional": {
                        "teacher": {
                            "teacher_comment_id": "1568980",
                            "info": "继续坚持，吼吼~",
                            "type": "2",
                            "create_time": "17187天后追评：",
                            "org_create_time": "2017-01-21 19:54:24"
                        }
                    },
                    "has_more": 0,
                    "can_open": 0
                }],
                "has_more": 1,
                "additional": {
                    "desc_match": "4.9",
                    "service_attitude": "4.9",
                    "teach_result": "4.9",
                    "average": "4.9",
                    "user_total_number": 223,
                    "total_number": 180,
                    "invite_comment_number": 1,
                    "user_comment_number": 179,
                    "active_total_number": 223,
                    "total_score": {
                        "total": 223,
                        "one": 1,
                        "two": 0,
                        "three": 3,
                        "four": 3,
                        "five": 216,
                        "total_rate": "1.00",
                        "one_rate": "0.00",
                        "two_rate": "0.00",
                        "three_rate": "0.01",
                        "four_rate": "0.01",
                        "five_rate": "0.97"
                    },
                    "face_type": {
                        "total": 223,
                        "lower": 1,
                        "great": 219,
                        "middle": 3,
                        "has_photo": 0,
                        "comment_tags": []
                    },
                    "comment_tags": []
                },
                "profile": {
                    "number": "623999678",
                    "name": "吴斯源"
                },
                "declareTpl": "v2/resources/page/teacherCenter/teacherSuper/main/teacher-comment.tpl",
                "comment_data": {
                    "comment_list": [{
                        "serial_number": "0",
                        "user_id": "1564668",
                        "teacher_user_id": "3527148",
                        "desc_match": "5.0",
                        "teach_result": "5.0",
                        "service_attitude": "5.0",
                        "face_type": "1",
                        "info": "老师很年轻，词汇讲的很详细，容易记",
                        "create_time": "2017-01-21 13:29",
                        "fr": "0",
                        "course_type": "2",
                        "course_number": "161229561541",
                        "thumb_up": "0",
                        "has_photo": "0",
                        "display_title": "总课程",
                        "anonymous": "0",
                        "total_score": "5.0",
                        "comment_num": "1",
                        "teacher_user_number": "623999678",
                        "private_domain": "wusiyuan",
                        "comment_id": "1569857",
                        "has_thumb_up": false,
                        "comprehensive_score": "5.0",
                        "course": {
                            "course_number": "161229561541",
                            "course_url": "http://m.genshuixue.com/teacher/classCourseDetail/161229561541",
                            "teacher_name": "吴斯源",
                            "course_type": "2",
                            "course_name": "【2018考研英语】 你必须知晓的词汇语法秘籍"
                        },
                        "user": {
                            "display_name": "馍馍",
                            "avatar_url": "https://imgs.genshuixue.com/27411179_sk72cv0h.jpeg",
                            "number": "627399638",
                            "url": "http://www.genshuixue.com/x/627399638"
                        },
                        "photo_list": [],
                        "is_my_comment": false,
                        "if_can_addition": false,
                        "if_can_review": false,
                        "additional": {
                            "teacher": {
                                "teacher_comment_id": "1569857",
                                "info": "哈哈，看来我的外貌的确有欺骗性哦~",
                                "type": "2",
                                "create_time": "17187天后追评：",
                                "org_create_time": "2017-01-21 19:49:50"
                            }
                        },
                        "has_more": 0,
                        "can_open": 0
                    }, {
                        "serial_number": "170113684713",
                        "user_id": "1366048",
                        "teacher_user_id": "3527148",
                        "desc_match": "4.0",
                        "teach_result": "4.0",
                        "service_attitude": "4.0",
                        "face_type": "1",
                        "info": "吴老师，继续来班上看你哦，了解为大。",
                        "create_time": "2017-01-20 21:54",
                        "fr": "0",
                        "course_type": "2",
                        "course_number": "161229561541",
                        "thumb_up": "0",
                        "has_photo": "0",
                        "display_title": "第1课节(01月20日)",
                        "anonymous": "0",
                        "total_score": "4.0",
                        "comment_num": "1",
                        "teacher_user_number": "623999678",
                        "private_domain": "wusiyuan",
                        "comment_id": "1569104",
                        "has_thumb_up": false,
                        "comprehensive_score": "4.0",
                        "course": {
                            "course_number": "161229561541",
                            "course_url": "http://m.genshuixue.com/teacher/classCourseDetail/161229561541",
                            "teacher_name": "吴斯源",
                            "course_type": "2",
                            "course_name": "【2018考研英语】 你必须知晓的词汇语法秘籍"
                        },
                        "user": {
                            "display_name": "艺海朝阳",
                            "avatar_url": "https://imgs.genshuixue.com/2830414_fgoqlqlq.jpeg",
                            "number": "584676488",
                            "url": "http://www.genshuixue.com/x/584676488"
                        },
                        "photo_list": [],
                        "is_my_comment": false,
                        "if_can_addition": false,
                        "if_can_review": false,
                        "additional": {
                            "teacher": {
                                "teacher_comment_id": "1569104",
                                "info": "谢谢亲~可最后那颗星为什么没点亮呢？宝宝不解哦",
                                "type": "2",
                                "create_time": "17187天后追评：",
                                "org_create_time": "2017-01-21 19:52:18"
                            }
                        },
                        "has_more": 0,
                        "can_open": 0
                    }, {
                        "serial_number": "170103671780",
                        "user_id": "3810821",
                        "teacher_user_id": "3527148",
                        "desc_match": "5.0",
                        "teach_result": "5.0",
                        "service_attitude": "5.0",
                        "face_type": "1",
                        "info": "老师讲单词，长难句都很棒。以前什么都不会。跟着老师学，慢慢懂了好多。",
                        "create_time": "2017-01-20 21:41",
                        "fr": "0",
                        "course_type": "2",
                        "course_number": "161229561541",
                        "thumb_up": "0",
                        "has_photo": "0",
                        "display_title": "第1课节(01月20日)",
                        "anonymous": "0",
                        "total_score": "5.0",
                        "comment_num": "1",
                        "teacher_user_number": "623999678",
                        "private_domain": "wusiyuan",
                        "comment_id": "1569045",
                        "has_thumb_up": false,
                        "comprehensive_score": "5.0",
                        "course": {
                            "course_number": "161229561541",
                            "course_url": "http://m.genshuixue.com/teacher/classCourseDetail/161229561541",
                            "teacher_name": "吴斯源",
                            "course_type": "2",
                            "course_name": "【2018考研英语】 你必须知晓的词汇语法秘籍"
                        },
                        "user": {
                            "display_name": "?(^o^)",
                            "avatar_url": "https://imgs.genshuixue.com/14854429_9l03084k.jpeg",
                            "number": "686881808",
                            "url": "http://www.genshuixue.com/x/686881808"
                        },
                        "photo_list": [],
                        "is_my_comment": false,
                        "if_can_addition": false,
                        "if_can_review": false,
                        "additional": {
                            "teacher": {
                                "teacher_comment_id": "1569045",
                                "info": "加油！燕子！么么哒~",
                                "type": "2",
                                "create_time": "17187天后追评：",
                                "org_create_time": "2017-01-21 19:52:45"
                            }
                        },
                        "has_more": 0,
                        "can_open": 0
                    }, {
                        "serial_number": "170120926254",
                        "user_id": "4434152",
                        "teacher_user_id": "3527148",
                        "desc_match": "5.0",
                        "teach_result": "5.0",
                        "service_attitude": "5.0",
                        "face_type": "1",
                        "info": "老师讲得很好哦，解决了很多问题。",
                        "create_time": "2017-01-20 21:37",
                        "fr": "0",
                        "course_type": "2",
                        "course_number": "161229561541",
                        "thumb_up": "0",
                        "has_photo": "0",
                        "display_title": "第1课节(01月20日)",
                        "anonymous": "0",
                        "total_score": "5.0",
                        "comment_num": "1",
                        "teacher_user_number": "623999678",
                        "private_domain": "wusiyuan",
                        "comment_id": "1569021",
                        "has_thumb_up": false,
                        "comprehensive_score": "5.0",
                        "course": {
                            "course_number": "161229561541",
                            "course_url": "http://m.genshuixue.com/teacher/classCourseDetail/161229561541",
                            "teacher_name": "吴斯源",
                            "course_type": "2",
                            "course_name": "【2018考研英语】 你必须知晓的词汇语法秘籍"
                        },
                        "user": {
                            "display_name": "leeminoz",
                            "avatar_url": "https://imgs.genshuixue.com/23670885_v3abjn9j.jpeg",
                            "number": "709564198",
                            "url": "http://www.genshuixue.com/x/709564198"
                        },
                        "photo_list": [],
                        "is_my_comment": false,
                        "if_can_addition": false,
                        "if_can_review": false,
                        "additional": {
                            "teacher": {
                                "teacher_comment_id": "1569021",
                                "info": "很开心哦~",
                                "type": "2",
                                "create_time": "17187天后追评：",
                                "org_create_time": "2017-01-21 19:53:30"
                            }
                        },
                        "has_more": 0,
                        "can_open": 0
                    }, {
                        "serial_number": "170118755128",
                        "user_id": "4509758",
                        "teacher_user_id": "3527148",
                        "desc_match": "5.0",
                        "teach_result": "5.0",
                        "service_attitude": "5.0",
                        "face_type": "1",
                        "info": "老师讲的关于英语单词学习记忆的方法很好，对我很有启发。",
                        "create_time": "2017-01-20 21:30",
                        "fr": "0",
                        "course_type": "2",
                        "course_number": "161229561541",
                        "thumb_up": "0",
                        "has_photo": "0",
                        "display_title": "第1课节(01月20日)",
                        "anonymous": "0",
                        "total_score": "5.0",
                        "comment_num": "1",
                        "teacher_user_number": "623999678",
                        "private_domain": "wusiyuan",
                        "comment_id": "1568980",
                        "has_thumb_up": false,
                        "comprehensive_score": "5.0",
                        "course": {
                            "course_number": "161229561541",
                            "course_url": "http://m.genshuixue.com/teacher/classCourseDetail/161229561541",
                            "teacher_name": "吴斯源",
                            "course_type": "2",
                            "course_name": "【2018考研英语】 你必须知晓的词汇语法秘籍"
                        },
                        "user": {
                            "display_name": "谁--纯学习",
                            "avatar_url": "https://imgs.genshuixue.com/24342099_zoqf8jyp.gif",
                            "number": "581730098",
                            "url": "http://www.genshuixue.com/x/581730098"
                        },
                        "photo_list": [],
                        "is_my_comment": false,
                        "if_can_addition": false,
                        "if_can_review": false,
                        "additional": {
                            "teacher": {
                                "teacher_comment_id": "1568980",
                                "info": "继续坚持，吼吼~",
                                "type": "2",
                                "create_time": "17187天后追评：",
                                "org_create_time": "2017-01-21 19:54:24"
                            }
                        },
                        "has_more": 0,
                        "can_open": 0
                    }],
                    "additional": {
                        "desc_match": "4.9",
                        "service_attitude": "4.9",
                        "teach_result": "4.9",
                        "average": "4.9",
                        "user_total_number": 223,
                        "total_number": 180,
                        "invite_comment_number": 1,
                        "user_comment_number": 179,
                        "active_total_number": 223,
                        "total_score": {
                            "total": 223,
                            "one": 1,
                            "two": 0,
                            "three": 3,
                            "four": 3,
                            "five": 216,
                            "total_rate": "1.00",
                            "one_rate": "0.00",
                            "two_rate": "0.00",
                            "three_rate": "0.01",
                            "four_rate": "0.01",
                            "five_rate": "0.97"
                        },
                        "face_type": {
                            "total": 223,
                            "lower": 1,
                            "great": 219,
                            "middle": 3,
                            "has_photo": 0,
                            "comment_tags": []
                        },
                        "comment_tags": []
                    }
                },
                "tpl": "<div class=\"comments-overview\"> <ul class=\"comments-statistics\"> <li class=\"sum-score\"> <span> <span class=\"star-score\">   <i class=\"icon icon-star_all star-shine\"></i>    <i class=\"icon icon-star_all star-shine\"></i>    <i class=\"icon icon-star_all star-shine\"></i>    <i class=\"icon icon-star_all star-shine\"></i>    <span class=\"star-half\"> <i class=\"icon icon-star_half\"></i> <i class=\"icon icon-star_all\"></i> </span>  </span> </span>  <span class=\"score\">4.9</span> 分  </li> <li class=\"total-number\"> 223条学习评价 </li> </ul> <ul class=\"comments-stars\">       <li> <span class=\"star-level\">5星</span> <span class=\"grey-line\"> <span class=\"orange-line\" data-percent=\"0.97\" style=\"width:174px\"></span> </span> <span class=\"num\">   97%  </span> </li>      <li> <span class=\"star-level\">4星</span> <span class=\"grey-line\"> <span class=\"orange-line\" data-percent=\"0.01\" style=\"width:1px\"></span> </span> <span class=\"num\">   1%  </span> </li>      <li> <span class=\"star-level\">3星</span> <span class=\"grey-line\"> <span class=\"orange-line\" data-percent=\"0.01\" style=\"width:1px\"></span> </span> <span class=\"num\">   1%  </span> </li>      <li> <span class=\"star-level\">2星</span> <span class=\"grey-line\"> <span class=\"orange-line\" data-percent=\"0.00\" style=\"width:0px\"></span> </span> <span class=\"num\">   0  </span> </li>      <li> <span class=\"star-level\">1星</span> <span class=\"grey-line\"> <span class=\"orange-line\" data-percent=\"0.00\" style=\"width:0px\"></span> </span> <span class=\"num\">   0  </span> </li>  </ul>\n</div> <div class=\"tab-list comments-filter\"> <ul class=\"tab-title\"> <li class=\"tab-item all-class active\" comment_type=\"0\" data-type=\"0\"> <div>全部评价</div> </li> <li class=\"tab-item one2one\" comment_type=\"1\" data-type=\"1\"> <div>一对一</div> </li> <li class=\"tab-item class-course\" comment_type=\"3\" data-type=\"3\"> <div>班课</div> </li> <li class=\"tab-item video\" comment_type=\"4\" data-type=\"4\"> <div>视频课</div> </li> </ul> <section class=\"course-tab\"> <div class=\"comment-panel\">  <ul id=\"comment-list\" class=\"comment-list\">  <li class=\"main-course-comment\" data-user_num=\"1564668\" data-index=\"0\">\n<a  href=\"javascript:void(0);\" > <div class=\"user-img\"> <img width=\"100%\" height=\"100%\" src=\"http://img.gsxservice.com/0cms/d/file/content/2016/01/56a2315c62581.png\" data-src=\"https://imgs.genshuixue.com/27411179_sk72cv0h.jpeg\"> </div>\n</a> <div class=\"right-info\"> <div class=\"user-name\">  馍馍    <span class=\"like \" data-comment_id=\"1569857\" data-thumb=\"0\"> <i class=\"icon icon-like\"></i> <span class=\"like-num\">(0)</span> </span>  </div>  <div class=\"stars-info\"> 评分<span class=\"star-score\">   <i class=\"icon icon-star_all star-shine\"></i>    <i class=\"icon icon-star_all star-shine\"></i>    <i class=\"icon icon-star_all star-shine\"></i>    <i class=\"icon icon-star_all star-shine\"></i>    <i class=\"icon icon-star_all star-shine\"></i>  </span>  </div> </div>\n<div class=\"comment-content\">  老师很年轻，词汇讲的很详细，容易记  </div>\n<div class=\"course-info single-line\"> <span class=\"create-time\">2017-01-21 13:29</span>  <span class=\"course-title \">【2018考研英语】 你必须知晓的词汇语法秘籍</span> </div>\n    <div class=\"teacher-additional\"> 老师回复:哈哈，看来我的外貌的确有欺骗性哦~ <div class=\"triangle\"></div> </div> </li>    <li class=\"main-course-comment\" data-user_num=\"1366048\" data-index=\"1\">\n<a  href=\"javascript:void(0);\" > <div class=\"user-img\"> <img width=\"100%\" height=\"100%\" src=\"http://img.gsxservice.com/0cms/d/file/content/2016/01/56a2315c62581.png\" data-src=\"https://imgs.genshuixue.com/2830414_fgoqlqlq.jpeg\"> </div>\n</a> <div class=\"right-info\"> <div class=\"user-name\">  艺海朝阳    <span class=\"like \" data-comment_id=\"1569104\" data-thumb=\"0\"> <i class=\"icon icon-like\"></i> <span class=\"like-num\">(0)</span> </span>  </div>  <div class=\"stars-info\"> 评分<span class=\"star-score\">   <i class=\"icon icon-star_all star-shine\"></i>    <i class=\"icon icon-star_all star-shine\"></i>    <i class=\"icon icon-star_all star-shine\"></i>    <i class=\"icon icon-star_all star-shine\"></i>    <i class=\"icon icon-star_all\"></i>  </span>  </div> </div>\n<div class=\"comment-content\">  吴老师，继续来班上看你哦，了解为大。  </div>\n<div class=\"course-info single-line\"> <span class=\"create-time\">2017-01-20 21:54</span>  <span class=\"course-title \">【2018考研英语】 你必须知晓的词汇语法秘籍</span> </div>\n    <div class=\"teacher-additional\"> 老师回复:谢谢亲~可最后那颗星为什么没点亮呢？宝宝不解哦 <div class=\"triangle\"></div> </div> </li>    <li class=\"main-course-comment\" data-user_num=\"3810821\" data-index=\"2\">\n<a  href=\"javascript:void(0);\" > <div class=\"user-img\"> <img width=\"100%\" height=\"100%\" src=\"http://img.gsxservice.com/0cms/d/file/content/2016/01/56a2315c62581.png\" data-src=\"https://imgs.genshuixue.com/14854429_9l03084k.jpeg\"> </div>\n</a> <div class=\"right-info\"> <div class=\"user-name\">  ?(^o^)    <span class=\"like \" data-comment_id=\"1569045\" data-thumb=\"0\"> <i class=\"icon icon-like\"></i> <span class=\"like-num\">(0)</span> </span>  </div>  <div class=\"stars-info\"> 评分<span class=\"star-score\">   <i class=\"icon icon-star_all star-shine\"></i>    <i class=\"icon icon-star_all star-shine\"></i>    <i class=\"icon icon-star_all star-shine\"></i>    <i class=\"icon icon-star_all star-shine\"></i>    <i class=\"icon icon-star_all star-shine\"></i>  </span>  </div> </div>\n<div class=\"comment-content\">  老师讲单词，长难句都很棒。以前什么都不会。跟着老师学，慢慢懂了好多。  </div>\n<div class=\"course-info single-line\"> <span class=\"create-time\">2017-01-20 21:41</span>  <span class=\"course-title \">【2018考研英语】 你必须知晓的词汇语法秘籍</span> </div>\n    <div class=\"teacher-additional\"> 老师回复:加油！燕子！么么哒~ <div class=\"triangle\"></div> </div> </li>    <li class=\"main-course-comment\" data-user_num=\"4434152\" data-index=\"3\">\n<a  href=\"javascript:void(0);\" > <div class=\"user-img\"> <img width=\"100%\" height=\"100%\" src=\"http://img.gsxservice.com/0cms/d/file/content/2016/01/56a2315c62581.png\" data-src=\"https://imgs.genshuixue.com/23670885_v3abjn9j.jpeg\"> </div>\n</a> <div class=\"right-info\"> <div class=\"user-name\">  leeminoz    <span class=\"like \" data-comment_id=\"1569021\" data-thumb=\"0\"> <i class=\"icon icon-like\"></i> <span class=\"like-num\">(0)</span> </span>  </div>  <div class=\"stars-info\"> 评分<span class=\"star-score\">   <i class=\"icon icon-star_all star-shine\"></i>    <i class=\"icon icon-star_all star-shine\"></i>    <i class=\"icon icon-star_all star-shine\"></i>    <i class=\"icon icon-star_all star-shine\"></i>    <i class=\"icon icon-star_all star-shine\"></i>  </span>  </div> </div>\n<div class=\"comment-content\">  老师讲得很好哦，解决了很多问题。  </div>\n<div class=\"course-info single-line\"> <span class=\"create-time\">2017-01-20 21:37</span>  <span class=\"course-title \">【2018考研英语】 你必须知晓的词汇语法秘籍</span> </div>\n    <div class=\"teacher-additional\"> 老师回复:很开心哦~ <div class=\"triangle\"></div> </div> </li>    <li class=\"main-course-comment\" data-user_num=\"4509758\" data-index=\"4\">\n<a  href=\"javascript:void(0);\" > <div class=\"user-img\"> <img width=\"100%\" height=\"100%\" src=\"http://img.gsxservice.com/0cms/d/file/content/2016/01/56a2315c62581.png\" data-src=\"https://imgs.genshuixue.com/24342099_zoqf8jyp.gif\"> </div>\n</a> <div class=\"right-info\"> <div class=\"user-name\">  谁--纯学习    <span class=\"like \" data-comment_id=\"1568980\" data-thumb=\"0\"> <i class=\"icon icon-like\"></i> <span class=\"like-num\">(0)</span> </span>  </div>  <div class=\"stars-info\"> 评分<span class=\"star-score\">   <i class=\"icon icon-star_all star-shine\"></i>    <i class=\"icon icon-star_all star-shine\"></i>    <i class=\"icon icon-star_all star-shine\"></i>    <i class=\"icon icon-star_all star-shine\"></i>    <i class=\"icon icon-star_all star-shine\"></i>  </span>  </div> </div>\n<div class=\"comment-content\">  老师讲的关于英语单词学习记忆的方法很好，对我很有启发。  </div>\n<div class=\"course-info single-line\"> <span class=\"create-time\">2017-01-20 21:30</span>  <span class=\"course-title \">【2018考研英语】 你必须知晓的词汇语法秘籍</span> </div>\n    <div class=\"teacher-additional\"> 老师回复:继续坚持，吼吼~ <div class=\"triangle\"></div> </div> </li>    </ul> <!-- 课程评价页用 relate 区分 表示相关的评价 -->   <p class=\"more-comment has-more\" data-page=\"2\">查看更多评价</p>    </div> </section> </div>"
            },
            "html": "",
            "msg": "succ"
        }
    };
};

/* eslint-enable fecs-camelcase */