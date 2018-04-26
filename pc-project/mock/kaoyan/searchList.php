<?php

require("../bootstrap.php");

$searchList = file_get_contents("./json/searchList.json");

render(
    "kaoyan/searchList",
    array(
        "tpl_data" => json_decode($searchList, true)
    )

);