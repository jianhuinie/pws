<?php

require("../bootstrap.php");

render(
    "teacher_center/couponFreeStudentList",
    array(
        "tpl_data" => array(

            "students" => array( // 未领取优惠券的学生列表
                array(
                    'user_number' => 12345,
                    'avatar' => 'fjdksofueiidsofjdkslafdlk',
                    'display_name' => '苏妲己',
                    'sex' => 0, // 0女 1男
                    'mobile' => 1431408453,
                    'order_num' => 12, // 订单数
                    'finish_num' => 11.5, // 完成课时数
                    'consume' => 123.5 // 消费额
                ),
                array(
                    'user_number' => 23456,
                    'avatar' => 'fjdksofueiidsofjdkslafdlk',
                    'display_name' => '苏妲己',
                    'sex' => 1, // 0女 1男
                    'mobile' => 1431408453,
                    'order_num' => 12, // 订单数
                    'finish_num' => 11.5, // 完成课时数
                    'consume' => 123.5 // 消费额
                ),
                array(
                    'user_number' => 34567,
                    'avatar' => 'fjdksofueiidsofjdkslafdlk',
                    'display_name' => '苏妲己',
                    'sex' => 0, // 0女 1男
                    'mobile' => 1431408453,
                    'order_num' => 12, // 订单数
                    'finish_num' => 11.5, // 完成课时数
                    'consume' => 123.5 // 消费额
                ),
                array(
                    'user_number' => 45678,
                    'avatar' => 'fjdksofueiidsofjdkslafdlk',
                    'display_name' => '苏妲己',
                    'sex' => 1, // 0女 1男
                    'mobile' => 1431408453,
                    'order_num' => 12, // 订单数
                    'finish_num' => 11.5, // 完成课时数
                    'consume' => 123.5 // 消费额
                ),
                array(
                    'user_number' => 56789,
                    'avatar' => 'fjdksofueiidsofjdkslafdlk',
                    'display_name' => '苏妲己',
                    'sex' => 1, // 0女 1男
                    'mobile' => 1431408453,
                    'order_num' => 12, // 订单数
                    'finish_num' => 11.5, // 完成课时数
                    'consume' => 123.5 // 消费额
                ),
                array(
                    'user_number' => 67890,
                    'avatar' => 'fjdksofueiidsofjdkslafdlk',
                    'display_name' => '苏妲己',
                    'sex' => 1, // 0女 1男
                    'mobile' => 1431408453,
                    'order_num' => 12, // 订单数
                    'finish_num' => 11.5, // 完成课时数
                    'consume' => 123.5 // 消费额
                ),
                array(
                    'user_number' => 123456789,
                    'avatar' => 'fjdksofueiidsofjdkslafdlk',
                    'display_name' => '苏妲己',
                    'sex' => 0, // 0女 1男
                    'mobile' => 1431408453,
                    'order_num' => 12, // 订单数
                    'finish_num' => 11.5, // 完成课时数
                    'consume' => 123.5 // 消费额
                )
            ),
            'pager'=>array( // 分页
                'count' => 58,
                'page' => 3,
                'page_size' => 20
            )

        )
    )
);
