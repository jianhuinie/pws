<?php

require("../bootstrap.php");

render(
    "message/mail",
    array(
        "tpl_data" => array(
            "more" => 0,
            "mail_count" => 10,
            "announcement_count" => 20,
            "message_list" => array(

                array(
                    "checked" => "checked",
                    "content" => "曾经有一条珍贵的信息发送到我的邮箱，我没有好好查收，等到我看到它的时候，
                                    我才知道，优惠券已经过期了，如果上天再给我一次机会，我会对那条信息说，
                                    我想立马查收你，如果给这个动作一个响应时间，我希望是一瞬间！",
                    "date" => "2010-10-10",
                    "type" => "course"
                ),
                array(
                    "checked" => false,
                    "content" => "曾经有一条珍贵的信息发送到我的邮箱，我没有好好查收，等到我看到它的时候，
                                    我才知道，优惠券已经过期了，如果上天再给我一次机会，我会对那条信息说，
                                    我想立马查收你，如果给这个动作一个响应时间，我希望是一瞬间！",
                    "date" => "2010-10-11",
                    "type" => "order"
                )

            )
        )
    )
);