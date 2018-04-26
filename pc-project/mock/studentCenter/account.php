<?php

require("../bootstrap.php");

render(
    "student_center/account",
    array(
        "tpl_data" => array(
            "mobile" => "15********47",
            "email" => "745***587@qq.com", // 加马赛克邮箱
            "raw_email" => '745760587@qq.com', // 原始邮箱
            "pay_password" => true,
            "account_list" => [
                'sina' => true,
                'wechat' => true,
                'qq' => true,
                'alipay' => true,
                'renren' => true,
                'baidu' => true
            ],
            "avatar_verify" => '111',
            "activity" => array(
                "win_in_school" => 1, // 1参加活动 0未参加活动
                "verify_basic" => "success", // 成功
                "verify_school" => "fail", // 失败
                "verify_email" => "success"
            )
        )
    )
);

