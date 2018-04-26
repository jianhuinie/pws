<?php

/*
 * METHOD GET
 * URL    /lesson/myTeachers?status=1  1代表正在上课, 2代表过期老师，如果status为空，默认为正在上课
 *
 * @file 我的订单（我的老师、我的学生）
 * @author zhangjiayi
 *
 */

require("../bootstrap.php");

render(
    "common/center/myOrder",
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
);
