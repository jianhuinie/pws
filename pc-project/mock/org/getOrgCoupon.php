<?php

$response = array(
    'code' => 0,
    'msg' => '你已经抽过奖了',
    'data' =>array(
      'is_join' => 0,
      'total' => 300,
      'status' => 0
    )
);
echo json_encode($response);
