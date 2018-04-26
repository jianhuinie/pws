<?php

require("../bootstrap.php");

$teacherRank = file_get_contents("./json/teacherRank1.json");
/*var_dump(json_decode($schedule, true));
return;*/

render(
    "activity/teacherRank1",
    json_decode($teacherRank, true)
);