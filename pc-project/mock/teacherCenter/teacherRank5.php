<?php

require("../bootstrap.php");

render(
    "teacher_center/teacherRank5",
    array(
        "tpl_data" => array(
            "tid" => "980",
            "teacher_rank" => array (
                "rank" => 6,
                "exp_total" => 1002,//总积分
                "exp_lesson_pay" => 100,//课酬
                "exp_student_count" => 20,//学生数
                "exp_new_student" => 3,//新学生数
                "exp_online_lesson" => 30,//在线课程
                "exp_comment" => 301,//评论经验值
                "msg" => "您当前落后前一名963经验值，赶快努力超越他吧~"
            ),
            "is_org" => 1,
            "is_download_app" => 1,
            "previous_rank_list" => [
                array (
                    "phase" =>"第一期",
                    "msg" =>"您在2014年12月排行榜活动排名：学生数榜第1名，课酬榜第2名"
                ),
                array (
                    "phase" =>"第二期",
                    "msg" =>"您在2015年1月排行榜活动排名：学生数榜第1名，课酬榜第2名"
                )
            ],
            "expired_time" => "154000", //活动结束时间
            "current_time" => "123000",
        )
    )
);

