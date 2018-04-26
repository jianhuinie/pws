<?php

require("../bootstrap.php");

render(
    "static/app",
    array(
        "tpl_data" => array(
            'android' => array(
                'student' => array(
                    'version' => '1.2.1',
                    'update_time' => '2015/11/24',
                ),
                'teacher' => array(
                    'version' => '1.2.1',
                    'update_time' => '2014/11/25',
                ),
            ),
            'ios' => array(
                'student' => array(
                    'version' => '1.2.1',
                    'update_time' => '2014/16/24',
                ),
                'teacher' => array(
                    'version' => '1.2.1',
                    'update_time' => '2014/11/24',
                ),
            ),
            's_banner' => 'http://test-img.gsxservice.com/0cms/d/file/content/2015/11/5636dfb86e62c.jpg',
            't_banner' => 'http://test-img.gsxservice.com/0cms/d/file/content/2015/11/5636dfc2e0265.jpg',
        )
    )
);

