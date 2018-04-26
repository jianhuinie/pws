<?php

/**
 * 优选一对一课程详情页
 */
require("../bootstrap.php");

render(
    "one2one/betterDetail",
    array(
        "tpl_data" => array(
            "one_on_one_teacher_mobile" => "110119", // 预约电话
            "comment_summary" => array( // 评论
                "count" => "7",
                "favorable_count" => "4",
                "score" => "3.6"
            ),
            "query_one_on_one_course" => array(
                "m_url" => 'http://test-m.genshuixue.com/', // M站详情页链接
                "number" => "17042747584410",
                "link_numbers" => "357507604807,357507522927,314725519727,363043819847,357675274567,404483727887,356165435407,357507443687,319926643727",
                "name" => "小学·数学",
                "lesson_ways" => array( // 授课方式
                    "ONLINE",
                    "STUDENT",
                    "TEACHER"
                ),
                "teach_length_hours" => 9,
                "student_count" => 5,
                "categories" => array( // 授课类型
                    array(
                        "name" => "一年级"
                    ),
                    array(
                        "name" => "三年级"
                    ),
                    array(
                        "name" => "五年级"
                    )
                ),
                "price_range" => array(
                    "max" => "1000.00",
                    "min" => "1.00"
                ),
                "address" => array(
                    "area_path_str" => "北京-北京-丰台区",
                    "lng" => 116.37808990479,
                    "lat" => 39.843589782715
                ),
                "videos" => array(
                    array(
                        "title" => "111111111",
                        "play_url_m" => "https://beta-m.genshuixue.com/video/play_view/125890",
                        "cover_url" => "http://img.gsxservice.com/00-x-upload/image/1278788_dc0d238075ed3c9a5e37cf4ba5061979_XPRN5AJ7.jpg"
                    ),
                    array(
                        "title" => "2222222",
                        "play_url_m" => "https://beta-m.genshuixue.com/video/play_view/125890",
                        "cover_url" => "http://img.gsxservice.com/00-x-upload/image/1278788_dc0d238075ed3c9a5e37cf4ba5061979_XPRN5AJ7.jpg"
                    ),
                    array(
                        "title" => "33333333",
                        "play_url_m" => "https://beta-m.genshuixue.com/video/play_view/125890",
                        "cover_url" => "http://img.gsxservice.com/00-x-upload/image/1278788_dc0d238075ed3c9a5e37cf4ba5061979_XPRN5AJ7.jpg"
                    ),
                    array(
                        "title" => "111111111",
                        "play_url_m" => "https://beta-m.genshuixue.com/video/play_view/125890",
                        "cover_url" => "http://img.gsxservice.com/00-x-upload/image/1278788_dc0d238075ed3c9a5e37cf4ba5061979_XPRN5AJ7.jpg"
                    ),
                    array(
                        "title" => "2222222",
                        "play_url_m" => "https://beta-m.genshuixue.com/video/play_view/125890",
                        "cover_url" => "http://img.gsxservice.com/00-x-upload/image/1278788_dc0d238075ed3c9a5e37cf4ba5061979_XPRN5AJ7.jpg"
                    ),
                    array(
                        "title" => "33333333",
                        "play_url_m" => "https://beta-m.genshuixue.com/video/play_view/125890",
                        "cover_url" => "http://img.gsxservice.com/00-x-upload/image/1278788_dc0d238075ed3c9a5e37cf4ba5061979_XPRN5AJ7.jpg"
                    )
                ),
                "covers" => array(
                    array(
                        "title" => "1111111111111",
                        "image_url" => "https://imgs.genshuixue.com/33347548_1kwbv8rp.jpeg"
                    ),
                    array(
                        "title" => "2222222222222",
                        "image_url" => "https://imgs.genshuixue.com/33347554_9j562zy1.jpeg"
                    ),
                    array(
                        "title" => "333333333333",
                        "image_url" => "https://imgs.genshuixue.com/33347556_x3hykvnj.jpeg"
                    ),
                    array(
                        "title" => "444444",
                        "image_url" => "https://imgs.genshuixue.com/33347566_v3ii31ru.jpeg"
                    )
                ),
                "honors" => array( // 荣誉奖励
                    array(
                        "title" => "1111111111",
                        "image_url" => "https://imgs.genshuixue.com/33347575_yzm6nkxw.jpeg"
                    ),
                    array(
                        "title" => "1111111111",
                        "image_url" => "https://imgs.genshuixue.com/33347575_yzm6nkxw.jpeg"
                    ),
                    array(
                        "title" => "1111111111",
                        "image_url" => "https://imgs.genshuixue.com/33347575_yzm6nkxw.jpeg"
                    ),
                    array(
                        "title" => "1111111111",
                        "image_url" => "https://imgs.genshuixue.com/33347575_yzm6nkxw.jpeg"
                    ),
                    array(
                        "title" => "1111111111",
                        "image_url" => "https://imgs.genshuixue.com/33347575_yzm6nkxw.jpeg"
                    ),
                    array(
                        "title" => "1111111111",
                        "image_url" => "https://imgs.genshuixue.com/33347575_yzm6nkxw.jpeg"
                    )
                ),
                "success_cases" => array( // 成功案例
                    array(
                        "title" => "帮助学生取得进步",
                        "date" => "2011-03-01",
                        "content" => "刚学习的张同学对一切都很陌生花花世界大结局亟待解决的计算机超级大酒店基督教多久基督教多久简单小家伙的基督教多久觉得极度的上海市订货会大会"
                    ),
                    array(
                        "title" => "帮助学生取得进步",
                        "date" => "2011-03-01",
                        "content" => "刚学习的张同学对一切都很陌生花花世界大结局亟待解决的计算机超级大酒店基督教多久基督教多久简单小家伙的基督教多久觉得极度的上海市订货会大会"
                    ),
                    array(
                        "title" => "帮助学生取得进步",
                        "date" => "2011-03-01",
                        "content" => "刚学习的张同学对一切都很陌生花花世界大结局亟待解决的计算机超级大酒店基督教多久基督教多久简单小家伙的基督教多久觉得极度的上海市订货会大会"
                    )
                ),
                "support_hotline" => "4000-910-910",
                "teacher" => array( // 老师信息
                    "number" => "729387948",
                    "avatar_url" => "https://imgs.genshuixue.com/5088531_ubb03g8j.jpeg",
                    "display_name" => "小倩老师",
                    "short_introduce" => "壁立千仞，无欲则刚壁立千仞，无欲则刚壁立千仞，无欲则刚壁立千仞，无欲则刚壁立千仞，无欲则刚壁立千仞，无欲则刚壁立千仞，无欲则刚壁立千仞，无欲则刚壁立千仞，无欲则刚壁立千仞，无欲则刚啊",
                    "introduce" => "这里是我的自我介绍，认真负责的好老师",
                    "sex" => "FEMALE",
                    "display_school_age" => "30+",
                    "audio" => array(
                        "url" => "https://imgs.genshuixue.com/33359094_l6v9xubf.mp3",
                        "length_seconds" => 31
                    ),
                    "display_skills" => array(
                        array(
                            "title" => "认真负责"
                        ),
                        array(
                            "title" => "提分快"
                        ),
                        array(
                            "title" => "激发兴趣"
                        ),
                        array(
                            "title" => "效果明显"
                        ),
                        array(
                            "title" => "免费试听"
                        ),
                        array(
                            "title" => "认真负责"
                        ),
                        array(
                            "title" => "提分快"
                        ),
                        array(
                            "title" => "激发兴趣"
                        ),
                        array(
                            "title" => "效果明显"
                        ),
                        array(
                            "title" => "免费试听"
                        )
                    ),
                    "bios" => array( // 教学经历
                        array(
                            "start_date" => "2015-01-01",
                            "end_date" => "2017-10-01",
                            "content" => "1.详细描述你的教学经历、学习经历、工作经历等，有助于学生更好地了解你！\n2.详细描述你的教学经历、学习经历、工作经历等，有助于学生更好地了解你！\n3.详细描述你的教学经历、学习经历、工作经历等，有助于学生更好地了解你！\n4.详细描述你的教学经历、学习经历、工作经历等，有助于学生更好地了解你！\n5.详细描述你的教学经历、学习经历、工作经历等，有助于学生更好地了解你！"
                        ),
                        array(
                            "start_date" => "2015-01-01",
                            "end_date" => "2017-10-01",
                            "content" => "1.详细描述你的教学经历、学习经历、工作经历等，有助于学生更好地了解你！\n2.详细描述你的教学经历、学习经历、工作经历等，有助于学生更好地了解你！\n3.详细描述你的教学经历、学习经历、工作经历等，有助于学生更好地了解你！\n4.详细描述你的教学经历、学习经历、工作经历等，有助于学生更好地了解你！\n5.详细描述你的教学经历、学习经历、工作经历等，有助于学生更好地了解你！"
                        )
                    )
                )
            ),
            "crumb" => array( // 面包屑
                "host" => "http://www.genshuixue.com/bj/",
                "city" => array(
                    "name" => "北京"
                )
            ),
            "course_path" => array( // 面包屑 - 课程路径
                "1" => array(
                    "id" => "573",
                    "name" => "IT"
                ),
                "2" => array(
                    "id" => "578",
                    "name" => "常用软件",
                    "remark_name" => "其他"
                ),
                /*
                "3" => array(
                    "id" => "587",
                    "name" => "其他",
                    "remark_name" => "其他"
                )
                */
            ),
            "course_related" => array( // 面包屑 - 相关课程
                array(
                    "id" => "119",
                    "name" => "二年级",
                    "level" => "3",
                    "parent_id" => "116"
                ),
                array(
                    "id" => "121",
                    "name" => "四年级",
                    "level" => "3",
                    "parent_id" => "116"
                ),
                array(
                    "id" => "122",
                    "name" => "五年级",
                    "level" => "3",
                    "parent_id" => "116"
                ),
                array(
                    "id" => "123",
                    "name" => "六年级",
                    "level" => "3",
                    "parent_id" => "116"
                ),
                array(
                    "id" => "120",
                    "name" => "三年级",
                    "level" => "3",
                    "parent_id" => "116"
                ),
                array(
                    "id" => "118",
                    "name" => "一年级",
                    "level" => "3",
                    "parent_id" => "116"
                )
            )

        )
    )
);

