<?php

require("../bootstrap.php");

render(
    "org/coupon",
    [
        "tpl_data" => [
            "serial_num" => 'fdjslkfewioeuoiqr342423', // 优惠券编码
            "id" => "705491276b540ecfa6976a31c3b071e3",
            "org_name" => "博图教育",
            "total_money" => "20.00",
            "cond_threshold" => "100.00",
            "effect_time" => "2015-03-20 00:00:00",
            "expire_time" => "2015-03-30 00:00:00",
            "remain_coupon" => 997,
            "remain_count" => 1,
            "max_recv_count" => "3",
            "source_id" => '13421343',
            "source_user_role" => 6, // 6老师 10机构
            "coupon_url" => "https://production.genshuixue.com/student_center/coupon",

            "code" => 5,
            "get_status" => 1,

            "sourse_user_id" => "3531",
            "cond_course_type" => 3, // 0不限 2班课 3视频课
            "cond_class" => null, // 指定可用班课
            "cond_video" => array( // 指定可用视频课
                array(
                    name => "c#",
                    number => "15090640751"
                )
            )

        ]
    ]
);