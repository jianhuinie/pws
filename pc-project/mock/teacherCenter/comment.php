<?php

require("../bootstrap.php");

render(
    "teacher_center/comment",
    array(
        "tpl_data" => array(

            "order" => array(
                'id' => '9',
                'purchase_id' => '114082832891137',
                'teacher_user_number' => 1231432543,
                'pay_type' => '0',
                'status' => 'canceled',
                'user_id' => '27',
                'user_name' => '秦滢思',
                'display_name' => '展示姓名',
                'customer_id' => '26',
                'customer_name' => '郑芸露',
                'total_prices' => '4115088.00',
                'pay_money' => '2839410.72',
                'total_fee' => '0.00',
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
                'real_student' => '秦滢思钱阿斯蒂芬',
                'real_studnet_cut' => '秦滢思',
                'location' => 'sitexplicaboap',
                'note' => 'adipisicing',
                'did' => '9',
                'pay_status' => '3',
                'progress' => '10000',
                'order_course_length' => 41820,
                'pre_pay_money' => 12,
                'course_type' => 1,
                "address_area" => array(
                    "province" => array(
                        'id' => '570425344',
                        'name' => '台湾',
                        'display_order' => '460',
                        'level' => '1',
                        'hidden' => '0'
                    ),
                    "city" => array(
                        'id' => '570425344',
                        'name' => '台湾',
                        'display_order' => '0',
                        'level' => '2',
                        'hidden' => '0'
                    ),
                    "area" => array(
                        'id' => '570425344',
                        'name' => '澎湖县',
                        'display_order' => '0',
                        'level' => '3',
                        'hidden' => '0'
                    ),
                    "country" => array(
                        'id' => '570425344',
                        'name' => '宁江区',
                        'display_order' => '0',
                        'level' => '3',
                        'hidden' => '0'
                    ),
                    "location_addr" => "中关村新东方大厦",
                ),
                'order_url' =>
                    array(
                      'order_detail_url' => '/order/studentOrderDetail',
                      'cancel_order_url' => NULL,
                      'confirm_pay_url' => NULL,
                      'appeal_url' => '/order/studentOrderDetail',
                      'reserve_lesson_url' => NULL,
                      'comment_url' => NULL,
                    )
            )

        )
    )
);