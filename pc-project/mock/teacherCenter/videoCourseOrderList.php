<?php
require("../bootstrap.php");

$tpl_data = array(
    "orders_succ" => array(
        array(
            "is_coin_pay" => 1,
            "id" => "8421",
            "purchase_id" => "1115012666781872",
            "pay_type" => "1:30",
            "status" => "0",
            "user_id" => "134547",
            "display_name" => "asdfsafd",
            "teacher_user_id" => "135000",
            "teacher_user_name" => "周伟",
            "total_prices" => "30.00",
            "pay_money" => "30.00",
            "income" => "20",
            "divide_teacher_money" => "20",
            "total_fee" => "0.00",
            "real_pay_type" => null,
            "trade_no" => null,
            "trade_info" => null,
            "create_time" => "2015-01-26 14:56:34",
            "update_time" => "2015-01-27 14:12:20",
            "tid" => "1",
            "avalid" => "0",
            "compaign_id" => null,
            "activity_account_id" => "0",
            "course_id" => "1",
            "pre_pay_money" => "-1.00",
            "update_pay_money_time" => "0000-00-00 00:00:00",
            "course_number" => "4294967295",
            "course_type" => "3",
            "order_detail_url" => "/order/teacherOrderDetail?purchase_id=1115012666781872"
        ),
        array(
            "is_coin_pay" => 0,
            "id" => "8421",
            "purchase_id" => "1115012666781872",
            "pay_type" => "1:30",
            "status" => "0",
            "user_id" => "134547",
            "display_name" => "asdfsafd",
            "teacher_user_id" => "135000",
            "teacher_user_name" => "周伟",
            "total_prices" => "30.00",
            "pay_money" => "30.00",
            "income" => "20",
            "divide_teacher_money" => "20",
            "total_fee" => "0.00",
            "real_pay_type" => null,
            "trade_no" => null,
            "trade_info" => null,
            "create_time" => "2015-01-26 14:56:34",
            "update_time" => "2015-01-27 14:12:20",
            "tid" => "1",
            "avalid" => "0",
            "compaign_id" => null,
            "activity_account_id" => "0",
            "course_id" => "1",
            "pre_pay_money" => "-1.00",
            "update_pay_money_time" => "0000-00-00 00:00:00",
            "course_number" => "4294967295",
            "course_type" => "3",
            "order_detail_url" => "/order/teacherOrderDetail?purchase_id=1115012666781872"
        )
    ),
    "orders_inc" => array(
        array(
            "is_coin_pay" => 1,
            "id" => "8421",
            "purchase_id" => "1115012666781872",
            "pay_type" => "1:30",
            "status" => "0",
            "user_id" => "134547",
            "display_name" => "liucong",
            "teacher_user_id" => "135000",
            "teacher_user_name" => "周伟",
            "total_prices" => "30.00",
            "pay_money" => "30.00",
            "income" => "20",
            "divide_teacher_money" => "20",
            "total_fee" => "0.00",
            "real_pay_type" => null,
            "trade_no" => null,
            "trade_info" => null,
            "create_time" => "2015-01-26 14:56:34",
            "update_time" => "2015-01-27 14:12:20",
            "tid" => "1",
            "avalid" => "0",
            "compaign_id" => null,
            "activity_account_id" => "0",
            "course_id" => "1",
            "pre_pay_money" => "-1.00",
            "update_pay_money_time" => "0000-00-00 00:00:00",
            "course_number" => "4294967295",
            "course_type" => "3",
            "order_detail_url" => "/order/teacherOrderDetail?purchase_id=1115012666781872"
        )
    )
);
$response = array(
    "code" => 0,
    "data" => array(
        "tpl" => array(
            "order_list" => fetch('teacher_center/component/videoCourseOrderList', array("tpl_data" => $tpl_data))
        )
    )
);

echo json_encode($response);