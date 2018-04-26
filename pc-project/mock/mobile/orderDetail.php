<?php

require("../bootstrap.php");

render(
    "mobile/orderDetail",
    array(

        "tpl_data" => array(

            "purchase" => array(

                "id" => "5",
                'avatar' => 'http://img.postwhy.com/2011/507-082646.jpg',
                "purchase_id" => "114082832891152",
                "pay_type" => "0",
                "status" => "pay_failed",
                "user_id" => "90",
                "user_name" => "丁韵",
                "teacher_user_name" => "asfasf",
                "customer_id" => "45",
                "customer_name" => "",
                "total_prices" => "1828814.00",
                "rest_prices" => "1000",
                "pay_money" => "548644.20",
                "total_fee" => "0.00",
                "real_pay_type" => "pay type",
                "trade_no" => "",
                "trade_info" => "siteostemporaeumdol",
                "trade_info_cut" => "一二三四",
                "create_time" => "2014-08-28 17:37:47",
                "update_time" => "2014-08-28 17:37:47",
                "tid" => "2",
                "avalid" => "0",
                "course_id" => "162",
                "course_name" => "一二三四五六七八九十一二三四五六",
                "course_name_cut" => "一二三...",
                "hours" => "806",
                "lesson_way" => "8",
                "price" => "2269.00",
                "discount" => "0.3",
                "real_student" => "丁韵",
                "location" => "ipsumdebitis",
                "note" => "fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
                "did" => "5",
                "left_hours" => 806,
                "used_hours" => 0,
                "order_status" => 10,
                "balance" => 1828814,
                "buyer_id" => "90",
                "progress" => "1800",
                "seller_id" => "45",
                "rest_prices" => "19000.00",
                "order_url" => array(
                    "order_detail_url" => NULL,
                    "cancel_order_url" => "/order/cancelOrder",
                    "confirm_pay_url" => NULL,
                    "appeal_url" => NULL,
                    "reserve_lesson_url" => "/order/studentOrderDetail",
                    "pay_again_url" => "/order/studentOrderDetail",
                    //"comment_url" => "/order/studentCommentOrder",
                    "reserve_lesson_status" => 1,
                    //"pay_again_url" => "pay_again_url",
                )

            ),

            "lessons" => array(
                array(
                    "id" => "1",
                    "time_info" => "周日上午",
                    "serial_number" => "140828475716",
                    "user_id" => "117",
                    "teacher_user_id" => "45",
                    "order_id" => "5",
                    "order_info_id" => "1",
                    "purchase_id" => "114082832891152",
                    "status" => 40,
                    "start_time" => "2014-08-25 20:30:00",
                    "end_time" => "2014-08-25 21:30:00",
                    "length" => "60",
                    "rating" => null,
                    "cancel_reason" => null,
                    "cancel_reason_text" => null,
                    "canceld_at" => null,
                    "comment" => "",
                    "created_at" => "2014-08-28 17:37:47",
                    "updated_at" => "2014-08-28 17:37:47",
                    "paid_at" => null,
                    "consume_hours" => 2,
                    "operation" => array(
                        "label" => "待确认支付",
                        "actions" => array(
                            array(
                                "action" => "/order/确认支付",
                                "data" => array(
                                    "lesson_id" => "140828475716"
                                ),
                                "name" => "pay",
                                "is_primary" => false
                            ),
                            array(
                                "action" => "/order/取消课程",
                                "data" => array(
                                    "lesson_id" => "140828475716"
                                ),
                                "name" => "cancel_classroom",
                                "is_primary" => false
                            )
                        ),
                        "countdown" => array(
                            "tip" => "距自动支付",
                            "expired_at" => 1409059800
                        )
                    )
                )
            ),

            "user" => array(
                "id" => "45",
                "number" => '370879048',
                "realname" => null,
                "nickname" => null,
                "avatar" => "http://img.postwhy.com/2011/507-082646.jpg",
                "mobile" => "13712133083",
                "mobile_verify" => null,
                "email" => null,
                "email_verify" => null,
                "login_password" => null,
                "pay_password" => null,
                "usertype" => null,
                "edu_back" => null,
                "sex" => null,
                "birthday" => null,
                "register_date" => null,
                "last_action_time" => null,
                "update_account_time" => null,
                "area_id" => null,
                "location_addr" => null,
                "balance" => null,
                "inviter_user_id" => null,
                "integrity" => null,
                "verify_status" => null,
                "user_status" => null,
                "graduation_school" => null,
                "graduation_major" => null,
                "interests" => null,
                "specialities" => null,
                "constellation" => null,
                "display_name" => "[?¨橙子|;[尐¨橘子"
            ),


            "comment" => array(
                "date" => "2010-01-01",
                "time" => "16:20",
                "student_comment" => "老师讲的不错！",
                "teacher_comment" => "这个学生很nice！"
            )

        ),
        "user_data" => array(
            "avatar" => "http://edu.kunming.cn/index/content/attachement/jpg/site323/20100723/00016c42376d0db3965910.jpg",
            "user_type" => '0',
            "user_name" => "shshshshshshs",
            "user_name_cut" => "沈佳宜...",
            "user_number" => "123123123"
        )

    )
);