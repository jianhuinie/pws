<?php

require("../bootstrap.php");

render(
    "student_center/playback",
    array(
        "tpl_data" => array(
            "class_course" => array( // 班课
                "pager" => array(
                    "page" => 1,
                    "page_size" => 10,
                    "total" => 1
                ),
                "list" => array(
                    array(
                        "number" => "160510706562", // 课程编号
                        "course_name" => "关于产品经理入门的常见问题及职业准备", // 课程名称
                        "teacher_name" => "刘雨", // 主讲老师
                        "enroll_time" => "2016-05-12 20:27:34", // 报名时间
                        "expire_time" => "2016-12-16 11:30:00", // 结束时间
                        "arrangement" => "05月12日 20:00-21:30", // 课程安排
                        "photo_url" => "http://img.gsxservice.com/10787687_5a640vk3.jpeg", // 课程图片
                        "playback_count" => "100", // 课节数
                        "play_url" => "http://www.genshuixue.com/live/playback?classid=160511811934", // 回放地址
                        "course_type" => 2, // 1：一对一，2：在线班课
                    )
                )
            ),
            "onevone" => array( //  1v1
                "pager" => array(
                    "page" => 1,
                    "page_size" => 10,
                    "total" => 1
                ),
                "list" => array(
                    array(
                        "number" => "160510706562", // 课程编号
                        "course_name" => "关于产品经理入门的常见问题及职业准备", // 课程名称
                        "teacher_name" => "刘雨", // 主讲老师
                        "enroll_time" => "2016-05-12 20:27:34", // 报名时间
                        "expire_time" => "2016-12-16 11:30:00", // 结束时间
                        "arrangement" => "05月12日 20:00-21:30", // 课程安排
                        "photo_url" => "http://img.gsxservice.com/10787687_5a640vk3.jpeg", // 课程图片
                        "playback_count" => "135", // 课节数
                        "play_url" => "http://www.genshuixue.com/live/playback?classid=160511811934", // 回放地址
                        "course_type" => 1, // 1：一对一，2：在线班课
                        "purchase_id" => "637284673284"
                    )
                )
            )
        )
    )
);

