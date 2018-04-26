<?php

$response = array(
    "code" => 0,
    "msg" => "没有权限",
    "data" => array(
        // "url" => "http://dev-cyl.genshuixue.com/video/view/109133"
        "url" => "http://172.24.29.15:8080/mock/video/view.php"
    )
);

echo json_encode($response);

