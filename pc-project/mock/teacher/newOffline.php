<?php


require("../bootstrap.php");

render(
    // "teacher/newOffline", // 非会员课程模板统一
    "teacher/newCourse",
    array(
        "tpl_data" => array(
            "crumb" => array(
                'host' => 'bj',
                'city' => array(
                    'id' => '12',
                    'name' => '北京'
                ),
                'list' => array(
                    array(
                        'id' => '123',
                        'name' => '艺术'
                    ),
                    array(
                        'id' => '323',
                        'name' => '舞蹈'
                    ),
                    array(
                        'id' => '12',
                        'name' => '街舞'
                    )
                )
            ),
            "profile" => array(
                "name" => "徐梅山",
                "name_cut" => "徐梅山",
                "sex" => "1",
                "vip_level" => 3,
                "template_level" => 0,
                "avatar" => "http://img.gsxservice.com/170558_6mk3qxqs.jpeg",
                "user_id" => "13120",
                "user_number" => "111212312312",
                "domain" => "james",
                "user_home" => "http://genshuixue.com/874171288",
                "slogan" => "周易预测、环境风水、起名、择日。",
                "like_count" => "15",
                "view_count" => 886,
                "comment_count" => 11,
                "invite_comment_count" => 1,
                "area" => "北京-朝阳区",
                "address" => "华腾北搪商务大厦",
                "score" => "5.0",
                "student_count" => "11",
                "teach_time" => 36,
                "favor_percent" => "1.00",
                "certification" => array(
                    //"专业资质", "学历认证", "教师证", "身份证"
                    "profession", "student", "teacher", "idcard"

                ),
                "organization" => array(
                    "id" => "18",
                    "name" => "天下网校",
                    "number" => "123123",
                    "url" => "http://img.gsxservice.com/212290_zon87dal.jpg",
                    "m_url" => "/i/tianxiawangxiao",
                    "description" => "致力于为各大教育平台提供优质体验的课程产品，是各大教育平台的优质资源商。以求知识分享、技能交互。",
                    "qualifications" => "公司",
                    "avatar" => 'http://img.gsxservice.com/212290_zon87dal.jpg'
                ),
                "offline_poi" => array(
                    "lng" => null,
                    "lat" => null
                ),
                "has_activity_auth" => true,
                "audio" => "http://test-file.gsxservice.com/9742_j4bytr8h.mp3",
                "audio_length" => "180",
                //"audio" => "",
                //"audio_length" => "",
                "medal" => array(
                    array(
                        "type" => "21",
                        "desc" => "金质跟谁学名师最具人气奖",
                        "logo" => "http://img.gsxservice.com/0medal/5.png",
                        "phase" => 3,
                        "toplist_type" =>"22"
                    ),
                    array(
                        "type" => "11",
                        "desc" => "金质跟谁学名师最有价值奖",
                        "logo" => "http://img.gsxservice.com/0medal/5.png",
                        "phase" => 3,
                        "toplist_type" =>"22"
                    )
                ),
                "can_order" => false,
                "total_courses" => 4555,
                "online_count" => "45",
                "offline_count" => "25",
                "video_count" => 4,
                "usabletime_desc" => null,
                "flag_course" => 1,//该老师是否有课程
                "org_type" => 4,//如果为4的话，就是3810项目的老师
                "org_address" => "机构地址3810", //机构地址
            ),
            "teach" => array(
                /*"subject" => array(
                     "0",
                                "display_order" => "1",
                                "hidden" => "0",
                                "parent_id" => "889",
                                "remark_name" => "星座",
                                "subject_type" => "0",
                                "verify_status" => "1",
                                "tag" => null,
                                "image" => "http://img.gsxservice.com/87992_lne2opdt.jpeg",
                                "teacher_count" => "1"
                            )
                        ),
                        "id" => "36640",
                        "price" => array(
                            "teacher" => "1",
                            "student" => "1",
                            "discuss" => "1",
                            "online" => "1"
                        )
                    ),
                ),
                "school_age" => "30",
                "approach" => array(
                    "2" => "online"
                ),
                "access_area" => array(),
                "skill" => array(
                    "深入浅出",
                    "简单易懂",
                    "化繁为简",
                    "结合实际",
                    "实例分析"
                ),
                "min_price" => "1000",
                "max_price" => "1231",*/
                "subject" => array(
                    array(
                        "name" => "大学-英语-口语-自定义",
                        "id" => "12",
                        "price" => array(
                            "teacher" => 1000,
                            "student" => 1000000,
                            "discuss" => 100000,
                            "online" => 10000
                        ),
                        "path" => array(
                            array(
                                "id"=> "783",
                                "name"=> "出国留学1级",
                                "level"=> "1",
                                "subnodes"=> "5",
                                "display_order"=> "508",
                                "hidden"=> "0",
                                "parent_id"=> "0",
                                "remark_name"=> "出国留学",
                                "subject_type"=> "0",
                                "verify_status"=> "1",
                                "tag"=> null,
                                "image"=> null,
                                "teacher_count"=> "1"
                            ),
                            array(
                                "id"=> "783",
                                "name"=> "出国留学2级",
                                "level"=> "2",
                                "subnodes"=> "5",
                                "display_order"=> "508",
                                "hidden"=> "0",
                                "parent_id"=> "0",
                                "remark_name"=> "出国留学",
                                "subject_type"=> "0",
                                "verify_status"=> "1",
                                "tag"=> null,
                                "image"=> null,
                                "teacher_count"=> "1"
                            ),
                            array(
                                "id"=> "783",
                                "name"=> "出国留学3级",
                                "level"=> "1",
                                "subnodes"=> "5",
                                "display_order"=> "508",
                                "hidden"=> "0",
                                "parent_id"=> "0",
                                "remark_name"=> "出国留学",
                                "subject_type"=> "0",
                                "verify_status"=> "1",
                                "tag"=> null,
                                "image"=> null,
                                "teacher_count"=> "1"
                            ),
                        )
                    ),
                    array(
                        "name" => "大学语文",
                        "id" => "223",
                        "price" => array(
                            "teacher" => 123,
                            "student" => 10,
                            "discuss" => '',
                            "online" => 2320
                        ),
                        "path" => array(
                            array(
                                "id"=> "634",
                                "name"=> "资格考试",
                                "level"=> "1",
                                "subnodes"=> "6",
                                "display_order"=> "492",
                                "hidden"=> "0",
                                "parent_id"=> "0",
                                "remark_name"=> "资格考试",
                                "subject_type"=> "0",
                                "verify_status"=> "1",
                                "tag"=> null,
                                "image"=> null,
                                "teacher_count"=> "1"
                            ),
                            array(
                                "id"=> "783",
                                "name"=> "出国留学2级",
                                "level"=> "2",
                                "subnodes"=> "5",
                                "display_order"=> "508",
                                "hidden"=> "0",
                                "parent_id"=> "0",
                                "remark_name"=> "出国留学",
                                "subject_type"=> "0",
                                "verify_status"=> "1",
                                "tag"=> null,
                                "image"=> null,
                                "teacher_count"=> "1"
                            ),
                            array(
                                "id"=> "783",
                                "name"=> "出国留学3级",
                                "level"=> "1",
                                "subnodes"=> "5",
                                "display_order"=> "508",
                                "hidden"=> "0",
                                "parent_id"=> "0",
                                "remark_name"=> "出国留学",
                                "subject_type"=> "0",
                                "verify_status"=> "1",
                                "tag"=> null,
                                "image"=> null,
                                "teacher_count"=> "1"
                            )
                        )
                    ),
                    array(
                        "name" => "二十五史",
                        "id" => "333",
                        "price" => array(
                            "teacher" => '',
                            "student" => 2310,
                            "discuss" => 124,
                            "online" => 230
                        ),
                        "path" => array(
                            array(
                                "id"=> "783",
                                "name"=> "出国留学",
                                "level"=> "1",
                                "subnodes"=> "5",
                                "display_order"=> "508",
                                "hidden"=> "0",
                                "parent_id"=> "0",
                                "remark_name"=> "出国留学",
                                "subject_type"=> "0",
                                "verify_status"=> "1",
                                "tag"=> null,
                                "image"=> null,
                                "teacher_count"=> "1"
                            ),
                            array(
                                "id"=> "783",
                                "name"=> "二十五史2级",
                                "level"=> "2",
                                "subnodes"=> "5",
                                "display_order"=> "508",
                                "hidden"=> "0",
                                "parent_id"=> "0",
                                "remark_name"=> "出国留学",
                                "subject_type"=> "0",
                                "verify_status"=> "1",
                                "tag"=> null,
                                "image"=> null,
                                "teacher_count"=> "1"
                            ),
                            array(
                                "id"=> "783",
                                "name"=> "二十五史3级",
                                "level"=> "1",
                                "subnodes"=> "5",
                                "display_order"=> "508",
                                "hidden"=> "0",
                                "parent_id"=> "0",
                                "remark_name"=> "出国留学",
                                "subject_type"=> "0",
                                "verify_status"=> "1",
                                "tag"=> null,
                                "image"=> null,
                                "teacher_count"=> "1"
                            )
                        )
                    ),
                    array(
                        "name" => "初中地理",
                        "id" => "23324",
                        "price" => array(
                            "teacher" => '',
                            "student" => 110,
                            "discuss" => '',
                            "online" => 2220
                        )
                    ),
                    array(
                        "name" => "IT培训-计算机证书-C语言",
                        "id" => "23425",
                        "price" => array(
                            "teacher" => '',
                            "student" => 10,
                            "discuss" => '',
                            "online" => 20
                        )
                    ),
                    array(
                        "name" => "高等数学",
                        "id" => "61223",
                        "price" => array(
                            "teacher" => 123,
                            "student" => 10,
                            "discuss" => 234,
                            "online" => 20
                        )
                    ),
                    array(
                        "name" => "大学物理",
                        "id" => "12337",
                        "price" => array(
                            "teacher" => 12,
                            "student" => 120,
                            "discuss" => 1123,
                            "online" => 220
                        )
                    ),
                    array(
                        "name" => "IT培训-计算机证书-其实我不懂",
                        "id" => "823",
                        "price" => array(
                            "teacher" => '',
                            "student" => 10,
                            "discuss" => '',
                            "online" => 20
                        )
                    )
                ),
                "min_price" => 135,
                "max_price" => 1231,
                "school_age" => "-1",
                "approach" => array(
                    'online', 'teacher', 'student', 'discuss'
                ),
                "skill" => array(
                    "英语口语asdasd sad ",
                    "英语口语安师大撒打SD按时打算撒大时代",
                    "英语口语",
                    "英语口语安师大撒打SD按时打算撒大时代",
                    "英语口语",
                ),
                "access_area" => array(
                    "全国",
                )
            ),
            "is_favored" => true,
            "has_activity_auth" => true,
            "tag_id" => 2, // 当前用户选中标签
            "tag_list" => array( // 自定义标签
                array(
                    "id" => 1,
                    "name" => "推荐课程"
                ),
                array(
                    "id" => 2,
                    "name" => "经典课程"
                ),
                array(
                    "id" => 3,
                    "name" => "选休课程"
                ),
                array(
                    "id" => 1,
                    "name" => "推荐课程"
                ),
                array(
                    "id" => 2,
                    "name" => "经典课程"
                ),
                array(
                    "id" => 3,
                    "name" => "选休课程"
                ),
                array(
                    "id" => 1,
                    "name" => "推荐课程"
                ),
                array(
                    "id" => 2,
                    "name" => "经典课程"
                ),
                array(
                    "id" => 3,
                    "name" => "选休课程"
                ),
            ),
            "offline" => array(
                "count" => 123,
                "sort_by" => 'update_time',
                "course" => array(
                    array(
                        "course_type" => 2,
                        "number" => "160519643930",
                        "cover_url" => "http://img.gsxservice.com/11398047_a0r5g0gi.jpeg",
                        /*
                        "limit_discount" => array( // 限额折扣上线后，字段名改
                        ),
                        */
                        "discount" => array( // 限时/额折扣
                            "start_time" => "2016-03-08 14:06:00",
                            "end_time" => "2017-10-11 14:06:00",
                            "type" => 2, // 1为限额 2为限时
                            "remain_amount" => 40, // 限额，剩余名额
                            "discount_price" => '0.03', //现价
                            "pre_price" => "83.32", //原价
                            "tag_name" => "616大促",
                        ),
                        "name" => "瑜伽教练培训班定金（颁发国际联盟证书）",
                        "freq" => 12,//课次数
                        "course_len" => "723600",
                        "max_student" => "20",
                        "arrangement" => "07月18 日 09:00 开课 08月25 日 12:00 结课 共67节",
                        "lesson_way" => "4",
                        "address_area" => array(
                            "province" => array(
                                "id" => "385875968",
                                "name" => "陕西",
                                "display_order" => "520",
                                "level" => "1",
                                "hidden" => "0",
                                "bid" => "27",
                                "bname" => "陕西省",
                                "tid" => "610000",
                                "pk" => 385875968
                            ),
                            "city" => array(
                                "id" => "386138112",
                                "name" => "西安",
                                "display_order" => "0",
                                "level" => "2",
                                "hidden" => "0",
                                "bid" => "233",
                                "bname" => "西安市",
                                "tid" => "610100",
                                "pk" => 386138112
                            ),
                            "area" => array(
                                "id" => "386141184",
                                "name" => "碑林区",
                                "display_order" => "0",
                                "level" => "3",
                                "hidden" => "0",
                                "bid" => "8257",
                                "bname" => "碑林区",
                                "tid" => "610103",
                                "pk" => 386141184
                            ),
                            "country" => array(),
                            "address" => "陕西省西安市碑林区二环路沿线商业经济带文艺北路37号",
                            "location_addr" => "陕西省西安市碑林区二环路沿线商业经济带文艺北路37号",
                            "full_address" => "陕西西安碑林区陕西省西安市碑林区二环路沿线商业经济带文艺北路37号"
                        ),
                        "offline_poi" => "108.96143295439,34.248855256642",
                        "location" => "陕西西安碑林区陕西省西安市碑林区二环路沿线商业经济带文艺北路37号",
                        "class_type" => "1",
                        "price" => "1000.00",
                        "display_status" => 6,
                        "verify_status" => "1",
                        "succ_pay" => "15",
                        "total_pay" => 15,
                        "is_full" => false,
                        "can_chaban" => false,
                        "realtime_price" => null,



                        // 未删减版
                        "id" => "200352",
                        "user_id" => "1191211",
                        "organization_number" => "497517219",
                        "subject_id" => "929",
                        "original_price" => "1000.00",
                        "min_student" => "1",
                        "cover" => "382000",
                        "template_m" => "default",
                        "template_pc" => "skin301",
                        "information" => "1.教授包括技巧（体式、呼吸控制法、冥想、清洁法、唱诵）\n2.教学法\n3.实践\n4.瑜伽生理解剖学\n5.瑜伽哲学与生活方式\n6.启发式教学，教授学生如何对待自己的教练生涯",
                        "introduction" => "<p><img src=\"http://img.gsxservice.com/11398053_wzmh3npl.png\" title=\"\" alt=\"瑜伽详情.png\" /></p>",
                        "student_desc" => null,
                        "target" => null,
                        "use_regular_addr" => "0",
                        "area_id" => "386141184",
                        "address" => "陕西省西安市碑林区二环路沿线商业经济带文艺北路37号",
                        "user_address_id" => "257803",
                        "status" => "2",
                        "open_status" => "2",
                        "reason" => "",
                        "reason_text" => "",
                        "is_complete" => "1",
                        "chaban_flag" => "3",
                        "chaban_quota" => "0",
                        "chaban_price_flag" => "1",
                        "chaban_price" => null,
                        "begin_time" => 1468803600,
                        "end_time" => 1472097600,
                        "create_time" => 1463657650,
                        "update_time" => 1470570254,
                        "special_time_reason" => "",
                        "retire_flag" => "0",
                        "retire_length" => "0",
                        "sort" => "0",
                        "rank" => "0",
                        "extend_status" => "0",
                        "transform" => "0",
                        "page_view" => "0",
                        "last_set_time" => null,
                        "group_id" => "205016",
                        "auto_status" => "0",
                        "auto_status_time" => "0",
                        "playback_expire_day" => "10",
                        "is_auto_incr" => "0",
                        "intro_style" => null,
                        "trial_minutes" => "0",
                        "playback_to_video" => "0",
                        "begin_time_ts" => 1468803600,
                        "in_pay" => "0",
                        "photos" => array(
                            array(
                                "id" => "382000",
                                "title" => null,
                                "url" => "http://img.gsxservice.com/11398047_a0r5g0gi.jpeg",
                                "width" => 746,
                                "height" => 417,
                                "storage_id" => "3724236",
                                "create_time" => 1463657651
                            )
                        ),
                        "realtime_course_len" => null,
                        "tag_fenqi" => 1



                    ),
                    array(
                        /*
                        "limit_discount" => array(
                            "0" => array(
                                "start_time" => "2015-06-26 00:00:00",
                                "end_time" => "2015-06-16 24:00:00",
                                "tag_name" => "616大促",
                                "info" => "TEST 616",
                                "id" => "5",
                                "price" => "200.00", //现价
                                "pre_price" => "500.00"//原价
                            )
                        ),
                        */
                        "discount" => array( // 限时/额折扣
                            "start_time" => "2016-03-08 14:06:00",
                            "end_time" => "2017-10-11 14:06:00",
                            "type" => 1, // 1为限额 2为限时
                            "remain_amount" => 40, // 限额，剩余名额
                            "discount_price" => '0.03', //现价
                            "pre_price" => "83.32", //原价
                            "tag_name" => "616大促",
                        ),
                        "number" => "1311134745712",//班课number
                        "subject_id" => '383', //班课包含的subject的id
                        "name" => "水彩画创意速成课程",
                        "lesson_way" => 4, //可上课的方式4普通场地课2普通在线3在线公开课
                        "create_time" => "2013-08-03 19:27:21", //课程创建时间
                        "begin_time" => "1415860970", //课程开始时间
                        "end_time" => "1415960970", //课程结束时间
                        "course_len" => 12000,
                        "display_status" => 2,
                        "price" => 123,//课程价格
                        "max_student" => 20,//最大学生数
                        "address" => "北京市海淀区黄焖鸡米饭", //上课地点
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

                            ),
                            "location_addr" => "中关村新东方大厦",
                        ),
                        "student_desc" => "小学生", //适学人群
                        "status" => 1, //班课状态 1初始状态,2可以招生但是尚未招生
                                       //3正在招生,4停止招生,5开课,6课程结束
                        "photos" => array(
                            array(
                                'id' => '',
                                'create_time' => '',
                                'url' => 'http://img.gsxservice.com/1251_scwyj6zr.jpeg',
                                'name' => '鲜花',
                                'width' => 480,
                                'height' => 640
                            ),
                            array(
                                'id' => '',
                                'create_time' => '',
                                'url' => 'http://img.gsxservice.com/29650_v8ag661z.jpeg',
                                'name' => '失联客机',
                                'width' => 768,
                                'height' => 1024
                            ),
                            array(
                                'id' => '',
                                'create_time' => '',
                                'url' => 'http://img.gsxservice.com/901_o6ut84ce.png',
                                'name' => '撒了快递费',
                                'width' => 400,
                                'height' => 600
                            ),
                            array(
                                'id' => '',
                                'create_time' => '',
                                'url' => 'http://img.gsxservice.com/6271_znvng0qo.png',
                                'name' => '撒了款到即发',
                                'width' => 479,
                                'height' => 640
                            ),
                            array(
                                'id' => '',
                                'create_time' => '',
                                'url' => 'http://img.gsxservice.com/13116_rh81m1o2.jpeg',
                                'name' => '撒了款到即发',
                                'width' => 852,
                                'height' => 1136
                            ),
                            array(
                                'id' => '',
                                'create_time' => '',
                                'url' => 'http://img.gsxservice.com/1251_scwyj6zr.jpeg',
                                'name' => '鲜花',
                                'width' => 480,
                                'height' => 640
                            ),
                            array(
                                'id' => '',
                                'create_time' => '',
                                'url' => 'http://img.gsxservice.com/29650_v8ag661z.jpeg',
                                'name' => '失联客机',
                                'width' => 768,
                                'height' => 1024
                            ),
                            array(
                                'id' => '',
                                'create_time' => '',
                                'url' => 'http://img.gsxservice.com/901_o6ut84ce.png',
                                'name' => '撒了快递费',
                                'width' => 400,
                                'height' => 600
                            ),
                            array(
                                'id' => '',
                                'create_time' => '',
                                'url' => 'http://img.gsxservice.com/6271_znvng0qo.png',
                                'name' => '撒了款到即发',
                                'width' => 479,
                                'height' => 640
                            ),
                            array(
                                'id' => '',
                                'create_time' => '',
                                'url' => 'http://img.gsxservice.com/13116_rh81m1o2.jpeg',
                                'name' => '撒了款到即发',
                                'width' => 852,
                                'height' => 1136
                            ),
                        ), //照片
                        "total_pay" => 10, //支付状态
                        "succ_pay" => 5,  // 成功支付
                        "verify_status" => 1 , //审核状态1审核通过 2审核被拒
                        "location" => '北京 海淀 全部信息',
                        'offline_poi' => array(
                            'lng' => '1.24354325',
                            'lat' => '2.34535435'
                        ),
                        "chaban_flag" => 2, //插班标识 1不可插班 2第n节课前可插班 3随时可插班
                        "chaban_quota" => 0, //第n节课前可插班
                        "chaban_price_flag" => 1, //插班价格标识 1未结束课程的总价 2自定义插班价
                        "chaban_price" => 9.9,//插班价格
                        "can_chaban" => true,//当前时间能否插班
                        "realtime_price" => 1.1, //实时价格
                        "realtime_course_len" => 3600, //剩余长度
                        "is_full" => true, // 是否满班,
                        "arrangement" => "啊掉了啊掉了啊掉了的阿斯顿发的阿斯顿发的阿斯顿发",
                        "course_type" => 4, // 3810

                    ),
                )
            ),
            "online" => array(
                "count" => 123,
                "course" => array(
                )
            ),
            "video" => array(
                "count" => 123,
                "course" => array(
                )
            ),
            "one2one" => array(
                "count" => 123,
                "course" => array(
                )
            ),
            'pager'=>array(
                'count' => 40,
                'page' => 3 ,
                'page_size' => 10
            ),
            "title" => "北京 徐梅山-星座-居家风水-找好老师，上跟谁学",
            "description" => "【找好老师，上跟谁学】因为专业所以权威，深入浅出、简单易懂、化繁为简、结合实际、实例分析，教授科目：星座-居家风水",
            "keywords" => "北京 徐梅山-星座",
            "comment_list" => array(
                "pager" => array(
                    'count' => 110,
                    'page' => 1 ,
                    'page_size' => 10
                ),
                "comment" => array(

                    array(
                        'id' => '4',
                        'purchase_id' => '114082832893440',
                        'user_id' => '27',
                        'teacher_user_id' => '10',
                        'desc_match' => '3',
                        'teach_result' => '3',
                        'service_attitude' => '3',
                        'fr' => '1',
                        'display_name' => '徐俊山',
                        'del' => true,
                        'face_type' => '2', //新增字段表示邀请评价
                        'info' => '老师讲的太好了师讲的太好了asd师讲的太好了，老师讲的太好了阿斯蒂芬老师讲的太好撒旦fwe师讲的太好了，老师讲的太好了，老师讲的太好阿斯顿发老师讲的太好了阿斯顿发讲的太好了，老师讲的太阿斯蒂芬老师讲的太好了，',
                        'pid' => '0',
                        'create_time' => '2014-09-03 10:55:22',
                        'update_time' => '2014-09-03 10:55:22',
                        'lesson_way' => 'teacher',
                        'user_avatar' => 'http://img4.imgtn.bdimg.com/it/u=1171309943,4124341071&fm=21&gp=0.jpg',
                        'teacher_user_name' => '柯景腾',
                        'teacher_user_name_cut' => '柯景腾',
                        'private_domain' => '',
                        'user_name' => 'happyjlq',
                        'user_name_cut' => 'happyjlq',
                        'user_number' => 123123123,
                        'student_name' => '张小四',
                        'student_name_cut' => '张小四',
                        'course_id' => '573',
                        'course_name' => '小学二年级-语文',
                        'hours' => 4,
                        'photo_list' => array(
                            array(
                                'user_id' => 123123, //学生id
                                'storage_id' => 12312, //前端用不到
                                'title' => '图片的标题1', //图片标题
                                'create_time' => 39994, //图片创建时间
                                'url' => 'http://img.gsxservice.com/27658_61zqh1ni.jpeg',//图片url
                                'width' => 300,
                                'height' => 150
                            ),
                            array(
                                'user_id' => 123123, //学生id
                                'storage_id' => 12312, //前端用不到
                                'title' => '图片的标题1', //图片标题
                                'create_time' => 39994, //图片创建时间
                                'url' => 'http://img.gsxservice.com/1251_scwyj6zr.jpeg',//图片url
                                'width' => 480,
                                'height' => 640
                            ),
                            array(
                                'user_id' => 123123, //学生id
                                'storage_id' => 12312, //前端用不到
                                'title' => '图片的标题1', //图片标题
                                'create_time' => 39994, //图片创建时间
                                'url' => 'http://img.gsxservice.com/29650_v8ag661z.jpeg',//图片url
                                'width' => 768,
                                'height' => 1024
                            )
                        ),
                        'thumb_flag' => 1,
                        'thumb_up' => "0"
                    ),
                    array(
                        'id' => '4',
                        'purchase_id' => '114082832893440',
                        'user_id' => '27',
                        'teacher_user_id' => '10',
                        'desc_match' => '3',
                        'teach_result' => '3',
                        'service_attitude' => '3',
                        'face_type' => '1',
                        'fr' => '2',
                        'display_name' => '徐俊山',
                        'info' => '评论内容',
                        'pid' => '0',
                        'create_time' => '2014-09-03 10:55:22',
                        'update_time' => '2014-09-03 10:55:22',
                        'lesson_way' => 'teacher',
                        'user_avatar' => 'http://img4.imgtn.bdimg.com/it/u=1171309943,4124341071&fm=21&gp=0.jpg',
                        'teacher_user_name' => '程丽娟要十二位的姓名是否截断',
                        'teacher_user_name_cut' => '程丽娟要十二...',
                        'private_domain' => '',
                        'user_name' => 'happyjlq',
                        'user_name_cut' => 'happyjlq',
                        'user_number' => 123123123,
                        'student_name' => 'happyjlq',
                        'student_name_cut' => 'happyjlq',
                        'course_id' => '573',
                        'course_name' => '小学二年级-语文',
                        'hours' => 4,
                        'photo_list' => array(
                            array(
                                'user_id' => 123123, //学生id
                                'storage_id' => 12312, //前端用不到
                                'title' => '图片的标题1', //图片标题
                                'create_time' => 39994, //图片创建时间
                                'url' => 'http://img.gsxservice.com/27658_61zqh1ni.jpeg',//图片url
                                'width' => 300,
                                'height' => 150
                            ),
                            array(
                                'user_id' => 123123, //学生id
                                'storage_id' => 12312, //前端用不到
                                'title' => '图片的标题1', //图片标题
                                'create_time' => 39994, //图片创建时间
                                'url' => 'http://img.gsxservice.com/1251_scwyj6zr.jpeg',//图片url
                                'width' => 480,
                                'height' => 640
                            ),
                            array(
                                'user_id' => 123123, //学生id
                                'storage_id' => 12312, //前端用不到
                                'title' => '图片的标题1', //图片标题
                                'create_time' => 39994, //图片创建时间
                                'url' => 'http://img.gsxservice.com/29650_v8ag661z.jpeg',//图片url
                                'width' => 768,
                                'height' => 1024
                            )
                        ),
                        'thumb_flag' => 1,
                        'thumb_up' => "0"
                    ),
                    array(
                        'id' => '4',
                        'purchase_id' => '114082832893440',
                        'user_id' => '27',
                        'teacher_user_id' => '10',
                        'desc_match' => '3',
                        'teach_result' => '3',
                        'service_attitude' => '3',
                        'face_type' => '3',
                        'fr' => '1',
                        'display_name' => '徐俊山',
                        'info' => '评论内容01',
                        'pid' => '0',
                        'create_time' => '2014-09-03 10:55:22',
                        'update_time' => '2014-09-03 10:55:22',
                        'lesson_way' => 'teacher',
                        'user_avatar' => 'http://img4.imgtn.bdimg.com/it/u=1171309943,4124341071&fm=21&gp=0.jpg',
                        'teacher_user_name' => '程丽娟要十二位的姓名是否截断',
                        'teacher_user_name_cut' => '程丽娟要十二...',
                        'private_domain' => '',
                        'user_name' => 'happyjlq',
                        'user_name_cut' => 'happyjlq',
                        'user_number' => 123123123,
                        'student_name' => '张小四',
                        'student_name_cut' => '张小四',
                        'course_id' => '573',
                        'course_name' => '小学二年级-语文',
                        'hours' => 4,
                        'photo_list' => array(
                            array(
                                'user_id' => 123123, //学生id
                                'storage_id' => 12312, //前端用不到
                                'title' => '图片的标题1', //图片标题
                                'create_time' => 39994, //图片创建时间
                                'url' => 'http://img.gsxservice.com/27658_61zqh1ni.jpeg',//图片url
                                'width' => 300,
                                'height' => 150
                            ),
                            array(
                                'user_id' => 123123, //学生id
                                'storage_id' => 12312, //前端用不到
                                'title' => '图片的标题1', //图片标题
                                'create_time' => 39994, //图片创建时间
                                'url' => 'http://img.gsxservice.com/1251_scwyj6zr.jpeg',//图片url
                                'width' => 480,
                                'height' => 640
                            ),
                            array(
                                'user_id' => 123123, //学生id
                                'storage_id' => 12312, //前端用不到
                                'title' => '图片的标题1', //图片标题
                                'create_time' => 39994, //图片创建时间
                                'url' => 'http://img.gsxservice.com/29650_v8ag661z.jpeg',//图片url
                                'width' => 768,
                                'height' => 1024
                            )
                        ),
                        'thumb_flag' => 1,
                        'thumb_up' => "0"
                    ),
                    array(
                        'id' => '4',
                        'purchase_id' => '114082832893440',
                        'user_id' => '27',
                        'teacher_user_id' => '10',
                        'desc_match' => '3',
                        'teach_result' => '3',
                        'service_attitude' => '3',
                        'face_type' => '1',
                        'fr' => '1',
                        'display_name' => '徐俊山',
                        'info' => '评论内容02',
                        'pid' => '0',
                        'create_time' => '2014-09-03 10:55:22',
                        'update_time' => '2014-09-03 10:55:22',
                        'lesson_way' => 'teacher',
                        'user_avatar' => 'http://img4.imgtn.bdimg.com/it/u=1171309943,4124341071&fm=21&gp=0.jpg',
                        'teacher_user_name' => '程丽娟要十二位的姓名是否截断',
                        'teacher_user_name_cut' => '程丽娟要十二...',
                        'private_domain' => '',
                        'user_name' => 'happyjlq',
                        'user_name_cut' => 'happyjlq',
                        'user_number' => 123123123,
                        'student_name' => '张小四',
                        'student_name_cut' => '张小四',
                        'course_id' => '573',
                        'course_name' => '小学二年级-语文',
                        'hours' => 4,
                        'photo_list' => array(
                            array(
                                'user_id' => 123123, //学生id
                                'storage_id' => 12312, //前端用不到
                                'title' => '图片的标题1', //图片标题
                                'create_time' => 39994, //图片创建时间
                                'url' => 'http://img.gsxservice.com/27658_61zqh1ni.jpeg',//图片url
                                'width' => 300,
                                'height' => 150
                            ),
                            array(
                                'user_id' => 123123, //学生id
                                'storage_id' => 12312, //前端用不到
                                'title' => '图片的标题1', //图片标题
                                'create_time' => 39994, //图片创建时间
                                'url' => 'http://img.gsxservice.com/1251_scwyj6zr.jpeg',//图片url
                                'width' => 480,
                                'height' => 640
                            ),
                            array(
                                'user_id' => 123123, //学生id
                                'storage_id' => 12312, //前端用不到
                                'title' => '图片的标题1', //图片标题
                                'create_time' => 39994, //图片创建时间
                                'url' => 'http://img.gsxservice.com/29650_v8ag661z.jpeg',//图片url
                                'width' => 768,
                                'height' => 1024
                            )
                        ),
                        'thumb_flag' => 1,
                        'thumb_up' => "0"
                    ),
                    array(
                        'id' => '4',
                        'purchase_id' => '114082832893440',
                        'user_id' => '27',
                        'teacher_user_id' => '10',
                        'desc_match' => '3',
                        'teach_result' => '3',
                        'service_attitude' => '3',
                        'face_type' => '1',
                        'fr' => '1',
                        'display_name' => '徐俊山',
                        'info' => '评论内容',
                        'pid' => '0',
                        'create_time' => '2014-09-03 10:55:22',
                        'update_time' => '2014-09-03 10:55:22',
                        'lesson_way' => 'teacher',
                        'user_avatar' => 'http://img4.imgtn.bdimg.com/it/u=1171309943,4124341071&fm=21&gp=0.jpg',
                        'teacher_user_name' => '程丽娟要十二位的姓名是否截断',
                        'teacher_user_name_cut' => '程丽娟要十二...',
                        'private_domain' => '',
                        'user_name' => 'happyjlq',
                        'user_name_cut' => 'happyjlq',
                        'user_number' => 123123123,
                        'student_name' => 'happyjlq',
                        'student_name_cut' => 'happyjlq',
                        'course_id' => '573',
                        'course_name' => '小学二年级-语文',
                        'hours' => 4,
                        'photo_list' => array(
                            array(
                                'user_id' => 123123, //学生id
                                'storage_id' => 12312, //前端用不到
                                'title' => '图片的标题1', //图片标题
                                'create_time' => 39994, //图片创建时间
                                'url' => 'http://img.gsxservice.com/27658_61zqh1ni.jpeg',//图片url
                                'width' => 300,
                                'height' => 150
                            ),
                            array(
                                'user_id' => 123123, //学生id
                                'storage_id' => 12312, //前端用不到
                                'title' => '图片的标题1', //图片标题
                                'create_time' => 39994, //图片创建时间
                                'url' => 'http://img.gsxservice.com/1251_scwyj6zr.jpeg',//图片url
                                'width' => 480,
                                'height' => 640
                            ),
                            array(
                                'user_id' => 123123, //学生id
                                'storage_id' => 12312, //前端用不到
                                'title' => '图片的标题1', //图片标题
                                'create_time' => 39994, //图片创建时间
                                'url' => 'http://img.gsxservice.com/29650_v8ag661z.jpeg',//图片url
                                'width' => 768,
                                'height' => 1024
                            )
                        ),
                        'thumb_flag' => 1,
                        'thumb_up' => "0"
                    ),
                    array(
                        'id' => '4',
                        'purchase_id' => '114082832893440',
                        'user_id' => '27',
                        'teacher_user_id' => '10',
                        'desc_match' => '3',
                        'teach_result' => '3',
                        'service_attitude' => '3',
                        'del' => true,
                        'fr' => '2',
                        'display_name' => '徐俊山',
                        'face_type' => '2', //新增字段表示邀请评价
                        'info' => '老师讲的太好了13asd12师讲的太好了asd师讲的太好了，老师讲的太好了阿斯蒂芬老师讲的太好撒旦fwe师讲的太好了，老师讲的太好了，老师讲的太好阿斯顿发老师讲的太好了阿斯顿发讲的太好了，老师讲的太阿斯蒂芬老师讲的太好了，',
                        'pid' => '0',
                        'create_time' => '2014-09-03 10:55:22',
                        'update_time' => '2014-09-03 10:55:22',
                        'lesson_way' => 'teacher',
                        'user_avatar' => 'http://img4.imgtn.bdimg.com/it/u=1171309943,4124341071&fm=21&gp=0.jpg',
                        'teacher_user_name' => '柯景腾',
                        'teacher_user_name_cut' => '柯景腾',
                        'user_name' => 'happyjlq',
                        'user_name_cut' => 'happyjlq',
                        'user_number' => 123123123,
                        'student_name' => '张小四',
                        'student_name_cut' => '张小四',
                        'course_id' => '573',
                        'course_name' => '小学二年级-语文',
                        'course_type' => 2,
                        'hours' => 4,
                        'thumb_up' => 10,
                        'thumb_flag' => 1,
                        'photo_list' => array(
                            array(
                                'user_id' => 123123, //学生id
                                'storage_id' => 12312, //前端用不到
                                'title' => '图片的标题1', //图片标题
                                'create_time' => 39994, //图片创建时间
                                'url' => 'http://img.gsxservice.com/27658_61zqh1ni.jpeg',//图片url
                                'width' => 1500,
                                'height' => 300
                            ),
                            array(
                                'user_id' => 123123, //学生id
                                'storage_id' => 12312, //前端用不到
                                'title' => '图片的标题2', //图片标题
                                'create_time' => 39994, //图片创建时间
                                'url' => 'http://img.gsxservice.com/1251_scwyj6zr.jpeg',//图片url
                                'width' => 480,
                                'height' => 640
                            ),
                            array(
                                'user_id' => 123123, //学生id
                                'storage_id' => 12312, //前端用不到
                                'title' => '图片的标题3', //图片标题
                                'create_time' => 39994, //图片创建时间
                                'url' => 'http://img.gsxservice.com/29650_v8ag661z.jpeg',//图片url
                                'width' => 768,
                                'height' => 1024
                            ),
                            array(
                                'user_id' => 123123, //学生id
                                'storage_id' => 12312, //前端用不到
                                'title' => '图片的标题4', //图片标题
                                'create_time' => 39994, //图片创建时间
                                'url' => 'http://img.gsxservice.com/27658_61zqh1ni.jpeg',//图片url
                                'width' => 300,
                                'height' => 150
                            ),
                            array(
                                'user_id' => 123123, //学生id
                                'storage_id' => 12312, //前端用不到
                                'title' => '图片的标题5', //图片标题
                                'create_time' => 39994, //图片创建时间
                                'url' => 'http://img.gsxservice.com/1251_scwyj6zr.jpeg',//图片url
                                'width' => 480,
                                'height' => 640
                            ),
                        ),
                        'thumb_flag' => 1,
                        'thumb_up' => "0"
                    ),
                    array(
                        'id' => '4',
                        'purchase_id' => '114082832893440',
                        'user_id' => '27',
                        'teacher_user_id' => '10',
                        'desc_match' => '3',
                        'teach_result' => '3',
                        'service_attitude' => '3',
                        'face_type' => '1',
                        'info' => '评论内容',
                        'pid' => '0',
                        'fr' => 2,
                        'display_name' => '徐俊山',
                        'create_time' => '2014-09-03 10:55:22',
                        'update_time' => '2014-09-03 10:55:22',
                        'lesson_way' => 'teacher',
                        'user_avatar' => 'http://img4.imgtn.bdimg.com/it/u=1171309943,4124341071&fm=21&gp=0.jpg',
                        'teacher_user_name' => '程丽娟要十二位的姓名是否截断',
                        'teacher_user_name_cut' => '程丽娟要十二...',
                        'user_name' => 'happyjlq',
                        'user_name_cut' => 'happyjlq',
                        'user_number' => 123123123,
                        'student_name' => 'happyjlq',
                        'student_name_cut' => 'happyjlq',
                        'course_id' => '573',
                        'course_name' => '小学二年级-语文',
                        'hours' => 4,
                        'thumb_up' => 10,
                        'thumb_flag' => 1,
                        'photo_list' => array(
                            array(
                                'user_id' => 123123, //学生id
                                'storage_id' => 12312, //前端用不到
                                'title' => '图片的标题1', //图片标题
                                'create_time' => 39994, //图片创建时间
                                'url' => 'http://img.gsxservice.com/27658_61zqh1ni.jpeg',//图片url
                                'width' => 300,
                                'height' => 150
                            ),
                            array(
                                'user_id' => 123123, //学生id
                                'storage_id' => 12312, //前端用不到
                                'title' => '图片的标题1', //图片标题
                                'create_time' => 39994, //图片创建时间
                                'url' => 'http://img.gsxservice.com/1251_scwyj6zr.jpeg',//图片url
                                'width' => 480,
                                'height' => 640
                            ),
                            array(
                                'user_id' => 123123, //学生id
                                'storage_id' => 12312, //前端用不到
                                'title' => '图片的标题1', //图片标题
                                'create_time' => 39994, //图片创建时间
                                'url' => 'http://img.gsxservice.com/29650_v8ag661z.jpeg',//图片url
                                'width' => 768,
                                'height' => 1024
                            )
                        ),
                        'thumb_flag' => 0,
                        'thumb_up' => "0"
                    ),
                    array(
                        'id' => '4',
                        'purchase_id' => '114082832893440',
                        'user_id' => '27',
                        'teacher_user_id' => '10',
                        'desc_match' => '3',
                        'teach_result' => '3',
                        'service_attitude' => '3',
                        'face_type' => '3',
                        'fr' => '1',
                        'display_name' => '徐俊山',
                        'info' => '评论内容',
                        'pid' => '0',
                        'create_time' => '2014-09-03 10:55:22',
                        'update_time' => '2014-09-03 10:55:22',
                        'lesson_way' => 'teacher',
                        'user_avatar' => 'http://img4.imgtn.bdimg.com/it/u=1171309943,4124341071&fm=21&gp=0.jpg',
                        'teacher_user_name' => '程丽娟要十二位的姓名是否截断',
                        'teacher_user_name_cut' => '程丽娟要十二...',
                        'user_name' => 'happyjlq',
                        'user_name_cut' => 'happyjlq',
                        'user_number' => 123123123,
                        'student_name' => '张小四',
                        'student_name_cut' => '张小四',
                        'course_id' => '573',
                        'course_name' => '小学二年级-语文',
                        'hours' => 4,
                        'thumb_up' => 10,
                        'thumb_flag' => 1,
                        'photo_list' => array(
                            array(
                                'user_id' => 123123, //学生id
                                'storage_id' => 12312, //前端用不到
                                'title' => '图片的标题1', //图片标题
                                'create_time' => 39994, //图片创建时间
                                'url' => 'http://img.gsxservice.com/27658_61zqh1ni.jpeg',//图片url
                                'width' => 300,
                                'height' => 150
                            ),
                            array(
                                'user_id' => 123123, //学生id
                                'storage_id' => 12312, //前端用不到
                                'title' => '图片的标题1', //图片标题
                                'create_time' => 39994, //图片创建时间
                                'url' => 'http://img.gsxservice.com/1251_scwyj6zr.jpeg',//图片url
                                'width' => 480,
                                'height' => 640
                            ),
                            array(
                                'user_id' => 123123, //学生id
                                'storage_id' => 12312, //前端用不到
                                'title' => '图片的标题1', //图片标题
                                'create_time' => 39994, //图片创建时间
                                'url' => 'http://img.gsxservice.com/29650_v8ag661z.jpeg',//图片url
                                'width' => 768,
                                'height' => 1024
                            )
                        ),
                        'thumb_flag' => 1,
                        'thumb_up' => "0"
                    ),
                    array(
                        'id' => '4',
                        'purchase_id' => '114082832893440',
                        'user_id' => '27',
                        'teacher_user_id' => '10',
                        'desc_match' => '3',
                        'teach_result' => '3',
                        'service_attitude' => '3',
                        'face_type' => '1',
                        'fr' => '1',
                        'display_name' => '徐俊山',
                        'info' => '评论内容',
                        'pid' => '0',
                        'create_time' => '2014-09-03 10:55:22',
                        'update_time' => '2014-09-03 10:55:22',
                        'lesson_way' => 'teacher',
                        'user_avatar' => 'http://img4.imgtn.bdimg.com/it/u=1171309943,4124341071&fm=21&gp=0.jpg',
                        'teacher_user_name' => '程丽娟要十二位的姓名是否截断',
                        'teacher_user_name_cut' => '程丽娟要十二...',
                        'user_name' => 'happyjlq',
                        'user_name_cut' => 'happyjlq',
                        'user_number' => 123123123,
                        'student_name' => '张小四',
                        'student_name_cut' => '张小四',
                        'course_id' => '573',
                        'course_name' => '小学二年级-语文',
                        'hours' => 4,
                        'thumb_up' => 10,
                        'thumb_flag' => 1,
                        'photo_list' => array(
                            array(
                                'user_id' => 123123, //学生id
                                'storage_id' => 12312, //前端用不到
                                'title' => '图片的标题1', //图片标题
                                'create_time' => 39994, //图片创建时间
                                'url' => 'http://img.gsxservice.com/27658_61zqh1ni.jpeg',//图片url
                                'width' => 300,
                                'height' => 150
                            ),
                            array(
                                'user_id' => 123123, //学生id
                                'storage_id' => 12312, //前端用不到
                                'title' => '图片的标题1', //图片标题
                                'create_time' => 39994, //图片创建时间
                                'url' => 'http://img.gsxservice.com/1251_scwyj6zr.jpeg',//图片url
                                'width' => 480,
                                'height' => 640
                            ),
                            array(
                                'user_id' => 123123, //学生id
                                'storage_id' => 12312, //前端用不到
                                'title' => '图片的标题1', //图片标题
                                'create_time' => 39994, //图片创建时间
                                'url' => 'http://img.gsxservice.com/29650_v8ag661z.jpeg',//图片url
                                'width' => 768,
                                'height' => 1024
                            )
                        ),
                        'thumb_flag' => 1,
                        'thumb_up' => "0"
                    ),
                    array(
                        'id' => '4',
                        'purchase_id' => '114082832893440',
                        'user_id' => '27',
                        'teacher_user_id' => '10',
                        'desc_match' => '3',
                        'teach_result' => '3',
                        'service_attitude' => '3',
                        'face_type' => '1',
                        'fr' => '1',
                        'display_name' => '徐俊山',
                        'info' => '评论内容',
                        'pid' => '0',
                        'create_time' => '2014-09-03 10:55:22',
                        'update_time' => '2014-09-03 10:55:22',
                        'lesson_way' => 'teacher',
                        'user_avatar' => 'http://img4.imgtn.bdimg.com/it/u=1171309943,4124341071&fm=21&gp=0.jpg',
                        'teacher_user_name' => '程丽娟要十二位的姓名是否截断',
                        'teacher_user_name_cut' => '程丽娟要十二...',
                        'user_name' => 'happyjlq',
                        'user_name_cut' => 'happyjlq',
                        'user_number' => 123123123,
                        'student_name' => 'happyjlq',
                        'student_name_cut' => 'happyjlq',
                        'course_id' => '573',
                        'course_name' => '小学二年级-语文',
                        'hours' => 4,
                        'thumb_up' => 122,
                        'thumb_flag' => 2,
                        'photo_list' => array(
                            array(
                                'user_id' => 123123, //学生id
                                'storage_id' => 12312, //前端用不到
                                'title' => '图片的标题1', //图片标题
                                'create_time' => 39994, //图片创建时间
                                'url' => 'http://img.gsxservice.com/27658_61zqh1ni.jpeg',//图片url
                                'width' => 300,
                                'height' => 150
                            ),
                            array(
                                'user_id' => 123123, //学生id
                                'storage_id' => 12312, //前端用不到
                                'title' => '图片的标题1', //图片标题
                                'create_time' => 39994, //图片创建时间
                                'url' => 'http://img.gsxservice.com/1251_scwyj6zr.jpeg',//图片url
                                'width' => 480,
                                'height' => 640
                            ),
                            array(
                                'user_id' => 123123, //学生id
                                'storage_id' => 12312, //前端用不到
                                'title' => '图片的标题1', //图片标题
                                'create_time' => 39994, //图片创建时间
                                'url' => 'http://img.gsxservice.com/29650_v8ag661z.jpeg',//图片url
                                'width' => 768,
                                'height' => 1024
                            )
                        ),
                        'thumb_flag' => 1,
                        'thumb_up' => "0"
                    )

                ),
                "total" => 110
            ),
            "comment_nav" => array(
                "score" => array(
                    'total'=>10,
                    'total_score'=>12,
                    'score'=>4, //新增字段 表示总评分
                    'thump_up' => 123, //新增字段 点赞数
                    'desc_match'=>0.3,
                    'service_attitude'=>7.3,
                    'teach_result'=> 6.34,
                    'face_type'=> array(
                        'lower'=> 12,
                        'middle' => 12,
                        'great' => 21
                    ),
                    'comment_type'=> array(
                        'all' => 0,
                        'order' => 20,
                        'invite' => 10,
                        'class_group' => 12,
                    )
                ),
                "face_type" => 1,
                "comment_type" => 0,
                "comment_total" => 110
            ),
            "comment_overview" => array(
                "score" => array(
                    'total'=>10,
                    'total_score'=>12,
                    'score'=>4, //新增字段 表示总评分
                    'thump_up' => 123, //新增字段 点赞数
                    'desc_match'=>0.3,
                    'service_attitude'=>7.3,
                    'teach_result'=> 6.34,
                    'face_type'=> array(
                        'lower'=> 12,
                        'middle' => 12,
                        'great' => 21
                    ),
                    'comment_type'=> array(
                        'all' => 1231,
                        'order' => 20,
                        'invite' => 10,
                        'class_group' => 12,
                    )
                ),
                "user_diff" => 1
            ),
            "comment_data" => array(
                "additional" => array(
                    "desc_match" => "4.9",
                    "service_attitude" => "4.9",
                    "teach_result" => "4.9",
                    "average" => "4.9",
                    "user_total_number" => "12",
                    "face_type" => array(
                        "total" => 36,
                        "lower" => 8,
                        "great" => 24,
                        "middle" => 4,
                        "has_photo" => 9
                    ),
                    "user_diff" => 1,
                    "comment_nav" => array(
                        "face_type" => 0,
                        "comment_type" => 0,
                        "sort_by" => "display_order"
                    ),
                    "comment_type" => array(
                        "total" => array(
                            "value" => 0,
                            "name" => "全部评价",
                            "total_count" => 36
                        ),
                        "normal" => array(
                            "value" => 1,
                            "name" => "一对一评价",
                            "total_count" => 18
                        ),
                        "class" => array(
                            "value" => 3,
                            "name" => "班课评价",
                            "total_count" => 17
                        ),
                        "invite" => array(
                            "value" => 2,
                            "name" => "邀请评价",
                            "total_count" => 1
                        )
                    ),
                    "comment_tag" => array(
                        array(
                            "value" => "classify_1",
                            "name" => "自定义1",
                            "selected" => false,
                            "sys" => true,
                            "type" => 1
                        ),
                        array(
                            "value" => "classify_2",
                            "name" => "自定义2",
                            "selected" => false,
                            "sys" => true,
                            "type" => 2
                        )
                    )
                ),
                "comment_list" => array(
                    array(
                        "user_id" => "341932",
                        "desc_match" => "5.0",
                        "teach_result" => "5.0",
                        "service_attitude" => "5.0",
                        "face_type" => "1",
                        "info" => "按住Ctrl可同时选择多张图片，最多可上传5张照片\n\n按住Ctrl可同时选择多张图片，最多可上传5张照片\n\n按住Ctrl可同时选择多张图片，最多可上传5张照片\n\n按住Ctrl可同时选择多张图片，最多可上传5张照片\n\n按住Ctrl可同时选择多张图片，最多可上传5张照片\n\n按住Ctrl可同时选择多张图片，最多可上传5张照片",
                        "create_time" => "2015-05-09 20:34",
                        "fr" => "0",
                        "course_type" => "1",
                        "course_number" => "0",
                        "thumb_up" => "0",
                        "has_photo" => "0",
                        "display_title" => "总课程",
                        "anonymous" => "0",
                        "teacher_user_number" => "833131468",
                        "private_domain" => "zhouwei",
                        "comment_id" => "37402",
                        "has_thumb_up" => false,
                        "comprehensive_score" => "5",
                        "course" => array(
                            "course_name" => "卡拉OK-11",
                            "hours" => "1.0",
                            "lesson_way" => "4",
                            "real_student" => "zw",
                            "lesson_way_name" => "学生上门",
                            "teacher_url" => "http://www.test.genshuixue.com/zhouwei",
                            "course_number" => "0",
                            "course_url" => "",
                            "teacher_name" => "周伟"
                        ),
                        "user" => array(
                            "display_name" => "zw",
                            "avatar_url" => "http://test-img.gsxservice.com/81_xvle7ck2.jpeg",
                            "number" => "832476118",
                            "url" => "http://zhouwei-m.test.genshuixue.com/x/832476118"
                        ),
                        "photo_list" => array(),
                        "is_my_comment" => true,
                        "if_can_addition" => false,
                        "if_can_review" => true,
                        "additional" => array(
                            "teacher" => array(
                                "teacher_comment_id" => "37402",
                                "info" => "‘很棒的学生!’",
                                "type" => "2",
                                "create_time" => "2015-11-10 15:33:26"
                            )
                        )
                    ),
                    array(
                        "user_id" => "341932",
                        "desc_match" => "5.0",
                        "teach_result" => "5.0",
                        "service_attitude" => "5.0",
                        "face_type" => "1",
                        "info" => "按住Ctrl可同时选择多张图片，最多可上传5张照片\n\n按住Ctrl可同时选择多张图片，最多可上传5张照片\n\n按住Ctrl可同时选择多张图片，最多可上传5张照片\n\n按住Ctrl可同时选择多张图片，最多可上传5张照片\n\n按住Ctrl可同时选择多张图片，最多可上传5张照片\n\n按住Ctrl可同时选择多张图片，最多可上传5张照片",
                        "create_time" => "2015-05-09 20:34",
                        "fr" => "0",
                        "course_type" => "1",
                        "course_number" => "0",
                        "thumb_up" => "0",
                        "has_photo" => "0",
                        "display_title" => "总课程",
                        "anonymous" => "0",
                        "teacher_user_number" => "833131468",
                        "private_domain" => "zhouwei",
                        "comment_id" => "37402",
                        "has_thumb_up" => false,
                        "comprehensive_score" => "5",
                        "course" => array(
                            "course_name" => "卡拉OK-11",
                            "hours" => "1.0",
                            "lesson_way" => "4",
                            "real_student" => "zw",
                            "lesson_way_name" => "学生上门",
                            "teacher_url" => "http://www.test.genshuixue.com/zhouwei",
                            "course_number" => "0",
                            "course_url" => "",
                            "teacher_name" => "周伟"
                        ),
                        "user" => array(
                            "display_name" => "zw",
                            "avatar_url" => "http://test-img.gsxservice.com/81_xvle7ck2.jpeg",
                            "number" => "832476118",
                            "url" => "http://zhouwei-m.test.genshuixue.com/x/832476118"
                        ),
                        "photo_list" => array(),
                        "is_my_comment" => true,
                        "if_can_addition" => false,
                        "if_can_review" => false,
                        "additional" => array(
                            "teacher" => array(
                                "teacher_comment_id" => "37402",
                                "info" => "‘很棒的学生!’",
                                "type" => "2",
                                "create_time" => "2015-11-10 15:33:26"
                            )
                        )
                    ),
                    array(
                        "user_id" => "341932",
                        "desc_match" => "5.0",
                        "teach_result" => "5.0",
                        "service_attitude" => "5.0",
                        "face_type" => "1",
                        "info" => "按住Ctrl可同时选择多张图片，最多可上传5张照片\n\n按住Ctrl可同时选择多张图片，最多可上传5张照片\n\n按住Ctrl可同时选择多张图片，最多可上传5张照片\n\n按住Ctrl可同时选择多张图片，最多可上传5张照片\n\n按住Ctrl可同时选择多张图片，最多可上传5张照片\n\n按住Ctrl可同时选择多张图片，最多可上传5张照片",
                        "create_time" => "2015-05-09 20:34",
                        "fr" => "0",
                        "course_type" => "1",
                        "course_number" => "0",
                        "thumb_up" => "0",
                        "has_photo" => "0",
                        "display_title" => "总课程",
                        "anonymous" => "0",
                        "teacher_user_number" => "833131468",
                        "private_domain" => "zhouwei",
                        "comment_id" => "37402",
                        "has_thumb_up" => false,
                        "comprehensive_score" => "5",
                        "course" => array(
                            "course_name" => "卡拉OK-11",
                            "hours" => "1.0",
                            "lesson_way" => "4",
                            "real_student" => "zw",
                            "lesson_way_name" => "学生上门",
                            "teacher_url" => "http://www.test.genshuixue.com/zhouwei",
                            "course_number" => "0",
                            "course_url" => "",
                            "teacher_name" => "周伟"
                        ),
                        "user" => array(
                            "display_name" => "zw",
                            "avatar_url" => "http://test-img.gsxservice.com/81_xvle7ck2.jpeg",
                            "number" => "832476118",
                            "url" => "http://zhouwei-m.test.genshuixue.com/x/832476118"
                        ),
                        "photo_list" => array(),
                        "is_my_comment" => true,
                        "if_can_addition" => false,
                        "if_can_review" => false,
                        "additional" => array(
                            "teacher" => array(
                                "teacher_comment_id" => "37402",
                                "info" => "‘很棒的学生!’",
                                "type" => "2",
                                "create_time" => "2015-11-10 15:33:26"
                            )
                        )
                    ),
                    array(
                        "user_id" => "341932",
                        "desc_match" => "5.0",
                        "teach_result" => "5.0",
                        "service_attitude" => "5.0",
                        "face_type" => "1",
                        "info" => "按住Ctrl可同时选择多张图片，最多可上传5张照片\n\n按住Ctrl可同时选择多张图片，最多可上传5张照片\n\n按住Ctrl可同时选择多张图片，最多可上传5张照片\n\n按住Ctrl可同时选择多张图片，最多可上传5张照片\n\n按住Ctrl可同时选择多张图片，最多可上传5张照片\n\n按住Ctrl可同时选择多张图片，最多可上传5张照片",
                        "create_time" => "2015-05-09 20:34",
                        "fr" => "0",
                        "course_type" => "1",
                        "course_number" => "0",
                        "thumb_up" => "0",
                        "has_photo" => "0",
                        "display_title" => "总课程",
                        "anonymous" => "0",
                        "teacher_user_number" => "833131468",
                        "private_domain" => "zhouwei",
                        "comment_id" => "37402",
                        "has_thumb_up" => false,
                        "comprehensive_score" => "5",
                        "course" => array(
                            "course_name" => "卡拉OK-11",
                            "hours" => "1.0",
                            "lesson_way" => "4",
                            "real_student" => "zw",
                            "lesson_way_name" => "学生上门",
                            "teacher_url" => "http://www.test.genshuixue.com/zhouwei",
                            "course_number" => "0",
                            "course_url" => "",
                            "teacher_name" => "周伟"
                        ),
                        "user" => array(
                            "display_name" => "zw",
                            "avatar_url" => "http://test-img.gsxservice.com/81_xvle7ck2.jpeg",
                            "number" => "832476118",
                            "url" => "http://zhouwei-m.test.genshuixue.com/x/832476118"
                        ),
                        "photo_list" => array(),
                        "is_my_comment" => true,
                        "if_can_addition" => false,
                        "if_can_review" => false,
                        "additional" => array(
                            "teacher" => array(
                                "teacher_comment_id" => "37402",
                                "info" => "‘很棒的学生!’",
                                "type" => "2",
                                "create_time" => "2015-11-10 15:33:26"
                            )
                        )
                    )
                ),
                'pager' => array(
                    'count' => 40,
                    'page' => 3 ,
                    'page_size' => 10
                )
            ),
        )
    )
);

