<?php

require("../bootstrap.php");

render(
    "activity/volunteer",
    array(
        "tpl_data" => array(
            'content' => '<div style="background:red">活动内容</div>',
            "title" => '活动名字'
        ),
    )
);
