<?php

$response = array(
    "code" => 0,
    "data" => array(
        "pager" => [
            "page" => 3,
            "count" => 278
        ],
        "list" => [
            [
                  "post_id" => 5333,
                  "content" => "评论内容",
                  "user_id" => 442333,
                  "user_role" => 2,
                  "user_name" => "用户名称",
                  "avatar" =>  "用户头像",
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
                  "create_time" => "2015-09-03 10:01",
                  "update_time" => "2015-09-03 10:01",
                  "comment_list" => [
                        "has_more" => 1,
                        "list" => [
                            [
                                 "comment_id" => 5333,
                                 "content" => "评论内容",
                                 "user_id" => 442333,
                                 "user_role" => 2,
                                 "user_name" => "用户名称",
                                 "avatar" =>  "用户头像",
                                 "create_time" => "2015-09-03 10:01",
                                 "update_time" => "2015-09-03 10:01",
                            ]
                        ]
                  ]
            ],
            [
                  "post_id" =>5333,
                  "content" =>"评论内容",
                  "user_id" =>442333,
                  "user_role" =>2,
                  "user_name" =>"用户名称",
                  "avatar" => "用户头像",
                  "zans" =>442334,
                  "photo_list" =>[
                        [
                            "id" => "39811",
                            "name" => "冰冰的",
                            "img" => "http://test-img.gsxservice.com/333174_byhlywp9.jpeg",
                            "width" => 700,
                            "height" => 525,
                            "time_tip" => "asd",
                            "create_time" => "2015-04-14 11:54:21"
                         ]
                  ],
                  "time_tip" => "1天前",
                  "create_time" => "2015-09-03 10:01",
                  "update_time" => "2015-09-03 10:01",
                  "comment_list" => null
            ]
        ]
    )
);

echo json_encode($response);

