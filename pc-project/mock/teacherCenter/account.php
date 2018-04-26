<?php

require("../bootstrap.php");

render(
    "teacher_center/account",
    array(
        "tpl_data" => array(
            "sex" => 1,
            "avatar_verify" => 1,
            "mobile" => "152****1512",
            "email" => "745***587@qq.com", // 加马赛克邮箱
            "raw_email" => '745760587@qq.com', // 原始邮箱
            "pay_password" => false, // 是否设置过支付密码
            "private_show" => 1, // 1姓名 2头像
            "has_nickname" => false,
            "account_list" => [
                'sina' => true,
                'wechat' => false,
                'qq' => false,
                'alipay' => false,
                'renren' => false,
                'baidu' => true
            ],
            "activity" => [
                "verify_basic" => 'success',
                "verify_school" => 'success',
                "verify_email" => 'fail',
                "win_in_school" => '0'
            ]
        )
    )
);
