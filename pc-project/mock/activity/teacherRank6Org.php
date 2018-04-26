<?php

require("../bootstrap.php");

$teacherRank = file_get_contents("./json/teacherRank6Org.json");

render(
    "activity/teacherRank6Org",
    json_decode($teacherRank, true)
);

