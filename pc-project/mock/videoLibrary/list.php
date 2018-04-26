<?php

require("../bootstrap.php");

render(
    "videoLibrary/list", // 知识视频库模板
    // "zhentiLibrary/list", // 真题库模板
    array(
        "tpl_data" => array(
            "tdk" => array(
                "title" => "title内容",
                "keywords" => "关键字内容",
                "description" => "描述部分内容"
            ),
            "qq" => array(
                "number" => "327606205",
                "url" => "http://jq.qq.com/?_wv=1027&k=2Fugmy8"
            ),
            "active_title" => "2.2命题及其关系",
            "kemu" => array(
                array(
                    "name" => "数学",
                    "url" => "shuxue",
                    "active" => true
                ),
                array(
                    "name" => "语文",
                    "url" => "shuxue",
                    "active" => false
                ),
                array(
                    "name" => "英语",
                    "url" => "shuxue",
                    "active" => false
                ),
                array(
                    "name" => "物理",
                    "url" => "shuxue",
                    "active" => false
                ),
                array(
                    "name" => "化学",
                    "url" => "shuxue",
                    "active" => false
                ),
            ),
            "nianji" => array(
                array(
                    "name" => "高中",
                    "url" => "gaozhong",
                    "active" => false
                ),
                array(
                    "name" => "初中",
                    "url" => "gaozhong",
                    "active" => false
                ),
                array(
                    "name" => "小学",
                    "url" => "gaozhong",
                    "active" => true
                ),
            ),
            "list" => array(
                array(
                    "price" => 9.9,
                    "title" => "红丝绒蛋糕制作方法幽默风趣的讲解，湖北优秀教师的讲解幽默风趣的讲解，湖北优秀教师的讲解",
                    "vip_level" => 1,
                    "descript" => "幽默风趣的讲解，湖北优秀教师的讲解幽默风趣的讲解，湖北优秀教师的讲解幽默风趣的讲解，湖北优秀教师的讲解幽默风趣的讲解，湖北优秀教师的讲解",
                    "cover_url" => "http://img.gsxservice.com/0cms/d/file/content/2016/02/56d3f439b5c85.jpg",
                    "play_url" => "http://test.genshuixue.com/video_course/play?course_number=15042743704",
                    "play_times" => "21万",
                    "url" => "www.baidu.com",
                    "teacher_name" => "主力老师主力老师主力老师主力老师",
                    "teacher_detail_url" => "www.baidu.com"
                ),
                array(
                    "price" => 9.9,
                    "title" => "红丝绒蛋糕制作方法",
                    "vip_level" => 2,
                    "descript" => "幽默风趣的讲解，湖北优秀教师的讲解",
                    "cover_url" => "http://img.gsxservice.com/0cms/d/file/content/2016/02/56d3f439b5c85.jpg",
                    "play_times" => "21万",
                    "url" => "www.baidu.com",
                    "teacher_name" => "主力老师",
                    "teacher_detail_url" => "www.baidu.com"
                ),
                array(
                    "price" => 9.9,
                    "title" => "红丝绒蛋糕制作方法",
                    "vip_level" => 3,
                    "descript" => "幽默风趣的讲解，湖北优秀教师的讲解",
                    "cover_url" => "http://img.gsxservice.com/0cms/d/file/content/2016/02/56d3f4aa460bd.png",
                    "play_times" => "21万",
                    "url" => "www.baidu.com",
                    "teacher_name" => "主力老师",
                    "teacher_detail_url" => "www.baidu.com"
                ),
                array(
                    "price" => 9.9,
                    "title" => "红丝绒蛋糕制作方法",
                    "vip_level" => 0,
                    "descript" => "幽默风趣的讲解，湖北优秀教师的讲解",
                    "cover_url" => "http://img.gsxservice.com/0cms/d/file/content/2016/02/56d3f3ad0224b.jpg",
                    "play_times" => "21万",
                    "url" => "www.baidu.com",
                    "teacher_name" => "主力老师",
                    "teacher_detail_url" => "www.baidu.com"
                )
            ),
            "tree_data" => array(
                array(
                    "name" => "高一",
                    "url" => "gaozhong",
                    "active" => false,
                    "open" => true,
                    "children" => array(
                        array(
                            "name" => "集合与常用逻辑用语",
                            "url" => "jihe",
                            "active" => false,
                            "open" => true,
                            "children" => array(
                                array(
                                    "name" => "集合与常用逻辑用语",
                                    "url" => "jiheyuchangyong",
                                    "active" => false,
                                    "open" => true,
                                    "children" => null
                                ),
                                array(
                                    "name" => "集合的运算",
                                    "url" => "jiheyuchangyong",
                                    "active" => false,
                                    "open" => true,
                                    "children" => null
                                ),
                                array(
                                    "name" => "常用逻辑用语",
                                    "url" => "jiheyuchangyong",
                                    "active" => false,
                                    "open" => true,
                                    "children" => array(
                                        array(
                                            "name" => "命题及其关系",
                                            "url" => "gaunxi",
                                            "active" => true,
                                            "open" => false,
                                            "children" => null
                                        ),
                                        array(
                                            "name" => "充分条件与必要条件",
                                            "url" => "gaunxi",
                                            "active" => false,
                                            "open" => false,
                                            "children" => null
                                        ),
                                        array(
                                            "name" => "简单的逻辑联结词",
                                            "url" => "gaunxi",
                                            "active" => false,
                                            "open" => false,
                                            "children" => null
                                        )
                                    )
                                )
                            )
                        ),
                        array(
                            "name" => "函数与导数",
                            "url" => "hanshu",
                            "active" => false,
                            "open" => false,
                            "children" => array(
                                array(
                                    "name" => "充分条件与必要条件",
                                    "url" => "gaunxi",
                                    "active" => false,
                                    "open" => false,
                                    "children" => null
                                ),
                                array(
                                    "name" => "简单的逻辑联结词",
                                    "url" => "gaunxi",
                                    "active" => false,
                                    "open" => false,
                                    "children" => null
                                )
                            )
                        ),
                        array(
                            "name" => "函数与导数",
                            "url" => "hanshu",
                            "active" => false,
                            "open" => true,
                            "children" => null
                        )
                    )
                ),
                array(
                    "name" => "高二",
                    "url" => "gaoer",
                    "active" => false,
                    "open" => false,
                    "children" => array(
                        array(
                            "name" => "gaoer",
                            "url" => "gaoer",
                            "active" => false,
                            "open" => false,
                            "children" => null
                        )
                    )
                ),
                array(
                    "name" => "高二",
                    "url" => "gaoer",
                    "active" => false,
                    "open" => false,
                    "children" => array(
                        array(
                            "name" => "gaoer",
                            "url" => "gaoer",
                            "active" => false,
                            "open" => false,
                            "children" => null
                        )
                    )
                )
            )
        )
    )
);

