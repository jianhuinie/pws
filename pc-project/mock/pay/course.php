<?php

require("../bootstrap.php");

render(
    "pay/course",
    array(
        "user_data" => array(),
        "tpl_data" => array(
            "teacher_profile" => array(
                "name" => "沈佳宜沈佳宜沈佳宜沈佳宜沈佳宜沈佳宜沈佳宜沈佳宜",
                "name_cut" => "沈佳宜沈佳宜沈佳宜沈佳...",
                "display_name" => '沈佳宜沈佳宜沈佳宜沈佳宜沈佳宜沈佳宜沈佳宜沈佳宜',
                "avatar" => "http://img.gsxservice.com/10842_6cwsbfdw.jpeg",
                "id" => "10",
                "number" => '757457658789',
                "slogan" => "老师简介"
            ),
            "course_type" =>1,
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
            "course_combo" => array(
                array(
                    "id" => "628",
                    "desc" => "试听课程，为学生提供试听机会哈哈哈哈哈哈哈",
                    "desc_cut" => "试听课程，为学生提供试听机会哈哈...",
                    "hours" => 2,
                    "discount" => 10
                ),
                array(
                    "id" => "628",
                    "desc" => "试听课程，为学生提供试听机会哈哈哈哈哈哈哈",
                    "desc_cut" => "试听课程，为学生提供试听机会哈哈...",
                    "hours" => 2,
                    "discount" => 4
                ),
                array(
                    "id" => "628",
                    "desc" => "试听课程，为学生提供试听机会哈哈哈哈哈哈哈",
                    "desc_cut" => "试听课程，为学生提供试听机会哈哈...",
                    "hours" => 2,
                    "discount" => 5
                ),
                array(
                    "id" => "628",
                    "desc" => "试听课程，为学生提供试听机会哈哈哈哈哈哈哈",
                    "desc_cut" => "试听课程，为学生提供试听机会哈哈...",
                    "hours" => 2,
                    "discount" => 6
                )
            )
        )
    )
);

