<?php

require("../bootstrap.php");

render(
    "teacher_center/orderList",
    array(
        "tpl_data" => array(
            "pagination" => array(
                    'page'=>1,
                    'page_size'=>10,
                    'count'=>24,
            ),
            'pay_count' => array(
                '2' => 8, // 待支付
                '3' => 20, // 进行中
                '4' => 3, // 带评价
            ),
            "order_list" => array(
                array(
                    'id' => '4',
                    'purchase_id' => '114082832893440',
                    'pay_type' => '0',
                    'status' => 'apply_refunding',
                    'user_id' => '27',
                    'is_prefer_normal_course' => true,
                    'user_name' => '秦滢思',
                    'parent_purchase_type' => 3,
                    'display_name' => '秦滢思',
                    'teacher_user_number' => '12431543',
                    'customer_id' => '63',
                    'customer_name' => '杨世绍',
                    'total_prices' => '2407548.00',
                    'rest_prices' => '1000',
                    'pay_money' => '1372302.36',
                    "use_plat_ensure" => 1,
                    'pre_pay_money' => '1372123.36',
                    'has_change_money' => true,
                    'total_fee' => '0.00',
                    'course_type' => 2, // 1一对一 2班课
                    'real_pay_type' => 'pay type',
                    'trade_no' => '',
                    'trade_info' => '一二三四五六七八九十',
                    'trade_info_cut' => '一二三四五...',
                    'create_time' => '2014-08-28 18:37:04',
                    'update_time' => '2014-08-28 18:37:04',
                    'tid' => '3',
                    'avalid' => '0',
                    'course_id' => '167',
                    "use_plat_ensure" => 1,
                    'course_name' => '一二三四五六七八九十一二三四五六七八九十一二三...',
                    'course_name_cut' => '一二三四五...',
                    'hours' => '3',
                    'lesson_way' => '8',
                    'price' => '9516.00',
                    'discount' => '0.57',
                    'real_student' => '秦滢思',
                    'location' => 'eiusmodquo',
                    'note' => 'sedeligendipossimusf',
                    'did' => '4',
                    'pay_status' => '0',
                    'progress' => '1800',
                    'orderCourseLength' => 15180,
                    'order_url' => array(
                        'order_detail_url' => '/order/studentOrderDetail',
                        'cancel_order_url' => '/order/studentOrderDetail',
                        'confirm_pay_url' => NULL,
                        'appeal_url' => NULL,
                        'reserve_lesson_url' => NULL,
                        'comment_url' => '/order/studentCommentOrder',
                    ),
                    "address_area" => [
                        "full_address" => '',
                        "province" => [
                            "id" => "570425344",
                            "name" => "台湾",
                            "display_order" => "460",
                            "level" => "1",
                            "hidden" => "0"
                        ],
                        "city" => [
                            "id" => "570687488",
                            "name" => "台湾",
                            "display_order" => "0",
                            "level" => "2",
                            "hidden" => "0"
                        ],
                        "area" => [
                            "id" => "570703872",
                            "name" => "澎湖县",
                            "display_order" => "0",
                            "level" => "3",
                            "hidden" => "0"
                        ],
                        "country" => [ ],
                        "location_addr" => "中关村新东方大厦"
                    ],
                    'qreserve_sign' => 0 // 闪电约课：1开启 0关闭
                ),
                array(
                    'id' => '9',
                    'purchase_id' => '114082832891137',
                    'pay_type' => '0',
                    'status' => 'wait_for_pay',
                    'parent_purchase_type' => 3,
                    'is_prefer_normal_course' => true,
                    'user_id' => '27',
                    'user_name' => '秦滢思',
                    'display_name' => '秦滢思',
                    'teacher_user_number' => '12431543',
                    'customer_id' => '26',
                    'customer_name' => '郑芸露',
                    'total_prices' => '4115088.00',
                    'rest_prices' => '1000',
                    'pay_money' => '2839410.72',
                    "use_plat_ensure" => 1,
                    'pre_pay_money' => '-1',
                    'total_fee' => '0.00',
                    'course_type' => 1,
                    'real_pay_type' => 'pay type',
                    'trade_no' => '',
                    'trade_info' => 'dolorutremfacilisq',
                    'trade_info_cut' => '一二三四五...',
                    'create_time' => '2014-08-28 18:37:04',
                    'update_time' => '2014-08-28 18:37:04',
                    'tid' => '1',
                    'avalid' => '0',
                    'course_id' => '70',
                    'course_name' => 'elitautdictanemoeli',
                    'course_name_cut' => '一二三四五...',
                    'hours' => '697',
                    'lesson_way' => '4',
                    'price' => '5904.00',
                    'discount' => '0.69',
                    'real_student' => '秦滢思',
                    'location' => 'sitexplicaboap',
                    'note' => 'adipisicing',
                    'did' => '9',
                    'pay_status' => '0',
                    'progress' => '10000',
                    'orderCourseLength' => 41820,
                    'order_url' =>
                        array(
                          'order_detail_url' => '/order/studentOrderDetail',
                          'cancel_order_url' => NULL,
                          'confirm_pay_url' => NULL,
                          'appeal_url' => '/order/studentOrderDetail',
                          'reserve_lesson_url' => NULL,
                          'comment_url' => NULL,
                        ),
                    "address_area" => [
                        "full_address" => '',
                        "province" => [
                            "id" => "570425344",
                            "name" => "台湾",
                            "display_order" => "460",
                            "level" => "1",
                            "hidden" => "0"
                        ],
                        "city" => [
                            "id" => "570687488",
                            "name" => "台湾",
                            "display_order" => "0",
                            "level" => "2",
                            "hidden" => "0"
                        ],
                        "area" => [
                            "id" => "570703872",
                            "name" => "澎湖县",
                            "display_order" => "0",
                            "level" => "3",
                            "hidden" => "0"
                        ],
                        "country" => [ ],
                        "location_addr" => "中关村新东方大厦"
                    ],
                    'qreserve_sign' => 0 // 闪电约课：1开启 0关闭
                ),
                array(
                    'id' => '11',
                    'purchase_id' => '114082832891393',
                    'pay_type' => '0',
                    'status' => 'wait_for_pay',
                    'is_prefer_normal_course' => true,
                    'user_id' => '27',
                    'user_name' => '秦滢思',
                    'parent_purchase_type' => 3,
                    'display_name' => '秦滢思',
                    'teacher_user_number' => '12431543',
                    'customer_id' => '50',
                    'customer_name' => '周美苑',
                    'total_prices' => '3009800.00',
                    'rest_prices' => '1000',
                    'pay_money' => '2106860.00',
                    'total_fee' => '0.00',
                    'course_type' => 1,
                    'real_pay_type' => 'pay type',
                    'pre_pay_money' => -100,
                    "use_plat_ensure" => 1,
                    'trade_no' => '',
                    'trade_info' => 'ipsumcommodiipsami',
                    'trade_info_cut' => '一二三四五...',
                    'create_time' => '2014-08-28 18:37:04',
                    'update_time' => '2014-08-28 18:37:04',
                    'tid' => '5',
                    'avalid' => '0',
                    'course_id' => '146',
                    'course_name' => 'sedtemporequisdoloreer',
                    'course_name_cut' => '一二三四五...',
                    'hours' => '404',
                    'lesson_way' => '8',
                    'price' => '7450.00',
                    'discount' => '0.7',
                    'real_student' => '秦滢思',
                    'location' => 'utdelectusatharum',
                    'note' => 'aliquadolorumvolupta',
                    'did' => '11',
                    'pay_status' => '0',
                    'progress' => '16770',
                    'orderCourseLength' => 24240,
                    'order_url' =>
                        array(
                          'order_detail_url' => '/order/studentOrderDetail',
                          'cancel_order_url' => '/order/studentOrderDetail',
                          'confirm_pay_url' => NULL,
                          'appeal_url' => NULL,
                          'reserve_lesson_url' => NULL,
                          'comment_url' => NULL,
                        ),
                    "address_area" => [
                        "full_address" => '',
                        "province" => [
                            "id" => "570425344",
                            "name" => "台湾",
                            "display_order" => "460",
                            "level" => "1",
                            "hidden" => "0"
                        ],
                        "city" => [
                            "id" => "570687488",
                            "name" => "台湾",
                            "display_order" => "0",
                            "level" => "2",
                            "hidden" => "0"
                        ],
                        "area" => [
                            "id" => "570703872",
                            "name" => "澎湖县",
                            "display_order" => "0",
                            "level" => "3",
                            "hidden" => "0"
                        ],
                        "country" => [ ],
                        "location_addr" => "中关村新东方大厦"
                    ],
                    'qreserve_sign' => 1 // 闪电约课：1开启 0关闭
                ),
                array(
                    'id' => '11',
                    'purchase_id' => '114082832891393',
                    'pay_type' => '0',
                    'status' => 'wait_for_pay',
                    'user_id' => '27',
                    'user_name' => '秦滢思',
                    'is_prefer_normal_course' => false,
                    'display_name' => '秦滢思',
                    'parent_purchase_type' => 3,
                    'teacher_user_number' => '12431543',
                    'customer_id' => '50',
                    'customer_name' => '周美苑',
                    'total_prices' => '3009800.00',
                    'rest_prices' => '1000',
                    'pay_money' => '2106860.00',
                    'total_fee' => '0.00',
                    'course_type' => 1,
                    'real_pay_type' => 'pay type',
                    'pre_pay_money' => -100,
                    'trade_no' => '',
                    'trade_info' => 'ipsumcommodiipsami',
                    'trade_info_cut' => '一二三四五...',
                    'create_time' => '2014-08-28 18:37:04',
                    'update_time' => '2014-08-28 18:37:04',
                    "use_plat_ensure" => 1,
                    'tid' => '5',
                    'avalid' => '0',
                    'course_id' => '146',
                    'course_name' => 'sedtemporequisdoloreer',
                    'course_name_cut' => '一二三四五...',
                    'hours' => '404',
                    'lesson_way' => '8',
                    'price' => '7450.00',
                    'discount' => '0.7',
                    'real_student' => '秦滢思',
                    'location' => 'utdelectusatharum',
                    'note' => 'aliquadolorumvolupta',
                    'did' => '11',
                    'pay_status' => '0',
                    'progress' => '16770',
                    'orderCourseLength' => 24240,
                    'order_url' =>
                        array(
                          'order_detail_url' => '/order/studentOrderDetail',
                          'cancel_order_url' => '/order/studentOrderDetail',
                          'confirm_pay_url' => NULL,
                          'appeal_url' => NULL,
                          'reserve_lesson_url' => NULL,
                          'comment_url' => NULL,
                        ),
                    "address_area" => [
                        "full_address" => '',
                        "province" => [
                            "id" => "570425344",
                            "name" => "台湾",
                            "display_order" => "460",
                            "level" => "1",
                            "hidden" => "0"
                        ],
                        "city" => [
                            "id" => "570687488",
                            "name" => "台湾",
                            "display_order" => "0",
                            "level" => "2",
                            "hidden" => "0"
                        ],
                        "area" => [
                            "id" => "570703872",
                            "name" => "澎湖县",
                            "display_order" => "0",
                            "level" => "3",
                            "hidden" => "0"
                        ],
                        "country" => [ ],
                        "location_addr" => "中关村新东方大厦"
                    ],
                    'qreserve_sign' => 1 // 闪电约课：1开启 0关闭
                )

            )
        )
    )
);

