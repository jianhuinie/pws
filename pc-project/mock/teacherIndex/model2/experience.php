<?php


require("../../bootstrap.php");

$json = file_get_contents(__DIR__ . '../../json/experience.json');

render(
    "teacherCenter/skin102/experience",
    array(
        "tpl_data" => json_decode($json, true)['data']
    )
);