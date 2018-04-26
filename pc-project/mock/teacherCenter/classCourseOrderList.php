<?php

require("../bootstrap.php");

$json = json_decode(file_get_contents("./json/classCourseOrderList.json"), true);

render(
    "teacher_center/classCourseOrderList",
    array(
        "tpl_data" => $json['data']
    )
);
