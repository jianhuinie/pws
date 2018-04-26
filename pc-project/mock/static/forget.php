<?php

require("../bootstrap.php");

$tpl_location = 'static/forget';

render(
    $tpl_location,
    array(
        "name" => "try",
        "tpl_data" => array(
            "type" => 1, // 找回密码类型 1登录密码 2支付密码
            "mask" => "138****1"
        )
    )
);

