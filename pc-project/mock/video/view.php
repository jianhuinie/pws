<?php

require("../bootstrap.php");

render(
    // 'video/view', // 该模板基本已不用
    'video/player',  // 两个模板
    array(
        "tpl_data" => array(
            "fid" => "78553",
            "vs" => "1",
            "logourl" => "http://d.gsxservice.com/logo_video_start.mp4?v=20141215",
            "is_ours" => true,
            "video_unique" => "vu78553",
            "user_unique" => "a72978133a",
            "video_title" => "",
            "play_url" => 'http://www.baidu.com/', // 视频播放地址
            "video_info" => array(
                "cover" => "http://test-img.gsxservice.com/00-upload/image-test/68738_fef54e4f7e3901c5e85583c296969011_lgMX79dh.jpg",
                "fid" => "78553",
                "urls" => array(
                    array( // 标清
                        "cdn" => "dl",
                        "definition" => "std",
                        "duration" => 699,
                        "height" => 368,
                        "size" => 20357282,
                        "url" => "http://ddl-video.genshuixue.com/release/test/68738_4e67bfc30ed144d3aa006256edf9dcc0_W8eWFirT_mp4/68738_4e67bfc30ed144d3aa006256edf9dcc0_W8eWFirT.flv?dlSecret=01136834d83b23485749aa82f701ecce&dlTime=1464161815",
                        "width" => 640
                    ),
                    array( // 高清
                        "cdn" => "dl",
                        "definition" => "high",
                        "duration" => 699,
                        "height" => 544,
                        "size" => 41308210,
                        "url" => "http://ddl-video.genshuixue.com/release/test/68738_ac1b5c370a00a76d40d48d37a84e39d1_PsYPw5mZ_mp4/68738_ac1b5c370a00a76d40d48d37a84e39d1_PsYPw5mZ.flv?dlSecret=5cae24796a7261694a5adbc825664c0e&dlTime=1464161815",
                        "width" => 960
                    ),
                    array( // 超清
                        "cdn" => "dl",
                        "definition" => "super",
                        "duration" => 699,
                        "height" => 720,
                        "size" => 74442911,
                        "url" => "http://ddl-video.genshuixue.com/release/test/68738_f292f85bb568d391e66641bb7f7abcae_tDXW51Dn_mp4/68738_f292f85bb568d391e66641bb7f7abcae_tDXW51Dn.flv?dlSecret=9e39580cefcac5862a0418941c3bfd7a&dlTime=1464161815",
                        "width" => 1280
                    )
                ),
                "watermark" => "http://test-img.gsxservice.com/626969_9urpdxm0.jpeg"
            ),
            "error_msg" => "",
            "check_code" => "ZikwpLli0aIIfw0qwWK0ncj2V5KaTmh7n9Y4DI4yEZVYgf58opH8vt6ZVyp9Su",
            "payer_name" => "342204",
            "is_video_course" => "1",
            "report" => array(
                "user_number" => "835670598",
                "user_role" => "0",
                "video_type" => 1,
                "video_id" => "13800",
                "client" => 5,
                "app" => 0,
                "version" => null
            )
        )
    )
);






