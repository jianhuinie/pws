<?php

require("../bootstrap.php");

render(
    "teacher_center/teacherRank3",
    array(
        "tpl_data" => array(
            "tid" => "980",
            "lesson_pay_noorg_rank" => array(
                "rank" => 6,
                "msg" => "您当前在课酬排行榜排名第6名，落后前一名963.19元，赶快努力超越他吧~"
            ),
            "lesson_pay_org_rank" => array(
                "rank" => 6,
                "msg" => "您当前在课酬排行榜排名第6名，落后前一名963.19元，赶快努力超越他吧~"
            ),
            "student_count_noorg_rank" => array(
                "rank" => 2,
                "msg" => "您当前在学生数排行榜排名第2名，落后前一名18名学生，赶快努力超越他吧~"
            ),
            "student_count_org_rank" => array(
                "rank" => 2,
                "msg" => "您当前在学生数排行榜排名第2名，落后前一名18名学生，赶快努力超越他吧~"
            ),
            "is_download_app" => 1,
            "previous_rank_list" => [
                "您在2014年12月排行榜活动排名：学生数榜第1名，课酬榜第2名",
                "您在2015年1月排行榜活动排名：学生数榜第1名，课酬榜第2名"
            ],
            "is_org" => 1,
            "current_time" => 123000,
            "expired_time" => 154000,
        )
    )
);

