<?php

$response = array(
    "code" => 0,
    "msg" => '',
    "data" => array(
        "avatar" => "http://test.img.genshuixue.com/headpic_woman.png",
        "display_name" => "",
        "mobile" => '152****1512',
        "org_id" => 232, // 机构老师的话有非0id
        "ori_mobile" => '',
        "source_sys_id" => '8888',
        "user_name" => "1沈佳宜沈佳宜沈佳宜",
        "user_name_cut" => "沈佳宜...",
        "user_number" => "1212312312",
        "user_type" => 2
    )
);

echo json_encode($response);