<?php

require("../bootstrap.php");

render(
    "static/links",
    array(
         "tpl_data" => array(

            'head' => array(
                '1' => '大在1',
                '2' => '在在2',
                '3' => '大在死3',
                '4' => '在在4',
                '5' => '在要5'
            ),
            'content' => array(
                'organization' => array(
                    'catname' => '培训机构1',
                    'data' => array(
                        array(
                            'title' => '网站名字11111111',
                            'link'  => 'http://www.baidu.com'
                        ),
                        array(
                            'title' => '网站名字',
                            'link'  => 'http://www.gaosiedu.com'
                        ),
                        array(
                            'title' => '网站名字',
                            'link'  => 'http://www.gaosiedu.com'
                        )
                    ),
                ),
                 'education' => array(
                    'catname' => '培训机构2',
                    'data' => array(
                        array(
                            'title' => '网站名字22222',
                            'link'  => 'http://www.gaosiedu.com'
                        ),
                        array(
                            'title' => '网站名字',
                            'link'  => 'http://www.gaosiedu.com'
                        ),
                        array(
                            'title' => '网站名字',
                            'link'  => 'http://www.gaosiedu.com'
                        )
                    ),),
                 'navigation' => array(
                    'catname' => '培训机构3',
                    'data' => array(
                        array(
                            'title' => '网站名字',
                            'link'  => 'http://www.gaosiedu.com'
                        ),
                        array(
                            'title' => '网站名字',
                            'link'  => 'http://www.gaosiedu.com'
                        ),
                        array(
                            'title' => '网站名字',
                            'link'  => 'http://www.gaosiedu.com'
                        )
                    ),),
                 'television' => array(
                    'catname' => '培训机构4',
                    'data' => array(
                        array(
                            'title' => '网站名字',
                            'link'  => 'http://www.gaosiedu.com'
                        ),
                        array(
                            'title' => '网站名字',
                            'link'  => 'http://www.gaosiedu.com'
                        ),
                        array(
                            'title' => '网站名字',
                            'link'  => 'http://www.gaosiedu.com'
                        )
                    ),),
                 'website'  =>  array(
                    'catname' => '培训机构5',
                    'data' => array(
                        array(
                            'title' => '网站名字',
                            'link'  => 'http://www.gaosiedu.com'
                        ),
                        array(
                            'title' => '网站名字',
                            'link'  => 'http://www.gaosiedu.com'
                        ),
                        array(
                            'title' => '网站名字',
                            'link'  => 'http://www.gaosiedu.com'
                        )
                    ),
                 )
            )
         )
    )
);

