<?php

require("../bootstrap.php");

render(
    "teacher_center/uploadVideo",
    array(
        "tpl_data" => array(
            "report" => array( //视频上传上报
                "user_number" => "1321", //用户number
                "user_role" => 2, //用户角色 学生2 老师0
                "client" => 1, //客户端类型 1iphone 2ipad 3Android 4手机m站 5pc网页int
                "app" => 1, //app类型 1学生app 2老师app 3机构app 4直播助手
                "version" => '1.2.3.3' //版本号 包括:pc版本号、前端版本号、app版本号、ipad版本号
            )
        )
    )
);