<?php

$response = array(
    "code" => 0,
    "data" => array(
        "comment_list" => array(
            [
                 "comment_id" => 5333,
                 "content" => "评论内容",
                 "user_id" => 442333,
                 "user_role" => 2,
                 "user_name" => "用户名称",
                 "avatar" =>  "用户头像",
                 "create_time" => "2015-09-03 10:01",
                 "update_time" => "2015-09-03 10:01"
            ]
        ),
        "has_more" => 1
    )
);

echo json_encode($response);

