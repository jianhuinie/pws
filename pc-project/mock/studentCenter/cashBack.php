<?php

require("../bootstrap.php");

render(
    "student_center/cashBack",
    array(
        "tpl_data" => array(
            "total_prize" => 100,
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
                            "type" => 11
                        ),
                        array(
                            "user_id"=> "806", //用户的ID
                            "name"=> "name", //用户的名称
                            "money"=> 100 ,//该用户抽取的奖金金额
                            "type" => 12
                        ),
                        array(
                            "user_id"=> "806", //用户的ID
                            "name"=> "name", //用户的名称
                            "money"=> 100 ,//该用户抽取的奖金金额
                            "type" => 10
                        ),
                        array(
                            "user_id"=> "806", //用户的ID
                            "name"=> "name", //用户的名称
                            "money"=> 100 ,//该用户抽取的奖金金额
                            "type" => 10
                        )
                 )
            )
        )
    )
);