<?php

require("../bootstrap.php");

render(
    "student/index",
    [
        "tpl_data" => [
            "huike" => array(
                "is_huike_student" => 1,
                "org_url" => 'http://www.genshuixue.com'
            ),
            "is_self" => 1, // 是否是本人登录
            "basic_info" => [ // 基本信息
                "user_number" => "918994918",
                "realname" => "刘美玉",
                "nickname" => "马威刘美玉刘美玉",
                "view_count" => 222,
                "sex" => 0, // 0：女，1：男
                "mobile" => "13600000000",
                "avatar" => "http://img.gsxservice.com/554404_dlolowlb.jpeg",
                "birthday" => 1428913574,
                "short_introduce" => "互联网产品学习者",
                "private_domain" => "http://www.genshuixue.com/x/liumeiyu",
                "address" => [
                    "province" => [
                        "name" => "北京"
                    ],
                    "city" => [
                        "name" => "北京"
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
            "background" => [ // 教育背景
                "colleges" => [ // 大学
                    [
                        "school_name" => "清华大学", // 学校名称
                        "enter_school" => "2015", //入学年份
                        "department_name" => "中国语言文学系",//院系名称
                        "identity" => "1",//身份类别 0:大学生 1:硕士 2:博士 3:校工 4:教师
                    ],
                    [
                        "school_name" => "北京大学", // 学校名称
                        "enter_school" => "2014", //入学年份
                        "department_name" => "中国古脊椎动物研究系",//院系名称
                        "identity" => "1",//身份类别 0:大学生 1:硕士 2:博士 3:校工 4:教师
                    ],
                ],
                "senior_schools" => [ // 高中
                    [
                        "school_name" => "北京二十四中学", // 学校名称
                        "enter_school" => "2014", //入学年份
                        "class" => [
                            "2", //表示高一2班
                            "3", //表示高二3班
                            "4", //表示高三4班
                        ]
                    ],
                    [
                        "school_name" => "北京二十中学", // 学校名称
                        "enter_school" => "2014", //入学年份
                        "class" => [
                            "1", //表示高一1班
                            "5", //表示高二5班
                            "12", //表示高三12班
                        ]
                    ],
                ],
                "special_schools" => [ // 中专
                    [
                        "school_name" => "东城财政贸易干部学校", // 学校名称
                        "enter_school" => "2014", //入学年份
                    ],
                    [
                        "school_name" => "东城财政贸易干部学校", // 学校名称
                        "enter_school" => "2014", //入学年份
                    ],
                ],
                "middle_schools" => [ // 初中
                    [
                        "school_name" => "北京育才中学", // 学校名称
                        "enter_school" => "2014", //入学年份
                    ],
                    [
                        "school_name" => "东aasdfas阿斯顿发干部学校", // 学校名称
                        "enter_school" => "2014", //入学年份
                    ],
                ],
                "primary_schools" => [ // 小学
                    [
                        "school_name" => "范庄小学", // 学校名称
                        "enter_school" => "2012", //入学年份
                    ],
                    [
                        "school_name" => "东城小学", // 学校名称
                        "enter_school" => "2010", //入学年份
                    ],
                ],
            ],
            "work" => [ // 工作信息
                [
                    "company_name" => "跟谁学", //公司名称
                    "start_date" => "2015-03", //入职时间
                    "end_date" => "-1", //离职时间,没填就是null,至今就是负值
                    "industry_first" => [
                        "name" => "高新技术" //一级行业名称
                    ],
                    "industry_second" => [
                        "name" => "通讯/电信(设备/运营)" //二级行业名称
                    ],
                    "job_first" => [
                        "name" => "市场/市场拓展/公关" // 一级职务名称
                    ],
                    "job_second" => [
                        "name" => "市场营销经理/主管" //二级职务名称
                    ]
                ],
                [
                    "company_name" => "跟谁学", //公司名称
                    "start_date" => "2015-03", //入职时间
                    "end_date" => "2015-03", //离职时间,没填就是null,至今就是负值
                    "industry_first" => [
                        "name" => "高新技术" //一级行业名称
                    ],
                    "industry_second" => [
                        "name" => "通讯/电信(设备/运营)" //二级行业名称
                    ],
                    "job_first" => [
                        "name" => "市场/市场拓展/公关" // 一级职务名称
                    ],
                    "job_second" => [
                        "name" => "市场营销经理/主管" //二级职务名称
                    ]
                ],
            ],
            "trajectory_hide" => true, // 学生设置 － 是否隐藏学习轨迹
            "trajectory" => [ // 学习轨迹
                "now_learning" => 12 , //正在学
                "has_learned" => 32 , //已学过
                "trajectory_link" => "",//学习轨迹链接
                "learnings" => [ // 正在学课程list
                    [
                        "date" => "2015-03-05",
                        "courses" => [
                            [
                                "course_name" => "新媒新新媒体蕴藏的产品机遇媒体蕴藏的产品机遇体蕴藏的产品机遇",//课程名称,30个字限制
                                "course_link" => "http://www.genshuixue.com/teacher/classCourseDetail?number=150326477789", //课程链接
                                "course_type" => "一对一", //课程类别 一对一、直播课、视频课
                                "teacher_name" => "千阳老师",// 老师名一对一,多余3个老师是,每个老师名字4字截断
                                "teacher_link" => "http://www.genshuixue.com/shiquangteacher",//老师主页链接
                                "course_process" => 3, //1对1有3个小时
                            ],
                            [
                                "course_name" => "新媒体蕴藏的产品机遇",//课程名称,30个字限制
                                "course_link" => "http://www.genshuixue.com/teacher/classCourseDetail?number=150326477789", //课程链接
                                "course_type" => "视频课", //课程类别 一对一、直播课、视频课
                                "teacher_name" => "千阳老师",// 老师名字,多余3个老师是,每个老师名字4字截断
                                "teacher_link" => "http://www.genshuixue.com/shiquangteacher",//老师主页链接
                                "course_process" => 3, //第3课节
                            ],
                            [
                                "course_name" => "新媒体蕴藏的产品机遇",//课程名称,30个字限制
                                "course_link" => "http://www.genshuixue.com/teacher/classCourseDetail?number=150326477789", //课程链接
                                "course_type" => "直播课", //课程类别 一对一、直播课、视频课
                                "teacher_name" => "千阳老师",// 老师名字,多余3个老师是,每个老师名字4字截断
                                "teacher_link" => "http://www.genshuixue.com/shiquangteacher",//老师主页链接
                                "course_process" => 3, //第3课节
                            ],
                        ]
                    ],
                    [
                        "date" => "2015-03-05",
                        "courses" => [
                            [
                                "course_name" => "新媒体蕴藏的产品机遇",//课程名称,30个字限制
                                "course_link" => "http://www.genshuixue.com/teacher/classCourseDetail?number=150326477789", //课程链接
                                "course_type" => "直播课", //课程类别 一对一、直播课、视频课
                                "teacher_name" => "千阳老师",// 老师名字,多余3个老师是,每个老师名字4字截断
                                "teacher_link" => "http://www.genshuixue.com/shiquangteacher",//老师主页链接
                                "course_process" => 3, //第3课节
                            ],
                            [
                                "course_name" => "新媒体蕴藏的产品机遇",//课程名称,30个字限制
                                "course_link" => "http://www.genshuixue.com/teacher/classCourseDetail?number=150326477789", //课程链接
                                "course_type" => "直播课", //课程类别 一对一、直播课、视频课
                                "teacher_name" => "千阳老师阿斯顿发",// 老师名字,多余3个老师是,每个老师名字4字截断
                                "teacher_link" => "http://www.genshuixue.com/shiquangteacher",//老师主页链接
                                "course_process" => 3, //第3课节
                            ],
                            [
                                "course_name" => "新媒体蕴藏的产品机遇",//课程名称,30个字限制
                                "course_link" => "http://www.genshuixue.com/teacher/classCourseDetail?number=150326477789", //课程链接
                                "course_type" => "直播课", //课程类别 一对一、直播课、视频课
                                "teacher_name" => "千阳老师",// 老师名字,多余3个老师是,每个老师名字4字截断
                                "teacher_link" => "http://www.genshuixue.com/shiquangteacher",//老师主页链接
                                "course_process" => 3, //第3课节
                            ],
                        ]
                    ],
                    [
                        "date" => "2015-03-05",
                        "courses" => [
                            [
                                "course_name" => "新媒新新媒体蕴藏的产品机遇媒体蕴藏的产品机遇体蕴藏的产品机遇",//课程名称,30个字限制
                                "course_link" => "http://www.genshuixue.com/teacher/classCourseDetail?number=150326477789", //课程链接
                                "course_type" => "一对一", //课程类别 一对一、直播课、视频课
                                "teacher_name" => "千阳老师",// 老师名一对一,多余3个老师是,每个老师名字4字截断
                                "teacher_link" => "http://www.genshuixue.com/shiquangteacher",//老师主页链接
                                "course_process" => 3, //1对1有3个小时
                            ],
                            [
                                "course_name" => "新媒体蕴藏的产品机遇",//课程名称,30个字限制
                                "course_link" => "http://www.genshuixue.com/teacher/classCourseDetail?number=150326477789", //课程链接
                                "course_type" => "视频课", //课程类别 一对一、直播课、视频课
                                "teacher_name" => "千阳老师",// 老师名字,多余3个老师是,每个老师名字4字截断
                                "teacher_link" => "http://www.genshuixue.com/shiquangteacher",//老师主页链接
                                "course_process" => 3, //第3课节
                            ],
                            [
                                "course_name" => "新媒体蕴藏的产品机遇",//课程名称,30个字限制
                                "course_link" => "http://www.genshuixue.com/teacher/classCourseDetail?number=150326477789", //课程链接
                                "course_type" => "直播课", //课程类别 一对一、直播课、视频课
                                "teacher_name" => "千阳老师",// 老师名字,多余3个老师是,每个老师名字4字截断
                                "teacher_link" => "http://www.genshuixue.com/shiquangteacher",//老师主页链接
                                "course_process" => 3, //第3课节
                            ],
                        ]
                    ],
                    [
                        "date" => "2015-03-05",
                        "courses" => [
                            [
                                "course_name" => "新媒体蕴藏的产品机遇",//课程名称,30个字限制
                                "course_link" => "http://www.genshuixue.com/teacher/classCourseDetail?number=150326477789", //课程链接
                                "course_type" => "直播课", //课程类别 一对一、直播课、视频课
                                "teacher_name" => "千阳老师",// 老师名字,多余3个老师是,每个老师名字4字截断
                                "teacher_link" => "http://www.genshuixue.com/shiquangteacher",//老师主页链接
                                "course_process" => 3, //第3课节
                            ],
                            [
                                "course_name" => "新媒体蕴藏的产品机遇",//课程名称,30个字限制
                                "course_link" => "http://www.genshuixue.com/teacher/classCourseDetail?number=150326477789", //课程链接
                                "course_type" => "直播课", //课程类别 一对一、直播课、视频课
                                "teacher_name" => "千阳老师阿斯顿发",// 老师名字,多余3个老师是,每个老师名字4字截断
                                "teacher_link" => "http://www.genshuixue.com/shiquangteacher",//老师主页链接
                                "course_process" => 3, //第3课节
                            ],
                            [
                                "course_name" => "新媒体蕴藏的产品机遇",//课程名称,30个字限制
                                "course_link" => "http://www.genshuixue.com/teacher/classCourseDetail?number=150326477789", //课程链接
                                "course_type" => "直播课", //课程类别 一对一、直播课、视频课
                                "teacher_name" => "千阳老师",// 老师名字,多余3个老师是,每个老师名字4字截断
                                "teacher_link" => "http://www.genshuixue.com/shiquangteacher",//老师主页链接
                                "course_process" => 3, //第3课节
                            ],
                        ]
                    ],
                ]
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
