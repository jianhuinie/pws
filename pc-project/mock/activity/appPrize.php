<?php

require("../bootstrap.php");

render(
    "activity/appPrize",
    array(
/*        "user_data" => array(

        ),*/
        "tpl_data" => array(
            "expired" => false,
            "has_get_prize" => false,
            "teachers" => array(
                array(
                    "name" => "name",
                    "avatar" => "http://img.gsxservice.com/10842_6cwsbfdw.jpeg",
                    "course_name" => "小学数学",
                    "city_name" => "city_name",
                    "detail_url" => "http://www.genshuixue.com/t/resuuu1140",
                    "school_age" => 8
                ),
                array(
                    "name" => "name",
                    "avatar" => "http://img.gsxservice.com/10842_6cwsbfdw.jpeg",
                    "course_name" => "小学数学",
                    "city_name" => "city_name",
                    "detail_url" => "http://www.genshuixue.com/t/resuuu1140",
                    "school_age" => 8
                ),
                array(
                    "name" => "name",
                    "avatar" => "http://img.gsxservice.com/10842_6cwsbfdw.jpeg",
                    "course_name" => "小学数学",
                    "city_name" => "city_name",
                    "detail_url" => "http://www.genshuixue.com/t/resuuu1140",
                    "school_age" => 8
                ),
                array(
                    "name" => "name",
                    "avatar" => "http://img.gsxservice.com/10842_6cwsbfdw.jpeg",
                    "course_name" => "小学数学",
                    "city_name" => "city_name",
                    "detail_url" => "http://www.genshuixue.com/t/resuuu1140",
                    "school_age" => 8
                ),
                array(
                    "name" => "name",
                    "avatar" => "http://img.gsxservice.com/10842_6cwsbfdw.jpeg",
                    "course_name" => "小学数学",
                    "city_name" => "city_name",
                    "detail_url" => "http://www.genshuixue.com/t/resuuu1140",
                    "school_age" => 8
                ),
                array(
                    "name" => "name",
                    "avatar" => "http://img.gsxservice.com/10842_6cwsbfdw.jpeg",
                    "course_name" => "小学数学",
                    "city_name" => "city_name",
                    "detail_url" => "http://www.genshuixue.com/t/resuuu1140",
                    "school_age" => 8
                ),
                array(
                    "name" => "name",
                    "avatar" => "http://img.gsxservice.com/10842_6cwsbfdw.jpeg",
                    "course_name" => "小学数学",
                    "city_name" => "city_name",
                    "detail_url" => "http://www.genshuixue.com/t/resuuu1140",
                    "school_age" => 8
                ),
                array(
                    "name" => "name",
                    "avatar" => "http://img.gsxservice.com/10842_6cwsbfdw.jpeg",
                    "course_name" => "小学数学",
                    "city_name" => "city_name",
                    "detail_url" => "http://www.genshuixue.com/t/resuuu1140",
                    "school_age" => 8
                ),
                array(
                    "name" => "name",
                    "avatar" => "http://img.gsxservice.com/10842_6cwsbfdw.jpeg",
                    "course_name" => "小学数学",
                    "city_name" => "city_name",
                    "detail_url" => "http://www.genshuixue.com/t/resuuu1140",
                    "school_age" => 8
                ),
                array(
                    "name" => "name",
                    "avatar" => "http://img.gsxservice.com/10842_6cwsbfdw.jpeg",
                    "course_name" => "小学数学",
                    "city_name" => "city_name",
                    "detail_url" => "http://www.genshuixue.com/t/resuuu1140",
                    "school_age" => 8
                )
            ),
            "activity_rule"=> [
                "1. 奖学金最多可抵扣10%的订单金额。",
                "2. 奖学金不可直接提现。",
                "3. 奖学金自领取之日起90天内有效。",
                "4. 返现记录可在个人中心钱包管理中查看。",
                "5. 同一手机设备，只奖励首次登录的邀请者5元现金。"
            ],
            "activity_time_msg" => "跟谁学千万奖学金活动，不设活动期限，奖学金领完为止。"
        )
    )
);

