<?php

function getData() {
    if (true) { // (floor(microtime() * 1000) % 2)
        return array(
            "code" => 1000111,
            "data" => array(),
            "msg" => "请先输入图形验证码"
        );
    }
    return array(
        "code" => 0,
        "data" => array(
            "registered" => "3"
        ),
        "msg" => "succ"
    );
}
$response = getData();


echo json_encode($response);