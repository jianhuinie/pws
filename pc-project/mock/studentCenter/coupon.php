<?php

require("../bootstrap.php");

render(
    "student_center/coupon",
    array(
        "tpl_data" => array(
            "count" => array(
                "ing" => "7", // 未使用优惠券数量
                "succ" => "0", // 已使用优惠券数量
                "expired" => "0" // 已过期优惠券数量
            ),
            "coupon" => [
                array(
                    "type" => "11",
                    "cond_tid" => "0",
                    "serial_num" => "123944",
                    "balance" => "20.00",
                    "source" => "test活动1满100-20，限小啦，钢江老师",

                    "effect_time" => "2015-02-07 10:11:16",
                    "expire_time" => "2015-02-17 10:11:16",
                    "is_common" => "0",
                    "threshold" => "100.00",

                    "cond_plat_limit" => 1,

                    "cond_course_type" => [
                        "班课",
                        "视频课"
                    ],
                    "cond_teacher" => [
                        array(
                            "name" => "小啦老师",
                            "name_cut" => "小啦老师",
                            "url" => "/329098418"
                        ),
                        array(
                            "name" => "李钢江",
                            "name_cut" => "李钢江",
                            "url" => "/329652978"
                        )
                    ],
                    "cond_class" => [
                        array(
                            "name" => 'XX班课XX班课XX班课XX班课XX班课XX班课XX班课XX班课XX班课XX班课XX班课XX班课XX班课XX班课XX班课XX班课XX班课XX班课XX班课XX班课XX班课XX班课XX班课XX班课XX班课XX班课XX班课XX班课XX班课XX班课',
                            "number" => '1123123'
                        ),
                        array(
                            "name" => 'XX班课',
                            "number" => '1123123'
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

                    "usable_money" => "20.00"
                ),
                array(
                    "effect_time" => "2015-02-07 10:11:16",
                    "expire_time" => "2015-02-17 10:11:16",
                    "is_common" => "1",
                    "threshold" => "100.00",
                    "source" => "test活动2满100-20，限乐闻携尔，敏思堂机构",
                    "type" => "11",
                    "serial_num" => "123945",
                    "cond_tid" => "0",
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
                    "balance" => "20.00",
                    "usable_money" => "20.00"
                ),
                array(
                    "effect_time" => "2015-02-07 10:11:16",
                    "expire_time" => "2015-02-17 10:11:16",
                    "is_common" => "1",
                    "threshold" => "100.00",
                    "source" => "test活动3满100-20，限app下单",
                    "type" => "11",
                    "serial_num" => "123946",
                    "cond_tid" => "1",
                    "balance" => "20.00",
                    "usable_money" => "20.00"
                ),
                array(
                    "effect_time" => "2015-02-07 10:11:16",
                    "expire_time" => "2015-02-17 10:11:16",
                    "is_common" => "1",
                    "threshold" => "200.00",
                    "source" => "test活动4，8.8折扣券，满200最大打20，限班课，视频课",
                    "type" => "13",
                    "serial_num" => "123947",
                    "cond_tid" => "0",
                    "cond_course_type" => [
                        "班课",
                        "视频课"
                    ],
                    "discount" => "8.8",
                    "max_discount_money" => "20.00"
                ),
                array(
                    "effect_time" => "2015-02-07 10:11:16",
                    "expire_time" => "2015-02-17 10:11:16",
                    "is_common" => "1",
                    "threshold" => "200.00",
                    "source" => "test活动5 免单券，满200最多扣30，限一级类目 生活技能",
                    "type" => "13",
                    "serial_num" => "123948",
                    "cond_tid" => "0",
                    "cond_subject" => [
                        array(
                            "id" => "897",
                            "level" => "1",
                            "name" => "生活技能",
                            "parentId" => "0"
                        )
                    ],
                    "discount" => "0.0",
                    "max_discount_money" => "30.00"
                ),
                array(
                    "effect_time" => "2015-02-07 10:11:16",
                    "expire_time" => "2015-02-17 10:11:16",
                    "is_common" => "1",
                    "threshold" => null,
                    "source" => "test活动6 限机构1,2，app下单，上课类型1,3,",
                    "type" => "13",
                    "serial_num" => "123949",
                    "cond_tid" => "1",
                    "cond_organization" => [
                        array(
                            "name" => "乐闻携尔",
                            "url" => "/org/index?org_id=328931849"
                        )
                    ],
                    "cond_course_type" => [
                        "一对一",
                        "视频课"
                    ],
                    "discount" => "0.0",
                    "max_discount_money" => "100.00"
                ),
                array(
                    "effect_time" => "2015-02-07 10:11:16",
                    "expire_time" => "2015-02-17 10:11:16",
                    "is_common" => "1",
                    "threshold" => null,
                    "source" => "test活动7 限老师（小啦，钢江）app下单 上课类型（1,3）",
                    "type" => "13",
                    "serial_num" => "123950",
                    "cond_tid" => "1",
                    "cond_teacher" => [
                        array(
                            "name" => "小啦老师",
                            "name_cut" => "小啦老师",
                            "url" => "/329098418"
                        )
                    ],
                    "cond_course_type" => [
                        "一对一",
                        "视频课"
                    ],
                    "discount" => "9.0",
                    "max_discount_money" => null
                )
            ],
            'pager'=>array( // 分页
                'count' => 58,
                'page' => 3,
                'page_size' => 20
            )

        )
    )
);