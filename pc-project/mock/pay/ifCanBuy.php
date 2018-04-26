<?php

$response = array(
    'code' => 100014,
    'msg' => '您已购买该班课',
    'data' => array(
        'purchase_id' => 123123123
    ),
    'ts' => 1425117877
);

echo json_encode($response);