<?php


require("../../bootstrap.php");

$json = file_get_contents(__DIR__ . '../../json/article.json');

render(
    "teacherCenter/skin102/article",
    array(
        "tpl_data" => json_decode($json, true)['data']
    )
);