<?php

require('../../bootstrap.php');

$response = array(
    "code" => 0,
    "data" => array(
        "stat" => array(
            "1" => 1,
            "2" => 1526,
            "3" => 14,
            "4" => 0,
            "5" => 1,
            "6" => 62
        )
    )
);

echo json_encode($response);