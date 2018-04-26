<?php

require("../bootstrap.php");

$teacherRank = file_get_contents("./json/teacherRank5.json");

render(
    "activity/teacherRank5",
    json_decode($teacherRank, true)
);