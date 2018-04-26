<?php

require("../bootstrap.php");

render(
    "activity/superTeacherPersonal",
    array(
        "tpl_data" => array(
            "status" => 2, // 1:用户已报名，2:用户未报名
            'teacher_info' => array(
                'number' => '982316038',
                'display_name' => '挛董静',
                'avatar_url' => 'http://test-img.gsxservice.com/392718_sw2ey8wc.jpeg',
                'student_count' => 19225,
                'comment_summary' => array(
                    'avg' => 4.2,
                    'count' => 6252
                ),
                'vote_acount' => '555',
                'coupon_count' => 10,
                'rank' => 20, // 排名
                'pv' => 1319083, // 浏览量
                // 'intro' => '认真对待每一个学生认真对待每一个学生认真对待每一个学生认真对待每一个学生认真对待每一个学生认真对待每一个学生认真对待每一个学生认真对待每一个学生认真对待每一个学生认真对待每一个学生认真对待每一个学生认真对待每一个学生认真对待每一个学生认真对待每一个学生认真对待每一个学生认真对待每一个学生认真对待每一个学生认真对待每一个学生认真对待每一个学生认真对待每一个学生认真对待每一个学生认真对待每一个学生认真对待每一个学生认真对待每一个学生认真对待每一个学生认真对待每一个学生认真对待每一个学生认真对待每一个学生认真对待每一个学生认真对待每一个学生认真对待每一个学生认真对待每一个学生',
                // 'baidu_share_text' => '超级老师视频风采大赛。我在参加跟谁学首届超级老师视频风采大赛，快来帮我投下宝贵的一票吧。@跟谁学',
                // 'baidu_share_image' => 'http://test-img.gsxservice.com/392718_sw2ey8wc.jpeg'
            ),
            'video' => []
        )
    )
);