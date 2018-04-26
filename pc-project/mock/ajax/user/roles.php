<?php

$response = array(
    "code" => 0,
    "msg" => '发送成功',
    "data" => array(
        "roles" => array(
            "0", "1"
        )
    )
);

echo json_encode($response);