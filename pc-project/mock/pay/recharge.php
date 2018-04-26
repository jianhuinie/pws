<?php

require("../bootstrap.php");

render(
    "pay/recharge",
    array(
        "tpl_data" => array(
            //"result" => false,
            "money" => 1234,
            "account" => array(
                "balance" => 150
            )
        )
    )
);
