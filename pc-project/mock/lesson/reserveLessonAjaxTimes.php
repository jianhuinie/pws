<?php

$response = array(
    "code" => 0,
    "msg" => "这是错误信息吧",
    "data" => array(
        // 最大可重复次数
        'times' => 10
    ),
    "ts" => 1416034743
);

echo json_encode($response);