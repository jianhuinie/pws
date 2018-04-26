<?php

require("../../bootstrap.php");

render(
    "activity/uk/profileEdit",
    array(
        "tpl_data" => array(
            "has_pay" => 0, //0-未报名 1-已报名 2-已视频上传 3-已经到了初赛 4-已经到了复赛 5-已经到了决赛
            "basic_info" => array(
                "name" =>  "小明",
                "phone" =>  "13126988092",
//                "avatar" =>  "",
                "avatar" =>  "http://test-img.gsxservice.com/431739_nqy8lqff.jpeg",
                "email" =>  '12314@163.com',
                "describe" =>  "啊哈哈哈哈",
                "school" => "北京市某某某高校",
                "talent" => "吉他",
                "address" => array(
                    "province" => array(
                        "name" => '北京',
                        "id" => 16777216
                    ),
                    "city" => array(
                        "name" => '北京',
                        "id" => 151257088
                    ),
                    "district" => array(
                        "name" => '北京',
                        "id" => 386924544
                    )
                ),
                "grade" => array(
                    "name" => '小学组',
                    "id" => 1
                ),
                "subject" => array(
                    "name" => '艺术',
                    "id" => 975
                )

            ),
            "province" => array(
                array(
                    "id" => "16777216",
                    "name" => "北京",
                    "display_order" => "1000",
                    "level" => "1",
                    "hidden" => "0",
                    "bid" => "131",
                    "bname" => "北京市",
                    "tid" => "110000"
                ),
                array(
                    "id" => "16777216",
                    "name" => "安徽",
                    "display_order" => "1000",
                    "level" => "1",
                    "hidden" => "0",
                    "bid" => "131",
                    "bname" => "北京市",
                    "tid" => "110000"
                )
            ),
            "subject" => array(
                array(
                    "id" => "975",
                    "name" => "艺术",
                    "level" => "1",
                    "hidden" => "0",
                    "subnodes" => "11"
                ),
                array(
                    "id" => "975",
                    "name" => "体育",
                    "level" => "1",
                    "hidden" => "0",
                    "subnodes" => "11"
                )
            ),
            "grade" => array(
                array(
                    "id" => "1",
                    "name" => "小学组"
                ),
                array(
                    "id" => "2",
                    "name" => "初中组"
                ),
                array(
                    "id" => "3",
                    "name" => "小学组"
                ),
                array(
                    "id" => "4",
                    "name" => "大学组"
                )
            )
        )
    )
);

