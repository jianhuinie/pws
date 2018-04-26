<?php

$response = array(
    "code" => 0,
    "data" => array(
        "conflict_lessons" => array(
            array(
                "student_name" => "马小威",
                "teacher_name" => "马大威"
            )
        )
    )
);

echo json_encode($response);