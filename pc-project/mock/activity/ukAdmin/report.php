<?php

require("../../bootstrap.php");

render(
    "activity/ukAdmin/report",
    array(
        "tpl_data" => array(
            'page_info' => array(
                'now_page' => 1,
                'page_size' => 10,
                'page_numbers' => 100
            ),

            'reports' => array(
                array(
                    'id' => '123823', //选手id
                    'player_number' => '54',
                    'reporter_number' => '92',
                    'date' => '23',
                    'type' => '色情',
                    'description' => '阿斯顿发生第三方XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
                    'ed_color' => 1,
                    'er_color' => 0
                ),
                array(
                    'id' => '123823', //选手id
                    'player_number' => '54',
                    'reporter_number' => '92',
                    'date' => '23',
                    'type' => '色情',
                    'description' => '阿斯顿发生第三方',
                    'ed_color' => 0,
                    'er_color' => 1
                )
            )
        )
    )
);

