<?php

require("../bootstrap.php");

render(
    "student/personal",
    [
        "tpl_data" => [
            "basic_info" => [
                "user_number" => "12121212312312",
                "realname" => "刘美玉",
                "nickname" => null,
                "view_count" => 222,
                "sex" => 0,
                // 0：女，1：男
                "mobile" => "13600000000",
                "avatar" => "http://img.gsxservice.com/554404_dlolowlb.jpeg",
                "birthday" => 1428913574,
                "short_introduce" => "互联网产品学习者",
                "private_domain" => "liumeiyu",
                "address" =>
                [
                    "province" => [
                        "name" => "北京"
                    ],
                    "city" => [
                        "name" => "北京"
                    ],
                    "area" => [
                        "name" => "湖区"
                    ]
                ],
                "subjects" => [
                    [
                        "id" => 577,
                        "name" => "钢琴",
                    ],
                    [
                        "id" => 588,
                        "name" => "吉他",
                    ]
                ],
            ],
            "background" =>
            [
                "colleges" =>
                [
                    [
                        "school_name" => "清华大学",
                        "enter_school" => 1428913574,
                        "department_name" => "中国语言文学系",
                        "identity" => "1",
                        // 身份类别（0：大学生，1：硕士，2：博士，3：校工，4：教师）
                    ],
                    [
                        "id" => "23",
                        "school_id" => "72339069014638593",
                        "school_name" => "清华大学",
                        "enter_school" => 1428913574,
                        "department_id" => "2",
                        "department_name" => "五道口金融学院",
                        "identity" => "3"
                    ],
                ],
                "senior_schools" =>
                [
                    [
                        "school_name" => "北京二十四中",
                        "enter_school" => 1428913574,
                    ],

                ],
                "special_schools" =>
                [
                    [
                        "school_name" => "东城财政贸易干部学校",
                        "enter_school" => 1428913574,
                    ]
                ],
                "middle_schools" =>
                [
                    [
                        "school_name" => "北京二十四中",
                        "enter_school" => 1428913574,
                    ]
                ],
                "primary_schools" =>
                [
                    [
                        "school_name" => "范庄小学",
                        "enter_school" => 1428913574,
                    ]
                ],
            ],
            "work" =>
            [
                [
                    "company_name" => "跟谁学",
                    "start_date" => 1428913574,
                    "end_date" => 1428913574,
                    "industry_first" => [
                        "name" => "高新技术",
                    ],
                    "industry_second" => [
                        "name" => "通讯/电信（设备/运营）",
                    ],
                    "job_first" => [
                        "name" => "市场/市场拓展/公关",
                    ],
                    "job_second" => [
                        "name" => "市场营销经理/主管",
                    ]
                ],
                [
                    "company_name" => "百家互联",
                    "start_date" => 1428913574,
                    "end_date" => 1428913574,
                    "industry_first" => [
                        "name" => "高新技术",
                    ],
                    "industry_second" => [
                        "name" => "通讯/电信（设备/运营）",
                    ],
                    "job_first" => [
                        "name" => "市场/市场拓展/公关",
                    ],
                    "job_second" => [
                        "name" => "市场营销经理/主管",
                    ]
                ],
                [
                    "company_name" => "易车网",
                    "start_date" => 1428913574,
                    "end_date" => 1428913574,
                    "industry_first" => [
                        "name" => "高新技术",
                    ],
                    "industry_second" => [
                        "name" => "通讯/电信（设备/运营）",
                    ],
                    "job_first" => [
                        "name" => "市场/市场拓展/公关",
                    ],
                    "job_second" => [
                        "name" => "市场营销经理/主管",
                    ]
                ],
            ]
        ]
    ]
);
