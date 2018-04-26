<?php

$response = array(
    "code" => 0, // 200001 评论已存在
    "msg" => "comment exist already",
    "data" => array(
/*        "extra" => array(
            "coupon" => array(
                "type" => 1,
                "title1" => "感谢您的评价",
                "title2" => "9折优惠券",
                "title3" => "已进入您的钱包"
            )
        )*/
    ),
    "ts" => 14123123
);

echo json_encode($response);