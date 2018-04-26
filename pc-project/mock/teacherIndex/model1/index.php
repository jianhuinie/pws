<?php


require("../../bootstrap.php");

$json = file_get_contents(__DIR__ . '../../json/index.json');

render(
    "teacherCenter/skin101/index",
    array(
        "tpl_data" => json_decode($json, true)['data']
    )
);