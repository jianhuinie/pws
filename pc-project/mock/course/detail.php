<?php

require("../bootstrap.php");

render(
    "course/detail",
    array(
        "tpl_data" => array(
            "is_juhuixue" =>true, //是否是聚会学
            "support_student_advisory" => false, // 该机构班课是否支持学生预约试听
            "trial_course_info" => array( // 个体老师班课支持试听课
                "type" => 5,
                "status" => -1, // -1隐藏试听课 0:未预约/未登陆用户  1:预约还没排课  2:已经排课 3:已经结束 4:预约后但还没支付 5老师自己查看自己的个人主页 6已取消
                "data" => array( // 个体老师不支持试听课则为false，请走留单逻辑
                    "id" => "17",
                    "user_id" => "342109",
                    "user_number" => "87746898",
                    "user_type" => 1,//老师身份
                    "number" => "150828541252",
                    "length" => "120",
                    "lesson_way" => "6",
                    "price_online" => "0.02",
                    "price_offline" => null,
                    "switch_flag" => "1",
                    "create_time" => "2015-08-28 09:26:33",
                    "update_time" => "2015-11-03 11:52:42",
                    "purchase_id" => "832189"
                )
            ),
            "is_preview" => 1,
            "is_favored" => false, // 是否收藏本课程
            "popularity" => 1899, // 已被收藏次数，人气值
            "course_type" => 3, // 4－3810课程
            "lianbao_info" => array( // 联报优惠
                array(
                    'activity_id' => '234',
                    'title' => '联报优惠一',
                    'discounts' => array( // 套餐折扣设置
                        array(
                            "id" => "1",
                            "activity_id" => "1",
                            "discount_type" => "0", //
                            "course_amount" => "2", // 享受优惠课程数目
                            "discount_ratio" => "1", // 折扣，0-100
                            "discount_point" => null, // 满减，单位为分
                            "status" => "2",
                            "create_time" => "2015-10-09 10:24:50",
                            "update_time" => "2015-10-17 10:08:04",
                            "delete_time" => "0000-00-00 00:00:00",
                            "display_name" => "2门联报立减￥1.99"
                        ),
                        array(
                            "id" => "2",
                            "activity_id" => "1",
                            "discount_type" => "0",
                            "course_amount" => "3",
                            "discount_ratio" => null,
                            "discount_point" => "200",
                            "status" => "2",
                            "create_time" => "2015-10-09 10:25:13",
                            "update_time" => "2015-10-09 10:25:13",
                            "delete_time" => "0000-00-00 00:00:00",
                            "display_name" => "3门联报立减￥2.00"
                        )
                    ),
                    'course' => array(
                        array(
                            "title" => "唐诗三百首",
                            "introduction" => "快圣诞节疯狂健身房大家葫芦丝反馈结果你看",
                            "address" => "北京市海淀区软件园二号路",
                            "freq" => "12",
                            "price" => "0.01",
                            "preface" => "http://test-img.gsxservice.com/377916_r4dy9m9q.png",
                            "number" => "3708749604",
                            "id" => "321",
                            "lesson_way_name" => "线下授课",
                            "course_type" => "4"
                        ),
                        array(
                            "title" => "唐诗三百首",
                            "introduction" => "撒地方刚回家客户高发的啥地方规划",
                            "address" => "北京市海淀区软件园二号路",
                            "freq" => "12",
                            "price" => "1.00",
                            "preface" => "http://test-img.gsxservice.com/377923_ixep9g6y.png",
                            "number" => "3708570404",
                            "id" => "322",
                            "lesson_way_name" => "线下授课",
                            "course_type" => "4"
                        ),
                        array(
                            "title" => "唐诗三百首",
                            "introduction" => "快圣诞节疯狂健身房大家葫芦丝反馈结果你看",
                            "address" => "北京市海淀区软件园二号路",
                            "freq" => "12",
                            "price" => "1.00",
                            "preface" => "http://test-img.gsxservice.com/377916_r4dy9m9q.png",
                            "number" => "3708749604",
                            "id" => "321",
                            "lesson_way_name" => "线下授课",
                            "course_type" => "4"
                        )
                    )
                ),
                array(
                    'activity_id' => '2345',
                    'title' => '联报优惠二',
                    'discounts' => array( // 套餐折扣设置
                        array(
                            "id" => "1",
                            "activity_id" => "1",
                            "discount_type" => "0", //
                            "course_amount" => "2", // 享受优惠课程数目
                            "discount_ratio" => "99", // 折扣，0-100
                            "discount_point" => null, // 满减，单位为分
                            "status" => "2",
                            "create_time" => "2015-10-09 10:24:50",
                            "update_time" => "2015-10-17 10:08:04",
                            "delete_time" => "0000-00-00 00:00:00",
                            "display_name" => "2门联报立减￥1.99"
                        )
                    ),
                    'course' => array(
                        array(
                            "title" => "烘焙课程 － 全麦面包",
                            "introduction" => "快圣诞节疯狂健身房大家葫芦丝反馈结果你看",
                            "address" => "北京市海淀区软件园二号路",
                            "freq" => "12",
                            "price" => "0.5",
                            "preface" => "http://test-img.gsxservice.com/377916_r4dy9m9q.png",
                            "number" => "3708749604",
                            "id" => "321",
                            "lesson_way_name" => "线下授课",
                            "course_type" => "4"
                        ),
                        array(
                            "title" => "烘焙课程 － 生日蛋糕",
                            "introduction" => "撒地方刚回家客户高发的啥地方规划",
                            "address" => "北京市海淀区软件园二号路",
                            "freq" => "12",
                            "price" => "1.00",
                            "preface" => "http://test-img.gsxservice.com/377923_ixep9g6y.png",
                            "number" => "3708570404",
                            "id" => "322",
                            "lesson_way_name" => "线下授课",
                            "course_type" => "4"
                        )
                    )
                )
            ),
            "course_path" => array(
                "1" => array(
                    "id" => "573",
                    "name" => "IT",
                    "level" => "1",
                    "subnodes" => "9",
                    "display_order" => "498",
                    "hidden" => "0",
                    "parent_id" => "0",
                    "remark_name" => "IT",
                    "subject_type" => "0",
                    "verify_status" => "1",
                    "tag" => null,
                    "image" => "http://img.gsxservice.com/87490_57d3vyno.jpeg",
                    "teacher_count" => "1"
                ),
                "2" => array(
                    "id" => "578",
                    "name" => "常用软件",
                    "level" => "2",
                    "subnodes" => "16",
                    "display_order" => "7",
                    "hidden" => "0",
                    "parent_id" => "573",
                    "remark_name" => "常用软件",
                    "subject_type" => "0",
                    "verify_status" => "1",
                    "tag" => null,
                    "image" => "http://img.gsxservice.com/88124_ge5x6cqu.png",
                    "teacher_count" => "1"
                ),
                "3" => array(
                    "id" => "587",
                    "name" => "其他",
                    "level" => "3",
                    "subnodes" => "0",
                    "display_order" => "0",
                    "hidden" => "0",
                    "parent_id" => "578",
                    "remark_name" => "其他",
                    "subject_type" => "0",
                    "verify_status" => "1",
                    "tag" => null,
                    "image" => "http://img.gsxservice.com/80383_2qgqwoyw.jpeg",
                    "teacher_count" => "1"
                )
            ),
            "is_organization" => true,
            "teacher_profiles" => array(
                "112233" => array(
                    "vip_level" => 1, // 0非会员 1普通会员 2高级会员 3超级会员
                    "display_name" => "Justin.Bieber.A.BJustin.Bieber.A.B. Quinta",
                    "number" => "371534498",
                    "private_domain" => "371534498",
                    "order_comment_count" => 10,
                    "invite_comment_count" => 10,
                    "im_online_status" => 1,
                    "photo_url" => "http://img.gsxservice.com/8245_hkz5iw1x.jpeg",
                    "school_age" => -1,
                    "score" => 4.5,
                    "area_id" => '32479801324',
                    'user_id' => '112233'
                ),
                "112245" => array(
                    "vip_level" => 3, // 0非会员 1普通会员 2高级会员 3超级会员
                    "display_name" => "王凯",
                    "number" => "371534498",
                    "private_domain" => "371534498",
                    "order_comment_count" => 10,
                    "im_online_status" => 1,
                    "invite_comment_count" => 10,
                    "photo_url" => "http://img.gsxservice.com/8245_hkz5iw1x.jpeg",
                    "school_age" => -1,
                    "score" => 4.5,
                    "area_id" => '32479801324',
                    'user_id' => '112233'
                ),
                "1122234" => array(
                    "vip_level" => 3, // 0非会员 1普通会员 2高级会员 3超级会员
                    "display_name" => "王凯",
                    "number" => "371534498",
                    "private_domain" => "371534498",
                    "order_comment_count" => 10,
                    "im_online_status" => 1,
                    "invite_comment_count" => 10,
                    "photo_url" => "http://img.gsxservice.com/8245_hkz5iw1x.jpeg",
                    "school_age" => -1,
                    "score" => 4.5,
                    "area_id" => '32479801324',
                    'user_id' => '112233'
                ),
                "11221231345" => array(
                    "vip_level" => 3, // 0非会员 1普通会员 2高级会员 3超级会员
                    "display_name" => "王凯",
                    "number" => "371534498",
                    "private_domain" => "371534498",
                    "order_comment_count" => 10,
                    "im_online_status" => 0,
                    "invite_comment_count" => 10,
                    "photo_url" => "http://img.gsxservice.com/8245_hkz5iw1x.jpeg",
                    "school_age" => -1,
                    "score" => 4.5,
                    "area_id" => '32479801324',
                    'user_id' => '112233'
                ),
            ),
            "crumb" => array(
                "host" => "http://www.genshuixue.com/bj/",
                "city" => array(
                    "name" => "北京"
                )
            ),
            "coupons" => array(
                array(
                    "code" => 5,
                    "source_id" => '13421343',
                    "serial_num" => 'fdjslkfewioeuoiqr342423', // 优惠券编码
                    "source_user_role" => 6, // 6老师 10机构
                    "id" => "705491276b540ecfa6976a31c3b071e3",
                    "org_name" => "博图教育",
                    "status" => 1,
                    "balance" => 50,
                    "cond_threshold" => 500,
                    "total_money" => "20.00",
                    "cond_threshold" => "100.00",
                    "effect_time" => "2015-03-20 00:00:00",
                    "expire_time" => "2015-03-30 00:00:00",
                    "remain_coupon" => 997,
                    "max_recv_count" => "3",
                    "get_status" => 1,
                    "remain_count" => 1,
                    'cond_course_type' => 0 // 0不限 2班课 3视频课
                ),
                array(
                    "code" => 5,
                    "source_id" => '13421343',
                    "serial_num" => 'fdjslkfewioeuoiqr342423', // 优惠券编码
                    "source_user_role" => 6, // 6老师 10机构
                    "id" => "705491276b540ecfa6976a31c3b071e3",
                    "org_name" => "博图教育",
                    "status" => 1,
                    "balance" => 50,
                    "cond_threshold" => 500,
                    "total_money" => "20.00",
                    "cond_threshold" => "100.00",
                    "effect_time" => "2015-03-20 00:00:00",
                    "expire_time" => "2015-03-30 00:00:00",
                    "remain_coupon" => 997,
                    "max_recv_count" => "3",
                    "get_status" => 1,
                    "remain_count" => 1,
                    'cond_course_type' => 2 // 0不限 2班课 3视频课
                )
            ),
            "course_info" => array(
                "id" => 123213, //班课id
                "number" => "1311134745712",//班课number
                "user_id" => 1232131, //老师的UID
                "subject_id" => '383', //班课包含的subject的id
                "organization_number" => null,
                "lesson_way" => 4, //可上课的方式 4普通场地课2普通在线3在线公开课
                "class_type" => 1,
                "price" => 0.01,//课程价格
                "original_price" => "0.00",
                "max_student" => 200,//最大学生数
                "min_student" => 2, //最低开班人数,
                "intro" => array(
                    "style" => "pink",
                    "items" => [
                        array(
                            "id" => "2053",
                            "class_course_number" => "160816486209",
                            "type" => "title",
                            "text" => "我是一个标题",
                            "font_weight" => null,
                            "font_size" => null,
                            "text_align" => null,
                            "color" => null,
                            "length" => "0",
                            "storage_id" => null,
                            "video_id" => null,
                            "created_at" => "2016-08-16 09:58:52",
                            "updated_at" => null
                        ),
                        array(
                            "id" => "2054",
                            "class_course_number" => "160816486209",
                            "type" => "body",
                            "text" => "我是正文正文我是正文正文我是正文正文我是正文正文我是正文正文我是正文正文我是正文正文我是正文正文我是正文正文我是正文正文我是正文正文我是正文正文我是正文正文我是正文正文我是正文正文我是正文正文我是正文正文我是正文正文我是正文正文我是正文正文我是正文正文我是正文正文我是正文正文我是正文正文",
                            "font_weight" => "bold",
                            "font_size" => "17px",
                            "text_align" => "left",
                            "color" => "#FC5C5A",
                            "length" => "0",
                            "storage_id" => null,
                            "video_id" => null,
                            "created_at" => "2016-08-16 09:58:52",
                            "updated_at" => null
                        )
                    ]
                ),
                "cover" => array(
                    "id" => 1243,
                    "title" => "班课上课中",
                    "url" => "http://test-img.gsxservice.com/12403_fgedr62s.png",
                    "width" => 1440,
                    "height" => 810,
                    "storage_id" => "88258",
                    "create_time" => '1420605172'
                ),
                "name" => "It's travel time!!It's  ",
                "introduction" => null, // 班课介绍
                "student_desc" => "小学生", //适学人群
                "target" => "提高到100分", //教学目标
                "arrangement" => "",//课程安排
                "use_regular_addr" => "1",
                "area_id" => '17040384',
                "address" => "北京市昌平区回龙观镇史各庄村村委会", //上课地点
                "offline_poi"=> array(
                    "lng"=> "116.246701",
                    "lat"=> "39.914957"
                ),
                "user_address_id" => '35374',
                "status" => 1, //班课状态 1初始状态,2可以招生但是尚未招生
                               //3正在招生,4停止招生,5开课,6课程结束
                "open_status" => 2, //确认开班 1 未确认开班 2 关闭开班 3
                "verify_status" => 1, //审核状态 1审核通过 2审核被拒
                "mobile_visible" => 1,
                "reason" => 1, //审核拒绝原因
                "reason_text" => "XXX", //审核拒绝相关
                "is_complete" => 1,
                "chaban_flag" => 2, //插班标识 1不可插班 2第n节课前可插班 3随时可插班
                "chaban_quota" => 0, //第n节课前可插班
                "chaban_price_flag" => 1, //插班价格标识 1未结束课程的总价 2自定义插班价
                "chaban_price" => 9.9,//插班价格
                "retire_flag" => 2, //退班规则 1.随时可退 2.1小时 3第几节课
                "retire_length" => 3,
                "begin_time" => "2014年12月2日", //课程开始时间
                "end_time" => "2014年12月3日", //课程结束时间
                "course_len" => 4800,
                "create_time" => "2013-08-03 19:27:21", //课程创建时间
                "update_time" => "2014-08-11 19:30:07", //课程更新时间
                "special_time_reason" => null,
                "user_number" => "32438729473",
                "photos" => array(
                    array(
                        'id' => '',
                        'create_time' => '',
                        'url' => 'http://img.gsxservice.com/186302_4qcgt7kr.jpeg',
                        'title' => '纷纷为撒旦法',
                        'width' => 1200,
                        'height' => 801
                    ),
                    array(
                        'id' => '',
                        'create_time' => '',
                        'url' => 'http://img.gsxservice.com/27658_61zqh1ni.jpeg',
                        'title' => '阿斯达多萨法asd联客机',
                        'width' => 1800,
                        'height' => 1350
                    ),
                    array(
                        'id' => '',
                        'create_time' => '',
                        'url' => 'http://img.gsxservice.com/27658_61zqh1ni.jpeg',
                        'title' => '阿斯达多萨法asd联客机',
                        'width' => 7800,
                        'height' => 5860
                    ),
                    array(
                        'id' => '',
                        'create_time' => '',
                        'url' => 'http://img.gsxservice.com/27658_61zqh1ni.jpeg',
                        'title' => '阿斯达多萨法asd联客机',
                        'width' => 300,
                        'height' => 150
                    ),
                    array(
                        'id' => '',
                        'create_time' => '',
                        'url' => 'http://img.gsxservice.com/1251_scwyj6zr.jpeg',
                        'title' => '鲜花',
                        'width' => 480,
                        'height' => 640
                    ),
                    array(
                        'id' => '',
                        'create_time' => '',
                        'url' => 'http://img.gsxservice.com/29650_v8ag661z.jpeg',
                        'title' => '失联客机',
                        'width' => 768,
                        'height' => 1024
                    ),
                    array(
                        'id' => '',
                        'create_time' => '',
                        'url' => 'http://img.gsxservice.com/901_o6ut84ce.png',
                        'title' => '撒了快递费',
                        'width' => 400,
                        'height' => 600
                    ),
                    array(
                        'id' => '',
                        'create_time' => '',
                        'url' => 'http://img.gsxservice.com/6271_znvng0qo.png',
                        'title' => '撒了款到即发',
                        'width' => 479,
                        'height' => 640
                    ),
                    array(
                        'id' => '',
                        'create_time' => '',
                        'url' => 'http://img.gsxservice.com/13116_rh81m1o2.jpeg',
                        'title' => '撒了款到即发',
                        'width' => 852,
                        'height' => 1136
                    ),
                    array(
                        'id' => '',
                        'create_time' => '',
                        'url' => 'http://img.gsxservice.com/1251_scwyj6zr.jpeg',
                        'title' => '鲜花',
                        'width' => 480,
                        'height' => 640
                    ),
                    array(
                        'id' => '',
                        'create_time' => '',
                        'url' => 'http://img.gsxservice.com/29650_v8ag661z.jpeg',
                        'title' => '失联客机',
                        'width' => 768,
                        'height' => 1024
                    ),
                    array(
                        'id' => '',
                        'create_time' => '',
                        'url' => 'http://img.gsxservice.com/901_o6ut84ce.png',
                        'title' => '撒了快递费',
                        'width' => 400,
                        'height' => 600
                    ),
                    array(
                        'id' => '',
                        'create_time' => '',
                        'url' => 'http://img.gsxservice.com/6271_znvng0qo.png',
                        'title' => '撒了款到即发',
                        'width' => 479,
                        'height' => 640
                    ),
                    array(
                        'id' => '',
                        'create_time' => '',
                        'url' => 'http://img.gsxservice.com/13116_rh81m1o2.jpeg',
                        'title' => '撒了款到即发',
                        'width' => 852,
                        'height' => 1136
                    ),
                ), //照片
                "schedule" => array(
                    array(
                        "id" => "1",
                        "user_id" => "987",
                        "class_course_number" => "1415954843297",
                        "begin_time" => "1444719498",
                        "end_time" => "1444719598",
                        "content" => null,
                        "teacher" => array(
                            "display_name" => "teacher display name",
                            "number" => 321422218,
                            "order_comment_count" => 0,
                            "invite_comment_count" => 0,
                            "photo_url" => "",
                            "school_age" => 2,
                            "score" => 5,
                            "private_domain" => "XX",
                        )
                    ),
                    array(
                        "id" => "1",
                        "user_id" => "987",
                        "class_course_number" => "1415954843297",
                        "begin_time" => "1444719498",
                        "end_time" => "1444729498",
                        "content" => "讲解水彩画的高阶技巧，氛围的营造，意境的表现，怎样脱离技巧用心去画讲解水彩画的高阶技巧，氛围的营造，意境的表现，怎样脱离技巧用心去画讲解水彩画的高阶技巧，氛围的营造，意境的表现，怎样脱离技巧用心去画讲解水彩画的高阶技巧，氛围的营造，意境的表现，怎样脱离技巧用心去画",
                        "teacher" => array(
                            "display_name" => "teacher display name",
                            "number" => 321422218,
                            "order_comment_count" => 0,
                            "invite_comment_count" => 0,
                            "photo_url" => "",
                            "school_age" => 2,
                            "score" => 5,
                            "private_domain" => "XX",
                        )
                    ),
                    array(
                        "id" => "1",
                        "user_id" => "987",
                        "class_course_number" => "1415954843297",
                        "begin_time" => "1444729498",
                        "end_time" => "1444739498",
                        "content" => "讲解水彩画的高阶技巧，氛围的营造，意境的表现，怎样脱离技巧用心去画讲解水彩画的高阶技巧，氛围的营造，意境的表现，怎样脱离技巧用心去画讲解水彩画的高阶技巧，氛围的营造，意境的表现，怎样脱离技巧用心去画讲解水彩画的高阶技巧，氛围的营造，意境的表现，怎样脱离技巧用心去画",
                        "teacher" => array(
                            "display_name" => "teacher display name",
                            "number" => 321422218,
                            "order_comment_count" => 100,
                            "invite_comment_count" => 100,
                            "photo_url" => "",
                            "school_age" => 2,
                            "score" => 5,
                            "private_domain" => "XX",
                        )
                    ),
                    array(
                        "id" => "1",
                        "user_id" => "987",
                        "class_course_number" => "1415954843297",
                        "begin_time" => "1444719498",
                        "end_time" => "1444719498",
                        "content" => "讲解水彩画的高阶技巧，氛围的营造，意境的表现，怎样脱离技巧用心去画讲解水彩画的高阶技巧，氛围的营造，意境的表现，怎样脱离技巧用心去画讲解水彩画的高阶技巧，氛围的营造，意境的表现，怎样脱离技巧用心去画讲解水彩画的高阶技巧，氛围的营造，意境的表现，怎样脱离技巧用心去画",
                        "teacher" => array(
                            "display_name" => "teacher display name",
                            "number" => 321422218,
                            "order_comment_count" => 0,
                            "invite_comment_count" => 0,
                            "photo_url" => "",
                            "school_age" => 2,
                            "score" => 5,
                            "private_domain" => "XX",
                        )
                    ),
                    array(
                        "id" => "1",
                        "user_id" => "987",
                        "class_course_number" => "1415954843297",
                        "begin_time" => "1444719498",
                        "end_time" => "1444719498",
                        "content" => "讲解水彩画的高阶技巧，氛围的营造，意境的表现，怎样脱离技巧用心去画讲解水彩画的高阶技巧，氛围的营造，意境的表现，怎样脱离技巧用心去画讲解水彩画的高阶技巧，氛围的营造，意境的表现，怎样脱离技巧用心去画讲解水彩画的高阶技巧，氛围的营造，意境的表现，怎样脱离技巧用心去画",
                        "teacher" => array(
                            "display_name" => "teacher display name",
                            "number" => 321422218,
                            "order_comment_count" => 0,
                            "invite_comment_count" => 0,
                            "photo_url" => "",
                            "school_age" => 2,
                            "score" => 5,
                            "private_domain" => "XX",
                        )
                    ),
                    array(
                        "id" => "1",
                        "user_id" => "987",
                        "class_course_number" => "1415954843297",
                        "begin_time" => "1415954843297",
                        "end_time" => "1415954843297",
                        "content" => "讲解水彩画的高阶技巧，氛围的营造，意境的表现，怎样脱离技巧用心去画讲解水彩画的高阶技巧，氛围的营造，意境的表现，怎样脱离技巧用心去画讲解水彩画的高阶技巧，氛围的营造，意境的表现，怎样脱离技巧用心去画讲解水彩画的高阶技巧，氛围的营造，意境的表现，怎样脱离技巧用心去画",
                        "teacher" => array(
                            "display_name" => "teacher display name",
                            "number" => 321422218,
                            "order_comment_count" => 0,
                            "invite_comment_count" => 0,
                            "photo_url" => "",
                            "school_age" => 2,
                            "score" => 5,
                            "private_domain" => "XX",
                        )
                    ),
                    array(
                        "id" => "1",
                        "user_id" => "987",
                        "class_course_number" => "1415954843297",
                        "begin_time" => "1415954843297",
                        "end_time" => "1415954843297",
                        "content" => "惹我惹我惹我惹我二位惹我惹我惹我二位惹我L214.pngL214.pngL214.pngL214.pngL214.pngL214.pngL214.pngL214.pngL214.pngL214.pngL214.pngL214.pngL214.pngL214.pngL214.pngL214.pngL214.pngL214.pngL214.pngL214.pngL214.pngL214.pngL214.pngL214.pngL214.pngL214.png而温柔热人惹我惹我惹我惹我惹我热人惹我惹我惹我惹我惹我热人惹我惹我惹我惹我惹我热人惹我惹我惹我惹我惹我热人惹我惹我惹我惹我惹我而温柔",
                        "teacher" => array(
                            "display_name" => "teacher display name",
                            "number" => 321422218,
                            "order_comment_count" => 0,
                            "invite_comment_count" => 0,
                            "photo_url" => "",
                            "school_age" => 2,
                            "score" => 5,
                            "private_domain" => "XX",
                        )
                    )
                ),
                "address_area" => array(
                    "province" => array(
                        'id' => '570425344',
                        'name' => '台湾',
                        'display_order' => '460',
                        'level' => '1',
                        'hidden' => '0'
                    ),
                    "city" => array(
                        'id' => '570425344',
                        'name' => '台湾',
                        'display_order' => '0',
                        'level' => '2',
                        'hidden' => '0'
                    ),
                    "area" => array(
                        'id' => '570425344',
                        'name' => '澎湖县',
                        'display_order' => '0',
                        'level' => '3',
                        'hidden' => '0'
                    ),
                    "country" => array(
                        'id' => '570425344',
                        'name' => '宁江区',
                        'display_order' => '0',
                        'level' => '3',
                        'hidden' => '0'
                    ),
                    "location_addr" => "中关村新东方大厦",
                ),
                "location" => "北京市昌平区回龙观镇史各庄村村委会",
                "reason_list" => array(
                    'basic' => '',
                    'photo' => '',
                    'introduction' => '',
                    'schedule' => ''
                ),
                "display_status" => 15,//1初始化 2正在招生 3 暂停招生 4满班 5 班课进行中 6 已完成 8审核中 12已失效 13班课终止 15进入教室 16即将开课 17本班课进行中
                "total_pay" => 0,
                "has_master_teacher" => true,
                "succ_pay" => 5,
                "can_chaban" => true,//当前时间能否插班
                "realtime_price" => 1.1, //实时价格
                "can_pay" => 10, //剩余人数
                "is_full" => true, // 是否满班
                "over_close_time" => 0,
                "freq" => 12,//课次数
                // "realtime_course_len" => 3600, //剩余长度，
                "limit_discount" => array(
                    "0" => array(
                        "start_time" => "2015-10-15 20:00:00",
                        "end_time" => "2015-11-15 05:46:00",
                        "tag_name" => "限时折扣",
                        "info" => "TEST 616",
                        "id" => "5",
                        "price" => "200.00", //现价
                        "pre_price" => "500.00"//原价
                    )
                )
            ),
            "organization" => array(
                "id" => 1,
                'membership_level' => 4, // 机构会员等级标示 1非会员 2会员 3高级会员 4超级会员
                "name" => "name",
                "avatar" => "",
                "number" => 322211119,
                "mobile" => 13233333333,
                "score" => 5,
                "location" => 4,
                "im_online_status" => 1,
                "comments_cnt" => 1,
                "brief" => "中华人民共和国完了事撒了款到即发阿拉山口解封爱上了",
                "tags" => array(),
                'extension' => '400-516-516 转 123123', // 400电话
                'city_filter' => 1, // 1西安、武汉 0其他城市 － 400试点城市
            ),
            "other_courses" => array(
                array(
                    "name" => "托福可信词汇",
                    "price" => "500",
                    "course_length" => "6",
                    "display_status_search" => "6",
                    "number" => 123123,
                    "type" => 4,
                ),
                array(
                    "name" => "托福可信词汇",
                    "price" => "500",
                    "course_length" => "6",
                    "display_status_search" => "6",
                    "number" => 123123,
                    "type" => 2,
                ),
                array(
                    "name" => "托福可信词汇",
                    "price" => "500",
                    "course_length" => "6",
                    "display_status_search" => "6",
                    "number" => 123123,
                    "type" => 4,
                ),
                array(
                    "name" => "托福可信词汇",
                    "price" => "500",
                    "course_length" => "6",
                    "display_status_search" => "6",
                    "number" => 123123,
                    "type" => 2
                )
            ),
            'relatedcourse' => array(//右侧相关课程
                array(
                    "coursenumber" => "151110482000",
                    "pic" => null,
                    "name" => "对外汉语《》&amp;lt;&amp;gt;》",
                    "price" => 0.01
                )
            ),
            "is_preview" => 1,
            "is_favored" => false, // 是否收藏本课程
            "popularity" => 1899, // 已被收藏次数，人气值
            "course_type" => 3, //3810 机构线下课
        )
    )
);

