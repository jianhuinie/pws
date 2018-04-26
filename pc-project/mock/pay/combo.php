<?php

$response = array(
    'code' => 0,
    'msg' => 'succ',
    'data' => array(
        'course_combo' => array(
            array(
                'id' => '868',
                'hours' => '1',
                'discount' => '10', // 折扣几折
                'desc' => '试听课程，为学生提供试听试听课程，为学生提供试听试听课程，为学生提供试听',
                'desc_cut' => '试听课程,为学生提供试听试听课程，为学生提供试听试听课程，为学生提供试听试听课程，为学生提供试听'
            ),
            array(
                'id' => '868',
                'hours' => '1',
                'discount' => '10', // 折扣几折
                'desc' => '试听课程，为学生提供试听',
                'desc_cut' => '试听课程,为学生提供试听'
            ),
            array(
                'id' => '868',
                'hours' => '1',
                'discount' => '10', // 折扣几折
                'desc' => '试听课程，为学生提供试听',
                'desc_cut' => '试听课程,为学生提供试听'
            ),
            array(
                'id' => '868',
                'hours' => '1',
                'discount' => '10', // 折扣几折
                'desc' => '试听课程，为学生提供试听',
                'desc_cut' => '试听课程,为学生提供试听'
            ),
        )
    )
);

echo json_encode($response);