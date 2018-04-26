<?php

$response = array(
    'code' => 110000,
    'msg' => 'succ',
    'data' => array(
        'result' => true,
        'money' => 3,
        'id' => "3456789",
        "fav_id" => 123123
    ),
    'ts' => 123123123
);

echo json_encode($response);