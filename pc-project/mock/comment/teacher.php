<?php

require("../bootstrap.php");

render(
    "student_center/commentTeacher",
    array(
        "tpl_data" => array(
            "comment_type" => 3,
            "face_type" => 2, // 当前是好中差哪个评价
            "score" => array(
                "comment_type" => array(
                    "all" => 20, // 全部
                    "class" => 3, // 班课
                    "invite" => 5, // 邀请评价
                    "normal" => 12 // 一对一
                ),
                "face_type" => array(
                    "total" => 20,
                    "lower" => 2,
                    "great" => 17,
                    "middle" => 1,
                    "has_photo" => 7
                ),
                "total" => 20
            ),
            'comment_list' => array(
                array(
                    'id' => '38466',
                    'purchase_id' => '1115042991704601',
                    'serial_number' => '150429812336',
                    'user_id' => '341952',
                    'teacher_user_id' => '341935',
                    'desc_match' => '5.0',
                    'teach_result' => '3.0',
                    'service_attitude' => '3.0',
                    'face_type' => '1',
                    'info' => 'vcddsaf',
                    'total_score' => 2.0,
                    'pid' => '0',
                    'create_time' => '2015-10-15 17:12:49',
                    'update_time' => '2015-10-15 17:17:55',
                    'fr' => '1',
                    'course_type' => '1',
                    'course_number' => '0',
                    'display_order' => '1000007',
                    'thumb_up' => '0',
                    'has_photo' => '0',
                    'organization_id' => '',
                    'display_title' => '课节5-2',
                    'anonymous' => '0',
                    'has_modify' => '1',
                    'user_number' => '874255148',
                    'teacher_user_number' => '832499158',
                    'private_domain' => '832499158',
                    'user_avatar' => 'http://test-img.gsxservice.com/81_xvle7ck2.jpeg',
                    'teacher_avatar' => 'http://test-img.gsxservice.com/277917_pt0z5bem.jpeg',
                    'teacher_url' => 'www.baidu.com',
                    'lesson_way' => 'teacher',
                    'user_name' => '王家小麦',
                    'display_name' => '王家小麦',
                    'user_name_cut' => '王家小麦',
                    'teacher_user_name' => '刘美玉',
                    'teacher_display_name' => '刘美玉',
                    'teacher_user_name_cut' => '刘美玉',
                    'student_name' => '三儿',
                    'student_name_cut' => '三儿',
                    'student_display_name' => '王家小麦',
                    'course_id' => '48271',
                    'course_name' => '太极拳',
                    'hours' => '10.0',
                    'if_can_addition' => true, // 是否可追评
                    'if_can_review' => true, // 是否可回复
                    "additional" => array(
                        "student" => array(
                            "teacher_comment_id" => 4324,
                            "info" => "几天过去了，心情好多了",
                            "type" => 1, // 1,追评 2,回复
                            "create_time" => "2015-11-09 19:23:23"
                        ),
                        "teacher" => array(
                            "teacher_comment_id" => 4324,
                            "info" => "你也是个认真的孩子呢",
                            "type" => 2,
                            "create_time" => "2015-11-09 19:23:23"
                        )
                    )
                ),
                array(
                    'id' => '38466',
                    'purchase_id' => '1115042991704601',
                    'serial_number' => '150429812336',
                    'user_id' => '341952',
                    'teacher_user_id' => '341935',
                    'desc_match' => '5.0',
                    'teach_result' => '3.0',
                    'service_attitude' => '3.0',
                    'face_type' => '3',
                    'info' => 'vcddsaf',
                    'pid' => '0',
                    'create_time' => '2015-10-15 17:12:49',
                    'update_time' => '2015-10-15 17:17:55',
                    'fr' => '0',
                    'course_type' => '1',
                    'course_number' => '0',
                    'display_order' => '1000007',
                    'thumb_up' => '0',
                    'has_photo' => '0',
                    'organization_id' => '',
                    'display_title' => '课节5-2',
                    'anonymous' => '1',
                    'has_modify' => '0',
                    'user_number' => '874255148',
                    'teacher_user_number' => '832499158',
                    'private_domain' => '832499158',
                    'user_avatar' => 'http://test-img.gsxservice.com/81_xvle7ck2.jpeg',
                    'teacher_avatar' => 'http://test-img.gsxservice.com/277917_pt0z5bem.jpeg',
                    'teacher_url' => 'www.baidu.com',
                    'lesson_way' => 'teacher',
                    'user_name' => '王家小麦',
                    'display_name' => '王家小麦',
                    'user_name_cut' => '王家小麦',
                    'teacher_user_name' => '刘美玉哈哈哈wqe',
                    'teacher_display_name' => '刘美玉',
                    'teacher_user_name_cut' => '刘美玉',
                    'student_name' => '三儿',
                    'student_name_cut' => '三儿',
                    'student_display_name' => '王家小麦',
                    'course_id' => '48271',
                    'course_name' => '太极拳',
                    'hours' => '10.0',
                    'if_can_addition' => true, // 是否可追评
                    'if_can_review' => true, // 是否可回复
                    "additional" => array(
                        "student" => array(
                            "teacher_comment_id" => 4324,
                            "info" => "几天过去了，心情好多了",
                            "type" => 1, // 1,追评 2,回复
                            "create_time" => "2015-11-09 19:23:23"
                        ),
                        "teacher" => array(
                            "teacher_comment_id" => 4324,
                            "info" => "你也是个认真的孩子呢",
                            "type" => 2,
                            "create_time" => "2015-11-09 19:23:23"
                        )
                    )
                ),
                array(
                    'id' => '38466',
                    'purchase_id' => '1115042991704601',
                    'serial_number' => '150429812336',
                    'user_id' => '341952',
                    'teacher_user_id' => '341935',
                    'desc_match' => '5.0',
                    'teach_result' => '3.0',
                    'service_attitude' => '3.0',
                    'face_type' => '3',
                    'info' => 'vcddsaf',
                    'pid' => '0',
                    'create_time' => '2015-10-15 17:12:49',
                    'update_time' => '2015-10-15 17:17:55',
                    'fr' => '1',
                    'course_type' => '1',
                    'course_number' => '0',
                    'display_order' => '1000007',
                    'thumb_up' => '0',
                    'has_photo' => '0',
                    'organization_id' => '',
                    'display_title' => '课节5-2',
                    'anonymous' => '0',
                    'has_modify' => '0',
                    'user_number' => '874255148',
                    'teacher_user_number' => '832499158',
                    'private_domain' => '832499158',
                    'user_avatar' => 'http://test-img.gsxservice.com/81_xvle7ck2.jpeg',
                    'teacher_avatar' => 'http://test-img.gsxservice.com/277917_pt0z5bem.jpeg',
                    'teacher_url' => 'www.baidu.com',
                    'lesson_way' => 'teacher',
                    'user_name' => '王家小麦',
                    'display_name' => '王家小麦',
                    'user_name_cut' => '王家小麦',
                    'teacher_user_name' => '刘美玉',
                    'teacher_display_name' => '刘美玉',
                    'teacher_user_name_cut' => '刘美玉',
                    'student_name' => '三儿',
                    'student_name_cut' => '三儿',
                    'student_display_name' => '王家小麦',
                    'course_id' => '48271',
                    'course_name' => '太极拳',
                    'hours' => '10.0',
                    'if_can_addition' => true, // 是否可追评
                    'if_can_review' => true, // 是否可回复
                    "additional" => array(
                        "student" => array(
                            "teacher_comment_id" => 4324,
                            "info" => "几天过去了，心情好多了",
                            "type" => 1, // 1,追评 2,回复
                            "create_time" => "2015-11-09 19:23:23"
                        ),
                        "teacher" => array(
                            "teacher_comment_id" => 4324,
                            "info" => "你也是个认真的孩子呢",
                            "type" => 2,
                            "create_time" => "2015-11-09 19:23:23"
                        )
                    )
                ),
                array(
                    'id' => '38466',
                    'purchase_id' => '1115042991704601',
                    'serial_number' => '150429812336',
                    'user_id' => '341952',
                    'teacher_user_id' => '341935',
                    'desc_match' => '5.0',
                    'teach_result' => '3.0',
                    'service_attitude' => '3.0',
                    'face_type' => '3',
                    'info' => 'vcddsaf',
                    'pid' => '0',
                    'create_time' => '2015-10-15 17:12:49',
                    'update_time' => '2015-10-15 17:17:55',
                    'fr' => '0',
                    'course_type' => '1',
                    'course_number' => '0',
                    'display_order' => '1000007',
                    'thumb_up' => '0',
                    'has_photo' => '0',
                    'organization_id' => '',
                    'display_title' => '课节5-2',
                    'anonymous' => '1',
                    'has_modify' => '0',
                    'user_number' => '874255148',
                    'teacher_user_number' => '832499158',
                    'private_domain' => '832499158',
                    'user_avatar' => 'http://test-img.gsxservice.com/81_xvle7ck2.jpeg',
                    'teacher_avatar' => 'http://test-img.gsxservice.com/277917_pt0z5bem.jpeg',
                    'teacher_url' => 'www.baidu.com',
                    'lesson_way' => 'teacher',
                    'user_name' => '王家小麦',
                    'display_name' => '王家小麦',
                    'user_name_cut' => '王家小麦',
                    'teacher_user_name' => '刘美玉',
                    'teacher_display_name' => '刘美玉',
                    'teacher_user_name_cut' => '刘美玉',
                    'student_name' => '三儿',
                    'student_name_cut' => '三儿',
                    'student_display_name' => '王家小麦',
                    'course_id' => '48271',
                    'course_name' => '太极拳',
                    'hours' => '10.0',
                    'if_can_addition' => true, // 是否可追评
                    'if_can_review' => true, // 是否可回复
                    'additional' => array(
                        "student" => array(
                            "teacher_comment_id" => 4324,
                            "info" => "几天过去了，心情好多了",
                            "type" => 1, // 1,追评 2,回复
                            "create_time" => "2015-11-09 19:23:23"
                        ),
                        "teacher" => array(
                            "teacher_comment_id" => 4324,
                            "info" => "你也是个认真的孩子呢",
                            "type" => 2,
                            "create_time" => "2015-11-09 19:23:23"
                        )
                    )
                )
            ),
            'pager' => array(
                'count' => 10000,
                'page' => 500 ,
                'page_size' => 10
            )
        )
    )
);

