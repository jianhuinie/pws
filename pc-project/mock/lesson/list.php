<?php

require("../bootstrap.php");

$response = array(
    "code" => 0,
    "data" => array(
        "tpl" => array(
            "course_list" => fetch(

                "common/siteNav/courseList",

                array(
                    "tpl_data" => array(
                        "course_list" => array(
                            "lessons" => array(
                                array(
                                    'lesson' => array(
                                        'course_name' => '如何年入百万,只许躺在床上轻轻松松的',
                                        'course_name_cut' => '如何年入...',
                                        'lesson_way' => 'online',
                                        'start_time' => '2014-08-28 18:37:04',
                                        'end_time' => '2014-08-28 18:37:04',
                                        'status_display' => '待上课'
                                    ),
                                    'user' => array(
                                        'avatar' => 'http://img.postwhy.com/2011/507-082646.jpg',
                                        'name' => '李小璐7788694',
                                        'name_cut' => '李小璐'

                                    )
                                ),
                                array(
                                    'lesson' => array(
                                        'course_name' => '老太太刚出狱，一年赚千万',
                                        'course_name_cut' => '老太太刚出狱...',
                                        'lesson_way' => 'student',
                                        'start_time' => '2014-12-28 14:37:04',
                                        'end_time' => '2011-08-28 18:37:04',
                                        'status_display' => '待付款'
                                    ),
                                    'user' => array(
                                        'avatar' => 'http://img.postwhy.com/2011/507-082646.jpg',
                                        'name' => '安娜7788694',
                                        'name_cut' => '安娜'

                                    )
                                )
                            )
                        )
                    )
                )
            )
        ),
        "course_list" => array(
            "stat" => array(
                "1" => "0",
                "2" => "0",
                "3" => "0",
                "4" => "0",
                "5" => "0"
            ),
            "order_length" => "333"
        ),
        "extra" => array(
            "comment_prize_flag"=> 1
        )
    )
);

echo json_encode($response);