<?php

require('../../../bootstrap.php');

render(
    'userCenter/teacherCenter/indexManage/courseSort',
    array(
        'tpl_data' => array(
            'result' => array(
                array(
                    "number" => 1001,
                    "name" => "1111111111111111",
                    "image" => "http://test-img.gsxservice.com/419094_pz5ugryx.jpeg", // 课程封面
                    "type" => 1, // 课程类型 1:一对一 2:班课包含线上,线下 3:视频课
                    "type_cn" => "一对一", // 显示的课程类型名称
                    "price" => "0元",
                    "expire" => "共1课节/21人学习中", // 课程的有效期
                ),
                array(
                    "number" => 2002,
                    "name" => "22222222222222222",
                    "image" => "http://test-img.gsxservice.com/419094_pz5ugryx.jpeg",
                    "type" => 2,
                    "type_cn" => "线上班课",
                    "price" => "2.00",
                    "expire" => "共1课节/22人学习中"
                ),
                array(
                    "number" => 3003,
                    "name" => "333333333333333",
                    "image" => "http://test-img.gsxservice.com/419094_pz5ugryx.jpeg",
                    "type" => 3,
                    "type_cn" => "视频课",
                    "price" => "3.00",
                    "expire" => "共1课节/23人学习中"
                ),
                array(
                    "number" => 4004,
                    "name" => "4444444444",
                    "image" => "http://test-img.gsxservice.com/419094_pz5ugryx.jpeg", // 课程封面
                    "type" => 1, // 课程类型 1:一对一 2:班课包含线上,线下 3:视频课
                    "type_cn" => "一对一", // 显示的课程类型名称
                    "price" => "1.00",
                    "expire" => "", // 课程的有效期
                ),
                array(
                    "number" => 5005,
                    "name" => "5555555555",
                    "image" => "http://test-img.gsxservice.com/419094_pz5ugryx.jpeg",
                    "type" => 2,
                    "type_cn" => "线上班课",
                    "price" => "2.00",
                    "expire" => "共1课节/22人学习中"
                ),
                array(
                    "number" => 6006,
                    "name" => "6666666666666",
                    "image" => "http://test-img.gsxservice.com/419094_pz5ugryx.jpeg",
                    "type" => 3,
                    "type_cn" => "视频课",
                    "price" => "3.00",
                    "expire" => "共1课节/23人学习中"
                )
            )
        )
    )
);



