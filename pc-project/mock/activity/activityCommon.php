<?php

require("../bootstrap.php");

render(
    "activity/activityCommon",
    array(
        "tpl_data" => array(
            'content' => '<div style="background:red">活动内容</div>'
        ),
       "name" => '活动名字'
    )
);

