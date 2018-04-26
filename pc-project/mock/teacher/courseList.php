<?php

require("../bootstrap.php");
$offline_tpl_data = array(
    "tpl_data" => array(
        'pager'=> array(
            'count' => 1000,
            'page' => 500 ,
            'page_size' => 10
        ),
        "class_course" => array(
            array(
                "number" => "1311134745712",//班课number
                "subject_id" => '383', //班课包含的subject的id
                "name" => "水彩画创意速成课程",
                "lesson_way" => 4, //可上课的方式4普通场地课2普通在线3在线公开课
                "create_time" => "2013-08-03 19:27:21", //课程创建时间
                "begin_time" => "1415860970", //课程开始时间
                "end_time" => "1415960970", //课程结束时间
                "course_len" => 12000,
                "display_status" => 2,
                "price" => 123,//课程价格
                "max_student" => 20,//最大学生数
                "address" => "北京市海淀区黄焖鸡米饭", //上课地点
                "address_area" => array(
                    "province" => array(
                        'id' => '570425344',
                        'name' => '台湾',
                        'display_order' => '460',
                        'level' => '1',
                        'hidden' => '0'
                    ),
                    "city" => array(
                        'id' => '570425344',
                        'name' => '台湾',
                        'display_order' => '0',
                        'level' => '2',
                        'hidden' => '0'
                    ),
                    "area" => array(
                        'id' => '570425344',
                        'name' => '澎湖县',
                        'display_order' => '0',
                        'level' => '3',
                        'hidden' => '0'
                    ),
                    "country" => array(

                    ),
                    "location_addr" => "中关村新东方大厦",
                ),
                "student_desc" => "小学生", //适学人群
                "status" => 1, //班课状态 1初始状态,2可以招生但是尚未招生
                               //3正在招生,4停止招生,5开课,6课程结束
                "photos" => array(
                    array(
                        'id' => '',
                        'create_time' => '',
                        'url' => 'http://img.gsxservice.com/1251_scwyj6zr.jpeg',
                        'name' => '鲜花',
                        'width' => 480,
                        'height' => 640
                    ),
                    array(
                        'id' => '',
                        'create_time' => '',
                        'url' => 'http://img.gsxservice.com/29650_v8ag661z.jpeg',
                        'name' => '失联客机',
                        'width' => 768,
                        'height' => 1024
                    ),
                    array(
                        'id' => '',
                        'create_time' => '',
                        'url' => 'http://img.gsxservice.com/901_o6ut84ce.png',
                        'name' => '撒了快递费',
                        'width' => 400,
                        'height' => 600
                    ),
                    array(
                        'id' => '',
                        'create_time' => '',
                        'url' => 'http://img.gsxservice.com/6271_znvng0qo.png',
                        'name' => '撒了款到即发',
                        'width' => 479,
                        'height' => 640
                    ),
                    array(
                        'id' => '',
                        'create_time' => '',
                        'url' => 'http://img.gsxservice.com/13116_rh81m1o2.jpeg',
                        'name' => '撒了款到即发',
                        'width' => 852,
                        'height' => 1136
                    ),
                    array(
                        'id' => '',
                        'create_time' => '',
                        'url' => 'http://img.gsxservice.com/1251_scwyj6zr.jpeg',
                        'name' => '鲜花',
                        'width' => 480,
                        'height' => 640
                    ),
                    array(
                        'id' => '',
                        'create_time' => '',
                        'url' => 'http://img.gsxservice.com/29650_v8ag661z.jpeg',
                        'name' => '失联客机',
                        'width' => 768,
                        'height' => 1024
                    ),
                    array(
                        'id' => '',
                        'create_time' => '',
                        'url' => 'http://img.gsxservice.com/901_o6ut84ce.png',
                        'name' => '撒了快递费',
                        'width' => 400,
                        'height' => 600
                    ),
                    array(
                        'id' => '',
                        'create_time' => '',
                        'url' => 'http://img.gsxservice.com/6271_znvng0qo.png',
                        'name' => '撒了款到即发',
                        'width' => 479,
                        'height' => 640
                    ),
                    array(
                        'id' => '',
                        'create_time' => '',
                        'url' => 'http://img.gsxservice.com/13116_rh81m1o2.jpeg',
                        'name' => '撒了款到即发',
                        'width' => 852,
                        'height' => 1136
                    ),
                ), //照片
                "total_pay" => 10, //支付状态
                "succ_pay" => 5,  // 成功支付
                "verify_status" => 1 , //审核状态1审核通过 2审核被拒
                "location" => '北京 海淀 全部信息',
                'offline_poi' => array(
                    'lng' => '1.24354325',
                    'lat' => '2.34535435'
                ),
                "chaban_flag" => 2, //插班标识 1不可插班 2第n节课前可插班 3随时可插班
                "chaban_quota" => 0, //第n节课前可插班
                "chaban_price_flag" => 1, //插班价格标识 1未结束课程的总价 2自定义插班价
                "chaban_price" => 9.9,//插班价格
                "can_chaban" => true,//当前时间能否插班
                "realtime_price" => 1.1, //实时价格
                "realtime_course_len" => 3600, //剩余长度
                "is_full" => true,// 是否满班
                "arrangement" => "是短发就死定了看风景阿里上看到飞机"
            ),
        ),
        "teacher" => array( 'can_order' => false ),
    )
);

$online_tpl_data = array(
    "tpl_data" => array(
        'pager'=> array(
            'count' => 1000,
            'page' => 500 ,
            'page_size' => 10
        ),
        "class_course" => array(
            array(
                "number" => "1311134745712",//班课number
                "subject_id" => '383', //班课包含的subject的id
                "name" => "水彩画创意速成课程",
                "lesson_way" => 4, //可上课的方式4普通场地课2普通在线3在线公开课
                "create_time" => "2013-08-03 19:27:21", //课程创建时间
                "begin_time" => "1415860970", //课程开始时间
                "end_time" => "1415960970", //课程结束时间
                "course_len" => 12000,
                "display_status" => 2,
                "price" => 123,//课程价格
                "class_type" => 1,//支持手机观看
                "max_student" => 20,//最大学生数
                "address" => "北京市海淀区黄焖鸡米饭", //上课地点
                "address_area" => array(
                    "province" => array(
                        'id' => '570425344',
                        'name' => '台湾',
                        'display_order' => '460',
                        'level' => '1',
                        'hidden' => '0'
                    ),
                    "city" => array(
                        'id' => '570425344',
                        'name' => '台湾',
                        'display_order' => '0',
                        'level' => '2',
                        'hidden' => '0'
                    ),
                    "area" => array(
                        'id' => '570425344',
                        'name' => '澎湖县',
                        'display_order' => '0',
                        'level' => '3',
                        'hidden' => '0'
                    ),
                    "country" => array(

                    ),
                    "location_addr" => "中关村新东方大厦",
                ),
                "student_desc" => "小学生", //适学人群
                "status" => 1, //班课状态 1初始状态,2可以招生但是尚未招生
                               //3正在招生,4停止招生,5开课,6课程结束
                "photos" => array(
                    array(
                        'id' => '',
                        'create_time' => '',
                        'url' => 'http://img.gsxservice.com/1251_scwyj6zr.jpeg',
                        'name' => '鲜花',
                        'width' => 480,
                        'height' => 640
                    ),
                    array(
                        'id' => '',
                        'create_time' => '',
                        'url' => 'http://img.gsxservice.com/29650_v8ag661z.jpeg',
                        'name' => '失联客机',
                        'width' => 768,
                        'height' => 1024
                    ),
                    array(
                        'id' => '',
                        'create_time' => '',
                        'url' => 'http://img.gsxservice.com/901_o6ut84ce.png',
                        'name' => '撒了快递费',
                        'width' => 400,
                        'height' => 600
                    ),
                    array(
                        'id' => '',
                        'create_time' => '',
                        'url' => 'http://img.gsxservice.com/6271_znvng0qo.png',
                        'name' => '撒了款到即发',
                        'width' => 479,
                        'height' => 640
                    ),
                    array(
                        'id' => '',
                        'create_time' => '',
                        'url' => 'http://img.gsxservice.com/13116_rh81m1o2.jpeg',
                        'name' => '撒了款到即发',
                        'width' => 852,
                        'height' => 1136
                    ),
                    array(
                        'id' => '',
                        'create_time' => '',
                        'url' => 'http://img.gsxservice.com/1251_scwyj6zr.jpeg',
                        'name' => '鲜花',
                        'width' => 480,
                        'height' => 640
                    ),
                    array(
                        'id' => '',
                        'create_time' => '',
                        'url' => 'http://img.gsxservice.com/29650_v8ag661z.jpeg',
                        'name' => '失联客机',
                        'width' => 768,
                        'height' => 1024
                    ),
                    array(
                        'id' => '',
                        'create_time' => '',
                        'url' => 'http://img.gsxservice.com/901_o6ut84ce.png',
                        'name' => '撒了快递费',
                        'width' => 400,
                        'height' => 600
                    ),
                    array(
                        'id' => '',
                        'create_time' => '',
                        'url' => 'http://img.gsxservice.com/6271_znvng0qo.png',
                        'name' => '撒了款到即发',
                        'width' => 479,
                        'height' => 640
                    ),
                    array(
                        'id' => '',
                        'create_time' => '',
                        'url' => 'http://img.gsxservice.com/13116_rh81m1o2.jpeg',
                        'name' => '撒了款到即发',
                        'width' => 852,
                        'height' => 1136
                    ),
                ), //照片
                "total_pay" => 10, //支付状态
                "succ_pay" => 5,  // 成功支付
                "verify_status" => 1 , //审核状态1审核通过 2审核被拒
                "location" => '北京 海淀 全部信息',
                'offline_poi' => array(
                    'lng' => '1.24354325',
                    'lat' => '2.34535435'
                ),
                "chaban_flag" => 2, //插班标识 1不可插班 2第n节课前可插班 3随时可插班
                "chaban_quota" => 0, //第n节课前可插班
                "chaban_price_flag" => 1, //插班价格标识 1未结束课程的总价 2自定义插班价
                "chaban_price" => 9.9,//插班价格
                "can_chaban" => true,//当前时间能否插班
                "realtime_price" => 1.1, //实时价格
                "realtime_course_len" => 3600, //剩余长度
                "is_full" => true,// 是否满班
                "arrangement" => "是短发就死定了看风景阿里上看到飞机"
            ),
        ),
        "teacher" => array( 'can_order' => false ),
    )
);

$video_tpl_data = array(
    "tpl_data" => array(
        'pager'=> array(
            'count' => 1000,
            'page' => 500 ,
            'page_size' => 10
        ),
        "video_course" => array(
            array(
                'number' => '15021142724',
                'portrait' => 'http://test-img.gsxservice.com/180937_24pwd8ob.jpeg',
                'title' => '机构老师-视频课',
                'introduce' => '机构老师机构老师机构老师机构老师',
                'price' => 200,
                'payers_count' => 0,
                'profit' => 0,
                'label_ids' => array(
                    '啥来的快放假',
                    'alsdkjf'
                ),
                'course_items_count' => 0, //课节数
                'language' => 5,
                'subjects' => array(
                    '体育',
                    '武术',
                    '跆拳道'
                ), // 科目
                'user_id' => '874171288',
                'name' => '徐梅山',
                'user_name' => '徐梅山',
                'section_id' => '1231231',

            ),
            array(
                'number' => '15021142724',
                'portrait' => 'http://test-img.gsxservice.com/180937_24pwd8ob.jpeg',
                'title' => '机构老师-视频课',
                'introduce' => '机构老师机构老师机构老师机构老师',
                'price' => 200,
                'payers_count' => 0,
                'profit' => 0,
                'label_ids' => array(
                    '啥来的快放假',
                    'alsdkjf'
                ),
                'course_items_count' => 0,
                'language' => 1,
                'subjects' => array(
                    '爱上了快递费'
                ), // 科目
                'user_id' => '874171288',
                'name' => '徐梅山',
                'user_name' => '徐梅山',
                'section_id' => '1231231'
            ),
            array(
                'number' => '15021142724',
                'portrait' => 'http://test-img.gsxservice.com/180937_24pwd8ob.jpeg',
                'title' => '机构老师-视频课',
                'introduce' => '机构老师机构老师机构老师机构老师',
                'price' => 200,
                'payers_count' => 0,
                'profit' => 0,
                'label_ids' => array(
                    '啥来的快放假',
                    'alsdkjf'
                ),
                'course_items_count' => 0,
                'language' => 3,
                'subjects' => array(
                    '爱上了快递费'
                ), // 科目
                'user_id' => '874171288',
                'name' => '徐梅山',
                'user_name' => '徐梅山',
                'section_id' => '1231231'
            ),
        ),
        "teacher" => array( 'can_order' => false ),
        "user_number" => '12312321'
    )
);

$course_type = $_GET['course_type'];

if ($course_type == 3) {
    $response = array(
        "code" => 0,
        "data" => array(
            "pager" => $offline_tpl_data['tpl_data']['pager'],
            "class_course" => $offline_tpl_data['tpl_data']['class_course'],
            "tpl" => array(
                "offline_course_list" => fetch('teacher/newDetail/offlineCourseList', array(
                    'tpl_data' => array(
                        'class_course' => $offline_tpl_data['tpl_data']['class_course'],
                        'pager' => $offline_tpl_data['tpl_data']['pager'],
                        'teacher' => $offline_tpl_data['tpl_data']['teacher']
                    )
                ))
            )

        )
    );
}

if ($course_type == 4) {
    $response = array(
        "code" => 0,
        "data" => array(
            "teacher" => array( 'can_order' => false ),
            "pager" => $video_tpl_data['tpl_data']['pager'],
            "comment_nav" => $video_tpl_data['tpl_data']['video_course'],
            "tpl" => array(
                "video_course_list" => fetch('teacher/newDetail/videoCourseList', array(
                    'tpl_data' => array(
                        'video_course' => $video_tpl_data['tpl_data']['video_course'],
                        'pager' => $video_tpl_data['tpl_data']['pager'],
                        'teacher' => $video_tpl_data['tpl_data']['teacher'],
                        'user_number' => $video_tpl_data['tpl_data']['user_number']
                    )
                ))
            )

        )
    );
}

if ($course_type == 2) {
    $response = array(
        "code" => 0,
        "data" => array(
            "teacher" => array( 'can_order' => false ),
            "pager" => $online_tpl_data['tpl_data']['pager'],
            "class_course" => $online_tpl_data['tpl_data']['class_course'],
            "tpl" => array(
                "online_course_list" => fetch('teacher/newDetail/onlineCourseList', array(
                    'tpl_data' => array(
                        'class_course' => $online_tpl_data['tpl_data']['class_course'],
                        'pager' => $online_tpl_data['tpl_data']['pager'],
                        'teacher' => $online_tpl_data['tpl_data']['teacher']
                    )
                ))
            )

        )
    );
}

echo json_encode($response);