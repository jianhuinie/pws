<?php

require("../bootstrap.php");

$schedule = file_get_contents("./json/schedule.json");

render(
    "student_center/schedule",
    array(
        "tpl_data" => array(
            "huike" => array(
                "is_huike_student" => 1,
                "org_url" => 'http://www.genshuixue.com'
            ),
            "lessons" => [
                array(
                    "lessons" => [
                        array(
                            "lesson" => array(
                                "id" => "22735250",
                                "serial_number" => "160930947169",
                                "user_id" => "851858",
                                "student_user_id" => "851858",
                                "teacher_user_id" => "825679",
                                "reserve_role" => null,
                                "pay_type" => null,
                                "order_id" => null,
                                "order_info_id" => "4763266",
                                "purchase_id" => "1116093064592342",
                                "room_no" => null,
                                "status" => 10,
                                "reserve_type" => "1",
                                "start_time" => "2017-4-26 00:00:00",
                                "end_time" => "2017-4-27 00:30:00",
                                "length" => "30",
                                "rating" => null,
                                "cancel_reason" => null,
                                "cancel_reason_text" => null,
                                "canceld_at" => null,
                                "comment" => "",
                                "created_at" => "2016-09-30 10:57:33",
                                "updated_at" => "2016-09-30 10:57:33",
                                "paid_at" => null,
                                "auto_pay_deadline" => "2016-10-03 00:30:00",
                                "ip" => "36.110.63.220",
                                "confirm_ip" => null,
                                "note" => null,
                                "type" => "1",
                                "class_course_number" => null,
                                "schedule_id" => null,
                                "s_update_reserve_times" => null,
                                "area_id" => "0",
                                "address" => "海淀",
                                "offline_poi" => array(
                                    "lng" => "",
                                    "lat" => ""
                                ),
                                "class_type" => "0",
                                "client" => "1",
                                "organization_id" => null,
                                "use_plat_ensure" => "1",
                                "poid" => "0",
                                "display_status" => 10,
                                "consume_hours" => 0.5,
                                "appeal_result_text" => "",
                                "location" => "海淀",
                                "online_data" => null,
                                "playback" => false,
                                "media_expire" => "",
                                "cloud_playback" => false,
                                "cloud_playback_url" => "",
                                "cloud_playback_expire" => ""
                            ),
                            "user" => array(
                                "id" => "851858",
                                "number" => "940459288",
                                "im_online_status" => 1,
                                "user_id" => "851858",
                                "display_name" => "一五零一一五",
                                "realname" => "一五零一一五",
                                "nickname" => "",
                                "mobile" => "15011111115",
                                "private_domain" => "940459288",
                                "sex" => "0",
                                "email" => null,
                                "avatar" => "http://img.gsxservice.com/2011383_e0gumovs.jpeg",
                                "role" => 0,
                                "area_id" => "17041408",
                                "private_protected" => 0,
                                "short_introduce" => "",
                                "qreserve_sign" => 1
                            ),
                            "purchase" => array(
                                "id" => "5268208",
                                "purchase_id" => "1116093064592342",
                                "pay_type" => "30:0.01",
                                "status" => "1",
                                "user_id" => "851858",
                                "user_name" => "一五零一一五",
                                "teacher_user_id" => "825679",
                                "teacher_user_name" => "曼曼",
                                "total_prices" => "1.00",
                                "pay_money" => "0.01",
                                "total_fee" => "0.01",
                                "real_pay_type" => "bank_type=CMB_DEBIT|fee_type=CNY|",
                                "trade_no" => "4002122001201609305318358983",
                                "trade_info" => "openid=oUeiOjmk03Exp5ASJEOYEkBzTufc|",
                                "create_time" => "2016-09-30 09:56:18",
                                "update_time" => "2016-09-30 09:57:16",
                                "tid" => "1",
                                "avalid" => "0",
                                "compaign_id" => null,
                                "activity_account_id" => "0",
                                "course_type" => "1",
                                "course_id" => "471182",
                                "pre_pay_money" => "1.00",
                                "update_pay_money_time" => "2016-09-30 09:56:34",
                                "course_number" => "404483625007",
                                "combo_id" => "0",
                                "ip" => "36.110.63.220",
                                "except_coupon_money" => "0.01",
                                "activity_source_user_role" => "0",
                                "quick_pay_type" => "0",
                                "pay_time" => "2016-09-30 09:57:16",
                                "third_type_ext" => "0",
                                "expire_time" => "2016-10-07 09:56:18",
                                "organization_id" => null,
                                "use_plat_ensure" => "1",
                                "parent_purchase_id" => "0",
                                "activity_type" => "1",
                                "parent_purchase_type" => "0",
                                "is_join_divide" => "0",
                                "divide_id" => "0",
                                "is_applestore_pay" => "0",
                                "divide_applestore_money" => "0.00",
                                "is_self_share" => "0",
                                "is_sandbox" => "0",
                                "channel_id" => "",
                                "is_coin_pay" => "0",
                                "poid" => "0",
                                "product_type" => "0",
                                "rate" => "0.007",
                                "poundage" => "0.01",
                                "c_flag" => "1",
                                "market_activity_id" => "0",
                                "course_name" => "国际公法",
                                "hours" => "1.00",
                                "lesson_way" => "8",
                                "price" => "1.00",
                                "discount" => "10",
                                "real_student" => "",
                                "location" => "北京朝阳区海淀",
                                "subject_id" => "863",
                                "is_self" => "1",
                                "area_id" => "0",
                                "address" => "海淀"
                            ),
                            "operation" => array(
                                "label" => "待老师确认",
                                "actions" => array(
                                    "cancel_classroom" => array(
                                        "action" => "/lesson/teacherCancelLesson",
                                        "data" => array(
                                            "lesson_id" => "160930947169"
                                        ),
                                        "name" => "cancel_classroom",
                                        "is_primary" => false,
                                        "disabled" => false
                                    ),
                                    "enter_classroom" => array(
                                        "action" => "/live/lesson?serial_number=161026705590",
                                        "data" => array(
                                            "lesson_id" => "160930947169"
                                        ),
                                        "name" => "enter_classroom",
                                        "disabled" => false,
                                        "is_primary" => false
                                    ),
                                    "accept_request" => array(
                                        "action" => "/lesson/teacherConfirmReserve",
                                        "data" => array(
                                            "lesson_id" => "160930947169"
                                        ),
                                        "name" => "accept_request",
                                        "is_primary" => false,
                                        "disabled" => false
                                    ),
                                    "modify_time" => array(
                                        "action" => null,
                                        "data" => array(
                                            "max_hours" => 0.5,
                                            "avatar" => "http://img.gsxservice.com/2011383_e0gumovs.jpeg",
                                            "user_name" => "一五零一一五",
                                            "display_name" => "一五零一一五",
                                            "course_name" => "国际公法",
                                            "lesson_id" => "160930947169",
                                            "purchase_id" => "1116093064592342",
                                            "start_time" => "2016-10-02 00:00:00",
                                            "end_time" => "2016-10-02 00:30:00",
                                            "update_reserve_times" => null,
                                            "disabled" => 0
                                        ),
                                        "name" => "modify_time"
                                    )
                                ),
                                "countdown" => []
                            )
                        )
                    ],
                    "start_time" => "2016-10-02 00:00:00",
                    "type" => null,
                    "grouped" => false
                )
            ]
        ),
    )
);
