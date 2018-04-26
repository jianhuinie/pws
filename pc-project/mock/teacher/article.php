<?php

require("../bootstrap.php");


$tpl_data = array(
    "tpl_data" => array(
        "is_self" => 1,
        "page" => array(
            "cp" => 2,
            "totalPages" => 10,
            "total" => 100
        ),
        "articles" => array(
            array(
                "id" => 2323,
                "title" => "测试标题试标",
                "content" => "测试&nbsp;内容",
                "category_id" => 1,
                "category_name" => "分类1",
                "publish_time" => "2013-12-03 07:10",
                "permission" => "0",
                "top" => 1,
                "cover" => "sd",
                "has_img" => 1,
                "support_num" => 100,
                "read_times" => 1000,
                "comment_num" => 100
            ),
             array(
                "id" => 2324,
                "title" => "测试标题2",
                "content" => "测试 内容2",
                "category_id" => 1,
                "category_name" => "分类1",
                "publish_time" => "2013-12-03 07:10",
                "permission" => "1",
                "top" => 1,
                "cover" => "sdd",
                "has_img" => 0,
                "support_num" => 100,
                "read_times" => 1000,
                "comment_num" => 100
            )
        )
    )
);

$response = array(
    "code" => 0,
    "data" => array(
        "tpl" => array(
            "article_list" => fetch('teacher/newDetail/articleList', array(
                'tpl_data' => $tpl_data['tpl_data']
            ))
        )
    )
);

echo json_encode($response);