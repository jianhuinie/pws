<?php

$response = array(
    "code" => 0,
    //"code" => 100061,
    "msg" => "",
    "data" => array(
        'number' => 1234
        // "title" => array(
        //     "六四事件",
        //     "习近平"
        // ),
        // "introduce" => array(
        //     "法轮大法"
        // ),
        // "label_ids" => array(
        //     "日月神教"
        // )
    )
);

echo json_encode($response);

