<?php

require("../bootstrap.php");

render(
    "student_center/privacy",
    array(
        "tpl_data" => array(
            "trajectory_hide" => true, 
        )
    )
);

