<?php

$response = array(
    "code" => 0,
    "data" => array(
        "pager" => [
            "page" => 3,
            "count" => 107
        ],
        //帖子
        "list" => [
            [
                "thread_id" => 5333,
                "name" => "帖子标题",
                "summary" => "帖子摘要",
                "user_id" => 442333,
                "user_role" => 2,
                "user_name" => "用户名称",
                "avatar" => "用户头像",
                "link" => "帖子链接",
                "posts" => 4444,
                "zans" => 45555,
                "photo_list" => [
                    [
                        "id" => "39811",
                        "name" => "冰冰的",
                        "img" => "http://test-img.gsxservice.com/333174_byhlywp9.jpeg",
                        "width" => 700,
                        "height" => 525,
                        "create_time" => "2015-04-14 11:54:21"
                    ]
                ],
                "time_tip" => "1小时前",
                "is_good" =>  1,  //1精品
                "is_top" =>  1,  //1精品
                "is_new" =>  1,   //1新帖
                "create_time" => "2015-09-03 10:01",
                "update_time" => "2015-09-03 10:01"
            ]
        ]
    )
);

echo json_encode($response);