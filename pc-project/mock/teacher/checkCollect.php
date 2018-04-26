<?php

require("../bootstrap.php");

$response = array(
    "code" => 0,
    "msg" => "",
    "data" => array(
        "is_favored" => false
    )
);

echo json_encode($response);