<?php

require("../bootstrap.php");

$json = json_decode(file_get_contents('./json/orderList.json'), true);

render(
    "student_center/orderList",
    array(
        "tpl_data" => $json,
        "user_data"=> array(
            "user_type" => 2,
        )
    )
);

