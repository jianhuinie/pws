<?php

// 添加班课
if (!isset($_GET['t'])) {
    $ext = 1;
} else {
    $ext = $_GET['t'];
}
require("../bootstrap.php");
render(
    "activity/template_".$ext,
    array(
        "tpl_data" => [
            "title" => "test-pc",
            "bg_head" => "http://img.gsxservice.com/0cms/d/file/content/2015/09/55f906a93ca3f.png",
            "bg_foot" => "http://img.gsxservice.com/0cms/d/file/content/2015/09/55f9068b764a8.png",
            "share_button" => "http://img.gsxservice.com/0cms/d/file/content/2015/09/55f906942de96.png",
            "share_img" => "http://img.gsxservice.com/0cms/d/file/content/2015/09/55f9069cbc539.jpg",
            "share_content" => "跟谁学欢迎您",
            "bg_color" => "#FF9900",
            "tab_bg_color" => "#dcdcdd",
            "btn_bg_color" => "#f4dd25",
            "btn_bgsho_color" => "#928416",
            "btn_click_color" => "#FFFFFF",
            "btn_clicksho_color" => "#999999",
            "content_color" => "#99FE80",
            "activity_role" => "http://test-img.gsxservice.com/0cms/d/file/content/2015/08/55d8483270b73.jpg",
            "list" => [
                [ "number" => "150815544601", "url" => "http://test.genshuixue.com/teacher/classCourseDetail/150820544450", "img" => "http://img.gsxservice.com/0cms/d/file/content/2015/08/55e05dfe01b9e.jpg"],
                [ "url" => "http://test.genshuixue.com/teacher/classCourseDetail/150714479693", "img" => "http://img.gsxservice.com/0cms/d/file/content/2015/06/559110d9a873b.png"]
            ],
            "course" => [
                "title" => "a",
                "list" => [
                    [
                        "type" => 1,
                        "id" => "5044",
                        "number" => "150815544601",
                        "name" => "鄢斌测试8.16",
                        "teacher_name" => "哈林",
                        "course_len" => 3,
                        "max_student" => 40,
                        "pay_student" => 50,
                        "begin_time" => "2015-08-22",
                        "preface" => "http://test-img.gsxservice.com/362245_bpw2e1n9.jpeg",
                        "original_price" => 'sdd',
                        "price" => "0.00",
                        "url" => "http://test-m.genshuixue.com/teacher/classCourseDetail/150815544601",
                        "is_online" => true,
                        "time" => "2015-08-15",
                        "hour" => "09:08:15",
                        "button_name" => "test",
                        "button_url" => "http://www.baidu.com",
                        "is_over" => false
                    ],
                    [
                        "type" => 2,
                        "id" => "5044",
                        "number" => "150815544601",
                        "name" => "鄢斌测试8.16",
                        "teacher_name" => "哈林",
                        "course_len" => 3,
                        "max_student" => "40",
                        "pay_student" => 4,
                        "time" => "2015-08-22",
                        "hour" => "09:08:15",
                        "preface" => "http://test-img.gsxservice.com/362245_bpw2e1n9.jpeg",
                        "original_price" => null,
                        "price" => "0.00",
                        "url" => "http://test-m.genshuixue.com/teacher/classCourseDetail/150815544601",
                        "is_online" => true,
                        "create_time" => "2015-08-15 09:08:15",
                        "button_name" => "test",
                        "button_url" => "http://www.baidu.com",
                        "is_over" => false
                    ],
                    [
                        "type" => 2,
                        "id" => "12",
                        "number" => "141126477248",
                        "name" => "移民中国",
                        "teacher_name" => "昵称",
                        "course_len" => 0.5,
                        "max_student" => "5",
                        "pay_student" => 3,
                        "time" => "2014-11-26",
                        "hour" => "09:08:15",
                        "preface" => "http://test-img.gsxservice.com/16881_op84mwzx.png",
                        "original_price" => null,
                        "price" => "0.00",
                        "url" => "http://test-m.genshuixue.com/teacher/classCourseDetail/141126477248",
                        "is_online" => true,
                        "create_time" => "2014-11-26 20:36:18",
                        "button_name" => "test",
                        "button_url" => "http://www.baidu.com",
                        "is_over" => false
                    ],
                    [
                        "type" => 2,
                        "id" => "13",
                        "address" => "addressa",
                        "number" => "141126477252",
                        "name" => "钢琴-初级@；钢琴-初级@；钢琴-初级@",
                        "teacher_name" => "昵称",
                        "course_len" => 0.5,
                        "max_student" => "10",
                        "pay_student" => 6,
                        "time" => "8月20日",
                        "hour" => "18:00-24:00",
                        "preface" => "http://test-img.gsxservice.com/16836_g1hoof59.png",
                        "original_price" => null,
                        "price" => "0.00",
                        "url" => "http://test-m.genshuixue.com/teacher/classCourseDetail/141126477252",
                        "is_online" => false,
                        "create_time" => "2014-11-26 20:56:41",
                        "button_name" => "test",
                        "button_url" => "http://www.baidu.com",
                        "is_over" => true
                    ]
                ]
            ],
            "teacher" => [
                "title" => "b",
                "list" => [
                    [
                        "number" => "328932018",
                        "name" => "师资013",
                        "avatar" => "http://test-img.gsxservice.com/headpic_man.png",
                        "slogan" => null,
                        "button_url" => " http://www.baidu.com",
                        "button_name" => "test"
                    ],
                    [
                        "number" => "329095688",
                        "name" => "215*****1158",
                        "avatar" => "http://test-img.gsxservice.com/headpic_woman.png",
                        "slogan" => null,
                        "button_url" => "http://www.baidu.com",
                        "button_name" => "test"
                    ],
                    [
                        "number" => "329098248",
                        "name" => "真实",
                        "avatar" => "http://test-img.gsxservice.com/headpic_woman.png",
                        "slogan" => "不幽默不上课",
                        "button_url" => "http://www.baidu.com",
                        "button_name" => "test"
                    ]
                ]
            ],
            "org" => [
                "title" => "c",
                "list" => [
                    [
                        "avatar" => "http://test-img.gsxservice.com/365462_faorbd23.jpg",
                        "button_name" => "test",
                        "button_url" => "http://www.baidu.com"
                    ],
                    [
                        "avatar" => "http://test-img.gsxservice.com/6601_p2osb5p8.jpg",
                        "button_name" => "test",
                        "button_url" => "http://www.baidu.com"
                    ],
                    [
                        "avatar" => "http://test-img.gsxservice.com/345735_jq9kdmmf.jpg",
                        "button_name" => "test",
                        "button_url" => "http://www.baidu.com"
                    ],
                    [
                        "avatar" => "http://test-img.gsxservice.com/6601_p2osb5p8.jpg",
                        "button_name" => "test",
                        "button_url" => "http://www.baidu.com"
                    ],
                    [
                        "avatar" => "http://test-img.gsxservice.com/345735_jq9kdmmf.jpg",
                        "button_name" => "test",
                        "button_url" => "http://www.baidu.com"
                    ]
                ]
            ],
            "tab" => [
                [
                    "title" => "课程教教",
                    "type" => "1", //课程
                    "list" => [
                        [
                            "type" => 1,
                            "id" => "5044",
                            "number" => "150815544601",
                            "name" => "鄢斌测试8.16",
                            "teacher_name" => "哈林",
                            "course_len" => 3,
                            "max_student" => 40,
                            "pay_student" => 50,
                            "begin_time" => "2015-08-22",
                            "preface" => "http://test-img.gsxservice.com/362245_bpw2e1n9.jpeg",
                            "original_price" => '888',
                            "price" => "0.00",
                            "url" => "http://test-m.genshuixue.com/teacher/classCourseDetail/150815544601",
                            "is_online" => true,
                            "time" => "2015-08-15",
                            "hour" => "09:08:15",
                            "button_name" => "test",
                            "intro" => "已报名10/23",
                            "button_url" => "http://www.baidu.com",
                            "is_over" => false
                        ],
                        [
                            "type" => 2,
                            "id" => "5044",
                            "address" => "addre",
                            "subject_name" => "接她",
                            "number" => "150815544601",
                            "name" => "鄢斌测试8.16",
                            "teacher_name" => "哈林",
                            "course_len" => 3,
                            "max_student" => "40",
                            "pay_student" => 4,
                            "time" => "2015-08-22",
                            "hour" => "09:08:15",
                            "preface" => "http://test-img.gsxservice.com/362245_bpw2e1n9.jpeg",
                            "original_price" => null,
                            "price" => "0.00",
                            "url" => "http://test-m.genshuixue.com/teacher/classCourseDetail/150815544601",
                            "is_online" => true,
                            "create_time" => "2015-08-15 09:08:15",
                            "button_name" => "test",
                            "button_url" => "http://www.baidu.com",
                            "is_over" => false
                        ],
                        [
                            "type" => 2,
                            "id" => "12",
                            "address" => "address",
                            "subject_name" => "接她",
                            "number" => "141126477248",
                            "name" => "移民中国",
                            "teacher_name" => "昵称",
                            "course_len" => 0.5,
                            "max_student" => "5",
                            "pay_student" => 3,
                            "time" => "2014-11-26",
                            "hour" => "09:08:15",
                            "preface" => "http://test-img.gsxservice.com/16881_op84mwzx.png",
                            "original_price" => null,
                            "price" => "0.00",
                            "url" => "http://test-m.genshuixue.com/teacher/classCourseDetail/141126477248",
                            "is_online" => true,
                            "create_time" => "2014-11-26 20:36:18",
                            "button_name" => "test",
                            "button_url" => "http://www.baidu.com",
                            "is_over" => false
                        ],
                        [
                            "type" => 2,
                            "id" => "13",
                            "address" => "addrf",
                            "subject_name" => "接她",
                            "number" => "141126477252",
                            "name" => "钢琴-初级@；钢琴-初级@；钢琴-初级@",
                            "teacher_name" => "昵称",
                            "course_len" => 0.5,
                            "max_student" => "10",
                            "pay_student" => 6,
                            "time" => "8月20日",
                            "hour" => "18:00-24:00",
                            "preface" => "http://test-img.gsxservice.com/16836_g1hoof59.png",
                            "original_price" => null,
                            "price" => "0.00",
                            "url" => "http://test-m.genshuixue.com/teacher/classCourseDetail/141126477252",
                            "is_online" => false,
                            "create_time" => "2014-11-26 20:56:41",
                            "button_name" => "test",
                            "button_url" => "http://www.baidu.com",
                            "is_over" => true
                        ]
                    ]
                ],
                [
                    "title" => "老师教教",
                    "type" => "2", //老师
                    "list" => [
                        [
                            "number" => "328932018",
                            "name" => "师资013",
                            "avatar" => "http://test-img.gsxservice.com/headpic_man.png",
                            "slogan" => null,
                            "button_url" => " http://www.baidu.com",
                            "button_name" => "test"
                        ],
                        [
                            "number" => "329095688",
                            "name" => "215*****1158",
                            "avatar" => "http://test-img.gsxservice.com/headpic_woman.png",
                            "slogan" => null,
                            "button_url" => "http://www.baidu.com",
                            "button_name" => "test"
                        ],
                        [
                            "number" => "329098248",
                            "name" => "真实",
                            "avatar" => "http://test-img.gsxservice.com/headpic_woman.png",
                            "slogan" => "不幽默不上课",
                            "button_url" => "http://www.baidu.com",
                            "button_name" => "test"
                        ]
                    ]
                ],
                [
                    "title" => "机构家教",
                    "type" => "3", //机构
                    "list" => [
                        [
                            "avatar" => "http://test-img.gsxservice.com/365462_faorbd23.jpg",
                            "button_name" => "test",
                            "button_url" => "http://www.baidu.com"
                        ],
                        [
                            "avatar" => "http://test-img.gsxservice.com/6601_p2osb5p8.jpg",
                            "button_name" => "test",
                            "button_url" => "http://www.baidu.com"
                        ],
                        [
                            "avatar" => "http://test-img.gsxservice.com/345735_jq9kdmmf.jpg",
                            "button_name" => "test",
                            "button_url" => "http://www.baidu.com"
                        ],
                        [
                            "avatar" => "http://test-img.gsxservice.com/6601_p2osb5p8.jpg",
                            "button_name" => "test",
                            "button_url" => "http://www.baidu.com"
                        ],
                        [
                            "avatar" => "http://test-img.gsxservice.com/345735_jq9kdmmf.jpg",
                            "button_name" => "test",
                            "button_url" => "http://www.baidu.com"
                        ]
                    ]
                ]
            ]
        ]
    )
);
