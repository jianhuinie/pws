<?php

require("../../bootstrap.php");

render(
    "userCenter/teacherCenter/indexDecorate",
    array(
        'tpl_data' => array(
            'teacher' => array(
                'template_m' => 'blue', // 当前选中模板 m
                'template_m_need_level' => 2, // 当前选中模板所需用户等级 m
                'template_pc' => 'orange', // 当前选中模板pc
                'template_pc_need_level' => 3 // 当前选中模板所需用户等级 pc
            ),
            'template_m_list' => array( // 手机模板
                array(
                    'name' => 'default',
                    'display_name' => '文艺范',
                    'cover_url' => 'http://img.gsxservice.com/0cms/d/file/content/2016/01/568b2fe2e3a5b.jpg', // 模板示例图
                    'preview_img' => 'http://img.gsxservice.com/0cms/d/file/content/2016/01/568cdda0b01c1.jpg', // M站预览图
                    'preview_url' => 'http://bj.test-m.genshuixue.com/0', // H5页面预览地址
                    'vip_level' => '3',
                ),
                array(
                    'name' => 'orange',
                    'display_name' => '文艺范',
                    'cover_url' => 'http://img.gsxservice.com/0cms/d/file/content/2016/01/568b2fe2e3a5b.jpg', // 模板示例图
                    'preview_img' => 'http://img.gsxservice.com/0cms/d/file/content/2016/01/568cdda0b01c1.jpg', // M站预览图
                    'preview_url' => 'http://bj.test-m.genshuixue.com/1', // H5页面预览地址
                    'vip_level' => '3',
                ),
                array(
                    'name' => 'blue',
                    'display_name' => '文艺范',
                    'cover_url' => 'http://img.gsxservice.com/0cms/d/file/content/2016/01/568b2fe2e3a5b.jpg', // 模板示例图
                    'preview_img' => 'http://img.gsxservice.com/0cms/d/file/content/2016/01/568cdda0b01c1.jpg', // M站预览图
                    'preview_url' => 'http://bj.test-m.genshuixue.com/2', // H5页面预览地址
                    'vip_level' => '3',
                ),
                array(
                    'name' => 'green',
                    'display_name' => '文艺范',
                    'cover_url' => 'http://img.gsxservice.com/0cms/d/file/content/2016/01/568b2fe2e3a5b.jpg', // 模板示例图
                    'preview_img' => 'http://img.gsxservice.com/0cms/d/file/content/2016/01/568cdda0b01c1.jpg', // M站预览图
                    'preview_url' => 'http://bj.test-m.genshuixue.com/3', // H5页面预览地址
                    'vip_level' => '3',
                )
            ),
            'template_pc_list' => array( // 网页模板
                array(
                    'name' => 'default',
                    'display_name' => '文艺范web',
                    'cover_url' => 'http://img.gsxservice.com/0cms/d/file/content/2016/01/568b2fe2e3a5b.jpg', // 模板示例图
                    'preview_img' => 'http://img.gsxservice.com/0cms/d/file/content/2016/01/568cdda0b01c1.jpg', // M站预览图
                    'preview_url' => 'http://bj.test-m.genshuixue.com/0', // H5页面预览地址
                    'vip_level' => '3',
                ),
                array(
                    'name' => 'orange',
                    'display_name' => '文艺范web',
                    'cover_url' => 'http://img.gsxservice.com/0cms/d/file/content/2016/01/568b2fe2e3a5b.jpg', // 模板示例图
                    'preview_img' => 'http://img.gsxservice.com/0cms/d/file/content/2016/01/568cdda0b01c1.jpg', // M站预览图
                    'preview_url' => 'http://bj.test-m.genshuixue.com/1', // H5页面预览地址
                    'vip_level' => '3',
                ),
                array(
                    'name' => 'blue',
                    'display_name' => '文艺范web',
                    'cover_url' => 'http://img.gsxservice.com/0cms/d/file/content/2016/01/568b2fe2e3a5b.jpg', // 模板示例图
                    'preview_img' => 'http://img.gsxservice.com/0cms/d/file/content/2016/01/568cdda0b01c1.jpg', // M站预览图
                    'preview_url' => 'http://bj.test-m.genshuixue.com/2', // H5页面预览地址
                    'vip_level' => '3',
                ),
                array(
                    'name' => 'green',
                    'display_name' => '文艺范web',
                    'cover_url' => 'http://img.gsxservice.com/0cms/d/file/content/2016/01/568b2fe2e3a5b.jpg', // 模板示例图
                    'preview_img' => 'http://img.gsxservice.com/0cms/d/file/content/2016/01/568cdda0b01c1.jpg', // M站预览图
                    'preview_url' => 'http://bj.test-m.genshuixue.com/3', // H5页面预览地址
                    'vip_level' => '3',
                )
            )
        )
    )
);