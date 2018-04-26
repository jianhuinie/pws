<?php

require("../../bootstrap.php");

render(
    "activity/uk/upload",
    array(
        "tpl_data" => array(

            "has_pay" => 1, // 1已经报名 0没报名

            'grade' => '小学组',
            'name' => '杨柳音子',
            'avatar' => 'http://img.gsxservice.com/43194_4av21jmo.jpeg@1e_98w_98h_1c_0i_1o_90Q_1x.jpeg',
            'number' => '23442',
            'talent' => '素描',
            'vote_count' => '236',
            'description' => '面向全国学生，针对中考真题进行讲解，讲方法，讲技巧，讲思路。通过真题讲解，提前感受中考，掌握中考答题规范性，技巧性。',
            'rank' => 122,
            'can_vote' => 0, // 是否可以投票, //0可以投票 1不能投票

            'video_id' => null,

            'process' => array(
                array(
                    "title" => "报名",
                    "time" => "2016.2.14-2016.3.15",
                    "text" => "已报名",
                    "color" => 1  //0 灰色 1绿色 2红色 3黄色，进行中
                ),
                array(
                    "title" => "才艺视频上传",
                    "time" => "2016.2.14-2016.3.15",
                    "text" => "已上传",
                    "color" => 1
                ),
                array(
                    "title" => "初赛",
                    "time" => "2016.2.14-2016.3.15",
                    "text" => "通过",
                    "color" => 1
                ),
                array(
                    "title" => "复赛",
                    "time" => "2016.2.14-2016.3.15",
                    "text" => "未通过",
                    "color" => 3,
                    "status" => 1
                ),
                array(
                    "title" => "决赛",
                    "time" => "2016.2.14-2016.3.15",
                    "status" => 0,
                    "text" => "",
                    "color" => 0
                ),
                array(
                    "title" => "英国游学",
                    "time" => "2016.2.14-2016.3.15",
                    "status" => 0,
                    "text" => "",
                    "color" => 0
                )
            )

        )
    )
);

