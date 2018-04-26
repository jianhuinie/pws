<?php

require("../bootstrap.php");

render(
    "video/view",
    array(
        "tpl_data" => array(
            "is_video_course" => 1,
            "user_unique" => "123123",
            "video_unique" => "13123123",
            "payer_name" => "mark",
            "check_code" => 1231232,
            "is_ours" =>1,
            "fid" => "123123",
            "report" => array(
                "user_number" => "1321", //用户number
                "user_role" => 2, //用户角色 学生2 老师0
                "video_type" => 1, //视频类型 1:免费视频课 2:收费视频课 3:老师介绍 4:机构介绍 int
                "video_id" => 1231,//视频ID标示
                "client" => 1, //客户端类型 1iphone 2ipad 3Android 4手机m站 5pc网页int
                "app" => 1, //app类型 1学生app 2老师app 3机构app 4直播助手
                "version" => '1.2.3.3' //版本号 包括:pc版本号、前端版本号、app版本号、ipad版本号
            )
        )
    )
);