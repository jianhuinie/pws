<?php


require("../bootstrap.php");

render(
    "teacher_center/upsertTrialCourse",
    array(
        "tpl_data" => array(
            'support_online_only' => true, // 白名单用户（北京市K12老师）
            "id" => '',
            "switch_flag" => "1", // 控制开关 1开 0关
            "length" => 60, // 课时，分钟为单位
            "price_online" => '5.00', // 线上价格
            "price_offline" => '10.01', // 线下价格
        )
    )
);

/*

$response = array(
    "code" => 0,
    "msg" => "ok",
    "data" => array(

    )
);

echo json_encode($response);

*/