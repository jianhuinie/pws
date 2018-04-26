<?php

require("../bootstrap.php");

render(
    "social/center",
    array(
       "tpl_data" => array(
            'nick_name' => '张三', //用户昵称
            'avatar' => 'http://img.gsxservice.com/807139_l6fir5d5.jpeg',   //用户头像
            'brief' => '是否就觉得烦j',  //用户简介
            'user_role' => '老师',   //用户角色
            'score' => 100, //经验
            'posts_num' => 100,  //帖子数
            'collect_num' => 100,  //收藏数
            'active' => 3, //当前高亮那个tab  posts:1||collect:2||group:3
            'posts_list' =>[
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
            ],
            'collect_list' => [
                [
                    'id' => 1, //帖子id
                    'title' => '都快放假', //帖子标题
                    'post_info_url' => 'http://ss.df',
                    'group_info_url' => 'http://ss.kk',
                    'author_name' => '撒娇的哈是',
                    'group_name' => 'djfdjfd', //所属小组名称
                    'create_time' => '2015-5-5' //发帖时间
                ],
                [
                    'id' => 1, //帖子id
                    'title' => '都快放假', //帖子标题
                    'post_info_url' => 'http://ss.df',
                    'group_info_url' => 'http://ss.kk',
                    'author_name' => '撒娇的哈是',
                    'group_name' => 'djfdjfd', //所属小组名称
                    'create_time' => '2015-5-5' //发帖时间
                ],
                [
                    'id' => 1, //帖子id
                    'title' => '都快放假', //帖子标题
                    'post_info_url' => 'http://ss.df',
                    'group_info_url' => 'http://ss.kk',
                    'author_name' => '撒娇的哈是',
                    'group_name' => 'djfdjfd', //所属小组名称
                    'create_time' => '2015-5-5' //发帖时间
                ]
            ],
            'group_list' => [
                [
                    'id' => 1,
                    'avatar' => 'xxxxx.jpg', //小组头像
                    'name' => '出国留学',      //小组名称
                    'brief' => '将对方的解放军',  //小组简介
                    'is_join' => 1         //是否加入小组
                ],
                [
                    'id' => 2,
                    'avatar' => 'xxxxx.jpg', //小组头像
                    'name' => '出国留学',      //小组名称
                    'brief' => '将对方的解放军',  //小组简介
                    'is_join' => 1         //是否加入小组
                ],
                [
                    'id' => 3,
                    'avatar' => 'xxxxx.jpg', //小组头像
                    'name' => '出国留学',      //小组名称
                    'brief' => '将对方的解放军',  //小组简介
                    'is_join' => 0         //是否加入小组
                ],
                [
                    'id' => 4,
                    'avatar' => 'xxxxx.jpg', //小组头像
                    'name' => '出国留学',      //小组名称
                    'brief' => '将对方的解放军',  //小组简介
                    'is_join' => 1         //是否加入小组
                ]
            ],
            'pager' => [
                'count' => 0,
                'page' => 2
            ]
        )
    )
);