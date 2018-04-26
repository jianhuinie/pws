<?php


require("../../bootstrap.php");

$json = file_get_contents(__DIR__ . '../json/course.json');

render(
    "teacherCenter/skin301/course",
    array(
        "tpl_data" => json_decode($json, true)['data']
    )
);