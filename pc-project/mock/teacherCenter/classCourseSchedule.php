<?php

$response = array(
    "code" => 0, // 100061敏感词过滤 1各种错误
    "msg" => "这是错误信息吧",
    "data" => array(
        "is_special_time" => 1,
        "errors" => array(
            "arrangement" => "",
            "retire_flag" => "",
            "retire_length" => "",
            "chaban_flag" => "",
            "chaban_price" => "",
            "chaban_quota" => "",
            "chaban_price_flag" => "",
            "schedules" => array(
                "s1" => array(
                    "type" => 3,
                    "target" => "s2"
                ),
                "s2" => array(
                    "type" => 4,
                    "target" => "s3"
                )
            ),
        ),
        "schedules" => array(
            0 => array(
                's' => '1',
                'words' => array(
                    '八九学',
                    '把邓小平'
                )
            ),
            1 => array(
                's' => '2',
                'words' => array(
                    '八九学',
                    '把邓小平'
                )
            ),
        ),
        "arrangement" => array(
            '八九学',
            '把邓小平'
        )
    ),
    "ts" => 1416034743
);

echo json_encode($response);