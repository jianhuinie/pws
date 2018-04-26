<?php

require("../bootstrap.php");

render(
    "student_center/modifyComment",
    array(
        "tpl_data" => array(
            'purchase_id' => 1243543524, // 订单编号
            'serial_number' => 12, // 课节序号
            'comment_id' => 324324132,
            'teacher_user_name' => '小王老师',
            'course_name' => '如何快速掌握协作技能',
            'display_title' => '课程总评', // 课程课节
            'info' => "daskjhdasjk",
            'total_score' => 5,
            "photo_list" => array(
                array(
                    "title" => "2232",
                    "url" => "http://test-img.gsxservice.com/436378_c6icctyc.jpeg",
                    "width" => "1280",
                    "height" => "720"
                ),
                array(
                    "title" => "2323",
                    "url" => "http://test-img.gsxservice.com/436379_9vw6uf24.jpeg",
                    "width" => "1214",
                    "height" => "597"
                )
            ),
        )
    )
);
