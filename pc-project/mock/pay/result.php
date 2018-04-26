<?php

require("../bootstrap.php");

render(
    'pay/result',
    array(
        "tpl_data" => array(
            "hours" => "10.0",
            "third_pay_money" => "0.00",
            "purchase_id" => "1116100893782424", // 订单号
            "purchase_type" => 10, // 22老师会员功能 25考研联报课 27购买空间 28短信 29组合课
            "course_type" => 11, // 课程类型（1:1v1，2:班课，3:视频课，4:机构班课，5:试听课 11:机构X课一对一 12:机构X课班课）
            "course_number" => "160727488856", // 课程number
            "lesson_way" => 4, // 上课方式（1:协商地点，2：在线授课，4：学生上门，8：老师上班）
            "teacher_number" => "876816198", // 老师number
            "teacher_name" => "麦子", // 老师姓名
            "pay_money" => "110.00", // 支付金额
            "pay_status" => "1", // 支付状态（0支付中，1成功；2应付金额不一致，付款失败；3订单取消了，付款失败，4订单已过期，5订单已退款）
            "fenqi_data" => array(
                "first_repayment" => 1000,
                "repayment_total" => 1023,
                "fenqi_msg" => '含利息'
            ),
            "buttons" => array( // 按钮
                array(
                    "name" => "订单详情",
                    "url" => "http://zhangxiaolei-www.test.genshuixue.com/order/studentOrderDetail?purchase_id=1116111643450666",
                    "stype" => "OrderDetail",
                    "class_name" => "btn-default"
                ),
                array(
                    "name" => "请老师为我排课",
                    "url" => "http://zhangxiaolei-www.test.genshuixue.com/lesson/studentInviteTeacherReserve?purchase_id=1116111643450666",
                    "stype" => "TeacherReserve",
                    "class_name" => "btn-info"
                ),
                array(
                    "name" => "查看详情",
                    "url" => "http://test.genshuixue.com/order/studentOrderDetail?purchase_id=1116100893782424",
                    "class_name" => "btn-primary",
                    "stype" => 'OrderDetail' // 点击上报stype参数
                ),
                array(
                    "name" => "进入教室",
                    "url" => "http://test.genshuixue.com/live/lesson?room_no=151104511284",
                    "online_data" => array( // 进入教室独有
                        "location" => "http://test.genshuixue.com/live/lesson?serial_number=151009781522",
                        "mode" => 1,
                        "timestamp" => 1444357790,
                        "token" => "dmNwYmhyaWdyOHI0M3Y0cnFzdTk0ZjNoYzc="
                    ),
                    "class_name" => "btn-info",
                    "stype" => "EnterClass"
                )
            ),
            "organization" => array(
                "name" => "串session",
                "domain" => "328931849",
                "extension" => "4000-122-166 转 166042",
                "location" => "武汉",
                "city_filter" => 1
            ),
            "community_idkey" => '24f20f6e3a95428525bc76f85cbfa73687d8104aefd857feeaed1d2404211f0b',
            "schedule" => array( // 下一个课节时间及地点
                "time" => "2016-10-08 10:00:00",
                "address" => "北京市海淀区东北旺西路软件园二期东区10号院7号楼",
                "index" => 3, // 第几课节
            ),
            "qreserve_sign" => 1, // 是否开启闪电约课（1：开启，0：不开启）
            "call_info" => array(
                "master_number" => "4000-910-910", // 机构400电话
                "to_number" => "12345", // 分机号
            )
        )
    )
);
