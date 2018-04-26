<?php

$response = array(
    "code" => 991109, // 991109
    "msg" => "这是错误信息",
    "data" => array(
        // 这里需要返回省市区的id及name吧
        "new_course" => 1,
        "video_course_number" => "16031583063",
        // "video_section_id" => "16031544824",
        "state" => 6
    ),
    "ts" => 1415555555
);

/*
 *  'state'：
 *  可编辑包括：待发布-5，转码失败-2，审核失败-4，已下架-7；
 *  需下架包括：售卖中-6；
 *  需取消包括：转码中-1，审核中-3
 */

echo json_encode($response);