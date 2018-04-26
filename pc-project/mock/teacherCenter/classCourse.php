<?php
    require("../bootstrap.php");
    render(
    // 由于现在线下课的大部分功能相同 只有课程设置和基础信息单独出来了 其他部分是共用的
        // "userCenter/teacherCenter/classCourseEdit/offlineCourseEdit",
        "userCenter/teacherCenter/classCourseEdit/onlineCourseEdit",
        array(
            "tpl_data" => array(
                "course" => array(
                    "number" => '12',
                    "display_name" => "作家教你写作文",
                    "lesson_way" => 2,
                    "prices" => array(
                        "now" => 0,
                        "original" => 2000
                    ),
                    "trial_minutes" => 0,
                    "playback_expire_day" => 20,
                    "playback_to_video" => 0, // 回放自动转为视频课
                    "auto_playback_record" => 1, // 提供回放
                    "support_materials_post" => false,
                    "address" => array(
                        "id" => 489219,
                        "location_addr" => "花园路与国泰路交口罗马假日"
                    ),
                    "student_amount" => array(
                        "min" => 1,
                        "max" => 3000
                    ),
                    "chaban" => array(
                        "flag" => 3,
                        "quota" => 0,
                        "price_flag" => 1,
                        "price" => null
                    ),
                    "retire" => array(
                        "flag" => 4,
                        "length" => null
                    ),
                    "intro" => array(
                        "style" => null,
                        "items" => [
                            array(
                                "id" => "2054",
                                "class_course_number" => "160816486209",
                                "type" => "body",
                                "text" => "   测试hdajshdSD哈金斯等哈说记到哈三季度哈市撒娇的哈就四点哈斯基等哈圣诞节哈斯基等哈圣诞节卡上贷记卡三大和撒就看到哈市<br /><br /><br />dasdasda<br /><br /><br />dasdasdas<br />da   dasd<br />dasdas<br /><br /><br />dasdad   测试ndasdasdandasdasdas<br />da   dasd<br />dasdasndasdad   测试ndasdasdandasdasdas<br />da   dasd<br />dasdasndasdad   测试ndasdasdandasdasdas<br />da   dasd<br />dasdasndasdad   测试ndasdasdandasdasdas<br />da   dasd<br />dasdasndasdad   测试ndasdasdandasdasdas<br />da   dasd<br />dasdasndasdad   测试ndasdasdandasdasdas<br />da   dasd<br />dasdas<br /><br /><br />dasdad",
                                "font_weight" => "bold",
                                "font_size" => "17px",
                                "text_align" => "left",
                                "color" => "#FC5C5A",
                                "length" => "0",
                                "storage_id" => null,
                                "video_id" => null,
                                "created_at" => "2016-08-16 09:58:52",
                                "updated_at" => null
                            ),
                        ]
                    ),
                    "templates" => array(
                        "m" => "green",
                        "pc" => "skin301"
                    ),
                    "mobile_visible" => 1,
                    "auto_increase_max_student_amount" => 1,
                    "schedules" => [
                        array(
                            "id" => 2626255,
                            "began_at" => "2017-09-18 19:00:00",
                            "ended_at" => "2017-09-18 20:00:00",
                            "teacher_id" => 459040,
                            "content" => ""
                        ),
                        array(
                            "id" => 2626256,
                            "began_at" => "2017-10-01 19:00:00",
                            "ended_at" => "2017-10-01 20:00:00",
                            "teacher_id" => 459040,
                            "content" => ""
                        )
                    ],
                    "recommend_courses" => [],
                    "covers" => [
                        array(
                            "storage_id" => 3862126,
                            "url" => "http://img.gsxservice.com/13681406_7y84leax.jpeg"
                        ),
                        array(
                            "storage_id" => 3862129,
                            "url" => "http://img.gsxservice.com/13681540_wvrsp6ld.jpeg"
                            )
                    ],
                    "verify_reasons" => null,
                    "subject" => array(
                        "id" => 117,
                        "name" => "全部",
                        "path_crumbs" => "小学>语文>全部",
                        "path_array" => [
                            array(
                                "id" => 107,
                                "level" => 1,
                                "name" => "小学",
                                "remark_name" => "小学"
                            ),
                            array(
                                "id" => 116,
                                "level" => 2,
                                "name" => "语文",
                                "remark_name" => "小学语文"
                            ),
                            array(
                                "id" => 117,
                                "level" => 3,
                                "name" => "全部",
                                "remark_name" => "小学语文"
                            )
                        ]
                    )
                ),
                "free_data_size" => 1024, // 空余资料空间大小，字节
                "templates" => array(
                    "pc" => [
                        array(
                            "name" => "default",
                            "name_cn" => "非会员模板",
                            "vip_level" => 0,
                            "image" => "http://img.gsxservice.com/5996185_cf9kmyvj.png",
                            "preview_image" => "http://img.gsxservice.com/0tapi/course_templates/normal_course/4.png"
                        ),
                        array(
                            "name" => "skin101",
                            "name_cn" => "会员模板（微澜）",
                            "vip_level" => 1,
                            "image" => "http://img.gsxservice.com/5996179_jng6fppf.png",
                            "preview_image" => "http://img.gsxservice.com/0tapi/course_templates/normal_course/4.png"
                        ),
                        array(
                            "name" => "skin102",
                            "name_cn" => "会员模板（梦幻）",
                            "vip_level" => 1,
                            "image" => "http://img.gsxservice.com/5996186_n1lf7irw.png",
                            "preview_image" => "http://img.gsxservice.com/0tapi/course_templates/normal_course/4.png"
                        ),
                        array(
                            "name" => "skin201",
                            "name_cn" => "高级会员（奇光异彩）",
                            "vip_level" => 2,
                            "image" => "http://img.gsxservice.com/5996188_8ikr2xez.png",
                            "preview_image" => "http://img.gsxservice.com/0tapi/course_templates/normal_course/4.png"
                        ),
                        array(
                            "name" => "skin301",
                            "name_cn" => "超级会员（复古淡雅）",
                            "vip_level" => 3,
                            "image" => "http://img.gsxservice.com/5996181_qzbcl4zw.png",
                            "preview_image" => "http://img.gsxservice.com/0tapi/course_templates/normal_course/4.png"
                        )
                    ],
                    "m" => [
                        array(
                            "name" => "default",
                            "name_cn" => "非会员模板",
                            "vip_level" => 0,
                            "vip_privilege" => 0,
                            "image" => "http://img.gsxservice.com/5374470_whd5ohiy.jpeg",
                            "preview_image" => "http://img.gsxservice.com/6236574_e7506gut.jpeg"
                        ),
                        array(
                            "name" => "orange",
                            "name_cn" => "会员模板（橙色）",
                            "vip_level" => 1,
                            "vip_privilege" => 1,
                            "image" => "http://img.gsxservice.com/5374477_pda8baju.jpeg",
                            "preview_image" => "http://img.gsxservice.com/5377491_nwz9lde3.jpeg"
                        ),
                        array(
                            "name" => "coffee",
                            "name_cn" => "会员模板（咖啡色）",
                            "vip_level" => 1,
                            "vip_privilege" => 1,
                            "image" => "http://img.gsxservice.com/5374482_l4tbd6a8.jpeg",
                            "preview_image" => "http://img.gsxservice.com/5377492_qqarucpn.jpeg"
                        ),
                        array(
                            "name" => "red",
                            "name_cn" => "会员模板（红色）",
                            "vip_level" => 2,
                            "vip_privilege" => 2,
                            "image" => "http://img.gsxservice.com/5374482_l4tbd6a8.jpeg",
                            "preview_image" => "http://img.gsxservice.com/5377492_qqarucpn.jpeg"
                        ),
                        array(
                            "name" => "green",
                            "name_cn" => "会员模板（蓝绿色）",
                            "vip_level" => 3,
                            "vip_privilege" => 4,
                            "image" => "http://img.gsxservice.com/6154488_15em241h.jpeg",
                            "preview_image" => "http://img.gsxservice.com/6154486_a591ehkz.jpeg"
                        )
                    ]
                ),
                "have_student"=> true,
                "rest_schedules_time_change_times" => 3, // 教学计划剩余可修改次数
                "from_shizi_login" => true,
                /*
                "org_teachers" => [
                    array(
                        "id" => 341949,
                        "realname" => "会更加",
                        "is_valid" => 1
                    ),
                    array(
                        "id" => 342184,
                        "realname" => "老师one",
                        "is_valid" => 2
                    ),
                    array(
                        "id" => 342208,
                        "realname" => "张傲云",
                        "is_valid" => 1
                    ),
                    array(
                        "id" => 342253,
                        "realname" => "张三",
                        "is_valid" => 1
                    ),
                    array(
                        "id" => 342255,
                        "realname" => "李四",
                        "is_valid" => 1
                    ),
                    array(
                        "id" => 342257,
                        "realname" => "王五",
                        "is_valid" => 1
                    ),
                    array(
                        "id" => 342258,
                        "realname" => "马六",
                        "is_valid" => 2
                    ),
                    array(
                        "id" => 342310,
                        "realname" => "何七",
                        "is_valid" => 1
                    ),
                    array(
                        "id" => 342400,
                        "realname" => "丹丹属于云南分公司",
                        "is_valid" => 1
                    ),
                    array(
                        "id" => 342766,
                        "realname" => "丹丹新添加的",
                        "is_valid" => 2
                    ),
                    array(
                        "id" => 344162,
                        "realname" => "李魏婷",
                        "is_valid" => 2
                    ),
                    array(
                        "id" => 344106,
                        "realname" => "李魏婷",
                        "is_valid" => 2
                    ),
                    array(
                        "id" => 346169,
                        "realname" => "19600000011",
                        "is_valid" => 2
                    )
                ]
                */
            )
        )
    );
