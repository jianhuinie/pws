<?php

require("../bootstrap.php");

render(
    "teacher_center/videoEdit",
    array(
        "tpl_data" => array(

            'video_info' => array(
                'id' => '9322',
                'title' => '我觉得我缺少童年，因为我从来没爱过猫和老鼠',
                'status' => '70',
                'preface_url' => 'http://i0.letvimg.com/yunzhuanma/201408/21/c4083eecff5ee8fbe14715cce0792492/thumb/1_160_120.jpg',
                'category' => '4', // 视频分类，0自我介绍 1讲课短片 2才艺展示 3其他 4风云老师大赛
                'labels' => '一二三,四五六,七八九', // 标签
            ),
            'video_img_list' => array(
                'http://i0.letvimg.com/yunzhuanma/201408/21/c4083eecff5ee8fbe14715cce0792492/thumb/1_160_120.jpg',
                'http://img.gsxservice.com/headpic_woman.png',
                'http://i0.letvimg.com/yunzhuanma/201408/21/c4083eecff5ee8fbe14715cce0792492/thumb/1_160_120.jpg',
                'http://img.gsxservice.com/headpic_woman.png',
                'http://i0.letvimg.com/yunzhuanma/201408/21/c4083eecff5ee8fbe14715cce0792492/thumb/1_160_120.jpg',
                'http://img.gsxservice.com/headpic_woman.png',
                'http://i0.letvimg.com/yunzhuanma/201408/21/c4083eecff5ee8fbe14715cce0792492/thumb/1_160_120.jpg',
                'http://img.gsxservice.com/headpic_woman.png'
            )

        )
    )
);