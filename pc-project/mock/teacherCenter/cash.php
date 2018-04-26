<?php

require("../bootstrap.php");

render(
    "teacher_center/cash",
    array(
        "tpl_data" => array(
            "rule" => array(
                "desc" => [
                    "1. 奖学金最多可抵扣10%的订单金额",
                    "2. 奖学金不可直接提现",
                    "3. 你的奖学金有效期至2015年3月20日"
                ]
            ),
            "account" => array(
                "balance" => 10.0,
                "expect_earning" => 5253.30,
                "income" => 234534.30,
                "total_prize" => "200",
            ),

            "bank_card" => array(
                'id' => '123',
                "card_id" => "213",
                "card_name" => "招商银行",
                "card_num" => "12123123",
                "bank_no" => 'ABC'
            ),
            "history" => array(
                array(
                    "create_time"=>"2014-07-28 11:11",
                    "op_info"=>"招商银行尾号1122",
                    "op_type"=>"3",
                    "pre_balance" => 2,
                    "curr_balance" => 3,
                    "op_money"=> "+10.00"
                ),
                array(
                    "create_time"=>"2014-07-28 11:11",
                    "op_info"=>"招商银行尾号1122",
                    "op_type"=>"2",
                    "pre_balance" => 2,
                    "curr_balance" => 3,
                    "op_money"=> "-10.00"
                ),
                array(
                    "create_time"=>"2014-07-28 11:11",
                    "op_info"=>"招商银行尾号1122",
                    "op_type"=>"1",
                    "pre_balance" => 2,
                    "curr_balance" => 3,
                    "op_money"=> "+10.00"
                ),
                array(
                    "create_time"=>"2014-07-28 11:11",
                    "op_info"=>"招商银行尾号1122",
                    "op_type"=>"5",
                    "pre_balance" => 2,
                    "curr_balance" => 3,
                    "op_money"=> "-10.00"
                ),
            ),
            "history_list_tpl" => array(
                "pager" => array(
                    'page' => 1,
                    'size' => 10,
                    'amount' => 54
                ),
                "userType" => 0
            ),
            "fine_money" => 0,
            "fine_description" => "您因违规线下交易扣款100元，请在7日内通过充值或课酬代扣缴纳所有欠款，逾期将会影响您在跟谁学的展示"
        )
    )
);