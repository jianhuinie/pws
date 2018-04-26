<?php

require("../bootstrap.php");

$response = array(
    'code' => 0,
    'data' => array(
        'has_pay' => true
    ),
    'msg' => 'succ'
);

echo json_encode($response);