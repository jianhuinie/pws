<?php


require("../bootstrap.php");

render(

    "teacherCenter/skin301/course",
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
                    array(
                        "name" => "星座-居家风水-星座-居家风水星座-居家风水",
                        "path" => array(
                            array(
                                "id" => "878",
                                "name" => "兴趣",
                                "level" => "1",
                                "subnodes" => "12",
                                "display_order" => "509",
                                "hidden" => "0",
                                "parent_id" => "0",
                                "remark_name" => "兴趣",
                                "subject_type" => "0",
                                "verify_status" => "1",
                                "tag" => "中小学",
                                "image" => null,
                                "teacher_count" => "1"
                            ),
                            array(
                                "id" => "889",
                                "name" => "星座",
                                "level" => "2",
                                "subnodes" => "1",
                                "display_order" => "1",
                                "hidden" => "0",
                                "parent_id" => "878",
                                "remark_name" => "星座",
                                "subject_type" => "0",
                                "verify_status" => "1",
                                "tag" => null,
                                "image" => "http://img.gsxservice.com/87536_eynpcp95.png",
                                "teacher_count" => "1"
                            ),
                            array(
                                "id" => "890",
                                "name" => "星座",
                                "level" => "3",
                                "subnodes" => "0",
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
                            "teacher" => "121",
                            "student" => "123",
                            "discuss" => null,
                            "online" => "1000"
                        )
                    ),
                    array(
                        "name" => "摸金校尉搬山卸岭",
                        "path" => array(
                            array(
                                "id" => "878",
                                "name" => "兴趣",
                                "level" => "1",
                                "subnodes" => "12",
                                "display_order" => "509",
                                "hidden" => "0",
                                "parent_id" => "0",
                                "remark_name" => "兴趣",
                                "subject_type" => "0",
                                "verify_status" => "1",
                                "tag" => "中小学",
                                "image" => null,
                                "teacher_count" => "1"
                            ),
                            array(
                                "id" => "889",
                                "name" => "星座",
                                "level" => "2",
                                "subnodes" => "1",
                                "display_order" => "1",
                                "hidden" => "0",
                                "parent_id" => "878",
                                "remark_name" => "星座",
                                "subject_type" => "0",
                                "verify_status" => "1",
                                "tag" => null,
                                "image" => "http://img.gsxservice.com/87536_eynpcp95.png",
                                "teacher_count" => "1"
                            ),
                            array(
                                "id" => "890",
                                "name" => "星座",
                                "level" => "3",
                                "subnodes" => "0",
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
                            "teacher" => null,
                            "student" => null,
                            "discuss" => null,
                            "online" => "1000"
                        )
                    ),
                    array(
                        "name" => "奇门遁甲-风水秘术",
                        "path" => array(
                            array(
                                "id" => "878",
                                "name" => "兴趣",
                                "level" => "1",
                                "subnodes" => "12",
                                "display_order" => "509",
                                "hidden" => "0",
                                "parent_id" => "0",
                                "remark_name" => "兴趣",
                                "subject_type" => "0",
                                "verify_status" => "1",
                                "tag" => "中小学",
                                "image" => null,
                                "teacher_count" => "1"
                            ),
                            array(
                                "id" => "889",
                                "name" => "星座",
                                "level" => "2",
                                "subnodes" => "1",
                                "display_order" => "1",
                                "hidden" => "0",
                                "parent_id" => "878",
                                "remark_name" => "星座",
                                "subject_type" => "0",
                                "verify_status" => "1",
                                "tag" => null,
                                "image" => "http://img.gsxservice.com/87536_eynpcp95.png",
                                "teacher_count" => "1"
                            ),
                            array(
                                "id" => "890",
                                "name" => "星座",
                                "level" => "3",
                                "subnodes" => "0",
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
                            "teacher" => "2370",
                            "student" => null,
                            "discuss" => null,
                            "online" => "870"
                        )
                    ),
                    array(
                        "name" => "星座-居家风水",
                        "path" => array(
                            array(
                                "id" => "878",
                                "name" => "兴趣",
                                "level" => "1",
                                "subnodes" => "12",
                                "display_order" => "509",
                                "hidden" => "0",
                                "parent_id" => "0",
                                "remark_name" => "兴趣",
                                "subject_type" => "0",
                                "verify_status" => "1",
                                "tag" => "中小学",
                                "image" => null,
                                "teacher_count" => "1"
                            ),
                            array(
                                "id" => "889",
                                "name" => "星座",
                                "level" => "2",
                                "subnodes" => "1",
                                "display_order" => "1",
                                "hidden" => "0",
                                "parent_id" => "878",
                                "remark_name" => "星座",
                                "subject_type" => "0",
                                "verify_status" => "1",
                                "tag" => null,
                                "image" => "http://img.gsxservice.com/87536_eynpcp95.png",
                                "teacher_count" => "1"
                            ),
                            array(
                                "id" => "890",
                                "name" => "星座",
                                "level" => "3",
                                "subnodes" => "0",
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
            "title" => "北京 徐梅山-星座-居家风水-找好老师，上跟谁学",
            "description" => "【找好老师，上跟谁学】因为专业所以权威，深入浅出、简单易懂、化繁为简、结合实际、实例分析，教授科目：星座-居家风水",
            "keywords" => "北京 徐梅山-星座",
            "comment_data" => array(
                "comment_list" => array(
                    array(
                        "user_id" => "342408",
                        "desc_match" => "5.0",
                        "teach_result" => "5.0",
                        "service_attitude" => "5.0",
                        "face_type" => "1",
                        "info" => "哈哈哈",
                        "create_time" => "2015-12-26 17:57",
                        "fr" => "0",
                        "course_type" => "2",
                        "course_number" => "151117482200",
                        "thumb_up" => "0",
                        "has_photo" => "0",
                        "display_title" => "课节159-40",
                        "anonymous" => "1",
                        "comment_num" => "2",
                        "teacher_user_number" => "835507158",
                        "private_domain" => "835507158",
                        "comment_id" => "39167",
                        "has_thumb_up" => false,
                        "comprehensive_score" => "5",
                        "course" => array(
                            "course_name" => "不仅仅",
                            "hours" => "60.5",
                            "lesson_way" => "2",
                            "real_student" => "默默地",
                            "lesson_way_name" => "在线授课",
                            "teacher_url" => "http://www.app.genshuixue.com/835507158",
                            "course_number" => "151117482200",
                            "course_url" => "http://test.genshuixue.com/teacher/classCourseDetail/151117482200",
                            "teacher_name" => "罗彬"
                        ),
                        "user" => array(
                            "display_name" => "匿名用户",
                            "avatar_url" => "http://img.gsxservice.com/0common/ic_anonymous_user_n.png",
                            "url" => ""
                        ),
                        "photo_list" => [],
                        "is_my_comment" => true,
                        "if_can_addition" => true,
                        "if_can_review" => true,
                        "has_more" => 0,
                        "can_open" => 1,
                        "other_comment" => array(
                            array(
                                "user_id" => "342408",
                                "desc_match" => "0.0",
                                "teach_result" => "0.0",
                                "service_attitude" => "0.0",
                                "face_type" => "1",
                                "info" => "法轮大法好",
                                "create_time" => "2016-01-19 10:53",
                                "fr" => "0",
                                "course_type" => "2",
                                "course_number" => "151117482200",
                                "thumb_up" => "0",
                                "has_photo" => "0",
                                "display_title" => "课节159-53",
                                "anonymous" => "1",
                                "teacher_user_number" => "835507158",
                                "private_domain" => "835507158",
                                "comment_id" => "39452",
                                "has_thumb_up" => false,
                                "comprehensive_score" => "0",
                                "course" => array(
                                    "course_name" => "不仅仅",
                                    "hours" => "60.5",
                                    "lesson_way" => "2",
                                    "real_student" => "默默地",
                                    "lesson_way_name" => "在线授课",
                                    "teacher_url" => "http://www.app.genshuixue.com/835507158",
                                    "course_number" => "151117482200",
                                    "course_url" => "http://test.genshuixue.com/teacher/classCourseDetail/151117482200",
                                    "teacher_name" => "罗彬"
                                ),
                                "user" => array(
                                    "display_name" => "匿名用户",
                                    "avatar_url" => "http://img.gsxservice.com/0common/ic_anonymous_user_n.png",
                                    "url" => ""
                                ),
                                "photo_list" => array(
                                    array(
                                        "title" => "1",
                                        "url" => "http://test-img.gsxservice.com/435568_oovy1nv2.jpeg",
                                        "width" => "200",
                                        "height" => "200"
                                    ),
                                    array(
                                        "title" => "2",
                                        "url" => "http://test-img.gsxservice.com/435569_m0f8unaj.jpeg",
                                        "width" => "200",
                                        "height" => "200"
                                    ),
                                    array(
                                        "title" => "3",
                                        "url" => "http://test-img.gsxservice.com/435570_dfffx0lb.jpeg",
                                        "width" => "200",
                                        "height" => "200"
                                    ),
                                    array(
                                        "title" => "4",
                                        "url" => "http://test-img.gsxservice.com/435571_j0kvly2o.jpeg",
                                        "width" => "200",
                                        "height" => "200"
                                    ),
                                    array(
                                        "title" => "5",
                                        "url" => "http://test-img.gsxservice.com/435572_2yg67j1z.jpeg",
                                        "width" => "1024",
                                        "height" => "768"
                                    )
                                ),
                                "is_my_comment" => false,
                                "if_can_addition" => false,
                                "if_can_review" => true
                            ),
                            array(
                                "user_id" => "342408",
                                "desc_match" => "0.0",
                                "teach_result" => "0.0",
                                "service_attitude" => "0.0",
                                "face_type" => "1",
                                "info" => "法轮大法好",
                                "create_time" => "2016-01-19 10:53",
                                "fr" => "0",
                                "course_type" => "2",
                                "course_number" => "151117482200",
                                "thumb_up" => "0",
                                "has_photo" => "0",
                                "display_title" => "课节159-53",
                                "anonymous" => "1",
                                "teacher_user_number" => "835507158",
                                "private_domain" => "835507158",
                                "comment_id" => "39452",
                                "has_thumb_up" => false,
                                "comprehensive_score" => "0",
                                "course" => array(
                                    "course_name" => "不仅仅",
                                    "hours" => "60.5",
                                    "lesson_way" => "2",
                                    "real_student" => "默默地",
                                    "lesson_way_name" => "在线授课",
                                    "teacher_url" => "http://www.app.genshuixue.com/835507158",
                                    "course_number" => "151117482200",
                                    "course_url" => "http://test.genshuixue.com/teacher/classCourseDetail/151117482200",
                                    "teacher_name" => "罗彬"
                                ),
                                "user" => array(
                                    "display_name" => "匿名用户",
                                    "avatar_url" => "http://img.gsxservice.com/0common/ic_anonymous_user_n.png",
                                    "url" => ""
                                ),
                                "photo_list" => [],
                                "is_my_comment" => false,
                                "if_can_addition" => false,
                                "if_can_review" => true
                            ),
                        )
                    ),
                    array(
                        "user_id" => "342408",
                        "desc_match" => "5.0",
                        "teach_result" => "5.0",
                        "service_attitude" => "5.0",
                        "face_type" => "1",
                        "info" => "哈哈哈",
                        "create_time" => "2015-12-26 17:57",
                        "fr" => "0",
                        "course_type" => "2",
                        "course_number" => "151117482200",
                        "thumb_up" => "0",
                        "has_photo" => "0",
                        "display_title" => "课节159-40",
                        "anonymous" => "1",
                        "comment_num" => "2",
                        "teacher_user_number" => "835507158",
                        "private_domain" => "835507158",
                        "comment_id" => "39167",
                        "has_thumb_up" => false,
                        "comprehensive_score" => "5",
                        "course" => array(
                            "course_name" => "不仅仅",
                            "hours" => "60.5",
                            "lesson_way" => "2",
                            "real_student" => "默默地",
                            "lesson_way_name" => "在线授课",
                            "teacher_url" => "http://www.app.genshuixue.com/835507158",
                            "course_number" => "151117482200",
                            "course_url" => "http://test.genshuixue.com/teacher/classCourseDetail/151117482200",
                            "teacher_name" => "罗彬"
                        ),
                        "user" => array(
                            "display_name" => "匿名用户",
                            "avatar_url" => "http://img.gsxservice.com/0common/ic_anonymous_user_n.png",
                            "url" => ""
                        ),
                        "photo_list" => [],
                        "is_my_comment" => true,
                        "if_can_addition" => true,
                        "if_can_review" => false,
                        "has_more" => 0,
                        "can_open" => 1,
                        "other_comment" => array(
                            array(
                                "user_id" => "342408",
                                "desc_match" => "0.0",
                                "teach_result" => "0.0",
                                "service_attitude" => "0.0",
                                "face_type" => "1",
                                "info" => "法轮大法好",
                                "create_time" => "2016-01-19 10:53",
                                "fr" => "0",
                                "course_type" => "2",
                                "course_number" => "151117482200",
                                "thumb_up" => "0",
                                "has_photo" => "0",
                                "display_title" => "课节159-53",
                                "anonymous" => "1",
                                "teacher_user_number" => "835507158",
                                "private_domain" => "835507158",
                                "comment_id" => "39452",
                                "has_thumb_up" => false,
                                "comprehensive_score" => "0",
                                "course" => array(
                                    "course_name" => "不仅仅",
                                    "hours" => "60.5",
                                    "lesson_way" => "2",
                                    "real_student" => "默默地",
                                    "lesson_way_name" => "在线授课",
                                    "teacher_url" => "http://www.app.genshuixue.com/835507158",
                                    "course_number" => "151117482200",
                                    "course_url" => "http://test.genshuixue.com/teacher/classCourseDetail/151117482200",
                                    "teacher_name" => "罗彬"
                                ),
                                "user" => array(
                                    "display_name" => "匿名用户",
                                    "avatar_url" => "http://img.gsxservice.com/0common/ic_anonymous_user_n.png",
                                    "url" => ""
                                ),
                                "photo_list" => [],
                                "is_my_comment" => false,
                                "if_can_addition" => false,
                                "if_can_review" => true,
                            )
                        )
                    ),
                    array(
                        "user_id" => "342408",
                        "desc_match" => "5.0",
                        "teach_result" => "5.0",
                        "service_attitude" => "5.0",
                        "face_type" => "1",
                        "info" => "哈哈哈",
                        "create_time" => "2015-12-26 17:57",
                        "fr" => "0",
                        "course_type" => "2",
                        "course_number" => "151117482200",
                        "thumb_up" => "0",
                        "has_photo" => "0",
                        "display_title" => "课节159-40",
                        "anonymous" => "1",
                        "comment_num" => "2",
                        "teacher_user_number" => "835507158",
                        "private_domain" => "835507158",
                        "comment_id" => "39167",
                        "has_thumb_up" => false,
                        "comprehensive_score" => "5",
                        "course" => array(
                            "course_name" => "不仅仅",
                            "hours" => "60.5",
                            "lesson_way" => "2",
                            "real_student" => "默默地",
                            "lesson_way_name" => "在线授课",
                            "teacher_url" => "http://www.app.genshuixue.com/835507158",
                            "course_number" => "151117482200",
                            "course_url" => "http://test.genshuixue.com/teacher/classCourseDetail/151117482200",
                            "teacher_name" => "罗彬"
                        ),
                        "user" => array(
                            "display_name" => "匿名用户",
                            "avatar_url" => "http://img.gsxservice.com/0common/ic_anonymous_user_n.png",
                            "url" => ""
                        ),
                        "photo_list" => [],
                        "is_my_comment" => true,
                        "if_can_addition" => true,
                        "if_can_review" => false,
                        "has_more" => 0,
                        "can_open" => 1,
                        "other_comment" => array(
                            array(
                                "user_id" => "342408",
                                "desc_match" => "0.0",
                                "teach_result" => "0.0",
                                "service_attitude" => "0.0",
                                "face_type" => "1",
                                "info" => "法轮大法好",
                                "create_time" => "2016-01-19 10:53",
                                "fr" => "0",
                                "course_type" => "2",
                                "course_number" => "151117482200",
                                "thumb_up" => "0",
                                "has_photo" => "0",
                                "display_title" => "课节159-53",
                                "anonymous" => "1",
                                "teacher_user_number" => "835507158",
                                "private_domain" => "835507158",
                                "comment_id" => "39452",
                                "has_thumb_up" => false,
                                "comprehensive_score" => "3",
                                "course" => array(
                                    "course_name" => "不仅仅",
                                    "hours" => "60.5",
                                    "lesson_way" => "2",
                                    "real_student" => "默默地",
                                    "lesson_way_name" => "在线授课",
                                    "teacher_url" => "http://www.app.genshuixue.com/835507158",
                                    "course_number" => "151117482200",
                                    "course_url" => "http://test.genshuixue.com/teacher/classCourseDetail/151117482200",
                                    "teacher_name" => "罗彬"
                                ),
                                "user" => array(
                                    "display_name" => "匿名用户",
                                    "avatar_url" => "http://img.gsxservice.com/0common/ic_anonymous_user_n.png",
                                    "url" => ""
                                ),
                                "photo_list" => [],
                                "is_my_comment" => false,
                                "if_can_addition" => false,
                                "if_can_review" => true
                            )
                        )
                    )
                ),
                "additional" => array( // 评价相关其他信息
                    "user_diff" => 0, // 是否是老师本人查看该页面
                    "desc_match" => "4.6", // 教学与描述相符
                    "service_attitude" => "4.8", // 老师的教学态度
                    "teach_result" => "4.6", // 老师的响应速度
                    "average" => "0.0", // 总平均分
                    "user_total_number" => "18", // 一共多少用户评价
                    "face_type" => array( // 各种评价数目
                        "total" => 34,
                        "lower" => 3,
                        "great" => 25,
                        "middle" => 2,
                        "has_photo" => 4
                    ),
                    "comment_type" => array(
                        "total" => array(
                            "value" => 0,
                            "name" => "全部评价",
                            "total_count" => 32
                        ),
                        "normal" => array(
                            "value" => 1,
                            "name" => "一对一评价",
                            "total_count" => 30
                        ),
                        "class" => array(
                            "value" => 3,
                            "name" => "班课评价",
                            "total_count" => 30
                        ),
                        "video" => array(
                            "value" => 4,
                            "name" => "视频课评价",
                            "total_count" => 30
                        ),
                        "invite" => array(
                            "value" => 2,
                            "name" => "邀请评价",
                            "total_count" => 30
                        )
                    ),
                    "total_score" => array(
                        "one" => 2,
                        "two" => 4,
                        "three" => 6,
                        "four" => 8,
                        "five" => 10,
                        "total" => 10,
                        "one_rate" => 0.02,
                        "two_rate" => 0.04,
                        "three_rate" => 0.06,
                        "four_rate" => 0.08,
                        "five_rate" => 0.02
                    ),
                    "invite_comment_number" => 21,
                    "default_comment_number" => 32,
                    "user_comment_number" => 42,
                    "comment_nav" => array(
                        "face_type" => 1, // 1好评 2中评 3差评
                        "comment_type" => 0, // 评价类型 0全部 1一对一 2邀请评价 3班课
                        "sort_by" => 'create_time', // 当前默认排序
                        'comment_tag' => 'classify_1', // 当前选中标签
                    ),
                    'comment_tag' => array(
                        array(
                            'value' => 'classify_1',
                            'name' => '高颜值',
                            'selected' => true,
                            'count' => 22,
                            'sys' => true, // 是不是系统标签
                            'type' => 1 // 0默认 1好词 2坏词
                        ),
                        array(
                            'value' => 'classify_2',
                            'name' => '简单易懂',
                            'selected' => false,
                            'count' => 12,
                            'sys' => true,
                            'type' => 1
                        ),
                        array(
                            'value' => 'classify_2',
                            'name' => '醍醐灌顶',
                            'selected' => false,
                            'count' => 12,
                            'sys' => true,
                            'type' => 1
                        ),
                        array(
                            'value' => 'classify_2',
                            'name' => 'so easy',
                            'selected' => false,
                            'count' => 12,
                            'sys' => true,
                            'type' => 1
                        ),
                        array(
                            'value' => 'classify_2',
                            'name' => '老师和蔼可亲',
                            'selected' => false,
                            'count' => 12,
                            'sys' => true,
                            'type' => 1
                        ),
                        array(
                            'value' => 'classify_2',
                            'name' => '肤浅',
                            'selected' => false,
                            'count' => 2,
                            'sys' => true,
                            'type' => 2
                        ),
                        array(
                            'value' => 'classify_2',
                            'name' => '无聊',
                            'selected' => false,
                            'count' => 1,
                            'sys' => true,
                            'type' => 2
                        )
                    )
                ),
                "pager" => array(
                    'count' => 110,
                    'page' => 1 ,
                    'page_size' => 10
                ),
            )
        )
    )
);
