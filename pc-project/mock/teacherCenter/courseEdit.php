<?php

require("../bootstrap.php");

render(
    "userCenter/teacherCenter/courseEdit",
    array(
        "tpl_data" => array(
            "is_huike_teacher" => 1, // 是否是汇课间老师
            "id" => 123,
            "name" => '这明明是编辑',
            "remark" => '课程信息是我',
            "subject_path" => array(
                array(
                    "id" => 1011,
                    "name" => '1',
                    "level" => 1
                ),
                array(
                    "id" => 1011,
                    "name" => '2',
                    "level" => 2
                ),
                array(
                    "id" => 1011,
                    "name" => '3',
                    "level" => 3
                )
            ),
            "lesson_way" => 1,
            "price_discuss" => null, // 协商地点 1
            "price_online" => null, // 在线教学 2
            "price_student" => 2, // 学生上门 4
            "price_teacher" => 3, // 老师上门 8
            "verify_status" => 1, // 0审核中 1通过 2未通过
            "reasons" => array(),
            "property_ids" => array(1024, 2048, 4096),
            // "has_region" => false, // 可上门授课范围
            "has_location" => false ,// 是否有地址薄

            'template_m' => '',
            'template_pc' => 'default',
            'template_pc_level' => 1,
            'templates_m' => array(
                '0' => array(
                    'display_name' => '你说加就',
                    'image' => 'http://img.gsxservice.com/5996188_8ikr2xez.png',  //课程设置预览图
                    'template' => 'default',        //模板名
                    'level' => 0,       //模板等级
                    'preview_url' => 'www.genshuixue.com',      //chrome预览地址
                    'preview_image' => 'http://img.gsxservice.com/5996188_8ikr2xez.png',  //非chrome预览图片
                ),
                '1' => array(
                    'display_name' => '你说加就',
                    'image' => 'http://img.gsxservice.com/5996188_8ikr2xez.png',  //课程设置预览图
                    'template' => 'default2',        //模板名
                    'level' => 1,       //模板等级
                    'preview_url' => 'www.genshuixue.com',      //chrome预览地址
                    'preview_image' => 'http://img.gsxservice.com/5996188_8ikr2xez.png',  //非chrome预览图片
                ),
                '2' => array(
                    'display_name' => '你说加就',
                    'image' => 'http://img.gsxservice.com/5996188_8ikr2xez.png',  //课程设置预览图
                    'template' => 'default3',        //模板名
                    'level' => 2,       //模板等级
                    'preview_url' => 'www.genshuixue.com',      //chrome预览地址
                    'preview_image' => 'http://img.gsxservice.com/5996188_8ikr2xez.png',  //非chrome预览图片
                ),
                '3' => array(
                    'display_name' => '你说加就',
                    'image' => 'http://img.gsxservice.com/5996188_8ikr2xez.png',  //课程设置预览图
                    'template' => 'default4',        //模板名
                    'level' => 3,       //模板等级
                    'preview_url' => 'www.genshuixue.com',      //chrome预览地址
                    'preview_image' => 'http://img.gsxservice.com/5996188_8ikr2xez.png',  //非chrome预览图片
                )
            ),
            'templates' => array(
                '0' => array(
                    'display_name' => '非会员模板',
                    'image' => 'http://img.gsxservice.com/5996188_8ikr2xez.png',  //课程设置预览图
                    'template' => 'default',        //模板名
                    'level' => 0,       //模板等级
                    'preview_url' => 'www.genshuixue.com',      //chrome预览地址
                    'preview_image' => 'http://img.gsxservice.com/5996188_8ikr2xez.png',  //非chrome预览图片
                ),
                '1' => array(
                    'display_name' => '会员模板（橙色）',
                    'image' => 'http://img.gsxservice.com/5996188_8ikr2xez.png',  //课程设置预览图
                    'template' => 'default2',        //模板名
                    'level' => 1,       //模板等级
                    'preview_url' => 'www.genshuixue.com',      //chrome预览地址
                    'preview_image' => 'http://img.gsxservice.com/5996188_8ikr2xez.png',  //非chrome预览图片
                ),
                '2' => array(
                    'display_name' => '会员模板（咖啡色）',
                    'image' => 'http://img.gsxservice.com/5996188_8ikr2xez.png',  //课程设置预览图
                    'template' => 'default3',        //模板名
                    'level' => 2,       //模板等级
                    'preview_url' => 'www.genshuixue.com',      //chrome预览地址
                    'preview_image' => 'http://img.gsxservice.com/5996188_8ikr2xez.png',  //非chrome预览图片
                )
            ),
        )
    )
);

