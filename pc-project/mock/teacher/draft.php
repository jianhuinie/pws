<?php

require("../bootstrap.php");


$tpl_data = array(
    "tpl_data" => array(
        "is_self" => 1,
        "page" => array(
            "cp" => 2,
            "total" => 100,
            "totalpages" => 10
        ),
        "drafts" => array(
            array(
                "id" => 2323,
                "title" => "测试草稿1",
                "content" => "测试内容",
                "category_id" => 1,
                "category_name" => "分类1",
                "publish_time" => "2013-12-03 07:10",
                "permission" => "公开",
                "has_img" => 1,
                "top" => 1
            ),
            array(
                "id" => 2323,
                "title" => "测试草稿1",
                "content" => "测试内容",
                "category_id" => 1,
                "category_name" => "分类1",
                "publish_time" => "2013-12-03 07:10",
                "permission" => "公开",
                "has_img" => 1,
                "top" => 1
            ),
            array(
                "id" => 2323,
                "title" => "测试草稿1",
                "content" => "测试内容",
                "category_id" => 1,
                "category_name" => "分类1",
                "publish_time" => "2013-12-03 07:10",
                "permission" => "公开",
                "has_img" => 1,
                "top" => 1
            ),
            array(
                "id" => 2323,
                "title" => "测试草稿1",
                "content" => "测试内容",
                "category_id" => 1,
                "category_name" => "分类1",
                "publish_time" => "2013-12-03 07:10",
                "permission" => "公开",
                "has_img" => 1,
                "top" => 1
            ),
            array(
                "id" => 2323,
                "title" => "测试草稿1",
                "content" => "测试内容",
                "category_id" => 1,
                "category_name" => "分类1",
                "publish_time" => "2013-12-03 07:10",
                "permission" => "公开",
                "has_img" => 1,
                "top" => 1
            ),
            array(
                "id" => 2323,
                "title" => "测试草稿1",
                "content" => "测试内容",
                "category_id" => 1,
                "category_name" => "分类1",
                "publish_time" => "2013-12-03 07:10",
                "permission" => "公开",
                "has_img" => 1,
                "top" => 1
            ),
            array(
                "id" => 2323,
                "title" => "测试草稿1",
                "content" => "测试内容",
                "category_id" => 1,
                "category_name" => "分类1",
                "publish_time" => "2013-12-03 07:10",
                "permission" => "公开",
                "has_img" => 1,
                "top" => 1
            ),
            array(
                "id" => 2323,
                "title" => "测试草稿1",
                "content" => "测试内容",
                "category_id" => 1,
                "category_name" => "分类1",
                "publish_time" => "2013-12-03 07:10",
                "permission" => "公开",
                "has_img" => 1,
                "top" => 1
            )
        )
    )
);

$response = array(
    "code" => 0,
    "data" => array(
        "page" => array(
            "cp" => 2,
            "total" => 100,
            "totalpages" => 10
        ),
        "tpl" => array(
            "draft_list" => fetch('teacher/newDetail/draftList', array(
                'tpl_data' => $tpl_data['tpl_data']
            ))
        )
    )
);

echo json_encode($response);