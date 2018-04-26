<?php

require("../bootstrap.php");

$json = file_get_contents("./json/orderDetail.json");

render(
    "teacher_center/orderDetail",
    [
        "tpl_data" => json_decode($json, true)['data']
    ]
);

