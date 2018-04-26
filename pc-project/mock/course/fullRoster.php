<?php

require("../bootstrap.php");

render(
    "course/fullRoster",
    array(
        "tpl_data" => array(
            // "class_course" => array(
            //     'name' => '课程名称',
            //     'number' => '123456',
            //     'lesson_way' => 2, // 2在线 4线下
            //     'address' => '北京 海淀区 百度大厦',
            //     "begin_time" => 1423692000,
            //     "end_time" => 1423695600,
            //     'current_student' => '2', // 现有学生数目
            //     'max_student' => '20' // 班级最大容纳人数
            // ),
            "video_course" => array(
                'name' => '视频课课程名称',
                'number' => '123456',
                'lesson_way' => '视频课',
                'course_type' => true,
                'expire_hours' => '2160'

            ),
            "object_list" => array(
                array(
                    'student_no' => 1, // 学生序号
                    'purchase_id' => '213437854325543', // 订单号
                    'created_at' => 1423462049, // 报名时间
                    'is_self' => 1, // 1是本人上课 0别人上课
                    'display_name' => '购买人',
                    'real_student' => '上课人',
                    'pay_money' => '200.00',
                    'mobile' => '15210651512'
                ),
                array(
                    'student_no' => 1, // 学生序号
                    'purchase_id' => '213437854325543', // 订单号
                    'created_at' => 1423462049, // 报名时间
                    'is_self' => 1, // 1是本人上课 0别人上课
                    'display_name' => '购买人',
                    'real_student' => '上课人',
                    'pay_money' => '200.00',
                    'mobile' => '15210651512'
                )
            )
        )
    )
);
