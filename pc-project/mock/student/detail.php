<?php


require("../bootstrap.php");


render(
    "student/detail",
    array(
        "tpl_data" => array(
            "face_type" => 2, //新增字段,
            "score" => array(
                'face_type'=> array(
                    'lower'=> 12,
                    'middle' => 12,
                    'great' => 21
                ),
                'comment_type'=> array(
                    'all' => 30,
                    'order' => 20,
                    'invite' => 10,
                    'class_group' => 11
                )
            ),
            'pager'=>array(
                'count' => 10000,
                'page' => 500 ,
                'page_size' => 10
            ),
            "profile" => array(
                'uid'=>'12312312',
                'number' => 48732517,
                'avatar_url'=> 'http://www.popoho.com/uploads/allimg/120703/12525SF0-57.jpg',  //学生头像
                'user_name'=> '学生A啦啦啦啦', // 学生名字，废弃
                'user_name_cut'=> '学生A...',  // 学生名字截断，废弃
                'display_name' => '学生A啦啦啦啦',
                'favorable_rate'=> '98', // 好评率
                'face_type'=> array(
                    'lower'=> 0,    // 差评
                    'middle' => 1,  // 中评
                    'great' => 0   // 好评
                )
            ),
            "comment" => array(
                array(
                    'id' => '4',
                    'purchase_id' => '114082832893440',
                    'user_id' => '27',
                    'user_number' => '21313232',
                    'teacher_user_number' => '23232310',
                    'teacher_user_id' => '10',
                    'desc_match' => '3',
                    'teach_result' => '3',
                    'service_attitude' => '3',
                    'face_type' => '2',
                    'info' => '老师讲的太好了asd132师讲的太好了asd师讲的太好了，老师讲的太好了阿斯蒂芬老师讲的太好撒旦fwe师讲的太好了，老师讲的太好了，老师讲的太好阿斯顿发老师讲的太好了阿斯顿发讲的太好了，老师讲的太阿斯蒂芬老师讲的太好了，',
                    'pid' => '0',
                    'create_time' => '2014-09-03 10:55:22',
                    'update_time' => '2014-09-03 10:55:22',
                    'lesson_way' => 'teacher',
                    'teacher_user_name' => '程丽娟要十二位的姓名是否截断',
                    'teacher_user_name_cut' => '程丽娟要十二...',
                    'user_name' => 'happyjlq',
                    'user_name_cut' => 'happyjlq',
                    'course_id' => '573',
                    'course_name' => '小学二年级-语文',
                    'private_domain' => '/t/434535'
                ),
                array(
                    'id' => '4',
                    'purchase_id' => '114082832893440',
                    'user_id' => '27',
                    'user_number' => '21313232',
                    'teacher_user_number' => '23232310',
                    'teacher_user_id' => '10',
                    'desc_match' => '3',
                    'teach_result' => '3',
                    'service_attitude' => '3',
                    'face_type' => '1',
                    'info' => '评论内容',
                    'pid' => '0',
                    'create_time' => '2014-09-03 10:55:22',
                    'update_time' => '2014-09-03 10:55:22',
                    'lesson_way' => 'teacher',
                    'teacher_user_name' => '程丽娟要十二位的姓名是否截断',
                    'teacher_user_name_cut' => '程丽娟要十二...',
                    'user_name' => 'happyjlq',
                    'user_name_cut' => 'happyjlq',
                    'course_id' => '573',
                    'course_name' => '小学二年级-语文',
                    'private_domain' => '/t/434535'
                ),
                array(
                    'id' => '4',
                    'purchase_id' => '114082832893440',
                    'user_id' => '27',
                    'user_number' => '21313232',
                    'teacher_user_number' => '23232310',
                    'teacher_user_id' => '10',
                    'desc_match' => '3',
                    'teach_result' => '3',
                    'service_attitude' => '3',
                    'face_type' => '3',
                    'info' => '评论内容',
                    'pid' => '0',
                    'create_time' => '2014-09-03 10:55:22',
                    'update_time' => '2014-09-03 10:55:22',
                    'lesson_way' => 'teacher',
                    'teacher_user_name' => '程丽娟要十二位的姓名是否截断',
                    'teacher_user_name_cut' => '程丽娟要十二...',
                    'user_name' => 'happyjlq',
                    'user_name_cut' => 'happyjlq',
                    'course_id' => '573',
                    'course_name' => '小学二年级-语文',
                    'private_domain' => '/t/434535'
                ),
                array(
                    'id' => '4',
                    'purchase_id' => '114082832893440',
                    'user_id' => '27',
                    'user_number' => '21313232',
                    'teacher_user_number' => '23232310',
                    'teacher_user_id' => '10',
                    'desc_match' => '3',
                    'teach_result' => '3',
                    'service_attitude' => '3',
                    'face_type' => '1',
                    'info' => '评论内容',
                    'pid' => '0',
                    'create_time' => '2014-09-03 10:55:22',
                    'update_time' => '2014-09-03 10:55:22',
                    'lesson_way' => 'teacher',
                    'teacher_user_name' => '程丽娟要十二位的姓名是否截断',
                    'teacher_user_name_cut' => '程丽娟要十二...',
                    'user_name' => 'happyjlq',
                    'user_name_cut' => 'happyjlq',
                    'course_id' => '573',
                    'course_name' => '小学二年级-语文',
                    'private_domain' => '/t/434535'
                ),
                array(
                    'id' => '4',
                    'purchase_id' => '114082832893440',
                    'user_id' => '27',
                    'user_number' => '21313232',
                    'teacher_user_number' => '23232310',
                    'teacher_user_id' => '10',
                    'desc_match' => '3',
                    'teach_result' => '3',
                    'service_attitude' => '3',
                    'face_type' => '1',
                    'info' => '评论内容',
                    'pid' => '0',
                    'create_time' => '2014-09-03 10:55:22',
                    'update_time' => '2014-09-03 10:55:22',
                    'lesson_way' => 'teacher',
                    'teacher_user_name' => '程丽娟要十二位的姓名是否截断',
                    'teacher_user_name_cut' => '程丽娟要十二...',
                    'user_name' => 'happyjlq',
                    'user_name_cut' => 'happyjlq',
                    'course_id' => '573',
                    'course_name' => '小学二年级-语文',
                    'private_domain' => '/t/434535'
                )
            )
        )
    )
);

