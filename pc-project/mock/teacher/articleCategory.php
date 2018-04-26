<?php

require("../bootstrap.php");


$tpl_data = array(
    "tpl_data" => array(
        "is_self" => 1,
        "total" => 202,
        "category_list" => array(
            array(
                "id" => 1,
                "name" => "默认分类",
                "num" => 11,
                "is_default" => 1
            ),
            array(
                "id" => 2,
                "name" => "<a>分类2</a>",
                "num" => 10,
                "is_default" => 0
            ),
            array(
                "id" => 3,
                "name" => "分类3是肯定还是打算打算大声道是的",
                "num" => 9,
                "is_default" => 0
            )
        )
    )
);

$response = array(
    "code" => 0,
    "data" => array(
        "category_list" => $tpl_data['tpl_data']['category_list'],
        "tpl" => array(
            "category_list" => fetch('teacher/newDetail/articleCategory', array(
                'tpl_data' => $tpl_data['tpl_data']
            ))
        )
    )
);

echo json_encode($response);