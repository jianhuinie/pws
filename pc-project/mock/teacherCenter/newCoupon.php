<?php

$response = array(
    "code" => 0,
    "msg" => "这是错误信息吧",
    "data" => array(
        'url' => 'http:/www.genshuixue.com/getCoupon?coupon_number=ac2b4ce0817bc9921fb459da5ec52be2' // 优惠券地址
    ),
    "ts" => 1416034743
);

echo json_encode($response);