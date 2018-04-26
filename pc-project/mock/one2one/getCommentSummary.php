<?php

$response = array(
    "code" => 0,
    "message" => "请求成功",
    "data" => array(
        "comment_summary" => array(
            "count" => "1",
            "score" => "4.9",
            "score_detail" => array(
                array(
                    "score" => "5", // 5星
                    "rate" => "0.5" // 好评率，总值为1
                ),
                array(
                    "score" => "4",
                    "rate" => "0"
                ),
                array(
                    "score" => "3",
                    "rate" => "0.5"
                ),
                array(
                    "score" => "2",
                    "rate" => "0"
                ),
                array(
                    "score" => "1",
                    "rate" => "0"
                )
            )
        )

    )
);


echo json_encode($response);