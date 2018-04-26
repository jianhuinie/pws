<?php

require("../bootstrap.php");

$homePage = file_get_contents("./json/homePage.json");

render(
    "kaoyan/homePage",
    array(
        "tpl_data" => json_decode($homePage, true)
    )

);