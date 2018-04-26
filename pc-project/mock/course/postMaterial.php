<?php

require("../bootstrap.php");

render(
    "course/postMaterial",
    array(
        "tpl_data" => array(
            "data" => array(
                "pager" => array(
                    "page" => 2,
                    "page_size" => 10,
                    "count" => 30
                ),
                "object_list" => array(
                    array(
                        "student_no" => 1, // 学生序号
                        "name" => "何宣朗", // 收件人
                        "mobile" => "19900001111", //联系手机
                        "telephone" => "035-3756833",
                        "location" => "北京市马连洼街道办博彦科技大厦",
                        "note_msg" => "产品可以直接用图提需求吗。。。"
                    )
                ),
                "course_name" => "邮寄资料测试课程【直播】",
                "download_url" => "http://test.genshuixue.com/tcenter/courses/materials/download_list?course_number=443227115847&course_type=1",
                "print_url" => "http://test.genshuixue.com/tcenter/courses/materials/full_list?course_number=443227115847&course_type=1"
            )
        )
    )
);
