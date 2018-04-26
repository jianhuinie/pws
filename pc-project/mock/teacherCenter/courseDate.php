<?php

require("../bootstrap.php");

render(
    "teacher_center/courseDate",
    array(
        "tpl_data" => array(

            "teacher_usabletime_desc" => '描述描述我的可授课时间安排',
            "audits" => array( // 审核具体信息
                "usabletime_desc" => array( // 可授课时间
                    'verify_status' => 2, // 0审核中 1通过 2未通过 3未填写该字段，无审核
                    'reasons' => array(
                        "人傻",
                        "钱多",
                        "速来"
                    )
                )
            )
        )
    )
);

