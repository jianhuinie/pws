<?php

require("../bootstrap.php");

render(
    "orgCourse/classDetail",
    array(
        "tpl_data" => array(
            "is_juhuixue" => true, // 是否是聚惠学课程
            "is_staging" => 1, // 分期付款
            "staging" => array(
                "desc" => "可享3期分期付学费"
            ),
            "course_path" => array( // 课程类别
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
            "course_related" => array( // 面包屑－相关课程
                array(
                    "id" => "243",
                    "name" => "英语",
                    "level" => "3",
                    "parent_id" => "242"
                )
            ),
            "organization" => array( // 机构信息
                "id" => 1,
                'membership_level' => 4, // 机构会员等级标示 1非会员 2会员 3高级会员 4超级会员
                "name" => "完美国际",
                "avatar" => "../../../src/img/classCourse/pic2.jpg",
                "number" => 329672009,
                "im_online_status" => 0,
                "mobile" => 13233333333,
                "score" => 5,
                "location" => 4,
                "comments_cnt" => 1,
                "brief" => "中华人民共和国完了事撒了款到即发阿拉山口解封爱上了",
                "tags" => array(),
                'extension' => '400-516-516 转 123123', // 400电话
                'city_filter' => 1, // 1西安、武汉 0其他城市 － 400试点城市
            ),
            "course_info" => array( // 课程信息
                "number" => "160531646544", // 班课编号 - 课型编号
                "code" => "fdsa24", // 课程编号
                "textbook" => "人教版2016", // 上课教材
                "class_hour" => 8, // 课时数
                "increment_service" => array( // 机构后台设置的增值服务
                    "助教管理",
                    "助教管理",
                    "课后答疑",
                    "无限次回放",
                    "课后答疑",
                    "无限次回放",
                ),
                "organization_number" => 563073399,
                "subject_id" => "243", // 科目id
                "lesson_way" => "4",   // 2:在线课程，4：线下课程
                "class_type" => "1",
                "price" => "100.00",
                "original_price" => "500.00",
                "max_student" => "300",
                "min_student" => "1",
                "cover" => array(
                    "id" => "411028",
                    "title" => null,
                    "url" => "http://img.gsxservice.com/12376423_0tuxn0f8.jpeg",
                    "width" => 690,
                    "height" => 386,
                    "storage_id" => "3773143",
                    "create_time" => 1466412859
                ),
                "name" => "中考作文高分必备",
                "information" => "该课程主要针对全国各地中考学生，也适合初一初二的学生，以及有基础的英语爱好者。 在有限的时间内，怎样出一篇内容丰富短小精悍且语言美丽的英语文章来获得高分呢？1如何构思？ 2 如何避免表达出现小错误？ 3 如何恰当的使用闪光句型短语连接句子",
                "introduction" => " 在有限的时间内，怎样出一篇内容丰富短小精悍且语言美丽的英语文章来获得高分呢？ 1如何构思？ 2 如何避免表达出现小错误？ 3 如何恰当的使用闪光句型短语连接句子？ 这节课由Doris老师来细细告知同学们，希望大家中考come back with success",
                "arrangement" => "06月23日 10:00-11:00",
                "area_id" => "0",
                "address" => null,
                "offline_poi" => array(
                    "lng" => "",
                    "lat" => ""
                ),
                "status" => "2",
                "open_status" => "2",
                "verify_status" => "1",
                "reason" => "",
                "reason_text" => "",
                "is_complete" => "1",
                "begin_time" => 1466647200,
                "end_time" => 1466650800,
                "course_len" => "3600", // 课时数
                "retire_flag" => "100", // 0随时可退 100不可退
                "schedule" => array(
                    array(
                        "id" => "2534346",
                        "user_id" => "629243",
                        "class_course_number" => "160531646544",
                        "content" => null,
                        "begin_time" => 1466647200,
                        "end_time" => 1466650800,
                        "created_at" => "2016-06-20 16:54:19",
                        "updated_at" => "2016-06-20 16:54:19",
                        "organization_number" => 563073399,
                        "media_id" => null,
                        "media_upload_at" => null,
                        "media_expire" => null,
                        "is_over" => 1
                    )
                ),
                "location" => "宅家里，冬天只适合冬眠",
                "display_status" => 15, // 2正在招生 3暂停招生 4满班 5开课中 6课程结束 7课程删除 8审核中 11课程过期 13课程终止 14关闭班课 15进入教室 16即将开始 17正在进行中 10000未知
                "total_pay" => 34,
                "count_over" => 1,
                "succ_pay" => 34,
                "realtime_price" => null,
                "can_pay" => 266,
                "is_full" => false,
                "over_close_time" => true,
                "course_type" => 12,
                "cashback" => 0
            ),
            "type_info" => array( // 该课程全部课型
                array(
                    "name" => "高三数学基础班",
                    "number" =>123,
                    "textbook" => '2016人教版', // 教材
                    "code" => "abcdef",
                    "lesson_way" => 2,
                    "class_time" => "1月9号-3月15号",
                    "class_plan" =>"每天下午2点到4点",
                    "address" => "北京海淀",
                    "class_hour" => 40,
                    "display_status" => 2,
                    "class_hour_explain" => '500元／30课时', // 课时说明
                    "price" => "100",
                    "detail_url" => "http://baidu.com",
                    "sign_up_url" =>"http://baidu.com"
                ),
                array(
                    "name" => "高三数学基础班",
                    "textbook" => '2016人教版', // 教材
                    "number" =>123,
                    "code" => "abcdef",
                    "lesson_way" => 4,
                    "display_status" => 15,
                    "class_time" => "1月9号-3月15号",
                    "class_plan" =>"每天下午2点到4点",
                    "address" => "北京海淀北京海淀北京海淀北京海淀北京海淀北京海淀北京海淀",
                    "class_hour" => 40,
                    "class_hour_explain" => '500元／30课时',
                    "price" => "100",
                    "detail_url" => "http://baidu.com",
                    "sign_up_url" =>"http://baidu.com"
                )
            ),
            "other_courses" => array(
                array(
                    "number" => "161013717806",
                    "subject_id" => "125",
                    "name" => "冲刺ket之part5和7",
                    "lesson_way" => "2", // 2:在线课程，4：线下课程
                    "create_time" => 1476333623,
                    "begin_time" => 1478440800,
                    "end_time" => 1478529900,
                    "course_length" => 1.5,
                    "price" => "99.00",
                    "max_student" => "50",
                    "status" => "2",
                    "student_desc" => null,
                    "total_pay" => 0,
                    "succ_pay" => 0,
                    "display_status" => 2,
                    "display_status_search" => 3,
                    "realtime_price" => null,
                    "is_full" => false,
                    "photo_url" => "http://img.gsxservice.com/17675821_g88yhwpl.png",
                    "detail_url" => "http://www.genshuixue.com/teacher/classCourseDetail/161013717806"
                ),
                array(
                    "number" => "160909705962",
                    "subject_id" => "243",
                    "name" => "迅速击破中考考点宾语从句",
                    "lesson_way" => "2",
                    "create_time" => 1473392895,
                    "begin_time" => 1478700000,
                    "end_time" => 1478703600,
                    "course_length" => 1,
                    "price" => "0.00",
                    "max_student" => "300",
                    "status" => "2",
                    "student_desc" => null,
                    "total_pay" => 21,
                    "succ_pay" => "21",
                    "display_status" => 2,
                    "display_status_search" => 3,
                    "realtime_price" => null,
                    "is_full" => false,
                    "photo_url" => "http://img.gsxservice.com/17170270_0i2qwemt.jpeg",
                    "detail_url" => "http://www.genshuixue.com/teacher/classCourseDetail/160909705962"
                )
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
            "is_favored" => false,
            "popularity" => "3",
            "course_type" => 2,
            "support_student_advisory" => true,
            "relative_course" => array( // 其他同学还在学
                array(
                    "name" => "出国读研申请流程",
                    "headline" => "哈哈",
                    "number" => "16010350235",
                    "course_number" => "16010350235",
                    "course_type" => 3,
                    "now_price" => "1000",
                    "original_price" => null,
                    "courses_detail_url" => "http://wangtingkui-m.test.genshuixue.com/video_course/16010350235",
                    "subhead" => "",
                    "button_text" => "立即报名",
                    "button_color" => "orange",
                    "img_url" => "../../../src/img/classCourse/pic5.jpg"
                ),
                array(
                    "name" => "出国读研申请流程",
                    "headline" => "哈哈",
                    "number" => "16010350235",
                    "course_number" => "16010350235",
                    "course_type" => 3,
                    "now_price" => "1000",
                    "original_price" => null,
                    "courses_detail_url" => "http://wangtingkui-m.test.genshuixue.com/video_course/16010350235",
                    "subhead" => "",
                    "button_text" => "立即报名",
                    "button_color" => "orange",
                    "img_url" => "../../../src/img/classCourse/pic5.jpg"
                ),
                array(
                    "name" => "出国读研申请流程",
                    "headline" => "哈哈",
                    "number" => "16010350235",
                    "course_number" => "16010350235",
                    "course_type" => 3,
                    "now_price" => "1000",
                    "original_price" => null,
                    "courses_detail_url" => "http://wangtingkui-m.test.genshuixue.com/video_course/16010350235",
                    "subhead" => "",
                    "button_text" => "立即报名",
                    "button_color" => "orange",
                    "img_url" => "../../../src/img/classCourse/pic5.jpg"
                ),
                array(
                    "name" => "出国读研申请流程出国读研申请流程",
                    "headline" => "哈哈",
                    "number" => "16010350235",
                    "course_number" => "16010350235",
                    "course_type" => 3,
                    "now_price" => "1000",
                    "original_price" => null,
                    "courses_detail_url" => "http://wangtingkui-m.test.genshuixue.com/video_course/16010350235",
                    "subhead" => "",
                    "button_text" => "立即报名",
                    "button_color" => "orange",
                    "img_url" => "../../../src/img/classCourse/pic5.jpg"
                ),
            ),
            "relatedcourse" => array( // 右边栏 - 相关课程
                array(
                    "name" => "“多家全国性媒体采访”&，“数学万岁”&，",
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
            "lbs" => array(
            ),
            "pageInnerLinks" => array(
            ),
            "teacher_profiles" => array( // 非主讲老师列表
                array(
                    "vip_level" => 3, // 0非会员 1普通会员 2高级会员 3超级会员
                    "display_name" => "江天权",
                    "im_online_status" => 0,
                    "number" => "371534498",
                    "private_domain" => "371534498",
                    "order_comment_count" => 10,
                    "invite_comment_count" => 10,
                    "photo_url" => "../../../src/img/classCourse/pic1.jpg",
                    "school_age" => -1,
                    "score" => 4.5,
                    "area_id" => '32479801324',
                    'user_id' => '112233',
                    "short_intro" => "深入浅出深入浅出权威名师深入浅出权威名师权威名师权威名师",
                ),
                array(
                    "vip_level" => 3, // 0非会员 1普通会员 2高级会员 3超级会员
                    "display_name" => "江天权",
                    "im_online_status" => 1,
                    "number" => "371534498",
                    "private_domain" => "371534498",
                    "order_comment_count" => 10,
                    "invite_comment_count" => 10,
                    "photo_url" => "../../../src/img/classCourse/pic1.jpg",
                    "school_age" => -1,
                    "score" => 4.5,
                    "area_id" => '32479801324',
                    'user_id' => '112233',
                    "short_intro" => "深入浅出深入浅出权威名师深入浅出权威名师权威名师权威名师",

                ),
                array(
                    "vip_level" => 3, // 0非会员 1普通会员 2高级会员 3超级会员
                    "display_name" => "江天权",
                    "number" => "371534498",
                    "im_online_status" => 1,
                    "private_domain" => "371534498",
                    "order_comment_count" => 10,
                    "invite_comment_count" => 10,
                    "photo_url" => "../../../src/img/classCourse/pic1.jpg",
                    "school_age" => -1,
                    "score" => 4.5,
                    "area_id" => '32479801324',
                    'user_id' => '112233',
                    "short_intro" => "深入浅出深入浅出权威名师深入浅出权威名师权威名师权威名师",

                ),
            )
        )
    )
);