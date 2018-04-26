<?php

require("../bootstrap.php");

$tpl_data = array(
    "tpl_data" => array(
        'video_count'=>12,
        'photo_count' => 12,
        'pager'=> array(
            'count' => 1000,
            'page' => 500 ,
            'page_size' => 10
        ),
        "video_list" => array(
            array(
                "name" => "高中英语语法技巧的问题高中英语语法技巧的问题",
                "img" => "http://i1.letvimg.com/yunzhuanma/201409/12/101b9473a729613cb7d56d78781ac143/thumb/1_160_120.jpg",
                "video" => "http://www.genshuixue.com/video/view/140",
                "video_id" => 1,
                "preface_url_prefix" => "http://i3.letvimg.com/yunzhuanma/201410/18/66a4a94ec40ae9f4eb73f4c6c6384957/thumb"
            ),
            array(
                "name" => "高中英语语法技巧的问题",
                "img" => "http://img.gsxservice.com/149743_hixrca18.png",
                "video" => "http://www.genshuixue.com/video/view/140",
                "video_id" => 1,
                "preface_url_prefix" => "http://i1.letvimg.com/yunzhuanma/201409/12/101b9473a729613cb7d56d78781ac143/thumb"
            ),
            array(
                "name" => "高中英语语法技巧的问题",
                "img" => "http://img.genshuixue.com/2142_0p5xsq1x.jpeg",
                "video" => "http://www.genshuixue.com/video/view/140",
                "video_id" => 1,
                "preface_url_prefix" => "http://i3.letvimg.com/yunzhuanma/201410/18/66a4a94ec40ae9f4eb73f4c6c6384957/thumb"
            ),
        ),
        "photo_list" => array(
            array(
                'id' => '38989',
                'name' => '爱是看得见',
                'img' => 'http://img.gsxservice.com/65776_wjoqso17.jpeg',
                'width' => '720',
                'height' => '1280',
                'create_time' => '2015-03-04 17:28:08'
            ),
            array(
                'id' => '38989',
                'name' => '发生的看得见',
                'img' => 'http://test-img.gsxservice.com/289209_8qnnhksw.png',
                'width' => '720',
                'height' => '1280',
                'create_time' => '2015-03-04 17:28:08'
            ),
            array(
                'id' => '38989',
                'name' => '爱上地方撒的得见',
                'img' => 'http://test-img.gsxservice.com/289209_8qnnhksw.png',
                'width' => '720',
                'height' => '1280',
                'create_time' => '2015-03-04 17:28:08'
            ),
            array(
                'id' => '38989',
                'name' => '爱是看得见',
                'img' => 'http://test-img.gsxservice.com/289209_8qnnhksw.png',
                'width' => '720',
                'height' => '1280',
                'create_time' => '2015-03-04 17:28:08'
            ),
            array(
                'id' => '38989',
                'name' => '爱是看得见',
                'img' => 'http://test-img.gsxservice.com/289209_8qnnhksw.png',
                'width' => '720',
                'height' => '1280',
                'create_time' => '2015-03-04 17:28:08'
            ),
        )
    )
);

    $show_type = $_GET['show_type'];
    if ($show_type == 1) {
        $response = array(
            "code" => 0,
            "data" => array(

                "pager" => $tpl_data['tpl_data']['pager'],
                "video_list" => $tpl_data['tpl_data']['video_list'],
                "photo_list" => $tpl_data['tpl_data']['photo_list'],
                "tpl" => array(
                    "media_player" => fetch('teacher/newDetail/mediaPlayer', array(
                        'tpl_data' => array(
                            'video_list' => $tpl_data['tpl_data']['video_list'],
                            'photo_list' => $tpl_data['tpl_data']['photo_list'],
                            'pager' => $tpl_data['tpl_data']['pager'],
                            'video_count'=>$tpl_data['tpl_data']['video_count'],
                            'photo_count' => $tpl_data['tpl_data']['photo_count'],
                        )
                    ))
                )

            )
        );
    } else {
        $response = array(
            "code" => 0,
            "data" => array(

                "pager" => $tpl_data['tpl_data']['pager'],
                "video_list" => $tpl_data['tpl_data']['video_list'],
                "photo_list" => $tpl_data['tpl_data']['photo_list'],
                "tpl" => array(
                    "media_list" => fetch('teacher/newDetail/mediaList', array(
                        'tpl_data' => array(
                            'video_list' => $tpl_data['tpl_data']['video_list'],
                            'photo_list' => $tpl_data['tpl_data']['photo_list'],
                            'pager' => $tpl_data['tpl_data']['pager']
                        )
                    ))
                )

            )
        );
    }


echo json_encode($response);
