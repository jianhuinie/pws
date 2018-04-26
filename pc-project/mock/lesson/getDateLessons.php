<?php

$response = array(
    'code' => 0,
    'msg' => 'succ',
    'data' => array(
        'lesson_list' => array( // 课程列表
            array(
                'start_time' => '6:00',
                'end_time' => '7:00',
                'lesson_type' => '2', // 1一对一 2班课
                'user_name' => '王老师',
                'user_num' => '10', // 班课人数
                'course_name' => '烘焙'
            ),
            array(
                'start_time' => '16:00',
                'end_time' => '17:00',
                'lesson_type' => '1', // 1一对一 2班课
                'user_name' => '小王老师',
                'user_num' => '', // 班课人数
                'course_name' => '烘焙'
            )
        ),
        'time_list' => array( // 老师被占用时间列表
            array(
                'start_time' => '16:00',
                'end_time' => '17:00'
            ),
            array(
                'start_time' => '17:30',
                'end_time' => '19:30'
            ),
            array(
                'start_time' => '16:00',
                'end_time' => '17:00'
            ),
            array(
                'start_time' => '17:30',
                'end_time' => '19:30'
            )
        ),
        'tpl' => array(
            'dateLessons' => '当天你没有课程安排哦~'
        )
    )
);

echo json_encode($response);