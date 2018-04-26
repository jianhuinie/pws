<?php

//$response = array(
//    'code' => 1,
//    'msg' => '你已经点过赞了',
//    'data' =>array(
//      'is_join' => 0,
//      'total' => 300
//    )
//);

$response = array(
    'code' => 0,
    'msg'  =>"succss",
    'data' =>array(
      'is_join' => 0,
      'total' => 301
    )
);
echo json_encode($response);
