<?php

/**
 * @file 视频播放控件（iframe）
 * @author xuzheng
 * @date 15/10/21
 */

require("../bootstrap.php");

$json = json_decode(file_get_contents('./json/player.json'), true);

render(
    "video/player",
    array(
        "tpl_data" => $json
    )
);