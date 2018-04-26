<?php

$response = array(
    "code" => 0,
    "msg" => '发送成功',
    "data" => array(
        "upload_url" => "http://test-upload-video.genshuixue.com/upload?fid=75341&ts=1459230404094&token=d8744e221c0c0c2af68029633509f5a7",
        "fid" => 75341,
        "id" => "12892"
    )
);

echo json_encode($response);