<?php

require("../bootstrap.php");

$response = array(
    "code" => 100061,
    "msg" => "错误提示",
    "data" => array(
        "content" => array("测试", "测试222"),
        "title" => array("测试")
    )
);

echo json_encode($response);