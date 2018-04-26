<?php

require("../bootstrap.php");

render(
    "teacher_center/mktCenter/groupCourse",
    array(
        "tpl_data" => array(
            "groupCourseList" => array( // 班课列表
                array(
                    "course_name" => "3333",
                    "thumbnail" => "http://img.gsxservice.com/10544776_1vx0jrvn.jpeg",
                    "course_number" => "160505640076",
                    "teacher_user_id" => "825679",
                    "course_len" => "3600",
                    "lesson_way" => "4",
                    "status" => "14",
                    "begin_time" => 1462060800,
                    "end_time" => 1462064400,
                    "max_student" => "111",
                    "total_pay_student" => 0,
                    "activity_status" => 1,
                    "pre_price" => "1.00",
                    "has_set" => 0,
                    "caban_price" => 120,
                    "is_chaban" => true
                ),
                array(
                    "course_name" => null,
                    "thumbnail" => "",
                    "course_number" => null,
                    "teacher_user_id" => null,
                    "course_len" => null,
                    "lesson_way" => null,
                    "status" => 3,
                    "begin_time" => null,
                    "end_time" => null,
                    "max_student" => null,
                    "total_pay_student" => 0,
                    "activity_status" => 0,
                    "pre_price" => null,
                    "has_set" => 1,
                    "curr_price" => "10.10",
                    "activity_count" => 1,
                    "market_course_id" => "797"
                )
            ),
            "videoCourseList" => array( // 视频课列表
                array(
                    "course_name" => "家里蹲12",
                    "thumbnail" => "http://test-img.gsxservice.com/387991_19ms7ny2.jpeg",
                    "course_number" => "15101949263",
                    "teacher_user_id" => "342095",
                    "status" => null,
                    "activity_status" => 0,
                    "pre_price" => "1",
                    "has_set" => 0,
                    "course_items_count" => 2, // 视频课节数
                    "buyer_num" => 5 // 购买人数
                ),
                array(
                    "course_name" => "测试支付视频课2",
                    "thumbnail" => "http://test-img.gsxservice.com/395577_oe14p9gd.jpeg",
                    "course_number" => "15111074729",
                    "teacher_user_id" => "342095",
                    "status" => null,
                    "activity_status" => 0,
                    "pre_price" => "5.01",
                    "has_set" => 1,
                    "curr_price" => "0.25",
                    "activity_count" => null,
                    "market_course_id" => "796",
                    "course_items_count" => 3, // 视频课节数
                    "buyer_num" => 888 // 购买人数
                )
            )
        )
    )
);