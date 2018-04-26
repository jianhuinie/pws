<?php

require("../bootstrap.php");

if (isset($_GET['purchase_id'])) { // 支付
    render(
        "pay/productGroup",
        array(
            "tpl_data" => array(
                "union_purchase" => array(
                    "id" => "148",
                    "purchase_id" => "2115102658409539",
                    "buyer_id" => "343821",
                    "buyer_role" => "2",
                    "seller_id" => "3293",
                    "seller_role" => "6",
                    "pay_type" => "31 =>1.28",
                    "status" => "0",
                    "pay_money" => "1.31",
                    "total_price" => "1.31",
                    "except_coupon_money" => "0.03", // 应付总额
                    "course_type" => "4",
                    "course_numbers" => "3297525704,3297551304",
                    "course_name" => "【化学】 【物理】",
                    "activity_id" => "53",
                    "activity_type" => "2",
                    "real_pay_type" => "0",
                    "organization_id" => "3293",
                    "use_plat_ensure" => "0",
                    "ip" => "202.85.218.26",
                    "create_time" => "2015-10-26 20:42:16",
                    "update_time" => "2015-10-26 20:42:16",
                    "pay_time" => "0000-00-00 00:00:00",
                    "expire_time" => "2015-11-02 20:42:16",
                    "trade_no" => null,
                    "mc_group_buying_id" => "279",
                    "need_money" => 0.03,
                    "note" => '老师好～', // 给老师留言
                    "is_self" => "0", // 是否是自己上课
                    "student_name" => '三儿', // 上课人姓名
                ),
                "child_purchases" => array(
                    array(
                        "title" => "物理",
                        "purchase_id" => "1115102658409299",
                        "address" => "北京市地铁13号线",
                        "course_number" => "3297551304",
                        "real_price" => "1.30",
                        "price" => "0.00",
                        "freq" => "3",
                        "introduction" => "测试中国大地上有多少飞鸽牌自行车，我不知道地方中国",
                        "status" => "0",
                        "lesson_way_name" => "线下授课",
                        "pay_status" => 0,
                        "preface" => 'http://test-img.gsxservice.com/380859_qjq4hke9.jpg', // 封面图
                        "course_type" => 1, // 课程类型
                    ),
                    array(
                        "title" => "物理",
                        "purchase_id" => "1115102658409299",
                        "address" => "北京市地铁13号线",
                        "course_number" => "3297551304",
                        "real_price" => "1.30",
                        "price" => "0.00",
                        "freq" => "3",
                        "introduction" => "测试中国大地上有多少飞鸽牌自行车，我不知道地方中国",
                        "status" => "0",
                        "lesson_way_name" => "线下授课",
                        "pay_status" => 0,
                        "preface" => 'http://test-img.gsxservice.com/380859_qjq4hke9.jpg', // 封面图
                        "course_type" => 1, // 课程类型
                    ),
                    array(
                        "title" => "物理",
                        "purchase_id" => "1115102658409299",
                        "address" => "北京市地铁13号线",
                        "course_number" => "3297551304",
                        "real_price" => "1.30",
                        "price" => "0.00",
                        "freq" => "3",
                        "introduction" => "测试中国大地上有多少飞鸽牌自行车，我不知道地方中国",
                        "status" => "0",
                        "lesson_way_name" => "线下授课",
                        "pay_status" => 0,
                        "preface" => 'http://test-img.gsxservice.com/380859_qjq4hke9.jpg', // 封面图
                        "course_type" => 1, // 课程类型
                    )
                ),
                "student_profile" => array(
                    "user_id" => "834952918",
                    "mobile" => "153****6563",
                    "name" => "枫叶",
                    "display_name" => "枫叶"
                ),
                "teacher_profile" => array(
                    "number" => "331618579",
                    "shortname" => "古典艺术",
                    "im_online_status" => 1,
                    "brief" => '本机构的一句话简介，益飞还没给',
                    "page_url" => "http://www.genshuixue.com/i/331618579"
                )
            )
        )
    );
} else if (isset($_GET['course_numbers']) && isset($_GET['activity_id'])) { // 提交订单购买

    render(
        "pay/productGroup",
        array(
            "tpl_data" => array(
                "activity" => array(
                    "id" => "1",
                    "user_id" => "3210",
                    "user_number" => "331618579",
                    "user_role" => "6",
                    "type" => "1",
                    "name" => "飞跃的联报优惠",
                    "tag_name" => "联报",
                    "start_time" => "2015-10-09 10:14:39",
                    "end_time" => "2015-10-30 10:14:43",
                    "status" => "2",
                    "remark" => "联报吧，优惠多多，实惠多多",
                    "create_time" => "2015-10-09 10:14:51",
                    "update_time" => "2015-10-09 14:38:23"
                ),
                "discount" => array(
                    "id" => "1",
                    "activity_id" => "1",
                    "discount_type" => "0",
                    "course_amount" => "2",
                    "discount_ratio" => "0",
                    "discount_point" => "199",
                    "status" => "2",
                    "create_time" => "2015-10-09 10:24:50",
                    "update_time" => "2015-10-17 10:08:04",
                    "delete_time" => "0000-00-00 00:00:00",
                    "display_name" => "2门联报立减￥1.99"
                ),
                "courses" => array(
                    array(
                        "title" => "化学",
                        "introduction" => "好好好好好好好好好好好好好好好好好好好好",
                        "address" => "北京市昌平区",
                        "freq" => "6", // 课程安排，多少次课
                        "price" => "1.00", // 单价
                        "preface" => "http://test-img.gsxservice.com/380859_qjq4hke9.jpg",
                        "number" => "3716941604",
                        "id" => "369",
                        "lesson_way_name" => "线下授课",
                        "course_type" => "4", // 4,3810机构班课
                        "real_price" => "0.5", // 折后价格
                        "pay_status" => 0 // 该课程已购买过
                    ),
                    array(
                        "title" => "好好学习，天天向上",
                        "introduction" => "好好好好好好好好好好好好好好好好好好好好好好好好好",
                        "address" => "北京市昌平区",
                        "freq" => "1",
                        "price" => "1.00",
                        "preface" => "http://test-img.gsxservice.com/380865_t8wimqud.jpg",
                        "number" => "3716762404",
                        "id" => "370",
                        "lesson_way_name" => "线下授课",
                        "course_type" => "4",
                        "real_price" => "0.5",
                        "pay_status" => 0 // 该课程已购买过

                    ),
                    array(
                        "title" => "英语",
                        "introduction" => "好好好好好好好好好好好好好好好好好好好好",
                        "address" => "北京市昌平区",
                        "freq" => "6",
                        "price" => "2.00",
                        "preface" => "http://test-img.gsxservice.com/380757_rh50qoir.jpg",
                        "number" => "3716736804",
                        "id" => "368",
                        "lesson_way_name" => "线下授课",
                        "course_type" => "4",
                        "real_price" => "1.01",
                        "pay_status" => 0 // 该课程已购买过
                    )
                ),
                "subtotal" => array(
                    "total_price" => "4",
                    "real_price" => "2.01"
                ),
                "student_profile" => array(
                    "user_id" => "874439468",
                    "mobile" => "137****3729",
                    "name" => "闵益飞啊",
                    "display_name" => "闵益飞啊"
                ),
                "teacher_profile" => array(
                    "number" => "331618579",
                    "im_online_status" => 1,
                    "shortname" => "古典艺术",
                    "brief" => '本机构的一句话简介，益飞还没给',
                    "page_url" => "http://www.genshuixue.com/i/331618579"
                )
            )
        )
    );

}


