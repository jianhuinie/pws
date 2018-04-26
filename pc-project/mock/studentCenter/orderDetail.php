<?php

require("../bootstrap.php");

render(
    "student_center/orderDetail",
    array(
        "tpl_data" => [
            "is_suspend" => 1, // 0=>停课后恢复,1=>停课,2=>从未被停过课
            "purchase" => [
                "id"=> null,
                "country" => '美国',
                "course_code" => '432FDS', // 课程编号
                "retire_flag" => "100",
                "rest_hours" => 0,
                "commented_at" => null,
                "purchase_id"=> "1115100962327395",
                "pay_type"=> "0",
                "status"=> "apply_refunding",
                "user_id"=> "345084",
                "user_name"=> "186****5758",
                "teacher_user_id"=> "0",
                "teacher_user_name"=> null,
                "total_prices"=> "0.10",
                "pay_money"=> "0.10",
                "refund_way" => 1,
                "refund_money"=> 1,
                "total_fee"=> "0.00",
                "trade_no"=> null,
                "trade_info"=> "",
                "create_time"=> "2015-10-09 09=>40=>31",
                "update_time"=> "2015-10-09 09=>40=>31",
                "real_pay_type"=> null,
                "tid"=> "1",
                "avalid"=> "0",
                "compaign_id"=> null,
                "activity_account_id"=> "0",
                "course_type"=> "12", // 机构X课 11，12
                "course_id"=> "232",
                "pre_pay_money"=> "-1.00",
                "update_pay_money_time"=> "0000-00-00 00=>00=>00",
                "course_number"=> "3710195304",
                "combo_id"=> "0",
                "ip"=> "123.56.4.9",
                "except_coupon_money"=> "0.10",
                "activity_source_user_role"=> "0",
                "quick_pay_type"=> "0",
                "pay_time"=> null,
                "organization_id"=> "3499",
                "third_type_ext"=> "1",
                "expire_time"=> "0000-00-00 00=>00=>00",
                "use_plat_ensure"=> "0",
                "parent_purchase_id"=> "0",
                "appstore_money"=> null,
                "video_payment_time"=> null,
                "course_name"=> "3810测测测",
                "hours"=> 0,
                "lesson_way"=> "4",
                "price"=> 0,
                "discount"=> "0",
                "real_student"=> "186****5758",
                "location"=> "北京市北京市海淀区软件园二号路",
                "note"=> "",
                "subject_id"=> "978",
                "is_self"=> "1",
                "area_id"=> "17040384",
                "address"=> "北京市北京市海淀区软件园二号路",
                "offline_poi"=> [
                    "lng"=> "116.30251374924",
                    "lat"=> "40.057797153608"
                ],
                "fenqi_data" => [
                    "fenqi_total_money" => 1023, //分期总额
                    "fenqi_need_all_money" => 1023.3, //支付宝总的还款金额
                    "every_periods_repayment" => 123, //每期还款
                    "fee_money" => 22,//利息
                    "plat_fee_money" => 1,//手续费
                    "periods" => 12, //分期期数
                    "fenqi_msg" => '含利息'
                ],
                "freq"=> "3",
                "ext_info"=> array(
                    "id" => "338",
                    "org_id" => "3147",
                    "org_class_id" => "202",
                    "defined_number" => "",
                    "number" => "48514918694011",
                    "name" => "X课优惠券测试1V1",
                    "start_date" => "2016-11-23 00:00:00",
                    "end_date" => "2016-11-30 00:00:00",
                    "plan" => "",
                    "teacher_uid" => "0",
                    "address" => "",
                    "price" => "1.00",
                    "price_type" => "1",
                    "class_length" => "60",
                    "class_count" => "0",
                    "plan_student" => "200",
                    "last_time" => null,
                    "min_student" => "0",
                    "add_percent" => "0",
                    "max_student" => "200",
                    "auto_confirm" => "0",
                    "video_valid_days" => "180",
                    "status" => "2",
                    "create_time" => "2016-11-23 19:43:10",
                    "update_time" => "2016-11-23 19:46:17",
                    "parent_course_number" => "46732353079032",
                    "course_photo" => "http://test-img.gsxservice.com/786971_wnlndt4b.jpg",
                    "course_type" => 11,
                    "lesson_way" => "student",
                    "org_profile" => array(
                        "id" => "373580819",
                        "name" => "篮球俱乐部",
                        "avatar" => "https://imgs.genshuixue.com/627526_90vijkph.jpeg",
                        "number" => "373580819",
                        "mobile" => "02177777777",
                        "score" => "5.0",
                        "location" => "北京",
                        "comments_cnt" => "1",
                        "brief" => "一二三四五六七八九十一",
                        "tags" => array(
                            array(
                                "name" => "sf"
                            ),
                            array(
                                "name" => "sfs"
                            )
                        ),
                        "domain" => "373580819",
                        "extension" => "140435",
                        "area_id" => "17039360",
                        "is_valid" => "1",
                        "org_id" => "3147",
                        "name_cut" => null,
                        "mask_mobile" => "021****7777"
                    )
                ),
                "lesson_way_name"=> "线下授课",
                "did"=> "65988",
                "has_change_money"=> 0,
                "original_price"=> 0,
                "pay_status"=> 0,
                "freeze_length"=> 0,
                "total_length"=> 60,
                "rest_length"=> 0,
                "progress"=> 0,
                "used_prices"=> 0,
                "rest_prices"=> '0.00',
                "comment_flag"=> -1,
                "updated_at"=> null,
                "canceld_at"=> '2017-02-15 10:26:05',
                "paid_at"=> null,
                "expired_length"=> -63614388447,
                "class_course_number"=> "3710195304",
                "appeal_result_text"=> "",
                "teacher_user_number"=> '34121',
                "qreserve_sign"=> 0,
                "student_no"=> null,
                "order_info"=> [
                    "created_at"=> null
                ],
                "step"=> 1,
                "trial_step"=> 2,
                "order_status"=> -1,
                "order_url"=> [
                    "refund_order_url" => "/pay/refund?purchase_id=1115100962327395",
                    "order_detail_url" => "/order/studentOrderDetail?purchase_id=1115100962327395",
                    "order_detail_url_new" => "/student_center/order_detail?purchase_id=1115100962327395",
                    "cancel_order_url" => "/order/studentCancelOrder?purchase_id=1115100962327395",
                    "confirm_pay_url" => "/pay/payProductPurchase?purchase_id=1115100962327395",
                    "appeal_url"=> null,
                    "reserve_lesson_url"=> null,
                    "comment_url"=> null
                ],
                "charge_money"=> 0.1
            ],
            "progress"=> [
                "current"=> "sign_up",
                "steps"=> [
                    "sign_up"=> [
                        "key"=> "sign_up",
                        "display_name"=> "报名班课",
                        "time_ts"=> 1444354831
                    ],
                    "pay"=> [
                        "key"=> "pay",
                        "display_name"=> "支付班课",
                        "time_ts"=> null
                    ],
                    "teaching"=> [
                        "key"=> "teaching",
                        "display_name"=> "班课进行",
                        "time_ts"=> null
                    ],
                    "comment"=> [
                        "key"=> "comment",
                        "display_name"=> "评价老师",
                        "time_ts"=> null
                    ]
                ]
            ],
            "user" => [
                "avatar" => "http=>//test-img.gsxservice.com/12277_8nkxekyo.png",
                "mobile" => "13712133083",
                "number" => '1234',
                "im_online_status" => 1,
                "country" => '美国',
                "address" => 'asdasdasdas',
                "display_name" => "[?¨橙子|;[尐¨橘子",
                "private_domain" => 'xxxx',
                "has_mobile" => true,
                "call_info" => array(
                    "call_type" => "2"
                ),
                "im_info" => array(
                    "user_role" => "2"
                )
            ],
            "organization" => [
                "id"=> "331802979",
                "name"=> "周佳佳",
                "avatar"=> "http=>//test-img.gsxservice.com/370659_7cpsaoue.jpg",
                "number"=> "331802979",
                "mobile"=> "13611093523",
                "score"=> "4.8",
                "location"=> "北京",
                "comments_cnt"=> "0",
                "brief"=> "我是无敌小美女哈哈哈哈哈哈哈哈哈哈哈",
                "tags"=> [],
                "domain"=> "331802979",
                "org_id"=> "3499",
                'extension' => '400-516-516 转 123123', // 400电话
                'city_filter' => 1, // 1西安、武汉 0其他城市 － 400试点城市
            ],
            "organization_data" => [ // 机构信息
                'teacher_list' => [
                    '1' => [
                        "avatar" => "http=>//test-img.gsxservice.com/12277_8nkxekyo.png",
                        "mobile" => "13712133083",
                        "number" => '1234',
                        "country" => '美国',
                        "address" => 'asdasdasdas',
                        "display_name" => "哈哈哈哈哈老师",
                        "private_domain" => 'xxxx',
                        "organization_id" => '1231',
                        'organization' => [
                            'name' => '金宇机构',
                            'domain' => '21312312'
                        ],
                        "call_info" => array(
                            "call_type" => "2"
                        ),
                        "im_info" => array(
                            "user_role" => "2"
                        )
                    ]/*,

                    '2' => [
                        "avatar" => "http=>//test-img.gsxservice.com/12277_8nkxekyo.png",
                        "mobile" => "13712133083",
                        "number" => '1234',
                        "address" => 'asdasdasdas',
                        "display_name" => "121232",
                        "private_domain" => 'xxxx'
                    ],

                    '3' => [
                        "avatar" => "http=>//test-img.gsxservice.com/12277_8nkxekyo.png",
                        "mobile" => "13712133083",
                        "number" => '1234',
                        "address" => 'asdasdasdas',
                        "display_name" => "121232",
                        "private_domain" => 'xxxx'
                    ],

                    '4' => [
                        "avatar" => "http=>//test-img.gsxservice.com/12277_8nkxekyo.png",
                        "mobile" => "13712133083",
                        "number" => '1234',
                        "address" => 'asdasdasdas',
                        "display_name" => "121232",
                        "private_domain" => 'xxxx'
                    ],

                    '5' => [
                        "avatar" => "http=>//test-img.gsxservice.com/12277_8nkxekyo.png",
                        "mobile" => "13712133083",
                        "number" => '1234',
                        "address" => 'asdasdasdas',
                        "display_name" => "121232",
                        "private_domain" => 'xxxx'
                    ]*/
                ],
                'organization' => [
                    'name' => '金宇机构',
                    "mobile"=> "13611093523",
                    "number" => '3456432134',
                    "im_online_status" => true,
                    'domain' => '21312312',
                    "extension" => "4000-122-166 转 123456",
                    "country" => '美国',
                    "location" => "武汉",
                    "city_filter" => 1,
                    "avatar"=> "http=>//test-img.gsxservice.com/370659_7cpsaoue.jpg",
                ]
            ],
            "class_fire_record" => array( // 课消记录(机构X课专用)
                array(
                    "id" => "1",
                    "purchase_id" => "123",
                    "user_id" => "342110",
                    "course_number" => "123",//课程编号
                    "serial_number" => "1234234345",//唯一编号
                    "grade_number" => "1",//班级编号
                    "order_money" => "10.00",//订单总金额
                    "confirm_money" => "5.00",//课消金额
                    "confirm_status" => "0",//课消状态，0:待确认 1:消课成功 2:消课失败
                    "create_time" => "2016-11-08 17:01:30",//课消时间
                    "update_time" => "2016-11-08 17:01:33",
                    "class_count" => "1",//消课课时
                    "schedule_name" => "",//课节名称
                    "start_time" => null,//课节开始时间
                    "end_time" => null,//课节结束时间
                ),
                array(
                    "id" => "1",
                    "purchase_id" => "123",
                    "user_id" => "342110",
                    "course_number" => "123",//课程编号
                    "serial_number" => "1234234345",//唯一编号
                    "grade_number" => "1",//班级编号
                    "order_money" => "10.00",//订单总金额
                    "confirm_money" => "5.00",//课消金额
                    "confirm_status" => "1",//课消状态，0:待确认 1:消课成功 2:消课失败
                    "create_time" => "2016-11-08 17:01:30",//课消时间
                    "update_time" => "2016-11-08 17:01:33",
                    "class_count" => "1",//消课课时
                    "schedule_name" => "",//课节名称
                    "start_time" => null,//课节开始时间
                    "end_time" => null,//课节结束时间
                ),
                array(
                    "id" => "2",
                    "purchase_id" => "123",
                    "user_id" => "342110",
                    "course_number" => "123",
                    "serial_number" => "2232342343",
                    "grade_number" => "1",
                    "order_money" => "10.00",
                    "confirm_money" => "5.00",
                    "confirm_status" => "2",
                    "create_time" => "2016-11-08 17:03:30",
                    "update_time" => "2016-11-08 17:03:33",
                    "class_count" => "1",
                    "schedule_name" => "",//课节名称
                    "start_time" => null,//课节开始时间
                    "end_time" => null,//课节结束时间
                )
            ),
            "lesson_count" => 11, // 当lesson_count > 10,可用latest_lesson
            "latest_lesson" => [
                "id" => "1",
                "use_plat_ensure" => "0",
                "serial_number" => "140828475716",
                "user_id" => "117",
                "teacher_user_id" => "45",
                "order_id" => "5",
                "order_info_id" => "1",
                "class_count" => 2,
                "purchase_id" => "114082832891152",
                "status" => 81,
                "display_status" => 40,
                "start_time" => "2014-08-25 20=>30=>00",
                "end_time" => "2014-08-25 21=>30=>00",
                "teacher_user_name" => "朱磊从前有座山",
                "length" => "60",
                "rating" => null,
                "cancel_reason" => null,
                "cancel_reason_text" => null,
                "canceld_at" => null,
                "comment" => "",
                "created_at" => "2014-08-28 17 =>37 =>47",
                "updated_at" => "2014-08-28 17 =>37 =>47",
                "paid_at" => null,
                "consume_hours" => 2,
                "teacher_number" => "1231231",
                "operation" => array(
                    "label" => "待确认支付",
                    "actions" => array(
                        "pay" => array(
                            "action" => "/order/确认支付",
                            "data" => array(
                                "lesson_id" => "140828475716"
                            ),
                            "name" => "pay",
                            "is_primary" => false
                        ),
                        "enter_classroom" => array(
                            "action" => "/order/确认支付",
                            "data" => array(
                                "lesson_id" => "140828475716"
                            ),
                            "disabled" => 0,
                            "name" => "enter_classroom",
                            "is_primary" => false
                        ),
                        "cancel_classroom" => array(
                            "action" => "/order/取消课程",
                            "data" => array(
                                "lesson_id" => "140828475716"
                            ),
                            "name" => "cancel_classroom",
                            "is_primary" => false
                        ),
                        "modify_time" => array(
                            "action" => "/order/修改时间",
                            "data" => array(
                                "lesson_id" => "140828475716"
                            ),
                            "name" => "modify_time"
                        ),
                        "appeal" => array(
                           "action"=> "/order/appeal",
                           "data"=> array(
                               "lesson_id"=>"1314124343",
                           ),
                           "name"=> "appeal"
                        )
                    ),
                    "countdown" => array(
                        "tip" => "距自动支付",
                        "expired_at" => 1409059800
                    )
                )
            ],
            "lessons" => [
                [
                    "id" => "1",
                    "use_plat_ensure" => "0",
                    "serial_number" => "140828475716",
                    "user_id" => "117",
                    "teacher_user_id" => "45",
                    "order_id" => "5",
                     "class_count" => 2,
                    "order_info_id" => "1",
                    "purchase_id" => "114082832891152",
                    "status" => 81,
                    "display_status" => 40,
                    "start_time" => "2014-08-25 20=>30=>00",
                    "end_time" => "2014-08-25 21=>30=>00",
                    "teacher_user_name" => "朱磊",
                    "length" => "60",
                    "rating" => null,
                    "cancel_reason" => null,
                    "cancel_reason_text" => null,
                    "canceld_at" => null,
                    "comment" => "",
                    "created_at" => "2014-08-28 17 =>37 =>47",
                    "updated_at" => "2014-08-28 17 =>37 =>47",
                    "paid_at" => null,
                    "consume_hours" => 2,
                    "teacher_number" => "1231231",
                    "operation" => array(
                        "label" => "待确认支付",
                        "actions" => array(
                            "pay" => array(
                                "action" => "/order/确认支付",
                                "data" => array(
                                    "lesson_id" => "140828475716"
                                ),
                                "name" => "pay",
                                "is_primary" => false
                            ),
                            "enter_classroom" => array(
                                "action" => "/order/确认支付",
                                "data" => array(
                                    "lesson_id" => "140828475716"
                                ),
                                "disabled" => 0,
                                "name" => "enter_classroom",
                                "is_primary" => false
                            ),
                            "cancel_classroom" => array(
                                "action" => "/order/取消课程",
                                "data" => array(
                                    "lesson_id" => "140828475716"
                                ),
                                "name" => "cancel_classroom",
                                "is_primary" => false
                            ),
                            "modify_time" => array(
                                "action" => "/order/修改时间",
                                "data" => array(
                                    "lesson_id" => "140828475716"
                                ),
                                "name" => "modify_time"
                            ),
                            "appeal" => array(
                               "action"=> "/order/appeal",
                               "data"=> array(
                                   "lesson_id"=>"1314124343",
                               ),
                               "name"=> "appeal"
                            )
                        ),
                        "countdown" => array(
                            "tip" => "距自动支付",
                            "expired_at" => 1409059800
                        )
                    )
                ],
                [
                    "id" => "1",
                    "use_plat_ensure" => "0",
                    "serial_number" => "140828475716",
                    "user_id" => "117",
                    "teacher_user_id" => "45",
                    "order_id" => "5",
                    "class_count" => 2,
                    "order_info_id" => "1",
                    "purchase_id" => "114082832891152",
                    "status" => 81,
                    "display_status" => 40,
                    "start_time" => "2014-08-25 20=>30=>00",
                    "end_time" => "2014-08-25 21=>30=>00",
                    "teacher_user_name" => "朱磊",
                    "length" => "60",
                    "rating" => null,
                    "cancel_reason" => null,
                    "cancel_reason_text" => null,
                    "canceld_at" => null,
                    "comment" => "",
                    "created_at" => "2014-08-28 17 =>37 =>47",
                    "updated_at" => "2014-08-28 17 =>37 =>47",
                    "paid_at" => null,
                    "consume_hours" => 2,
                    "teacher_number" => "1231231",
                    "operation" => array(
                        "label" => "待确认支付",
                        "actions" => array(
                            "pay" => array(
                                "action" => "/order/确认支付",
                                "data" => array(
                                    "lesson_id" => "140828475716"
                                ),
                                "name" => "pay",
                                "is_primary" => false
                            ),
                            "enter_classroom" => array(
                                "action" => "/order/确认支付",
                                "data" => array(
                                    "lesson_id" => "140828475716"
                                ),
                                "disabled" => 0,
                                "name" => "enter_classroom",
                                "is_primary" => false
                            ),
                            "cancel_classroom" => array(
                                "action" => "/order/取消课程",
                                "data" => array(
                                    "lesson_id" => "140828475716"
                                ),
                                "name" => "cancel_classroom",
                                "is_primary" => false
                            ),
                            "modify_time" => array(
                                "action" => "/order/修改时间",
                                "data" => array(
                                    "lesson_id" => "140828475716"
                                ),
                                "name" => "modify_time"
                            ),
                            "appeal" => array(
                               "action"=> "/order/appeal",
                               "data"=> array(
                                   "lesson_id"=>"1314124343",
                               ),
                               "name"=> "appeal"
                            )
                        ),
                        "countdown" => array(
                            "tip" => "距自动支付",
                            "expired_at" => 1409059800
                        )
                    )
                ],
                [
                    "id" => "1",
                    "use_plat_ensure" => "0",
                    "serial_number" => "140828475716",
                    "user_id" => "117",
                    "teacher_user_id" => "45",
                    "order_id" => "5",
                    "class_count" => 2,
                    "order_info_id" => "1",
                    "purchase_id" => "114082832891152",
                    "status" => 81,
                    "display_status" => 40,
                    "start_time" => "2014-08-25 20=>30=>00",
                    "end_time" => "2014-08-25 21=>30=>00",
                    "teacher_user_name" => "朱磊",
                    "length" => "60",
                    "rating" => null,
                    "cancel_reason" => null,
                    "cancel_reason_text" => null,
                    "canceld_at" => null,
                    "comment" => "",
                    "created_at" => "2014-08-28 17 =>37 =>47",
                    "updated_at" => "2014-08-28 17 =>37 =>47",
                    "paid_at" => null,
                    "consume_hours" => 2,
                    "teacher_number" => "1231231",
                    "operation" => array(
                        "label" => "待确认支付",
                        "actions" => array(
                            "pay" => array(
                                "action" => "/order/确认支付",
                                "data" => array(
                                    "lesson_id" => "140828475716"
                                ),
                                "name" => "pay",
                                "is_primary" => false
                            ),
                            "enter_classroom" => array(
                                "action" => "/order/确认支付",
                                "data" => array(
                                    "lesson_id" => "140828475716"
                                ),
                                "disabled" => 0,
                                "name" => "enter_classroom",
                                "is_primary" => false
                            ),
                            "cancel_classroom" => array(
                                "action" => "/order/取消课程",
                                "data" => array(
                                    "lesson_id" => "140828475716"
                                ),
                                "name" => "cancel_classroom",
                                "is_primary" => false
                            ),
                            "modify_time" => array(
                                "action" => "/order/修改时间",
                                "data" => array(
                                    "lesson_id" => "140828475716"
                                ),
                                "name" => "modify_time"
                            ),
                            "appeal" => array(
                               "action"=> "/order/appeal",
                               "data"=> array(
                                   "lesson_id"=>"1314124343",
                               ),
                               "name"=> "appeal"
                            )
                        ),
                        "countdown" => array(
                            "tip" => "距自动支付",
                            "expired_at" => 1409059800
                        )
                    )
                ]
            ],
            "pay" => [
                "balance"=> 0,
                "coupon"=> 0,
                "prize"=> 0,
                "change"=> 0,
                "real_money"=> "0.10"
            ],
            'teacher_comment' => [
                [
                    "desc_match" => "3",
                    "teach_result" => "2",
                    "service_attitude" => "5",
                    "face_type" => "2",
                    "info" => "这是我对邹洋老师的评论",
                    "teacher_user_name" => "邹洋1",
                    "create_time" => "2014-08-25 20=>30=>00",
                    "total_score" => 2
                ],
                [
                    "desc_match" => "3",
                    "teach_result" => "2",
                    "service_attitude" => "5",
                    "face_type" => "2",
                    "info" => "这是我对邹洋老师的评论",
                    "teacher_user_name" => "邹洋",
                    "create_time" => "2014-08-25 20=>30=>00",
                    "total_score" => 2
                ]
            ],
            'student_comment' => [
                [
                    "desc_match" => "3",
                    "teach_result" => "2",
                    "service_attitude" => "5",
                    "face_type" => "2",
                    "info" => "这是我对邹洋老师的评论",
                    "teacher_user_name" => "邹洋",
                    "create_time" => "2014-08-25 20=>30=>00",
                    "total_score" => 2
                ],
                [
                    "desc_match" => "3",
                    "teach_result" => "2",
                    "service_attitude" => "5",
                    "face_type" => "2",
                    "info" => "这是我对邹洋老师的评论",
                    "teacher_user_name" => "邹洋",
                    "create_time" => "2014-08-25 20=>30=>00",
                    "total_score" => 2
                ]
            ]
        ]
    )
);
