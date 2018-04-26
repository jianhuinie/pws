<?php

require("../bootstrap.php");

$tpl_data = array(
    "tpl_data" => array(
        // 老师
        array(
            "course_number" => "150308480013", //课程编号
            "teacher_name" => "张",
            "org_name" => "组织名称",//不存在时为null
            "name" => "班课名称",
            "cover" => "http://img.gsxservice.com/2846962_mgtekcd5.jpeg", //图片url
            "price" => "200", //当前价格
            "course_url" => "http://baidu.com", //课程链接
            "teacher_url" => "xxx",//老师主页
            "org_url" => "xxx",//机构主页
            "is1to1" => "1"//是老师
        ),
        // 班课
        array(
            "course_number" => "150308480013", //课程编号
            "teacher_name" => "张",
            "org_name" => "组织名称",//不存在时为null
            "name" => "班课名称",
            "cover" => "http://img.gsxservice.com/2846962_mgtekcd5.jpeg", //图片url
            "price" => "200", //当前价格
            "original_price" => "240", //原始价格
            "begin_time" => "09月10日",
            "course_url" => "http://baidu.com", //课程链接
            "teacher_url" => "xxx",//老师主页
            "org_url" => "xxx",//机构主页
            "is1to1" => "0",//是班课
            "chaban_price" => "0.01"
        ),
    )
);

$response = array(
    "code" => 0,
    "data" => array(
        "tpl" => fetch('navigation/sougou/courseAjax', $tpl_data
        )
    )
);

echo json_encode($response);
