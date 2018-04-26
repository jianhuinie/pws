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
                    "serial_number": "170107964659",
                    "user_id": "4054110",
                    "teacher_user_id": "543977",
                    "desc_match": "5.0",
                    "teach_result": "5.0",
                    "service_attitude": "5.0",
                    "face_type": "1",
                    "info": "老师讲的很认真，很仔细，豁然开朗",
                    "create_time": "2017-01-07 14:02",
                    "fr": "0",
                    "course_type": "1",
                    "course_number": "442222062447",
                    "thumb_up": "0",
                    "has_photo": "0",
                    "display_title": "第3课节(01月07日)",
                    "anonymous": "0",
                    "total_score": "5.0",
                    "comment_num": "2",
                    "teacher_user_number": "478600978",
                    "private_domain": "478600978wxt",
                    "comment_id": "1545021",
                    "has_thumb_up": false,
                    "comprehensive_score": "5.0",
                    "course": {
                        "course_number": "442222062447",
                        "course_url": "http://m.genshuixue.com/teacher/one2oneCourseDetail/442222062447",
                        "teacher_name": "鸿鹄",
                        "course_type": "1",
                        "course_name": "卡卡"
                    },
                    "user": {
                        "display_name": "李凡",
                        "avatar_url": "https://img.genshuixue.com/30520_9qzbz1k4.jpeg",
                        "number": "648167278",
                        "url": "http://www.genshuixue.com/x/648167278"
                    },
                    "org_create_time": "2017-01-07 14:02:25",
                    "photo_list": [],
                    "is_my_comment": false,
                    "if_can_addition": false,
                    "if_can_review": false,
                    "has_more": 0,
                    "can_open": 1,
                    "other_comment": [{
                        "serial_number": "170106766564",
                        "user_id": "4054110",
                        "teacher_user_id": "543977",
                        "desc_match": "5.0",
                        "teach_result": "5.0",
                        "service_attitude": "5.0",
                        "face_type": "1",
                        "info": "老师讲的好好呀，大大的赞一个，赞",
                        "create_time": "2017-01-07 14:01",
                        "fr": "0",
                        "course_type": "1",
                        "course_number": "442222062447",
                        "thumb_up": "0",
                        "has_photo": "0",
                        "display_title": "第1课节(01月06日)",
                        "anonymous": "0",
                        "total_score": "5.0",
                        "teacher_user_number": "478600978",
                        "private_domain": "478600978wxt",
                        "comment_id": "1545019",
                        "has_thumb_up": false,
                        "comprehensive_score": "5.0",
                        "course": {
                            "course_number": "442222062447",
                            "course_url": "http://m.genshuixue.com/teacher/one2oneCourseDetail/442222062447",
                            "teacher_name": "鸿鹄",
                            "course_type": "1",
                            "course_name": "卡卡"
                        },
                        "user": {
                            "display_name": "李凡",
                            "avatar_url": "https://img.genshuixue.com/30520_9qzbz1k4.jpeg",
                            "number": "648167278",
                            "url": "http://www.genshuixue.com/x/648167278"
                        },
                        "org_create_time": "2017-01-07 14:01:41",
                        "photo_list": [],
                        "is_my_comment": false,
                        "if_can_addition": false,
                        "if_can_review": false
                    }]
                }, {
                    "serial_number": "0",
                    "user_id": "509032",
                    "teacher_user_id": "543977",
                    "desc_match": "4.0",
                    "teach_result": "4.0",
                    "service_attitude": "4.0",
                    "face_type": "1",
                    "info": "很好很好，哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈",
                    "create_time": "2017-01-07 01:19",
                    "fr": "0",
                    "course_type": "1",
                    "course_number": "399261888497",
                    "thumb_up": "0",
                    "has_photo": "0",
                    "display_title": "总课程",
                    "anonymous": "0",
                    "total_score": "4.0",
                    "comment_num": "2",
                    "teacher_user_number": "478600978",
                    "private_domain": "478600978wxt",
                    "comment_id": "1544574",
                    "has_thumb_up": false,
                    "comprehensive_score": "4.0",
                    "course": {
                        "course_number": "399261888497",
                        "course_url": "http://m.genshuixue.com/teacher/one2oneCourseDetail/399261888497",
                        "teacher_name": "鸿鹄",
                        "course_type": "1",
                        "course_name": "萌妹子"
                    },
                    "user": {
                        "display_name": "烟  火",
                        "avatar_url": "https://img.genshuixue.com/2031512_4r8rviz6.jpeg",
                        "number": "455038118",
                        "url": "http://www.genshuixue.com/x/455038118"
                    },
                    "org_create_time": "2017-01-07 01:19:50",
                    "photo_list": [],
                    "is_my_comment": false,
                    "if_can_addition": false,
                    "if_can_review": false,
                    "additional": {
                        "teacher": {
                            "teacher_comment_id": "1544574",
                            "info": "赞",
                            "type": "2",
                            "create_time": "3天后追评：",
                            "org_create_time": "2017-01-10 23:26:20"
                        }
                    },
                    "has_more": 0,
                    "can_open": 1,
                    "other_comment": [{
                        "serial_number": "0",
                        "user_id": "509032",
                        "teacher_user_id": "543977",
                        "desc_match": "5.0",
                        "teach_result": "5.0",
                        "service_attitude": "5.0",
                        "face_type": "1",
                        "info": "HhhhhhhKaksjkdjfijfjjfkkf isieieiieiejjj ieiisidiidiiswii ksiiwiwiiw9ififjjfjjf",
                        "create_time": "2017-01-05 15:41",
                        "fr": "0",
                        "course_type": "1",
                        "course_number": "399261888497",
                        "thumb_up": "1",
                        "has_photo": "0",
                        "display_title": "总课程",
                        "anonymous": "0",
                        "total_score": "5.0",
                        "teacher_user_number": "478600978",
                        "private_domain": "478600978wxt",
                        "comment_id": "1541472",
                        "has_thumb_up": false,
                        "comprehensive_score": "5.0",
                        "course": {
                            "course_number": "399261888497",
                            "course_url": "http://m.genshuixue.com/teacher/one2oneCourseDetail/399261888497",
                            "teacher_name": "鸿鹄",
                            "course_type": "1",
                            "course_name": "萌妹子"
                        },
                        "user": {
                            "display_name": "烟  火",
                            "avatar_url": "https://img.genshuixue.com/2031512_4r8rviz6.jpeg",
                            "number": "455038118",
                            "url": "http://www.genshuixue.com/x/455038118"
                        },
                        "org_create_time": "2017-01-05 15:41:37",
                        "photo_list": [],
                        "is_my_comment": false,
                        "if_can_addition": false,
                        "if_can_review": false,
                        "additional": {
                            "teacher": {
                                "teacher_comment_id": "1541472",
                                "info": "咔咔咔咔咔咔",
                                "type": "2",
                                "create_time": "当天追评：",
                                "org_create_time": "2017-01-05 16:26:01"
                            }
                        }
                    }, {
                        "serial_number": "0",
                        "user_id": "509032",
                        "teacher_user_id": "543977",
                        "desc_match": "5.0",
                        "teach_result": "5.0",
                        "service_attitude": "5.0",
                        "face_type": "1",
                        "info": "未作出评价，系统默认评价！",
                        "create_time": "2016-10-27 00:03",
                        "fr": "1",
                        "course_type": "1",
                        "course_number": "399261888497",
                        "thumb_up": "1",
                        "has_photo": "0",
                        "display_title": "总课程",
                        "anonymous": "0",
                        "total_score": "5.0",
                        "teacher_user_number": "478600978",
                        "private_domain": "478600978wxt",
                        "comment_id": "1386261",
                        "has_thumb_up": false,
                        "comprehensive_score": "5.0",
                        "course": {
                            "course_number": "399261888497",
                            "course_url": "http://m.genshuixue.com/teacher/one2oneCourseDetail/399261888497",
                            "teacher_name": "鸿鹄",
                            "course_type": "1",
                            "course_name": "萌妹子"
                        },
                        "user": {
                            "display_name": "烟  火",
                            "avatar_url": "https://img.genshuixue.com/2031512_4r8rviz6.jpeg",
                            "number": "455038118",
                            "url": "http://www.genshuixue.com/x/455038118"
                        },
                        "org_create_time": "2016-10-27 00:03:58",
                        "photo_list": [],
                        "is_my_comment": false,
                        "if_can_addition": false,
                        "if_can_review": false
                    }, {
                        "serial_number": "0",
                        "user_id": "509032",
                        "teacher_user_id": "543977",
                        "desc_match": "5.0",
                        "teach_result": "5.0",
                        "service_attitude": "5.0",
                        "face_type": "1",
                        "info": "未作出评价，系统默认评价！",
                        "create_time": "2016-11-30 06:10",
                        "fr": "1",
                        "course_type": "1",
                        "course_number": "399261888497",
                        "thumb_up": "0",
                        "has_photo": "0",
                        "display_title": "总课程",
                        "anonymous": "0",
                        "total_score": "5.0",
                        "teacher_user_number": "478600978",
                        "private_domain": "478600978wxt",
                        "comment_id": "1481035",
                        "has_thumb_up": false,
                        "comprehensive_score": "5.0",
                        "course": {
                            "course_number": "399261888497",
                            "course_url": "http://m.genshuixue.com/teacher/one2oneCourseDetail/399261888497",
                            "teacher_name": "鸿鹄",
                            "course_type": "1",
                            "course_name": "萌妹子"
                        },
                        "user": {
                            "display_name": "烟  火",
                            "avatar_url": "https://img.genshuixue.com/2031512_4r8rviz6.jpeg",
                            "number": "455038118",
                            "url": "http://www.genshuixue.com/x/455038118"
                        },
                        "org_create_time": "2016-11-30 06:10:59",
                        "photo_list": [],
                        "is_my_comment": false,
                        "if_can_addition": false,
                        "if_can_review": false
                    }, {
                        "serial_number": "0",
                        "user_id": "509032",
                        "teacher_user_id": "543977",
                        "desc_match": "5.0",
                        "teach_result": "5.0",
                        "service_attitude": "5.0",
                        "face_type": "1",
                        "info": "未作出评价，系统默认评价！",
                        "create_time": "2016-11-30 18:10",
                        "fr": "1",
                        "course_type": "1",
                        "course_number": "399261888497",
                        "thumb_up": "0",
                        "has_photo": "0",
                        "display_title": "总课程",
                        "anonymous": "0",
                        "total_score": "5.0",
                        "teacher_user_number": "478600978",
                        "private_domain": "478600978wxt",
                        "comment_id": "1481626",
                        "has_thumb_up": false,
                        "comprehensive_score": "5.0",
                        "course": {
                            "course_number": "399261888497",
                            "course_url": "http://m.genshuixue.com/teacher/one2oneCourseDetail/399261888497",
                            "teacher_name": "鸿鹄",
                            "course_type": "1",
                            "course_name": "萌妹子"
                        },
                        "user": {
                            "display_name": "烟  火",
                            "avatar_url": "https://img.genshuixue.com/2031512_4r8rviz6.jpeg",
                            "number": "455038118",
                            "url": "http://www.genshuixue.com/x/455038118"
                        },
                        "org_create_time": "2016-11-30 18:10:27",
                        "photo_list": [],
                        "is_my_comment": false,
                        "if_can_addition": false,
                        "if_can_review": false
                    }]
                }, {
                    "serial_number": "170105713609",
                    "user_id": "509032",
                    "teacher_user_id": "543977",
                    "desc_match": "4.0",
                    "teach_result": "4.0",
                    "service_attitude": "4.0",
                    "face_type": "1",
                    "info": "啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊",
                    "create_time": "2017-01-07 00:15",
                    "fr": "0",
                    "course_type": "1",
                    "course_number": "448932930927",
                    "thumb_up": "0",
                    "has_photo": "0",
                    "display_title": "第2课节(01月07日)",
                    "anonymous": "0",
                    "total_score": "4.0",
                    "comment_num": "2",
                    "teacher_user_number": "478600978",
                    "private_domain": "478600978wxt",
                    "comment_id": "1544531",
                    "has_thumb_up": false,
                    "comprehensive_score": "4.0",
                    "course": {
                        "course_number": "448932930927",
                        "course_url": "http://m.genshuixue.com/teacher/one2oneCourseDetail/448932930927",
                        "teacher_name": "鸿鹄",
                        "course_type": "1",
                        "course_name": "常见小病入门知识"
                    },
                    "user": {
                        "display_name": "烟  火",
                        "avatar_url": "https://img.genshuixue.com/2031512_4r8rviz6.jpeg",
                        "number": "455038118",
                        "url": "http://www.genshuixue.com/x/455038118"
                    },
                    "org_create_time": "2017-01-07 00:15:57",
                    "photo_list": [],
                    "is_my_comment": false,
                    "if_can_addition": false,
                    "if_can_review": false,
                    "additional": {
                        "teacher": {
                            "teacher_comment_id": "1544531",
                            "info": "咔咔咔咔咔咔",
                            "type": "2",
                            "create_time": "当天追评：",
                            "org_create_time": "2017-01-07 00:16:15"
                        }
                    },
                    "has_more": 0,
                    "can_open": 1,
                    "other_comment": [{
                        "serial_number": "170105714757",
                        "user_id": "509032",
                        "teacher_user_id": "543977",
                        "desc_match": "5.0",
                        "teach_result": "5.0",
                        "service_attitude": "5.0",
                        "face_type": "1",
                        "info": "啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊",
                        "create_time": "2017-01-06 20:40",
                        "fr": "0",
                        "course_type": "1",
                        "course_number": "448932930927",
                        "thumb_up": "0",
                        "has_photo": "0",
                        "display_title": "第1课节(01月06日)",
                        "anonymous": "0",
                        "total_score": "5.0",
                        "teacher_user_number": "478600978",
                        "private_domain": "478600978wxt",
                        "comment_id": "1543648",
                        "has_thumb_up": false,
                        "comprehensive_score": "5.0",
                        "course": {
                            "course_number": "448932930927",
                            "course_url": "http://m.genshuixue.com/teacher/one2oneCourseDetail/448932930927",
                            "teacher_name": "鸿鹄",
                            "course_type": "1",
                            "course_name": "常见小病入门知识"
                        },
                        "user": {
                            "display_name": "烟  火",
                            "avatar_url": "https://img.genshuixue.com/2031512_4r8rviz6.jpeg",
                            "number": "455038118",
                            "url": "http://www.genshuixue.com/x/455038118"
                        },
                        "org_create_time": "2017-01-06 20:40:20",
                        "photo_list": [],
                        "is_my_comment": false,
                        "if_can_addition": false,
                        "if_can_review": false,
                        "additional": {
                            "teacher": {
                                "teacher_comment_id": "1543648",
                                "info": "好棒好棒的老师，哈哈哈哈哈哈哈哈哈哈哈哈哈",
                                "type": "2",
                                "create_time": "当天追评：",
                                "org_create_time": "2017-01-06 20:40:38"
                            }
                        }
                    }]
                }, {
                    "serial_number": "0",
                    "user_id": "509032",
                    "teacher_user_id": "543977",
                    "desc_match": "3.0",
                    "teach_result": "3.0",
                    "service_attitude": "3.0",
                    "face_type": "2",
                    "info": "一般般啦，一般般，知道了吗，哈哈哈哈",
                    "create_time": "2017-01-06 20:41",
                    "fr": "0",
                    "course_type": "1",
                    "course_number": "363022950577",
                    "thumb_up": "0",
                    "has_photo": "0",
                    "display_title": "总课程",
                    "anonymous": "0",
                    "total_score": "3.0",
                    "comment_num": "1",
                    "teacher_user_number": "478600978",
                    "private_domain": "478600978wxt",
                    "comment_id": "1543653",
                    "has_thumb_up": false,
                    "comprehensive_score": "3.0",
                    "course": {
                        "course_number": "363022950577",
                        "course_url": "http://m.genshuixue.com/teacher/one2oneCourseDetail/363022950577",
                        "teacher_name": "鸿鹄",
                        "course_type": "1",
                        "course_name": "women防身术"
                    },
                    "user": {
                        "display_name": "烟  火",
                        "avatar_url": "https://img.genshuixue.com/2031512_4r8rviz6.jpeg",
                        "number": "455038118",
                        "url": "http://www.genshuixue.com/x/455038118"
                    },
                    "org_create_time": "2017-01-06 20:41:41",
                    "photo_list": [],
                    "is_my_comment": false,
                    "if_can_addition": false,
                    "if_can_review": false,
                    "additional": {
                        "teacher": {
                            "teacher_comment_id": "1543653",
                            "info": "小疯子，哈哈哈哈哈哈哈哈哈~",
                            "type": "2",
                            "create_time": "当天追评：",
                            "org_create_time": "2017-01-06 20:45:19"
                        }
                    },
                    "has_more": 0,
                    "can_open": 0
                }, {
                    "serial_number": "0",
                    "user_id": "1811280",
                    "teacher_user_id": "543977",
                    "desc_match": "4.0",
                    "teach_result": "4.0",
                    "service_attitude": "4.0",
                    "face_type": "1",
                    "info": "四颗星好评，老师讲得不错，很喜欢，老师棒棒哒",
                    "create_time": "2016-12-26 22:00",
                    "fr": "0",
                    "course_type": "3",
                    "course_number": "1612149072601",
                    "thumb_up": "1",
                    "has_photo": "0",
                    "display_title": null,
                    "anonymous": "1",
                    "total_score": "5.0",
                    "comment_num": "1",
                    "teacher_user_number": "478600978",
                    "private_domain": "478600978wxt",
                    "comment_id": "1527951",
                    "has_thumb_up": false,
                    "comprehensive_score": "5.0",
                    "course": {
                        "course_number": "1612149072601",
                        "course_url": "http://m.genshuixue.com/video_course/getcourseshowdetail?number=1612149072601",
                        "teacher_name": "鸿鹄",
                        "course_type": "3",
                        "course_name": "付费直播课只有一节 (直播回放)"
                    },
                    "user": {
                        "display_name": "匿名用户",
                        "avatar_url": "https://imgs.genshuixue.com/0common/ic_anonymous_user_n.png",
                        "url": ""
                    },
                    "org_create_time": "2016-12-26 22:00:37",
                    "photo_list": [],
                    "is_my_comment": false,
                    "if_can_addition": false,
                    "if_can_review": false,
                    "additional": {
                        "teacher": {
                            "teacher_comment_id": "1527951",
                            "info": "谢谢同学们，我会继续努力的，争取越来越好",
                            "type": "2",
                            "create_time": "8天后追评：",
                            "org_create_time": "2017-01-03 15:56:05"
                        }
                    },
                    "has_more": 0,
                    "can_open": 0
                }],
                "additional": {
                    "face_type": {
                        "comment_tags": []
                    }
                },
                "my_comment_list": [],
                "my_comment_list_model": {
                    "my_comment_list": [],
                    "total_number": 0,
                    "my_comment_list_url": "/comment/getMyTeacherCommentList?teacher_number=415444278",
                    "has_more": 1
                },
                "can_comment_list": [],
                "declare_Tpl": "v2/resources/page/comment/commentDetail/component/commentTab.tpl",
                "tpl": "<div class=\"comment-panel\">  <div class=\"no-comment\"> <img src=\"https://img.genshuixue.com/0cms/d/file/content/2015/09/55e58e64b2c1e.png\" alt=\"\"> <p>暂无评价数据</p> </div>\n </div>"
            },
            "html": "",
            "msg": "succ"
        }
    };
};

/* eslint-enable fecs-camelcase */