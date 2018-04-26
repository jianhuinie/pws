<?php

require("../bootstrap.php");

render(
    "activity/center",
    array(
        "tpl_data" => array(
            'content' => '<div style="background:red">活动内容</div>',
            "title" => '活动名字',
            "keywords" => 'keywords,keywords,keywords',
            "description" => 'description,descriptiondescription'
        ),
    )
);

