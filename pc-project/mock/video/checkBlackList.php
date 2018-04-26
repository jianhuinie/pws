<?php

$response = array(
    "code" => 0,
    "msg" => '发送失败',
    "data" => array(
       "course_type" => 1,
        "course_number" => 16110595235 ,
        "black_list_limited" => false
    )
);

echo json_encode($response);