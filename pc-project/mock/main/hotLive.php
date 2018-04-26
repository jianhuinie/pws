<?php

$response = array(
    "code" => 0,
    "msg" => '成功',
    "data" => [
        "qid" => '32143214', // 数据搜索用
        "today" => [
                   ],
        "tomorrow" => [
            ["begin_time" =>1448316000, "end_time" =>1448380800, "number" => "12121", "is_cms" => 1, "name" => "课程名称课程名称课程名称", "link" => "", "img" => "", "plan" => "05.26"],
            ["begin_time" =>1448316000, "end_time" =>1448380800, "number" => "12121", "is_cms" => 1, "name" => "课程名称", "link" => "", "img" => "", "plan" => "05.26"],
            ["begin_time" =>1448316000, "end_time" =>1448380800, "number" => "12121", "is_cms" => 1, "name" => "课程名称", "link" => "", "img" => "", "plan" => "05.26"]

        ],
        "day_after_tomorrow" => [
            
        ]
    ]
);

echo json_encode($response);