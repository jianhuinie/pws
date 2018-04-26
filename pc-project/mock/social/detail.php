<?php

require("../bootstrap.php");

render(
    "social/detail",
    array(
       "tpl_data" => array(
            "is_admin" => 1,   //是否管理员
            'login_user' => [
                'avatar' => 'http://test-img.gsxservice.com/3363_5mt38m1k.png', //头像
                'id' => 123123,
                'user_id' => 1225,
                'role' =>  0,
                'is_store_thread' => 1, //是否收藏
                'is_zan_thread' => 1 //是否赞
            ],
            'thread_user' => [
                'vip_level' => 3, // 0非会员 1普通会员 2高级会员 3超级会员
                'role' =>  0, // 0老师 2学生
                'user_id' => 1222,
                'homepage' => 'http://www.test.genshuixue.com/x/374397688',
                'nick_name' => '张三', //昵称
                'brief' => '桑德菲杰k', //简介
                'avatar' => 'http://img.gsxservice.com/807139_l6fir5d5.jpeg', //头像
                'score' => 100,      //经验
                'posts_num' => 100,      //发帖数
                'collect_num' => 100    //收藏数
            ],
            "thread" => [
                "thread_id" => 555,
                "user_id" => 13444,
                "user_role" => 0,
                "is_top" => 1,  //置顶
                "is_good" => 1, //加精
                "is_baned" => 0, //禁言
                "avatar" => "用户头像",
                "user_name" => "用户名称",
                "time_tip" => "1小时前",
                "name" => "帖子标题",
                "abstract" => "帖子摘要",
                "content" => '从前有座山<br />山上有座庙<br />庙里有个老和尚<br />总爱讲故事<br /><br />',
                "create_time" => "2015-09-03 10:01",
                "update_time" => "2015-09-03 10:01",
                "zans" => 48,
                "photo_list" => [
                    [
                        "id" => "12323",
                        "img" => ""
                    ],
                    [
                        "id" => "1232",
                        "img" => ""
                    ]
                ],
                "course_card" => array(
                    array(
                        "course_number" => 151030547648,
                        "course_type" => 3,
                        "course_cover" => "http://test-img.gsxservice.com/392122_5darn2qm.jpeg",
                        "course_name" => "阿大声道",
                        "teacher_nickname" => "yili",
                        "course_price" => "11.11",
                        "course_time" => "2016-06-04",
                        "course_url" => "http://sunlijun-m.test.genshuixue.com/teacher/classCourseDetail/151030547648"
                    ),
                    array(
                        "course_number" => 151120548441,
                        "course_type" => 2,
                        "course_cover" => "http://test-img.gsxservice.com/396590_69xqc6ww.jpeg",
                        "course_name" => "非登录进入教室测试-非零元班课",
                        "teacher_nickname" => "yili",
                        "course_price" => "0.01",
                        "course_time" => "2015-11-20",
                        "course_address" => "百度大厦a座",
                        "course_url" => "http://sunlijun-m.test.genshuixue.com/teacher/classCourseDetail/151120548441"
                    ),
                    array(
                        "course_number" => 15102249849,
                        "course_type" => 4,
                        "course_cover" => "http://test-img.gsxservice.com/389138_jtjlz6ze.jpeg",
                        "course_name" => "fff",
                        "teacher_nickname" => "赵芳老师的昵称显示问",
                        "course_price" => "1",
                        "course_url" => "http://sunlijun-m.test.genshuixue.com/video_course/15102249849"
                    )
                )
            ],
            "group" => [
                "name" => "小组名",
                "group_id" => 123,
                "threads" => 122,
                "members" => 135,
                "is_join" => 0
            ],
            "good_list" => [ // 精彩评论
                [
                  "vip_level" => 3, // 0非会员 1普通会员 2高级会员 3超级会员
                  "thread_id" => 5333,
                  "post_id" => 5555,
                  "name" => "帖子标题",
                  "content" => "帖子内容",
                  "user_id" => 123123,
                  "user_role" => 0,
                  "user_name" => "用户名称",
                  "user_level" => 12,
                  "avatar" =>  "用户头像",
                  "link" => "帖子链接",
                  "posts" => 4444,
                  "zans" => 45555,
                  "time_tip" => "1小时前",
                  "homepage" => "sds",
                  "photo_list" => [
                        [
                            "id" =>  "39811",
                            "name" =>  "冰冰的",
                            "img" =>  "http://test-img.gsxservice.com/333174_byhlywp9.jpeg",
                            "width" =>  700,
                            "height" =>  525,
                            "create_time" =>  "2015-04-14 11:54:21"
                         ]
                  ]
                ],
                [
                  "vip_level" => 3, // 0非会员 1普通会员 2高级会员 3超级会员
                  "thread_id" => 5333,
                  "post_id" => 5555,
                  "name" => "帖子标题",
                  "content" => "帖子内容",
                  "user_id" => 442333,
                  "user_role" => 0,
                  "user_level" => 13,
                  "user_name" => "用户名称",
                  "avatar" =>  "用户头像",
                  "homepage" => "sds",
                  "link" => "帖子链接",
                  "posts" => 4444,
                  "zans" => 45555,
                  "time_tip" => "1小时前",
                  "photo_list" => [
                        [
                            "id" =>  "39811",
                            "name" =>  "冰冰的",
                            "img" =>  "http://test-img.gsxservice.com/333174_byhlywp9.jpeg",
                            "width" =>  700,
                            "height" =>  525,
                            "create_time" =>  "2015-04-14 11:54:21"
                        ],
                        [
                            "id" =>  "39811",
                            "name" =>  "冰冰的",
                            "img" =>  "http://test-img.gsxservice.com/333174_byhlywp9.jpeg",
                            "width" =>  700,
                            "height" =>  525,
                            "create_time" =>  "2015-04-14 11:54:21"
                        ]
                    ]
                ]
            ],
            "post_list" => [ // 全部评论
                "list" => [
                    [
                        "vip_level" => 3, // 0非会员 1普通会员 2高级会员 3超级会员
                        "post_id" => 5333,
                        "content" => "评论内容\n评论内容\n评论内容\n",
                        "user_id" => 442333,
                        "user_role" => 0,
                        "user_level" => 1,
                        "user_name" => "用户名称",
                        "homepage" => "sds",
                        "avatar" =>  "用户头像",
                        "zans" => 45555,
                        "floor" => 1,
                        "is_zan" => 1,
                        "photo_list" => [
                            [
                                "id" => "39811",
                                "name" => "冰冰的",
                                "img" => "http://test-img.gsxservice.com/333174_byhlywp9.jpeg",
                                "width" => 700,
                                "height" => 525,
                                "create_time" => "2015-04-14 11:54:21"
                             ]
                        ],
                        "time_tip" => "1小时前",
                        "create_time" => "2015-09-03 10:01",
                        "update_time" => "2015-09-03 10:01",
                        "comment_list" => [
                            "list" => [
                                [
                                    "comment_id" => 5333,
                                    "content" => "评论内容\n评论内容\n评论内容\n",
                                    "user_id" => 123123,
                                    "user_role" => 2,
                                    "user_name" => "用户名称",
                                    "avatar" =>  "用户头像",
                                    "homepage" => "sdsd",
                                    "time_tip" => "1天前",
                                    "create_time" => "2015-09-03 10:01",
                                    "update_time" => "2015-09-03 10:01"
                                ],
                                [
                                    "comment_id" => 5333,
                                    "content" => "评论内容",
                                    "user_id" => 442333,
                                    "user_role" => 2,
                                    "user_name" => "用户名称",
                                    "avatar" =>  "用户头像",
                                    "homepage" => "sdsd",
                                    "time_tip" => "1天前",
                                    "create_time" => "2015-09-03 10:01",
                                    "update_time" => "2015-09-03 10:01"
                                ],
                                [
                                    "comment_id" => 5333,
                                    "content" => "评论内容",
                                    "user_id" => 442333,
                                    "user_role" => 2,
                                    "user_name" => "用户名称",
                                    "avatar" =>  "用户头像",
                                    "time_tip" => "1天前",
                                    "homepage" => "sdsd",
                                    "create_time" => "2015-09-03 10:01",
                                    "update_time" => "2015-09-03 10:01",
                                    "commented_user" => [
                                        "user_id" =>442333,
                                        "user_role" =>2,
                                        "homepage" => "sdsd",
                                        "user_name" =>"用户名称",
                                        "avatar" => "用户头像"
                                    ]
                                ]
                            ],
                            "page" => 1,
                            "has_more" => 1
                        ]
                    ],
                    [
                        "vip_level" => 3, // 0非会员 1普通会员 2高级会员 3超级会员
                        "post_id" => 5333,
                        "content" => "评论内容",
                        "user_id" => 442333,
                        "user_role" => 2,
                        "user_level" => 1,
                        "user_name" => "用户名称",
                        "homepage" => "sds",
                        "avatar" =>  "用户头像",
                        "zans" => 45555,
                        "floor" => 2,
                        "photo_list" => [
                            [
                                "id" => "39811",
                                "name" => "冰冰的",
                                "img" => "http://test-img.gsxservice.com/333174_byhlywp9.jpeg",
                                "width" => 700,
                                "height" => 525,
                                "create_time" => "2015-04-14 11:54:21"
                             ]
                        ],
                        "time_tip" => "1小时前",
                        "create_time" => "2015-09-03 10:01",
                        "update_time" => "2015-09-03 10:01",
                        "comment_list" => [
                            "list" => [
                                [
                                    "comment_id" => 5333,
                                    "content" => "评论内容",
                                    "user_id" => 442333,
                                    "user_role" => 2,
                                    "user_name" => "用户名称",
                                    "avatar" =>  "用户头像",
                                    "homepage" => "sdsd",
                                    "time_tip" => "1天前",
                                    "create_time" => "2015-09-03 10:01",
                                    "update_time" => "2015-09-03 10:01"
                                ],
                                [
                                    "comment_id" => 5333,
                                    "content" => "评论内容",
                                    "user_id" => 442333,
                                    "user_role" => 2,
                                    "user_name" => "用户名称",
                                    "avatar" =>  "用户头像",
                                    "homepage" => "sdsd",
                                    "time_tip" => "1天前",
                                    "create_time" => "2015-09-03 10:01",
                                    "update_time" => "2015-09-03 10:01"
                                ],
                                [
                                    "comment_id" => 5333,
                                    "content" => "评论内容",
                                    "user_id" => 442333,
                                    "user_role" => 2,
                                    "user_name" => "用户名称",
                                    "avatar" =>  "用户头像",
                                    "time_tip" => "1天前",
                                    "homepage" => "sdsd",
                                    "create_time" => "2015-09-03 10:01",
                                    "update_time" => "2015-09-03 10:01",
                                    "commented_user" => [
                                        "user_id" =>442333,
                                        "user_role" =>2,
                                        "homepage" => "sdsd",
                                        "user_name" =>"用户名称",
                                        "avatar" => "用户头像"
                                    ]
                                ]
                            ],
                            "page" => 1,
                            "has_more" => 1
                        ]
                    ]
                ],
                "pager" => [
                    "page" => 2,
                    "count" => 108
                ]
            ]
        )
    )
);