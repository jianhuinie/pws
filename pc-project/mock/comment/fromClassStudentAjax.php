<?php

require("../bootstrap.php");

$tpl_data = array(
    "tpl_data" => array(
        "comment_nav" => array( 
            "score" => array(
                'total'=>10,
                'total_score'=>12,
                'thump_up' => 123, //新增字段 点赞数
                'desc_match'=>0.3,
                'service_attitude'=>7.3,
                'teach_result'=> 6.34,
                'face_type'=> array(
                    'lower'=> 12,
                    'middle' => 12,
                    'great' => 21
                )
            ),
            "comment_type" => 3,
            "face_type" => 1,
            "sort_by" => "display_order"
        ),
        "comment_overview" => array( 
            "score" => array(
                'total'=>10,
                'total_score'=>12,
                'score'=>4, //新增字段 表示总评分
                'thump_up' => 123, //新增字段 点赞数
                'desc_match'=>0.3,
                'service_attitude'=>7.3,
                'teach_result'=> 6.34,
                'face_type'=> array(
                    'lower'=> 12,
                    'middle' => 12,
                    'great' => 21
                )
            ),
            "comment_type" => 3,
            "face_type" => 1,
            "sort_by" => "display_order"
        ),
        'comment_list' => array(
            'total' => 110,
            'course_comment' => array(
                array(
                    'anonymous' => 0,
                    'total_score' => 5,
                    'user_number' => 1,
                    'id' => '4',
                    'purchase_id' => '114082832893440',
                    'user_id' => '27',
                    'user_number' => 1231231,
                    'teacher_user_id' => '10',
                    'desc_match' => '3',
                    'teach_result' => '3',
                    'service_attitude' => '3',
                    'del' => true,
                    'fr' => 2,
                    'face_type' => '2', //新增字段表示邀请评价
                    'display_name' => 'caoying',
                    'info' => '老师讲的太好了qweqwasd师讲的太好了asd师讲的太好了，老师讲的太好了阿斯蒂芬老师讲的太好撒旦fwe师讲的太好了，老师讲的太好了，老师讲的太好阿斯顿发老师讲的太好了阿斯顿发讲的太好了，老师讲的太阿斯蒂芬老师讲的太好了，',
                    'pid' => '0',
                    'create_time' => '2014-09-03 10:55:22',
                    'update_time' => '2014-09-03 10:55:22',
                    'lesson_way' => 'teacher',
                    'user_avatar' => 'http://img4.imgtn.bdimg.com/it/u=1171309943,4124341071&fm=21&gp=0.jpg',
                    'teacher_user_name' => '柯景腾',
                    'teacher_user_name_cut' => '柯景腾',
                    'private_domain' => '',
                    'user_name' => 'happyjlq',
                    'user_name_cut' => 'happyjlq',
                    'student_name' => '张小四',
                    'student_name_cut' => '张小四',
                    'course_id' => '573',
                    'course_name' => '小学二年级-语文',
                    'course_type' => 2,
                    'hours' => 4,
                    'thumb_up' => 10,
                    'thumb_flag' => 1,
                    'photo_list' => array(
                        array(
                            'user_id' => 123123, //学生id
                            'storage_id' => 12312, //前端用不到
                            'title' => '图片的标题1', //图片标题
                            'create_time' => 39994, //图片创建时间
                            'url' => 'http://img.gsxservice.com/27658_61zqh1ni.jpeg',//图片url
                            'width' => 1500,
                            'height' => 300
                        ),
                        array(
                            'user_id' => 123123, //学生id
                            'storage_id' => 12312, //前端用不到
                            'title' => '图片的标题2', //图片标题
                            'create_time' => 39994, //图片创建时间
                            'url' => 'http://img.gsxservice.com/1251_scwyj6zr.jpeg',//图片url
                            'width' => 480,
                            'height' => 640
                        ),
                        array(
                            'user_id' => 123123, //学生id
                            'storage_id' => 12312, //前端用不到
                            'title' => '图片的标题3', //图片标题
                            'create_time' => 39994, //图片创建时间
                            'url' => 'http://img.gsxservice.com/29650_v8ag661z.jpeg',//图片url
                            'width' => 768,
                            'height' => 1024
                        ),
                        array(
                            'user_id' => 123123, //学生id
                            'storage_id' => 12312, //前端用不到
                            'title' => '图片的标题4', //图片标题
                            'create_time' => 39994, //图片创建时间
                            'url' => 'http://img.gsxservice.com/27658_61zqh1ni.jpeg',//图片url
                            'width' => 300,
                            'height' => 150
                        ),
                        array(
                            'user_id' => 123123, //学生id
                            'storage_id' => 12312, //前端用不到
                            'title' => '图片的标题5', //图片标题
                            'create_time' => 39994, //图片创建时间
                            'url' => 'http://img.gsxservice.com/1251_scwyj6zr.jpeg',//图片url
                            'width' => 480,
                            'height' => 640
                        ),
                    )
                ),
                array(
                    'total_score' => 5,
                    'anonymous' => 0,
                    'id' => '4',
                    'purchase_id' => '114082832893440',
                    'user_id' => '27',
                    'user_number' => 123123,
                    'teacher_user_id' => '10',
                    'desc_match' => '3',
                    'teach_result' => '3',
                    'service_attitude' => '3',
                    'face_type' => '1',
                    'info' => '评论内容',
                    'pid' => '0',
                    'display_name' => 'caoying01',
                    'fr' => 2,
                    'create_time' => '2014-09-03 10:55:22',
                    'update_time' => '2014-09-03 10:55:22',
                    'lesson_way' => 'teacher',
                    'user_avatar' => 'http://img4.imgtn.bdimg.com/it/u=1171309943,4124341071&fm=21&gp=0.jpg',
                    'teacher_user_name' => '程丽娟要十二位的姓名是否截断',
                    'teacher_user_name_cut' => '程丽娟要十二...',
                    'private_domain' => '',
                    'user_name' => 'happyjlq',
                    'user_name_cut' => 'happyjlq',
                    'student_name' => 'happyjlq',
                    'student_name_cut' => 'happyjlq',
                    'course_id' => '573',
                    'course_name' => '小学二年级-语文',
                    'hours' => 4,
                    'thumb_up' => 10,
                    'thumb_flag' => 1,
                    'photo_list' => array(
                        array(
                            'user_id' => 123123, //学生id
                            'storage_id' => 12312, //前端用不到
                            'title' => '图片的标题1', //图片标题
                            'create_time' => 39994, //图片创建时间
                            'url' => 'http://img.gsxservice.com/27658_61zqh1ni.jpeg',//图片url
                            'width' => 300,
                            'height' => 150
                        ),
                        array(
                            'user_id' => 123123, //学生id
                            'storage_id' => 12312, //前端用不到
                            'title' => '图片的标题1', //图片标题
                            'create_time' => 39994, //图片创建时间
                            'url' => 'http://img.gsxservice.com/1251_scwyj6zr.jpeg',//图片url
                            'width' => 480,
                            'height' => 640
                        ),
                        array(
                            'user_id' => 123123, //学生id
                            'storage_id' => 12312, //前端用不到
                            'title' => '图片的标题1', //图片标题
                            'create_time' => 39994, //图片创建时间
                            'url' => 'http://img.gsxservice.com/29650_v8ag661z.jpeg',//图片url
                            'width' => 768,
                            'height' => 1024
                        )
                    )
                ),
                array(
                    'total_score' => 5,
                    'anonymous' => 0,
                    'id' => '4',
                    'purchase_id' => '114082832893440',
                    'user_id' => '27',
                    'user_number' => 123123,
                    'teacher_user_id' => '10',
                    'desc_match' => '3',
                    'teach_result' => '3',
                    'service_attitude' => '3',
                    'face_type' => '3',
                    'display_name' => 'caoying',
                    'fr' => 1,
                    'info' => '评论内容',
                    'pid' => '0',
                    'create_time' => '2014-09-03 10:55:22',
                    'update_time' => '2014-09-03 10:55:22',
                    'lesson_way' => 'teacher',
                    'user_avatar' => 'http://img4.imgtn.bdimg.com/it/u=1171309943,4124341071&fm=21&gp=0.jpg',
                    'teacher_user_name' => '程丽娟要十二位的姓名是否截断',
                    'teacher_user_name_cut' => '程丽娟要十二...',
                    'private_domain' => '',
                    'user_name' => 'happyjlq',
                    'user_name_cut' => 'happyjlq',
                    'student_name' => '张小四',
                    'student_name_cut' => '张小四',
                    'course_id' => '573',
                    'course_name' => '小学二年级-语文',
                    'hours' => 4,
                    'thumb_up' => 10,
                    'thumb_flag' => 1,
                    'photo_list' => array(
                        array(
                            'user_id' => 123123, //学生id
                            'storage_id' => 12312, //前端用不到
                            'title' => '图片的标题1', //图片标题
                            'create_time' => 39994, //图片创建时间
                            'url' => 'http://img.gsxservice.com/27658_61zqh1ni.jpeg',//图片url
                            'width' => 300,
                            'height' => 150
                        ),
                        array(
                            'user_id' => 123123, //学生id
                            'storage_id' => 12312, //前端用不到
                            'title' => '图片的标题1', //图片标题
                            'create_time' => 39994, //图片创建时间
                            'url' => 'http://img.gsxservice.com/1251_scwyj6zr.jpeg',//图片url
                            'width' => 480,
                            'height' => 640
                        ),
                        array(
                            'user_id' => 123123, //学生id
                            'storage_id' => 12312, //前端用不到
                            'title' => '图片的标题1', //图片标题
                            'create_time' => 39994, //图片创建时间
                            'url' => 'http://img.gsxservice.com/29650_v8ag661z.jpeg',//图片url
                            'width' => 768,
                            'height' => 1024
                        )
                    )
                ),
                array(
                    'total_score' => 5,
                    'anonymous' => 0,
                    'id' => '4',
                    'purchase_id' => '114082832893440',
                    'user_id' => '27',
                    'user_number' => 123131,
                    'teacher_user_id' => '10',
                    'desc_match' => '3',
                    'teach_result' => '3',
                    'service_attitude' => '3',
                    'face_type' => '1',
                    'info' => '评论内容',
                    'display_name' => 'caoying',
                    'fr' => 1,
                    'pid' => '0',
                    'create_time' => '2014-09-03 10:55:22',
                    'update_time' => '2014-09-03 10:55:22',
                    'lesson_way' => 'teacher',
                    'user_avatar' => 'http://img4.imgtn.bdimg.com/it/u=1171309943,4124341071&fm=21&gp=0.jpg',
                    'teacher_user_name' => '程丽娟要十二位的姓名是否截断',
                    'teacher_user_name_cut' => '程丽娟要十二...',
                    'private_domain' => '',
                    'user_name' => 'happyjlq',
                    'user_name_cut' => 'happyjlq',
                    'student_name' => '张小四',
                    'student_name_cut' => '张小四',
                    'course_id' => '573',
                    'course_name' => '小学二年级-语文',
                    'hours' => 4,
                    'thumb_up' => 10,
                    'thumb_flag' => 1,
                    'photo_list' => array(
                        array(
                            'user_id' => 123123, //学生id
                            'storage_id' => 12312, //前端用不到
                            'title' => '图片的标题1', //图片标题
                            'create_time' => 39994, //图片创建时间
                            'url' => 'http://img.gsxservice.com/27658_61zqh1ni.jpeg',//图片url
                            'width' => 300,
                            'height' => 150
                        ),
                        array(
                            'user_id' => 123123, //学生id
                            'storage_id' => 12312, //前端用不到
                            'title' => '图片的标题1', //图片标题
                            'create_time' => 39994, //图片创建时间
                            'url' => 'http://img.gsxservice.com/1251_scwyj6zr.jpeg',//图片url
                            'width' => 480,
                            'height' => 640
                        ),
                        array(
                            'user_id' => 123123, //学生id
                            'storage_id' => 12312, //前端用不到
                            'title' => '图片的标题1', //图片标题
                            'create_time' => 39994, //图片创建时间
                            'url' => 'http://img.gsxservice.com/29650_v8ag661z.jpeg',//图片url
                            'width' => 768,
                            'height' => 1024
                        )
                    )
                ),
                array(
                    'total_score' => 5,
                    'anonymous' => 0,
                    'id' => '4',
                    'purchase_id' => '114082832893440',
                    'user_id' => '27',
                    'user_number' => 12312,
                    'teacher_user_id' => '10',
                    'desc_match' => '3',
                    'teach_result' => '3',
                    'service_attitude' => '3',
                    'face_type' => '1',
                    'info' => '评论内容',
                    'fr' => 2,
                    'display_name' => 'zhangying04',
                    'pid' => '0',
                    'create_time' => '2014-09-03 10:55:22',
                    'update_time' => '2014-09-03 10:55:22',
                    'lesson_way' => 'teacher',
                    'user_avatar' => 'http://img4.imgtn.bdimg.com/it/u=1171309943,4124341071&fm=21&gp=0.jpg',
                    'teacher_user_name' => '程丽娟要十二位的姓名是否截断',
                    'teacher_user_name_cut' => '程丽娟要十二...',
                    'user_name' => 'happyjlq',
                    'user_name_cut' => 'happyjlq',
                    'student_name' => 'happyjlq',
                    'student_name_cut' => 'happyjlq',
                    'course_id' => '573',
                    'course_name' => '小学二年级-语文',
                    'hours' => 4,
                    'thumb_up' => 122,
                    'thumb_flag' => 2,
                    'photo_list' => array(
                        array(
                            'user_id' => 123123, //学生id
                            'storage_id' => 12312, //前端用不到
                            'title' => '图片的标题1', //图片标题
                            'create_time' => 39994, //图片创建时间
                            'url' => 'http://img.gsxservice.com/27658_61zqh1ni.jpeg',//图片url
                            'width' => 300,
                            'height' => 150
                        ),
                        array(
                            'user_id' => 123123, //学生id
                            'storage_id' => 12312, //前端用不到
                            'title' => '图片的标题1', //图片标题
                            'create_time' => 39994, //图片创建时间
                            'url' => 'http://img.gsxservice.com/1251_scwyj6zr.jpeg',//图片url
                            'width' => 480,
                            'height' => 640
                        ),
                        array(
                            'user_id' => 123123, //学生id
                            'storage_id' => 12312, //前端用不到
                            'title' => '图片的标题1', //图片标题
                            'create_time' => 39994, //图片创建时间
                            'url' => 'http://img.gsxservice.com/29650_v8ag661z.jpeg',//图片url
                            'width' => 768,
                            'height' => 1024
                        )
                    )
                )
            ),
            'related_comment' => array(
                array(
                    'total_score' => 5,
                    'anonymous' => 0,
                    'user_number' => 1,
                    'id' => '4',
                    'purchase_id' => '114082832893440',
                    'user_id' => '27',
                    'user_number' => 1231231,
                    'teacher_user_id' => '10',
                    'desc_match' => '3',
                    'teach_result' => '3',
                    'service_attitude' => '3',
                    'del' => true,
                    'fr' => 2,
                    'face_type' => '2', //新增字段表示邀请评价
                    'display_name' => 'caoying',
                    'info' => '老师讲的太好了qweqwasd师讲的太好了asd师讲的太好了，老师讲的太好了阿斯蒂芬老师讲的太好撒旦fwe师讲的太好了，老师讲的太好了，老师讲的太好阿斯顿发老师讲的太好了阿斯顿发讲的太好了，老师讲的太阿斯蒂芬老师讲的太好了，',
                    'pid' => '0',
                    'create_time' => '2014-09-03 10:55:22',
                    'update_time' => '2014-09-03 10:55:22',
                    'lesson_way' => 'teacher',
                    'user_avatar' => 'http://img4.imgtn.bdimg.com/it/u=1171309943,4124341071&fm=21&gp=0.jpg',
                    'teacher_user_name' => '柯景腾',
                    'teacher_user_name_cut' => '柯景腾',
                    'private_domain' => '',
                    'user_name' => 'happyjlq',
                    'user_name_cut' => 'happyjlq',
                    'student_name' => '张小四',
                    'student_name_cut' => '张小四',
                    'course_id' => '573',
                    'course_name' => '小学二年级-语文',
                    'course_type' => 2,
                    'hours' => 4,
                    'thumb_up' => 10,
                    'thumb_flag' => 1,
                    'photo_list' => array(
                        array(
                            'user_id' => 123123, //学生id
                            'storage_id' => 12312, //前端用不到
                            'title' => '图片的标题1', //图片标题
                            'create_time' => 39994, //图片创建时间
                            'url' => 'http://img.gsxservice.com/27658_61zqh1ni.jpeg',//图片url
                            'width' => 1500,
                            'height' => 300
                        ),
                        array(
                            'user_id' => 123123, //学生id
                            'storage_id' => 12312, //前端用不到
                            'title' => '图片的标题2', //图片标题
                            'create_time' => 39994, //图片创建时间
                            'url' => 'http://img.gsxservice.com/1251_scwyj6zr.jpeg',//图片url
                            'width' => 480,
                            'height' => 640
                        ),
                        array(
                            'user_id' => 123123, //学生id
                            'storage_id' => 12312, //前端用不到
                            'title' => '图片的标题3', //图片标题
                            'create_time' => 39994, //图片创建时间
                            'url' => 'http://img.gsxservice.com/29650_v8ag661z.jpeg',//图片url
                            'width' => 768,
                            'height' => 1024
                        ),
                        array(
                            'user_id' => 123123, //学生id
                            'storage_id' => 12312, //前端用不到
                            'title' => '图片的标题4', //图片标题
                            'create_time' => 39994, //图片创建时间
                            'url' => 'http://img.gsxservice.com/27658_61zqh1ni.jpeg',//图片url
                            'width' => 300,
                            'height' => 150
                        ),
                        array(
                            'user_id' => 123123, //学生id
                            'storage_id' => 12312, //前端用不到
                            'title' => '图片的标题5', //图片标题
                            'create_time' => 39994, //图片创建时间
                            'url' => 'http://img.gsxservice.com/1251_scwyj6zr.jpeg',//图片url
                            'width' => 480,
                            'height' => 640
                        ),
                    )
                ),
                array(
                    'total_score' => 5,
                    'anonymous' => 0,
                    'id' => '4',
                    'purchase_id' => '114082832893440',
                    'user_id' => '27',
                    'user_number' => 1231231,
                    'teacher_user_id' => '10',
                    'desc_match' => '3',
                    'teach_result' => '3',
                    'service_attitude' => '3',
                    'face_type' => '1',
                    'info' => '评论内容',
                    'pid' => '0',
                    'fr' => 2,
                    'display_name' => 'zhangying',
                    'create_time' => '2014-09-03 10:55:22',
                    'update_time' => '2014-09-03 10:55:22',
                    'lesson_way' => 'teacher',
                    'user_avatar' => 'http://img4.imgtn.bdimg.com/it/u=1171309943,4124341071&fm=21&gp=0.jpg',
                    'teacher_user_name' => '程丽娟要十二位的姓名是否截断',
                    'teacher_user_name_cut' => '程丽娟要十二...',
                    'user_name' => 'happyjlq',
                    'user_name_cut' => 'happyjlq',
                    'student_name' => 'happyjlq',
                    'student_name_cut' => 'happyjlq',
                    'course_id' => '573',
                    'course_name' => '小学二年级-语文',
                    'hours' => 4,
                    'thumb_up' => 10,
                    'thumb_flag' => 1,
                    'photo_list' => array(
                        array(
                            'user_id' => 123123, //学生id
                            'storage_id' => 12312, //前端用不到
                            'title' => '图片的标题1', //图片标题
                            'create_time' => 39994, //图片创建时间
                            'url' => 'http://img.gsxservice.com/27658_61zqh1ni.jpeg',//图片url
                            'width' => 300,
                            'height' => 150
                        ),
                        array(
                            'user_id' => 123123, //学生id
                            'storage_id' => 12312, //前端用不到
                            'title' => '图片的标题1', //图片标题
                            'create_time' => 39994, //图片创建时间
                            'url' => 'http://img.gsxservice.com/1251_scwyj6zr.jpeg',//图片url
                            'width' => 480,
                            'height' => 640
                        ),
                        array(
                            'user_id' => 123123, //学生id
                            'storage_id' => 12312, //前端用不到
                            'title' => '图片的标题1', //图片标题
                            'create_time' => 39994, //图片创建时间
                            'url' => 'http://img.gsxservice.com/29650_v8ag661z.jpeg',//图片url
                            'width' => 768,
                            'height' => 1024
                        )
                    )
                ),
                array(
                    'total_score' => 5,
                    'anonymous' => 0,
                    'id' => '4',
                    'purchase_id' => '114082832893440',
                    'user_id' => '27',
                    'user_number' => 1231231,
                    'teacher_user_id' => '10',
                    'desc_match' => '3',
                    'teach_result' => '3',
                    'service_attitude' => '3',
                    'face_type' => '3',
                    'info' => '评论内容',
                    'fr' => 2,
                    'display_name' => 'zhangying02',
                    'pid' => '0',
                    'create_time' => '2014-09-03 10:55:22',
                    'update_time' => '2014-09-03 10:55:22',
                    'lesson_way' => 'teacher',
                    'user_avatar' => 'http://img4.imgtn.bdimg.com/it/u=1171309943,4124341071&fm=21&gp=0.jpg',
                    'teacher_user_name' => '程丽娟要十二位的姓名是否截断',
                    'teacher_user_name_cut' => '程丽娟要十二...',
                    'user_name' => 'happyjlq',
                    'user_name_cut' => 'happyjlq',
                    'student_name' => '张小四',
                    'student_name_cut' => '张小四',
                    'course_id' => '573',
                    'course_name' => '小学二年级-语文',
                    'hours' => 4,
                    'thumb_up' => 10,
                    'thumb_flag' => 1,
                    'photo_list' => array(
                        array(
                            'user_id' => 123123, //学生id
                            'storage_id' => 12312, //前端用不到
                            'title' => '图片的标题1', //图片标题
                            'create_time' => 39994, //图片创建时间
                            'url' => 'http://img.gsxservice.com/27658_61zqh1ni.jpeg',//图片url
                            'width' => 300,
                            'height' => 150
                        ),
                        array(
                            'user_id' => 123123, //学生id
                            'storage_id' => 12312, //前端用不到
                            'title' => '图片的标题1', //图片标题
                            'create_time' => 39994, //图片创建时间
                            'url' => 'http://img.gsxservice.com/1251_scwyj6zr.jpeg',//图片url
                            'width' => 480,
                            'height' => 640
                        ),
                        array(
                            'user_id' => 123123, //学生id
                            'storage_id' => 12312, //前端用不到
                            'title' => '图片的标题1', //图片标题
                            'create_time' => 39994, //图片创建时间
                            'url' => 'http://img.gsxservice.com/29650_v8ag661z.jpeg',//图片url
                            'width' => 768,
                            'height' => 1024
                        )
                    )
                ),
                array(
                    'total_score' => 5,
                    'anonymous' => 0,
                    'id' => '4',
                    'purchase_id' => '114082832893440',
                    'user_id' => '27',
                    'user_number' => 123123,
                    'teacher_user_id' => '10',
                    'desc_match' => '3',
                    'teach_result' => '3',
                    'service_attitude' => '3',
                    'face_type' => '1',
                    'info' => '评论内容',
                    'fr' => 2,
                    'display_name' => 'zhangying03',
                    'pid' => '0',
                    'create_time' => '2014-09-03 10:55:22',
                    'update_time' => '2014-09-03 10:55:22',
                    'lesson_way' => 'teacher',
                    'user_avatar' => 'http://img4.imgtn.bdimg.com/it/u=1171309943,4124341071&fm=21&gp=0.jpg',
                    'teacher_user_name' => '程丽娟要十二位的姓名是否截断',
                    'teacher_user_name_cut' => '程丽娟要十二...',
                    'user_name' => 'happyjlq',
                    'user_name_cut' => 'happyjlq',
                    'student_name' => '张小四',
                    'student_name_cut' => '张小四',
                    'course_id' => '573',
                    'course_name' => '小学二年级-语文',
                    'hours' => 4,
                    'thumb_up' => 10,
                    'thumb_flag' => 1,
                    'photo_list' => array(
                        array(
                            'user_id' => 123123, //学生id
                            'storage_id' => 12312, //前端用不到
                            'title' => '图片的标题1', //图片标题
                            'create_time' => 39994, //图片创建时间
                            'url' => 'http://img.gsxservice.com/27658_61zqh1ni.jpeg',//图片url
                            'width' => 300,
                            'height' => 150
                        ),
                        array(
                            'user_id' => 123123, //学生id
                            'storage_id' => 12312, //前端用不到
                            'title' => '图片的标题1', //图片标题
                            'create_time' => 39994, //图片创建时间
                            'url' => 'http://img.gsxservice.com/1251_scwyj6zr.jpeg',//图片url
                            'width' => 480,
                            'height' => 640
                        ),
                        array(
                            'user_id' => 123123, //学生id
                            'storage_id' => 12312, //前端用不到
                            'title' => '图片的标题1', //图片标题
                            'create_time' => 39994, //图片创建时间
                            'url' => 'http://img.gsxservice.com/29650_v8ag661z.jpeg',//图片url
                            'width' => 768,
                            'height' => 1024
                        )
                    )
                ),
                array(
                    'total_score' => 5,
                    'anonymous' => 0,
                    'id' => '4',
                    'purchase_id' => '114082832893440',
                    'user_id' => '27',
                    'user_number' => 12312,
                    'teacher_user_id' => '10',
                    'desc_match' => '3',
                    'teach_result' => '3',
                    'service_attitude' => '3',
                    'face_type' => '1',
                    'info' => '评论内容',
                    'fr' => 2,
                    'display_name' => 'zhangying04',
                    'pid' => '0',
                    'create_time' => '2014-09-03 10:55:22',
                    'update_time' => '2014-09-03 10:55:22',
                    'lesson_way' => 'teacher',
                    'user_avatar' => 'http://img4.imgtn.bdimg.com/it/u=1171309943,4124341071&fm=21&gp=0.jpg',
                    'teacher_user_name' => '程丽娟要十二位的姓名是否截断',
                    'teacher_user_name_cut' => '程丽娟要十二...',
                    'user_name' => 'happyjlq',
                    'user_name_cut' => 'happyjlq',
                    'student_name' => 'happyjlq',
                    'student_name_cut' => 'happyjlq',
                    'course_id' => '573',
                    'course_name' => '小学二年级-语文',
                    'hours' => 4,
                    'thumb_up' => 122,
                    'thumb_flag' => 2,
                    'photo_list' => array(
                        array(
                            'user_id' => 123123, //学生id
                            'storage_id' => 12312, //前端用不到
                            'title' => '图片的标题1', //图片标题
                            'create_time' => 39994, //图片创建时间
                            'url' => 'http://img.gsxservice.com/27658_61zqh1ni.jpeg',//图片url
                            'width' => 300,
                            'height' => 150
                        ),
                        array(
                            'user_id' => 123123, //学生id
                            'storage_id' => 12312, //前端用不到
                            'title' => '图片的标题1', //图片标题
                            'create_time' => 39994, //图片创建时间
                            'url' => 'http://img.gsxservice.com/1251_scwyj6zr.jpeg',//图片url
                            'width' => 480,
                            'height' => 640
                        ),
                        array(
                            'user_id' => 123123, //学生id
                            'storage_id' => 12312, //前端用不到
                            'title' => '图片的标题1', //图片标题
                            'create_time' => 39994, //图片创建时间
                            'url' => 'http://img.gsxservice.com/29650_v8ag661z.jpeg',//图片url
                            'width' => 768,
                            'height' => 1024
                        )
                    )
                )
            ),
            "pager" => array(
                'count' => 110,
                'page' => 1 ,
                'page_size' => 10
            ),
            "course_comment_count" => 0,
            "is_last_page" => true ,
            "view_all_url" => "http://www.baidu.com"
        )
    )
);

$response = array(
    "code" => 0,
    "data" => array(
        "teacher_number" => "814062418",
        "comment_list" => $tpl_data['tpl_data']['comment_list'],
        "comment_nav" => $tpl_data['tpl_data']['comment_nav'],
        "comment_overview" => $tpl_data['tpl_data']['comment_overview'],
        "tpl" => array(
            "comment_overview" => fetch('classCourse/common/commentOverview', array(
                'tpl_data' => $tpl_data['tpl_data']
        
            )),
            "comment_nav" => fetch('classCourse/common/commentNav', array(
                'tpl_data' => $tpl_data['tpl_data']
                
            )),
            "comment_list" => fetch('classCourse/common/commentList', array(
                'tpl_data' => $tpl_data['tpl_data']

            ))
        )

    )
);

echo json_encode($response);
