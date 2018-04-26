<?php

require("../bootstrap.php");

$schedule = file_get_contents("./json/schedule.json");
/*var_dump(json_decode($schedule, true));
return;*/

render(
    "teacher_center/schedule",
    json_decode($schedule, true)
);
