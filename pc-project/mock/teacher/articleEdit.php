<?php

require("../bootstrap.php");

render(
    "teacher/article/articleEdit",
    array(
        "tpl_data" => array(
            "article" => array(
                "id" => 123,
                "cover" => '',
                //"cover" => 'http://img.gsxservice.com/458609_c9kyyzct.png' ,//文章封面
                "title" => "这里是一篇文章的标题",
                "content" => "简单的文字内容，要到一定额度后才开始进行字数的统计，醉了呢~",
                "permission" => 1, // 0公开 1学生可见 2仅自己可见
                "category_id" => 2, // 文章分类id
                "top" => 1, // 置顶与否
                "is_draft" => 0,
                "draftid" => 22,
                "update_time" => '2015-04-29 14:54', // 草稿最后保存时间
                "tags" => array("sds","sdd"),
                "subject" => array(
                        "category1" => array(
                            "name" => "sd",
                            "id" => "976"
                        ),
                        "category2" => array(
                            "name" => "sd",
                            "id" => "976"
                        ),
                        "category3" => array(
                            "name" => "sd",
                            "id" => "976"
                        )
                    )
            ),
            "categories" => array(
                array(
                    "name" => "默认分类",
                    "id" => "0"
                ),
                array(
                    "name" => "分类1",
                    "id" => "1"
                ),
                array(
                    "name" => "分类2",
                    "id" => "2"
                )
            )
        )
    )
);