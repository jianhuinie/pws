<?php

$response = array(
    "code" => 0,
    "data" => array(
        "pager" => [
            "page" => 3,
            "count" => 56
        ],
        "list" => [
            [
                'id' => 1, //帖子id
                'title' => '都快放假', //帖子标题
                'post_info_url' => 'http://ss.df',
                'group_info_url' => 'http://ss.kk',
                'group_name' => 'djfdjfd', //所属小组名称
                'create_time' => '2015-5-5'   //发帖时间
            ],
            [
                'id' => 1, //帖子id
                'title' => '都快放假1', //帖子标题
                'post_info_url' => 'http://ss.df',
                'group_info_url' => 'http://ss.kk',
                'group_name' => 'djfdjfd', //所属小组名称
                'create_time' => '2015-5-5'   //发帖时间
            ],
            [
                'id' => 1, //帖子id
                'title' => '都快放假2', //帖子标题
                'post_info_url' => 'http://ss.df',
                'group_info_url' => 'http://ss.kk',
                'group_name' => 'djfdjfd', //所属小组名称
                'create_time' => '2015-5-5'   //发帖时间
            ]
        ]
    )
);

echo json_encode($response);

