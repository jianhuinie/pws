<?php

require("../bootstrap.php");

$response = array(
    "code" => 0,
    "tpl" => array(
        "order_list" => fetch(

            "common/center/ajaxPerson",
            array(
                "tpl_data" => array(
                    "person_list" => array(
                        array(
                            'teacher_id' => '147',
                            'realname' => '毛庆',
                            'mobile' => '13695357534',
                            'avatar' => 'http://img.postwhy.com/2011/507-082646.jpg',
                            'email' => 'sitvolupta@126.com',
                            'sex' => '1',
                            'domain' => 'www.genshuixue.com/utexplic'
                        ),
                        array(

                            'teacher_id' => '117',
                            'realname' => '胡岚聪',
                            'mobile' => '13715646776',
                            'avatar' => 'http://img.postwhy.com/2011/507-082646.jpg',
                            'email' => 'temporadip@qq.com',
                            'sex' => '1',
                            'domain' => 'www.genshuixue.com/aliquado'
                        ),
                        array(
                            'teacher_id' => '177',
                            'realname' => '邓昭',
                            'mobile' => '13916326316',
                            'avatar' => 'http://img.postwhy.com/2011/507-082646.jpg',
                            'email' => 'sitdigniss@163.com',
                            'sex' => '1',
                            'domain' => 'www.genshuixue.com/dolorq'
                        ),
                        array(
                            'teacher_id' => '181',
                            'realname' => '崔伦',
                            'mobile' => '13277555725',
                            'avatar' => 'http://img.postwhy.com/2011/507-082646.jpg',
                            'email' => 'ipsumiust@139.com',
                            'sex' => '0',
                            'domain' => 'www.genshuixue.com/doplaceatl'
                        ),
                        array(
                            'teacher_id' => '157',
                            'realname' => '白园英',
                            'mobile' => '13914783820',
                            'avatar' => 'http://img.postwhy.com/2011/507-082646.jpg',
                            'email' => 'utmodi@tom.com',
                            'sex' => '0',
                            'domain' => 'www.genshuixue.com/eiusmo'
                        ),
                        array(
                            'teacher_id' => '153',
                            'realname' => '韩爱',
                            'mobile' => '13464520848',
                            'avatar' => 'http://img.postwhy.com/2011/507-082646.jpg',
                            'email' => 'incididun@126.com',
                            'sex' => '1',
                            'domain' => 'www.genshuixue.com/incidid'
                        )
                    )
                )
            )
        )
    )
);

echo json_encode($response);