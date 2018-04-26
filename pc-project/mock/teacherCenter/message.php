<?php

require("../bootstrap.php");

render(
    "teacher_center/message",
    array(
        "tpl_data" => array(
            "sys_messages" => array(
                "list" => array(
                    array(
                        "msg_id" => "1212",
                        "msg" => "曾经有一条珍贵的信息发送到我的邮箱，我没有好好查收，等到我看到它的时候，我才知道，优惠券已经过期了，如果上天再给我一次机会，我会对那条信息说，我想立马查收你，如果给这个动作一个响应时间，我希望是一瞬间！",
                        "ext_date" => "2010-10-10",
                        "ext_type" => "订单"

                    ),
                    array(
                        "msg_id" => "1212",
                        "msg" => "曾经有一条珍贵的信息发送到我的邮箱，我没有好好查收，等到我看到它的时候，我才知道，优惠券已经过期了，如果上天再给我一次机会，我会对那条信息说，我想立马查收你，如果给这个动作一个响应时间，我希望是一瞬间！",
                        "ext_date" => "2010-10-10",
                        "ext_type" => "订单"

                    ),
                    array(
                        "msg_id" => "12aa12",
                        "msg" => "曾经有一条珍贵的信息发送到我的邮箱，我没有好好查收，等到我看到它的时候，我才知道，优惠券已经过期了，如果上天再给我一次机会，我会对那条信息说，我想立马查收你，如果给这个动作一个响应时间，我希望是一瞬间！",
                        "ext_date" => "2010-10-10",
                        "ext_type" => "订单"

                    )
                ),
                "has_more" => 1
            ),
            'message_setting' => [

                'default_setting' => [
                    'pay_order',
                    'reserve_course',

                    'confirm_course',
                    'cancel_course',
                    'remind_1day_before',
                    'remind_1hour_before'
                ],

                'setting' => [
                    'submit_order',
                    'confirm_course',
                    'cancel_course',
                    'remind_1day_before',
                    'remind_1hour_before'
                ],

                'nodisturb' => 1,
                'nodisturbtime' => '23:00-08:00'
            ]
        )
    )
);