<?php

require("../bootstrap.php");

render(
    "teacher_center/listTrialCourse",
    array(
        "tpl_data" => array(
            "flag" => 1, // 是否设置过试听课
            "all_count" => 1, // 全部数目
            "pay_count" => array(
                1 => 100,
                2 => 10,
                3 => 34,
                4 => 45,
                5 => 56
            ),
            "pagination" => array(
                "page" => 1,
                "page_size" => 10,
                "count" => "14"
            ),
            "order_list" => array(
                array(
                    "id" => null,
                    "purchase_id" => "1115082083501794",  // 订单编号
                    "user_id" => "343364",
                    "im_online_status" => 1,
                    "user_name" => "朱明",
                    "create_time" => "2015-08-20 09:25:47", // 下单时间
                    "update_time" => "2015-08-20 09:25:47",
                    "hours" => "1.0", // 试听课时长
                    "lesson_way" => "2", // 上课方式 2在线试听 4线下试听
                    "total_prices" => 0.01, // 课程价钱
                    "note" => "X345.pngX345.pngX345.spngX345.pngX345.pngX345.pngX345.pngX345.pngX345.pngX345.png", // 学生留言
                    "trial_step" => 2, // 1:已取消 2:待支付 3:待排课 4:已排课 5:已完成
                    "student_user_number" => "876875148", // 学生number
                    "display_name" => "朱明", // 学生姓名
                    "mobile" => 15209899898, // 学生电话
                    "avatar" => "http://test-img.gsxservice.com/81_xvle7ck2.jpeg", // 头像
                    "trial_time" => '', // 试听课时间
                    "location" => '北京海淀区回龙观龙跃苑二区',
                    "trial_address" => '回龙观龙跃苑二区' // 试听课地址
                ),
                array(
                    "id" => null,
                    "purchase_id" => "1115082083501794",  // 订单编号
                    "im_online_status" => 1,
                    "user_id" => "343364",
                    "user_name" => "朱明",
                    "create_time" => "2015-08-20 09:25:47", // 下单时间
                    "update_time" => "2015-08-20 09:25:47",
                    "hours" => "1.0", // 试听课时长
                    "lesson_way" => "2", // 上课方式 2在线试听 4线下试听
                    "total_prices" => 0.01, // 课程价钱
                    "note" => "老师你好，老师你辛苦了～", // 学生留言
                    "trial_step" => 5, // 1:已取消 2:待支付 3:待排课 4:已排课 5:已完成
                    "student_user_number" => "876875148", // 学生number
                    "display_name" => "朱明", // 学生姓名
                    "mobile" => 15209899898, // 学生电话
                    "avatar" => "http://test-img.gsxservice.com/81_xvle7ck2.jpeg", // 头像
                    "trial_time" => '', // 试听课时间
                    "location" => '北京海淀区回龙观龙跃苑二区',
                    "trial_address" => '回龙观龙跃苑二区' // 试听课地址
                ),
                array(
                    "id" => null,
                    "purchase_id" => "1115082083501794",  // 订单编号
                    "im_online_status" => 1,
                    "user_id" => "343364",
                    "user_name" => "朱明",
                    "create_time" => "2015-08-20 09:25:47", // 下单时间
                    "update_time" => "2015-08-20 09:25:47",
                    "hours" => "1.0", // 试听课时长
                    "lesson_way" => "2", // 上课方式 2在线试听 4线下试听
                    "total_prices" => 0.01, // 课程价钱
                    "note" => "X345.pngX345.pngX345.pngX345.pngX345.pngX345.pngX345.pngX345.pngX345.pngX345.pngX345.pngX345.pngX345.pngX345.pngX345.pngX345.pngX345.pngX345.pngX345.pngX345.pngX345.pngX345.pngX345.pngX345.pngX345.pngX345.pngX345.pngX345.pngX345.pngX345.pngX345.pngX345.png", // 学生留言
                    "trial_step" => 4, // 1:已取消 2:待支付 3:待排课 4:已排课 5:已完成
                    "student_user_number" => "876875148", // 学生number
                    "display_name" => "朱明", // 学生姓名
                    "mobile" => 15209899898, // 学生电话
                    "avatar" => "http://test-img.gsxservice.com/81_xvle7ck2.jpeg", // 头像
                    "trial_time" => '', // 试听课时间
                    "location" => '北京海淀区回龙观龙跃苑二区',
                    "trial_address" => '回龙观龙跃苑二区', // 试听课地址
                    "online_data" => array(
                        "location" => "http://test.genshuixue.com/live/lesson?serial_number=150831775251",
                        "mode" => 0,
                        "token" => "OWVrbDUwcjBnajN1MG1ibnR2Nm5xbTJnYTE=",
                        "timestamp" => 1441008100
                    ),
                    "modify_time" => array(
                        "lesson_id" => "85723",
                        "teacher_id" => "342169",
                        "student_id" => "342204",
                        "avatar" => "http://test-img.gsxservice.com/307505_j60704bj.jpeg",
                        "display_name" => "学生昵称",
                        "purchase_id" => "1115083145492563",
                        "max_hours" => "1.5",
                        "start_time" => "2015-09-01 14:00:00",
                        "end_time" => "2015-09-01 14:30:00"
                    )
                ),
                array(
                    "id" => null,
                    "purchase_id" => "1115082083501794",  // 订单编号
                    "im_online_status" => 1,
                    "user_id" => "343364",
                    "user_name" => "朱明",
                    "create_time" => "2015-08-20 09:25:47", // 下单时间
                    "update_time" => "2015-08-20 09:25:47",
                    "hours" => "1.0", // 试听课时长
                    "lesson_way" => "4", // 上课方式 2在线试听 4线下试听
                    "total_prices" => 0.01, // 课程价钱
                    "note" => "老师你好，老师你辛苦了～", // 学生留言
                    "trial_step" => 3, // 1:已取消 2:待支付 3:待排课 4:已排课 5:已完成
                    "student_user_number" => "876875148", // 学生number
                    "display_name" => "朱明", // 学生姓名
                    "mobile" => 15209899898, // 学生电话
                    "avatar" => "http://test-img.gsxservice.com/81_xvle7ck2.jpeg", // 头像
                    "trial_time" => '', // 试听课时间
                    "location" => '北京海淀区回龙观龙跃苑二区',
                    "trial_address" => '回龙观龙跃苑二区' // 试听课地址
                ),
            )
        )
    )
);

