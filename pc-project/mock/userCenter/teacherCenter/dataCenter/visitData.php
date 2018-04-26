<?php

require("../../../bootstrap.php");


$json = json_decode(file_get_contents('./json/visitData.json'), true);

render(
    "userCenter/teacherCenter/dataCenter/visitData",
    array(
        "tpl_data" => $json
    )
);

