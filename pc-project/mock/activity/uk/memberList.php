<?php

require("../../bootstrap.php");

render(
    "activity/uk/memberList",
    array(
        "tpl_data" => array(

            "has_pay" => true,
            "time_status" => 1, //0时间还没开始 1可以展示了
            "start_date" => "3月28日",
            "grade_id" => "0",
            "query" => "",

            'page_info' => array(
                "curr_page" => 1,
                'page_size' => 10,
                'total' => 100
            ),
            "user_infos" => array(
                array(
                    'name' => '杨柳音子杨柳音子杨柳音子杨柳音子',
                    'avatar' => 'http://img.gsxservice.com/43194_4av21jmo.jpeg',
                    'number' => '23442',
                    'talent' => '素描素描素描素描素描素描素描素描',
                    'vote_count' => '236',
                    'can_vote' => false // 是否可以投票, //0可以投票 1不能投票
                ),
                array(
                    'name' => '杨柳音子',
                    'avatar' => 'https://img.genshuixue.com/6947040_u040lzv7.jpeg',
                    'number' => '23442',
                    'talent' => '素描',
                    'vote_count' => '236',
                    'can_vote' => true // 是否可以投票, //0可以投票 1不能投票
                ),
                array(
                    'name' => '安倍',
                    'avatar' => 'http://img.gsxservice.com/43194_4av21jmo.jpeg',
                    'number' => '23442',
                    'talent' => '素描',
                    'vote_count' => '236',
                    'can_vote' => true // 是否可以投票, //0可以投票 1不能投票
                ),
                array(
                    'name' => '安倍',
                    'avatar' => 'http://img.gsxservice.com/43194_4av21jmo.jpeg',
                    'number' => '23442',
                    'talent' => '素描',
                    'vote_count' => '236',
                    'can_vote' => true // 是否可以投票, //0可以投票 1不能投票
                ),
                array(
                    'name' => '安倍',
                    'avatar' => 'http://img.gsxservice.com/43194_4av21jmo.jpeg',
                    'number' => '23442',
                    'talent' => '素描',
                    'vote_count' => '236',
                    'can_vote' => true // 是否可以投票, //0可以投票 1不能投票
                ),
                array(
                    'name' => '安倍',
                    'avatar' => 'http://img.gsxservice.com/43194_4av21jmo.jpeg',
                    'number' => '23442',
                    'talent' => '素描',
                    'vote_count' => '236',
                    'can_vote' => true // 是否可以投票, //0可以投票 1不能投票
                )
            ),
            "grade" => array(
                array(
                    "id" => "1",
                    "name" => "小学组"
                ),
                array(
                    "id" => "2",
                    "name" => "初中组"
                ),
                array(
                    "id" => "3",
                    "name" => "小学组"
                ),
                array(
                    "id" => "4",
                    "name" => "大学组"
                )
            )
        )
    )
);

