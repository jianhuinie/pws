<?php

require("../bootstrap.php");

render(
    "pay/vip",
    array(
        "tpl_data" => array(
            "op_type" => 0,
            "vip_type" => 1,
            "vip_type_list" => [
                [
                    "days" => 365,
                    "vip_type" => 1,
                    "pay_money" => 1980,
                    "price" => 3000,
                ],
                [
                    "days" => 365,
                    "vip_type" => 2,
                    "pay_money" => 3980,
                    "price" => 3980,
                    "deduct" => 1000,
                ],
                [
                    "days" => 365,
                    "vip_type" => 3,
                    "pay_money" => 7980,
                    "price" => 7980,
                    "deduct" => 1000,
                ]
            ]
        )
    )
);
