<?php

require("../bootstrap.php");

render(
    "activity/newFace",
    array(
        "tpl_data" => array(
            'bg_color' => '#ff00ff',
            'share_img' => 'http://img.gsxservice.com/0cms/d/file/content/2015/06/5591152b39afb.jpg',
            'share_text' => '一键抢生源',
            'title' => '一键抢生源',
            'description' => '一键抢生源',
            'keywords' => '一键抢生源, 跟谁学',
            'share_color' => '#7e322a',
            'share_color_hover' => '#571f27',
            'banner' => array(
                'url' => 'http://img.gsxservice.com/0cms/d/file/content/2015/08/55d15778aa09f.jpg',
                'height' => '485px',
                'video'=> 'http://www.genshuixue.com/video/view/7f1e2db0fe',
                'video_img' => 'http://img.gsxservice.com/2140662_37au004y.jpg'
                ),
            'fixed' => array(
                'teacher_img' => 'http://img.gsxservice.com/0cms/d/file/content/2015/08/55d15777eae8b.png',
                'course_detail_img' => 'http://img.gsxservice.com/0cms/d/file/content/2015/08/55d1577824119.png',
                'course_detail' => 'http://www.baidu.com'
                ),
            'teacher_detail'=> array(
                array(
                    'img' => 'http://img.gsxservice.com/0cms/d/file/content/2015/08/55d1577863aff.jpg',
                    'link' => 'http://bj.m.genshuixue.com/'
                    ),
                array(
                    'img' => 'http://img.gsxservice.com/0cms/d/file/content/2015/08/55d1577863aff.jpg',
                    'link' => 'http://bj.m.genshuixue.com/'
                    ),
                array(
                    'img' => '',
                    'link' => '0'
                    ),
                array(
                    'img' => 'http://img.gsxservice.com/0cms/d/file/content/2015/08/55d1577863aff.jpg'
                    ),
                array(
                    'img' => 'http://img.gsxservice.com/2140672_7u2jffdx.jpg',
                    'link' => 'http://bj.m.genshuixue.com/'
                    ),
                array(
                    'img' => 'http://img.gsxservice.com/0cms/d/file/content/2015/08/55d1577863aff.jpg'
                    )

                ),
            'last' => '#692626'

            )
    )
);

