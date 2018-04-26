<?php

require("../bootstrap.php");

render(
    "headline/index",
    array(
       "tpl_data" => array(

            "article_list" => [
                [
                    "article_form" => "cms",
                    "article_number" => "15072469192",
                    "avatar" => "http://test-img.gsxservice.com/277978_qpezj6b6.jpeg",
                    "cover" => "http://test-img.gsxservice.com/277978_qpezj6b6.png",
                    "create_at" => "07-24",
                    "headline" => "文章<a>",
                    "content" => "<h4>wew</h4>",
                    "qid" => 0,
                    "role" => -1,
                    "search_form" => "cms",
                    "subhead" => "xx",
                    "has_img" => 1,
                    "url" => "http://lixin-www.test.genshuixue.com/article/detail/15072469192"
                ],
                [
                    "article_form" => "cms",
                    "article_number" => "15072469192",
                    "avatar" => "",
                    "cover" => null,
                    "create_at" => "07-24",
                    "headline" => "文章<a>",
                    "content" => "<h4>wew</h4>",
                    "qid" => 0,
                    "role" => -1,
                    "search_form" => "cms",
                    "subhead" => "xx",
                    "has_img" => 0,
                    "url" => "http://lixin-www.test.genshuixue.com/article/detail/15072469192"
                ]
            ],
            "channel" => [
                "channel_id" => "405",
                "name" => "中小学"
            ],
            "channel_list" => [
                [
                    "channel_id" => "404",
                    "name" => "头条",
                    "url" => "http://lixin-www.test.genshuixue.com/article/news/"
                ],
                [
                    "channel_id" => "405",
                    "name" => "中小学",
                    "url" => "http://lixin-www.test.genshuixue.com/article/news/zhongxiaoxue"
                ],
                [
                    "channel_id" => "406",
                    "name" => "大学教育",
                    "url" => "http://lixin-www.test.genshuixue.com/article/news/daxue"
                ],
                [
                    "channel_id" => "413",
                    "name" => "出国留学",
                    "url" => "http://lixin-www.test.genshuixue.com/article/news/liuxue"
                ],
                [
                    "channel_id" => "414",
                    "name" => "语言培训",
                    "url" => "http://lixin-www.test.genshuixue.com/article/news/yuyan"
                ],
                [
                    "channel_id" => "415",
                    "name" => "艺体教育",
                    "url" => "http://lixin-www.test.genshuixue.com/article/news/yishu"
                ],
                [
                    "channel_id" => "416",
                    "name" => "备孕早教",
                    "url" => "http://lixin-www.test.genshuixue.com/article/news/beiyunzaojiao"
                ],
                [
                    "channel_id" => "427",
                    "name" => "资格考试",
                    "url" => "http://lixin-www.test.genshuixue.com/article/news/zige"
                ],
                [
                    "channel_id" => "447",
                    "name" => "兴趣技能",
                    "url" => "http://lixin-www.test.genshuixue.com/article/news/xingqu"
                ],
                [
                    "channel_id" => "448",
                    "name" => "书博",
                    "url" => "http://lixin-www.test.genshuixue.com/article/news"
                ]
            ],
            "description" => "跟谁学为您提供学习头条信息、教育资讯。中学辅导，中学试题，小学辅导，小学试题信息与教育新闻。跟谁学致力打造人人乐用的学习服务平台。找好老师，上跟谁学！",
            "has_more" => 0,
            "page_keywords" => "中学辅导,中学试题,小学辅导,小学试题",
            "page_title" => "中学辅导,中学试题,小学辅导,小学试题-跟谁学",
            "pager" => [
                "count" => 42,
                "page" => 1,
                "page_size" => 20
            ],
            "relativeTeachers" => [
                "more" => "http://lixin-www.test.genshuixue.com/st/-140.html",
                "teachers" => [
                    [
                        "vip_level" => 3, // 0非会员 1普通会员 2高级会员 3超级会员
                        "qid" => "5ec6a563-f0fc-e66b-d1f9-70e099c40e69",
                        "search_form" => "apiArticleRT",
                        "avatar" => "http://test-img.gsxservice.com/headpic_woman.png",
                        "display_name" => "师资03",
                        "school_age" => "25年教龄",
                        "type" => "留学",
                        "url" => "http://lixin-www.test.genshuixue.com/zhangpingping"
                    ],
                    [
                        "vip_level" => 3, // 0非会员 1普通会员 2高级会员 3超级会员
                        "qid" => "5ec6a563-f0fc-e66b-d1f9-70e099c40e69",
                        "search_form" => "apiArticleRT",
                        "avatar" => "http://test-img.gsxservice.com/headpic_woman.png",
                        "display_name" => "师资03",
                        "school_age" => "25年教龄",
                        "type" => "留学",
                        "url" => "http://lixin-www.test.genshuixue.com/zhangpingping"
                    ],
                ]
            ],
            "relativeCourses" => [
                "more" => "http://lixin-www.test.genshuixue.com/st/-140.html",
                "courses" => [
                    [
                        "headline" => "sdsd",
                        "school_age" => "25年教龄",
                        "teacher_name" => "sdsdlkj",
                        "teacher_url" => "http://www.baidu.com",
                        "avatar" => "http://test-img.gsxservice.com/headpic_woman.png",
                        "url" => "http://lixin-www.test.genshuixue.com/zhangpingping",
                        "qid" => "d55defd0-cf8a-2a23-42bc-6dc385f38374",
                        "search_form" => "apiArticleRC"
                    ],
                    [
                        "headline" => "sdsd",
                        "school_age" => "25年教龄",
                        "teacher_name" => "sdsdlkj",
                        "teacher_url" => "http://www.baidu.com",
                        "avatar" => "http://test-img.gsxservice.com/headpic_woman.png",
                        "url" => "http://lixin-www.test.genshuixue.com/zhangpingping",
                        "qid" => "d55defd0-cf8a-2a23-42bc-6dc385f38374",
                        "search_form" => "apiArticleRC"
                    ]
                ]
            ],
            "news_base_url" => "http://news.genshuixue.com/"
        )
    )
);