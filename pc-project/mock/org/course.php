<?php


require("../bootstrap.php");

render(
    "org/course",
    // "orgRoom/course", // 汇课间
    array(
        "tpl_data" => array(
            "base_info" => array(
                "id" => "331618579",
                "name" => "古典艺术",
                "number" => "331618579",
                "is_gold_certification" => false,
                "comments_cnt" => "196",
                "location" => "北京",
                "score" => "4.5",
                "avatar" => "",
                "extension" => "4000-122-166 转 121510",
                "area_id" => "17039360",
                "brief" => "古典艺术是一门专门介绍和学习古典文化的一个机构",
                "tags" => array(
                    array(
                        "name" => "提分快"
                    ),
                    array(
                        "name" => "进步迅速"
                    ),
                    array(
                        "name" => "提高积极性"
                    ),
                    array(
                        "name" => "培养学习兴趣"
                    )
                ),
                "mobile" => "010-67706415",
                "domain" => "gudianyishu",
                "city_filter" => 1,
                "membership_level" => 1,
                "support_tianxiao" => false,
                "im_online_status" => 0
            ),
            "course_type" => 12, // 1班课 2视频课 11机构一对一 12机构班课
            "course" => array( // 班课 course_type = 1
                array(
                    "course_type" => 4,
                    "number" => "5839492804",
                    "name" => "中考语文",
                    "verify_status" => 1,
                    "display_status" => 2,
                    "max_student" => 12,
                    "total_pay" => 1,
                    "freq" => 12,
                    "begin_time" => "",
                    "end_time" => "",
                    "lesson_way" => "4",
                    "address_area" => array(
                        "full_address" => "北京海淀区北京市海淀区中关村软件园"
                    ),
                    "photos" => array(
                        array(
                            "url" => "http://test-img.gsxservice.com/817120_h1ew5nue.jpg",
                            "width" => "0",
                            "height" => "0"
                        )
                    ),
                    "offline_poi" => array(
                        "lng" => "116.303248",
                        "lat" => "40.058551"
                    ),
                    "course_len" => null,
                    "price" => "20",
                    "user_id" => null,
                    "fenqi" => array(
                        "tag_name" => "分期",
                        "tiexi_info" => "",
                        "desc" => "可享3期分期付学费"
                    ),
                    "discount" => array( // 限时折扣new
                        "start_time" => "2016-03-08 14:06:00",
                        "end_time" => "2017-10-11 14:06:00",
                        "type" => 2, // 1为限额 2为限时
                        "remain_amount" => 40, // 限额，剩余名额
                        "discount_price" => '0.03', //现价
                        "pre_price" => "83.32"//原价
                    ),
                    "tag_fenqi" => 0
                ),
                array(
                    "course_type" => 2,
                    "number" => "161115491542",
                    "name" => "大于500的课程",
                    "verify_status" => 1,
                    "display_status" => 2,
                    "max_student" => 45,
                    "total_pay" => 0,
                    "freq" => 0,
                    "begin_time" => "2016-12-16",
                    "end_time" => "2017-02-17",
                    "lesson_way" => "4",
                    "fenqi" => array(
                        "tag_name" => "分期",
                        "tiexi_info" => "",
                        "desc" => "可享3期分期付学费"
                    ),
                    "address_area" => array(
                        "full_address" => "北京朝阳区中关村e世界"
                    ),
                    "photos" => array(
                        array(
                            "url" => "http://test-img.gsxservice.com/520239_g5khbbyv.jpeg",
                            "width" => "510",
                            "height" => "285"
                        )
                    ),
                    "offline_poi" => array(
                        "lng" => "116.337795",
                        "lat" => "39.977523"
                    ),
                    "course_len" => "1",
                    "price" => "250",
                    "user_id" => 342199,
                    "discount" => array( // 限时折扣new
                        "start_time" => "2016-03-08 14:06:00",
                        "end_time" => "2017-10-11 14:06:00",
                        "type" => 1, // 1为限额 2为限时
                        "remain_amount" => 40, // 限额，剩余名额
                        "discount_price" => '0.03', //现价
                        "pre_price" => "83.32"//原价
                    ),
                    "tag_fenqi" => 0
                ),
                array(
                    "course_type" => 2,
                    "number" => "160425484498",
                    "name" => "although与but为何不能连用？a",
                    "verify_status" => 1,
                    "display_status" => 2,
                    "max_student" => 10,
                    "total_pay" => 0,
                    "freq" => 0,
                    "begin_time" => "2016-04-27",
                    "end_time" => "2017-02-18",
                    "lesson_way" => "4",
                    "address_area" => array(
                        "full_address" => "安徽安庆迎江区萨拉齐镇"
                    ),
                    "photos" => array(
                        array(
                            "url" => "http://test-img.gsxservice.com/421046_8xepwepq.jpeg",
                            "width" => "242",
                            "height" => "135"
                        )
                    ),
                    "offline_poi" => array(
                        "lng" => "117.058739",
                        "lat" => "30.537898"
                    ),
                    "course_len" => "1",
                    "price" => "67",
                    "user_id" => 342200,
                    "tag_fenqi" => 0
                ),
                array(
                    "course_type" => 2,
                    "number" => "160922557445",
                    "name" => "线下课------线下课线下课线下课线下课线下课",
                    "verify_status" => 1,
                    "display_status" => 2,
                    "max_student" => 3434,
                    "total_pay" => 1,
                    "freq" => 0,
                    "begin_time" => "2016-10-06",
                    "end_time" => "2017-02-18",
                    "lesson_way" => "4",
                    "address_area" => array(
                        "full_address" => "北京地铁e世纪广场"
                    ),
                    "photos" => array(
                        array(
                            "url" => "http://test-img.gsxservice.com/747235_ii3sbwoi.png",
                            "width" => "750",
                            "height" => "500"
                        )
                    ),
                    "offline_poi" => array(
                        "lng" => "116.395645",
                        "lat" => "39.929986"
                    ),
                    "course_len" => "2",
                    "price" => "5000",
                    "user_id" => 342199,
                    "tag_fenqi" => 1
                )
            ),
            /*
            "course" => array( // 视频课 course_type = 2
                array(
                    "number" => "15123150227",
                    "name" => "审核被拒",
                    "price" => 0,
                    "video_item_cnt" => "1",
                    "total_pay" => 176,
                    "photo_url" => "http://test-img.gsxservice.com/415735_2znefzsr.jpeg",
                    "play_url" => "https://test-m.genshuixue.com/video_course/getcourseshowdetail?number=15123150227",
                    "teacher" => array(
                        "name" => "水水",
                        "number" => "835693628"
                    ),
                    "course_lang" => "1",
                    "course_lang_str" => "中文_普通话",
                    "subject_info" => array(
                        array(
                            "name" => "小学"
                        ),
                        array(
                            "name" => "英语"
                        ),
                        array(
                            "name" => "全部"
                        )
                    ),
                    "limited_discount" => array(
                        "start_time" => 1480521600,
                        "end_time" => 1483199940,
                        "discount_price" => "0.00",
                        "pre_price" => "0.00",
                        "name" => "限时折扣"
                    ),
                    "discount" => array( // 限时折扣new
                        "start_time" => "2016-03-08 14:06:00",
                        "end_time" => "2017-10-11 14:06:00",
                        "type" => 2, // 1为限额 2为限时
                        "remain_amount" => 40, // 限额，剩余名额
                        "discount_price" => '0.03', //现价
                        "pre_price" => "83.32"//原价
                    ),
                    "user_id" => 342199,
                    "course_type" => 3,
                    "tag_fenqi" => 0
                ),
                array(
                    "number" => "15072281843",
                    "name" => "老师生效条件-视频课02",
                    "price" => 500,
                    "video_item_cnt" => "1",
                    "total_pay" => 1,
                    "photo_url" => "http://test-img.gsxservice.com/361193_84rqtw53.jpeg",
                    "play_url" => "https://test-m.genshuixue.com/video_course/getcourseshowdetail?number=15072281843",
                    "teacher" => array(
                        "name" => "水水",
                        "number" => "835693628"
                    ),
                    "course_lang" => "1",
                    "course_lang_str" => "中文_普通话",
                    "subject_info" => array(
                        array(
                            "name" => "体育"
                        ),
                        array(
                            "name" => "运动"
                        ),
                        array(
                            "name" => "游泳"
                        )
                    ),
                    "limited_discount" => array(),
                    "discount" => array( // 限时折扣new
                        "start_time" => "2016-03-08 14:06:00",
                        "end_time" => "2017-10-11 14:06:00",
                        "type" => 1, // 1为限额 2为限时
                        "remain_amount" => 40, // 限额，剩余名额
                        "discount_price" => '0.03', //现价
                        "pre_price" => "83.32"//原价
                    ),
                    "user_id" => 342199,
                    "course_type" => 3,
                    "tag_fenqi" => 1
                ),
                array(
                    "number" => "16070195189",
                    "name" => "CPS返奖学金-付费视频课",
                    "price" => 1213,
                    "video_item_cnt" => "1",
                    "total_pay" => 1,
                    "photo_url" => "http://test-img.gsxservice.com/736852_df4s4cnw.jpeg",
                    "play_url" => "https://test-m.genshuixue.com/video_course/getcourseshowdetail?number=16070195189",
                    "teacher" => array(
                        "name" => "水水",
                        "number" => "835693628"
                    ),
                    "course_lang" => "1",
                    "course_lang_str" => "中文_普通话",
                    "subject_info" => array(
                        array(
                            "name" => "初中"
                        ),
                        array(
                            "name" => "数学"
                        ),
                        array(
                            "name" => "全部"
                        )
                    ),
                    "limited_discount" => array(
                        "start_time" => 1480521600,
                        "end_time" => 1483199940,
                        "discount_price" => "606.50",
                        "pre_price" => "1213.00",
                        "name" => "限时折扣"
                    ),
                    "discount" => array( // 限时折扣new
                        "start_time" => "2016-03-08 14:06:00",
                        "end_time" => "2017-10-11 14:06:00",
                        "type" => 1, // 1为限额 2为限时
                        "remain_amount" => 40, // 限额，剩余名额
                        "discount_price" => '0.03', //现价
                        "pre_price" => "83.32"//原价
                    ),
                    "user_id" => 342199,
                    "course_type" => 3,
                    "tag_fenqi" => 1
                ),
                array(
                    "number" => "16051051250",
                    "name" => "验证免费课的删除功能",
                    "price" => 0,
                    "video_item_cnt" => "3",
                    "total_pay" => 0,
                    "photo_url" => "http://test-img.gsxservice.com/522994_urpw6gnt.jpeg",
                    "play_url" => "https://test-m.genshuixue.com/video_course/getcourseshowdetail?number=16051051250",
                    "teacher" => array(
                        "name" => "你是我的小苹果",
                        "number" => "835529638"
                    ),
                    "course_lang" => "1",
                    "course_lang_str" => "中文_普通话",
                    "subject_info" => array(
                        array(
                            "name" => "生活技能"
                        ),
                        array(
                            "name" => "家常菜"
                        ),
                        array(
                            "name" => "家常菜"
                        )
                    ),
                    "limited_discount" => array(
                        "start_time" => 1480521600,
                        "end_time" => 1483199940,
                        "discount_price" => "0.00",
                        "pre_price" => "0.00",
                        "name" => "限时折扣"
                    ),
                    "discount" => array( // 限时折扣new
                        "start_time" => "2016-03-08 14:06:00",
                        "end_time" => "2017-10-11 14:06:00",
                        "type" => 1, // 1为限额 2为限时
                        "remain_amount" => 40, // 限额，剩余名额
                        "discount_price" => '0.03', //现价
                        "pre_price" => "83.32"//原价
                    ),
                    "user_id" => 342171,
                    "course_type" => 3,
                    "tag_fenqi" => 0
                )
            ),
            */
            "selected" => array(
                array(
                    "name" => "分类",
                    "key" => "group",
                    "value" => -1,
                    "items" => array()
                )
            ),
            "pager" => array(
                "count" => 4,
                "page" => 1,
                "page_size" => 10
            ),
            "q" => "",
            "crumb" => array(
                array(
                    "name" => "跟谁学北京站",
                    "url" => "http://test.genshuixue.com/bj/"
                ),
                array(
                    "name" => "北京初中",
                    "url" => "http://test.genshuixue.com/bj/so--161.html"
                ),
                array(
                    "name" => "北京语文",
                    "url" => "http://test.genshuixue.com/bj/so--161_167.html"
                ),
                array(
                    "name" => "北京全部",
                    "url" => "http://test.genshuixue.com/bj/so--161_167_168.html"
                ),
                array(
                    "name" => "古典艺术",
                    "url" => "http://test.genshuixue.com/i/gudianyishu"
                ),
                array(
                    "name" => "课程",
                    "url" => "#"
                )
            ),
            "crumb_related" => array(
                array(
                    "id" => "169",
                    "name" => "初一",
                    "level" => "3",
                    "parent_id" => "167"
                ),
                array(
                    "id" => "171",
                    "name" => "初三",
                    "level" => "3",
                    "parent_id" => "167"
                ),
                array(
                    "id" => "168",
                    "name" => "全部",
                    "level" => "3",
                    "parent_id" => "167"
                ),
                array(
                    "id" => "170",
                    "name" => "初二",
                    "level" => "3",
                    "parent_id" => "167"
                )
            ),
            "pageInnerLinks" => array(
                "around" => array(
                    "title" => "周边城市",
                    "data" => array(
                        array(
                            "name" => "北京初中语文辅导班",
                            "link" => "http://www.genshuixue.com/bj/so--161_167_168.html"
                        ),
                        array(
                            "name" => "上海初中语文辅导班",
                            "link" => "http://www.genshuixue.com/sh/so--161_167_168.html"
                        ),
                        array(
                            "name" => "杭州初中语文辅导班",
                            "link" => "http://www.genshuixue.com/hangzhou/so--161_167_168.html"
                        )
                    )
                ),
                "recommend" => array(
                    array(
                        "name" => "初中语文辅导班",
                        "link" => "http://www.genshuixue.com/so/-161_167_168.html"
                    ),
                    array(
                        "name" => "跟谁学雅思",
                        "link" => "http://www.genshuixue.com/i-ielts/"
                    ),
                    array(
                        "name" => "跟谁学吉他",
                        "link" => "http://www.genshuixue.com/i-jita/"
                    ),
                    array(
                        "name" => "跟谁学幼升小",
                        "link" => "http://www.genshuixue.com/i-youshengxiao/"
                    ),
                    array(
                        "name" => "跟谁学小学库",
                        "link" => "http://www.genshuixue.com/i-youshengxiao/school/"
                    )
                ),
                "channel" => array(
                    "desc" => "北京北京初中语文频道简介：跟谁学北京北京初中语文频道为您提供大量真实有效的初中语文等初中语文信息。\n 同时，如果你属于初中语文一员的话，您也可以在跟谁学注册成为老师发布初中语文相关信息了来帮助更多想要学习的人。-初中语文培训触屏版",
                    "title" => "北京初中语文频道"
                ),
                "all" => array(
                    "A" => array(
                        array(
                            "name" => "澳洲国际游学中介机构",
                            "link" => "http://www.genshuixue.com/bj/so--376_383.html"
                        ),
                        array(
                            "name" => "澳洲澳洲国际游学中介机构",
                            "link" => "http://www.genshuixue.com/bj/so--376_383_384.html"
                        )
                    ),
                    "B" => array(
                        array(
                            "name" => "编程语言培训机构",
                            "link" => "http://www.genshuixue.com/bj/so--573_600.html"
                        ),
                        array(
                            "name" => "保险从业资格培训机构",
                            "link" => "http://www.genshuixue.com/bj/so--472_473_480.html"
                        )
                    ),
                    "C" => array(
                        array(
                            "name" => "C#培训机构",
                            "link" => "http://www.genshuixue.com/bj/so--573_600_608.html"
                        ),
                        array(
                            "name" => "产品培训机构",
                            "link" => "http://www.genshuixue.com/bj/so--573_1189.html"
                        ),
                        array(
                            "name" => "财务审计培训机构",
                            "link" => "http://www.genshuixue.com/bj/so--472_489.html"
                        )
                    ),
                    "D" => array(
                        array(
                            "name" => "地方公务员言语理解与表达培训机构",
                            "link" => "http://www.genshuixue.com/bj/so--817_826_827.html"
                        )
                    ),
                    "E" => array(
                        array(
                            "name" => "二级建造师培训机构",
                            "link" => "http://www.genshuixue.com/bj/so--634_635_638.html"
                        ),
                        array(
                            "name" => "EDM培训机构",
                            "link" => "http://www.genshuixue.com/bj/so--502_529_532.html"
                        )
                    ),
                    "F" => array(
                        array(
                            "name" => "FLASH培训机构",
                            "link" => "http://www.genshuixue.com/bj/so--573_578_582.html"
                        ),
                        array(
                            "name" => "服务器集群培训机构",
                            "link" => "http://www.genshuixue.com/bj/so--573_619_622.html"
                        )
                    ),
                    "Y" => array(
                        array(
                            "name" => "孕中期早教培训机构",
                            "link" => "http://www.genshuixue.com/bj/so--1_8_10.html"
                        )
                    ),
                    "Z" => array(
                        array(
                            "name" => "注册会计师培训机构",
                            "link" => "http://www.genshuixue.com/bj/so--472_489_493.html"
                        )
                    ),
                    "." => array(
                        array(
                            "name" => ".NET培训机构",
                            "link" => "http://www.genshuixue.com/bj/so--573_600_609.html"
                        )
                    )
                ),
                "local" => array(
                    "data" => array(
                        array(
                            "name" => "北京公务员培训机构",
                            "link" => "http://www.genshuixue.com/bj/so--817.html"
                        ),
                        array(
                            "name" => "北京培训机构",
                            "link" => "http://www.genshuixue.com/bj/so--1595.html"
                        )
                    ),
                    "title" => "北京机构"
                )
            ),
            "is_favored" => false,
            "popularity" => "4",
            "coupon" => array(
                array(
                    "id" => "19622852464793",
                    "total_money" => "2.00",
                    "cond_threshold" => "0.00",
                    "url" => "http://test.genshuixue.com/org/orgCoupon?coupon_id=19622852464793"
                ),
                array(
                    "id" => "19631442333833",
                    "total_money" => "199.00",
                    "cond_threshold" => "0.00",
                    "url" => "http://test.genshuixue.com/org/orgCoupon?coupon_id=19631442333833"
                )
            ),
            "support_student_advisory" => true,
            "title" => "古典艺术课程_古典艺术-跟谁学官网",
            "keywords" => "古典艺术培训课程,古典艺术课程",
            "description" => "古典艺术,古典艺术是一门专门介绍和学习古典文化的一个机构。古典艺术提供提分快、进步迅速、提高积极性、培养学习兴趣的课程、老师、视频、相册、评价怎么样,方便学生和家长全方位了解古典艺术。找好老师,上跟谁学！",
            "lbs" => array(
                "province" => "北京",
                "city" => "北京",
                "coord" => array(
                    "lng" => 116.39564503788,
                    "lat" => 39.92998577808
                )
            )
        )
    )
);

