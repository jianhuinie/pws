<?php

/*
 * METHOD GET
 * URL    /lesson/myTeachers?status=1  1代表当期老师, 2代表往期老师，如果status为空，默认为当期老师
 *
 */

require("../bootstrap.php");

render(
    "student_center/teacher",
    array(
        "tpl_data" => array(
            "more" => "0",
            "person_list" => array(
                "role" => 1,
                array(
                    'type' => 'student',
                    'person_id' => '147',
                    'person_number' => '147',
                    'im_online_status' => 1,
                    'realname' => '毛庆22',
                    'display_name' => '毛庆',
                    'mobile' => '13695357534',
                    'avatar' => 'http://img.postwhy.com/2011/507-082646.jpg',
                    'email' => 'sitvolupta@126.com',
                    'sex' => '1',
                    'domain' => 'http://www.genshuixue.com/utexplic',
                    'qreserve_sign' => 1 // 闪电约课：1开启 0关闭

                ),
                array(
                    'type' => 'student',
                    'person_id' => '117',
                    'im_online_status' => 1,
                    'person_number' => '147',
                    'realname' => '胡岚聪',
                    'display_name' => '毛庆',
                    'mobile' => '13715646776',
                    'avatar' => 'http://img.postwhy.com/2011/507-082646.jpg',
                    'email' => 'temporadip@qq.com',
                    'sex' => '1',
                    'domain' => 'http://www.genshuixue.com/aliquado',
                    'qreserve_sign' => 0 // 闪电约课：1开启 0关闭
                ),
                array(
                    'type' => 'student',
                    'person_id' => '177',
                    'im_online_status' => 1,
                    'person_number' => '147',
                    'realname' => '邓昭',
                    'display_name' => '毛庆',
                    'mobile' => '13916326316',
                    'avatar' => 'http://img.postwhy.com/2011/507-082646.jpg',
                    'email' => 'sitdigniss@163.com',
                    'sex' => '1',
                    'domain' => 'http://www.genshuixue.com/dolorq',
                    'qreserve_sign' => 0 // 闪电约课：1开启 0关闭
                ),
                array(
                    'type' => 'student',
                    'person_id' => '181',
                    'im_online_status' => 1,
                    'person_number' => '147',
                    'realname' => '崔伦',
                    'display_name' => '毛庆',
                    'mobile' => '13277555725',
                    'avatar' => 'http://img.postwhy.com/2011/507-082646.jpg',
                    'email' => 'ipsumiust@139.com',
                    'sex' => '0',
                    'domain' => 'http://www.genshuixue.com/doplaceatl',
                    'qreserve_sign' => 1 // 闪电约课：1开启 0关闭
                ),
                array(
                    'type' => 'student',
                    'person_id' => '157',
                    'im_online_status' => 1,
                    'person_number' => '147',
                    'realname' => '白园英',
                    'display_name' => '毛庆',
                    'mobile' => '13914783820',
                    'avatar' => 'http://img.postwhy.com/2011/507-082646.jpg',
                    'email' => 'utmodi@tom.com',
                    'sex' => '0',
                    'domain' => 'http://www.genshuixue.com/eiusmo',
                    'qreserve_sign' => 1 // 闪电约课：1开启 0关闭
                ),
                array(
                    'type' => 'student',
                    'person_id' => '153',
                    'im_online_status' => 1,
                    'person_number' => '147',
                    'realname' => '韩爱',
                    'display_name' => '毛庆',
                    'mobile' => '13464520848',
                    'avatar' => 'http://img.postwhy.com/2011/507-082646.jpg',
                    'email' => 'incididun@126.com',
                    'sex' => '1',
                    'domain' => 'http://www.genshuixue.com/incidid',
                    'qreserve_sign' => 1 // 闪电约课：1开启 0关闭
                )

            )

        )
    )
);
