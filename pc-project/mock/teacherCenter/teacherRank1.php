<?php

require("../bootstrap.php");

render(
    "teacher_center/teacherRank1",
    array(
        "tpl_data" => array(
            "lesson_pay_rank" => array(
                "rank" => 6,
                "msg" => "您当前在课酬排行榜排名第6名，落后前一名963.19元，赶快努力超越他吧~"
            ),
            "student_count_rank"=> array(
                "rank"=> 2,
                "msg"=> "您当前在学生数排行榜排名第2名，落后前一名18名学生，赶快努力超越他吧~"
            ),
            "expired_time"=> "1234000",
            "current_time"=> "1223000"
        )
    )
);

