<?php

require("../bootstrap.php");

render(
    "student_center/withdraw",
    array(
        "tpl_data" => array(
            "balance" => 5000000,
            "bank_card_id" => 12,
            "bank_name" => '招商银行',
            "bank_code" => 'cmb',
            "card_num" => '**1289',
            "withdraw_num" => '2',
            "has_pay_password" => false,

            "mobile" => "13612345678"

        )
    )
);
