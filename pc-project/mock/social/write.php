<?php

require("../bootstrap.php");

render(
    "social/write",
    array(
       "tpl_data" => array(
            "group_id" => 33,
            "thread_id" => 1212,
            "name" => "sdsd",
            "content" => "sd",
            "course_type" => 2,
            "course_card" => array(
                array(
                    "course_number" => 151030547648, // 课程number
                    "course_type" => 3, // 课程类型 2线下课 3直播课 4视频课
                    "course_cover" => "http://test-img.gsxservice.com/392122_5darn2qm.jpeg", // 课程封面
                    "course_name" => "阿大声道",
                    "teacher_nickname" => "yili",
                    "course_price" => "11.11", // 课程价格
                    "course_time" => "2016年06月04日", // 上课时间
                    "course_url" => "http://sunlijun-m.test.genshuixue.com/teacher/classCourseDetail/151030547648" // 课程url
                ),
                array(
                    "course_number" => 151120548441,
                    "course_type" => 2,
                    "course_cover" => "http://test-img.gsxservice.com/396590_69xqc6ww.jpeg",
                    "course_name" => "一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十",
                    "teacher_nickname" => "一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十",
                    "course_price" => "0.01",
                    "course_time" => "2015年11月20日",
                    "course_address" => "一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十",
                    "course_url" => "http://sunlijun-m.test.genshuixue.com/teacher/classCourseDetail/151120548441"
                ),
                array(
                    "course_number" => 15102249849,
                    "course_type" => 4,
                    "course_cover" => "http://test-img.gsxservice.com/389138_jtjlz6ze.jpeg",
                    "course_name" => "fff",
                    "teacher_nickname" => "赵芳老师的昵称显示问",
                    "course_price" => "1",
                    "course_url" => "http://sunlijun-m.test.genshuixue.com/video_course/15102249849"
                )
            )

        )
    )
);