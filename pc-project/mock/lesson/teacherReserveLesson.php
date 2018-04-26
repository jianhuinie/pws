<?php

// 老师发起排课
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
                "offline_poi" => array(
                    "lng" => "116.521695",
                    "lat" => "39.958953"
                ),
                'location' => '北京 昌平 生命科学园地铁站',
            ),
            "order_info" => [
                "available_hours" => 10,
                "course_type" => 5, //  课程种类，1一对一 2班课 3视频课 4机构班课 5试听课
                "lesson_way_name" => '老师上门',
                "total_length" => 12,
                "course_name" => '高三理科-英语',
                "from" => "student",
                "address" => "海淀区中关村科技大厦",//默认上课地址,如果没有就不显示
            ],
            "student" => [
                "display_name" => "沈佳宜",
                "number" => "12313",
                "sex" => 0,
                "mobile" => "1351234563",
                "avatar" => "http://img.genshuixue.com/headpic_man.png",
            ],
            "teacher" => [
                "display_name" => "沈佳宜",
                "number" => "12313",
                "mobile" => "1351234563",
                "sex" => 1,
                "avatar" => "http://img.genshuixue.com/headpic_man.png",
                "address_list" => array(
                    array(
                        "id" => 101,
                        "status" => 1, // 0默认 1常用地址 9删除
                        "lng" => 30, // 经纬度
                        "lat" => 0,
                        "location_addr" => "西二旗地铁站软件园孵化器软件园孵化器2号楼",
                        "detailed_address" => "高教园",
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
                            )
                        )
                    ),
                    array(
                        "id" => 102,
                        "status" => 0, // 0默认 1常用地址 9删除
                        "lng" => 30, // 经纬度
                        "lat" => 0,
                        "location_addr" => "西二旗地铁站软件园孵化器软件园孵化器2号楼",
                        "detailed_address" => "高教园",
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
                            )
                        )
                    ),
                    array(
                        "id" => 103,
                        "status" => 0, // 0默认 1常用地址 9删除
                        "lng" => 30, // 经纬度
                        "lat" => 0,
                        "location_addr" => "西二旗地铁站软件园孵化器软件园孵化器2号楼",
                        "detailed_address" => "高教园",
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
                            )
                        )
                    )
                )
            ]
        )
    )
);