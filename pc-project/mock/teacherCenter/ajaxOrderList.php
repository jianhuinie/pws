<?php

require("../bootstrap.php");

$response = array(
    "code" => 0,
    "data" => array(
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
                                'customer_id' => '63',
                                'customer_name' => '杨世绍',
                                'total_prices' => '2407548.00',
                                'pay_money' => '1372302.36',
                                'total_fee' => '0.00',
                                'real_pay_type' => 'pay type',
                                'trade_no' => '',
                                'trade_info' => '一二三四五六七八',
                                'trade_info_cut' => '一二三四五...',
                                'create_time' => '2014-08-28 18:37:04',
                                'update_time' => '2014-08-28 18:37:04',
                                'tid' => '3',
                                'avalid' => '0',
                                'course_id' => '167',
                                'course_name' => '一二三四五六七八',
                                'course_name_cut' => '一二三四五...',
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
                                'order_url' =>
                                    array(
                                      'order_detail_url' => '/order/studentOrderDetail',
                                      'cancel_order_url' => NULL,
                                      'confirm_pay_url' => NULL,
                                      'appeal_url' => NULL,
                                      'reserve_lesson_url' => NULL,
                                      'comment_url' => '/order/studentCommentOrder',
                                    )
                            ),
                            array(
                                'id' => '4',
                                'purchase_id' => '114082832893440',
                                'pay_type' => '0',
                                'status' => 'pay_failed',
                                'user_id' => '27',
                                'user_name' => '秦滢思fdsa',
                                'customer_id' => '63',
                                'customer_name' => '杨世绍fdsaf',
                                'total_prices' => '2407548.00',
                                'pay_money' => '1372302.36',
                                'total_fee' => '0.00',
                                'real_pay_type' => 'pay type',
                                'trade_no' => '',
                                'trade_info' => '一二三四fdsafds五六七八',
                                'trade_info_cut' => '一二fdsafds三四五...',
                                'create_time' => '2014-08-28 18:37:04',
                                'update_time' => '2014-08-28 18:37:04',
                                'tid' => '3',
                                'avalid' => '0',
                                'course_id' => '167',
                                'course_name' => '一二三四五fdsafd六七八',
                                'course_name_cut' => '一二三fdsafds四五...',
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
                                'order_url' =>
                                    array(
                                      'order_detail_url' => '/order/studentOrderDetail',
                                      'cancel_order_url' => NULL,
                                      'confirm_pay_url' => NULL,
                                      'appeal_url' => NULL,
                                      'reserve_lesson_url' => NULL,
                                      'comment_url' => '/order/studentCommentOrder',
                                    )
                            )

                        )
                    )
                )
            )
        )
    )
);

echo json_encode($response);