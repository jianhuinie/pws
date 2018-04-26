<?php

$response = array(
    "code" => 0,
    "msg" => "这是错误信息吧",
    "data" => array(
        "note" => '假如初始有备注信息的话～～'
    ),
    "ts" => 1416034743
);

echo json_encode($response);