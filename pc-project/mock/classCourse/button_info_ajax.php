<?php

$response = array(
    'code' => 0,
    'msg' => 'succ',
    'ts' => 1475815161,
    'data' => array(
        'button' => array(
            // array(
            // "name" => "暂停招生",
            // "class" => "default"
            // ),
            array(
                "name" => "进入教室试听",
                "class" => "online-trial"
            ),
            // array(
            //     "name" => "预约试听",
            //     "class" => "btn-trial"
            // )
            // array(
            //     "name" => "立即报名立即报名立即报名",
            //     "class" => "primary reserve-course"
            // )
            // array(
            //     "name" => "已报3人|立即报名",
            //     "class" => "primary reserve-course"
            // ),
            // array(
            //     "name" => "本班课已停招",
            //     "class" => "default"
            // ),
            // array(
            //     "name" => "本班课已报满",
            //     "class" => "default"
            // ),
            // array(
            //     "name" => "本班课进行中",
            //     "class" => "default small"
            // ),
            // array(
            //     "name" => "插班价12.0|立即报名",
            //     "class" => "primary reserve-course"
            // ),
            // array(
            //      "name" => "进行中",
            //      "class" => "default"
            // ),
            array(
                 "name" => "观看回放",
                 "class" => "see-replay"
            ),
            // array(
            //      "name" => "本班课已完成",
            //      "class" => "default"
            // ),
            // array(
            //     "name" => "本班课审核中",
            //     "class" => "default"
            // ),
            // array(
            //      "name" => "本班课已失效",
            //      "class" => "default"
            // ),
            // array(
            //      "name" => "即将开课",
            //      "class" => "default"
            // ),
            // array(
            //     "name" => "进入教室",
            //     "class" => "primary-enter-room"
            // ),
            // array(
            //     "name" => "还有机会,5人待付款",
            //     "class" => "default hugeBtn"
            // )
        )
    )
);

echo json_encode($response);