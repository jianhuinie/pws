<?php

require("../bootstrap.php");

$teacherRank = file_get_contents("./json/teacherRank2.json");
/*var_dump(json_decode($schedule, true));
return;*/

render(
    "activity/teacherRank2",
    json_decode($teacherRank, true)
);