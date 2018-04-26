<?php

require("../bootstrap.php");

$json = file_get_contents(__DIR__ . '/json/pay.json');

render(
    'pay/pay',
    array(
        "tpl_data" => array(
            "purchase_id" => "1115010566511537",
            "purchase_type" => 25,
            "need_pay_money" => 0.4,
            "course_type" => "2", // 1一对一 2班课 3视频课 4:3810微课机构班课 5试听课
            "in_activity" => 1, // 活动中 限时折扣等
            "has_passwd" => 0,
            "show_bind_card" => true,
            "notice" => "哈哈哈啊哈哈哈哈",
            "bank_info" => array(
                array(
                    "card_id" => "123123",
                    "card_no" => "************9498",
                    "card_name" => "CMB",
                    "card_type" => "D",
                    "owner_mobile" => "18911209086",
                    "card_exp" => false,
                    "unique_id" => "9bab0cd687ea3f827e08bb695f440c94",
                    "pay_day" => 20000,
                    "pay_each" => 20000,
                    "pay_flag" => 1,
                    "use_passwd" => 1
                ),
                array(
                    "card_id" => "123123",
                    "card_no" => "************2429",
                    "card_name" => "CMB",
                    "card_type" => "C",
                    "owner_mobile" => "13552611815",
                    "card_exp" => false,
                    "unique_id" => "b0a9dcf7a841405000f524c7d4b7bfaf",
                    "pay_day" => 30000,
                    "pay_each" => 30000,
                    "pay_flag" => 1,
                    "use_passwd" => 0
                ),
                array(
                    "card_id" => "123123",
                    "card_no" => "************1234",
                    "card_name" => "CMB",
                    "card_type" => "D",
                    "owner_mobile" => "18911209086",
                    "card_exp" => false,
                    "unique_id" => "9bab0cd687ea3f827e08bb695f440c94",
                    "pay_day" => 20000,
                    "pay_each" => 20000,
                    "pay_flag" => 0,
                    "use_passwd" => 1
                ),
                array(
                    "card_id" => "123123",
                    "card_no" => "************5678",
                    "card_name" => "CMB",
                    "card_type" => "C",
                    "owner_mobile" => "13552611815",
                    "card_exp" => false,
                    "unique_id" => "b0a9dcf7a841405000f524c7d4b7bfaf",
                    "pay_day" => 30000,
                    "pay_each" => 30000,
                    "pay_flag" => 0,
                    "use_passwd" => 0
                )
            ),
            'balance_pay' => [
              'balance' => "5.00",
              'help' => "金额不足,可先充值",
              'action' => "balancepay",
              'close' => false,
              'icon' => "http =>//img.gsxservice.com/0cms/d/file/content/2016/06/576268b270ff7.jpg",
              'has_pay_password' => true,
              'can_use_balance' => false,
            ],
            'can_use_fenqi' => true
        )
    )
);

