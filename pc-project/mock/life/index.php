<?php

require("../bootstrap.php");

render(
    "life/index",
    array(
       "tpl_data" => array(
        "current" => "生活",
        "sub_en" => "living",
        "navigate" => array(
            [
                "sub_title" => "生活",
                "sub_en" => "living",
                "url" => "/life/index/live",
            ],
            [
                "sub_title" => "亲子",
                "sub_en" => "love",
                "url" => "/life/index/love",
            ]
        ),
        "banners" => array(
            [
                "banner_url" => "http://img.gsxservice.com/0cms/d/file/content/2015/11/564996af17f26.jpg",
                "click_url" => ""
            ],
            [
                "banner_url" => "http://img.gsxservice.com/0cms/d/file/content/2015/11/565566afd7b33.png",
                "click_url" => "http://baidu.com"
            ]
        ),
        "courses" => array(
            [
                "chief_title" => "毕业季，求职季",
                "vice_title" => "这里是楼层副标题",
                "classes" => array(
                    [
                        "name" => "教你如何吃出好身材",
                        "cover" => "http://img.gsxservice.com/4005217_h7h2ovoz.jpeg",
                        "recommend" => "",
                        "description" => "课程宣传词课程宣传词课程宣传词课程宣传词课程宣传词课程宣传词课程宣传词课程宣传词课程宣传词课程宣传词课程宣传词课程宣传词课程宣传词课程宣传词课程宣传词课程宣传词课程宣传词课程宣传词",
                        "price" => "0",
                        "course_date" => "",
                        "applied" => 0,
                        "detail_url" => "http://test.genshuixue.com/teacher/classCourseDetail/150909478162",
                        "item_type" => '3810',
                        "item_id" => "32",
                    ],
                    [
                        "name" => "教你如何吃出好身材",
                        "cover" => "http://img.gsxservice.com/4005217_h7h2ovoz.jpeg",
                        "recommend" => "课程推荐语",
                        "description" => "课程宣传词课程宣传词课程宣传词课程宣传词课程宣",
                        "price" => "12.34",
                        "course_date" => "2015-11-12",
                        "applied" => 21,
                        "surplus_applied" => 11,
                        "detail_url" => "http://test.genshuixue.com/teacher/classCourseDetail/150909478162",
                        "item_type" => 'teacher',
                        "item_id" => "32",
                    ],
                    [
                        "name" => "教你如何吃出好身材",
                        "cover" => "http://img.gsxservice.com/4005217_h7h2ovoz.jpeg",
                        "recommend" => "课程推荐语课程推荐语课程推荐语课程推荐语课程推荐语课程推荐语课程推荐语课程推荐语课程推荐语课程推荐语课程推荐语课程推荐语课程推荐语课程推荐语课程推荐语",
                        "description" => "课程宣传词",
                        "price" => "0",
                        "course_date" => "2015-11-12",
                        "applied" => 0,
                        "detail_url" => "http://test.genshuixue.com/teacher/classCourseDetail/150909478162",
                        "item_type" => 'teacher',
                        "item_id" => "32",
                    ],
                    [
                        "name" => "教你如何吃出好身材",
                        "cover" => "http://img.gsxservice.com/4005217_h7h2ovoz.jpeg",
                        "recommend" => "",
                        "description" => "课程宣传词",
                        "price" => "0",
                        "course_date" => "",
                        "applied" => 0,
                        "detail_url" => "http://test.genshuixue.com/teacher/classCourseDetail/150909478162",
                        "item_type" => '3810',
                        "item_id" => "32",
                    ],
                )
            ],
            [
                "chief_title" => "毕业季，求职季",
                "vice_title" => "这里是楼层副标题",
                "classes" => array(
                    [
                        "name" => "教你如何吃出好身材",
                        "cover" => "http://img.gsxservice.com/4005217_h7h2ovoz.jpeg",
                        "recommend" => "课程推荐语",
                        "description" => "课程宣传词",
                        "price" => "12.34",
                        "course_date" => "2015-11-12",
                        "applied" => 21,
                        "surplus_applied" => 11,
                        "detail_url" => "http://test.genshuixue.com/teacher/classCourseDetail/150909478162",
                        "item_type" => 'teacher',
                        "item_id" => "32",
                    ],
                    [
                        "name" => "教你如何吃出好身材",
                        "cover" => "http://img.gsxservice.com/4005217_h7h2ovoz.jpeg",
                        "recommend" => "课程推荐语",
                        "description" => "课程宣传词",
                        "price" => "12.34",
                        "course_date" => "2015-11-12",
                        "applied" => 21,
                        "surplus_applied" => 11,
                        "detail_url" => "http://test.genshuixue.com/teacher/classCourseDetail/150909478162",
                        "item_type" => 'teacher',
                        "item_id" => "32",
                    ]
                )
            ]
        ),
        "guest" => array(
            "cover" => "http://img.gsxservice.com/4005217_h7h2ovoz.jpeg",
            "theme" => "我是海贼王",
            "guest_name" => "路飞",
            "guest_desc" => "简介",
            "se_time" => "开始结束时间",
            "theme_desc" => "主题简介主题简介主题主题简介主题简介主题简主题简介主题简介主题主题简介主题简介主题简主题简介主题简介主题主题简介主题简介主题简主题简介主题简介主题主题简介主题简介主题简主题简介主题简介主题主题简介主题简介主题简主题简介主题简主题简介主题简介主题主题简介主题简介主题简主题简介主题简介主题主题简介主题简介主题简介主题主题简介主题简介主题简",
            "apply_way" => "富文本",
            "applied" => 21,
            "surplus_applied" => 2,
            "detail_url" => "http://test.genshuixue.com/teacher/classCourseDetail/150909478162",
            "is_applied" => 0,
            "item_type" => 'video',
            "item_id" => "32",
        ),
        "selected" => array(
            "chief_title" => "毕业季，求职季",
            "vice_title" => "这里是楼层副标题",
            "classes" => array(
                [
                    "name" => "教你如何吃出好身材",
                    "cover" => "http://img.gsxservice.com/4005217_h7h2ovoz.jpeg",
                    "recommend" => "课程推荐语",
                    "description" => "课程宣传词",
                    "price" => "12.34",
                    "course_date" => "2015-11-12",
                    "applied" => 21,
                    "surplus_applied" => 11,
                    "detail_url" => "http://test.genshuixue.com/teacher/classCourseDetail/150909478162",
                    "item_type" => 'teacher',
                    "item_id" => "32",
                ],
                [
                    "name" => "教你如何吃出好身材",
                    "cover" => "http://img.gsxservice.com/4005217_h7h2ovoz.jpeg",
                    "recommend" => "课程推荐语",
                    "description" => "课程宣传词",
                    "price" => "12.34",
                    "course_date" => "2015-11-12",
                    "applied" => 21,
                    "surplus_applied" => 11,
                    "detail_url" => "http://test.genshuixue.com/teacher/classCourseDetail/150909478162",
                    "item_type" => 'teacher',
                    "item_id" => "32",
                ],
                [
                    "name" => "教你如何吃出好身材",
                    "cover" => "http://img.gsxservice.com/4005217_h7h2ovoz.jpeg",
                    "recommend" => "",
                    "description" => "课程宣传词",
                    "price" => "0",
                    "course_date" => "",
                    "applied" => 0,
                    "detail_url" => "http://test.genshuixue.com/teacher/classCourseDetail/150909478162",
                    "item_type" => '3810',
                    "item_id" => "32",
                ],
                [
                    "name" => "教你如何吃出好身材",
                    "cover" => "http://img.gsxservice.com/4005217_h7h2ovoz.jpeg",
                    "recommend" => "",
                    "description" => "课程宣传词",
                    "price" => "0",
                    "course_date" => "",
                    "applied" => 0,
                    "detail_url" => "http://test.genshuixue.com/teacher/classCourseDetail/150909478162",
                    "item_type" => '3810',
                    "item_id" => "32",
                ],
            ),

        ),
        "friendLinks" => array(
            [
                "title" => "搜狐教育",
                "link" => "http://learning.sohu.com/",
                "nofollow" => false,
                "jsload" => true
            ],
            [
                "title" => "爱奇艺教育",
                "link" => "http://edu.iqiyi.com/",
                "nofollow" => false,
                "jsload" => true
            ],
            [
                "title" => "中国网教育",
                "link" => "http://edu.china.com.cn/",
                "nofollow" => false,
                "jsload" => true
            ],
            [
                "title" => "央广网教育",
                "link" => "http://edu.cnr.cn/",
                "nofollow" => false,
                "jsload" => true
            ]
        )
    )

    )
);