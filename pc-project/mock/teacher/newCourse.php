<?php


require("../bootstrap.php");

render(
    //"teacherCenter/skin301/course",
    "teacher/newCourse",
    array(
        "tpl_data" => array(
            "crumb" => array(
                'host' => 'http://www.genshuixue.com/bj',
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
                "name" => "徐梅山啊",
                "name_cut" => "徐梅山啊",
                "subject_name" => "初中数学",
                "country" => null,
                "im_online_status" => 3,
                "vip_level" => 3,
                "template_level" => 3,
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
            "online" => array( // 在线直播
                "count" => 4,
                "sort_by" => 1,
                "course" => array(
                    array(
                        "detail_url" => '', // 可能为空
                        "course_type" => 2,
                        "number" => "160829978119",
                        "cover_url" => "http://img.gsxservice.com/19914928_fneur4ay.jpeg",
                        "name" => "初一数学专项长训班",
                        "discount" => array(), // 限时/额折扣
                        "tag_fenqi" => 0,
                        "arrangement" => "9月1日开课－2017年1月13日结课 共18节",
                        "course_len" => "34200",
                        "lesson_way" => "2",
                        "class_type" => "1",
                        "total_pay" => 1697,
                        "max_student" => "1830",
                        "display_status" => 5,
                        "can_chaban" => true,
                        "is_full" => false,
                        "chaban_price" => 0,
                        "realtime_price" => 0,
                        "original_price" => "200.00",
                        "price" => "0.00",
                        "verify_status" => "1",
                        "succ_pay" => "1697",
                        "fenqi" => array(
                            "tag_name" => '分期',
                        ),
                        // 未删减版
                        "id" => "226587",
                        "user_id" => "3489184",
                        "organization_number" => null,
                        "subject_id" => "164",
                        "min_student" => "1",
                        "cover" => "558567",
                        "template_m" => "green",
                        "template_pc" => "skin301",
                        "information" => "课程面向刚升学的初一学生，通过初一数学学习规划，达到掌握学习方法的学习目标。",
                        "introduction" => "<p><span style=\"font-family: 微软雅黑, &#39;Microsoft YaHei&#39;;\">本课程针对初一年级数学学不懂，学不好的同学，在刚升入初一的第一学期里，由王老师陪伴大家进行成功过度和数学的学习，帮助同学们给初中三年的学习打下一个良好的数学基础<br/></span></p><p><span style=\"font-family: 微软雅黑, &#39;Microsoft YaHei&#39;;\">【针对人群】初一年级</span></p><p><span style=\"font-family: 微软雅黑, &#39;Microsoft YaHei&#39;;\">【时 &nbsp; &nbsp; &nbsp; &nbsp;间】自9月1日起，每周五晚20：00-20：30</span></p><p><span style=\"font-family: 微软雅黑, &#39;Microsoft YaHei&#39;;\">【回放查看】<span style=\"font-family: 微软雅黑, &#39;Microsoft YaHei&#39;; color: rgb(255, 0, 0);\"> 报名后即可查看之前课程回放</span></span></p><p><span style=\"font-family: 微软雅黑, &#39;Microsoft YaHei&#39;;\">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 回放查看有效期为60天，即直播课结束后60天里可以查看回放，并缓存到手机。</span></p><p><span style=\"font-family: 微软雅黑, &#39;Microsoft YaHei&#39;;\">【学习社群】课后同学和家长可以联系助教进入王老师初中数学专属社群，随时随地与王老师进行交流沟通</span></p><p><span style=\"font-family: 微软雅黑, &#39;Microsoft YaHei&#39;;\">【针对学生地域】本课程尽可能帮助来自全国各地的同学，所以课程设计上更偏向于解题和技巧</span></p><p><span style=\"color: rgb(255, 0, 0); font-family: 微软雅黑, &#39;Microsoft YaHei&#39;;\"><strong>【注意】本课程不针对教材同步</strong></span></p>",
                        "student_desc" => null,
                        "target" => null,
                        "use_regular_addr" => "0",
                        "area_id" => "0",
                        "address" => null,
                        "offline_poi" => "116.38,39.9",
                        "user_address_id" => null,
                        "status" => "2",
                        "open_status" => "2",
                        "reason" => "",
                        "reason_text" => "",
                        "is_complete" => "1",
                        "chaban_flag" => "3",
                        "chaban_quota" => "0",
                        "chaban_price_flag" => "1",
                        "begin_time" => 1472731200,
                        "end_time" => 1484310600,
                        "create_time" => 1472458461,
                        "update_time" => 1483336503,
                        "special_time_reason" => null,
                        "retire_flag" => "0",
                        "retire_length" => "0",
                        "sort" => "74",
                        "rank" => "0",
                        "extend_status" => "0",
                        "transform" => "0",
                        "page_view" => "0",
                        "last_set_time" => null,
                        "group_id" => "223043",
                        "auto_status" => "0",
                        "auto_status_time" => "0",
                        "playback_expire_day" => "60",
                        "is_auto_incr" => "1",
                        "intro_style" => null,
                        "trial_minutes" => "30",
                        "playback_to_video" => "0",
                        "address_area" => array(
                            "province" => array(),
                            "city" => array(),
                            "area" => array(),
                            "country" => array(),
                            "full_address" => ""
                        ),
                        "in_pay" => 0,
                        "photos" => array(
                            array(
                                "id" => "558567",
                                "title" => null,
                                "url" => "http://img.gsxservice.com/19914928_fneur4ay.jpeg",
                                "width" => 480,
                                "height" => 268,
                                "storage_id" => "4209846",
                                "create_time" => 1481783714
                            )
                        ),
                        "location" => "",
                        "realtime_course_len" => 3600,
                        "can_order" => true,
                        "is_online" => true
                    )
                )
            ),
            "offline" => array( // 线下班课
                "count" => 10,
                "sort_by" => 1,
                "course" => array(
                    array(
                        "detail_url" => '', // 多半为空
                        "course_type" => 2,
                        "number" => "170103495775",
                        "cover_url" => "http://img.gsxservice.com/26789001_wdbquiri.jpeg",
                        "name" => "线上线下 瑜伽断食疗法（辟谷）～培训班",
                        "discount" => array( // 限时/额折扣
                            "start_time" => "2016-03-08 14:06:00",
                            "end_time" => "2017-10-11 14:06:00",
                            "type" => 1, // 1为限额 2为限时
                            "remain_amount" => 40, // 限额，剩余名额
                            "discount_price" => '0.03', //现价
                            "pre_price" => "83.32"//原价
                        ),
                        "tag_fenqi" => 1,
                        "fenqi" => array(
                            "tag_name" => '分期',
                        ),
                        "arrangement" => "1月24日开课 共1节",
                        "address_area" => array(
                            "province" => array(
                                "id" => "369098752",
                                "name" => "山西",
                                "display_order" => "540",
                                "level" => "1",
                                "hidden" => "0",
                                "bid" => "10",
                                "bname" => "山西省",
                                "tid" => "140000",
                                "pk" => 369098752
                            ),
                            "city" => array(
                                "id" => "369360896",
                                "name" => "太原",
                                "display_order" => "0",
                                "level" => "2",
                                "hidden" => "0",
                                "bid" => "176",
                                "bname" => "太原市",
                                "tid" => "140100",
                                "pk" => 369360896
                            ),
                            "area" => array(
                                "id" => "369362944",
                                "name" => "小店区",
                                "display_order" => "0",
                                "level" => "3",
                                "hidden" => "0",
                                "bid" => "8272",
                                "bname" => "小店区",
                                "tid" => "140105",
                                "pk" => 369362944
                            ),
                            "country" => array(),
                            "address" => "长治路89号嘉苑",
                            "location_addr" => "长治路89号嘉苑",
                            "full_address" => "山西太原小店区长治路89号嘉苑"
                        ),
                        "course_len" => "7200",
                        "total_pay" => 0,
                        "max_student" => "10",
                        "display_status" => "2",
                        "can_chaban" => false,
                        "is_full" => false,
                        "chaban_price" => null,
                        "realtime_price" => null,
                        "original_price" => "2000.00",
                        "price" => "1000.00",
                        "verify_status" => "1",
                        "succ_pay" => 0,


                        // 未删减版
                        "id" => "268141",
                        "user_id" => "2934180",
                        "organization_number" => "876987129",
                        "subject_id" => "929",
                        "lesson_way" => "4",
                        "class_type" => "1",
                        "min_student" => "1",
                        "cover" => "568736",
                        "template_m" => "orange",
                        "template_pc" => "skin201",
                        "information" => null,
                        "introduction" => null,
                        "student_desc" => null,
                        "target" => null,
                        "use_regular_addr" => "0",
                        "area_id" => "369362944",
                        "address" => "长治路89号嘉苑",
                        "offline_poi" => "112.567693,37.835618",
                        "user_address_id" => "519867",
                        "status" => "2",
                        "open_status" => "2",
                        "reason" => "",
                        "reason_text" => "",
                        "is_complete" => "1",
                        "chaban_flag" => "3",
                        "chaban_quota" => null,
                        "chaban_price_flag" => "1",
                        "begin_time" => 1485223200,
                        "end_time" => 1485230400,
                        "create_time" => 1483421200,
                        "update_time" => 1483545019,
                        "special_time_reason" => null,
                        "retire_flag" => "0",
                        "retire_length" => "0",
                        "sort" => "5",
                        "rank" => null,
                        "extend_status" => null,
                        "transform" => null,
                        "page_view" => null,
                        "last_set_time" => null,
                        "group_id" => "250084",
                        "auto_status" => "0",
                        "auto_status_time" => "0",
                        "playback_expire_day" => "10",
                        "is_auto_incr" => null,
                        "intro_style" => "blue",
                        "trial_minutes" => null,
                        "playback_to_video" => "0",
                        "begin_time_ts" => 1485223200,
                        "in_pay" => 0,
                        "photos" => array(
                            array(
                                "id" => "568736",
                                "title" => null,
                                "url" => "http://img.gsxservice.com/26789001_wdbquiri.jpeg",
                                "width" => 534,
                                "height" => 299,
                                "storage_id" => "4775754",
                                "create_time" => 1483421573
                            )
                        ),
                        "location" => "山西太原小店区长治路89号嘉苑",
                        "realtime_course_len" => null,
                    )

                )
            ),
            "video" => array( // 视频课
                "count" => 50,
                "course" => array(
                    array(
                        'number' => '15021142724',
                        'portrait' => 'http://test-img.gsxservice.com/180937_24pwd8ob.jpeg',
                        'title' => '机构老师-视频课',
                        'user_name' =>'james',
                        'introduce' => '机构老师机构老师机构老师机构老师',
                        'price' => 500,
                        'payers_count' => 35,
                        'profit' => 0,
                        "tag_fenqi" => 0,
                        "fenqi" => array(
                            "tag_name" => '分期',
                        ),
                        "expire_hours" => "1440",
                        'label_ids' => array(
                            '啥来的快放假',
                            'alsdkjf'
                        ),
                        'course_items_count' => 34, //课节数
                        'language' => 1,
                        'subjects' => array(
                            '体育',
                            '武术',
                            '跆拳道'
                        ), // 科目
                        'user_id' => '874171288',
                        'name' => '徐梅山',
                        'section_id' => '1231231',
                        "discount" => array( // 限时/额折扣
                            "start_time" => "2016-03-08 14:06:00",
                            "end_time" => "2017-10-11 14:06:00",
                            "type" => 1, // 1为限额 2为限时
                            "remain_amount" => 40, // 限额，剩余名额
                            "discount_price" => '0.03', //现价
                            "pre_price" => "83.32"//原价
                        ),
                    ),
                    array(
                        'number' => '15021142724',
                        'portrait' => 'http://test-img.gsxservice.com/180937_24pwd8ob.jpeg',
                        'title' => '机构老师-视频课',
                        'user_name' => 'james',
                        'introduce' => '机构老师机构老师机构老师机构老师',
                        'price' => 200,
                        'payers_count' => 10,
                        "tag_fenqi" => 0,
                        "expire_hours" => "1440",
                        'profit' => 0,
                        'label_ids' => array(
                            '啥来的快放假',
                            'alsdkjf'
                        ),
                        'course_items_count' => 10, //课节数
                        'language' => 5,
                        'subjects' => array(
                            '体育',
                            '武术',
                            '跆拳道'
                        ), // 科目
                        'user_id' => '874171288',
                        'name' => '徐梅山',
                        'section_id' => '1231231'
                    ),
                )
            ),
            "history" => array(
                "count" => 30,
                "course" => array(
                    array(
                        'number' => '15021142724',
                        'portrait' => 'http://test-img.gsxservice.com/180937_24pwd8ob.jpeg',
                        'title' => '机构老师-视频课',
                        'user_name' =>'james',
                        'introduce' => '机构老师机构老师机构老师机构老师',
                        'price' => 0,
                        'payers_count' => 35,
                        'course_type'=>3,
                        "tag_fenqi" => 0,
                        'profit' => 0,
                        'label_ids' => array(
                            '啥来的快放假',
                            'alsdkjf'
                        ),
                        'course_items_count' => 34, //课节数
                        'language' => 1,
                        'subjects' => array(
                            '体育',
                            '武术',
                            '跆拳道'
                        ), // 科目
                        'user_id' => '874171288',
                        'name' => '徐梅山',
                        'section_id' => '1231231'
                    ),
                    array(
                        'number' => '15021142724',
                        'portrait' => 'http://test-img.gsxservice.com/180937_24pwd8ob.jpeg',
                        'title' => '机构老师-视频课',
                        'user_name' => 'james',
                        'introduce' => '机构老师机构老师机构老师机构老师',
                        'price' => 200,
                        'course_type'=>3,
                        'payers_count' => 10,
                        "tag_fenqi" => 0,
                        'profit' => 0,
                        'label_ids' => array(
                            '啥来的快放假',
                            'alsdkjf'
                        ),
                        'course_items_count' => 10, //课节数
                        'language' => 5,
                        'subjects' => array(
                            '体育',
                            '武术',
                            '跆拳道'
                        ), // 科目
                        'user_id' => '874171288',
                        'name' => '徐梅山',
                        'section_id' => '1231231'
                    ),
                )
            ),
            "one2one" => array(
                "count" => 0,
                "course" => array(
                    "subject" => array(
                        array(
                            "name" => "大学-英语-口语-自定义",
                            "remark" => "授课思路清晰，帮助学生深入剖析出题规律，总结做题技巧，养成良好的学习习惯，从根本声的学生能力",
                            "id" => "12",
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
                        )
                    )
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
                        "video" => array(
                            "value" => 4,
                            "name" => "视频课评价",
                            "total_count" => 30
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
                            "display_name" => "小王小王小王八",
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
                        ),
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
                                "if_can_review" => true,
                                "additional" => array(
                                    "teacher" => array(
                                        "teacher_comment_id" => "37402",
                                        "info" => "‘很棒的学生!’",
                                        "type" => "2",
                                        "create_time" => "2015-11-10 15:33:26"
                                    )
                                ),
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
            "trial_course" => array(
                "type" => 5,
                "status" => 0,
                "data" => array(
                    "id" => "5309",
                    "user_id" => "3489184",
                    "user_number" => "836407828",
                    "number" => "160528545102",
                    "length" => "30",
                    "lesson_way" => "2",
                    "price_online" => "0",
                    "price_offline" => null,
                    "switch_flag" => "1",
                    "create_time" => "2016-05-28 18:31:53",
                    "update_time" => "2016-09-29 21:34:12"
                )
            ),
            "tag_id" => 2, // 当前用户选中标签
            "tag_list" => array( // 自定义标签
                array(
                    "id" => 1,
                    "name" => "推荐课程哦"
                ),
                array(
                    "id" => 2,
                    "name" => "经典课程五"
                ),
                array(
                    "id" => 3,
                    "name" => "选休课程啦"
                ),
                array(
                    "id" => 1,
                    "name" => "推荐课程哦"
                ),
                array(
                    "id" => 2,
                    "name" => "经典课程五"
                ),
                array(
                    "id" => 3,
                    "name" => "选休课程啦"
                ),
                array(
                    "id" => 1,
                    "name" => "推荐课程哦"
                ),
                array(
                    "id" => 2,
                    "name" => "经典课程五"
                ),
                array(
                    "id" => 3,
                    "name" => "选休课程啦"
                ),
            )
        )
    )
);

