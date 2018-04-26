<?php

require("../bootstrap.php");

$json = json_decode(file_get_contents('./json/gaokao.json'), true);

render(
    "activity/wish",
    array(
        "tpl_data" => $json
    )
);