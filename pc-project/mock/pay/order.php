<?php

require("../bootstrap.php");

render(
    "pay/order",
    array(
        "tpl_data" => array(
            "material_post_info" => array(
                "support_materials_post" => true, //是否支持邮寄资料
                "has_default_address" => true, //是否有默认地址
                "post_address" => array(
                    "id" => 3, //  地址ID
                    "name" => "",
                    "mobile" => '',
                    "telephone" => '',
                    "location_addr" => "",
                    // "provience_id" => 17039360,
                    // "city_id" => 150994944,
                    // "area_id" => 151257088
                )
            ),
            "is_preferred_business" => 1, //是否是优选一对一
            "show_plat_ensure" => true, // 是否显示平台支付
            "fenqi_data" => array(
                "every_periods_repayment" => 70, //每期还款
                "periods" => 12 //分期期数
            ),
            "choice_fenqi" => 1, //1选择了分期 0未选择分期
            "is_fenqi_whitelist" => 1,
            "product" => array(
                "teacher_profile" => array(
                    "name" => "老师名老师名老师名老师名老师名老师名老师名",
                    "name_cut" => "老师名",
                    "im_online_status" => 1,
                    "display_name" => '我是老师哦s',
                    "number" => 123123,
                    "avatar" => "http://img.gsxservice.com/10842_6cwsbfdw.jpeg",
                    "id" => "10"
                ),
                "combo_id" => 1,
                "course_type" => 3, // 1.一对一 2.班课 3.视频课 4.机构班课 5.试听课 11.机构X课一对一 12.机构X课班课
                "course_pub_time" => "2015-07-06 20:54", // 视频课发布时间
                "course_items_count" => "2", // 视频课节数
                "portrait" => "http://test-img.gsxservice.com/358113_5kw6vrtf.jpeg",
                "expire_days" => 3,
                "course_id" => 123123123,
                "course_name" => "吉他吉他吉他吉他吉他吉他吉他吉他吉他吉他吉他",
                "min_student" => 0,
                "subject_id" => 123123,
                "course_name_cut" => "吉他",
                "arrangement" => "早上八点早上八点早上八点早上八点早上八点早上八点早上八点早上八点早上八点早上八点早上八点早上八点早上八点早上八点早上八点早上八点早上八点早上八点早上八点早上八点",
                "course_number" => "141224542799",
                "course_photo" => "http://img.gsxservice.com/10842_6cwsbfdw.jpeg",
                "lesson_way" => "teacher",
                "price" => "1500.00",
                "original_money" => "1990.00",
                "total_price" => "1990.99", // 总价
                "pay_money" => '1959.00', // 实际支付价格
                "discount" => "10", // 折扣
                "hours" => "30", // 购买小时数 试听课的话，单位为分钟
                "begin_time" => 1419390000,
                "end_time" => 1419494600,
                "retire_flag" => 1, // 100不可退
                "retire_length" => 2,
                "org_profile" => array( // 机构信息
                    "id" => "331616259",
                    "name" => "朱之家",
                    "im_online_status" => 1,
                    "avatar" => "http://img.gsxservice.com/251179_xrf74swf.jpg",
                    "number" => "331616259",
                    "mobile" => "1872323232",
                    "score" => 0,
                    "location" => "北京",
                    "comments_cnt" => "0",
                    "brief" => "",
                    "tags" => array(
                    ),
                    "domain" => "331616259",
                    "org_id" => "3468"
                ),
                "address_area" => array(
                    "province" => array(
                        "id" => "16777216",
                        "name" => "北京",
                        "display_order" => "1000",
                        "level" => "1",
                        "hidden" => "0"
                    ),
                    "city" => array(
                        "id" => "17039360",
                        "name" => "北京",
                        "display_order" => "0",
                        "level" => "2",
                        "hidden" => "0"
                    ),
                    "area" => array(
                        "id" => "17050624",
                        "name" => "昌平区",
                        "display_order" => "9",
                        "level" => "3",
                        "hidden" => "0"
                    ),
                    "country"=> array(),
                    "location_addr"=> "朝阳大悦城",
                    "full_address"=> "北京朝阳区朝阳大悦城北京朝阳区朝阳大悦城北京朝阳区朝阳大悦城北京朝阳区朝阳大悦城北京朝阳区朝阳大悦城北京朝阳区朝阳大悦城北京朝阳区朝阳大悦城北京朝阳区朝阳大悦城北京朝阳区朝阳大悦城"
                    )
            ),
            "student_profile" => array(
                "name" => 'mark',
                "display_name" => '',
                "mobile" => '',
                "location" => '北京市海淀区西二旗'
            ),
            "account" => array(
                "user_id"=> "1305",
                "balance"=> "255.69",
                "valid_prize"=> "123",
                "prize_balance"=> "113.12",
                "prize_id"=> "7665524515",
                "has_password" => 0,
                "coupon" => array(
                    "available" => [
                        array(
                            "effect_time" => "2015-02-07 10:11:16",
                            "expire_time" => "2017-12-17 10:11:16",
                            "is_common" => "0",
                            "threshold" => "100.00",
                            "source" => "test活动2满100-20，限乐闻携尔，敏思堂机构",
                            "type" => "11",
                            "coupon_id" => "123945",
                            "cond_tid" => "0",
                            "cond_plat_limit" => 1,
                            "cond_organization" => [
                                array(
                                    "name" => "乐闻携尔",
                                    "url" => "/org/index?org_id=328931849"
                                ),
                                array(
                                    "name" => "敏思堂",
                                    "url" => "/org/index?org_id=328913929"
                                )
                            ],
                            "cond_class" => [
                                array(
                                    "name" => "XX班课XX班课XX班课XX班课XX班课XX班课XX班课XX班课",
                                    "number" => "123123"
                                )
                            ],
                            "balance" => "99.00",
                            "usable_money" => "99.00"
                        ),
                        array(
                            "effect_time" => "2015-02-07 10:11:16",
                            "expire_time" => "2015-02-17 10:11:16",
                            "is_common" => "0",
                            "threshold" => "100.00",
                            "source" => "test活动2满100-20，限乐闻携尔，敏思堂机构",
                            "type" => "11",
                            "coupon_id" => "123945",
                            "cond_tid" => "0",
                            "cond_plat_limit" => 1,
                            "cond_organization" => [
                                array(
                                    "name" => "乐闻携尔",
                                    "url" => "/org/index?org_id=328931849"
                                ),
                                array(
                                    "name" => "敏思堂",
                                    "url" => "/org/index?org_id=328913929"
                                )
                            ],
                            "cond_class" => [
                                array(
                                    "name" => "XX班课XX班课XX班课XX班课XX班课XX班课XX班课XX班课",
                                    "number" => "123123"
                                )
                            ],
                            "cond_video" => [
                                array(
                                    "name" => "d",
                                    "number" => "15072773771"
                                ),
                                array(
                                    "name" => "老师生效条件-视频课01",
                                    "number" => "15072281827"
                                )
                            ],

                            "balance" => "109.00",
                            "usable_money" => "109.00"
                        )
                    ],
                    "unavailable" => [

                    ]
                ),
                "discount" => array( // 机构X课，没有该项目
                    // "start_time" => "2015-08-21 15:00:00",
                    // "end_time" => "2015-08-21 16:00:00",
                    // "tag_name" => "616限时",
                    // "info" => "RD江柳清测试616",
                    // "id" => "5",
                    // "price" => "1090.00",
                    // "pre_price" => "1990.00"
                    array(
                        "start_time" => "2016-12-19 18:04:32",
                        "end_time" => null,
                        "type" => 2, // 1为限额 2为限时
                        "remain_amount" => 40, // 限额，剩余名额
                        "pre_price" => "20",
                        "discount_price" => 19.8,
                        "tag_name" => "616限时",
                    ),
                    array(
                        "start_time" => "2016-12-21 10:52:00",
                        "end_time" => "2016-12-24 10:52:00",
                        "type" => 2,
                        "remain_amount" => null,
                        "pre_price" => "1",
                        "discount_price" => "0.40",
                        "tag_name" => "限额折扣",
                    )
                )
            )
        )
    )
);





