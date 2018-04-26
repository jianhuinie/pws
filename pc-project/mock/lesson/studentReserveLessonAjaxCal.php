<?php

$response = array(

    "code" => 0,
    "data" => array(

        "lessons" => array(

            "2014-08-29" => array(
                null,
                array(
                    array(
                        "start_time" => "2014-08-29 06:00:00",
                        "end_time" => "2014-08-29 07:00:00",
                        "user_type" => 2,
                        "teacher_name" => "李老师",
                        "student_name" => "李学生"
                    ),
                    array(
                        "start_time" => "2014-08-29 06:00:00",
                        "end_time" => "2014-08-29 07:00:00",
                        "user_type" => 0,
                        "teacher_name" => "李老师",
                        "student_name" => "李学生"
                    ),
                ),
                array(
                    array(
                        "start_time" => "2014-08-29 20:00:00",
                        "end_time" => "2014-08-29 22:30:00",
                        "user_type" => 2,
                        "teacher_name" => "李老师",
                        "student_name" => "李学生"
                    )
                )
            ),

            "2014-08-30" => array(
                array(
                    array(
                        "start_time" => "2014-08-30 06:00:00",
                        "end_time" => "2014-08-30 07:00:00",
                        "user_type" => 2,
                        "teacher_name" => "李老师",
                        "student_name" => "李学生"
                    ),
                    array(
                        "start_time" => "2014-08-30 06:00:00",
                        "end_time" => "2014-08-30 07:00:00",
                        "user_type" => 2,
                        "teacher_name" => "李老师",
                        "student_name" => "李学生"
                    ),
                    array(
                        "start_time" => "2014-08-30 06:00:00",
                        "end_time" => "2014-08-30 07:00:00",
                        "user_type" => 2,
                        "teacher_name" => "李老师",
                        "student_name" => "李学生"
                    )
                ),
                null,
                array(
                    array(
                        "start_time" => "2014-08-30 20:00:00",
                        "end_time" => "2014-08-30 23:00:00",
                        "user_type" => 0,
                        "teacher_name" => "李老师",
                        "student_name" => "李学生"
                    )
                )
            ),

            "2014-08-31" => array(
                array(
                    array(
                        "start_time" => "2014-08-31 06:00:00",
                        "end_time" => "2014-08-31 07:00:00",
                        "user_type" => 0,
                        "teacher_name" => "李老师",
                        "student_name" => "李学生"
                    )
                ),
                array(
                    array(
                        "start_time" => "2014-08-31 14:00:00",
                        "end_time" => "2014-08-31 17:00:00",
                        "user_type" => 0,
                        "teacher_name" => "李老师",
                        "student_name" => "李学生"
                    )
                ),
                array(
                    array(
                        "start_time" => "2014-08-31 21:00:00",
                        "end_time" => "2014-08-31 23:00:00",
                        "user_type" => 0,
                        "teacher_name" => "李老师",
                        "student_name" => "李学生"
                    )
                )
            )
        ),

        "flags" => array(

            "2014-08-29" => array(0, 1, 1),
            "2014-08-30" => array(1, 0, 1),
            "2014-08-31" => array(1, 1, 1)

        )
    )
);

echo json_encode($response);