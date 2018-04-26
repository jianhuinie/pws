<?php

require("../bootstrap.php");


$array = array(
    'total_page' => '2',
    'page_content' => array(
                    array(
                        'grade' => '高一', //年级
                        'lijibaoming' => 1,
                        'avatar' => 'http://img.gsxservice.com/2053667_m7bwtrnv.jpg',
                        'title' => '11ajaxbreak_through家长和“准高三生”都该如何更好的度过暑假',
                        'intro' => 'high学习上除了要对一年以来学习和复习的时间要统筹安排以外，还要合理的安排每日时间，最大效率得提高复习效率。如何合理制定的每日学习计划安排，考生可以参考进行。high学习上除了要对一年以来学习和复习的时间要统筹安排以外，还要合理的安排每日时间，最大效率得提高复习效率。如何合理制定的每日学习计划安排，考生可以参考进行。high学习上除了要对一年以来学习和复习的时间要统筹安排以外，还要合理的安排每日时间，最大效率得提高复习效率。如何合理制定的每日学习计划安排，考生可以参考进行。',
                        'main_teacher' => '大河', //主讲老师
                        'url' => 'http://www.genshuixue.com/teacher/classCourseDetail?number=150616748050'
                        ),
                    array(
                        'grade' => '主主主', //年级
                        'lijibaoming' => 0,
                        'avatar' => 'http://img.gsxservice.com/2053667_m7bwtrnv.jpg',
                        'title' => '33311ajaxk_through2middlemiddle家长和“准高三生”都该如何更好的度过暑假',
                        'main_teacher' => '大河', //主讲老师
                        'url' => 'http://www.genshuixue.com/teacher/classCourseDetail?number=150616748050'
                        )
                 )

    );

if ($_GET){

    $jj = json_encode($array, true);

    echo $jj;

    return;
}




render(
    "activity/running",
    array(
        "tpl_data" => array(
            'title' => '一键抢生源',
            'description' => '一键抢生源',
            'keywords' => '一键抢生源, 跟谁学',
            'class_info' => array(
                // 高中tab
                'high' => array(
                    array(
                        'date' => '8月16日',
                        'time' => '20：00-21：00',
                        'grade' => '高一', //年级
                        'lijibaoming' => 1,
                        'avatar' => 'http://img.gsxservice.com/2053667_m7bwtrnv.jpg',
                        'title' => '11high家长和“准高三生”都该如何更好的度过暑假',
                        'intro' => 'high学习上除了要对一年以来学习和复习的时间要统筹安排以外，还要合理的安排每日时间，最大效率得提高复习效率。如何合理制定的每日学习计划安排，考生可以参考进行。high学习上除了要对一年以来学习和复习的时间要统筹安排以外，还要合理的安排每日时间，最大效率得提高复习效率。如何合理制定的每日学习计划安排，考生可以参考进行。high学习上除了要对一年以来学习和复习的时间要统筹安排以外，还要合理的安排每日时间，最大效率得提高复习效率。如何合理制定的每日学习计划安排，考生可以参考进行。',
                        'main_teacher' => '大河', //主讲老师
                        'url' => 'http://www.genshuixue.com/teacher/classCourseDetail?number=150616748050'
                        ),
                    array(
                        'date' => '8月16日',
                        'time' => '20：00-21：00',
                        'grade' => '是是要', //年级
                        'avatar' => 'http://img.gsxservice.com/2053667_m7bwtrnv.jpg',
                        'title' => '2222high家长和“准高三生”都该如何更好的度过暑假',
                        'intro' => '学习上除了要对一年以来学习和复习的时间要统筹安排以外，还要合理的安排每日时间，最大效率得提高复习效率。如何合理制定的每日学习计划安排，考生可以参考进行。',
                        'main_teacher' => '大河', //主讲老师
                        'url' => 'http://www.genshuixue.com/teacher/classCourseDetail?number=150616748050'
                        ),
                    array(
                        'date' => '8月16日',
                        'time' => '20：00-21：00',
                        'grade' => '是是要', //年级
                        'avatar' => 'http://img.gsxservice.com/2053667_m7bwtrnv.jpg',
                        'title' => '2222high家长和“准高三生”都该如何更好的度过暑假',
                        'intro' => '学习上除了要对一年以来学习和复习的时间要统筹安排以外，还要合理的安排每日时间，最大效率得提高复习效率。如何合理制定的每日学习计划安排，考生可以参考进行。',
                        'main_teacher' => '大河', //主讲老师
                        'url' => 'http://www.genshuixue.com/teacher/classCourseDetail?number=150616748050'
                        ),
                    array(
                        'date' => '8月16日',
                        'time' => '20：00-21：00',
                        'grade' => '高一', //年级
                        'avatar' => 'http://img.gsxservice.com/2053667_m7bwtrnv.jpg',
                        'title' => '2222high家长和“准高三生”都该如何更好的度过暑假',
                        'intro' => '学习上除了要对一年以来学习和复习的时间要统筹安排以外，还要合理的安排每日时间，最大效率得提高复习效率。如何合理制定的每日学习计划安排，考生可以参考进行。',
                        'main_teacher' => '大河', //主讲老师
                        'url' => 'http://www.genshuixue.com/teacher/classCourseDetail?number=150616748050'
                        ),
                    array(
                        'date' => '8月16日',
                        'time' => '20：00-21：00',
                        'grade' => '高一', //年级
                        'avatar' => 'http://img.gsxservice.com/2053667_m7bwtrnv.jpg',
                        'title' => '5555high家长和“准高三生”都该如何更好的度过暑假',
                        'intro' => '学习上除了要对一年以来学习和复习的时间要统筹安排以外，还要合理的安排每日时间，最大效率得提高复习效率。如何合理制定的每日学习计划安排，考生可以参考进行。',
                        'main_teacher' => '大河', //主讲老师
                        'url' => 'http://www.genshuixue.com/teacher/classCourseDetail?number=150616748050'
                        ),
                    array(
                        'date' => '8月16日',
                        'time' => '20：00-21：00',
                        'grade' => '高一', //年级
                        'avatar' => 'http://img.gsxservice.com/2053667_m7bwtrnv.jpg',
                        'title' => '666high家长和“准高三生”都该如何更好的度过暑假',
                        'intro' => '学习上除了要对一年以来学习和复习的时间要统筹安排以外，还要合理的安排每日时间，最大效率得提高复习效率。如何合理制定的每日学习计划安排，考生可以参考进行。',
                        'main_teacher' => '大河', //主讲老师
                        'url' => 'http://www.genshuixue.com/teacher/classCourseDetail?number=150616748050'
                        )
                 ),
                // 中小tab
                'middle' => array(
                    array(
                        'date' => '8月16日',
                        'time' => '20：00-21：00',
                        'grade' => '高一', //年级
                        'avatar' => 'http://img.gsxservice.com/2053667_m7bwtrnv.jpg',
                        'title' => '11middle家长和“准高三生”都该如何更好的度过暑假',
                        'intro' => 'high学习上除了要对一年以来学习和复习的时间要统筹安排以外，还要合理的安排每日时间，最大效率得提高复习效率。如何合理制定的每日学习计划安排，考生可以参考进行。',
                        'main_teacher' => '大河', //主讲老师
                        'url' => 'http://www.genshuixue.com/teacher/classCourseDetail?number=150616748050'
                        ),
                    array(
                        'date' => '8月16日',
                        'time' => '20：00-21：00',
                        'grade' => '高一', //年级
                        'avatar' => 'http://img.gsxservice.com/2053667_m7bwtrnv.jpg',
                        'title' => '2222middlemiddle家长和“准高三生”都该如何更好的度过暑假',
                        'intro' => '学习上除了要对一年以来学习和复习的时间要统筹安排以外，还要合理的安排每日时间，最大效率得提高复习效率。如何合理制定的每日学习计划安排，考生可以参考进行。',
                        'main_teacher' => '大河', //主讲老师
                        'url' => 'http://www.genshuixue.com/teacher/classCourseDetail?number=150616748050'
                        )
                 )
                ),
            'news_info' => array(
                array(
                    'title' => '深圳小学生失踪9天 猜猜在哪里找到他？',
                    'link'  => 'http://www.genshuixue.com/article/detail/15081099786'
                    ),
                array(
                    'title' => '深圳小学生失踪9天 猜猜在哪里找到他？',
                    'link'  => 'http://www.genshuixue.com/article/detail/15081099786'
                    ),
                array(
                    'title' => '深圳小学生失踪9天 猜猜在哪里找到他？',
                    'link'  => 'http://www.genshuixue.com/article/detail/15081099786'
                    ),
                array(
                    'title' => '深圳小学生失踪9天 猜猜在哪里找到他？',
                    'link'  => 'http://www.genshuixue.com/article/detail/15081099786'
                    ),
                array(
                    'title' => '深圳小学生失踪9天 猜猜在哪里找到他？',
                    'link'  => 'http://www.genshuixue.com/article/detail/15081099786'
                    ),
                array(
                    'title' => '深圳小学生失踪9天 猜猜在哪里找到他？',
                    'link'  => 'http://www.genshuixue.com/article/detail/15081099786'
                    ),
                array(
                    'title' => '深圳小学生失踪9天 猜猜在哪里找到他？',
                    'link'  => 'http://www.genshuixue.com/article/detail/15081099786'
                    )

                ),
            'break_through' => array(
                // 总数
                'total_page' => '2',
                'page_head' => array(
                    array(
                        'type'=>'shuxue',
                        'name'=>'数学'
                        ),
                    array(
                        'type'=>'yuwen',
                        'name'=>'语文'
                        ),
                    array(
                        'type'=>'yingyu',
                        'name'=>'英语'
                        ),
                    array(
                        'type'=>'wenzong',
                        'name'=>'文科综合'
                        ),
                    array(
                        'type'=>'lizong',
                        'name'=>'理科综合'
                        ),
                    array(
                        'type'=>'xuexifangfa',
                        'name'=>'学习方法'
                        ),
                    array(
                        'type'=>'shenghuozhidao',
                        'name'=>'生活指导'
                        )
                     ),
                // 数学tab
                'page_content' => array(
                    array(
                        'grade' => '高一', //年级
                        'lijibaoming' => 0,
                        'avatar' => 'http://img.gsxservice.com/2053667_m7bwtrnv.jpg',
                        'title' => '1break_through家长和',
                        'main_teacher' => '大河', //主讲老师
                        'url' => '7f1e2db0fe'
                        ),
                    array(
                        'grade' => '高一', //年级
                        'lijibaoming' => 0,
                        'avatar' => 'http://img.gsxservice.com/2053667_m7bwtrnv.jpg',
                        'title' => '2break_throughh家长和“准高三生”都该如何更好的度过暑假',
                        'main_teacher' => '大河', //主讲老师
                        'url' => 'http://www.genshuixue.com/teacher/classCourseDetail?number=150616748050'
                        ),
                    array(
                        'grade' => '高一', //年级
                        'lijibaoming' => 1,
                        'avatar' => 'http://img.gsxservice.com/2053667_m7bwtrnv.jpg',
                        'title' => '2222high家长和“准高三生”都该如何更好的度过暑假',
                        'main_teacher' => '大河', //主讲老师
                        'url' => 'http://www.genshuixue.com/teacher/classCourseDetail?number=150616748050'
                        ),
                    array(
                        'grade' => '高一', //年级
                        'lijibaoming' => 1,
                        'avatar' => 'http://img.gsxservice.com/2053667_m7bwtrnv.jpg',
                        'title' => '2222high家长和“准高三生”都该如何更好的度过暑假',
                        'main_teacher' => '大河', //主讲老师
                        'url' => 'http://www.genshuixue.com/teacher/classCourseDetail?number=150616748050'
                        ),
                    array(
                        'grade' => '高一', //年级
                        'lijibaoming' => 1,
                        'avatar' => 'http://img.gsxservice.com/2053667_m7bwtrnv.jpg',
                        'title' => '55break_throughh家长和“准高三生”都该如何更好的度过暑假',
                        'main_teacher' => '大河', //主讲老师
                        'url' => 'http://www.genshuixue.com/teacher/classCourseDetail?number=150616748050'
                        ),
                    array(
                        'grade' => '高一', //年级
                        'lijibaoming' => 1,
                        'avatar' => 'http://img.gsxservice.com/2053667_m7bwtrnv.jpg',
                        'title' => '66break_throughgh家长和“准高三生”都该如何更好的度过暑假',
                        'main_teacher' => '大河', //主讲老师
                        'url' => 'http://www.genshuixue.com/teacher/classCourseDetail?number=150616748050'
                        ),
                    array(
                        'grade' => '高一', //年级
                        'lijibaoming' => 1,
                        'avatar' => 'http://img.gsxservice.com/2053667_m7bwtrnv.jpg',
                        'title' => '677break_throughgh家长和“准高三生”都该如何更好的度过暑假',
                        'main_teacher' => '大河', //主讲老师
                        'url' => 'http://www.genshuixue.com/teacher/classCourseDetail?number=150616748050'
                        ),
                    array(
                        'grade' => '高一', //年级
                        'lijibaoming' => 1,
                        'avatar' => 'http://img.gsxservice.com/2053667_m7bwtrnv.jpg',
                        'title' => '88break_throughgh家长和“准高三生”都该如何更好的度过暑假',
                        'main_teacher' => '大河', //主讲老师
                        'url' => 'http://www.genshuixue.com/teacher/classCourseDetail?number=150616748050'
                        )
                 ),
                // 语文tab
                'middle' => array(
                    array(
                        'grade' => '是是要', //年级
                        'lijibaoming' => 1,
                        'avatar' => 'http://img.gsxservice.com/2053667_m7bwtrnv.jpg',
                        'title' => '11middlebreak_through家长和“准高三生”都该如何更好的度过暑假',
                        'intro' => 'high学习上除了要对一年以来学习和复习的时间要统筹安排以外，还要合理的安排每日时间，最大效率得提高复习效率。如何合理制定的每日学习计划安排，考生可以参考进行。',
                        'main_teacher' => '大河', //主讲老师
                        'url' => 'http://www.genshuixue.com/teacher/classCourseDetail?number=150616748050'
                        ),
                    array(
                        'grade' => '高一', //年级
                        'lijibaoming' => 1,
                        'avatar' => 'http://img.gsxservice.com/2053667_m7bwtrnv.jpg',
                        'title' => '222break_through2middlemiddle家长和“准高三生”都该如何更好的度过暑假',
                        'main_teacher' => '大河', //主讲老师
                        'url' => 'http://www.genshuixue.com/teacher/classCourseDetail?number=150616748050'
                        )
                 ),array(
                    array(
                        'grade' => '高一', //年级
                        'lijibaoming' => 1,
                        'avatar' => 'http://img.gsxservice.com/2053667_m7bwtrnv.jpg',
                        'title' => '11middlebreak_through家长和“准高三生”都该如何更好的度过暑假',
                        'intro' => 'high学习上除了要对一年以来学习和复习的时间要统筹安排以外，还要合理的安排每日时间，最大效率得提高复习效率。如何合理制定的每日学习计划安排，考生可以参考进行。',
                        'main_teacher' => '大河', //主讲老师
                        'url' => 'http://www.genshuixue.com/teacher/classCourseDetail?number=150616748050'
                        ),
                    array(
                        'grade' => '高一', //年级
                        'lijibaoming' => 1,
                        'avatar' => 'http://img.gsxservice.com/2053667_m7bwtrnv.jpg',
                        'title' => '222break_through2middlemiddle家长和“准高三生”都该如何更好的度过暑假',
                        'main_teacher' => '大河', //主讲老师
                        'url' => 'http://www.genshuixue.com/teacher/classCourseDetail?number=150616748050'
                        )
                 ),array(
                    array(
                        'grade' => '高一', //年级
                        'lijibaoming' => 1,
                        'avatar' => 'http://img.gsxservice.com/2053667_m7bwtrnv.jpg',
                        'title' => '11middlebreak_through家长和“准高三生”都该如何更好的度过暑假',
                        'intro' => 'high学习上除了要对一年以来学习和复习的时间要统筹安排以外，还要合理的安排每日时间，最大效率得提高复习效率。如何合理制定的每日学习计划安排，考生可以参考进行。',
                        'main_teacher' => '大河', //主讲老师
                        'url' => 'http://www.genshuixue.com/teacher/classCourseDetail?number=150616748050'
                        ),
                    array(
                        'grade' => '高一', //年级
                        'lijibaoming' => 1,
                        'avatar' => 'http://img.gsxservice.com/2053667_m7bwtrnv.jpg',
                        'title' => '222break_through2middlemiddle家长和“准高三生”都该如何更好的度过暑假',
                        'main_teacher' => '大河', //主讲老师
                        'url' => 'http://www.genshuixue.com/teacher/classCourseDetail?number=150616748050'
                        )
                 ),array(
                    array(
                        'grade' => '高一', //年级
                        'lijibaoming' => 1,
                        'avatar' => 'http://img.gsxservice.com/2053667_m7bwtrnv.jpg',
                        'title' => '11middlebreak_through家长和“准高三生”都该如何更好的度过暑假',
                        'intro' => 'high学习上除了要对一年以来学习和复习的时间要统筹安排以外，还要合理的安排每日时间，最大效率得提高复习效率。如何合理制定的每日学习计划安排，考生可以参考进行。',
                        'main_teacher' => '大河', //主讲老师
                        'url' => 'http://www.genshuixue.com/teacher/classCourseDetail?number=150616748050'
                        ),
                    array(
                        'grade' => '高一', //年级
                        'lijibaoming' => 1,
                        'avatar' => 'http://img.gsxservice.com/2053667_m7bwtrnv.jpg',
                        'title' => '222break_through2middlemiddle家长和“准高三生”都该如何更好的度过暑假',
                        'main_teacher' => '大河', //主讲老师
                        'url' => 'http://www.genshuixue.com/teacher/classCourseDetail?number=150616748050'
                        )
                 ),array(
                    array(
                        'grade' => '高一', //年级
                        'lijibaoming' => 1,
                        'avatar' => 'http://img.gsxservice.com/2053667_m7bwtrnv.jpg',
                        'title' => '11middlebreak_through家长和“准高三生”都该如何更好的度过暑假',
                        'intro' => 'high学习上除了要对一年以来学习和复习的时间要统筹安排以外，还要合理的安排每日时间，最大效率得提高复习效率。如何合理制定的每日学习计划安排，考生可以参考进行。',
                        'main_teacher' => '大河', //主讲老师
                        'url' => 'http://www.genshuixue.com/teacher/classCourseDetail?number=150616748050'
                        ),
                    array(
                        'grade' => '高一', //年级
                        'lijibaoming' => 1,
                        'avatar' => 'http://img.gsxservice.com/2053667_m7bwtrnv.jpg',
                        'title' => '222break_through2middlemiddle家长和“准高三生”都该如何更好的度过暑假',
                        'main_teacher' => '大河', //主讲老师
                        'url' => 'http://www.genshuixue.com/teacher/classCourseDetail?number=150616748050'
                        )
                 ),array(
                    array(
                        'grade' => '高一', //年级
                        'lijibaoming' => 1,
                        'avatar' => 'http://img.gsxservice.com/2053667_m7bwtrnv.jpg',
                        'title' => '11middlebreak_through家长和“准高三生”都该如何更好的度过暑假',
                        'intro' => 'high学习上除了要对一年以来学习和复习的时间要统筹安排以外，还要合理的安排每日时间，最大效率得提高复习效率。如何合理制定的每日学习计划安排，考生可以参考进行。',
                        'main_teacher' => '大河', //主讲老师
                        'url' => 'http://www.genshuixue.com/teacher/classCourseDetail?number=150616748050'
                        ),
                    array(
                        'grade' => '高一', //年级
                        'lijibaoming' => 1,
                        'avatar' => 'http://img.gsxservice.com/2053667_m7bwtrnv.jpg',
                        'title' => '222break_through2middlemiddle家长和“准高三生”都该如何更好的度过暑假',
                        'main_teacher' => '大河', //主讲老师
                        'url' => 'http://www.genshuixue.com/teacher/classCourseDetail?number=150616748050'
                        )
                 ),array(
                    array(
                        'grade' => '高一', //年级
                        'lijibaoming' => 1,
                        'avatar' => 'http://img.gsxservice.com/2053667_m7bwtrnv.jpg',
                        'title' => '11middlebreak_through家长和“准高三生”都该如何更好的度过暑假',
                        'intro' => 'high学习上除了要对一年以来学习和复习的时间要统筹安排以外，还要合理的安排每日时间，最大效率得提高复习效率。如何合理制定的每日学习计划安排，考生可以参考进行。',
                        'main_teacher' => '大河', //主讲老师
                        'url' => 'http://www.genshuixue.com/teacher/classCourseDetail?number=150616748050'
                        ),
                    array(
                        'grade' => '高一', //年级
                        'lijibaoming' => 1,
                        'avatar' => 'http://img.gsxservice.com/2053667_m7bwtrnv.jpg',
                        'title' => '222break_through2middlemiddle家长和“准高三生”都该如何更好的度过暑假',
                        'main_teacher' => '大河', //主讲老师
                        'url' => 'http://www.genshuixue.com/teacher/classCourseDetail?number=150616748050'
                        )
                 ),array(
                    array(
                        'grade' => '高一', //年级
                        'lijibaoming' => 1,
                        'avatar' => 'http://img.gsxservice.com/2053667_m7bwtrnv.jpg',
                        'title' => '11middlebreak_through家长和“准高三生”都该如何更好的度过暑假',
                        'intro' => 'high学习上除了要对一年以来学习和复习的时间要统筹安排以外，还要合理的安排每日时间，最大效率得提高复习效率。如何合理制定的每日学习计划安排，考生可以参考进行。',
                        'main_teacher' => '大河', //主讲老师
                        'url' => 'http://www.genshuixue.com/teacher/classCourseDetail?number=150616748050'
                        ),
                    array(
                        'grade' => '高一', //年级
                        'lijibaoming' => 1,
                        'avatar' => 'http://img.gsxservice.com/2053667_m7bwtrnv.jpg',
                        'title' => '222break_through2middlemiddle家长和“准高三生”都该如何更好的度过暑假',
                        'main_teacher' => '大河', //主讲老师
                        'url' => 'http://www.genshuixue.com/teacher/classCourseDetail?number=150616748050'
                        )
                 ),array(
                    array(
                        'grade' => '高一', //年级
                        'lijibaoming' => 1,
                        'avatar' => 'http://img.gsxservice.com/2053667_m7bwtrnv.jpg',
                        'title' => '11middlebreak_through家长和“准高三生”都该如何更好的度过暑假',
                        'intro' => 'high学习上除了要对一年以来学习和复习的时间要统筹安排以外，还要合理的安排每日时间，最大效率得提高复习效率。如何合理制定的每日学习计划安排，考生可以参考进行。',
                        'main_teacher' => '大河', //主讲老师
                        'url' => 'http://www.genshuixue.com/teacher/classCourseDetail?number=150616748050'
                        ),
                    array(
                        'grade' => '高一', //年级
                        'lijibaoming' => 1,
                        'avatar' => 'http://img.gsxservice.com/2053667_m7bwtrnv.jpg',
                        'title' => '222break_through2middlemiddle家长和“准高三生”都该如何更好的度过暑假',
                        'main_teacher' => '大河', //主讲老师
                        'url' => 'http://www.genshuixue.com/teacher/classCourseDetail?number=150616748050'
                        )
                 ),array(
                    array(
                        'grade' => '高一', //年级
                        'lijibaoming' => 1,
                        'avatar' => 'http://img.gsxservice.com/2053667_m7bwtrnv.jpg',
                        'title' => '11middlebreak_through家长和“准高三生”都该如何更好的度过暑假',
                        'intro' => 'high学习上除了要对一年以来学习和复习的时间要统筹安排以外，还要合理的安排每日时间，最大效率得提高复习效率。如何合理制定的每日学习计划安排，考生可以参考进行。',
                        'main_teacher' => '大河', //主讲老师
                        'url' => 'http://www.genshuixue.com/teacher/classCourseDetail?number=150616748050'
                        ),
                    array(
                        'grade' => '高一', //年级
                        'lijibaoming' => 1,
                        'avatar' => 'http://img.gsxservice.com/2053667_m7bwtrnv.jpg',
                        'title' => '222break_through2middlemiddle家长和“准高三生”都该如何更好的度过暑假',
                        'main_teacher' => '大河', //主讲老师
                        'url' => 'http://www.genshuixue.com/teacher/classCourseDetail?number=150616748050'
                        )
                 )
                ),
            'org' => array(
                array(
                    "img" => 'http://img.gsxservice.com/1197087_w714rt1g.jpg',
                    'link' => 'http://875010889.genshuixue.com/'
                    ),
                array(
                    "img" => 'http://img.gsxservice.com/1197087_w714rt1g.jpg',
                    'link' => 'http://875010889.genshuixue.com/'
                    ),
                array(
                    "img" => 'http://img.gsxservice.com/1197087_w714rt1g.jpg',
                    'link' => 'http://875010889.genshuixue.com/'
                    ),
                array(
                    "img" => 'http://img.gsxservice.com/1197087_w714rt1g.jpg',
                    'link' => 'http://875010889.genshuixue.com/'
                    ),
                array(
                    "img" => 'http://img.gsxservice.com/1197087_w714rt1g.jpg',
                    'link' => 'http://875010889.genshuixue.com/'
                    ),
                array(
                    "img" => 'http://img.gsxservice.com/1197087_w714rt1g.jpg',
                    'link' => 'http://875010889.genshuixue.com/'
                    ),

                ),



        )
    )
);

