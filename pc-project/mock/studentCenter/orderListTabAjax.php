<?php


$response = array(
    "code" => 0,
    "message" => "请求成功",
    "data" => array(
        "all" => "552",
        "waiting_for_pay" => "2",
        "wip" => "268",
        "comment" => 89,
        "canceled" => "144"
    ) 
);

echo json_encode($response);
