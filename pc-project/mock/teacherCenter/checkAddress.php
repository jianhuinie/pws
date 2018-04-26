<?php

$response = array(
    "code" => 0,
    "msg" => "这是错误信息吧",
    "data" => array(
        // 这里需要返回省市区的id及name吧
        'match_area' => array(
            'id' => 16777218,
            'name' => '海淀'
        )
    ),
    "ts" => 1415555555
);

echo json_encode($response);