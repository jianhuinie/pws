<?php

require("../bootstrap.php");

$teacherRank = file_get_contents("./json/teacherRank6.json");

render(
    "activity/teacherRank6",
    json_decode($teacherRank, true)
);