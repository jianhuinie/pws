<?php


require("../bootstrap.php");

render(
    "teacher/newOne", // 非会员课程模板统一
    // "teacher/newCourse",
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
                "can_order" => true,
                "total_courses" => 4555,
                "online_count" => "45",
                "offline_count" => "25",
                "video_count" => 4,
                "usabletime_desc" => null,
                "is_recommend" => true,
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
                "count" => 120,
                "course" => array(
                    "subject" => array(
                        array(
                            "name" => "大学-英语-口语-自定义",
                            "remark" => "授课思路清晰，帮助学生深入剖析出题规律，总结做题技巧，养成良好的学习习惯，从根本声的学生能力",
                            "id" => "12",
                            "course_type" => 13, // 1一对一 13优选一对一
                            "detail_url" => "http://www.baidu.com",
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
                            "course_type" => 1, // 1一对一 13优选一对一
                            "detail_url" => "http://www.baidu.com",
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
                            "course_type" => 13, // 1一对一 13优选一对一
                            "detail_url" => "http://www.baidu.com",
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
                            "course_type" => 1, // 1一对一 13优选一对一
                            "detail_url" => "http://www.baidu.com",
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
                            "course_type" => 13, // 1一对一 13优选一对一
                            "detail_url" => "http://www.baidu.com",
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
                            "course_type" => 1, // 1一对一 13优选一对一
                            "detail_url" => "http://www.baidu.com",
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
                            "course_type" => 13, // 1一对一 13优选一对一
                            "detail_url" => "http://www.baidu.com",
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
                            "course_type" => 13, // 1一对一 13优选一对一
                            "detail_url" => "http://www.baidu.com",
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
                )
            ),
            "offline" => array(
                "count" => 1231,
                "course" => array(
                )
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
                        'all' => 1231,
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
                    "average" => "4.9",
                    "user_total_number" => "12",
                    "face_type" => array(
                        "total" => 36,
                        "lower" => 8,
                        "great" => 24,
                        "middle" => 4,
                        "has_photo" => 9
                    ),
                    "total_score" => array(
                        'one' => 2,
                        'two' => 3,
                        'three' => 5,
                        'four' => 6,
                        'five' => 2,
                        'total' => 4
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

