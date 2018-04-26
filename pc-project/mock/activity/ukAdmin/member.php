<?php

require("../../bootstrap.php");

render(
    "activity/ukAdmin/member",
    array(
        "tpl_data" => array(

            'page_info' => array(
                "now_page" => 1,
                'page_size' => 10,
                'pages_number' => 100
            ),
            //'user_infos' => array(),
           'user_infos' => array(
                array(
                    'number' => '123823',
                    'name' => '小明',
                    'vote_count' => '54',
                    'report_count' => '92',
                    'color' => 1,  //0-蓝色 1-橘色
                    'frozen' => 1  //1-被封->正常状态 0-正常状态->被封
                ),
                array(
                    'number' => '123823',
                    'name' => '小明',
                    'vote_count' => '54',
                    'report_count' => '92',
                    'color' => 0,
                    'frozen' => 1
                ),
                array(
                    'number' => '123823',
                    'name' => '小明',
                    'vote_count' => '54',
                    'report_count' => '92',
                    'color' => 0,
                    'frozen' => 0
                ),
                array(
                    'number' => '123823',
                    'name' => '小明',
                    'vote_count' => '54',
                    'report_count' => '92',
                    'color' => 0,
                    'frozen' => 0

                ),
            )
        )
    )
);

