<?php

require("../bootstrap.php");

render(
    "student/trackLearned",
    [
        "tpl_data" => [
            "trajectory_hide" => false, // 学生设置 － 是否隐藏学习轨迹
            "basic_info" => [
                "user_number" => "918994918",
                "realname" => "刘美玉",
                "nickname" => "马威",
                "view_count" => 222,
                "sex" => 0,
                // 0：女，1：男
                "mobile" => "13600000000",
                "avatar" => "http://img.gsxservice.com/554404_dlolowlb.jpeg",
                "birthday" => 1428913574,
                "short_introduce" => "互联网产品学习者",
                "private_domain" => "http://www.genshuixue.com/x/liumeiyu",
                "address" => [
                    "province" => [
                        "name" => "安徽"
                    ],
                    "city" => [
                        "name" => "安庆"
                    ],
                    "area" => [
                        "name" => "湖区"
                    ]
                ],
                "subjects" => [
                    [
                        "id" => 577,
                        "name" => "钢琴",
                    ],
                    [
                        "id" => 588,
                        "name" => "吉他",
                    ]
                ],
            ],
            "learn_now" => [ // 正在学课程list
                "number" => 0,
                "page_now" => 1,
                //当前所在页
                "page_size" => 10,
                "courses" => [
                    [
                        "course_name" => "新媒体蕴藏的产品机遇", //课程名称
                        "course_cover" => "http://test-img.gsxservice.com/178885_ccuai5j3.png",
                        //课程封面url
                        "course_link" => "http://www.genshuixue.com/teacher/classCourseDetail?number=150326477789",
                        //课程链接
                        "course_type" => "直播课",
                        //课程类别（一对一、直播课、视频课）
                        "course_date" => 1428913574,
                        //学习日期
                        "course_process" => 3,
                        //学习进度（一对一：已学小时数，直播课：已学课节数，视频课：已学课节数）
                        "teacher_name" => "钱杨老师",
                        //老师姓名，多余3个老师是，每个老师名字4字截断
                        "teacher_link" => "http://www.genshuixue.com/t/shiguangteacher",
                        //老师主页链接
                    ],
                    [
                        "course_name" => "新媒体蕴藏的产品机遇", //课程名称
                        "course_cover" => "http://test-img.gsxservice.com/178885_ccuai5j3.png",
                        //课程封面url
                        "course_link" => "http://www.genshuixue.com/teacher/classCourseDetail?number=150326477789",
                        //课程链接
                        "course_type" => "直播课",
                        //课程类别（一对一、直播课、视频课）
                        "course_date" => 1428913574,
                        //学习日期
                        "course_process" => 3,
                        //学习进度（一对一：已学小时数，直播课：已学课节数，视频课：已学课节数）
                        "teacher_name" => "钱杨老师",
                        //老师姓名，多余3个老师是，每个老师名字4字截断
                        "teacher_link" => "http://www.genshuixue.com/t/shiguangteacher",
                        //老师主页链接
                    ],
                ],
            ],
            "learn_done" => [ // 已学过课程
                "number" => 10, // 课程数
                "page_now" => 2, // 当前页
                "page_size" => 10,
                "courses" => [
                    [
                        "course_name" => "新媒体蕴藏的产品机遇", //课程名称
                        "course_cover" => "http://test-img.gsxservice.com/178885_ccuai5j3.png",
                        //课程封面url
                        "course_link" => "http://www.genshuixue.com/teacher/classCourseDetail?number=150326477789",
                        //课程链接
                        "course_type" => "直播课",
                        //课程类别（一对一、直播课、视频课）
                        "course_total" => 10,
                        //学习计划（一对一：购买小时数，直播课：购买课节数，视频课：购买课节数）
                        "course_process" => 3,
                        //学习进度（一对一：已学小时数，直播课：已学课节数，视频课：已学课节数）
                        "course_detail" => [
                        //学习详情
                            [
                                "date" => "2015-03-01",
                                "total" => 1
                            ],
                            [
                                "date" => "2015-03-03",
                                "total" => 2
                            ]
                         ],
                        "course_date" => 1428913574,
                        //最近学习日期
                        "teacher_name" => "钱杨老师",
                        //老师姓名，多余3个老师是，每个老师名字4字截断
                        "teacher_link" => "http://www.genshuixue.com/t/shiguangteacher",
                        //老师主页链接
                    ],
                    [
                        "course_name" => "新媒体蕴藏的产品机遇", //课程名称
                        "course_cover" => "http://test-img.gsxservice.com/178885_ccuai5j3.png",
                        //课程封面url
                        "course_link" => "http://www.genshuixue.com/teacher/classCourseDetail?number=150326477789",
                        //课程链接
                        "course_type" => "视频课",
                        //课程类别（一对一、直播课、视频课）
                        "course_total" => 10,
                        //学习计划（一对一：购买小时数，直播课：购买课节数，视频课：购买课节数）
                        "course_process" => 4,
                        //学习进度（一对一：已学小时数，直播课：已学课节数，视频课：已学课节数）
                        "course_detail" => [
                        //学习详情
                            [
                                "date" => "2015-03-01",
                                "total" => 1
                            ],
                            [
                                "date" => "2015-03-03",
                                "total" => 2
                            ]
                         ],
                        "course_date" => 1428913574,
                        //最近学习日期
                        "teacher_name" => "钱杨老师",
                        //老师姓名，多余3个老师是，每个老师名字4字截断
                        "teacher_link" => "http://www.genshuixue.com/t/shiguangteacher",
                        //老师主页链接
                    ],
                    [
                        "course_name" => "新媒体蕴藏的产品机遇", //课程名称
                        "course_cover" => "http://test-img.gsxservice.com/178885_ccuai5j3.png",
                        //课程封面url
                        "course_link" => "http://www.genshuixue.com/teacher/classCourseDetail?number=150326477789",
                        //课程链接
                        "course_type" => "一对一",
                        //课程类别（一对一、直播课、视频课）
                        "course_total" => 10,
                        //学习计划（一对一：购买小时数，直播课：购买课节数，视频课：购买课节数）
                        "course_process" => 5,
                        //学习进度（一对一：已学小时数，直播课：已学课节数，视频课：已学课节数）
                        "course_detail" => [
                        //学习详情
                            [
                                "date" => "2015-03-01",
                                "total" => 1
                            ],
                            [
                                "date" => "2015-03-03",
                                "total" => 2
                            ]
                         ],
                        "course_date" => 1428913574,
                        //最近学习日期
                        "teacher_name" => "钱杨老师",
                        //老师姓名，多余3个老师是，每个老师名字4字截断
                        "teacher_link" => "http://www.genshuixue.com/t/shiguangteacher",
                        //老师主页链接
                    ],
                ],
            ],
            /*
            "current_visitor" => array(
                "has_buy" => true, // 是否购买过付费课程
                "vip_limit" => true, // vip等级限制了 是否可查看学习轨迹
                "org_id" => 0, // 如果是机构老师，其所属机构ID
                "has_pay" => false // 是否购买过付费课
            )
            */
        ]
    ]
);
