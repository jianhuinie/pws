<?php

$response = array(
    "code" => 0,
    "msg" => "这是错误信息吧",
    "data" => array(
        "name" => array(
            "六四事件",
            "习近平",
            "六四事件",
            "习近平",
            "六四事件",
            "习近平",
            "六四事件",
            "习近平",
            "六四事件",
            "习近平"
        ),
        "target" => array(
            "法轮大法"
        ),
        "student_desc" => array(
            "金钟罩",
            "铁布衫"
        )
    ),
    "ts" => 1416034743
);

echo json_encode($response);