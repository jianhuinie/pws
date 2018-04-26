<?php

require("../bootstrap.php");

render(
    "pay/refund",
    array(
        "tpl_data" => array(
            "status" => 2, // 0:申请中  1:退款完成 2:尚未申请／已取消
            "apply_service" => array(
                "退款"
            ),
            "reason" => array( // 退款原因
                "1" => "无法与老师达成一致",
                "2" => "下错单了"
            ),
            "total_price" => "100.00", // 最多金额+退款金额
            "class_fire_price" => "50", // 已确认课酬
            "course_name" => "“多家全国性媒体采访”&“数学中高”&【全国性媒体采访】",
            "course_cover" => "img.aaaaa.com/a.jpg",
            "order_number" => "11111", // 订单编号
            "teacher_name" => "aaaa",
            "teacher_number" => 122222, // 机构／老师number
            "order_price" => "122.0", // 订单金额
            "discount_price" => "10.00", // 优惠金额
            "pay_price" => "11", // 实际金额
            "refund_reason" => "下错单了", // 原因
            "reason_id" => 2, // 原因id
            "time_desc" => '02天23时' // 剩余退款时间
        )
    )
);