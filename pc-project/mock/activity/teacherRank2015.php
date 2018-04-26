<?php

require("../bootstrap.php");

$teacherRank = file_get_contents("./json/teacherRank2015.json");

render(
    "activity/teacherRank2015",
    json_decode($teacherRank, true)
);