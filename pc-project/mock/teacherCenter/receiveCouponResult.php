<?php

$response = array(
    "code" => 0,
    "msg" => "这是错误信息吧",
    "data" => array(
        'balance' => 5 // 优惠券面额
    ),
    "ts" => 1416034743
);

echo json_encode($response);