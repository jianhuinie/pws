<?php

require("../bootstrap.php");

$tpl_data = array(
     
);

$response = array(
    "code" => 0,
    "data" => array(
        "subjects" => array (
            array (
                "id" => '22',
                'name' => '园艺'
            ),
            array (
                "id" => '2',
                'name' => '留学'
            ),
            array (
                "id" => '21',
                'name' => '中考地理'
            ),
            array (
                "id" => '11',
                'name' => '星座'
            )
        )
    )
);

echo json_encode($response);
