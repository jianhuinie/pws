<?php
require("../../../bootstrap.php");
$response = array(
    'code' => 0,
    'data' => array(
        "view_count"=> 110
    )
);

echo json_encode($response);