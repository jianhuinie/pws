<?php

require("../bootstrap.php");

$teacherRank = file_get_contents("./json/teacherRank3.json");

render(
    "activity/teacherRank3",
    json_decode($teacherRank, true)
);