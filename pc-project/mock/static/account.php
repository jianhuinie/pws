<?php

require("../bootstrap.php");

render(
    "static/account",
    [
        'tpl_data' => [
            'type' => 'sina',
            'nick' => '王家小麦'
        ]
    ]
);

