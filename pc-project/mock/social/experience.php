<?php

require("../bootstrap.php");

render(
    "social/experience",
    array(
       "tpl_data" => array(
            "forum_upvote_thread" => [
                "display_name" => "赞帖子",
                "jifen_display" => "5",
                "rule_display" => "每天最多三次"
            ],
            "forum_up_thread" => [
                "display_name" => "赞帖子",
                "jifen_display" => "5",
                "rule_display" => "每天最多三次"
            ],
            "forum_upv_thread" => [
                "display_name" => "赞帖子",
                "jifen_display" => "5",
                "rule_display" => "每天最多三次"
            ]
        )
    )
);