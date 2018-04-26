<?php

$response = array(

    "code" => 100051,
    "data" => array(
        "conflict_lessons" => array(
            array(
                "teacher_id" => 2,
                "student_id" => 2123,
                "teacher_name" => "苏剑南",
                "student_name" => "王小明",
                "type" => 2
            )
        )
    )
);

echo json_encode($response);