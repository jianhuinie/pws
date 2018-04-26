<?php

require("../bootstrap.php");

render(
    "main/main",
    array(
        "tpl_data" => array(
            // "is_www" => false, // 是否是全国站
            "hotwords" => array(
                "hot_words_list" =>[
                    array(
                        'name' => "数学",
                        'type' => "organic",
                    ),
                    array(
                        'name' => "语文",
                        'type' => "manual",
                    ),
                    array(
                        'name' => "英语",
                        'type' => "personalized",
                    ),
                ],
            ),
            "banner" => array(
                "5" => [ //1
                    array(
                        "hover" => "朱磊",
                        "material" => "http://test-img.gsxservice.com/346142_gerk3fxy.png",
                        "click" => "gsx://video?id=1182",
                        "monitor" => "http://test-pm-gat.genshuixue.com/m?p=1&b=1&g=130&c=102",
                        "clickMonitor" => "http://baidu.com"
                    ),
                    array(
                        "hover" => "新安龙",
                        "material" => "",
                        "click" => "/t/cuiguowei",
                        "monitor" => "http://test-pm-gat.genshuixue.com/m?p=1&b=1&g=130&c=102",
                        "clickMonitor" => "http://baidu.com"
                    ),
                    array(
                        "hover" => "新安龙",
                        "material" => "",
                        "click" => "/t/cuiguowei",
                        "monitor" => "http://test-pm-gat.genshuixue.com/m?p=1&b=1&g=130&c=102",
                        "clickMonitor" => "http://baidu.com"
                    )
                ],
                "6" => [  //2-1 4
                    array(
                        "hover" => "马思远",
                        "material" => "",
                        "click" => "/t/cuiguowei",
                        "monitor" => "http://test-pm-gat.genshuixue.com/m?p=1&b=1&g=130&c=102",
                        "clickMonitor" => "http://baidu.com"
                    ),
                    array(
                        "hover" => "马思远",
                        "material" => "",
                        "click" => "/t/cuiguowei",
                        "monitor" => "http://test-pm-gat.genshuixue.com/m?p=1&b=1&g=130&c=102",
                        "clickMonitor" => "http://baidu.com"
                    ),
                    array(
                        "hover" => "马思远",
                        "material" => "",
                        "click" => "/t/cuiguowei",
                        "monitor" => "http://test-pm-gat.genshuixue.com/m?p=1&b=1&g=130&c=102",
                        "clickMonitor" => "http://baidu.com"
                    ),
                    array(
                        "hover" => "马思远",
                        "material" => "",
                        "click" => "/t/cuiguowei",
                        "monitor" => "http://test-pm-gat.genshuixue.com/m?p=1&b=1&g=130&c=102",
                        "clickMonitor" => "http://baidu.com"
                    )
                ],
                "7" => [ //2-2 2
                    array(
                        "hover" => "马思远",
                        "material" => "",
                        "click" => "/t/cuiguowei",
                        "monitor" => "http://test-pm-gat.genshuixue.com/m?p=1&b=1&g=130&c=102",
                        "clickMonitor" => "http://baidu.com"
                    ),
                    array(
                        "hover" => "马思远",
                        "material" => "",
                        "click" => "/t/cuiguowei",
                        "monitor" => "http://test-pm-gat.genshuixue.com/m?p=1&b=1&g=130&c=102",
                        "clickMonitor" => "http://baidu.com"
                    )
                ],
                "8" => [ //2-3 2
                    array(
                        "hover" => "马思远",
                        "material" => "",
                        "click" => "/t/cuiguowei",
                        "monitor" => "http://test-pm-gat.genshuixue.com/m?p=1&b=1&g=130&c=102",
                        "clickMonitor" => "http://baidu.com"
                    ),
                    array(
                        "hover" => "马思远",
                        "material" => "",
                        "click" => "/t/cuiguowei",
                        "monitor" => "http://test-pm-gat.genshuixue.com/m?p=1&b=1&g=130&c=102",
                        "clickMonitor" => "http://baidu.com"
                    )
                ],
                "9" => [ //2-3 12
                    array(
                        "hover" => "马思远",
                        "material" => "http://test-img.gsxservice.com/346167_zlx4mscz.png",
                        "click" => "",
                        "monitor" => "http://test-pm-gat.genshuixue.com/m?p=1&b=1&g=130&c=102",
                        "clickMonitor" => "http://baidu.com"
                    ),
                    array(
                        "hover" => "马思远",
                        "material" => "",
                        "click" => "/t/cuiguowei",
                        "monitor" => "http://test-pm-gat.genshuixue.com/m?p=1&b=1&g=130&c=102",
                        "clickMonitor" => "http://baidu.com"
                    ),
                    array(
                        "hover" => "马思远",
                        "material" => "",
                        "click" => "/t/cuiguowei",
                        "monitor" => "http://test-pm-gat.genshuixue.com/m?p=1&b=1&g=130&c=102",
                        "clickMonitor" => "http://baidu.com"
                    ),
                    array(
                        "hover" => "马思远",
                        "material" => "",
                        "click" => "/t/cuiguowei",
                        "monitor" => "http://test-pm-gat.genshuixue.com/m?p=1&b=1&g=130&c=102",
                        "clickMonitor" => "http://baidu.com"
                    ),
                    array(
                        "hover" => "马思远",
                        "material" => "",
                        "click" => "/t/cuiguowei",
                        "monitor" => "http://test-pm-gat.genshuixue.com/m?p=1&b=1&g=130&c=102",
                        "clickMonitor" => "http://baidu.com"
                    ),
                    array(
                        "hover" => "马思远",
                        "material" => "",
                        "click" => "/t/cuiguowei",
                        "monitor" => "http://test-pm-gat.genshuixue.com/m?p=1&b=1&g=130&c=102",
                        "clickMonitor" => "http://baidu.com"
                    ),
                    array(
                        "hover" => "马思远",
                        "material" => "",
                        "click" => "/t/cuiguowei",
                        "monitor" => "2-3-7",
                        "clickMonitor" => "http://baidu.com"
                    ),
                    array(
                        "hover" => "马思远",
                        "material" => "",
                        "click" => "/t/cuiguowei",
                        "monitor" => "2-3-8",
                        "clickMonitor" => "http://baidu.com"
                    ),
                    array(
                        "hover" => "马思远",
                        "material" => "",
                        "click" => "/t/cuiguowei",
                        "monitor" => "2-3-9",
                        "clickMonitor" => "http://baidu.com"
                    ),
                    array(
                        "hover" => "马思远",
                        "material" => "",
                        "click" => "/t/cuiguowei",
                        "monitor" => "2-3-10",
                        "clickMonitor" => "http://baidu.com"
                    ),
                    array(
                        "hover" => "马思远",
                        "material" => "",
                        "click" => "/t/cuiguowei",
                        "monitor" => "2-3-11",
                        "clickMonitor" => "http://baidu.com"
                    ),
                    array(
                        "hover" => "马思远",
                        "material" => "",
                        "click" => "/t/cuiguowei",
                        "monitor" => "http://test-pm-gat.genshuixue.com/m?p=1&b=1&g=130&c=102",
                        "clickMonitor" => "http://baidu.com"
                    )
                ],
                "10" => [ //3
                    array(
                        "hover" => "马思远",
                        "material" => "http://test-img.gsxservice.com/346168_ap8f2n9j.png",
                        "click" => "baidu.com",
                        "monitor" => "hahahah",
                        "clickMonitor" => "http://baidu.com"
                    )
                ],
                "11" => [ //4
                    array(
                        "hover" => "马思远",
                        "material" => "http://test-img.gsxservice.com/346168_ap8f2n9j.png",
                        "click" => "baidu.com",
                        "monitor" => "whatwhatasdasdas",
                        "clickMonitor" => "http://baidu.com"
                    )
                ]
            ),
            "board" => array(
                "news" => array(
                    "catname" => "新闻",
                    "data" => array(
                        array(
                            "title" => "123",
                            "link" => "/guide/nlayout?op=new_10-31",
                        ),
                        array(
                            "title" => "123",
                            "link" => "/guide/nlayout?op=new_10-31",
                        ),
                        array(
                            "title" => "123",
                            "link" => "/guide/nlayout?op=new_10-31",
                        ),
                        array(
                            "title" => "123",
                            "link" => "/guide/nlayout?op=new_10-31",
                        )
                    ),
                    "more" => "/guide/nlayout?op=new_10-31"
                )
            ),
            "cityLinks" => [
                array(
                    "link" => "http://www.genshuixue.com/bj/",
                    "name" => "北京"
                ),
                array(
                    "link" => "http://www.genshuixue.com/sh/",
                    "name" => "上海"
                ),
                array(
                    "link" => "http://www.genshuixue.com/bj/",
                    "name" => "北京"
                ),
                array(
                    "link" => "http://www.genshuixue.com/sh/",
                    "name" => "上海"
                )
            ],
            "friendLinks" => [
                array(
                    "jsload" => false,
                    "link" => "www.baidu.com",
                    "nofollow" => true,
                    "title" => "hello"
                ),
                array(
                    "jsload" => true,
                    "link" => "www.google.com",
                    "nofollow" => false,
                    "title" => "123"
                )
            ],
            "zxx" => [
                "id" => "121221",
                "subject_list" => [
                    ["id" => "1", "name" => "上刊登"],
                    ["id" => "1", "name" => "是的"],
                    ["id" => "1", "name" => "啊是"],
                    ["id" => "1", "name" => "上刊登"],
                    ["id" => "1", "name" => "俩是"],
                    ["id" => "1", "name" => "遥遥"]
                ],
                "qid_list" => [ // 统计数据用
                    'media_list' => '123',
                    'latest_courses' => '321',
                    'hot_teachers' => '1234567',
                    'org_list' => '7654321'
                ],
                "media_list" => [
                    ["number" => "1", "name" => "sdsd", "img" => "", "author_name" => "视频课", "plan" => "", "course_url" => "", "detail_url" => "sdsds", "is_cms" => 0, "avatar_url" => "", "teacher_name" => "sdd", "type" => "1"],
                    ["number" => "2", "name" => "sdsd", "img" => "", "author_name" => "机构", "plan" => "2015-06-12", "course_url" => "", "detail_url" => "", "is_cms" => 0, "avatar_url" => "", "type" => "2"],
                    ["number" => "3", "name" => "sdsd", "img" => "http://img.gsxservice.com/1515714_2eqilwkj.jpeg", "author_name" => "老师", "plan" => "2015-06-12", "course_url" => "", "detail_url" => "", "is_cms" => 1, "avatar_url" => "", "type" => "3"]
                ],
                "hot_teachers" => [
                    ["is_cms" => 1, "number" => "111", "name" => "按实际的", "course" => "啊是的经理", "detail_url" => "", "avatar_url" => "http://img.gsxservice.com/0cms/d/file/content/2015/07/559a27bf9aa51.jpg", "summary" => "按实际的了很快2是辣的叫", "video_url" => "/video/view/7571"],
                    ["is_cms" => 1, "number" => "222", "name" => "按实际的", "course" => "啊是的经理", "detail_url" => "", "avatar_url" => "http://img.gsxservice.com/0cms/d/file/content/2015/07/559a27bf9aa51.jpg", "summary" => "按实际的了很快2是辣的叫", "video_url" => "/video/view/7571"],
                    ["is_cms" => 1, "number" => "333", "name" => "按实际的", "course" => "啊是的经理", "detail_url" => "", "avatar_url" => "http://img.gsxservice.com/0cms/d/file/content/2015/07/559a27bf9aa51.jpg", "summary" => "按实际的了很快2是辣的叫", "video_url" => ""],
                    ["is_cms" => 1, "number" => "444", "name" => "按实际的", "course" => "啊是的经理", "detail_url" => "", "avatar_url" => "http://img.gsxservice.com/0cms/d/file/content/2015/07/559a27bf9aa51.jpg", "summary" => "按实际的了很快2是辣的叫", "video_url" => ""],
                    ["is_cms" => 1, "number" => "555", "name" => "按实际的", "course" => "啊是的经理", "detail_url" => "", "avatar_url" => "http://img.gsxservice.com/0cms/d/file/content/2015/07/559a27bf9aa51.jpg", "summary" => "按实际的了很快2是辣的叫", "video_url" => ""],
                    ["is_cms" => 1, "number" => "666", "name" => "按实际的", "course" => "啊是的经理", "detail_url" => "", "avatar_url" => "http://img.gsxservice.com/0cms/d/file/content/2015/07/559a27bf9aa51.jpg", "summary" => "按实际的了很快2是辣的叫", "video_url" => ""]
                ],
                "latest_courses" => [
                    ["is_cms" => 1, "number" => "11", "name" => "课程1", "type" => "1", "url" => ""],//1 线下，2 直播，3 视频
                    ["is_cms" => 1, "number" => "22", "name" => "课程2", "type" => "2", "url" => ""],
                    ["is_cms" => 1, "number" => "33", "name" => "课程3", "type" => "3", "url" => ""],
                    ["is_cms" => 1, "number" => "44", "name" => "课程4", "type" => "1", "url" => ""],
                    ["is_cms" => 1, "number" => "55", "name" => "课程5", "type" => "1", "url" => ""]
                ],
                "hot_articles" => [
                    "articles" => [
                        ["number" => "122", "title" => "文章1", "url" => ""],
                        ["number" => "122", "title" => "文章2", "url" => ""],
                        ["number" => "122", "title" => "文章3", "url" => ""],
                        ["number" => "122", "title" => "文章4", "url" => ""],
                        ["number" => "122", "title" => "文章4", "url" => ""]
                    ],
                    "more_url" => "http://"
                ],
                "student_comments" => [
                    ["tnumber" => "122", "content" => "入职前就，给我们很多研发同学讲过数据库优化的培训，很多同学都受益不少。", "teacher_url" => "", "avatar_url" => "http://img.gsxservice.com/30517_djgkb6i6.jpeg", "display_name" => "小脚丫A", "course_name" => "初中英语-国际音标", "course_type" => "在线授课"],
                    ["tnumber" => "1223", "content" => "给我们很多研发同学讲过数据库优化的培训，很多同学都受益不少。优化以及其它存储优化方面的工作", "teacher_url" => "", "avatar_url" => "", "display_name" => "小大丫B", "course_name" => "初中英语-国际音标", "course_type" => "线下授课"],
                    ["tnumber" => "1224", "content" => "0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789", "teacher_url" => "", "avatar_url" => "", "display_name" => "小大丫C", "course_name" => "初中英语", "course_type" => "在线直播"]
                ],
                "org_list" => [
                    ["is_cms" => 1, "number" => "1111", "name" => "sds", "logo" => "http://img.gsxservice.com/801774_rvxx7697.jpg", "domain" => ""],
                    ["is_cms" => 1, "number" => "2222", "name" => "a", "logo" => "http://img.gsxservice.com/34618_vziuujxs.jpg", "domain" => ""],
                    ["is_cms" => 1, "number" => "3333", "name" => "v", "logo" => "http://img.gsxservice.com/1556017_l7jfhsh4.jpg", "domain" => ""]
                ]
            ],
            "cglx" => [
                "id" => "121221",
                "subject_list" => [
                    ["id" => "1", "name" => "上刊登"],
                    ["id" => "1", "name" => "是的"],
                    ["id" => "1", "name" => "啊是"],
                    ["id" => "1", "name" => "上刊登"],
                    ["id" => "1", "name" => "俩是"],
                    ["id" => "1", "name" => "遥遥"]
                ],
                "qid_list" => [ // 统计数据用
                    'media_list' => '24234',
                    'latest_courses' => '2313',
                    'hot_teachers' => '23424',
                    'org_list' => '2344'
                ],
                "media_list" => [
                    ["number" => "12121", "name" => "sdsd", "img" => "", "author_name" => "视频课", "plan" => "", "course_url" => "", "detail_url" => "sdsds", "is_cms" => 1, "avatar_url" => "", "type" => "1"],
                    ["number" => "12121", "name" => "sdsd", "img" => "", "author_name" => "机构", "plan" => "2015-06-12", "course_url" => "", "detail_url" => "", "is_cms" => 1, "avatar_url" => "", "type" => "2"],
                    ["number" => "12121", "name" => "sdsd", "img" => "", "author_name" => "老师", "plan" => "2015-06-12", "course_url" => "", "detail_url" => "", "is_cms" => 1, "avatar_url" => "", "type" => "3"]
                ],
                "hot_teachers" => [
                    ["is_cms" => 1, "number" => "3424314", "name" => "按实际的", "course" => "啊是的经理", "detail_url" => "", "avatar_url" => "http://img.gsxservice.com/0cms/d/file/content/2015/07/559a27bf9aa51.jpg", "summary" => "按实际的了很快2是辣的叫", "video_url" => "ss"],
                    ["is_cms" => 1, "number" => "3424314", "name" => "按实际的", "course" => "啊是的经理", "detail_url" => "", "avatar_url" => "http://img.gsxservice.com/0cms/d/file/content/2015/07/559a27bf9aa51.jpg", "summary" => "按实际的了很快2是辣的叫", "video_url" => "ss"],
                    ["is_cms" => 1, "number" => "3424314", "name" => "按实际的", "course" => "啊是的经理", "detail_url" => "", "avatar_url" => "http://img.gsxservice.com/0cms/d/file/content/2015/07/559a27bf9aa51.jpg", "summary" => "按实际的了很快2是辣的叫", "video_url" => ""],
                    ["is_cms" => 1, "number" => "3424314", "name" => "按实际的", "course" => "啊是的经理", "detail_url" => "", "avatar_url" => "http://img.gsxservice.com/0cms/d/file/content/2015/07/559a27bf9aa51.jpg", "summary" => "按实际的了很快2是辣的叫", "video_url" => ""],
                    ["is_cms" => 1, "number" => "3424314", "name" => "按实际的", "course" => "啊是的经理", "detail_url" => "", "avatar_url" => "http://img.gsxservice.com/0cms/d/file/content/2015/07/559a27bf9aa51.jpg", "summary" => "按实际的了很快2是辣的叫", "video_url" => ""]
                ],
                "latest_courses" => [
                    ["is_cms" => 1, "number" => "12121","number" => "12121",  "name" => "课程1", "type" => "1", "url" => ""],//1 线下，2 直播，3 视频
                    ["is_cms" => 1, "number" => "12121","number" => "12121",  "name" => "课程2", "type" => "2", "url" => ""],
                    ["is_cms" => 1, "number" => "12121","number" => "12121",  "name" => "课程3", "type" => "3", "url" => ""],
                    ["is_cms" => 1, "number" => "12121","number" => "12121",  "name" => "课程4", "type" => "1", "url" => ""]
                ],
                "hot_articles" => [
                    "articles" => [
                        ["number" => "12121", "title" => "文章1", "url" => ""],
                        ["number" => "12121", "title" => "文章2", "url" => ""],
                        ["number" => "12121", "title" => "文章3", "url" => ""],
                        ["number" => "12121", "title" => "文章4", "url" => ""]
                    ],
                    "more_url" => "http://"
                ],
                "student_comments" => [
                    ["tnumber" => "12121", "teacher_url" => "", "content" => "入职前就客串，给我们很多研发同学讲过数据库优化的培训，很多同学都受益不少。优化以及其它存储优化方面的工作", "avatar_url" => "", "display_name" => "小脚丫", "course_name" => "初中英语-国际音标", "course_type" => "在线授课"],
                    ["tnumber" => "12121", "teacher_url" => "", "content" => "入职前就客串，给我们很多研发同学讲过数据库优化的培训，很多同学都受益不少。优化以及其它存储优化方面的工作", "avatar_url" => "", "display_name" => "小大丫", "course_name" => "初中英语-国际音标", "course_type" => "线下授课"],
                    ["tnumber" => "12121", "teacher_url" => "", "content" => "入职前就客串，给我们很多研发同学讲过数据库优化的培训，很多同学都受益不少。优化以及其它存储优化方面的工作", "avatar_url" => "", "display_name" => "小大丫", "course_name" => "初中英语", "course_type" => "在线直播"]
                ],
                "org_list" => [
                    ["is_cms" => 1, "number" => "12121", "name" => "sds", "logo" => "http://img.gsxservice.com/801774_rvxx7697.jpg", "domain" => ""],
                    ["is_cms" => 1, "number" => "12121", "name" => "a", "logo" => "", "domain" => ""],
                    ["is_cms" => 1, "number" => "12121", "name" => "v", "logo" => "", "domain" => ""]
                ]
            ],
            "ytxq" => [
                "id" => "121221",
                "subject_list" => [
                    ["id" => "1", "name" => "上刊登"],
                    ["id" => "1", "name" => "是的"],
                    ["id" => "1", "name" => "啊是"],
                    ["id" => "1", "name" => "上刊登"],
                    ["id" => "1", "name" => "俩是"],
                    ["id" => "1", "name" => "遥遥"]
                ],
                "qid_list" => [ // 统计数据用
                    'media_list' => '24234',
                    'latest_courses' => '2313',
                    'hot_teachers' => '23424',
                    'org_list' => '2344'
                ],
                "media_list" => [
                    ["number" => "12121", "name" => "sdsd", "img" => "", "author_name" => "视频课", "plan" => "", "course_url" => "", "detail_url" => "sdsds", "is_cms" => 1, "avatar_url" => "", "type" => "1"],
                    ["number" => "12121", "name" => "sdsd", "img" => "", "author_name" => "机构", "plan" => "2015-06-12", "course_url" => "", "detail_url" => "", "is_cms" => 1, "avatar_url" => "", "type" => "1"],
                    ["number" => "12121", "name" => "sdsd", "img" => "", "author_name" => "老师", "plan" => "2015-06-12", "course_url" => "", "detail_url" => "", "is_cms" => 1, "avatar_url" => "", "type" => "1"]
                ],
                "hot_teachers" => [
                    ["is_cms" => 1, "number" => "3424314", "name" => "按实际的", "course" => "啊是的经理", "detail_url" => "", "avatar_url" => "http://img.gsxservice.com/0cms/d/file/content/2015/07/559a27bf9aa51.jpg", "summary" => "按实际的了很快2是辣的叫", "video_url" => "ss"],
                    ["is_cms" => 1, "number" => "3424314", "name" => "按实际的", "course" => "啊是的经理", "detail_url" => "", "avatar_url" => "http://img.gsxservice.com/0cms/d/file/content/2015/07/559a27bf9aa51.jpg", "summary" => "按实际的了很快2是辣的叫", "video_url" => "ss"],
                    ["is_cms" => 1, "number" => "3424314", "name" => "按实际的", "course" => "啊是的经理", "detail_url" => "", "avatar_url" => "http://img.gsxservice.com/0cms/d/file/content/2015/07/559a27bf9aa51.jpg", "summary" => "按实际的了很快2是辣的叫", "video_url" => ""],
                    ["is_cms" => 1, "number" => "3424314", "name" => "按实际的", "course" => "啊是的经理", "detail_url" => "", "avatar_url" => "http://img.gsxservice.com/0cms/d/file/content/2015/07/559a27bf9aa51.jpg", "summary" => "按实际的了很快2是辣的叫", "video_url" => ""],
                    ["is_cms" => 1, "number" => "3424314", "name" => "按实际的", "course" => "啊是的经理", "detail_url" => "", "avatar_url" => "http://img.gsxservice.com/0cms/d/file/content/2015/07/559a27bf9aa51.jpg", "summary" => "按实际的了很快2是辣的叫", "video_url" => ""]
                ],
                "latest_courses" => [
                    ["is_cms" => 1, "number" => "12121", "number" => "12121", "name" => "课程1", "type" => "1", "url" => ""],//1 线下，2 直播，3 视频
                    ["is_cms" => 1, "number" => "12121", "number" => "12121", "name" => "课程2", "type" => "2", "url" => ""],
                    ["is_cms" => 1, "number" => "12121", "number" => "12121", "name" => "课程3", "type" => "3", "url" => ""],
                    ["is_cms" => 1, "number" => "12121", "number" => "12121", "name" => "课程4", "type" => "1", "url" => ""]
                ],
                "hot_articles" => [
                    "articles" => [
                        ["number" => "12121", "title" => "文章1", "url" => ""],
                        ["number" => "12121", "title" => "文章2", "url" => ""],
                        ["number" => "12121", "title" => "文章3", "url" => ""],
                        ["number" => "12121", "title" => "文章4", "url" => ""]
                    ],
                    "more_url" => "http://"
                ],
                "student_comments" => [
                    ["tnumber" => "12121", "teacher_url" => "", "content" => "入职前就客串，给我们很多研发同学讲过数据库优化的培训，很多同学都受益不少。优化以及其它存储优化方面的工作", "avatar_url" => "", "display_name" => "小脚丫", "course_name" => "初中英语-国际音标", "course_type" => "在线授课"],
                    ["tnumber" => "12121", "teacher_url" => "", "content" => "入职前就客串，给我们很多研发同学讲过数据库优化的培训，很多同学都受益不少。优化以及其它存储优化方面的工作", "avatar_url" => "", "display_name" => "小大丫", "course_name" => "初中英语-国际音标", "course_type" => "线下授课"],
                    ["tnumber" => "12121", "teacher_url" => "", "content" => "入职前就客串，给我们很多研发同学讲过数据库优化的培训，很多同学都受益不少。优化以及其它存储优化方面的工作", "avatar_url" => "", "display_name" => "小大丫", "course_name" => "初中英语", "course_type" => "在线直播"]
                ],
                "org_list" => [
                    ["is_cms" => 1, "number" => "12121", "name" => "sds", "logo" => "http://img.gsxservice.com/801774_rvxx7697.jpg", "domain" => ""],
                    ["is_cms" => 1, "number" => "12121", "name" => "a", "logo" => "", "domain" => ""],
                    ["is_cms" => 1, "number" => "12121", "name" => "v", "logo" => "", "domain" => ""]
                ]
            ],
            "yypx" => [
                "id" => "121221",
                "subject_list" => [
                    ["id" => "1", "name" => "上刊登"],
                    ["id" => "1", "name" => "是的"],
                    ["id" => "1", "name" => "啊是"],
                    ["id" => "1", "name" => "上刊登"],
                    ["id" => "1", "name" => "俩是"],
                    ["id" => "1", "name" => "遥遥"]
                ],
                "qid_list" => [ // 统计数据用
                    'media_list' => '24234',
                    'latest_courses' => '2313',
                    'hot_teachers' => '23424',
                    'org_list' => '2344'
                ],
                "media_list" => [
                    ["number" => "12121", "name" => "sdsd", "img" => "", "author_name" => "视频课", "plan" => "", "course_url" => "", "detail_url" => "sdsds", "is_cms" => 1, "avatar_url" => "", "type" => "1"],
                    ["number" => "12121", "name" => "sdsd", "img" => "", "author_name" => "机构", "plan" => "2015-06-12", "course_url" => "", "detail_url" => "", "is_cms" => 1, "avatar_url" => "", "type" => "1"],
                    ["number" => "12121", "name" => "sdsd", "img" => "", "author_name" => "老师", "plan" => "2015-06-12", "course_url" => "", "detail_url" => "", "is_cms" => 1, "avatar_url" => "", "type" => "1"]
                ],
                "hot_teachers" => [
                    ["is_cms" => 1, "number" => "3424314", "name" => "按实际的", "course" => "啊是的经理", "detail_url" => "", "avatar_url" => "http://img.gsxservice.com/0cms/d/file/content/2015/07/559a27bf9aa51.jpg", "summary" => "按实际的了很快2是辣的叫", "video_url" => "ss"],
                    ["is_cms" => 1, "number" => "3424314", "name" => "按实际的", "course" => "啊是的经理", "detail_url" => "", "avatar_url" => "http://img.gsxservice.com/0cms/d/file/content/2015/07/559a27bf9aa51.jpg", "summary" => "按实际的了很快2是辣的叫", "video_url" => "ss"],
                    ["is_cms" => 1, "number" => "3424314", "name" => "按实际的", "course" => "啊是的经理", "detail_url" => "", "avatar_url" => "http://img.gsxservice.com/0cms/d/file/content/2015/07/559a27bf9aa51.jpg", "summary" => "按实际的了很快2是辣的叫", "video_url" => ""],
                    ["is_cms" => 1, "number" => "3424314", "name" => "按实际的", "course" => "啊是的经理", "detail_url" => "", "avatar_url" => "http://img.gsxservice.com/0cms/d/file/content/2015/07/559a27bf9aa51.jpg", "summary" => "按实际的了很快2是辣的叫", "video_url" => ""],
                    ["is_cms" => 1, "number" => "3424314", "name" => "按实际的", "course" => "啊是的经理", "detail_url" => "", "avatar_url" => "http://img.gsxservice.com/0cms/d/file/content/2015/07/559a27bf9aa51.jpg", "summary" => "按实际的了很快2是辣的叫", "video_url" => ""]
                ],
                "latest_courses" => [
                    ["is_cms" => 1, "number" => "12121", "name" => "课程1", "type" => "1", "url" => ""],//1 线下，2 直播，3 视频
                    ["is_cms" => 1, "number" => "12121", "name" => "课程2", "type" => "2", "url" => ""],
                    ["is_cms" => 1, "number" => "12121", "name" => "课程3", "type" => "3", "url" => ""],
                    ["is_cms" => 1, "number" => "12121", "name" => "课程4", "type" => "1", "url" => ""]
                ],
                "hot_articles" => [
                    "articles" => [
                        ["number" => "12121", "title" => "文章1", "url" => ""],
                        ["number" => "12121", "title" => "文章2", "url" => ""],
                        ["number" => "12121", "title" => "文章3", "url" => ""],
                        ["number" => "12121", "title" => "文章4", "url" => ""]
                    ],
                    "more_url" => "http://"
                ],
                "student_comments" => [
                    ["tnumber" => "12121", "teacher_url" => "", "content" => "入职前就客串，给我们很多研发同学讲过数据库优化的培训，很多同学都受益不少。优化以及其它存储优化方面的工作", "avatar_url" => "", "display_name" => "小脚丫", "course_name" => "初中英语-国际音标", "course_type" => "在线授课"],
                    ["tnumber" => "12121", "teacher_url" => "", "content" => "入职前就客串，给我们很多研发同学讲过数据库优化的培训，很多同学都受益不少。优化以及其它存储优化方面的工作", "avatar_url" => "", "display_name" => "小大丫", "course_name" => "初中英语-国际音标", "course_type" => "线下授课"],
                    ["tnumber" => "12121", "teacher_url" => "", "content" => "入职前就客串，给我们很多研发同学讲过数据库优化的培训，很多同学都受益不少。优化以及其它存储优化方面的工作", "avatar_url" => "", "display_name" => "小大丫", "course_name" => "初中英语", "course_type" => "在线直播"]
                ],
                "org_list" => [
                    ["is_cms" => 1, "number" => "12121", "name" => "sds", "logo" => "http://img.gsxservice.com/801774_rvxx7697.jpg", "domain" => ""],
                    ["is_cms" => 1, "number" => "12121", "name" => "a", "logo" => "", "domain" => ""],
                    ["is_cms" => 1, "number" => "12121", "name" => "v", "logo" => "", "domain" => ""]
                ]
            ],
            "jnks" => [
                "id" => "121221",
                "subject_list" => [
                    ["id" => "1", "name" => "上刊登"],
                    ["id" => "1", "name" => "是的"],
                    ["id" => "1", "name" => "啊是"],
                    ["id" => "1", "name" => "上刊登"],
                    ["id" => "1", "name" => "俩是"],
                    ["id" => "1", "name" => "遥遥"]
                ],
                "qid_list" => [ // 统计数据用
                    'media_list' => '24234',
                    'latest_courses' => '2313',
                    'hot_teachers' => '23424',
                    'org_list' => '2344'
                ],
                "media_list" => [
                    ["number" => "12121", "name" => "sdsd", "img" => "", "author_name" => "视频课", "plan" => "", "course_url" => "", "detail_url" => "sdsds", "is_cms" => 1, "avatar_url" => "", "type" => "1"],
                    ["number" => "12121", "name" => "sdsd", "img" => "", "author_name" => "机构", "plan" => "2015-06-12", "course_url" => "", "detail_url" => "", "is_cms" => 1, "avatar_url" => "", "type" => "1"],
                    ["number" => "12121", "name" => "sdsd", "img" => "", "author_name" => "老师", "plan" => "2015-06-12", "course_url" => "", "detail_url" => "", "is_cms" => 1, "avatar_url" => "", "type" => "1"]
                ],
                "hot_teachers" => [
                    ["is_cms" => 1, "number" => "3424314", "name" => "按实际的", "course" => "啊是的经理", "detail_url" => "", "avatar_url" => "http://img.gsxservice.com/0cms/d/file/content/2015/07/559a27bf9aa51.jpg", "summary" => "按实际的了很快2是辣的叫", "video_url" => "ss"],
                    ["is_cms" => 1, "number" => "3424314", "name" => "按实际的", "course" => "啊是的经理", "detail_url" => "", "avatar_url" => "http://img.gsxservice.com/0cms/d/file/content/2015/07/559a27bf9aa51.jpg", "summary" => "按实际的了很快2是辣的叫", "video_url" => "ss"],
                    ["is_cms" => 1, "number" => "3424314", "name" => "按实际的", "course" => "啊是的经理", "detail_url" => "", "avatar_url" => "http://img.gsxservice.com/0cms/d/file/content/2015/07/559a27bf9aa51.jpg", "summary" => "按实际的了很快2是辣的叫", "video_url" => ""],
                    ["is_cms" => 1, "number" => "3424314", "name" => "按实际的", "course" => "啊是的经理", "detail_url" => "", "avatar_url" => "http://img.gsxservice.com/0cms/d/file/content/2015/07/559a27bf9aa51.jpg", "summary" => "按实际的了很快2是辣的叫", "video_url" => ""],
                    ["is_cms" => 1, "number" => "3424314", "name" => "按实际的", "course" => "啊是的经理", "detail_url" => "", "avatar_url" => "http://img.gsxservice.com/0cms/d/file/content/2015/07/559a27bf9aa51.jpg", "summary" => "按实际的了很快2是辣的叫", "video_url" => ""]
                ],
                "latest_courses" => [
                    ["is_cms" => 1, "number" => "12121", "name" => "课程1", "type" => "1", "url" => ""],//1 线下，2 直播，3 视频
                    ["is_cms" => 1, "number" => "12121", "name" => "课程2", "type" => "2", "url" => ""],
                    ["is_cms" => 1, "number" => "12121", "name" => "课程3", "type" => "3", "url" => ""],
                    ["is_cms" => 1, "number" => "12121", "name" => "课程4", "type" => "1", "url" => ""]
                ],
                "hot_articles" => [
                    "articles" => [
                        ["number" => "12121", "title" => "文章1", "url" => ""],
                        ["number" => "12121", "title" => "文章2", "url" => ""],
                        ["number" => "12121", "title" => "文章3", "url" => ""],
                        ["number" => "12121", "title" => "文章4", "url" => ""]
                    ],
                    "more_url" => "http://"
                ],
                "student_comments" => [
                    ["tnumber" => "12121", "teacher_url" => "", "content" => "入职前就客串，给我们很多研发同学讲过数据库优化的培训，很多同学都受益不少。优化以及其它存储优化方面的工作", "avatar_url" => "", "display_name" => "小脚丫", "course_name" => "初中英语-国际音标", "course_type" => "在线授课"],
                    ["tnumber" => "12121", "teacher_url" => "", "content" => "入职前就客串，给我们很多研发同学讲过数据库优化的培训，很多同学都受益不少。优化以及其它存储优化方面的工作", "avatar_url" => "", "display_name" => "小大丫", "course_name" => "初中英语-国际音标", "course_type" => "线下授课"],
                    ["tnumber" => "12121", "teacher_url" => "", "content" => "入职前就客串，给我们很多研发同学讲过数据库优化的培训，很多同学都受益不少。优化以及其它存储优化方面的工作", "avatar_url" => "", "display_name" => "小大丫", "course_name" => "初中英语", "course_type" => "在线直播"]
                ],
                "org_list" => [
                    ["is_cms" => 1, "number" => "12121", "name" => "sds", "logo" => "http://img.gsxservice.com/801774_rvxx7697.jpg", "domain" => ""],
                    ["is_cms" => 1, "number" => "12121", "name" => "a", "logo" => "", "domain" => ""],
                    ["is_cms" => 1, "number" => "12121", "name" => "v", "logo" => "", "domain" => ""]
                ]
            ],
            "jhx" => [
                "study_star" => [
                    ["avatar_url" => "http://img.gsxservice.com/1458411_gh6znto6.jpeg", "detail_url" => "", "number" => "182731263", "name" => "学生名称"],
                    ["avatar_url" => "", "detail_url" => "", "number" => "182731263", "name" => "学生名称"],
                    ["avatar_url" => "", "detail_url" => "", "number" => "182731263", "name" => "学生名称"],
                    ["avatar_url" => "", "detail_url" => "", "number" => "182731263", "name" => "学生名称"],
                    ["avatar_url" => "", "detail_url" => "", "number" => "182731263", "name" => "学生名称"],
                    ["avatar_url" => "", "detail_url" => "", "number" => "182731263", "name" => "学生名称"],
                    ["avatar_url" => "", "detail_url" => "", "number" => "182731263", "name" => "学生名称"],
                    ["avatar_url" => "", "detail_url" => "", "number" => "182731263", "name" => "学生名称"]
                ],
                "qid_list" => [ // 统计数据用
                    'teacher_list' => '24234',
                    'course_list' => '2313',
                    'org_list' => '2344'
                ],
                "teacher_list" => [
                    ["is_cms" => 1, "number" => "12121", "avatar_url" => "http://img.gsxservice.com/5698_tl6hc75s.jpeg", "detail_url" => "", "number" => "3424314", "name" => "wew1", "course_name" => "sdsd1", "main_subject_name" => "测测试用测试用测试用测试用测试用测试用试用", "medal" => []],
                    ["is_cms" => 1, "number" => "12121", "avatar_url" => "", "detail_url" => "", "number" => "3424314", "name" => "", "course_name" => "", "main_subject_name" => "测测试用测试用测试用测试用测试用测试用试用", "medal" => []],
                    ["is_cms" => 1, "number" => "12121", "avatar_url" => "", "detail_url" => "", "number" => "3424314", "name" => "", "course_name" => "", "main_subject_name" => "测测试用测试用测试用测试用测试用测试用试用", "medal" => []],
                    ["is_cms" => 1, "number" => "12121", "avatar_url" => "", "detail_url" => "", "number" => "3424314", "name" => "", "course_name" => "", "main_subject_name" => "测测试用测试用测试用测试用测试用测试用试用", "medal" => []],
                    ["is_cms" => 1, "number" => "12121", "avatar_url" => "", "detail_url" => "", "number" => "3424314", "name" => "", "course_name" => "", "main_subject_name" => "测测试用测试用测试用测试用测试用测试用试用", "medal" => []],
                    ["is_cms" => 1, "number" => "12121", "avatar_url" => "", "detail_url" => "", "number" => "3424314", "name" => "", "course_name" => "", "main_subject_name" => "测测试用测试用测试用测试用测试用测试用试用", "medal" => []],
                    ["is_cms" => 1, "number" => "12121", "avatar_url" => "", "detail_url" => "", "number" => "3424314", "name" => "", "course_name" => "", "main_subject_name" => "测测试用测试用测试用测试用测试用测试用试用", "medal" => []]
                ],
                "course_list" => [
                    ["is_cms" => 1, "number" => "12121", "course_name" => "ada1", "course_type" => "问问", "url" => ""]
                ],
                "org_list" => [
                    ["is_cms" => 1, "number" => "12121", "name" => "sdsd", "logo" => "http://img.gsxservice.com/76118_c46zkkgu.jpg", "domain" => "", "brief" => ""]
                ],
                "banner" => [
                    "monitor" => "http://test-pm-gat.genshuixue.com/m?p=34&b=146&g=204&c=221",
                    "clickMonitor" => "http://test-pm-gat.genshuixue.com/cm?p=34&b=146&g=204&c=221",
                    "img" => "http://img.gsxservice.com/1882700_8mu7n1h3.jpg",
                    "name" => "啊快说打开的课程名称名称",
                    "brief" => "啊肯定会拉开解答了哈老师的开会就阿里客户端打火机啊都死啦死定了空间啊是",
                    "pay_count" => "122",
                    "hover" => "title",
                    "max_count" => "232",
                    "url" => "",
                    "number" => "12121"
                ],
                "recommend_courses" => [
                    ["number" => "12121", "name" => "sdsd", "img" => "", "pay_count" => "8", "plan" => "2015-06-12", "url" => "", "type" => "2"],
                    ["number" => "12121", "name" => "sdsd", "img" => "", "pay_count" => "9", "plan" => "2015-06-12", "url" => "", "type" => "1"],
                    ["number" => "12121", "name" => "sdsd", "img" => "", "pay_count" => "10", "plan" => "2015-06-12", "url" => "", "type" => "3"]
                ]
            ],
            "gold_cert_org" => [
                [
                    "imgUrl" => 'http://img.gsxservice.com/4873150_b4d0ym7d.png@0e_1190w_110h_1c_0i_1o_90Q_1x.jpg',
                    "webUrl" => 'www.genshuixue.com',
                    "orgNumber" => 413075219,
                    "cityId" => 17039360
                ],
                [
                    "imgUrl" => 'http://img.gsxservice.com/4873231_88l65hxf.jpg@0e_1190w_110h_1c_0i_1o_90Q_1x.jpg',
                    "webUrl" => 'www.genshuixue.com',
                    "orgNumber" => 413075219,
                    "cityId" => 17039360
                ],
                [
                    "imgUrl" => 'http://img.gsxservice.com/4873159_y4nf3mhx.jpg@0e_1190w_110h_1c_0i_1o_90Q_1x.jpg',
                    "webUrl" => 'www.genshuixue.com',
                    "orgNumber" => 413075219,
                    "cityId" => 17039360
                ]
            ]
        )
    )
);

