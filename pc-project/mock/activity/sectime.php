<?php

//$response = array(
//    'code' => 0,
//    'msg' => '即将开启',
//    'data' =>array(
//      'is_aleary' => 0
//    )
//);

$response = array(
    'code' => 1,
//    'msg' => '下次加油',
    'data' =>array(
      'is_aleary' => 0
    )
);

//$response = array(
//    'code' => 2,
//    'msg' => '限时疯抢',
//    'data' =>array(
//      'is_alreay' => 0
//    )
//);

//第二种参数（已经被抽）：
//$response = array(
//    'code' => 2,
//    'msg' => '限时疯抢',
//    'data' =>array(
//      'is_alreay' => 1
//      ''
//    )
//);


echo json_encode($response);
