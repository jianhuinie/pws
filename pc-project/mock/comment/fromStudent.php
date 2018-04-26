<?php

require("../bootstrap.php");

render(
    "teacher_center/commentFromStudent",
    array(
        "tpl_data" => array(
            "additional" => array(
                "total_score" => array(
                    "one_rate" => '10%',
                    "two_rate" => '30%',
                    "three_rate" => 0,
                    "four_rate" => 0,
                    "five_rate" => 0,
                    "total" => 0
                ),
                "invite_comment_number" => 21,
                "default_comment_number" => 32,
                "user_comment_number" => 42,
            ),
            "teacher_number" => "835527078",
            "comment_type" => 3,
            "face_type" => 2, // 当前是好中差哪个评价
            "score" => array(
                "total_score" => "0", // 总分
                "teach_result" => null,
                "desc_match" => null,
                "service_attitude" => null,
                "thump_up" => "32",
                "total" => "0",
                "great_rate" => "0.73",
                "comment_type" => array(
                    "all" => 20, // 全部
                    "class" => 3, // 班课
                    "invite" => 5, // 邀请评价
                    "normal" => 12, // 一对一
                    "video" => 24,
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
                    'user_name' => '王wangwangwang',
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
                        )
                    ),
                    "photo_list" => array(
                        array(
                        "title" => "32",
                        "user_id" => "835670438",
                        "storage_id" => "181437",
                        "create_time" => "1458545229",
                        "url" => "http://test-img.gsxservice.com/435687_ivg8cgbu.jpeg",
                        "width" => 1680,
                        "height" => 1050
                        ),
                        array(
                        "title" => "121",
                        "user_id" => "835670438",
                        "storage_id" => "181438",
                        "create_time" => "1458545229",
                        "url" => "http://test-img.gsxservice.com/435688_p2t6qx0l.jpeg",
                        "width" => 510,
                        "height" => 318
                        ),
                        array(
                        "title" => "212",
                        "user_id" => "835670438",
                        "storage_id" => "181439",
                        "create_time" => "1458545229",
                        "url" => "http://test-img.gsxservice.com/435689_ptkk80y9.jpeg",
                        "width" => 1920,
                        "height" => 1200
                        ),
                    ),
                    "appeal_status" => -1 // -1可以申诉 0申诉处理中 1申诉成功(评论会被删除) 2申诉完成(申诉失败)
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
                    ),
                    "photo_list" => array(
                        array(
                        "title" => "32",
                        "user_id" => "835670438",
                        "storage_id" => "181437",
                        "create_time" => "1458545229",
                        "url" => "http://test-img.gsxservice.com/435687_ivg8cgbu.jpeg",
                        "width" => 1680,
                        "height" => 1050
                        ),
                        array(
                        "title" => "121",
                        "user_id" => "835670438",
                        "storage_id" => "181438",
                        "create_time" => "1458545229",
                        "url" => "http://test-img.gsxservice.com/435688_p2t6qx0l.jpeg",
                        "width" => 510,
                        "height" => 318
                        ),
                        array(
                        "title" => "212",
                        "user_id" => "835670438",
                        "storage_id" => "181439",
                        "create_time" => "1458545229",
                        "url" => "http://test-img.gsxservice.com/435689_ptkk80y9.jpeg",
                        "width" => 1920,
                        "height" => 1200
                        ),
                    ),
                    "appeal_status" => 2, // -1可以申诉 0申诉处理中 1申诉成功 2申诉失败
                    "appeal_reason" => '恶意辱骂', // 申诉原因
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
                    "appeal_status" => 0 // -1可以申诉 0申诉处理中 1申诉成功 2申诉失败
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
                    "appeal_status" => -1 // -1可以申诉 0申诉处理中 1申诉成功 2申诉失败
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

