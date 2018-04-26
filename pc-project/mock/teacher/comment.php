<?php

require("../bootstrap.php");

render(
    "teacher/comment",
    array(
        "tpl_data" => array(
            "user_info" => array(
                "is_login" => true,
                "id" => 1,
                //"mobile" => 8701218237,
                "mobile" => NULL,
                "user_role" => 2,
                "has_commented" => false,
                //"name" => "xxx",
                "name" => NULL,
            ),
            "teacher_course" => array(
                array(
                    "id" => "1",

                    "name" => "课程一",
                    "lesson_way" => array(
                        array("id" => 1, "name" => "在线授课" ),
                        array("id"=> 2, "name" => "学生上门")
                    )
                )
            ),
            "teacher_profile" => array(
                "name" => "沈佳宜沈佳宜沈佳宜沈佳宜沈佳宜沈佳宜沈佳宜沈佳宜",
                "name_cut" => "沈佳宜沈佳宜沈佳宜沈佳...",
                "display_name" => '沈佳宜沈佳宜沈佳宜沈佳宜沈佳宜沈佳宜沈佳宜沈佳宜',
                "avatar" => "http://test.img.genshuixue.com/578_m043axzd.png",
                "id" => "10",
                'number' => '12433254365',
            ),
            "subject" => array(
                array(
                    "name" => "大学英语",
                    "id" => "1",
                    "subject_id" => "123",
                    "price" => array(
                        "teacher" => 1,
                        "student" => 2,
                        "discuss" => 3,
                        "online" => 4
                    )
                ),
                array(
                    "name" => "高中英语",
                    "id" => "2",
                    "price" => array(
                        "teacher" => 1,
                        "student" => 2,
                        "discuss" => 3,
                        "online" => 4
                    )
                ),
            ),

        )
    )
);

