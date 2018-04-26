<?php

require("../bootstrap.php");

render(
    "teacher_center/teacherRank2015",
    array(
        "tpl_data" => array(
            "tid" => "2053",
            "is_org" => false,
            "lesson_pay_org_rank" => array(
                "rank" => 0,
                "msg" => "邀请您的学生线上约课，就有机会赢取此排行榜现金大奖哦~"
            ),
            "lesson_pay_noorg_rank" => array(
                "rank" => 0,
                "msg" => "邀请您的学生线上约课，就有机会赢取此排行榜现金大奖哦~"
            ),
            "student_count_org_rank" => array(
                "rank" => 0,
                "msg" => "邀请您的学生线上约课，就有机会赢取此排行榜现金大奖哦~"
            ),
            "student_count_noorg_rank" => array(
                "rank" => 0,
                "msg" => "邀请您的学生线上约课，就有机会赢取此排行榜现金大奖哦~"
            ),
            "current_time" => 1449906065000,
            "expired_time" => 1452868200000,
            "profile_status" => array(
                "area" => false,
                "bio" => false,
                "case" => false,
                "photo" => true,
                "login_app" => false,
                "all" => true,
                "reg_time_match" => true
            )
        ),
        "ts" => 1449906065,
        "msg" => "succ"
    )
);

