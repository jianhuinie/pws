<?php

require("../bootstrap.php");

render(
    "activity/videoList/liveList",
    array(
        "tpl_data" => array(
            "category" => array(
                "中小学" => array(
                    "icon" => "icon-k12",
                    "url" => "http://www.genshuixue.com",
                    "sub_class" => array(
                        array(
                            "name" => "高中",
                            "url" => "http://www.genshuixue.com",
                            "is_new" => true,
                            "is_hot" => false
                        ),
                        array(
                            "name" => "初中",
                            "url" => "http://www.genshuixue.com",
                            "is_new" => true,
                            "is_hot" => false
                        ),
                        array(
                            "name" => "高考",
                            "url" => "http://www.genshuixue.com",
                            "is_new" => true,
                            "is_hot" => false
                        ),
                        array(
                            "name" => "小升初",
                            "url" => "http://www.genshuixue.com",
                            "is_new" => true,
                            "is_hot" => false
                        ),
                        array(
                            "name" => "亲子",
                            "url" => "http://www.genshuixue.com",
                            "is_new" => true,
                            "is_hot" => false
                        )
                    )
                ),
                "出国留学" => array(
                    "icon" => "icon-plan",
                    "url" => "http://www.genshuixue.com",
                    "sub_class" => array(
                        array(
                            "name" => "留学考试",
                            "url" => "http://www.genshuixue.com",
                            "is_new" => true,
                            "is_hot" => false
                        ),
                        array(
                            "name" => "托福",
                            "url" => "http://www.genshuixue.com",
                            "is_new" => true,
                            "is_hot" => false
                        ),
                        array(
                            "name" => "雅思",
                            "url" => "http://www.genshuixue.com",
                            "is_new" => true,
                            "is_hot" => false
                        ),
                        array(
                            "name" => "SAT",
                            "url" => "http://www.genshuixue.com",
                            "is_new" => true,
                            "is_hot" => false
                        ),
                        array(
                            "name" => "GRE",
                            "url" => "http://www.genshuixue.com",
                            "is_new" => true,
                            "is_hot" => false
                        )
                    )
                ),
                "艺术兴趣" => array(
                    "icon" => "icon-interested",
                    "url" => "http://www.genshuixue.com",
                    "sub_class" => array(
                        array(
                            "name" => "时尚",
                            "url" => "http://www.genshuixue.com",
                            "is_new" => true,
                            "is_hot" => false
                        ),
                        array(
                            "name" => "生活",
                            "url" => "http://www.genshuixue.com",
                            "is_new" => true,
                            "is_hot" => false
                        ),
                        array(
                            "name" => "兴趣",
                            "url" => "http://www.genshuixue.com",
                            "is_new" => true,
                            "is_hot" => false
                        ),
                        array(
                            "name" => "体育",
                            "url" => "http://www.genshuixue.com",
                            "is_new" => true,
                            "is_hot" => false
                        ),
                        array(
                            "name" => "感情",
                            "url" => "http://www.genshuixue.com",
                            "is_new" => true,
                            "is_hot" => false
                        ),
                        array(
                            "name" => "艺术",
                            "url" => "http://www.genshuixue.com",
                            "is_new" => true,
                            "is_hot" => false
                        )
                    )
                ),
                "语言培训" => array(
                    "icon" => "icon-language",
                    "url" => "http://www.genshuixue.com",
                    "sub_class" => array(
                        array(
                            "name" => "考研英语",
                            "url" => "http://www.genshuixue.com",
                            "is_new" => true,
                            "is_hot" => false
                        ),
                        array(
                            "name" => "英语考级",
                            "url" => "http://www.genshuixue.com",
                            "is_new" => true,
                            "is_hot" => false
                        ),
                        array(
                            "name" => "日语",
                            "url" => "http://www.genshuixue.com",
                            "is_new" => true,
                            "is_hot" => false
                        ),
                        array(
                            "name" => "法语",
                            "url" => "http://www.genshuixue.com",
                            "is_new" => true,
                            "is_hot" => false
                        ),
                        array(
                            "name" => "英语口语",
                            "url" => "http://www.genshuixue.com",
                            "is_new" => true,
                            "is_hot" => false
                        )
                    )
                ),
                "技能&考试" => array(
                    "icon" => "icon-write",
                    "url" => "http://www.genshuixue.com",
                    "sub_class" => array(
                        array(
                            "name" => "职业指导",
                            "url" => "http://www.genshuixue.com",
                            "is_new" => true,
                            "is_hot" => false
                        ),
                        array(
                            "name" => "创业求职",
                            "url" => "http://www.genshuixue.com",
                            "is_new" => true,
                            "is_hot" => false
                        ),
                        array(
                            "name" => "沟通技巧",
                            "url" => "http://www.genshuixue.com",
                            "is_new" => true,
                            "is_hot" => false
                        ),
                        array(
                            "name" => "考研",
                            "url" => "http://www.genshuixue.com",
                            "is_new" => true,
                            "is_hot" => false
                        ),
                        array(
                            "name" => "IT培训",
                            "url" => "http://www.genshuixue.com",
                            "is_new" => true,
                            "is_hot" => false
                        ),
                        array(
                            "name" => "公务员",
                            "url" => "http://www.genshuixue.com",
                            "is_new" => true,
                            "is_hot" => false
                        )
                    )
                )
            ),
            "recent_live" => array(
                array(
                    "number" => "150910543574",
                    "name" => "晓松奇谈",
                    "price" => "0",
                    "sub_name" => "吉他",
                    "end_time" => 1448380800000,
                    "begin_time" => 1448698898,
                    "cover_url" => "http://test-img.gsxservice.com/381151_94eguhb6.jpeg",
                    "student_count" => 10,
                    "course_detail_url" => "http://tianrui-www.test.genshuixue.com/video_course/150910543574"
                ),
                array(
                    "number" => "150910543574",
                    "name" => "晓松奇谈",
                    "price" => "0",
                    "sub_name" => "吉他",
                    "end_time" => 1448380800000,
                    "begin_time" => 1448798898,
                    "cover_url" => "http://test-img.gsxservice.com/381151_94eguhb6.jpeg",
                    "student_count" => 10,
                    "course_detail_url" => "http://tianrui-www.test.genshuixue.com/video_course/150910543574"
                ),
                array(
                    "number" => "150910543574",
                    "name" => "晓松奇谈",
                    "price" => "0",
                    "sub_name" => "吉他",
                    "end_time" => 1448380800000,
                    "begin_time" => 1448412517,
                    "cover_url" => "http://test-img.gsxservice.com/381151_94eguhb6.jpeg",
                    "student_count" => 10,
                    "course_detail_url" => "http://tianrui-www.test.genshuixue.com/video_course/150910543574"
                ),
                array(
                    "number" => "150910543574",
                    "name" => "晓松奇谈",
                    "price" => "0",
                    "sub_name" => "吉他",
                    "end_time" => 1448380800000,
                    "begin_time" => 1448412517,
                    "cover_url" => "http://test-img.gsxservice.com/381151_94eguhb6.jpeg",
                    "student_count" => 10,
                    "course_detail_url" => "http://tianrui-www.test.genshuixue.com/video_course/150910543574"
                ),
                array(
                    "number" => "150910543574",
                    "name" => "晓松奇谈",
                    "price" => "0",
                    "sub_name" => "吉他",
                    "end_time" => 1448380800000,
                    "begin_time" => 1448412517,
                    "cover_url" => "http://test-img.gsxservice.com/381151_94eguhb6.jpeg",
                    "student_count" => 10,
                    "course_detail_url" => "http://tianrui-www.test.genshuixue.com/video_course/150910543574"
                ),
                array(
                    "number" => "150910543574",
                    "name" => "晓松奇谈",
                    "price" => "0",
                    "sub_name" => "吉他",
                    "end_time" => 1448380800000,
                    "begin_time" => 1448412517,
                    "cover_url" => "http://test-img.gsxservice.com/381151_94eguhb6.jpeg",
                    "student_count" => 10,
                    "course_detail_url" => "http://tianrui-www.test.genshuixue.com/video_course/150910543574"
                ),
                array(
                    "number" => "150910543574",
                    "name" => "晓松奇谈",
                    "price" => "0",
                    "sub_name" => "吉他",
                    "end_time" => 1448380800000,
                    "begin_time" => 1448412517,
                    "cover_url" => "http://test-img.gsxservice.com/381151_94eguhb6.jpeg",
                    "student_count" => 10,
                    "course_detail_url" => "http://tianrui-www.test.genshuixue.com/video_course/150910543574"
                ),
                array(
                    "number" => "150910543574",
                    "name" => "晓松奇谈",
                    "price" => "0",
                    "sub_name" => "吉他",
                    "end_time" => 1448380800000,
                    "begin_time" => 1448412517,
                    "cover_url" => "http://test-img.gsxservice.com/381151_94eguhb6.jpeg",
                    "student_count" => 10,
                    "course_detail_url" => "http://tianrui-www.test.genshuixue.com/video_course/150910543574"
                ),
                array(
                    "number" => "150910543574",
                    "name" => "晓松奇谈",
                    "price" => "0",
                    "sub_name" => "吉他",
                    "end_time" => 1448380800000,
                    "begin_time" => 1448412517,
                    "cover_url" => "http://test-img.gsxservice.com/381151_94eguhb6.jpeg",
                    "student_count" => 10,
                    "course_detail_url" => "http://tianrui-www.test.genshuixue.com/video_course/150910543574"
                )
            ),
            "recommend_live" => array(
                array(
                    "number" => "3297536804",
                    "name" => "维克05",
                    "price" => "1.0",
                    "sub_name" => "素描",
                    "end_time" => 0,
                    "begin_time" => 0,
                    "cover_url" => "http://test-img.gsxservice.com/377515_id3pr6u0.jpg",
                    "student_count" => 5,
                    "qid" => 11111,
                    "course_detail_url" => "http://tianrui-www.test.genshuixue.com/video_course/3297536804"
                ),
                array(
                    "number" => "151109482189",
                    "name" => "android自动化",
                    "price" => "0.0",
                    "sub_name" => "手工制作",
                    "end_time" => 1448465400000,
                    "begin_time" => 1448425800000,
                    "cover_url" => "http://test-img.gsxservice.com/395421_ap3144d5.jpeg",
                    "student_count" => 12,
                    "qid" => 11111,
                    "course_detail_url" => "http://tianrui-www.test.genshuixue.com/video_course/151109482189"
                ),
                array(
                    "number" => "15070773515",
                    "name" => "ios开发",
                    "price" => "0",
                    "sub_name" => "趣味编程",
                    "end_time" => 1448380800000,
                    "begin_time" => 1448698898,
                    "cover_url" => "http://test-img.gsxservice.com/http://test-img.gsxservice.com/359412_3xd1qcbh.jpeg",
                    "student_count" => 213,
                    "qid" => 11111,
                    "course_detail_url" => "http://tianrui-www.test.genshuixue.com/video_course/15070773515"
                ),
                array(
                    "number" => "",
                    "name" => "手工制作-linux操作与应用",
                    "price" => "1.0",
                    "sub_name" => null,
                    "end_time" => null,
                    "begin_time" => null,
                    "cover_url" => "http://test-img.gsxservice.com/390045_yi5lny9z.jpeg",
                    "student_count" => 0,
                    "qid" => 11111,
                    "course_detail_url" => "http://tianrui-www.test.genshuixue.com/video_course/0"
                ),
                array(
                    "number" => "3715112104",
                    "name" => "3年级14班",
                    "price" => "0.08",
                    "sub_name" => "现代舞",
                    "end_time" => 0,
                    "begin_time" => 0,
                    "cover_url" => "http://test-img.gsxservice.com/370616_tm3xixuw.jpg",
                    "student_count" => 15,
                    "qid" => 11111,
                    "course_detail_url" => "http://tianrui-www.test.genshuixue.com/video_course/3715112104"
                ),
                array(
                    "number" => "151104482757",
                    "name" => "霸王别姬",
                    "price" => "0.0",
                    "sub_name" => "形意拳",
                    "end_time" => 1448467200000,
                    "begin_time" => 1448402400000,
                    "cover_url" => "http://test-img.gsxservice.com/394692_d5t4d9qe.jpeg",
                    "student_count" => 43,
                    "qid" => 11111,
                    "course_detail_url" => "http://tianrui-www.test.genshuixue.com/video_course/151104482757"
                ),
                array(
                    "number" => "15032434806",
                    "name" => "这个是免费课1",
                    "price" => "0",
                    "sub_name" => "魔方",
                    "end_time" => null,
                    "begin_time" => null,
                    "cover_url" => "http://test-img.gsxservice.com/http://test-img.gsxservice.com/315328_1c86wsar.jpeg",
                    "student_count" => 227,
                    "qid" => 11111,
                    "course_detail_url" => "http://tianrui-www.test.genshuixue.com/video_course/15032434806"
                ),
                array(
                    "number" => "3715112104",
                    "name" => "3年级14班",
                    "price" => "0.08",
                    "sub_name" => "现代舞",
                    "end_time" => 0,
                    "begin_time" => 0,
                    "cover_url" => "http://test-img.gsxservice.com/370616_tm3xixuw.jpg",
                    "student_count" => 15,
                    "qid" => 11111,
                    "course_detail_url" => "http://tianrui-www.test.genshuixue.com/video_course/3715112104"
                ),
                array(
                    "number" => "151104482757",
                    "name" => "霸王别姬",
                    "price" => "0.0",
                    "sub_name" => "形意拳",
                    "end_time" => 1448467200000,
                    "begin_time" => 1448402400000,
                    "cover_url" => "http://test-img.gsxservice.com/394692_d5t4d9qe.jpeg",
                    "student_count" => 43,
                    "qid" => 11111,
                    "course_detail_url" => "http://tianrui-www.test.genshuixue.com/video_course/151104482757"
                ),
                array(
                    "number" => "15032434806",
                    "name" => "这个是免费课1",
                    "price" => "0",
                    "sub_name" => "魔方",
                    "end_time" => null,
                    "begin_time" => null,
                    "cover_url" => "http://test-img.gsxservice.com/http://test-img.gsxservice.com/315328_1c86wsar.jpeg",
                    "student_count" => 227,
                    "qid" => 11111,
                    "course_detail_url" => "http://tianrui-www.test.genshuixue.com/video_course/15032434806"
                )

            ),
            "recommend_qid" => 1111,
            "rank_live" => array(
                "pay" => array(
                    array(
                        "id" => 1,
                        "number" => "15063081893",
                        "name" => "这真的是个免费课",
                        "photo_url" => "http://test-img.gsxservice.com/358919_rn687gas.jpeg",
                        "detail_url" => "bjhlstudent =>//o.c?a=video_course&number=15063081893",
                        "price" => "1.00",
                        "second_info" => "共1节课程",
                        "first_info" => "12人正在学习",
                        "student_count" => "10",
                        "top_icon" => "http://img.gsxservice.com/0app/video/ic_video_top_n.png"
                    ),
                    array(
                        "id" => 1,
                        "number" => "15020334468",
                        "name" => "付费视频课009",
                        "photo_url" => "http://test-img.gsxservice.com/179236_hjz7yrbg.jpeg",
                        "detail_url" => "bjhlstudent =>//o.c?a=video_course&number=15020334468",
                        "price" => "8.00",
                        "second_info" => "共5节课程",
                        "first_info" => "6人正在学习",
                        "student_count" => "10",
                        "top_icon" => "http://img.gsxservice.com/0app/video/ic_video_top_n.png"
                    ),
                    array(
                        "id" => 1,
                        "number" => "15102249825",
                        "name" => "视频迁移后的一节视频课",
                        "photo_url" => "http://test-img.gsxservice.com/389124_i0ay41er.jpeg",
                        "detail_url" => "bjhlstudent =>//o.c?a=video_course&number=15102249825",
                        "price" => "2.00",
                        "second_info" => "共2节课程",
                        "first_info" => "2人正在学习",
                        "student_count" => "10",
                        "top_icon" => "http://img.gsxservice.com/0app/video/ic_video_top_n.png"
                    ),
                    array(
                        "id" => 1,
                        "number" => "15041343006",
                        "name" => "视频课1",
                        "photo_url" => "http://test-img.gsxservice.com/333102_oj1tgjhy.jpeg",
                        "detail_url" => "bjhlstudent =>//o.c?a=video_course&number=15041343006",
                        "price" => "2.00",
                        "second_info" => "共1节课程",
                        "first_info" => "26人正在学习",
                        "student_count" => "10",
                        "top_icon" => ""
                    )
                ),
                "free" => array(

                    array(
                        "id" => 1,
                        "number" => "15103141705",
                        "name" => "课程卡片测试视频课",
                        "photo_url" => "http://test-img.gsxservice.com/392734_ndf4itcq.jpeg",
                        "detail_url" => "bjhlstudent =>//o.c?a=video_course&number=15103141705",
                        "price" => "0.00",
                        "second_info" => "共1节课程",
                        "first_info" => "43播放",
                        "student_count" => "10",
                        "top_icon" => "http://img.gsxservice.com/0app/video/ic_video_top_n.png"
                    ),
                    array(
                        "id" => 1,
                        "number" => "15070673507",
                        "name" => "聚惠学产品化测试03；聚惠学产品化测试0",
                        "photo_url" => "http://test-img.gsxservice.com/381158_mksg5slq.jpeg",
                        "detail_url" => "bjhlstudent =>//o.c?a=video_course&number=15070673507",
                        "price" => "0.00",
                        "second_info" => "共1节课程",
                        "first_info" => "58播放",
                        "student_count" => "10",
                        "top_icon" => "http://img.gsxservice.com/0app/video/ic_video_top_n.png"
                    ),
                    array(
                        "id" => 1,
                        "number" => "15021134848",
                        "name" => "时尚盘发让你变身发型达人",
                        "photo_url" => "http://test-img.gsxservice.com/333693_xpxpvslt.jpeg",
                        "detail_url" => "bjhlstudent =>//o.c?a=video_course&number=15021134848",
                        "price" => "0.00",
                        "second_info" => "共1节课程",
                        "first_info" => "103播放",
                        "student_count" => "10",
                        "top_icon" => ""
                    ),
                    array(
                        "id" => 1,
                        "number" => "15070282029",
                        "name" => "聚惠学视频课04聚惠学视频课04聚惠学视",
                        "photo_url" => "http://test-img.gsxservice.com/359087_viebohyh.jpeg",
                        "detail_url" => "bjhlstudent =>//o.c?a=video_course&number=15070282029",
                        "price" => "0.00",
                        "second_info" => "共1节课程",
                        "first_info" => "110播放",
                        "student_count" => "10",
                        "top_icon" => ""
                    ),
                    array(
                        "id" => 1,
                        "number" => "15063049141",
                        "name" => "播音主持",
                        "photo_url" => "http://test-img.gsxservice.com/358886_bv6uxmln.jpeg",
                        "detail_url" => "bjhlstudent =>//o.c?a=video_course&number=15063049141",
                        "price" => "0.00",
                        "second_info" => "共1节课程",
                        "first_info" => "57播放",
                        "student_count" => "10",
                        "top_icon" => ""
                    ),
                    array(
                        "id" => 1,
                        "number" => "15111842029",
                        "name" => "免费课程222",
                        "photo_url" => "http://test-img.gsxservice.com/396500_8637jf2h.jpeg",
                        "detail_url" => "bjhlstudent =>//o.c?a=video_course&number=15111842029",
                        "price" => "1.00",
                        "second_info" => "共1节课程",
                        "first_info" => "16播放",
                        "student_count" => "10",
                        "top_icon" => ""
                    ),
                    array(
                        "id" => 1,
                        "number" => "15111950229",
                        "name" => "免费课程2",
                        "photo_url" => "http://test-img.gsxservice.com/396546_3d1dogbd.jpeg",
                        "detail_url" => "bjhlstudent =>//o.c?a=video_course&number=15111950229",
                        "price" => "1.00",
                        "second_info" => "共2节课程",
                        "first_info" => "12播放",
                        "student_count" => "10",
                        "top_icon" => ""
                    ),
                    array(
                        "id" => 1,
                        "number" => "15111174857",
                        "name" => "测试老师首页课程数据显示5",
                        "photo_url" => "http://test-img.gsxservice.com/395883_pigu1p4e.jpeg",
                        "detail_url" => "bjhlstudent =>//o.c?a=video_course&number=15111174857",
                        "price" => "0.00",
                        "second_info" => "共1节课程",
                        "first_info" => "11播放",
                        "student_count" => "10",
                        "top_icon" => ""
                    ),
                    array(
                        "id" => 1,
                        "number" => "15111842037",
                        "name" => "免费了快来购买",
                        "photo_url" => "http://test-img.gsxservice.com/396493_anvbkzmd.jpeg",
                        "detail_url" => "bjhlstudent =>//o.c?a=video_course&number=15111842037",
                        "price" => "1.00",
                        "second_info" => "共1节课程",
                        "first_info" => "10播放",
                        "student_count" => "10",
                        "top_icon" => ""
                    ),
                    array(
                        "id" => 1,
                        "number" => "15042743680",
                        "name" => "免费待支付视频课测试",
                        "photo_url" => "http://test-img.gsxservice.com/345334_9shuvbbg.jpeg",
                        "detail_url" => "bjhlstudent =>//o.c?a=video_course&number=15042743680",
                        "price" => "1.00",
                        "second_info" => "共4节课程",
                        "first_info" => "101播放",
                        "student_count" => "10",
                        "top_icon" => ""
                    ),
                    array(
                        "id" => 1,
                        "number" => "15050343944",
                        "name" => "免费成收费",
                        "photo_url" => "http://test-img.gsxservice.com/345921_gau1ayil.jpeg",
                        "detail_url" => "bjhlstudent =>//o.c?a=video_course&number=15050343944",
                        "price" => "2.00",
                        "second_info" => "共3节课程",
                        "first_info" => "13播放",
                        "student_count" => "10",
                        "top_icon" => ""
                    )

                )
            )
        )
    )
);
