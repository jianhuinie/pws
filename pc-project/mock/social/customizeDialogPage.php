<?php

require("../bootstrap.php");
$smarty = getSmarty([]);

echo $smarty->fetch('social/customizeDialogPage.html');