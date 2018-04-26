<?php

require("../bootstrap.php");

render(
    "online/classroom",
    array(
        "tpl_data" => array(
            "params" => 'UserDBID=3&UserName=zhangnu&UserType=1&ClassID=32&ClassName=thenewclass&ClassIco=/a.png'
        )
    )
);