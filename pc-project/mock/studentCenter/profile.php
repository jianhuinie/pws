<?php

require("../bootstrap.php");

render(
    "student_center/profile",
    array(
        "tpl_data" => array(

            "base_info" => array(
                "uid" => '234',
                "blank" => false, // true,没编辑过
                "id_card" => 1, // 0未认证 1认证通过 2认证失败 - 认证通过后，姓名、性别、生日，便不可再修改
                "realname_locked" => false, // 真实姓名
                "avatar" => "http://test.img.genshuixue.com/headpic_woman.png",
                "has_avatar" => false,
                "default_avatars" => array(
                    "sexless" => "http://test-img.gsxservice.com/headpic_sexless.jpg",
                    "male" => "http://test-img.gsxservice.com/headpic_man.png",
                    "female" => "http://test-img.gsxservice.com/headpic_woman.png"
                ),
                "realname" => "王余洁",
                'nickname' => 'this is nickname',
                "sex" => 2,
                "birthday" => '', // year,month,day
                "address" => array( // 地址
                    'lat' => 40.056876,
                    'lng' => 116.307836,
                    'regular_address' => array(
                        "province" => array(
                            "id" => "17039360",
                            "name" => "北京",
                            "display_order" => "1000",
                            "level" => "1",
                            "hidden" => "0"
                        ),
                        "city" => array(
                            "id" => "17039360",
                            "name" => "北京",
                            "display_order" => "0",
                            "level" => "2",
                            "hidden" => "0"
                        ),
                        "area" => array(
                            "id" => "16777218",
                            "name" => "海淀区",
                            "display_order" => "14",
                            "level" => "3",
                            "hidden" => "0"
                        ),
                        "location_addr" => "百度大厦"
                    )
                ),
                // "private_domain" => "gerenyuming",
                "short_introduce" => "你说我是你的超级英雄",
                "subjects" => array(
                    array(
                        'id' => 111,
                        'name' => '语文'
                    ),
                    array(
                        'id' => 222,
                        'name' => '数学'
                    ),
                    array(
                        'id' => 333,
                        'name' => '外语'
                    )
                )
            ),
            "background" => array(
                'colleges' => array( // 大学
                    array(
                        'id' => 1,
                        'school_id' => '100',
                        'school_name' => '清华清华清华清华清华清华清华清华清华清华清华清华清华清华清华清华清华',
                        'identity' => 0,
                        'department_id' => 100,
                        'department_name' => '教育系',
                        'enter_school' => '0'
                    ),
                    array(
                        'id' => 2,
                        'school_id' => '101',
                        'school_name' => '北大',
                        'identity' => 1,
                        'department_id' => 103,
                        'department_name' => '教育系',
                        'enter_school' => '2007'
                    )
                ),
                'senior_schools' => array( // 高中
                    array(
                        'id' => 3,
                        'school_id' => 102,
                        'school_name' => '清华附中',
                        'enter_school' => '2006',
                        'grade' => array(
                            1 => 41,
                            2 => '',
                            3 => ''
                        )
                    ),
                    array(
                        'id' => 4,
                        'school_id' => 103,
                        'school_name' => '北大附中',
                        'enter_school' => '2005',
                        'grade' => array(
                            1 => '',
                            2 => 203,
                            3 => 203
                        )
                    )
                ),
                'special_schools' => array( // 中专技校
                    array(
                        'id' => 5,
                        'school_name' => '清华附中专',
                        'enter_school' => '2006'
                    ),
                    array(
                        'id' => 6,
                        'school_name' => '北大附中专',
                        'enter_school' => '2005'
                    )
                ),
                'middle_schools' => array( // 初中
                    array(
                        'id' => 7,
                        'school_name' => '清华附中',
                        'enter_school' => '2004'
                    ),
                    array(
                        'id' => 8,
                        'school_name' => '北大附中',
                        'enter_school' => '2003'
                    )
                ),
                'primary_schools' => array( // 小学
                    array(
                        'id' => 9,
                        'school_name' => '清华附小',
                        'enter_school' => '2002'
                    ),
                    array(
                        'id' => 10,
                        'school_name' => '北大附小',
                        'enter_school' => '2000'
                    )
                )
            ),
            "work" => array(
                array(
                    'id' => 11,
                    'company' => '百家互联',
                    'start_date' => '',
                    'end_date' => '', // 至今
                    'industry_first' => array(
                        'name' => '前端攻城狮',
                        'id' => 123
                    ),
                    'industry_second' => array(
                        'name' => '前端攻城狮二',
                        'id' => 123
                    ),
                    'job_first' => array(
                        'name' => '技术',
                        'id' => 123
                    ),
                    'job_second' => array(
                        'name' => '技术二',
                        'id' => 123
                    )
                ),
                array(
                    'id' => 22,
                    'company' => '百家互联北京总部',
                    'start_date' => '2014-05',
                    'end_date' => '0000-00', // 至今
                    'industry_first' => array(
                        'name' => '前端攻城狮',
                        'id' => 123
                    ),
                    'industry_second' => array(
                        'name' => '前端攻城狮二',
                        'id' => 123
                    ),
                    'job_first' => array(
                        'name' => '技术',
                        'id' => 123
                    ),
                    'job_second' => array(
                        'name' => '技术二',
                        'id' => 123
                    )
                ),
                array(
                    'id' => 33,
                    'company' => '百家互联北京分部',
                    'start_date' => '2014-05',
                    'end_date' => '0000-00', // 至今
                    'industry_first' => array(
                        'name' => '前端攻城狮',
                        'id' => 123
                    ),
                    'industry_second' => array(
                        'name' => '前端攻城狮二',
                        'id' => 123
                    ),
                    'job_first' => array(
                        'name' => '技术',
                        'id' => 123
                    ),
                    'job_second' => array(
                        'name' => '技术二',
                        'id' => 123
                    )
                )
            ),
            "activity" => array(
                "win_in_school" => 1, // 1参加活动 0未参加活动
                "verify_basic" => "success", // 成功
                "verify_school" => "fail", // 失败
                "verify_email" => "success"
            )

        )
    )
);

