<?php


require("../bootstrap.php");

render(
    "orgRoom/concentration",
    array(
        "tpl_data" => array(
            "abtest" => 1,
            "support_student_advisory" => true, // 该机构是否支持学生预约试听
            'is_favored' => false,
            'base_info' => array(
                    'id' => '329016489',
                    'name' => '北大1',
                    'avatar' => 'http://test-img.gsxservice.com/17159_bkc4jcbu.jpg',
                    'number' => '329016489',
                    'mobile' => '010-1101101',
                    'score' => '4.7',
                    'location' => '北京',
                    'comments_cnt' => '34',
                    'brief' => '一句话简介',
                    'tags' => array
                        (
                            '0' => array
                                (
                                    'name' => 'kobe',
                                ),

                            '1' => array
                                (
                                    'name' => 'nba',
                                ),

                            '2' => array
                                (
                                    'name' => '单挑贝尔',
                                ),

                        ),

                    'domain' => 'liumeiyu03',
                    'count' => 20,
                    'page' => 2,
                    'page_size' => 1
            ),
            "course_type" => 1,
            "courses" => [
                array(
                    "course_type" => "3",
                    "course_cover" => "http://test-img.gsxservice.com/736855_5fi2bmxj.jpeg",
                    "course_name" => "CPS返奖学金-付费视频课02",
                    "course_number" => "16070195197",
                    "course_url" => "http://test.genshuixue.com/video_course/getcourseshowdetail?number=16070195197",
                    "begin_time" => "",
                    "teacher_name" => "水水",
                    "teacher_avatar" => "http://test-img.gsxservice.com/732940_43s1k2ta.jpeg",
                    "play_count" => 0
                ),
                array(
                    "course_type" => "3",
                    "course_cover" => "http://test-img.gsxservice.com/736856_j2k0zdgf.jpeg",
                    "course_name" => "CPS返奖学金-付费视频课03",
                    "course_number" => "16070154341",
                    "course_url" => "http://test.genshuixue.com/video_course/getcourseshowdetail?number=16070154341",
                    "begin_time" => "",
                    "teacher_name" => "水水",
                    "teacher_avatar" => "http://test-img.gsxservice.com/732940_43s1k2ta.jpeg",
                    "play_count" => 2
                ),
                array(
                    "course_type" => "8",
                    "course_cover" => "http://test-img.gsxservice.com/774602_kcoics6g.jpeg",
                    "course_name" => "招生中-直播课@#￥%…&*（）j—最大名称长度",
                    "course_number" => "160922490509",
                    "course_url" => "http://test.genshuixue.com/teacher/classCourseDetail/160922490509",
                    "begin_time" => "12月14日 12:00",
                    "teacher_name" => "水水",
                    "teacher_avatar" => "http://test-img.gsxservice.com/732940_43s1k2ta.jpeg",
                    "play_count" => 0
                ),
                array(
                    "course_type" => "8",
                    "course_cover" => "http://test-img.gsxservice.com/774605_pwztdzwg.jpeg",
                    "course_name" => "审核失败-直播课@#￥%……&*（）—jhjjhjj—",
                    "course_number" => "160922491529",
                    "course_url" => "http://test.genshuixue.com/teacher/classCourseDetail/160922491529",
                    "begin_time" => "11月25日 12:00",
                    "teacher_name" => "水水",
                    "teacher_avatar" => "http://test-img.gsxservice.com/732940_43s1k2ta.jpeg",
                    "play_count" => 0
                )
            ],
            "pages" => array(
                "page" => "1",
                "count" => "12",
                "has_more" => false,
                "type" => "famous"
            ),
            "is_favored" => false,
            "popularity" => "3",
            "coupon" => [],
            "support_student_advisory" => true,
            "title" => "【希涛教育培训机构】希涛教育培训机构,啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊-跟 => 谁学官网",
            "keywords" => "希涛教育培训机构,希涛教育培训机构网站,希涛教育培训机构官网,希涛教育培训机构课程,希涛教育培训机构老师",
            "description" => "希涛教育培训机构,啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊。希涛教育培训机构提供aa的课程、老师、视频、相册、评价怎么样,方便学生和家长全方位了解希涛教育培训机构。找好老师,上跟谁学！",
            "lbs" => array(
                "province" => "北京",
                "city" => "北京",
                "coord" => array(
                    "lng" => 116.39564503788,
                    "lat" => 39.92998577808
                )
            )
        )
    )
);

