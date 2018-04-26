<?php

require("../bootstrap.php");

$user_type = null ;

if (isset( $_GET['user_type']) ) {
    $get_user_type = $_GET['user_type'];
    if ($get_user_type == 0 || $get_user_type == 2) {
        $user_type = $get_user_type;
    }
}
render(
    "static/seekTeacher",
    array(
        "tpl_data" => [
            "user_type" => $user_type,
            "token_name" => "token_name",
            "token_value" => "token_value"
        ]
    )
);