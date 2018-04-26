<?php

require("../bootstrap.php");

render(
    "student_center/message",
    array(
        "tpl_data" => array(
            "sys_messages" => array(
                "list" => array(
                    array(
                        "msg_id" => "45159",
                        "msg" => "曾经有一条珍贵的信息发送到我的邮箱，我没有好好查收，等到我看到它的时候，我才知道，优惠券已经过期了，如果上天再给我一次机会，我会对那条信息说，我想立马查收你，如果给这个动作一个响应时间，我希望是一瞬间！",
                        "ext_date" => "2010-10-10",
                        "ext_type" => "订单",
                        "ext_info" => array( // 调起im，为空即为null
                            "c_id" => '3123124234', // 用户number
                            "c_role" => 0, // c_role(0老师 2学生 6机构)
                            "group_id" => 4362874
                        )
                    )
                ),
                "has_more" => 1
            ),
            "message_setting" => array(
                "default_setting" => array(
                    "s_notice_notify"
                ),
                "setting" => array(
                    "s_notice_notify"
                ),
                "nodisturb" => "0"
            ),
            "open_notify_message" => 1
        )
    )
);