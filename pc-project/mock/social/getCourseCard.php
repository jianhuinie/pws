<?php

$response = array(
    "code" => 0,
    "message" => 'success',
    "data" => array(
        "course_type" => 1,  // 课程类型 2线下课 3直播课 4视频课
        "course_number" => 12345678, // 课程number
        "course_cover" => "http://img.gsxservice.com/4253075_ya518jyn.jpg@1e_730w_300h_1c_0i_1o_90Q_1x.jpg",    // 课程封面
        "course_name"  => "课程名称",
        "teacher_nickname" => "老师昵称",
        "course_price" => 199,  // 课程价格,
        "course_time" => "2015年7月20日",  // 上课时间
        "course_address" => '北京海淀北三环路家18号中鼎大厦B座',
        "course_url" => "http://test.genshuixue.com/teacher/classCourseDetail/151104482625",  // 课程url
        "tpl" => '<h1>ok</h1>'
    )
);

echo json_encode($response);

