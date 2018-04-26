<?php

require("../bootstrap.php");

$username = array("1962fdf74db5559", "f00f9e3a", "12b323af16e67c13c24c22ed195a6fdd");
$password = array("5599c012", "e721c4b6", "7c13c24c");
srand((double)microtime()* 1000000);
$index = 0;//rand()%2;


$arr = range(1, 3);
foreach ($arr as &$val) {

}

render(
    "im/main",
    array(
        "tpl_data" => array(
            // 帐号1：1962fdf74db5559 帐号2：f00f9e3a
            "im_user_name" => $username[$index],
            // 帐号1：5599c012 帐号2：e721c4b6
            "password" => $password[$index],
            "app_key" => "baijiahulian#baijiahulian"
        )
    )
);

