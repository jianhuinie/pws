<?php

/**
 * 一对一课程详情页
 */
require("../bootstrap.php");

render(
    "one2one/detail", // 非会员模板
    // "one2one/detailVip", // 会员模板
    array(
        "tpl_data" => array(
            "one_on_one_teacher_mobile" => 14444444,
            "is_preview" => false, // 是否是预览页
            "template" => 'skin101', // skin101、skin102、skin201、skin301
            "crumb" => array( // 面包屑
                "host" => "http://www.genshuixue.com/bj/",
                "city" => array(
                    "name" => "北京"
                )
            ),
            "fenqi" => array(
                "tag_name" => "分期付款",
                "tiexi_info" => "",
                "desc" => "可享3期分期付学费"
            ),
            "is_staging" => 1,
            "staging" => array(
                'desc' => "可享受3-12期分期付款",
                "data" => array(

                )
            ),
            "course_path" => array( // 课程路径
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
            "course_related" => array( // 面包屑 － 相关课程
                array(
                    "id" => "119",
                    "name" => "二年级",
                    "level" => "3",
                    "parent_id" => "116"
                ),
                array(
                    "id" => "121",
                    "name" => "四年级",
                    "level" => "3",
                    "parent_id" => "116"
                ),
                array(
                    "id" => "122",
                    "name" => "五年级",
                    "level" => "3",
                    "parent_id" => "116"
                ),
                array(
                    "id" => "123",
                    "name" => "六年级",
                    "level" => "3",
                    "parent_id" => "116"
                ),
                array(
                    "id" => "120",
                    "name" => "三年级",
                    "level" => "3",
                    "parent_id" => "116"
                ),
                array(
                    "id" => "118",
                    "name" => "一年级",
                    "level" => "3",
                    "parent_id" => "116"
                )
            ),
            "course" => array( // 课程信息
                "scale_count" => 32, // 90天授多少课时
                // "min_cashback" => 13,
                // "max_cashback" => 312,
                "name" => "车辆驾驶车辆驾驶车辆驾驶车辆驾驶车辆驾驶车辆驾驶",
                "id" => 124,
                "info" => "我的小\n鱼你醒了\n，还记得\n早晨么", // 课程信息
                "number" => "404073533817",
                "subject_name" => "车辆驾驶",
                "price" => array(
                    "teacher" => "1000.01",
                    "student" => "1000.01", // 学生上门
                    "online" => "1000.01",
                    "discuss" => "1000.01"
                ),
                "is_online" => 2, // 0线下课 非0线上课
                "support_offline" => 0, // 0false 非0true
                "support_online" => 1, // 0false 非0true
                "course_combo" => array(
                    array(
                        "id" => "155947",
                        "hours" => "1",
                        "discount" => "1",
                        "desc" => "试听课程，为学生提供试听视频课",
                        "desc_cut" => "试听课程，为学生提供试听视频课"
                    ),
                    array(
                        "id" => "155948",
                        "hours" => "10",
                        "discount" => "10",
                        "desc" => "短期课程，适合短期冲刺与突击",
                        "desc_cut" => "短期课程，适合短期冲刺与突击"
                    ),
                    array(
                        "id" => "155949",
                        "hours" => "20",
                        "discount" => "10",
                        "desc" => "中期课程，适合对学生专项辅导",
                        "desc_cut" => "中期课程，适合对学生专项辅导"
                    ),
                    array(
                        "id" => "155950",
                        "hours" => "30",
                        "discount" => "10",
                        "desc" => "长期课程，适合循序渐进的学习",
                        "desc_cut" => "长期课程，适合循序渐进的学习"
                    )
                ),
                "course_type" => 1,
                "min_price" => "1000",
                "max_price" => "1000",
                "total_pay" => 123, // 多少人在学习
                "m_url" => 'http://test-m.genshuixue.com/' // M站详情页链接
            ),
            "favorite" => array( // 收藏情况
                "is_favored" => false,
                "favored_count" => '33', // 人气值
            ),
            "comment_data" => array( // 评价信息
                "additional" => array(
                    "desc_match" => "4.6",
                    "service_attitude" => "4.6",
                    "teach_result" => "4.6",
                    "average" => "4.6",
                    "user_total_number" => "20",
                    "face_type" => array(
                        "total" => 56,
                        "lower" => 7,
                        "great" => 43,
                        "middle" => 6,
                        "has_photo" => 19
                    ),
                    "user_diff" => 0,
                    "great_score_rate" => "0.77",
                    "comment_nav" => array(
                        "sort_by" => "display_order"
                    ),
                    "comment_type" => array(
                        "total" => array(
                            "value" => 0,
                            "name" => "全部评价",
                            "total_count" => 56
                        ),
                        "normal" => array(
                            "value" => 1,
                            "name" => "一对一评价",
                            "total_count" => 17
                        ),
                        "class" => array(
                            "value" => 3,
                            "name" => "班课评价",
                            "total_count" => 35
                        ),
                        "invite" => array(
                            "value" => 2,
                            "name" => "邀请评价",
                            "total_count" => 4
                        )
                    ),
                    "comment_tag" => array(
                        array(
                            "value" => "classify_0",
                            "name" => "标签1",
                            "count" => 0,
                            "selected" => false,
                            "sys" => false,
                            "type" => 0
                        ),
                        array(
                            "value" => "classify_1",
                            "name" => "标签1",
                            "count" => 1,
                            "selected" => false,
                            "sys" => false,
                            "type" => 1
                        ),
                        array(
                            "value" => "classify_2",
                            "name" => "标签1",
                            "count" => 2,
                            "selected" => false,
                            "sys" => false,
                            "type" => 0
                        )
                    )
                ),
                "comment_list" => array(
                    array(
                        "user_id" => "345890",
                        "desc_match" => "3.0",
                        "teach_result" => "3.0",
                        "service_attitude" => "3.0",
                        "face_type" => "2",
                        "info" => "验证评价隐藏学生手机号",
                        "create_time" => "2015-11-20 15:11",
                        "fr" => "0",
                        "course_type" => "2",
                        "course_number" => "151120548441",
                        "thumb_up" => "0",
                        "has_photo" => "0",
                        "display_title" => "总课程",
                        "anonymous" => "0",
                        "teacher_user_number" => "877468998",
                        "private_domain" => "877468998",
                        "comment_id" => "38707",
                        "has_thumb_up" => false,
                        "comprehensive_score" => "3",
                        "course" => array(
                            "course_name" => "非登录进入教室测试-非零元班课",
                            "hours" => "8.0",
                            "lesson_way" => "2",
                            "real_student" => "一九七二二二",
                            "lesson_way_name" => "在线授课",
                            "teacher_url" => "http://www.genshuixue.com/877468998",
                            "course_number" => "151120548441",
                            "course_url" => "http://test.genshuixue.com/teacher/classCourseDetail/151120548441",
                            "teacher_name" => "yili"
                        ),
                        "user" => array(
                            "display_name" => "一九七二二二",
                            "avatar_url" => "http://test-img.gsxservice.com/126_e9qssago.jpeg",
                            "number" => "413046828",
                            "url" => "http://test-m.genshuixue.com/x/413046828"
                        ),
                        "photo_list" => [],
                        "is_my_comment" => false,
                        "if_can_addition" => false,
                        "if_can_review" => false
                    ),
                    array(
                        "user_id" => "343821",
                        "desc_match" => "5.0",
                        "teach_result" => "5.0",
                        "service_attitude" => "5.0",
                        "face_type" => "1",
                        "info" => "老师很厉害啊啊啊啊啊",
                        "create_time" => "2015-11-05 12:12",
                        "fr" => "0",
                        "course_type" => "1",
                        "course_number" => "0",
                        "thumb_up" => "0",
                        "has_photo" => "0",
                        "display_title" => "课节1-1",
                        "anonymous" => "0",
                        "teacher_user_number" => "877468998",
                        "private_domain" => "877468998",
                        "comment_id" => "38609",
                        "has_thumb_up" => false,
                        "comprehensive_score" => "5",
                        "course" => array(
                            "course_name" => "星座-星座介绍",
                            "hours" => "1.0",
                            "lesson_way" => "8",
                            "real_student" => "deh",
                            "lesson_way_name" => "老师上门",
                            "teacher_url" => "http://www.genshuixue.com/877468998",
                            "course_number" => "0",
                            "course_url" => "",
                            "teacher_name" => "yili"
                        ),
                        "user" => array(
                            "display_name" => "deh",
                            "avatar_url" => "http://test-img.gsxservice.com/393537_tp7c09ey.jpeg",
                            "number" => "834952918",
                            "url" => "http://test-m.genshuixue.com/x/834952918"
                        ),
                        "photo_list" => [],
                        "is_my_comment" => false,
                        "if_can_addition" => false,
                        "if_can_review" => false
                    ),
                    array(
                        "user_id" => "342112",
                        "desc_match" => "5.0",
                        "teach_result" => "5.0",
                        "service_attitude" => "5.0",
                        "face_type" => "1",
                        "info" => "19800000004 学生给19800000002 老师好评",
                        "create_time" => "2015-08-21 11:36",
                        "fr" => "0",
                        "course_type" => "1",
                        "course_number" => "0",
                        "thumb_up" => "0",
                        "has_photo" => "1",
                        "display_title" => "总课程",
                        "anonymous" => "0",
                        "teacher_user_number" => "877468998",
                        "private_domain" => "877468998",
                        "comment_id" => "37917",
                        "has_thumb_up" => false,
                        "comprehensive_score" => "5",
                        "course" => array(
                            "course_name" => "星座-星座介绍",
                            "hours" => "1.0",
                            "lesson_way" => "2",
                            "real_student" => "Eva0418",
                            "lesson_way_name" => "在线授课",
                            "teacher_url" => "http://www.genshuixue.com/877468998",
                            "course_number" => "0",
                            "course_url" => "",
                            "teacher_name" => "yili"
                        ),
                        "user" => array(
                            "display_name" => "Eva04189",
                            "avatar_url" => "http://test-img.gsxservice.com/392718_sw2ey8wc.jpeg",
                            "number" => "876956828",
                            "url" => "http://test-m.genshuixue.com/x/876956828"
                        ),
                        "photo_list" => array(
                            array(
                                "title" => "1",
                                "url" => "http://test-img.gsxservice.com/374534_n31zm7l6.jpeg",
                                "width" => "400",
                                "height" => "250"
                            ),
                            array(
                                "title" => "1",
                                "url" => "http://test-img.gsxservice.com/374534_n31zm7l6.jpeg",
                                "width" => "400",
                                "height" => "250"
                            )
                        ),
                        "is_my_comment" => false,
                        "if_can_addition" => false,
                        "if_can_review" => false
                    )
                ),
                "pager" => array(
                    "count" => 56,
                    "page" => 1,
                    "page_size" => 10
                )
            ),
            "teacher" => array( // 老师信息
                "is_one_on_one_teacher" => true,
                "id" => '110',
                "vip_level" => 3, // 0非会员 1普通会员 2高级会员 3超级会员
                "name" => "陈导游陈导游陈导游陈导游陈导游陈导游陈导游陈导游陈导游陈导游陈导游",
                "intro" => "大家好这里是我的自我介绍部分，谢谢，谢谢大家～",
                "number" => "877468998",
                "im_online_status" => 1,
                "easemob_username" => "b3cd448a327bae0839ed7e7a1f2c573b",
                "avatar" => "http://img.gsxservice.com/headpic_woman_07.jpg",
                "private_domain" => "877468998",
                "sex" => "0",
                "audio" => null,
                "video" => array(
                    "count" => 6,
                    "url" => "/video/view/11530"
                ),
                "short_introduce" => "范德萨范德萨范德萨发的，测试测试测试测试",
                "org" => array( // 非机构老师为null
                    "name" => '终南山集团',
                    "number" => 0,
                    "url" => 'http://wujun-www.test.genshuixue.com/org/index/331618579"',
                    "avatar" => null,
                    "comments_cnt" => 3,
                    "score" => 4.9,
                    "im_online_status" => 1,
                    "support_tianxiao" => false, // 是否支持天笑系统？
                    "is_white_user" => true // 是否是机构白名单用户 － 试听功能
                ),
                "score" => 4.9, // 老师的评分
                "course_count" => 59,
                "student_count" => 127,
                "course_length" => 1819.65,
                "great_rate" => 0.77,
                "detail_url" => "/877468998/other_info",
                "preface" => "http://test-img.gsxservice.com/358100_34pia74z.jpeg",
                "history_course_url" => "/teacher/classCourseList/877468998",
                "location" => "北京市海淀区软件园博彦科技西楼", // 上课地址
                "country" => "美国",
                "position" => array( // 上课地址
                    "lng" => "116.292652",
                    "lat" => "39.864816"
                ),
                "location_url" => "http://wujun.test.genshuixue.com/teacher/area/877468998",
                "certs" => array(
                    "身份认证", "专业认证"
                ),
                "skill" => array(
                    "认真负责",
                    "发色弱",
                    "本科留学专家",
                    "明星艺人",
                    "节目评委",
                    "民间艺人",
                    "资深媒体人",
                    "效果明显"
                ),
                "school_age" => "25",
                "experiences" => array( // 过往经历
                    "list" => array(
                        array(
                            "start_date" => "2015-02-01",
                            "end_date" => "至今",
                            "content" => "的负数范德萨发送到负数发 \n111111111111111111111111112345发的"
                        ),
                        array(
                            "start_date" => "2015-01-01",
                            "end_date" => "至今",
                            "content" => "视频课审核视频课审核视频课审核视频课审核视频课审核视频课审核视频课审核视频课审核视频课审核视频课审核视频课审核视频课审核视频课审核视频课审核视频课审核视频课审核视频课审核视频课审核视频课审核视频课审核"
                        )
                    ),
                    "more_url" => "http://wujun-m.test.genshuixue.com/877468998/experience"
                ),
                "cases" => array( // 分享成果
                    "list" => array(
                        array(
                            "date" => "2015-02-01",
                            "title" => "122222222222222222222222额鹅鹅鹅",
                            "content" => "二位惹我热热"
                        ),
                        array(
                            "date" => "2014-02-01",
                            "title" => "的第三方",
                            "content" => "的第三方的第三方的第三方的第三方的第三方的第三方的第三方的第三方的第三方的第三方的第三方的第三方的第三方的第三方的第三方的第三方的第三方的第三方的第三方的第三方的第三方的第三方的第三方的第三方的第三方的第三方的第三方的第三方的第三方的第三方的第三方的第三方的第三方的第三方的第三方的第三方的第三方的第三方的第三方的第三方的第三方的第三方的第三方的第三方的第三方的第三方的第三方的第三方的第三方的第三方的第三方的第三方的第三方的第三方的第三方的第三方的第三方的第三方的第三方"
                        )
                    ),
                    "more_url" => "http://wujun-m.test.genshuixue.com/877468998/successCase"
                ),
                "photos" => array( // 视频、照片
                    "video_list" => array(
                        array(
                            "id" => "11500",
                            "video_id" => "0",
                            "video_unique" => "vu68764",
                            "name" => "超级老师01",
                            "img" => "http://test-img.gsxservice.com/00-upload/image-test/68230_ec3fc96c8999109c332272c095124d0c_mHYL1E8T.jpg",
                            "preface_url" => "http://test-img.gsxservice.com/00-upload/image-test/68230_ec3fc96c8999109c332272c095124d0c_mHYL1E8T.jpg",
                            "preface_url_prefix" => "http://test-img.gsxservice.com/00-upload/image-test/68230_ec3fc96c8999109c332272c095124d0c_mHYL1E8T",
                            "video" => "/video/view/11500",
                            "status" => "70",
                            "verify_status" => "0",
                            "reasons" => []
                        )
                    ),
                    "photo_list" => array(
                        array(
                            'id' => '',
                            'create_time' => '',
                            'img' => 'http://img.gsxservice.com/186302_4qcgt7kr.jpeg',
                            'name' => '纷纷为撒旦法',
                            'width' => 1200,
                            'height' => 801,
                            'is_default' => 1 // 是否为随机图
                        ),
                        array(
                            'id' => '',
                            'create_time' => '',
                            'img' => 'http://img.gsxservice.com/27658_61zqh1ni.jpeg',
                            'name' => '阿斯达多萨法asd联客机',
                            'width' => 1800,
                            'height' => 1350,
                            'is_default' => 0 // 是否为随机图

                        ),
                        array(
                            'id' => '',
                            'create_time' => '',
                            'img' => 'http://img.gsxservice.com/186302_4qcgt7kr.jpeg',
                            'name' => '阿斯达多萨法asd联客机',
                            'width' => 7800,
                            'height' => 5860,
                            'is_default' => 1 // 是否为随机图
                        ),
                        array(
                            'id' => '',
                            'create_time' => '',
                            'img' => 'http://img.gsxservice.com/27658_61zqh1ni.jpeg',
                            'name' => '阿斯达多萨法asd联客机',
                            'width' => 7800,
                            'height' => 5860,
                            'is_default' => 0 // 是否为随机图
                        )
                    )
                ),
            ),
            "coupon" => array( // 优惠券
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
                    "cond_course_type" => 3 // 0通用 1一对一 2班课 3视频课
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
                    "cond_course_type" => 0 // 0通用 1一对一 2班课 3视频课
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
                    "cond_course_type" => 0 // 0通用 1一对一 2班课 3视频课
                )
            ),
            "related_course" => array( // 老师其他课程
                "total_count" => 3,
                "list" => array(
                    array(
                        "id" => "49130",
                        "type" => 1,
                        "title" => "星座-星座介绍星座-星座介绍星座-星座介绍星座-星座介绍",
                        "price" => "5.01",
                        "info" => "星座专业背景介绍",
                        "is_online" => 2,
                        "support_offline" => 8,
                        "url" => "/pay/teacherCourse?teacher_number=877468998&course_id=49130",
                        "preface" => "http://test-img.gsxservice.com/358100_34pia74z.jpeg", // 课程封面
                        "total_pay" => 123 // 多少人在学习
                    ),
                    array(
                        "id" => "49306",
                        "type" => 1,
                        "title" => "太极拳-武术",
                        "price" => "0",
                        "info" => "太极拳",
                        "is_online" => 2,
                        "support_offline" => 13,
                        "url" => "/pay/teacherCourse?teacher_number=877468998&course_id=49306",
                        "preface" => "http://test-img.gsxservice.com/358100_34pia74z.jpeg", // 课程封面
                        "total_pay" => 123 // 多少人在学习
                    )
                )
            ),
            "trial_course_info" => array(
                "type" => 5,
                "status" => -1, // -1隐藏试听课 0:未预约/未登陆用户  1:预约还没排课  2:已经排课 3:已经结束 4:预约后但还没支付 5老师自己查看自己的个人主页 6已取消
                "data" => array(
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
            "qrcode_url" => "http://test.genshuixue.com/teacher/one2oneCourseDetail/404073533817",
            "im_data" => array(
                "c_id" => "877468998",
                "c_role" => 0,
                "group_id" => ""
            ),
            "share_info" => array(
                "student" => array(
                    "title" => "【1对1】车辆驾驶",
                    "content" => "向你推荐yili老师的车辆驾驶1对1课程，效果特别棒！感兴趣的话快来跟谁学向他约课吧。",
                    "img" => "http://img.gsxservice.com/headpic_woman_07.jpg@300w_300h",
                    "url" => "http://test.gensx.cn/Tbu05j",
                    "share_weixin" => array(
                        "title" => "【1对1】车辆驾驶",
                        "content" => "向你推荐yili老师的车辆驾驶1对1课程，效果特别棒！感兴趣的话快来跟谁学向他约课吧。",
                        "url" => "http://test.gensx.cn/Tbu05j",
                        "img" => "http://img.gsxservice.com/headpic_woman_07.jpg@300w_300h"
                    ),
                    "share_pyq" => array(
                        "title" => "【1对1】车辆驾驶",
                        "content" => "向你推荐yili老师的车辆驾驶1对1课程，效果特别棒！感兴趣的话快来跟谁学向他约课吧。",
                        "url" => "http://test.gensx.cn/Tbu05j",
                        "img" => "http://img.gsxservice.com/headpic_woman_07.jpg@300w_300h"
                    ),
                    "share_qq" => array(
                        "title" => "【1对1】车辆驾驶",
                        "content" => "向你推荐yili老师的车辆驾驶1对1课程，效果特别棒！感兴趣的话快来跟谁学向他约课吧。",
                        "url" => "http://test.gensx.cn/Tbu05j",
                        "img" => "http://img.gsxservice.com/headpic_woman_07.jpg@300w_300h"
                    ),
                    "share_qzone" => array(
                        "title" => "【1对1】车辆驾驶",
                        "content" => "向你推荐yili老师的车辆驾驶1对1课程，效果特别棒！感兴趣的话快来跟谁学向他约课吧。",
                        "url" => "http://test.gensx.cn/Tbu05j",
                        "img" => "http://img.gsxservice.com/headpic_woman_07.jpg@300w_300h"
                    ),
                    "share_weibo" => array(
                        "title" => "【1对1】车辆驾驶",
                        "content" => "向你推荐yili老师的车辆驾驶1对1课程，效果特别棒！感兴趣的话快来跟谁学向他约课吧。http://test.gensx.cn/Tbu05j#找好老师，上跟谁学#",
                        "url" => "http://test.gensx.cn/Tbu05j",
                        "img" => "http://img.gsxservice.com/headpic_woman_07.jpg@300w_300h"
                    )
                ),
                "teacher" => array(
                    "title" => "【1对1】车辆驾驶",
                    "content" => "Hi，我是yili老师，我在跟谁学开设了车辆驾驶1对1课程，感兴趣的话快来跟谁学和我约课吧。",
                    "img" => "http://img.gsxservice.com/headpic_woman_07.jpg@300w_300h",
                    "url" => "http://test.gensx.cn/Tbu05j",
                    "share_weixin" => array(
                        "title" => "【1对1】车辆驾驶",
                        "content" => "Hi，我是yili老师，我在跟谁学开设了车辆驾驶1对1课程，感兴趣的话快来跟谁学和我约课吧。",
                        "url" => "http://test.gensx.cn/Tbu05j",
                        "img" => "http://img.gsxservice.com/headpic_woman_07.jpg@300w_300h"
                    ),
                    "share_pyq" => array(
                        "title" => "【1对1】车辆驾驶",
                        "content" => "Hi，我是yili老师，我在跟谁学开设了车辆驾驶1对1课程，感兴趣的话快来跟谁学和我约课吧。",
                        "url" => "http://test.gensx.cn/Tbu05j",
                        "img" => "http://img.gsxservice.com/headpic_woman_07.jpg@300w_300h"
                    ),
                    "share_qq" => array(
                        "title" => "【1对1】车辆驾驶",
                        "content" => "Hi，我是yili老师，我在跟谁学开设了车辆驾驶1对1课程，感兴趣的话快来跟谁学和我约课吧。",
                        "url" => "http://test.gensx.cn/Tbu05j",
                        "img" => "http://img.gsxservice.com/headpic_woman_07.jpg@300w_300h"
                    ),
                    "share_qzone" => array(
                        "title" => "【1对1】车辆驾驶",
                        "content" => "Hi，我是yili老师，我在跟谁学开设了车辆驾驶1对1课程，感兴趣的话快来跟谁学和我约课吧。",
                        "url" => "http://test.gensx.cn/Tbu05j",
                        "img" => "http://img.gsxservice.com/headpic_woman_07.jpg@300w_300h"
                    ),
                    "share_weibo" => array(
                        "title" => "【1对1】车辆驾驶",
                        "content" => "Hi，我是yili老师，我在跟谁学开设了车辆驾驶1对1课程，感兴趣的话快来跟谁学和我约课吧。http://test.gensx.cn/Tbu05j#找好老师，上跟谁学#",
                        "url" => "http://test.gensx.cn/Tbu05j",
                        "img" => "http://img.gsxservice.com/headpic_woman_07.jpg@300w_300h"
                    )
                )
            )
        ),
        "user_data" => array(
            "user_type" => 0
        )
    )
);

