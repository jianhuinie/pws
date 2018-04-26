<?php

$response = array(
    "code" => 0,
    "data" => array(
        "pager" => [
            "page" => 3,
            "count" => 56
        ],
        "list" => [
           [
                'id' => 1,
                'avatar' => 'xxxxx.jpg', //小组头像
                'name' => '出国留学',      //小组名称
                'brief' => '将对方的解放军',  //小组简介
                'is_join' => 1         //是否加入小组
            ],
            [
                'id' => 2,
                'avatar' => 'xxxxx.jpg', //小组头像
                'name' => '出国留学',      //小组名称
                'brief' => '将对方的解放军',  //小组简介
                'is_join' => 1         //是否加入小组
            ],
            [
                'id' => 3,
                'avatar' => 'xxxxx.jpg', //小组头像
                'name' => '出国留学',      //小组名称
                'brief' => '将对方的解放军',  //小组简介
                'is_join' => 0         //是否加入小组
            ]
        ]
    )
);

echo json_encode($response);