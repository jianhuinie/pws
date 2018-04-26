<?php

require("../bootstrap.php");

$tpl_data = array(
    "prize_record" => array(
        "pager" => array(
            "page" => 5,
            "page_size" => 3,
            "count" => 100
        ),
        "list" => array(
            array(
                "user_id"=> "806",
                "name"=> "name", //用户的名称
                "avatar"=> "http://cdn.gsxservice.com/asset/img/main/%e7%8e%8b%e4%b8%80%e6%9d%b0.jpeg" ,//用户的头像
                "money"=> 100 ,//该用户抽取的奖金金额
                "info"=> "hahahaha",//
                "time"=> "10-26 22:15",//
            ),
            array(
                "user_id"=> "806", //用户的ID
                "name"=> "name", //用户的名称
                "avatar"=> "http://cdn.gsxservice.com/asset/img/main/%e7%8e%8b%e4%b8%80%e6%9d%b0.jpeg" ,//用户的头像
                "money"=> 100 ,//该用户抽取的奖金金额
                "info"=> "hello world",//
                "time"=> "10-26 22:15",//
            ),
            array(
                "user_id"=> "806", //用户的ID
                "name"=> "name hahahaha", //用户的名称
                "avatar"=> "http://cdn.gsxservice.com/asset/img/main/%e7%8e%8b%e4%b8%80%e6%9d%b0.jpeg" ,//用户的头像
                "money"=> 100 ,//该用户抽取的奖金金额
                "info"=> "以上上课就靠你了！",//
                "time"=> "10-26 22:15",//
            )
        )
    )
);

$response = array(
    "code" => 0,
    "data" => array(
        "prize_record" => array(
            "pager" => array(
                   "page" => 1,
                   "page_size" => 4,
                   "count" => 100
            ),
            "list" => array(
                   array(
                       "user_id"=> "806",
                       "name"=> "name", //用户的名称
                       "money"=> 100 ,//该用户抽取的奖金金额
                       "type" => 1
                   ),
                   array(
                       "user_id"=> "806", //用户的ID
                       "name"=> "name", //用户的名称
                       "money"=> 100 ,//该用户抽取的奖金金额
                       "type" => 2
                   ),
                   array(
                       "user_id"=> "806", //用户的ID
                       "name"=> "name", //用户的名称
                       "money"=> 100 ,//该用户抽取的奖金金额
                       "type" => 3
                   ),
                   array(
                       "user_id"=> "806", //用户的ID
                       "name"=> "name", //用户的名称
                       "money"=> 100 ,//该用户抽取的奖金金额
                       "type" => 3
                   )
            )
        ),
        "tpl" => array(
            "prize_record" => fetch('activity/component/prizeList', array(
                    "tpl_data" => $tpl_data
                )
            )
        )

    )
);

echo json_encode($response);
