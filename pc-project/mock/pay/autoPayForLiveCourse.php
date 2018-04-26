<?php

require("../bootstrap.php");

$response = array(
    'code' => 0,
    'data' => array(
        'lessons' => array(
            array(
                'online_data' => array(
                    "location" => "http://test.genshuixue.com/live/lesson?serial_number=151009781522",
                    "mode" => 1,
                    "timestamp" => 1444357790,
                    "token" => "dmNwYmhyaWdyOHI0M3Y0cnFzdTk0ZjNoYzc="
                ),
                'serial_number' => '151009781522',
                'time' => '2015-09-09 8:00 - 9:00'
            ),
            array(
                'online_data' => array(
                    "location" => "http://test.genshuixue.com/live/lesson?serial_number=151009781522",
                    "mode" => 1,
                    "timestamp" => 1444357790,
                    "token" => "dmNwYmhyaWdyOHI0M3Y0cnFzdTk0ZjNoYzc="
                ),
                'serial_number' => '151009781522',
                'time' => '2015-09-09 8:00 - 9:00'
            ),
        )
    ),
    'msg' => 'succ'
);

echo json_encode($response);