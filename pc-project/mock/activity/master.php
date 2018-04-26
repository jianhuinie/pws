<?php

require("../bootstrap.php");

render(
    "activity/master",
    array(
        "tpl_data" => array(
            'content' => '<div style="background:red">master活动内容</div>',
            "title" => 'master活动名字'
        ),
    )
);

