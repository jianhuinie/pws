<?php

require("../bootstrap.php");

render(
    "activity/xiaoyuan",
    [
        "tpl_data" => [
            "curr_city_name" => "北京",
            "win_in_school" => 2,
            "verify_basic" => "fail",
            "verify_school" => "success",
            "verify_email" => "success"


        ]
    ]
);