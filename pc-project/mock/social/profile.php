<?php

require("../bootstrap.php");

render(
    "social/userInfo",
    array(
       "tpl_data" => array(
            "nickname" => "",
            "avatar" => "12",
            "avatar_url" => 'http://test-img.gsxservice.com/389840_4b4ljvdh.jpeg'
        )
    )
);