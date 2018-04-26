<?php

require("../bootstrap.php");

$checkin = file_get_contents("./json/checkinCalendar.json");

render(
    "common/center/common/signCalendar",
    json_decode($checkin, true)
);

echo json_encode($response);