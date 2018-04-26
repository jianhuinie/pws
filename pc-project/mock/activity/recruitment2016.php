<?php

/**
 * @file Recruitment presentation for 2016
 * @author kuanghongrui@baijiahulian.com
 */

require("../bootstrap.php");

$json = json_decode(file_get_contents('./json/recruitment2016.json'), true);

render(
        "activity/recruitment2016",
        array(
                "tpl_data" => $json
        )
);

?>