<?php

require("../../bootstrap.php");

render(
    "activity/uk/pay",
    array(
        "tpl_data" => array(
            'purchase_id' => 123,
            "zijin_host" => 12312
        ),
    )
);

