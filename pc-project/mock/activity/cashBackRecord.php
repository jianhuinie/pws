<?php

require("../bootstrap.php");

$tpl_data = array(
    "cash_back_record" => array(
            "pager" => array(
                   "page" => 5,
                   "page_size" => 4,
                   "count" => 100
            ),
            "list" => array(
                   array(
                       "user_id"=> "806",
                       "name"=> "name", //用户的名称
                       "money"=> 1000 ,//该用户抽取的奖金金额
                       "type" => 1
                   ),
                   array(
                       "user_id"=> "806", //用户的ID
                       "name"=> "name", //用户的名称
                       "money"=> 1000 ,//该用户抽取的奖金金额
                       "type" => 2
                   ),
                   array(
                       "user_id"=> "806", //用户的ID
                       "name"=> "name", //用户的名称
                       "money"=> 1000 ,//该用户抽取的奖金金额
                       "type" => 3
                   ),
                   array(
                       "user_id"=> "806", //用户的ID
                       "name"=> "name", //用户的名称
                       "money"=> 1002 ,//该用户抽取的奖金金额
                       "type" => 3
                   )
            )
    )
);

$response = array(
    "code" => 0,
    "data" => array(
        "cash_back_record" => array(
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
            "cash_back_record" => fetch('activity/component/cashbackList', array(
                    "tpl_data" => $tpl_data
                )
            )
        )

    )
);

echo json_encode($response);
