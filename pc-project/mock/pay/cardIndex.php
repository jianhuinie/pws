<?php

require("../bootstrap.php");

$response = array(
    'code' => 0,
    'data' => array(
        'user_id_no' => '360426****1234',
        'user_name' => '朱佳璐',
        'user_mobile' => '158****1234',
        'pay_day' => '2万',
        'pay_each' => '2千'
    ),
);

echo json_encode($response);