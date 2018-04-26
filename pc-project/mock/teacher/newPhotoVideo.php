<?php


require("../bootstrap.php");

render(
    "teacher/newPhotoVideo",
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
            "article" => array(
                "is_self" => 1,
                "is_valid" => 1
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
            "audit" => null,
            "is_favored" => true,
            "is_preview" => false,
            "has_activity_auth" => true,
            'video_count'=>12,
            'photo_count' => 12,
            'pager'=> array(
                'count' => 1000,
                'page' => 500 ,
                'page_size' => 10
            ),
            "video_list" => array(
                array(
                    "name" => "高中英语语法技巧的问题高中英语语法技巧的问题",
                    "img" => "http://i1.letvimg.com/yunzhuanma/201409/12/101b9473a729613cb7d56d78781ac143/thumb/1_160_120.jpg",
                    "video" => "http://www.genshuixue.com/video/view/140",
                    "video_id" => 1,
                    "preface_url_prefix" => "http://img.gsxservice.com/3437299_1hqz5r28",
                    "preface_url_prefix" => "http://img.gsxservice.com/3437299_1hqz5r28.png"
                ),
                array(
                    "name" => "高中英语语法技巧的问题",
                    "img" => "http://img.gsxservice.com/149743_hixrca18.png",
                    "video" => "http://www.genshuixue.com/video/view/140",
                    "video_id" => 1,
                    "preface_url_prefix" => "http://i1.letvimg.com/yunzhuanma/201409/12/101b9473a729613cb7d56d78781ac143/thumb",
                    "preface_url" => "http://i1.letvimg.com/yunzhuanma/201409/12/101b9473a729613cb7d56d78781ac143/thumb"
                ),
                array(
                    "name" => "高中英语语法技巧的问题",
                    "img" => "http://img.genshuixue.com/2142_0p5xsq1x.jpeg",
                    "video" => "http://www.genshuixue.com/video/view/140",
                    "video_id" => 1,
                    "preface_url_prefix" => "http://i3.letvimg.com/yunzhuanma/201410/18/66a4a94ec40ae9f4eb73f4c6c6384957/thumb",
                    "preface_url_prefix" => "http://i3.letvimg.com/yunzhuanma/201410/18/66a4a94ec40ae9f4eb73f4c6c6384957/thumb"
                ),
            ),
            "photo_list" => array(
                array(
                    'id' => '38989',
                    'name' => '',
                    'img' => 'http://img.gsxservice.com/65776_wjoqso17.jpeg',
                    'width' => '720',
                    'height' => '1280',
                    'create_time' => '2015-03-04 17:28:08'
                ),
                array(
                    'id' => '38989',
                    'name' => '发生的看得见',
                    'img' => 'http://test-img.gsxservice.com/289209_8qnnhksw.png',
                    'width' => '720',
                    'height' => '1280',
                    'create_time' => '2015-03-04 17:28:08'
                ),
                array(
                    'id' => '38989',
                    'name' => '爱上地方撒的得见',
                    'img' => 'http://test-img.gsxservice.com/289209_8qnnhksw.png',
                    'width' => '720',
                    'height' => '1280',
                    'create_time' => '2015-03-04 17:28:08'
                ),
                array(
                    'id' => '38989',
                    'name' => '爱是看得见',
                    'img' => 'http://test-img.gsxservice.com/289209_8qnnhksw.png',
                    'width' => '720',
                    'height' => '1280',
                    'create_time' => '2015-03-04 17:28:08'
                ),
                array(
                    'id' => '38989',
                    'name' => '爱是看得见',
                    'img' => 'http://test-img.gsxservice.com/289209_8qnnhksw.png',
                    'width' => '720',
                    'height' => '1280',
                    'create_time' => '2015-03-04 17:28:08'
                ),
            ),
            "title" => "北京 徐梅山-星座-居家风水-找好老师，上跟谁学",
            "description" => "【找好老师，上跟谁学】因为专业所以权威，深入浅出、简单易懂、化繁为简、结合实际、实例分析，教授科目：星座-居家风水",
            "keywords" => "北京 徐梅山-星座",
        )
    )
);

