<?php

$response = array(
    "code" => 0,
    "msg" => '',
    "data" => array(
        'white_trial_flag' => 1, // 试听课白名单
        'is_site_trial' => 0,
        'audit' => array(
            'profile' => '0',
            'course_and_combo' => '1',
            'user_cert' => '2',
            'address' => '2',
            'video' => '3'
        ),
        "manager_one_on_one_course_permission" => 1
    )
);

echo json_encode($response);