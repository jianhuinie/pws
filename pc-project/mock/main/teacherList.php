<?php

$response = array(
    "code" => 0,
    "msg" => '成功',
    "data" => [
        [
            "avatar_url" => "http://img.gsxservice.com/0cms/d/file/content/2015/07/559a27bf9aa51.jpg",
            "detail_url" => "http://www.baidu.com",
            "name" => "SDK",
            "course" => "高中测语文",
            "experience" => "8",
            "qid" => "8",
            "number" => "3248",
            "isLocal" => 1,
            "status" => "",
            "address" => "北京-海淀"
        ],
        [
            "avatar_url" => "http://img.gsxservice.com/0cms/d/file/content/2015/07/559a27bf9aa51.jpg",
            "detail_url" => "http://www.baidu.com",
            "name" => "咳咳咳",
            "course" => "高中化学",
            "qid" => "12334",
            "number" => "1sada2334",
            "experience" => "-1",
            "isLocal" => 0,
            "status" => "可在线搜课"
        ]
    ]
);

echo json_encode($response);