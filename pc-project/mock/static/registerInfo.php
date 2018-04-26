<?php

require("../bootstrap.php");

render(
    "static/registerInfo",
    array(
        "tpl_data" => array(
            "avatar" => "https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=2640989267,2550397738&fm=80",
            "sex" => 1, //1表示男的 0表示女的
            "realname" => "张三",
            "subjects" => array(
                array(
                    "name" => "小学",
                    "id" => 975,
                ),
                array(
                    "name" => "数学",
                    "id" => 975,
                ),
                array(
                    "name" => "辅导",
                    "id" => 975,
                )
            )
        )
    )
);

