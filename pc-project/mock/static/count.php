<?php

$response = array(
    "code" => 0,
    "msg" => "这是错误信息吧",
    "data" => array(
        "teacher" => "15万",
        "student" => "50万",
        "org" => "5555万"
    ),
    "ts" => 1415555555
);

echo json_encode($response);