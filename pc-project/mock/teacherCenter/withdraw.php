<?php

require("../bootstrap.php");

render(
    "teacher_center/withdraw",
    array(
        "tpl_data" => array(
            "bank_card" => array(
                "id" => "4",
                "user_id" => "59",
                "card_owner_name" => "zhujl",
                "bank_name" => "招商银行",
                "bank_no" => "ccb",
                "bank_id" => "icbc",
                "card_open_location" => "test",
                "card_num" => "123123123123123123",
                "region" => "北京_北京市_密云县"
            ),
            "account" => array(
                "balance" => 5000000,
                "mobile" => "13412345678",
                "mobile_mask" => "134****5678",
                "has_password" => false,
                "available_withdraw_count" => 4
            ),
            "json" => array(
                "key1" => 'asd"saddd"',
                "key2" => "123'213123'123"
            )

        )
    )
);
