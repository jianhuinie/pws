<?php

// 学生发起约课
require("../bootstrap.php");


render(
    "course/reserve",
    array(
        "tpl_data" => array(

            "today" => 1408938182,
            "purchase_id" => 12,

            'order_address' => array ( // 订单地址
                'area_id' => '17041408',
                "address" => "中关村软件园",
                "offline_poi" => array (
                    "lng" => "116.521695",
                    "lat" => "39.958953"
                ),
                'location' => '这里是后端拼接好的原地址信息',
            ),
            "order_info" => [
                "available_hours" => 4.5,
                "course_type" => 5, 
                 "total_length" => 12,
                "lesson_way_name" => '老师上门',
                "course_name" => '高三理科-英语',
                "from" => "teacher",
                "location" => "北京 海淀区 中关村科技大厦", // 拼接好省市区详细地址的 - 原订单地址
            ],
            "student" => [
                "display_name" => "沈佳宜学生",
                "number" => "12313",
                "sex" => 0,
                "mobile" => "1351234563",
                "avatar" => "http://img.genshuixue.com/headpic_man.png",
            ],
            "teacher" => [
                "display_name" => "沈佳宜老师",
                "number" => "12313",
                "mobile" => "1351234563",
                "sex" => 1,
                "avatar" => "http://img.genshuixue.com/headpic_man.png",
                "teacher_id" => 112,
                'qreserve_sign' => 1, // 闪电约课：1开启 0关闭
                "address_list" => array(
                    array(
                        "id" => 101,
                        "status" => 1, // 0默认 1常用地址 9删除
                        "lng" => 30, // 经纬度
                        "lat" => 0,
                        "regular_address" => array( // 常用教学地点
                            "province" => array(
                                "id" => "150994944",
                                "name" => "河北",
                                "display_order" => "1000",
                                "level" => "1",
                                "hidden" => "0"
                            ),
                            "city" => array(
                                "id" => "151257088",
                                "name" => "石家庄",
                                "display_order" => "0",
                                "level" => "2",
                                "hidden" => "0"
                            ),
                            "area" => array(
                                "id" => "153354241",
                                "name" => "正定",
                                "display_order" => "14",
                                "level" => "3",
                                "hidden" => "0"
                            ),
                            "location_addr" => "西二旗地铁站软件园孵化器2号楼西二旗地铁站软件园孵化器2号楼西二旗地铁站软件园孵化器2号楼"
                        )
                    ),
                    array(
                        "id" => 102,
                        "status" => 0, // 0默认 1常用地址 9删除
                        "lng" => 30, // 经纬度
                        "lat" => 0,
                        "regular_address" => array( // 常用教学地点
                            "province" => array(
                                "id" => "16777216",
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
                                "id" => "17041408",
                                "name" => "海淀区",
                                "display_order" => "14",
                                "level" => "3",
                                "hidden" => "0"
                            ),
                            "location_addr" => "西二旗软件园孵化器2号楼"
                        )
                    ),
                    array(
                        "id" => 103,
                        "status" => 0, // 0默认 1常用地址 9删除
                        "lng" => 30, // 经纬度
                        "lat" => 0,
                        "regular_address" => array( // 常用教学地点
                            "province" => array(
                                "id" => "16777216",
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
                                "id" => "17041408",
                                "name" => "海淀区",
                                "display_order" => "14",
                                "level" => "3",
                                "hidden" => "0"
                            ),
                            "location_addr" => "西二旗软件园孵化器2号楼"
                        )
                    )
                )
            ],
            "organization" => array(
                "name" => "串session",
                "domain" => "328931849",
                "extension" => "4000-122-166 转 166042",
                "location" => "武汉",
                "city_filter" => 1
            )
        )
    )
);