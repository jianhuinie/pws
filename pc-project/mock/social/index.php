<?php

require("../bootstrap.php");

render(
    "social/index",
    array(
       "tpl_data" => array(
            'is_login' => 1,   //是否登录
            'user_data' => [
                'nick_name' => '张三', //昵称
                'role' => 0, // 0老师 2学生
                'vip_level' => 3, // 0非会员 1普通会员 2高级会员 3超级会员
                'brief' => '桑德菲杰k', //简介
                'avatar' => 'http://img.gsxservice.com/807139_l6fir5d5.jpeg', //头像
                'score' => 100,      //经验
                'posts_num' => 100,      //发帖数
                'collect_num' => 100    //收藏数
            ],
            'banner_list' => [
                [
                    'img' => 'xxxxx.jpg',
                    'url' => 'xxxxx.com'
                ],
                [
                    'img' => 'xxxxx.jpg',
                    'url' => 'xxxxx.com'
                ],
                [
                    'img' => 'xxxxx.jpg',
                    'url' => 'xxxxx.com'
                ],
                [
                    'img' => 'xxxxx.jpg',
                    'url' => 'xxxxx.com'
                ]
            ],
            'group_list' => [
                [
                    [
                        'group_id' => 1,
                        'avatar' => 'xxxxx.jpg', //小组头像
                        'name' => '出国留学',      //小组名称
                        'brief' => '将对方的解放军',  //小组简介
                        'is_join' => 1,         //是否加入小组
                        'is_flag' => 1
                    ],
                    [
                        'group_id' => 2,
                        'avatar' => 'xxxxx.jpg', //小组头像
                        'name' => '出国留学',      //小组名称
                        'brief' => '将对方的解放军',  //小组简介
                        'is_join' => 1,         //是否加入小组
                        'is_flag' => 2
                    ],
                    [
                        'group_id' => 3,
                        'avatar' => 'xxxxx.jpg', //小组头像
                        'name' => '出国留学',      //小组名称
                        'brief' => '将对方的解放军',  //小组简介
                        'is_join' => 0,         //是否加入小组
                        'is_flag' => 1
                    ],
                    [
                        'group_id' => 4,
                        'avatar' => 'xxxxx.jpg', //小组头像
                        'name' => '出国留学',      //小组名称
                        'brief' => '将对方的解放军',  //小组简介
                        'is_join' => 1,         //是否加入小组
                        'is_flag' => 1
                    ],
                    [
                        'group_id' => 5,
                        'avatar' => 'xxxxx.jpg', //小组头像
                        'name' => '出国留学',      //小组名称
                        'brief' => '将对方的解放军',  //小组简介
                        'is_join' => 1,         //是否加入小组
                        'is_flag' => 1
                    ],
                    [
                        'group_id' => 6,
                        'avatar' => 'xxxxx.jpg', //小组头像
                        'name' => '出国留学',      //小组名称
                        'brief' => '将对方的解放军',  //小组简介
                        'is_join' => 1,        //是否加入小组
                        'is_flag' => 2
                    ]
                ],
                [
                    [
                        'group_id' => 7,
                        'avatar' => 'xxxxx.jpg', //小组头像
                        'name' => '出国留学',      //小组名称
                        'brief' => '将对方的解放军',  //小组简介
                        'is_join' => 1,         //是否加入小组
                        'is_flag' => 0
                    ],
                    [
                        'group_id' => 8,
                        'avatar' => 'xxxxx.jpg', //小组头像
                        'name' => '出国留学',      //小组名称
                        'brief' => '将对方的解放军',  //小组简介
                        'is_join' => 1,        //是否加入小组
                        'is_flag' => 1
                    ],
                    [
                        'group_id' => 9,
                        'avatar' => 'xxxxx.jpg', //小组头像
                        'name' => '出国留学',      //小组名称
                        'brief' => '将对方的解放军',  //小组简介
                        'is_join' => 1,         //是否加入小组
                        'is_flag' => 2
                    ],
                    [
                        'group_id' => 10,
                        'avatar' => 'xxxxx.jpg', //小组头像
                        'name' => '出国留学',      //小组名称
                        'brief' => '将对方的解放军',  //小组简介
                        'is_join' => 1,         //是否加入小组
                        'is_flag' => 0
                    ],
                    [
                        'group_id' => 11,
                        'avatar' => 'xxxxx.jpg', //小组头像
                        'name' => '出国留学',      //小组名称
                        'brief' => '将对方的解放军',  //小组简介
                        'is_join' => 1,         //是否加入小组
                        'is_flag' => 1
                    ]
                ]
            ],
            'hot_posts' => [
                [
                    'title' => '小火锅的金风科技', //帖子标题
                    'brief' => 'sdfdjfjlsdjfd',    //帖子摘要
                    'img' => 'a.jpg',          //帖子图片
                    'author' => '张三',          //帖子作者
                    'group_name' => '出国留学',    //所属小组
                    'create_time' => '5分钟前',   //发帖时间
                    'reply_num' => 10,         //回复数
                    'zan_num' => 10,           //赞数
                    'user_homepage_url' => '',   //用户主页
                    'group_info_url' => ''   //小组主页
                ],
                [
                    'title' => '小火锅的金风科技', //帖子标题
                    'brief' => 'sdfdjfjlsdjfd',    //帖子摘要
                    'img' => '',          //帖子图片
                    'author' => '张三',          //帖子作者
                    'group_name' => '出国留学',    //所属小组
                    'create_time' => '5分钟前',   //发帖时间
                    'reply_num' => 11,         //回复数
                    'zan_num' => 10,           //赞数
                    'user_homepage_url' => '',   //用户主页
                    'group_info_url' => ''   //小组主页
                ]
            ],
            'count' => [
                'hot_posts_count' => 100,
                'hot_posts_page' => 2
            ]
        )
    )
);