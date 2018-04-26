<?php

require("../bootstrap.php");

render(
    "activity/abroadSchoolDetail",
    array(
        "tpl_data" => array(
            // "page_title" => "普林斯顿大学",
            // "page_des" => "普林斯顿大学",
            // "page_keywords" => "普林斯顿大学",
            // "share_text" => "普林斯顿大学", //分享文案
            // "share_image" => "http://img.gsxservice.com/0cms/d/file/content/2015/08/55d5724a93b44.jpg", //分享图片
            // "page_backgroune" => "#ffffff", //页面背景色
            // "top_image" => "http://img.gsxservice.com/0cms/d/file/content/2015/09/55f641b136e81.jpg", //页面头图
            // "top_height" => "400px",//头图高度
            // "listbox_titbg" => "#969696", //列表模块标题背景色
            // "listbox_nomarl" => "#969696", //列表模块标题背景颜色
            // "listbox_hover" => "#303030", //列表模块标题背景颜色hover
            // "page_bottom" => "#303030", //页面底部背景色
            "list_titles"=> array("美国","加拿大","澳洲","亚洲","英国"),
            "video_datas" => array(
                array(
                    'video_url' => 'http://www.genshuixue.com/video/view/44619',
                    'intro' => '大片大片大片大片大片大片',
                    'button_text' => '2元定制录取方案',
                    'img' => 'http://img.gsxservice.com/2821665_a5xnqk83.jpeg',
                    'href' => 'http://www.genshuixue.com/497598588'
                    ),
                array(
                    'video_url' => 'http://www.genshuixue.com/video/view/44619',
                    'intro' => '学校环境很好。',
                    'button_text' => '2元定制录取方案',
                    'img' => 'http://img.gsxservice.com/2821665_a5xnqk83.jpeg',
                    'href' => 'http://www.genshuixue.com/497598588'
                    ),
                array(
                    'video_url' => 'http://www.genshuixue.com/video/view/44619',
                    'intro' => '大片大片大片大片',
                    'button_text' => '2元定制录取方案',
                    'img' => 'http://img.gsxservice.com/2821665_a5xnqk83.jpeg',
                    'href' => 'http://www.genshuixue.com/497598588'
                    ),
                array(
                    'video_url' => 'http://www.genshuixue.com/video/view/44619',
                    'intro' => '大片大片大片大片大片大片大片大片大片大片大片大片大片大片大片大片',
                    'button_text' => '2元定制录取方案',
                    'img' => 'http://img.gsxservice.com/2821665_a5xnqk83.jpeg',
                    'href' => 'http://www.genshuixue.com/497598588'
                    ),
                array(
                    'video_url' => 'http://www.genshuixue.com/video/view/44619',
                    'intro' => '大片大片大片大片',
                    'button_text' => '2元定制录取方案',
                    'img' => 'http://img.gsxservice.com/2821665_a5xnqk83.jpeg',
                    'href' => 'http://www.genshuixue.com/497598588'
                    )
                ),
            'news_data' => array(
                array(
                'img' => 'http://img.gsxservice.com/2691986_mqjjfsrm.jpg',
                'title' => '学校环境很好学校环境很好学校环境很好好。',
                'detail' => '学校环境很好学校环境很好学校环境很好好学校环境很好好学校环境很好。学校环境很好学校环境很好学校环境很好好学校环境很好好学校环境很好。',
                'link' => 'http://www.genshuixue.com/497598588'
                 ),
                array(
                'img' => '',
                'title' => '学校环境很好学校环境很好学校环境很好好。',
                'detail' => '学校环境很好学校环境很好学校环境很好好学校环境很好好学校环境很好。学校环境很好学校环境很好学校环境很好好学校环境很好好学校环境很好。',
                'link' => 'http://www.genshuixue.com/497598588'
                 ),
                array(
                'img' => 'http://img.gsxservice.com/2691986_mqjjfsrm.jpg',
                'title' => '学校环境很好学校环境很好学校环境很好好。',
                'detail' => '学校环境很好学校环境很好学校环境很好好学校环境很好好学校环境很好。学校环境很好学校环境很好学校环境很好好学校环境很好好学校环境很好。',
                'link' => 'http://www.genshuixue.com/497598588'
                 ),
                array(
                'img' => '',
                'title' => '学校环境很好学校环境很好学校环境很好好。',
                'detail' => '学校环境很好学校环境很好学校环境很好好学校环境很好好学校环境很好。学校环境很好学校环境很好学校环境很好好学校环境很好好学校环境很好。',
                'link' => 'http://www.genshuixue.com/497598588'
                 ),
                array(
                'img' => 'http://img.gsxservice.com/2691986_mqjjfsrm.jpg',
                'title' => '学校环境很好学校环境很好学校环境很好好。学校环境很好学校环境很好学校环境很好好。',
                'detail' => '习近平同志高度重视县域治理和县委书记队伍建设，在百忙中与县委书记研修班学员座谈，会见全国优秀县委书记，深入县域考察调研，多次发表重要讲话。他指出：在我们党的组织结构和国家政权结构中，县一级处在承上启下的关键环节，是发展经济、保障民生、维护稳定、促进国家长治久安的重要基础，也是干部干事创业、锻炼成长的基本功训练基地。他把县域治理最大的特点形象地概括为既“接天线”又“接地气”。即：对上，要贯彻党的路',
                'link' => 'http://www.genshuixue.com/497598588'
                 )
            ),
            'share' => array(
                "share_image" => "http://img.gsxservice.com/0cms/d/file/content/2015/09/55ebe22495797.jpg",
                "share_text" => "梦想还是要有的，万一在【那天】实现了呢！",
                "title" => "梦想还是要有的，万一在【那天】实现了呢！",
                "description" => "跟谁学热门老师，那天",
                "keywords" => "名师,托福,老师,跟谁学,口语老师,英语老师",
                "name" => "留学院校库"
            ),
            "style" => array(
                "top_image" => "http://img.gsxservice.com/0cms/d/file/content/2015/09/55f641b136e81.jpg",
                "top_height" => "658px",
                "listbox_titbg" => "#ffffff",
                "listbox_nomarl" => "#0d88c9",
                "listbox_hover" => "#41c2f2",
                "listbox_conbg" => "#f6f6f6",
                "page_bottom" => "#43c0ec"
            )
        )
    )
);

