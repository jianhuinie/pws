<?php

require("../bootstrap.php");

$response = array(
    "code" => 0,
    "tpl" => array(
        "order_list" => fetch(

            "common/center/component/orderList",

            array(
                "tpl_data" => array(
                    "order_list" => array(

                        array(
                            'id' => '4',
                            'purchase_id' => '114082832893440',
                            'pay_type' => '0',
                            'status' => 'pay_failed',
                            'user_id' => '27',
                            'user_name' => '秦滢思',
                            'teacher_user_id' => '63',
                            'teacher_user_name' => '杨世绍',
                            'total_prices' => '24075.00',
                            'pay_money' => '13723.36',
                            'total_fee' => '0.00',
                            'real_pay_type' => 'pay type',
                            'trade_no' => '',
                            'trade_info' => '一二三四五六七八',
                            'create_time' => '2014-08-28 18:37:04',
                            'update_time' => '2014-08-28 18:37:04',
                            'tid' => '3',
                            'avalid' => '0',
                            'course_id' => '167',
                            'course_name' => '一二三四五六七八九',
                            'hours' => '253',
                            'lesson_way' => '8',
                            'price' => '9516.00',
                            'discount' => '0.57',
                            'real_student' => '秦滢思',
                            'location' => 'eiusmodquo',
                            'note' => 'sedeligendipossimusf',
                            'did' => '4',
                            'PayStatus' => '1',
                            'progress' => '1800',
                            'orderCourseLength' => 15180,
                            'order_url' => array(
                                  'order_detail_url' => '/order/studentOrderDetail',
                                  'cancel_order_url' => '.order.cancelOrders',
                                  'confirm_pay_url' => NULL,
                                  'appeal_url' => NULL,
                                  'reserve_lesson_url' => NULL,
                                  'comment_url' => '/order/studentCommentOrder',
                            )
                        ),
                        array(
                            'id' => '9',
                            'purchase_id' => '114082832891137',
                            'pay_type' => '0',
                            'status' => 'canceled',
                            'user_id' => '27',
                            'user_name' => '秦滢思',
                            'teacher_user_id' => '26',
                            'teacher_user_name' => '郑芸露',
                            'total_prices' => '41150.00',
                            'pay_money' => '2839410.72',
                            'total_fee' => '0.00',
                            'real_pay_type' => 'pay type',
                            'trade_no' => '',
                            'trade_info' => 'dolorutremfacilisq',
                            'create_time' => '2014-08-28 18:37:04',
                            'update_time' => '2014-08-28 18:37:04',
                            'tid' => '1',
                            'avalid' => '0',
                            'course_id' => '70',
                            'course_name' => 'elitautdictanemoeli',
                            'hours' => '697',
                            'lesson_way' => '4',
                            'price' => '5904.00',
                            'discount' => '0.69',
                            'real_student' => '秦滢思',
                            'location' => 'sitexplicaboap',
                            'note' => 'adipisicing',
                            'did' => '9',
                            'PayStatus' => '3',
                            'progress' => '10000',
                            'orderCourseLength' => 41820,
                            'order_url' => array(
                                  'order_detail_url' => '/order/studentOrderDetail',
                                  'cancel_order_url' => NULL,
                                  'confirm_pay_url' => NULL,
                                  'appeal_url' => NULL,
                                  'reserve_lesson_url' => NULL,
                                  'comment_url' => NULL,
                            )
                        ),
                        array(
                            'id' => '11',
                            'purchase_id' => '114082832891393',
                            'pay_type' => '0',
                            'status' => 'wait_for_pay',
                            'user_id' => '27',
                            'user_name' => '秦滢思',
                            'teacher_user_id' => '50',
                            'teacher_user_name' => '周苑',
                            'total_prices' => '309800.00',
                            'pay_money' => '2106860.00',
                            'total_fee' => '0.00',
                            'real_pay_type' => 'pay type',
                            'trade_no' => '',
                            'trade_info' => 'ipsumcommodiipsami',
                            'create_time' => '2014-08-28 18:37:04',
                            'update_time' => '2014-08-28 18:37:04',
                            'tid' => '5',
                            'avalid' => '0',
                            'course_id' => '146',
                            'course_name' => 'sedtemporequisdolore',
                            'hours' => '404',
                            'lesson_way' => '6',
                            'price' => '7450.00',
                            'discount' => '0.7',
                            'real_student' => '秦滢思',
                            'location' => 'utdelectusatharum',
                            'note' => 'aliquadolorumvolupta',
                            'did' => '11',
                            'PayStatus' => '0',
                            'progress' => '16770',
                            'orderCourseLength' => 24240,
                            'order_url' => array(
                                  'order_detail_url' => '/order/studentOrderDetail',
                                  'cancel_order_url' => NULL,
                                  'confirm_pay_url' => NULL,
                                  'appeal_url' => NULL,
                                  'reserve_lesson_url' => NULL,
                                  'comment_url' => NULL,
                            )
                        )

                    )
                )
            )
        )
    )
);

echo json_encode($response);