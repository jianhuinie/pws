<?php


require("../../bootstrap.php");

$json = file_get_contents(__DIR__ . '../../json/comment.json');

render(
    "teacherCenter/skin101/comment",
    array(
        "tpl_data" => json_decode($json, true)['data']
    )
);