<?php

$response = array(
    "code" => 0,
    "msg" => "这是错误信息吧",
    "data" => array(
        'status' => 0, // 0 成功 1-5失败
        'url' => 'http://www.baidu.com/' // 教师主页绝对地址
    ),
    "ts" => 1416034743
);

echo json_encode($response);