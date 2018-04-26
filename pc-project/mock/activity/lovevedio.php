<?php

require("../bootstrap.php");

render(
    "activity/lovevedio",
    array(
        "tpl_data" => array(
            "name" => null,
            "mobile" => "18672345985",
            "remainder" => "3",
            "is_beijing" => "0",                  //0－非北京地区 1-北京地区
            "teacher_list" => array(                                  //报名成功的老师列表
                   array(
                    "avatar" => "http://localhost:8080/src/img/headori.png",          //头像
                    "teacher_name" => "0张三1",             //名称
                    "time" => "2015-12-1 10:23",             //报名时间
                    "teacher_url" => "http://www.genshuixue.com/665402028"
                   ),
                   array(
                    "avatar" => "http://localhost:8080/src/img/headori.png",          //头像
                    "teacher_name" => "0张三2",             //名称
                    "time" => "2015-12-1 10:23",             //报名时间
                    "teacher_url" => "http://www.genshuixue.com/665402028"
                   ),
                   array(
                    "avatar" => "http://localhost:8080/src/img/headori.png",          //头像
                    "teacher_name" => "0张三3",             //名称
                    "time" => "2015-12-1 10:23",             //报名时间
                    "teacher_url" => "http://www.genshuixue.com/665402028"
                   ),
                   array(
                    "avatar" => "http://localhost:8080/src/img/headori.png",          //头像
                    "teacher_name" => "0张三4",             //名称
                    "time" => "2015-12-1 10:23",             //报名时间
                    "teacher_url" => "http://www.genshuixue.com/665402028"
                   ),
                   array(
                    "avatar" => "http://localhost:8080/src/img/headori.png",          //头像
                    "teacher_name" => "0张三5",             //名称
                    "time" => "2015-12-1 10:23",             //报名时间
                    "teacher_url" => "http://www.genshuixue.com/665402028"
                   ),
                   array(
                    "avatar" => "http://localhost:8080/src/img/headori.png",          //头像
                    "teacher_name" => "1张三6",             //名称
                    "time" => "2015-12-1 10:23",             //报名时间
                    "teacher_url" => "http://www.genshuixue.com/665402028"
                   ),
                   array(
                    "avatar" => "http://localhost:8080/src/img/headori.png",          //头像
                    "teacher_name" => "1张三7",             //名称
                    "time" => "2015-12-1 10:23",             //报名时间
                    "teacher_url" => "http://www.genshuixue.com/665402028"
                   ),
                   array(
                    "avatar" => "http://localhost:8080/src/img/headori.png",          //头像
                    "teacher_name" => "1张三8",             //名称
                    "time" => "2015-12-1 10:23",             //报名时间
                    "teacher_url" => "http://www.genshuixue.com/665402028"
                   ),
                   array(
                    "avatar" => "http://localhost:8080/src/img/headori.png",          //头像
                    "teacher_name" => "1张三9",             //名称
                    "time" => "2015-12-1 10:23",             //报名时间
                    "teacher_url" => "http://www.genshuixue.com/665402028"
                   ),
                   array(
                    "avatar" => "http://localhost:8080/src/img/headori.png",          //头像
                    "teacher_name" => "1张三10",             //名称
                    "time" => "2015-12-1 10:23",             //报名时间
                    "teacher_url" => "http://www.genshuixue.com/665402028"
                   ),
                   array(
                    "avatar" => "http://localhost:8080/src/img/headori.png",          //头像
                    "teacher_name" => "2张三11",             //名称
                    "time" => "2015-12-1 10:23",             //报名时间
                    "teacher_url" => "http://www.genshuixue.com/665402028"
                   ),
                   array(
                    "avatar" => "http://localhost:8080/src/img/headori.png",          //头像
                    "teacher_name" => "2张三12",             //名称
                    "time" => "2015-12-1 10:23",             //报名时间
                    "teacher_url" => "http://www.genshuixue.com/665402028"
                   ),
                   array(
                    "avatar" => "http://localhost:8080/src/img/headori.png",          //头像
                    "teacher_name" => "2张三13",             //名称
                    "time" => "2015-12-1 10:23",             //报名时间
                    "teacher_url" => "http://www.genshuixue.com/665402028"
                   ),
                   array(
                    "avatar" => "http://localhost:8080/src/img/headori.png",          //头像
                    "teacher_name" => "2张三14",             //名称
                    "time" => "2015-12-1 10:23",             //报名时间
                    "teacher_url" => "http://www.genshuixue.com/665402028"
                   ),
                   array(
                    "avatar" => "http://localhost:8080/src/img/headori.png",          //头像
                    "teacher_name" => "2张三15",             //名称
                    "time" => "2015-12-1 10:23",             //报名时间
                    "teacher_url" => "http://www.genshuixue.com/665402028"
                   ),
                   array(
                    "avatar" => "http://localhost:8080/src/img/headori.png",          //头像
                    "teacher_name" => "3张三16",             //名称
                    "time" => "2015-12-1 10:23",             //报名时间
                    "teacher_url" => "http://www.genshuixue.com/665402028"
                   ),
                   array(
                    "avatar" => "http://localhost:8080/src/img/headori.png",          //头像
                    "teacher_name" => "3张三17",             //名称
                    "time" => "2015-12-1 10:23",             //报名时间
                    "teacher_url" => "http://www.genshuixue.com/665402028"
                   ),
                   array(
                    "avatar" => "http://localhost:8080/src/img/headori.png",          //头像
                    "teacher_name" => "3张三18",             //名称
                    "time" => "2015-12-1 10:23",             //报名时间
                    "teacher_url" => "http://www.genshuixue.com/665402028"
                   ),
                   array(
                    "avatar" => "http://localhost:8080/src/img/headori.png",          //头像
                    "teacher_name" => "3张三19",             //名称
                    "time" => "2015-12-1 10:23",             //报名时间
                    "teacher_url" => "http://www.genshuixue.com/665402028"
                   ),
                   array(
                    "avatar" => "http://localhost:8080/src/img/headori.png",          //头像
                    "teacher_name" => "3张三20",             //名称
                    "time" => "2015-12-1 10:23",             //报名时间
                    "teacher_url" => "http://www.genshuixue.com/665402028"
                   ),
                   array(
                    "avatar" => "http://localhost:8080/src/img/headori.png",          //头像
                    "teacher_name" => "4张三21",             //名称
                    "time" => "2015-12-1 10:23",             //报名时间
                    "teacher_url" => "http://www.genshuixue.com/665402028"
                   ),
                   array(
                    "avatar" => "http://localhost:8080/src/img/headori.png",          //头像
                    "teacher_name" => "4张三22",             //名称
                    "time" => "2015-12-1 10:23",             //报名时间
                    "teacher_url" => "http://www.genshuixue.com/665402028"
                   )
            ),
            "excellent_video_list" =>array(
                array(
                "video_id" => "feab88e297",
                "video_url"=> "http://www.genshuixue.com/video/view/feab88e297",
                "video_name"=> "1.flv",
                "preface_url"=> "http://i2.letvimg.com/yunzhuanma/201408/06/4ebffecd58af3bb84c83b53270f07379/thumb/2.jpg"
                ),
                array(
                "video_id"=>"17228f2b56",
                "video_url"=> "http://www.genshuixue.com/video/view/17228f2b56",
                "video_name"=> "断点续传",
                "preface_url"=> "http://img.gsxservice.com/00-x-upload/image/66453_a83b559bb37df67739c43d733336eaaa_0AKyh73Y.jpg"
                ),
                array(
                "video_id"=> "17a3a1007c",
                "video_url"=> "http://www.genshuixue.com/video/view/17a3a1007c",
                "video_name"=> "read_only",
                "preface_url"=> null
                ),
                array(
                "video_id"=>"7d0605ee31",
                "video_url"=> "http://www.genshuixue.com/video/view/7d0605ee31",
                "video_name"=> "视频封面",
                "preface_url"=> null
                ),
                array(
                "video_id"=> "e993b9898f",
                "video_url"=> "http://www.genshuixue.com/video/view/e993b9898f",
                "video_name"=> "测试不能停",
                "preface_url"=> null
                ),
                array(
                "video_id"=> "3d745314d5",
                "video_url"=> "http://www.genshuixue.com/video/view/3d745314d5",
                "video_name"=> "嘻嘻哈哈",
                "preface_url"=> null
                ),
                array(
                "video_id"=> "f830ea8b23",
                "video_url"=> "http://www.genshuixue.com/video/view/f830ea8b23",
                "video_name"=> "状态测试",
                "preface_url"=> null
                )
            )
        )
    )
);

