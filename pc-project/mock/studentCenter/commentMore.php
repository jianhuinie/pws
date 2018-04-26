<?php

require("../bootstrap.php");

render(
    "student_center/commentMore",
    array(
        "tpl_data" => array(
            "purchase_info" => array(
                "course_type" => "4", // 1一对一 2班课 3视频课 4机构班课 5试听课
                "course_number" => "123123123123", // 新增字段班课编号
                "display_name" => '啊，从前有座山',
                "photos" => array(  // 新字段,班课图片
                    "id" => "2151",
                    "title" => "aaa",
                    "url" => "http://img.gsxservice.com/60884_sm1smgra.jpeg",
                    "width" => 781,
                    "height" => 442,
                    "create_time" => 1418977654,
                    "storage_id" => "8894"
                ),
                "id" => "49206",
                "purchase_id" => "1115090245474506",
                "pay_type" => "0",
                "status" => "wait_for_comment",
                "user_id" => "343894",
                "user_name" => "朱瑛",
                "teacher_user_id" => "342169",
                "teacher_user_name" => "小唐老师",
                "total_prices" => "0.00",
                "pay_money" => "0.00",
                "total_fee" => "0.00",
                "trade_no" => null,
                "trade_info" => "",
                "create_time" => "2015-09-02 15:46:16",
                "update_time" => "2015-09-02 15:46:16",
                "real_pay_type" => null,
                "tid" => "1",
                "avalid" => "0",
                "compaign_id" => null,
                "activity_account_id" => "0",
                "course_id" => "0",
                "pre_pay_money" => "-1.00",
                "update_pay_money_time" => "0000-00-00 00:00:00",
                "combo_id" => "0",
                "ip" => "123.150.203.98",
                "except_coupon_money" => "0.00",
                "activity_source_user_role" => "0",
                "quick_pay_type" => "0",
                "pay_time" => null,
                "organization_id" => "3210",
                "third_type_ext" => "1",
                "expire_time" => "2015-09-09 15:46:16",
                "use_plat_ensure" => "1",
                "parent_purchase_id" => "0",
                "course_name" => "试听课0.5小时",
                "hours" => 0.5,
                "lesson_way" => "2",
                "price" => 0,
                "discount" => "1",
                "real_student" => "qian",
                "location" => "",
                "note" => "在线",
                "subject_id" => "0",
                "is_self" => "1",
                "area_id" => "0",
                "address" => "",
                "offline_poi" => array(
                    "lng" => "",
                    "lat" => ""
                ),
                "freq" => "0",
                "ext_info" => "0",
                "lesson_way_name" => "在线试听",
                "did" => "63352",
                "has_change_money" => 0,
                "original_price" => 0,
                "pay_status" => 1,
                "freeze_length" => "30",
                "total_length" => "30",
                "rest_length" => 0,
                "progress" => "30",
                "used_prices" => 0,
                "rest_prices" => 0,
                "comment_flag" => "0",
                "updated_at" => "2015-09-03 17:30:02",
                "canceld_at" => null,
                "paid_at" => "2015-09-02 15:46:16",
                "expired_length" => -6695,
                "class_course_number" => "0",
                "appeal_result_text" => "",
                "teacher_user_number" => "835527078",
                "qreserve_sign" => 1,
                "student_no" => "0",
                "order_info" => array(
                    "created_at" => "2015-09-02 15:46:16"
                ),
                "step" => 4,
                "trial_step" => 5,
                "order_status" => "20",
                "order_url" => array(
                    "order_detail_url" => "/order/studentOrderDetail?purchase_id=1115090245474506",
                    "order_detail_url_new" => "/student_center/order_detail?purchase_id=1115090245474506",
                    "cancel_order_url" => null,
                    "confirm_pay_url" => null,
                    "appeal_url" => "/order/studentAppealOrder?purchase_id=1115090245474506",
                    "reserve_lesson_url" => null,
                    "comment_url" => "/comment/purchaseInfo?purchase_id=?purchase_id=1115090245474506"
                )
            ),
            "lesson_list" => array(
                array(
                    "serial_number" => "0",
                    "display_title" => "总课程",
                    "comment_status_name" => "需要上完所有课节才能评价哦",
                    "teacher_number" => "0",
                    "can_comment" => false,
                    "teacher_comment_info" => null
                ),
                array(
                    "serial_number" => "150902774352",
                    "display_title" => "课节1",
                    "comment_status_name" => "已评价",
                    "teacher_number" => "835527078",
                    "can_comment" => false,
                    "teacher_comment_info" => array(
                        "info" => 'just need to get closer just need to get closerjust need to get closerjust need to get closerjust need to get closerjust need to get closer',
                        "has_photo" => true
                    )
                ),
                array(
                    "serial_number" => "150902774352",
                    "display_title" => "课节2",
                    "comment_status_name" => "已评价",
                    "teacher_number" => "835527078",
                    "can_comment" => false,
                    "teacher_comment_info" => array(
                        "info" => 'just need to get closer',
                        "has_photo" => false
                    )
                ),
                array(
                    "serial_number" => "150902774352",
                    "display_title" => "课节3",
                    "comment_status_name" => "待评价",
                    "teacher_number" => "835527078",
                    "can_comment" => true,
                    "teacher_comment_info" => null
                ),
                array(
                    "serial_number" => "150902774353",
                    "display_title" => "课节4",
                    "comment_status_name" => "待评价",
                    "teacher_number" => "83552707",
                    "can_comment" => true,
                    "teacher_comment_info" => null
                )
            ),
            "teacher_list" => array(
                array(
                    "number" => "835527076",
                    "display_name" => "小唐老师A",
                    "avatar_url" => "http://img.gsxservice.com/headpic_woman_02.jpg"
                ),
                array(
                    "number" => "835527077",
                    "display_name" => "小唐老师B",
                    "avatar_url" => "http://img.gsxservice.com/headpic_woman_02.jpg"
                ),
                array(
                    "number" => "835527078",
                    "display_name" => "小唐老师A",
                    "avatar_url" => "http://img.gsxservice.com/headpic_woman_02.jpg"
                ),
                array(
                    "number" => "835527079",
                    "display_name" => "小唐老师B",
                    "avatar_url" => "http://img.gsxservice.com/headpic_woman_02.jpg"
                )
            ),
            "extra" => array(
                "comment" => array(
                    "content" => "",
                    "check" => array(
                        "min_length" => 20
                    ),
                    "alert" => array(
                        "min_length" => array(
                            "type" => 2,
                            "content" => "您的评价少于20字，是否继续评价"
                        )
                    )
                )
            )
        )
    )
);

