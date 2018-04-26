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
                "title" => '小火锅的金风科技', //帖子标题
                "brief" => 'sdfdjfjlsdjfd',    //帖子摘要
                "img" => 'a.jpg',          //帖子图片
                "author" => '张三',          //帖子作者
                "group_name" => '出国留学',    //所属小组
                "create_time" => '5分钟前',   //发帖时间
                "reply_num" => 10,         //回复数
                "zan_num" => 10,           //赞数
                'user_homepage_url' => '',   //用户主页
                'group_info_url' => ''   //小组主页

            ],
            [
                "title" => '小火锅的金风科技', //帖子标题
                "brief" => 'sdfdjfjlsdjfd',    //帖子摘要
                "img" => 'a.jpg',          //帖子图片
                "author" => '张三',          //帖子作者
                "group_name" => '出国留学',    //所属小组
                "create_time" => '5分钟前',   //发帖时间
                "reply_num" => 10,         //回复数
                "zan_num" => 10,           //赞数
                'user_homepage_url' => '',   //用户主页
                'group_info_url' => ''   //小组主页
            ],
            [
                "title" => '小火锅的金风科技', //帖子标题
                "brief" => 'sdfdjfjlsdjfd',    //帖子摘要
                "img" => 'a.jpg',          //帖子图片
                "author" => '张三',          //帖子作者
                "group_name" => '出国留学',    //所属小组
                "create_time" => '5分钟前',   //发帖时间
                "reply_num" => 10,         //回复数
                "zan_num" => 10,           //赞数
                'user_homepage_url' => '',   //用户主页
                'group_info_url' => ''   //小组主页
            ]
        ]
    )
);

echo json_encode($response);

