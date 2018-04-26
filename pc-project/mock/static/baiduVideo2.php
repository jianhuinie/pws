<?php

require("../bootstrap.php");

render(
    "static/baiduVideo2",
    array(
        "tpl_data" => array(
            'teacher' =>  array(
                'teacher1' => array(
                    'name' => '小明',
                    'photo_url' => 'http://img.gsxservice.com/41337_1nirw8qu.jpeg',
                    'subject' => '水彩',
                    'intro' => '一句话介绍自己一句话介绍自己一句话介绍自己一句话介绍自己',
                    'link' => ''
                ),
                'teacher2' => array(
                    'name' => '小明',
                    'photo_url' => 'http://img.gsxservice.com/41337_1nirw8qu.jpeg',
                    'subject' => '水彩',
                    'intro' => '一句话介绍自己',
                    'link' => 32425
                ),
                'teacher3' => array(
                    'name' => '小明',
                    'photo_url' => 'http://img.gsxservice.com/41337_1nirw8qu.jpeg',
                    'subject' => '水彩',
                    'intro' => '一句话介绍自己',
                    'link' => 32425
                ),
            ),
            'activity' => array(
                '1' => array(
                    'title' => '跟谁学携手高考状元，助力你的高分之旅。',
                    'url' => ''
                ),
                '2' => array(
                    'title' => '跟谁学圆梦计划，实现你的学习梦！',
                    'url' => 'http://www.genshuixue.com/teacher/search?q=%E6%88%8F%E5%89%A7&city=17039360'
                ),
                '3' => array(
                    'title' => '你点赞，我捐餐！“教育平等 爱心传递”活动。',
                    'url' => 'http://www.genshuixue.com/teacher/search?q=%E6%88%8F%E5%89%A7&city=17039360'
                ),
            )
        )
    )
);

