<?php

require("../bootstrap.php");

render(
    "orgCourse/one2oneDetail",
    array(
        "tpl_data" => array(
            "is_staging" => 1, // 分期付款
            "staging" => array(
                "desc" => "可享3期分期付学费"
            ),
            "course_path" => array(
                "1" => array(
                    "id" => "237",
                    "name" => "中考",
                    "level" => "1",
                    "subnodes" => "15",
                    "display_order" => "503",
                    "hidden" => "0",
                    "parent_id" => "0",
                    "remark_name" => "中考",
                    "subject_type" => "0",
                    "verify_status" => "1",
                    "tag" => "初三",
                    "image" => "http://img.gsxservice.com/0app/index3/icon_category_5.png",
                    "teacher_count" => "1",
                    "is_deleted" => "2",
                    "remark" => null
                ),
                "2" => array(
                    "id" => "242",
                    "name" => "英语",
                    "level" => "2",
                    "subnodes" => "1",
                    "display_order" => "12",
                    "hidden" => "0",
                    "parent_id" => "237",
                    "remark_name" => "中考英语",
                    "subject_type" => "0",
                    "verify_status" => "1",
                    "tag" => null,
                    "image" => "http://img.gsxservice.com/88058_9c2cxsie.png",
                    "teacher_count" => "1",
                    "is_deleted" => "2",
                    "remark" => null
                ),
                "3" => array(
                    "id" => "243",
                    "name" => "英语",
                    "level" => "3",
                    "subnodes" => "0",
                    "display_order" => "1",
                    "hidden" => "0",
                    "parent_id" => "242",
                    "remark_name" => "中考英语",
                    "subject_type" => "0",
                    "verify_status" => "1",
                    "tag" => null,
                    "image" => "http://img.gsxservice.com/88016_7tntsxh6.jpeg",
                    "teacher_count" => "1",
                    "is_deleted" => "2",
                    "remark" => null
                )
            ),
            "teacher_profiles" => array(
                array(
                    "display_name" => "刘磊",
                    "number" => "563073398",
                    "private_domain" => "liuleiyangyang",
                    "order_comment_count" => 269,
                    "invite_comment_count" => 6,
                    "photo_url" => "http://img.gsxservice.com/10905282_7medsahr.jpeg",
                    "school_age" => "8",
                    "score" => "5.0", // 评分
                    "area_id" => "17043456",
                    "user_id" => "629243",
                    "vip_level" => 1,
                    "short_intro" => "专注三一口语，中小学高中英语8年一线经验",
                    "im_online_status" => 1
                )
            ),
            "organization" => array( // 机构信息
                "id" => 1,
                "score" => 5,
                "name" => "应用宝机构",
                "avatar" => '', // 头像
                'membership_level' => 4, // 机构会员等级标示 1非会员 2会员 3高级会员 4超级会员
                "im_online_status" => 1, // 非0－>online   0->offline
                "number" => "772705298",
                "course_count" => 11,
                "student_count" => 10,
                "comment_count" => 1300,
                "photo" => array(
                    "http://img.gsxservice.com/3754831_t06236di.jpeg",
                    "http://img.gsxservice.com/3754831_t06236di.jpeg",
                    "http://img.gsxservice.com/3754831_t06236di.jpeg"
                ),
                "brief" => "专业英语教学10年，专业英语最高8级",
                "is_authentication" => 1,
                "extension" =>"400-333-111",
                'city_filter' => 1, // 1西安、武汉 0其他城市 － 400试点城市
                "home_url" => "http://baidu.com"
            ),
            "course_info" => array(
                "id" => "226894",
                "buy_way" => 1, // 1按课时卖 2按期卖
                "number" =>  "160830913682",
                "code" => "abdcd",
                "textbook" => "上课教材", // 上课教材
                "class_hour" => 10,
                "class_length" => 30, //分钟为单位
                "teaching_material" => "人教版2016",
                "org_id" =>  "584731",
                "organization_number" =>  null,
                "lesson_way" => "2", // 2线上 4线下 8线上、线下
                "course_type" => "11",
                "arrangement" => "01月13日 18:30开课 01月31日 12:00结课 共14节",
                "material_info" => "课程资料",
                "verify_status" => 1,
                "total_pay" => 100,
                "status" => 2, // 3暂停招生 2正在招生
                "price" =>  "0.00",
                "comment_rate" =>  "99%",
                "lesson_type_number" =>  3,
                "address" =>  "北京市海淀区",
                "retire_flag" => "0", // 0随时可退 100不可退
                "succ_pay" => 1,
                "offline_poi" => array(
                    "lng" => "116.372542",
                    "lat" => "39.999947"
                ),
                "cover" => array(
                    "id" => "411028",
                    "title" => null,
                    "url" => "http://img.gsxservice.com/12376423_0tuxn0f8.jpeg",
                    "width" => 690,
                    "height" => 386,
                    "storage_id" => "3773143",
                    "create_time" => 1466412859
                ),
                "increment_service" => array(
                    "助教管理",
                    "助教管理",
                    "课后答疑",
                    "无限次回放",
                    "课后答疑",
                    "无限次回放",
                ),
                "try_learn_people" => "高三毕业生",
                "try_listen_explain" => "试听说明",
                "name" => "小学五年级上册英语课本讲解（人教版）",
                "info" =>"邱勇老师独创的趣味快速学习法，趣味盎然的串记单词课堂，1轻松记住了大量单词，学会音标发音，了解自然拼读；“邱老师趣味英语版”《西游记》视频让唐僧、孙悟空和如来佛等开口说英语，趣味盎然，帮助学生迅速找到学习兴奋点，发生兴趣，快速学会和牢记英语口语。还有邱老师快速震撼图文单词、口语记忆法。彩色字快速记忆英语课文。该方法同时对学生记忆语文、历史内容有极大启发和帮助",
                "introduction" => " 2016-09-1820: 00至 2016-09-1221: 00 课程内容 第一节：家长如何辅导学生英语学习，学生如何高效学习英语。学习人教版英语五年级上册：Unit1What'shelike?Part1--第一单元他长什么样子？第1部分教授形容人物外貌和性格的英语表达和记忆方法、ALet'stalk课文<br>2016-09-2120: 00至 2016-09-1421: 00 课程内容 第二节：复习第一节内容。学习人教版英语五年级上册：Unit1What'shelike?Part2--第一单元他长什么样子？第2部分教授BLet'stalk课文，Let'sspell拼写部分等 <br>2016-09-2920: 00至2016-09-1821: 00 课程内容第三节：复习第二节内容。学习人教版英语六年级上册：Unit2MyweekPart1--第二单元我的一周第1部分教授一周七天每天的英语表达和记忆方法、ALet'stalk课文",
                "create_time" => 1472542832,
                "update_time" => 1477482081,
                "display_status" => 5,
                "course_related" => array(
                    array(
                        "id" => "243",
                        "name" => "英语",
                        "level" => "3",
                        "parent_id" => "242"
                    )
                ),
                "is_preview" => false,
                "pageInnerLinks" => array()
            ),
            "other_courses" => array(
                array(
                    "number" => 123,
                    "name" => "大家都看",
                    "lesson_way" => 2,
                    "total_pay" => 123,
                    "photo_url" => "http://img.gsxservice.com/18592129_cn7ipsvx.jpeg",
                    "detail_url" => "http://baidu.com",
                    "price" => "0.00"
                ),
                array(
                    "number" => 123,
                    "name" => "大家都看",
                    "lesson_way" => 2,
                    "total_pay" => 123,
                    "photo_url" => "http://img.gsxservice.com/18592129_cn7ipsvx.jpeg",
                    "detail_url" => "http://baidu.com",
                    "price" => "0.00"
                )
            ),
            "relative_course" => array( // 其他同学还在学课程
                array(
                    "number" => 123,
                    "name" => "是就分开多久",
                    "img_url" => "http://img.gsxservice.com/18592129_cn7ipsvx.jpeg",
                    "detail_url" => "http://baidu.com"
                ),
                array(
                    "number" => 123,
                    "name" => "是就分开多久",
                    "img_url" => "http://img.gsxservice.com/18592129_cn7ipsvx.jpeg",
                    "detail_url" => "http://baidu.com"
                )
            ),
            "type_info" => array(
                array(
                    "name" =>  "高三数学基础班",
                    "number" => 123,
                    "lesson_way" => 2,
                    "buy_way" => 1, // 1按课时卖 2按期卖
                    "status" => 2, // 当前课程状态
                    "class_hour_explain" => '500元／30课时', // 课时说明
                    "code" =>  "abcdef",
                    "class_time" =>  "1月9号-3月15号",
                    "class_plan" => "每天下午2点到4点",
                    "address" =>  "北京海淀",
                    "class_hour" =>  40,
                    "price" =>  "100",
                    "detail_url" =>  "http://baidu.com",
                    "sign_up_url" => "http://baidu.com",
                    "selected" => 1
                ),
                array(
                    "name" =>  "高三数学基础班",
                    "number" => 123,
                    "lesson_way" => 2,
                    "buy_way" => 2, // 1按课时卖 2按期卖
                    "status" => 2, // 当前课程状态
                    "class_hour_explain" => '500元／30课时', // 课时说明
                    "code" =>  "abcdef",
                    "class_time" =>  "1月9号-3月15号",
                    "class_plan" => "每天下午2点到4点",
                    "address" =>  "北京海淀",
                    "class_hour" =>  40,
                    "price" =>  "100",
                    "detail_url" =>  "http://baidu.com",
                    "sign_up_url" => "http://baidu.com",
                    "selected" => 1
                ),
                array(
                    "name" =>  "高三数学基础班",
                    "number" => 123,
                    "lesson_way" => 4,
                    "buy_way" => 2, // 1按课时卖 2按期卖
                    "status" => 3, // 当前课程状态
                    "code" =>  "abcdef",
                    "class_hour_explain" => '500元／30课时', // 课时说明
                    "class_time" =>  "1月9号-3月15号",
                    "class_plan" => "每天下午2点到4点",
                    "address" =>  "北京海淀北京海淀北京海淀北京海淀北京海淀北京海淀北京海淀",
                    "class_hour" =>  40,
                    "price" =>  "100",
                    "detail_url" =>  "http://baidu.com",
                    "sign_up_url" => "http://baidu.com",
                    "selected" => 0
                )
            ),
            "crumb" => array( // 面包屑 - 城市信息
                "city" => array(
                    "id" => "17039360",
                    "name" => "北京",
                    "display_order" => "0",
                    "level" => "2",
                    "hidden" => "0",
                    "bid" => "131",
                    "bname" => "北京市",
                    "tid" => "110100"
                ),
                "host" => "http://www.genshuixue.com/bj/"
            ),
            "coupons" => array( // 优惠券
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
            "relatedcourse" => array( // 右边栏 - 相关课程
                array(
                    "name" => "“多家全国性媒体采访”&，\"数学中高\"&【全国性媒体采访】：",
                    "id" => "189266",
                    "coursenumber" => "313319304017",
                    "detail_url" => "/teacher/one2oneCourseDetail/313319304017",
                    "pic" => "http://img.gsxservice.com/0asset/img/www/10.jpg",
                    "price" => "300"
                ),
                array(
                    "name" => "初中英语-初中英语/新概念",
                    "id" => "189274",
                    "coursenumber" => "318688013137",
                    "detail_url" => "/teacher/one2oneCourseDetail/318688013137",
                    "pic" => "http://img.gsxservice.com/0asset/img/www/2.jpg",
                    "price" => "220"
                ),
                array(
                    "name" => "小升初英语-剑桥英语KET/PET等级证书考试",
                    "id" => "189275",
                    "coursenumber" => "318688018257",
                    "detail_url" => "/teacher/one2oneCourseDetail/318688018257",
                    "pic" => "http://img.gsxservice.com/0asset/img/www/7.jpg",
                    "price" => "300"
                )
            ),
        )
    )
);