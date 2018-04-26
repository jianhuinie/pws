<?php

require("../bootstrap.php");

render(
    "student_center/bindCard",
    array(
        "tpl_data" => array(
            "user_name" => "哈哈",
            "owner_name" => "xxx",
            "bank_name" => "招商银行",
            "bank_no" => 'CMB',
            "region" => '广东_广州_增城',
            "location" => "asdasdasd",
            "card_num" => '6624123421312312'
        )
    )
);
