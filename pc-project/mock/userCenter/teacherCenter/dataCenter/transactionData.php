<?php

require("../../../bootstrap.php");


$json = json_decode(file_get_contents('./json/transactionData.json'), true);

render(
    "userCenter/teacherCenter/dataCenter/transactionData",
    array(
        "tpl_data" => $json
    )
);

