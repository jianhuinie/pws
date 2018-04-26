<?php

require("../bootstrap.php");

render(
    "classCourse/trialEnd",
    array(
        "tpl_data" => array(
            "trial_minutes" => 20,
            "enroll_url" => "http://www.baidu.com",
            "detail_url" => "http://www.baidu.com",
            "room_no" => "13344233",
            "coupon" => array(
                "serial_num" => "19494066340872",
                "balance" => 50,
                "cond_threshold" => 0,
                "status" => 1,
                "cond_course_type" => 2
            )
        )
    )
);

