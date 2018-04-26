<?php

require("../../bootstrap.php");

render(
    "activity/vacation/courseDetail",
    array(
        "tpl_data" => array(
            'one2one_detail' => array(    //一对一详情页
                [
                    'img' => "http://test-img.gsxservice.com/0cms/d/file/content/2015/12/5667e0a251e41.jpg",
                    'url' => "http://www.genshuixue.com",
                ],
                [
                    'img' => "http://test-img.gsxservice.com/0cms/d/file/content/2015/12/5667e0a251e41.jpg",
                    'url' => "图片点击url",
                ],
                [
                    'img' => "http://test-img.gsxservice.com/0cms/d/file/content/2015/12/5667e0a251e41.jpg",
                    'url' => "图片点击url",
                ],
                [
                    'img' => "http://test-img.gsxservice.com/0cms/d/file/content/2015/12/5667e0a251e41.jpg",
                    'url' => "图片点击url",
                ]

            ),
            'share_info' => array(
                [
                    'img' => "http://img.gsxservice.com/0cms/d/file/content/2015/12/5667bd1dabc27.jpg",
                    'title' => '我的全国老师',
                    "content" => "日文日语片假名字母学习发音练习和了解日本文化基础语音语调视频直播课堂学习的日语课",
                    "url" => ""
                ]

            ),
            "style" => array(
                [
                    'pc_top_pic' => 'http://img.gsxservice.com/0cms/d/file/content/2015/12/566e65fd4867e.jpg',
                    'm_top_pic' => '',
                    'background' => '#f00',
                ]

            ),
        )
    )
);

