<?php

    require('../bootstrap.php');


    $response = json_decode(file_get_contents('../json/polling.json'), true);

    $a = 0;

    if ($a) {
        echo(json_encode($response));
    }
    else {
        echo(
            json_encode(
                array(
                    "code" => 0,
                    "data"=> array()
                )
            )
        );
    }

