<?php

$response = array(
    'code' => 0,
    'type' => 2,
    'msg' => '投票成功',
    'data' =>array(
      'is_join' => 0,
      'total' => 300,
      'discount' => "9.5",
      "value"=> "5.00",
      "cond_threshold" => null,
      "display_name"=> "王晓晓老师的优惠劵",
      "display_status"=> 1,  //表示是老师优惠劵 2表示是实物 3表示平台
      "url"=> "www.baidu.com"
    ),
    'data' => 'msg',
    'balance' => 10,
    'cond_threshold' => 100,
    'kind' => '平台',
    'href' => '去使用'
);

//$response = array(
//    'code' => 0,
//    'msg'  =>"succss",
//    'data' =>array(
//      'is_join' => 0,
//      'total' => 300
//    )
//);
echo json_encode($response);
