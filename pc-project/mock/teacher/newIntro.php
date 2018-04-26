<?php


require("../bootstrap.php");

render(
    "teacher/newIntro",
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
                "self_introduce" => "这里是老师介绍哦，老师介绍的很详细呢～",
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
            "experience" => array(
                array(
                    "start_date" => "2005-05-01",
                    "end_date" => "0000-00-00",
                    "content" => "中国易经研究会会长，著名易学理论与实践专家，著名姓名学专家，著名风水专家，乾坤风水创始人，以风水绝学名扬东南亚。中国传统文化传播有限公司董事长。中国姬派奇门遁甲正宗传人，中国易经研究会会长、学术委员会主任。",
                    "content_cut" => "中国易经研究会会长，著名易学理论与实践专家，著名姓名学专家，著名风水专家，乾坤风水创始人，以风水绝学名扬东南亚。学术委员会主任。",
                    "content_new_cut" => "中国易经研究会会长"
                ),
                array(
                    "start_date" => "2014年06月",
                    "end_date" => "2014年08月",
                    "content" => "中国易经研究会会长，著名易学理论与实践专家，著名姓名学专家，著名风水专家，乾坤风水创始人，以风水绝学名扬东南亚。中国传统文化传播有限公司董事长。中国姬派奇门遁甲正宗传人，中国易经研究会会长、学术委员会主任。",
                    "content_cut" => "中国易经研究会会长，著名易学理论与实践专家，著名姓名学专家，著名风水专家，乾坤风水创始人，以风水绝学名扬东南亚。学术委员会主任。",
                    "content_new_cut" => "中国易经研究会会长"
                ),
                array(
                    "start_date" => "2014年06月",
                    "end_date" => "2014年08月",
                    "content" => "中国易经研究会会长，著名易学理论与实践专家，著名姓名学专家，著名风水专家，乾坤风水创始人，以风水绝学名扬东南亚。中国传统文化传播有限公司董事长。中国姬派奇门遁甲正宗传人，中国易经研究会会长、学术委员会主任。",
                    "content_cut" => "中国易经研究会会长，著名易学理论与实践专家，著名姓名学专家，著名风水专家，乾坤风水创始人，以风水绝学名扬东南亚。学术委员会主任。",
                    "content_new_cut" => "中国易经研究会会长"
                )
            ),
            "success" => array(
                array(
                    "date" => "2005-05-01",
                    "title" => "乾坤风水，造福四方，桃李天下，功德无边",
                    "content" => "1、国内几十位影视娱乐界明星常年易经顾问；数十家大中型企业风水总顾问；上百名军政界神秘人士个人易经顾问；为1200多家企业做过整体风水布局和设计；为无数个家庭布局催贵催财催丁催文昌风水；学生弟子遍布世界各地。\n2、曾多次到泰国、新加坡、美国、加拿大、新西兰、台湾、马来西亚、香港、澳门、韩国和国内大多数城市讲学和考察，开办周易风水讲座，听课者累计过万人。受到热烈欢迎和高度评价。",
                    "content_cut" => "中国易经研究会会长，著名易学理论与实践专家，著名姓名学专家，著名风水专家，乾坤风水创始人，以风水绝学名扬东南亚。学术委员会主任。",
                    "content_new_cut" => "中国易经研究会会长"
                ),
                array(
                    "date" => "2005-05-01",
                    "title" => "乾坤风水，造福四方，桃李天下，功德无边",
                    "content" => "1、国内几十位影视娱乐界明星常年易经顾问；数十家大中型企业风水总顾问；上百名军政界神秘人士个人易经顾问；为1200多家企业做过整体风水布局和设计；为无数个家庭布局催贵催财催丁催文昌风水；学生弟子遍布世界各地。\n2、曾多次到泰国、新加坡、美国、加拿大、新西兰、台湾、马来西亚、香港、澳门、韩国和国内大多数城市讲学和考察，开办周易风水讲座，听课者累计过万人。受到热烈欢迎和高度评价。",
                    "content_cut" => "中国易经研究会会长，著名易学理论与实践专家，著名姓名学专家，著名风水专家，乾坤风水创始人，以风水绝学名扬东南亚。学术委员会主任。",
                    "content_new_cut" => "中国易经研究会会长"
                ),
                array(
                    "date" => "2005-05-01",
                    "title" => "乾坤风水，造福四方，桃李天下，功德无边",
                    "content" => "1、国内几十位影视娱乐界明星常年易经顾问；数十家大中型企业风水总顾问；上百名军政界神秘人士个人易经顾问；为1200多家企业做过整体风水布局和设计；为无数个家庭布局催贵催财催丁催文昌风水；学生弟子遍布世界各地。\n2、曾多次到泰国、新加坡、美国、加拿大、新西兰、台湾、马来西亚、香港、澳门、韩国和国内大多数城市讲学和考察，开办周易风水讲座，听课者累计过万人。受到热烈欢迎和高度评价。",
                    "content_cut" => "中国易经研究会会长，著名易学理论与实践专家，著名姓名学专家，著名风水专家，乾坤风水创始人，以风水绝学名扬东南亚。学术委员会主任。",
                    "content_new_cut" => "中国易经研究会会长"
                ),
                array(
                    "date" => "2005-05-01",
                    "title" => "乾坤风水，造福四方，桃李天下，功德无边",
                    "content" => "1、国内几十位影视娱乐界明星常年易经顾问；数十家大中型企业风水总顾问；上百名军政界神秘人士个人易经顾问；为1200多家企业做过整体风水布局和设计；为无数个家庭布局催贵催财催丁催文昌风水；学生弟子遍布世界各地。\n2、曾多次到泰国、新加坡、美国、加拿大、新西兰、台湾、马来西亚、香港、澳门、韩国和国内大多数城市讲学和考察，开办周易风水讲座，听课者累计过万人。受到热烈欢迎和高度评价。",
                    "content_cut" => "中国易经研究会会长，著名易学理论与实践专家，著名姓名学专家，著名风水专家，乾坤风水创始人，以风水绝学名扬东南亚。学术委员会主任。",
                    "content_new_cut" => "中国易经研究会会长"
                )
            ),
            "other" => array(
                "content" => "<p></p><p><img src=\"http://img.gsxservice.com/201398_e5t7tiyg.jpeg@740w.jpeg\" title=\"\" alt=\"T2rJGbX1laXXXXXXXX_!!1891576490.jpg\" /></p><p><img src=\"http://img.gsxservice.com/201403_a3oqpfwg.jpeg@740w.jpeg\" title=\"\" alt=\"徐梅山简介.jpg\" /></p><p><img src=\"http://img.gsxservice.com/201497_ickn6l5f.jpeg@740w.jpeg\" title=\"\" alt=\"rBEhU1MxFTEIAAAAAASOT_nmjN0AAKrZwIx4c8ABI5n837.jpg\" /></p>",
                "content_cut" => "<p></p><p><img src=\"http://img.gsxservice.com/201398_e5t7tiyg.jpeg@740w.jpeg\" title=\"\" alt=\"T2rJGbX1laXXXXXXXX_!!1891576490.jpg\" /></p><p><img src=\"http://img.gsxservice.com/201403_a3oqpfwg.jpeg@740w.jpeg\" title=\"\" alt=\"徐梅山简介.jpg\" /></p><p><img src=\"http://img.gsxservice.com/201497_ickn6l5f.jpeg@740w.jpeg\" title=\"\" alt=\"rBEhU1MxFTEIAAAAAASOT_nmjN0AAKrZwIx4c8ABI5n837.jpg\" /></p>"

                //"content" => "",
                //"content_cut" => "",
            ),
            "question" => array(),
            "audit" => null,
            "video_course" => array(
                array(
                    'number' => '15021142724',
                    'portrait' => 'http://test-img.gsxservice.com/180937_24pwd8ob.jpeg',
                    'title' => '机构老师-视频课',
                    'user_name' =>'james',
                    'introduce' => '机构老师机构老师机构老师机构老师',
                    'price' => 0,
                    'payers_count' => 35,
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
                    'payers_count' => 10,
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
                array(
                    'number' => '15021142724',
                    'portrait' => 'http://test-img.gsxservice.com/180937_24pwd8ob.jpeg',
                    'title' => '机构老师-视频课',
                    'user_name' => 'james',
                    'introduce' => '机构老师机构老师机构老师机构老师',
                    'price' => 200,
                    'payers_count' => 24,
                    'profit' => 0,
                    'label_ids' => array(
                        '啥来的快放假',
                        'alsdkjf'
                    ),
                    'course_items_count' => 13, //课节数
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
            ),
            "is_favored" => true,
            "is_preview" => false,
            "has_activity_auth" => true,
            "online_course" => array(
                array(
                    "number" => "150107543132",
                    "subject_id" => "1106",
                    "name" => "大师徐梅山为您讲解风水奥秘 周易精华",
                    "lesson_way" => "2",
                    "create_time" => 1420601160,
                    "begin_time" => 1421236800,
                    "end_time" => 1422450000,
                    "course_len" => "10800",
                    "price" => "0",
                    "class_type" => 1,
                    "photos" => array(
                        array(
                            "id" => "1419",
                            "title" => "授课中",
                            "url" => "http://img.gsxservice.com/65776_wjoqso17.jpeg",
                            "width" => "1270",
                            "height" => "696",
                            "create_time" => 1420601160,
                            "storage_id" => "51251"
                        )
                    ),
                    "max_student" => "500",
                    "address_area" => array(
                        "full_address" => ""
                    ),
                    "address" => "",
                    "location" => "",
                    "offline_poi" => array(
                        "lng" => "",
                        "lat" => ""
                    ),
                    "status" => "2",
                    "student_desc" => "风水爱好者，新置物业者，易经学爱好者，居家布置",
                    "total_pay" => 0,
                    "in_pay" => 0,
                    "succ_pay" => 0,
                    "display_status" => 2,
                    "verify_status" => "4",
                    "arrangement" => "啊掉了啊掉了啊掉了的阿斯顿发的阿斯顿发的阿斯顿发"
                ),
                array(
                    "number" => "141205542984",
                    "subject_id" => "1106",
                    "name" => "大师徐梅山为您讲解风水奥秘 周易精华",
                    "lesson_way" => "2",
                    "create_time" => 1417747819,
                    "begin_time" => 1418212800,
                    "end_time" => 1420030800,
                    "course_len" => "14400",
                    "price" => "1",
                    "class_type" => 1,
                    "photos" => array(
                        array(
                            "id" => "246",
                            "title" => "授课中",
                            "url" => "http://img.gsxservice.com/65776_wjoqso17.jpeg",
                            "width" => "1270",
                            "height" => "696",
                            "create_time" => 1417748261,
                            "storage_id" => "51251"
                        )
                    ),
                    "max_student" => "500",
                    "address_area" => array(
                        "full_address" => ""
                    ),
                    "address" => "",
                    "location" => "",
                    "offline_poi" => array(
                        "lng" => "",
                        "lat" => ""
                    ),
                    "status" => "2",
                    "student_desc" => "风水爱好者，新置物业者，易经学爱好者，居家布置",
                    "total_pay" => 8,
                    "in_pay" => 0,
                    "succ_pay" => 8,
                    "display_status" => 2,
                    "verify_status" => "3",
                    "arrangement" => "啊掉了啊掉了啊掉了的阿斯顿发的阿斯顿发的阿斯顿发"

                )
            ),
            "offline_course" => array(
                array(
                    "number" => "1311134745712",//班课number
                    "subject_id" => '383', //班课包含的subject的id
                    "name" => "水彩画创意速成课程",
                    "lesson_way" => 4, //可上课的方式4普通场地课2普通在线3在线公开课
                    "create_time" => "2013-08-03 19:27:21", //课程创建时间
                    "begin_time" => "1415860970", //课程开始时间
                    "end_time" => "1415960970", //课程结束时间
                    "course_len" => 12000,
                    "display_status" => 5,
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
                    "is_full" => true,// 是否满班,
                    "arrangement" => "啊掉了啊掉了啊掉了的阿斯顿发的阿斯顿发的阿斯顿发"

                ),
                array(
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
                    "is_full" => true,// 是否满班,
                    "arrangement" => "啊掉了啊掉了啊掉了的阿斯顿发的阿斯顿发的阿斯顿发"

                ),
            ),
            "title" => "北京 徐梅山-星座-居家风水-找好老师，上跟谁学",
            "description" => "【找好老师，上跟谁学】因为专业所以权威，深入浅出、简单易懂、化繁为简、结合实际、实例分析，教授科目：星座-居家风水",
            "keywords" => "北京 徐梅山-星座",
        )
    )
);

