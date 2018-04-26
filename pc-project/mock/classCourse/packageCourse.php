<?php

require("../bootstrap.php");

render(
    "classCourse/package/packageCourse",
    array(
        "tpl_data" => array(
            "site_config" => array(
                "contact" => "010-80447140",
                "qq" => "http://shang.qq.com/wpa/qunwpa?idkey=57972c5919a545149b539f85a1933e671bea4c3de3bff3e192cca718b282ccb8"
            ),
            "breadcrumb" => array(
                array(
                    "name" => "跟谁学课程",
                    "url" => "http://kaoyan.genshuixue.com/"
                ),
                array(
                    "name" => "联报课程",
                    "url" => ""
                )
            ),
            "course" => array(
                "number" => "160202475716",
                "cover" => "http://test-img.gsxservice.com/0cms/d/file/content/2015/12/568287f5d9781.jpg",
                "name" => "3大名师，3个科目，3个小时，帮你再提100分哈哈",
                "price" => "0.01",
                "total_pay" => 671, // 报名人数
                "total" => 3, // 几门课程联报
                "status" => "1", // 0课程完成(未报名)－已完结 1课程完成(已报名)－已报名 2正在招生(未报名)－立即报名 3正在招生(已报名)－已报名 4已满班
                "information" => " 这是一门打包课这是一门打包课这是一门打包课这是一门打包课这是一门打包课这是一门打包课这是一门打包课这是一门打包课这是一门打包课这是一门打包课这是一门打包课这是一门打包课这是一门打包课这是一门打包课这是一门打包课这是一门打包课这是一门打包课这是一门打包课这是一门打包课这是一门打包课这是一门打包课这是一门打包课这是一门打包课这是一门打包课这是一门打包课这是一门打包课这是一门打包课这是一门打包课这是一门打包课这是一门打包课这是一门打包课这是一门打包课这是一门打包课这是一门打包课这是一门打包课这是一门打包课这是一门打包课这是一门打包课这是一门打包课这是一门打包课这是一门打包课这是一门打包课这是一门打包课这是一门打包课这是一门打包课这是一门打包课这是一门打包课这是一门打包课这是一门打包课这是一门打包课", // 课程概述，简介
                "introduction" => "<p>课程详情内容课程详情内容课程详情内容课程详情内容课程详情内容课程详情内容课程详情内容课程详情内容课程详情内容课程详情内容课程详情内容课程详情内容课程详情内容课程详情内容课程详情内容课程详情内容</p><p><img src=\"http://test-img.gsxservice.com/0cms/d/file/content/2016/02/56cd5415a1de5.jpg\" style=\"\" title=\"Hydrangeas.jpg\"/></p><p><img src=\"http://test-img.gsxservice.com/0cms/d/file/content/2016/02/56cd541644cdf.jpg\" style=\"\" title=\"Koala.jpg\"/></p><p><br/></p>",
                "courses" => array( // 教学计划
                    array(
                        "number" => "15082973407",
                        "course_type" => "3", // 2班课（lesson_way:线上2 线下4），3视频课
                        "url" => "http://test.genshuixue.com/video_course/15082973407",
                        "cover" => "http://test-img.gsxservice.com/378270_jbxrrtyt.jpeg",
                        "name" => "A课节",
                        "arrangement" => "05月06日 10:00开课 05月09日 12:00结课 共4节", // 课程安排
                        "teacher" => array(
                            "id" => "342109",
                            "number" => "877468998",
                            "user_id" => "342109",
                            "display_name" => "不要修改昵称",
                            "realname" => "yili",
                            "nickname" => "不要修改昵称",
                            "mobile" => "19800000002",
                            "private_domain" => "877468998",
                            "sex" => "0",
                            "email" => null,
                            "avatar" => "http://img.gsxservice.com/headpic_woman_06.jpg",
                            "role" => 0,
                            "area_id" => "17040384",
                            "private_protected" => "3",
                            "short_introduce" => "范德萨范德萨范德萨发的范德萨范德萨范德萨发的测试测试测试测试测试测试测试测试",
                            "school_age" => "-1",
                            "location_addr" => "软件园孵化器",
                            "status" => "1",
                            "category" => "1",
                            "vip_level" => 0
                        ),
                        "price" => "0.01",
                        "introduction" => "从前有座山山上有座庙庙里有个老和尚爱讲故事从前有座山山上有座庙庙里有个老和尚爱讲故事从前有座山山上有座庙庙里有个老和尚爱讲故事", // 简介
                        "schedule_list" => array(
                            array(
                                "title" => "该视频课名称",
                                "index" => "1"
                            ),
                            array(
                                "title" => "ABCDEFG",
                                "index" => "2"
                            )
                        )
                    ),
                    array(
                        "number" => "160129484376",
                        "lesson_way" => 2, // 2线上，直播课  4线下，线下课
                        "course_type" => "2", // 2班课（lesson_way:线上2 线下4），3视频课
                        "url" => "http://test.genshuixue.com/teacher/classCourseDetail/160129484376",
                        "cover" => "http://test-img.gsxservice.com/425887_9ollagod.jpeg",
                        "name" => "搜索02",
                        "arrangement" => "05月06日 10:00开课 05月09日 12:00结课 共4节",
                        "teacher" => array(
                            "id" => "345572",
                            "number" => "454988428",
                            "user_id" => "345572",
                            "display_name" => "郑冬",
                            "realname" => "郑冬",
                            "nickname" => "郑冬",
                            "mobile" => "15100000009",
                            "private_domain" => "zheng454988428",
                            "sex" => "1",
                            "email" => "15100000009@139.com",
                            "avatar" => "http://test-img.gsxservice.com/425921_839z2ng2.jpeg",
                            "role" => 0,
                            "area_id" => "201589760",
                            "private_protected" => "0",
                            "short_introduce" => "找好老师，上跟谁学",
                            "school_age" => "10",
                            "school_age_format" => "10年",
                            "location_addr" => "a家连锁酒店武汉司门口店",
                            "status" => "1",
                            "category" => "1",
                            "subject_id" => "1108",
                            "subject_name" => "大学专业课",
                            "vip_level" => 3
                        ),
                        "price" => "20.00",
                        "introduction" => null,
                        "schedule_list" => array(
                            array(
                                "is_over" => 0, // 0未开课 1已结束 2进行中
                                "content" => "内容都为空，这是要闹哪样啊～～～",
                                "begin_time" => 1462500000,
                                "end_time" => 1462507200
                            ),
                            array(
                                "is_over" => 0, // 0未开课 1已结束 2进行中
                                "content" => "内容都为空，这是要闹哪样啊～～～",
                                "begin_time" => 1462586400,
                                "end_time" => 1462593600
                            ),
                            array(
                                "is_over" => 0, // 0未开课 1已结束 2进行中
                                "content" => "内容都为空，这是要闹哪样啊～～～",
                                "begin_time" => 1462672800,
                                "end_time" => 1462680000
                            ),
                            array(
                                "is_over" => 0, // 0未开课 1已结束 2进行中
                                "content" => "内容都为空，这是要闹哪样啊～～～",
                                "begin_time" => 1462759200,
                                "end_time" => 1462766400
                            )
                        )
                    ),
                    array(
                        "number" => "160220551185",
                        "lesson_way" => 4,
                        "course_type" => "2",
                        "url" => "http://test.genshuixue.com/teacher/classCourseDetail/160129484376",
                        "name" => "一分钱直播课",
                        "cover" => "http://test-img.gsxservice.com/425887_9ollagod.jpeg",
                        "arrangement" => "02月22日 10:00开课 03月30日 12:00结课 共38节",
                        "teacher" => array(
                            "id" => "347019",
                            "number" => "415444278",
                            "user_id" => "347019",
                            "display_name" => "王倩倩",
                            "realname" => "王倩倩",
                            "nickname" => "我1g ..     2",
                            "mobile" => "18511400389",
                            "private_domain" => "415444278w",
                            "sex" => "0",
                            "email" => null,
                            "avatar" => "http://test-img.gsxservice.com/415714_6f0j25ji.jpeg",
                            "role" => 0,
                            "area_id" => "201589760",
                            "private_protected" => "0",
                            "short_introduce" => "教你弹钢琴",
                            "school_age" => "8",
                            "school_age_format" => "8年",
                            "location_addr" => "湖北省武汉市武昌区东湖路95号",
                            "status" => "1",
                            "category" => "1",
                            "subject_id" => "977",
                            "subject_name" => "钢琴",
                            "vip_level" => 3
                        ),
                        "price" => "0.01",
                        "introduction" => "1245667776",
                        "schedule_list" => array(
                            array(
                                "is_over" => 0, // 0未开课 1已结束 2进行中
                                "content" => "内容都为空，这是要闹哪样啊～～～",
                                "begin_time" => 1456106400,
                                "end_time" => 1456113600
                            ),
                            array(
                                "is_over" => 0, // 0未开课 1已结束 2进行中
                                "content" => "内容都为空，这是要闹哪样啊～～～",
                                "begin_time" => 1456192800,
                                "end_time" => 1456200000
                            ),
                            array(
                                "is_over" => 0, // 0未开课 1已结束 2进行中
                                "content" => "内容都为空，这是要闹哪样啊～～～",
                                "begin_time" => 1456279200,
                                "end_time" => 1456286400
                            ),
                            array(
                                "is_over" => 0, // 0未开课 1已结束 2进行中
                                "content" => "内容都为空，这是要闹哪样啊～～～",
                                "begin_time" => 1456365600,
                                "end_time" => 1456372800
                            ),
                            array(
                                "is_over" => 0, // 0未开课 1已结束 2进行中
                                "content" => "内容都为空，这是要闹哪样啊～～～",
                                "begin_time" => 1456452000,
                                "end_time" => 1456459200
                            ),
                            array(
                                "is_over" => 0, // 0未开课 1已结束 2进行中
                                "content" => "内容都为空，这是要闹哪样啊～～～",
                                "begin_time" => 1456538400,
                                "end_time" => 1456545600
                            ),
                            array(
                                "is_over" => 0, // 0未开课 1已结束 2进行中
                                "content" => "内容都为空，这是要闹哪样啊～～～",
                                "begin_time" => 1456624800,
                                "end_time" => 1456632000
                            ),
                            array(
                                "is_over" => 0, // 0未开课 1已结束 2进行中
                                "content" => "内容都为空，这是要闹哪样啊～～～",
                                "begin_time" => 1456711200,
                                "end_time" => 1456718400
                            ),
                            array(
                                "is_over" => 0, // 0未开课 1已结束 2进行中
                                "content" => "内容都为空，这是要闹哪样啊～～～",
                                "begin_time" => 1456797600,
                                "end_time" => 1456804800
                            ),
                            array(
                                "is_over" => 0, // 0未开课 1已结束 2进行中
                                "content" => "内容都为空，这是要闹哪样啊～～～",
                                "begin_time" => 1456884000,
                                "end_time" => 1456891200
                            ),
                            array(
                                "is_over" => 0, // 0未开课 1已结束 2进行中
                                "content" => "内容都为空，这是要闹哪样啊～～～",
                                "begin_time" => 1456970400,
                                "end_time" => 1456977600
                            ),
                            array(
                                "is_over" => 0, // 0未开课 1已结束 2进行中
                                "content" => "内容都为空，这是要闹哪样啊～～～",
                                "begin_time" => 1457056800,
                                "end_time" => 1457064000
                            ),
                            array(
                                "is_over" => 0, // 0未开课 1已结束 2进行中
                                "content" => "内容都为空，这是要闹哪样啊～～～",
                                "begin_time" => 1457143200,
                                "end_time" => 1457150400
                            ),
                            array(
                                "is_over" => 0, // 0未开课 1已结束 2进行中
                                "content" => "内容都为空，这是要闹哪样啊～～～",
                                "begin_time" => 1457229600,
                                "end_time" => 1457236800
                            ),
                            array(
                                "is_over" => 0, // 0未开课 1已结束 2进行中
                                "content" => "内容都为空，这是要闹哪样啊～～～",
                                "begin_time" => 1457316000,
                                "end_time" => 1457323200
                            ),
                            array(
                                "is_over" => 0, // 0未开课 1已结束 2进行中
                                "content" => "内容都为空，这是要闹哪样啊～～～",
                                "begin_time" => 1457402400,
                                "end_time" => 1457409600
                            ),
                            array(
                                "is_over" => 0, // 0未开课 1已结束 2进行中
                                "content" => "内容都为空，这是要闹哪样啊～～～",
                                "begin_time" => 1457488800,
                                "end_time" => 1457496000
                            ),
                            array(
                                "is_over" => 0, // 0未开课 1已结束 2进行中
                                "content" => "内容都为空，这是要闹哪样啊～～～",
                                "begin_time" => 1457575200,
                                "end_time" => 1457582400
                            ),
                            array(
                                "is_over" => 0, // 0未开课 1已结束 2进行中
                                "content" => "内容都为空，这是要闹哪样啊～～～",
                                "begin_time" => 1457661600,
                                "end_time" => 1457668800
                            ),
                            array(
                                "is_over" => 0, // 0未开课 1已结束 2进行中
                                "content" => "内容都为空，这是要闹哪样啊～～～",
                                "begin_time" => 1457748000,
                                "end_time" => 1457755200
                            ),
                            array(
                                "is_over" => 0, // 0未开课 1已结束 2进行中
                                "content" => "内容都为空，这是要闹哪样啊～～～",
                                "begin_time" => 1457834400,
                                "end_time" => 1457841600
                            ),
                            array(
                                "is_over" => 0, // 0未开课 1已结束 2进行中
                                "content" => "内容都为空，这是要闹哪样啊～～～",
                                "begin_time" => 1457920800,
                                "end_time" => 1457928000
                            ),
                            array(
                                "is_over" => 0, // 0未开课 1已结束 2进行中
                                "content" => "内容都为空，这是要闹哪样啊～～～",
                                "begin_time" => 1458007200,
                                "end_time" => 1458014400
                            ),
                            array(
                                "is_over" => 0, // 0未开课 1已结束 2进行中
                                "content" => "内容都为空，这是要闹哪样啊～～～",
                                "begin_time" => 1458093600,
                                "end_time" => 1458100800
                            ),
                            array(
                                "is_over" => 0, // 0未开课 1已结束 2进行中
                                "content" => "内容都为空，这是要闹哪样啊～～～",
                                "begin_time" => 1458180000,
                                "end_time" => 1458187200
                            ),
                            array(
                                "is_over" => 0, // 0未开课 1已结束 2进行中
                                "content" => "内容都为空，这是要闹哪样啊～～～",
                                "begin_time" => 1458266400,
                                "end_time" => 1458273600
                            ),
                            array(
                                "is_over" => 0, // 0未开课 1已结束 2进行中
                                "content" => "内容都为空，这是要闹哪样啊～～～",
                                "begin_time" => 1458352800,
                                "end_time" => 1458360000
                            ),
                            array(
                                "is_over" => 0, // 0未开课 1已结束 2进行中
                                "content" => "内容都为空，这是要闹哪样啊～～～",
                                "begin_time" => 1458439200,
                                "end_time" => 1458446400
                            ),
                            array(
                                "is_over" => 0, // 0未开课 1已结束 2进行中
                                "content" => "内容都为空，这是要闹哪样啊～～～",
                                "begin_time" => 1458525600,
                                "end_time" => 1458532800
                            ),
                            array(
                                "is_over" => 0, // 0未开课 1已结束 2进行中
                                "content" => "内容都为空，这是要闹哪样啊～～～",
                                "begin_time" => 1458612000,
                                "end_time" => 1458619200
                            ),
                            array(
                                "is_over" => 0, // 0未开课 1已结束 2进行中
                                "content" => "内容都为空，这是要闹哪样啊～～～",
                                "begin_time" => 1458698400,
                                "end_time" => 1458705600
                            ),
                            array(
                                "is_over" => 0, // 0未开课 1已结束 2进行中
                                "content" => "内容都为空，这是要闹哪样啊～～～",
                                "begin_time" => 1458784800,
                                "end_time" => 1458792000
                            ),
                            array(
                                "is_over" => 0, // 0未开课 1已结束 2进行中
                                "content" => "内容都为空，这是要闹哪样啊～～～",
                                "begin_time" => 1458871200,
                                "end_time" => 1458878400
                            ),
                            array(
                                "is_over" => 0, // 0未开课 1已结束 2进行中
                                "content" => "内容都为空，这是要闹哪样啊～～～",
                                "begin_time" => 1458957600,
                                "end_time" => 1458964800
                            ),
                            array(
                                "is_over" => 0, // 0未开课 1已结束 2进行中
                                "content" => "一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十",
                                "begin_time" => 1459044000,
                                "end_time" => 1459051200
                            ),
                            array(
                                "is_over" => 0, // 0未开课 1已结束 2进行中
                                "content" => "内容都为空，这是要闹哪样啊～～～",
                                "begin_time" => 1459130400,
                                "end_time" => 1459137600
                            ),
                            array(
                                "is_over" => 0, // 0未开课 1已结束 2进行中
                                "content" => "内容都为空，这是要闹哪样啊～～～",
                                "begin_time" => 1459216800,
                                "end_time" => 1459224000
                            ),
                            array(
                                "is_over" => 0, // 0未开课 1已结束 2进行中
                                "content" => "内容都为空，这是要闹哪样啊～～～",
                                "begin_time" => 1459303200,
                                "end_time" => 1459310400
                            )
                        )
                    )
                ),
                "teachers" => array( // 主讲老师
                    "342109" => array(
                        "avatar" => "http://img.gsxservice.com/headpic_woman_06.jpg",
                        "private_domain" => "877468998",
                        "display_name" => "不要修改昵称",
                        "short_introduce" => "一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十",
                        "number" => "877468998",

                        "id" => "342109",
                        "user_id" => "342109",
                        "realname" => "yili",
                        "nickname" => "不要修改昵称",
                        "mobile" => "19800000002",
                        "sex" => "0",
                        "email" => null,
                        "role" => 0,
                        "area_id" => "17040384",
                        "private_protected" => "3",
                        "school_age" => "-1",
                        "location_addr" => "软件园孵化器",
                        "status" => "1",
                        "category" => "1",
                        "vip_level" => 0
                    ),
                    "345572" => array(
                        "id" => "345572",
                        "number" => "454988428",
                        "user_id" => "345572",
                        "display_name" => "郑冬",
                        "realname" => "郑冬",
                        "nickname" => "郑冬",
                        "mobile" => "15100000009",
                        "private_domain" => "zheng454988428",
                        "sex" => "1",
                        "email" => "15100000009@139.com",
                        "avatar" => "http://test-img.gsxservice.com/425921_839z2ng2.jpeg",
                        "role" => 0,
                        "area_id" => "201589760",
                        "private_protected" => "0",
                        "short_introduce" => "找好老师，上跟谁学",
                        "school_age" => "10",
                        "school_age_format" => "10年",
                        "location_addr" => "a家连锁酒店武汉司门口店",
                        "status" => "1",
                        "category" => "1",
                        "subject_id" => "1108",
                        "subject_name" => "大学专业课",
                        "vip_level" => 3
                    ),
                    "347019" => array(
                        "id" => "347019",
                        "number" => "415444278",
                        "user_id" => "347019",
                        "display_name" => "王倩倩",
                        "realname" => "王倩倩",
                        "nickname" => "我1g ..     2",
                        "mobile" => "18511400389",
                        "private_domain" => "415444278w",
                        "sex" => "0",
                        "email" => null,
                        "avatar" => "http://test-img.gsxservice.com/415714_6f0j25ji.jpeg",
                        "role" => 0,
                        "area_id" => "201589760",
                        "private_protected" => "0",
                        "short_introduce" => "教你弹钢琴",
                        "school_age" => "8",
                        "location_addr" => "湖北省武汉市武昌区东湖路95号",
                        "status" => "1",
                        "category" => "1",
                        "vip_level" => 3
                    )
                ),
                "data" => array( // 此处为增加的内容
                    "sadsafasadasdasdasa",
                    "sadsafasadasdasdasa",
                    "sadsafasadasdasdasa",
                    "sadsafasadasdasdasa",
                    "sadsafasadasdasdasa",
                ),
                "tag" => array(
                    array(
                        "name"=>"24小时答疑"
                    ),
                    array(
                        "name"=>"资料下载"
                    ),
                    array(
                        "name"=>"系统化学习"
                    ),
                    array(
                        "name"=>"课下答疑"
                    ),
                    array(
                        "name"=>"资料下载"
                    )
                )
                // 增加的内容到此为止
            ),
            "related_course" => array( // 相关课程
                array(
                    "course_number" => "151124482845",
                    "cover" => "http://test-img.gsxservice.com/396589_qq4wvr7t.jpeg",
                    "name" => "修改课程详情字体",
                    "price" => 0.01,
                    "total_pay" => 12434,
                    "detail_url" => "/teacher/classCourseDetail/151124482845"
                ),
                array(
                    "course_number" => "151123547729",
                    "cover" => "http://test-img.gsxservice.com/396112_387mf4fu.jpeg",
                    "name" => "“课程卡片-线下课”&amp;&amp;\"四川省成都市\"",
                    "price" => 0.01,
                    "total_pay" => 1234,
                    "detail_url" => "/teacher/classCourseDetail/151123547729"
                ),
                array(
                    "course_number" => "151120548441",
                    "cover" => "http://test-img.gsxservice.com/396112_387mf4fu.jpeg",
                    "name" => "非登录进入教室测试-非零元班课",
                    "price" => 0.01,
                    "total_pay" => 134,
                    "detail_url" => "/teacher/classCourseDetail/151120548441"
                ),
                array(
                    "course_number" => "151120547549",
                    "cover" => "http://test-img.gsxservice.com/396589_qq4wvr7t.jpeg",
                    "name" => "非登录进入教室测试",
                    "price" => 0,
                    "total_pay" => 14,
                    "detail_url" => "/teacher/classCourseDetail/151120547549"
                )
            )
        )
    )
);

