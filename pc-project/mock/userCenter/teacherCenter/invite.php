<?php

require("../../bootstrap.php");

render(
    "userCenter/teacherCenter/invite",
    array(
        "tpl_data" => array(
            "is_org_teacher" => 0,
            "invite_link" => "http://www.genshuixue.com",
            "invited_num" => 3,
            "privilege_days" => 30,
            "limit_privilege_days" => 50,
            "viewPrevilege_link" => "http://www.genshuixue.com",
            "evaluate_link" => "http://www.genshuixue.com",
            "verify_status" => 1,
            "invited_users" => array(
                array(
                    "name" => "用户名1",
                    "mobile" => "13512345678",
                    "register_status" => "已注册",
                    "effective_status" => "已生效",
                    "reward_status" => "已奖励30天"
                ),
                array(
                    "name" => "用户名1",
                    "mobile" => "13512345678",
                    "register_status" => "已注册",
                    "effective_status" => "已生效",
                    "reward_status" => "已奖励30天"
                ),
                array(
                    "name" => "用户名1",
                    "mobile" => "13512345678",
                    "register_status" => "已注册",
                    "effective_status" => "已生效",
                    "reward_status" => "已奖励30天"
                )
            )
        )
    )
);