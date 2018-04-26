<?php


require("../../bootstrap.php");

$json = file_get_contents(__DIR__ . '../json/photo.json');

render(
    "teacherCenter/skin102/comment",
    array(
        "tpl_data" => json_decode($json, true)['data']
    )
);