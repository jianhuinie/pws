<?php

require("../bootstrap.php");

render(
    "teacher_center/addCouponSuccess",
    array(
        "tpl_data" => array(
            "id" => 2366,
            "serial_num" => "34287775315914377718",
            "sync" => "1" //0是已经勾选，1是未勾选
        ),
        "user_date" => array(
            'display_name' => 'why'
        )
    )
);



