<?php

require("../bootstrap.php");

$action = $_GET['action'];

if ($action === 'config') {
    echo file_get_contents(MOCK_DIR . 'editor' . DIRECTORY_SEPARATOR . 'config.json');
}
else {
    $response = array();
    echo json_encode($response);
}