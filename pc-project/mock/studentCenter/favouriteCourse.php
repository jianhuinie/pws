<?php

require("../bootstrap.php");

render(
    "student_center/favouriteCourse",
    array(
        "tpl_data" => array(
            'course_count' => 5, // 全部课程总数
            'class_course_count' => 2, // 班课数目
            'video_course_count' => 3, // 视频课数目
            'items' => array( // 课程数据
                /*array(
                    'img' => array(
                        'url' => 'http://test-img.gsxservice.com/352694_v6zblol1.jpeg',
                        'width' => 400,
                        'height' => 250
                    ),
                    'course_title' => '留学视野汇总的美国文科生',
                    'type' => 1, // 1班课 2视频课
                ),*/
                array(
                    'avatar' => 'http://test-img.gsxservice.com/352694_v6zblol1.jpeg',
                    'number' => '379853432',
                    'pre_price' => '213',
                    'price' => '200',
                    'status' => '2',
                    'can_chaban' => false,
                    'title' => '留学视野汇总的美国文科生',
                    'type' => 'video_course', // 'class_course'班课 'video_course'视频课
                    'url' => 'http://lixin-www.test.genshuixue.com/video_course/15013043040'
                ),
                /*
班课status 代表意思
        1 => "初始",
        2 => "招生中",
        3 => "暂停招生",
        4 => "已报满",
        5 => "进行中",
        6 => "已完成",
        7 => "已删除",
        8 => "审核中",
        9 => "审核被拒",
        10 => "手动关班",
        11 => "课程过期",
        12 => "已失效",
        13 => "无人报名",
        14 => "关闭班课",
        10000 => "未知",

视频课status：1已发布 2待发布 3已下架,

                 */
                array(
                    'avatar' => 'http://test-img.gsxservice.com/352694_v6zblol1.jpeg',
                    'number' => '379853432',
                    'pre_price' => '213',
                    'price' => '200',
                    'status' => '2',
                    'can_chaban' => false,
                    'title' => '留学视野汇总的美国文科生',
                    'type' => 'class_course', // 'class_course'班课 'video_course'视频课
                    'url' => 'http://lixin-www.test.genshuixue.com/video_course/15013043040'
                ),
                array(
                    'avatar' => 'http://test-img.gsxservice.com/352694_v6zblol1.jpeg',
                    'number' => '379853432',
                    'pre_price' => '213',
                    'price' => '200',
                    'status' => '2',
                    'can_chaban' => false,
                    'title' => '留学视野汇总的美国文科生',
                    'type' => 'video_course', // 'class_course'班课 'video_course'视频课
                    'url' => 'http://lixin-www.test.genshuixue.com/video_course/15013043040'
                ),
                array(
                    'avatar' => 'http://test-img.gsxservice.com/352694_v6zblol1.jpeg',
                    'number' => '379853432',
                    'pre_price' => '213',
                    'price' => '200',
                    'status' => '2',
                    'can_chaban' => false,
                    'title' => '留学视野汇总的美国文科生',
                    'type' => 'video_course', // 'class_course'班课 'video_course'视频课
                    'url' => 'http://lixin-www.test.genshuixue.com/video_course/15013043040'
                ),
                array(
                    'avatar' => 'http://test-img.gsxservice.com/352694_v6zblol1.jpeg',
                    'number' => '379853432',
                    'pre_price' => '213',
                    'price' => '200',
                    'status' => '2',
                    'can_chaban' => false,
                    'title' => '留学视野汇总的美国文科生',
                    'type' => 'video_course', // 'class_course'班课 'video_course'视频课
                    'url' => 'http://lixin-www.test.genshuixue.com/video_course/15013043040'
                ),
                array(
                    'avatar' => 'http://test-img.gsxservice.com/352694_v6zblol1.jpeg',
                    'number' => '379853432',
                    'pre_price' => '213',
                    'price' => '200',
                    'status' => '2',
                    'can_chaban' => false,
                    'title' => '留学视野汇总的美国文科生',
                    'type' => 'video_course', // 'class_course'班课 'video_course'视频课
                    'url' => 'http://lixin-www.test.genshuixue.com/video_course/15013043040'
                ),
                array(
                    'avatar' => 'http://test-img.gsxservice.com/352694_v6zblol1.jpeg',
                    'number' => '379853432',
                    'pre_price' => '213',
                    'price' => '200',
                    'status' => '2',
                    'can_chaban' => false,
                    'title' => '留学视野汇总的美国文科生',
                    'type' => 'video_course', // 'class_course'班课 'video_course'视频课
                    'url' => 'http://lixin-www.test.genshuixue.com/video_course/15013043040'
                ),
                array(
                    'avatar' => 'http://test-img.gsxservice.com/352694_v6zblol1.jpeg',
                    'number' => '379853432',
                    'pre_price' => '213',
                    'price' => '200',
                    'status' => '2',
                    'can_chaban' => false,
                    'title' => '留学视野汇总的美国文科生',
                    'type' => 'video_course', // 'class_course'班课 'video_course'视频课
                    'url' => 'http://lixin-www.test.genshuixue.com/video_course/15013043040'
                ),
                array(
                    'avatar' => 'http://test-img.gsxservice.com/352694_v6zblol1.jpeg',
                    'number' => '379853432',
                    'pre_price' => '213',
                    'price' => '200',
                    'status' => '2',
                    'can_chaban' => false,
                    'title' => '留学视野汇总的美国文科生',
                    'type' => 'video_course', // 'class_course'班课 'video_course'视频课
                    'url' => 'http://lixin-www.test.genshuixue.com/video_course/15013043040'
                )
            ),
            'pager'=>array(
                'count' => 120,
                'page' => 10,
                'page_size' => 12
            )
        )
    )
);
