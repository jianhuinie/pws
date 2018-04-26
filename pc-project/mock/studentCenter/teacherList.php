<?php

require("../bootstrap.php");

$response = array(
    "code" => 0,
    "tpl" => array(
        "order_list" => fetch(

            "student_center/common/teacherList",

            array(
                "tpl_data" => array(
                    "person_list" => array(
                        array(
                            'type' => 'teacher',
                            'teacher_id' => '147',
                            'realname' => '毛庆1',
                            'mobile' => '13695357534',
                            'avatar' => 'http://img.postwhy.com/2011/507-082646.jpg',
                            'email' => 'sitvolupta@126.com',
                            'sex' => '1',
                            'domain' => 'www.genshuixue.com/utexplic'
                        ),
                        array(
                            'type' => 'teacher',
                            'teacher_id' => '117',
                            'realname' => '胡岚聪',
                            'mobile' => '13715646776',
                            'avatar' => 'http://img.postwhy.com/2011/507-082646.jpg',
                            'email' => 'temporadip@qq.com',
                            'sex' => '1',
                            'domain' => 'www.genshuixue.com/aliquado'
                        ),
                        array(
                            'type' => 'teacher',
                            'teacher_id' => '177',
                            'realname' => '邓昭',
                            'mobile' => '13916326316',
                            'avatar' => 'http://img.postwhy.com/2011/507-082646.jpg',
                            'email' => 'sitdigniss@163.com',
                            'sex' => '1',
                            'domain' => 'www.genshuixue.com/dolorq'
                        ),
                        array(
                            'type' => 'teacher',
                            'teacher_id' => '181',
                            'realname' => '崔伦',
                            'mobile' => '13277555725',
                            'avatar' => 'http://img.postwhy.com/2011/507-082646.jpg',
                            'email' => 'ipsumiust@139.com',
                            'sex' => '0',
                            'domain' => 'www.genshuixue.com/doplaceatl'
                        ),
                        array(
                            'type' => 'teacher',
                            'teacher_id' => '157',
                            'realname' => '白园英',
                            'mobile' => '13914783820',
                            'avatar' => 'http://img.postwhy.com/2011/507-082646.jpg',
                            'email' => 'utmodi@tom.com',
                            'sex' => '0',
                            'domain' => 'www.genshuixue.com/eiusmo'
                        )
                    )
                )
            )
        )
    )
);

echo json_encode($response);