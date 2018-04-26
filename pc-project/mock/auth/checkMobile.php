<?php

$response = array(
    "code" => 0,
    "data" => array(
        "exist" => 0,
        "user_type" => array(
            "teacher" => 0,
            "student" => 1
        )
    )
);

echo json_encode($response);