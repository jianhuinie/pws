<?php

require("../bootstrap.php");

render(
    "social/group",
    array(
       "tpl_data" => array(
            "type" => 2, // 1全部 2精华
            "is_admin" => 1, //是否管理员
            "check_in" => [
                "today" => false,
                "count" => 1
            ],
            "pager" => [
                "page" => 3,
                "count" => 107
            ],
            //用户信息
            "user" => [
                "user_id" => 13444,
                "user_role" => 344,
                "avatar" => "用户头像",
                "rank" => 444,   //达人榜排名
            ],
            //小组信息
            "group" => [
                "id" => "1",
                "name" => "小组名称",
                "brief" => "小组简介",
                "avatar" => "xxx",
                "threads" => 5566,
                "members" => 93333,
                "is_join" => 0,
            ],
            //管理员list
            "admin_list" => [
                [
                    "user_id" => 442333,
                    "user_role" => 2,
                    "display_name" => "用户名称",
                    "avatar" => "用户头像",
                    "is_super_moderation" => true,
                    "homepage" => 'sdsd'
                ],
                [
                    "user_id" => 442333,
                    "user_role" => 2,
                    "display_name" => "用户名称2用户名称用户名称用户名称",
                    "avatar" => "用户头像",
                    "is_super_moderation" => false,
                    "homepage" => 'sdsd'
                ],
                [
                    "user_id" => 442333,
                    "user_role" => 2,
                    "display_name" => "用户名称",
                    "avatar" => "用户头像",
                    "is_super_moderation" => true,
                    "homepage" => 'sdsd'
                ],
                [
                    "user_id" => 442333,
                    "user_role" => 2,
                    "display_name" => "用户名称2",
                    "avatar" => "用户头像",
                    "is_super_moderation" => false,
                    "homepage" => 'sdsd'
                ]
            ],
            //帖子
            "list" => [
                [
                    "thread_id" => 5333,
                    "name" => "帖子标题",
                    "summary" => "帖子摘要",
                    "user_id" => 442333,
                    "user_role" => 2,
                    "user_name" => "用户名称",
                    "avatar" => "用户头像",
                    "link" => "帖子链接",
                    "posts" => 0,
                    "zans" => 0,
                    "photo_list" => [
                        [
                            "id" => "39811",
                            "name" => "冰冰的1",
                            "img" => "http://test-img.gsxservice.com/333174_byhlywp9.jpeg",
                            "width" => 700,
                            "height" => 525,
                            "create_time" => "2015-04-14 11:54:21"
                        ],
                        [
                            "id" => "39812",
                            "name" => "冰冰的2",
                            "img" => "http://test-img.gsxservice.com/333174_byhlywp9.jpeg",
                            "width" => 700,
                            "height" => 525,
                            "create_time" => "2015-04-14 11:54:21"
                        ],
                        [
                            "id" => "39813",
                            "name" => "冰冰的3",
                            "img" => "http://test-img.gsxservice.com/333174_byhlywp9.jpeg",
                            "width" => 700,
                            "height" => 525,
                            "create_time" => "2015-04-14 11:54:21"
                        ],
                        [
                            "id" => "39814",
                            "name" => "冰冰的4",
                            "img" => "http://test-img.gsxservice.com/333174_byhlywp9.jpeg",
                            "width" => 700,
                            "height" => 525,
                            "create_time" => "2015-04-14 11:54:21"
                        ],
                        [
                            "id" => "39815",
                            "name" => "冰冰的5",
                            "img" => "http://test-img.gsxservice.com/333174_byhlywp9.jpeg",
                            "width" => 700,
                            "height" => 525,
                            "create_time" => "2015-04-14 11:54:21"
                        ]
                    ],
                    "time_tip" => "1小时前",
                    "is_good" =>  1,  //1精品
                    "is_top" =>  1,  //1精品
                    "is_new" =>  0,   //1新帖
                    "is_baned" => 0,
                    "create_time" => "2015-09-03 10:01",
                    "update_time" => "2015-09-03 10:01"
                ],
                [
                    "thread_id" => 5333,
                    "name" => "帖子标题",
                    "summary" => "帖子摘要",
                    "user_name" => "用户名称",
                    "avatar" => "用户头像",
                    "user_id" => 442333,
                    "user_role" => 2,
                    "link" => "帖子链接",
                    "posts" => 3,
                    "zans" => 442334,
                    "is_good" =>  1,  //1精品
                    "is_top" =>  0,
                    "is_new" =>  0,   //1新帖
                    "is_baned" => 1,
                    "photo_list" => [
                        [
                            "id" =>  "39811",
                            "name" =>  "冰冰的",
                            "img" =>  "http://test-img.gsxservice.com/333174_byhlywp9.jpeg",
                            "width" => 700,
                            "height" => 525,
                            "create_time" => "2015-04-14 11:54:21"
                        ]
                    ],
                    "time_tip" => "1天前",
                    "create_time" => "2015-09-03 10:01",
                    "update_time" => "2015-09-03 10:01",
                ],
                [
                    "thread_id" => 5333,
                    "name" => "帖子标题",
                    "summary" => "帖子摘要",
                    "user_name" => "用户名称",
                    "avatar" => "用户头像",
                    "user_id" => 442333,
                    "user_role" => 2,
                    "link" => "帖子链接",
                    "posts" => 9444,
                    "zans" => 442334,
                    "is_good" =>  0,  //1精品
                    "is_new" =>  0,   //1新帖
                    "is_top" =>  0,
                    "is_baned" => 0,
                    "photo_list" => [
                        [
                            "id" =>  "39811",
                            "name" =>  "冰冰的",
                            "img" =>  "http://test-img.gsxservice.com/333174_byhlywp9.jpeg",
                            "width" => 700,
                            "height" => 525,
                            "create_time" => "2015-04-14 11:54:21"
                        ]
                    ],
                    "time_tip" => "1天前",
                    "create_time" => "2015-09-03 10:01",
                    "update_time" => "2015-09-03 10:01",
                ]
            ]
        )
    )
);