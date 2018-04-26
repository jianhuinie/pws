<?php

require("../bootstrap.php");

render(
    "activity/aLetter",
    array(
        "tpl_data" => array(
            'content' => '<div style="background:red">活动内容</div>',
            "title" => '一封信'
        ),
    )
);

