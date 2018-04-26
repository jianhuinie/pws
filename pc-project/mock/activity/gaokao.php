<?php

require("../bootstrap.php");

$gaokao = file_get_contents("./json/gaokao2.json");

render(
    "activity/gaokao",
    json_decode($gaokao, true)
);