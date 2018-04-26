<?php

require("../bootstrap.php");

render(
    "activity/sendMoney",
    array(
        "tpl_data" => array(
            'content' => '<div style="background:red">活动内容</div>',
            "title" => '活动名字',
            "progress" => array(
                'area' => true,
                'bio' => false,
                'case' => false,
                'photo' => false,
                'login_app' => true,
                'all' => false
            )
        ),
    )
);