<?php

$response = array(
    array(
        'name' => '北京',
        'id' => 170,
        'level' => 5
    ),
    array(
        'name' => '河北省',
        'id' => 180,
        'level' => 2
    ),
    array(
        'name' => '河南省',
        'id' => 190,
        'level' => 2
    ),
    array(
        'name' => '香港特别行政区',
        'id' => 200,
        'level' => 2
    )
);

echo json_encode($response);