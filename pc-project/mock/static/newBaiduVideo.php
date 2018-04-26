<?php

require("../bootstrap.php");

render(
    "static/newBaiduVideo",
    array(
        "tpl_data" => json_decode(file_get_contents('./json/newBaiduVideo.json'), true)
//            array(
//            'basename'=>'newBaiduVideo'
//        )
    )
);

