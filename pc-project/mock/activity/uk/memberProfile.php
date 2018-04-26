<?php

require("../../bootstrap.php");

render(
    "activity/uk/memberProfile",
    array(
        "tpl_data" => array(


            'grade' => '小学组',
            'name' => '杨柳音子',
            'avatar' => 'http://img.gsxservice.com/43194_4av21jmo.jpeg',
            'number' => '23442',
            'talent' => '素描',
            'vote_count' => '236',
            'description' => '面向全国学生，针对中考真题进行讲解，讲方法，讲技巧，讲思路。通过真题讲解，提前感受中考，掌握中考答题规范性，技巧性。',
            'rank' => 128,
            'can_vote' => true, // 是否可以投票, //0可以投票 1不能投票
            'video_id' => 123,
            'video_status' => 30, //0- 没有视频, 70-成功，80-上传失败, 30-转码中，50-转码失败, 其他-视频暂无法播放
            'frozen' => 0,
            'proccess' => 3,
            'process_status' => 2,
            'has_pay' => 1
        )
    )
);

