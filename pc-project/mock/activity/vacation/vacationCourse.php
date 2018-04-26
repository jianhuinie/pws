<?php

require("../../bootstrap.php");

render(
    "activity/vacation/vacationCourse",
    array(
        "tpl_data" => array(
            "tab3_all" => false,
            "teacher_tab" => array(
                [
                    "name" => "北京地区高中名师",
                    "tag" => "tab1_bj"
                ],
                [
                    "name" => "北京地区初中名师",
                    "tag" => "tab2_bj"
                ],
            ),
            "share_info" => array(
                [
                    "img" => "http://img.gsxservice.com/0cms/d/file/content/2015/12/5667bd1dabc27.jpg",
                    "title" => "我是北京tab1的内容",
                    "content" => "日文日语片假名字母学习发音练习和了解日本文化基础语音语调视频直播课堂学习的日语课",
                    "url" => "www.baidu.com"
                ]

            ),
            "one2one_teacher" => array(
                "tab1_bj" => array(
                    [
                        "head_pic" => "http://test-img.gsxservice.com/0cms/d/file/content/2015/12/5667e0a251e41.jpg",
                        "course_title" => "这是1号",
                        "course_url" => "http://www.genshuixue.com/org_class_course/detail/6671616904",
                        "teacher_name" => "老师名",
                        "teach_age" => "老师教年",
                        "intro" => "老师简介老师简介老师简介老师简介老师简介老师简介老师简介老师简介老师简介老师简介老师简介老师简介老师简介老师简介老师简介老师简介老师简介老师简介老师简介老师简介老师简介老师简介老师简介老师简介老师简介",
                        "original_price" => "1000",
                        "price" => "10",
                        "more_url" => "/activity/winterVacation",
                        "video_url" => ""
                    ],
                    [
                        "head_pic" => "http://test-img.gsxservice.com/0cms/d/file/content/2015/12/5667e0a251e41.jpg",
                        "course_title" => "这是1号",
                        "course_url" => "http://www.genshuixue.com/org_class_course/detail/6671616904",
                        "teacher_name" => "老师名",
                        "teach_age" => "老师教年",
                        "intro" => "老师简介",
                        "original_price" => "1000",
                        "price" => "10",
                        "more_url" => "了解更多url地址",
                        "video_url" => "/video/view/97707"
                    ],
                ),
                "tab2_bj" => array(
                    [
                        "head_pic" => "http://test-img.gsxservice.com/0cms/d/file/content/2015/12/5667e0a251e41.jpg",
                        "course_title" => "这是1号",
                        "course_url" => "http://www.genshuixue.com/org_class_course/detail/6671616904",
                        "teacher_name" => "老师名",
                        "teach_age" => "老师教年",
                        "intro" => "老师简介老师简介老师简介老师简介老师简介老师简介老师简介老师简介老师简介老师简介老师简介老师简介老师简介老师简介老师简介老师简介老师简介老师简介老师简介老师简介老师简介老师简介老师简介老师简介老师简介",
                        "original_price" => "1000",
                        "price" => "10",
                        "more_url" => "/activity/winterVacation",
                        "video_url" => ""
                    ],
                    [
                        "head_pic" => "http://test-img.gsxservice.com/0cms/d/file/content/2015/12/5667e0a251e41.jpg",
                        "course_title" => "这是1号",
                        "course_url" => "http://www.genshuixue.com/org_class_course/detail/6671616904",
                        "teacher_name" => "老师名",
                        "teach_age" => "老师教年",
                        "intro" => "老师简介",
                        "original_price" => "1000",
                        "price" => "10",
                        "more_url" => "了解更多url地址",
                        "video_url" => "/video/view/97707"
                    ],
                ),
            )
        )
    )
);

