<?php

require("../bootstrap.php");

$teacherRank = file_get_contents("./json/teacherRank4.json");

render(
    "activity/teacherRank4",
    json_decode($teacherRank, true)
);