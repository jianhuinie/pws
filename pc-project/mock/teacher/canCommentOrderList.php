<?php

$response = array(
    'code' => 0,
    'message' => 'success',
    'data' => array(
        'can_comment_list' => array(
            array(
                'purchase_id' => '1115073053957248',
                'course_name' => '一二三四五六七八九十一二三四五六七八九十',
                'type' => 2, // 1一对一 2班课 3视频课 4机构班课 5试听课
                'lesson_all_count' => 39,
                'lesson_finished_count' => 22,
                'lesson_unfinished_count' => 17
            ),
            array(
                'purchase_id' => '1115073053957248',
                'course_name' => '烘焙入门',
                'type' => 2, // 1一对一 2班课 3视频课 4机构班课 5试听课
                'lesson_all_count' => 39,
                'lesson_finished_count' => 22,
                'lesson_unfinished_count' => 17
            ),
            array(
                'purchase_id' => '1115073053957248',
                'course_name' => '烘焙入门',
                'type' => 2, // 1一对一 2班课 3视频课 4机构班课 5试听课
                'lesson_all_count' => 39,
                'lesson_finished_count' => 22,
                'lesson_unfinished_count' => 17
            )
        )
    ),
    "ts" => 1416034743
);

echo json_encode($response);
