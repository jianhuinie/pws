<?php

require("../../../bootstrap.php");


$json = json_decode(file_get_contents('./json/recordPoint.json'), true);

render(
    "userCenter/teacherCenter/dataCenter/recordPoint",
    array(
        "tpl_data" => $json['data']
        //status0未申诉 1申诉中、2申诉成功、3申诉失败
    )
);
