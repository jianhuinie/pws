<?php

require("../bootstrap.php");

render(
    "teacher_center/teacherRank2",
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
            "current_time"=> "1223000",
            "is_download_app" => 1,
            "previous_rank_msg" => "您在2014年排行榜活动排名：学生数榜第一名，课酬榜第二名"
        )
    )
);

