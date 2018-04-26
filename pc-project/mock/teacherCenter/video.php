<?php

require("../bootstrap.php");

render(
    "teacher_center/video",
    array(
        "tpl_data" => array(
            "max" => 9,
            "video_list" => array(
                array(
                    "id" => 1,
                    "status" => 30, // 正在处理
                    "verify_status" => 0, // 0审核中 1通过 2未通过
                    "reasons" => array(
                        "未通过原因一：人傻",
                        "未通过原因二：钱多",
                        "未通过原因三：速来"
                    ),
                    "name" => "高中英语语法技巧的问题asdas阿大",
                    "img" => "http://i0.letvimg.com/yunzhuanma/201408/21/c4083eecff5ee8fbe14715cce0792492/thumb/1_160_120.jpg",
                    "video" => "http://test.www.genshuixue.com/video/view/759"
                ),
                array(
                    "id" => 1,
                    "status" => 70, // 正常
                    "verify_status" => 2, // 0审核中 1通过 2未通过
                    "reasons" => array(
                        "未通过原因一：人傻",
                        "未通过原因二：钱多",
                        "未通过原因三：速来"
                    ),
                    "name" => "高中英语语法技巧的问题",
                    "img" => "http://i0.letvimg.com/yunzhuanma/201408/21/c4083eecff5ee8fbe14715cce0792492/thumb/1_160_120.jpg",
                    "video" => "http://test.www.genshuixue.com/video/view/759"
                ),
                array(
                    "id" => 1,
                    "status" => 70, // 正常
                    "verify_status" => 0, // 0审核中 1通过 2未通过
                    "reasons" => array(
                        "未通过原因一：人傻",
                        "未通过原因二：钱多",
                        "未通过原因三：速来"
                    ),
                    "name" => "高中英语语法技巧的问题",
                    "img" => "http://i0.letvimg.com/yunzhuanma/201408/21/c4083eecff5ee8fbe14715cce0792492/thumb/1_160_120.jpg",
                    "video" => "http://test.www.genshuixue.com/video/view/759"
                ),
                array(
                    "id" => 1,
                    "status" => 40, // 审核未通过
                    "verify_status" => 1, // 0审核中 1通过 2未通过
                    "reasons" => array(
                        "未通过原因一：人傻",
                        "未通过原因二：钱多",
                        "未通过原因三：速来"
                    ),
                    "name" => "高中英语语法技巧的问题",
                    "img" => "http://i0.letvimg.com/yunzhuanma/201408/21/c4083eecff5ee8fbe14715cce0792492/thumb/1_160_120.jpg",
                    "video" => "http://test.www.genshuixue.com/video/view/759"
                ),
                array(
                    "id" => 1,
                    "status" => 50, // 转码失败
                    "verify_status" => 2, // 0审核中 1通过 2未通过
                    "reasons" => array(
                        "未通过原因一：人傻",
                        "未通过原因二：钱多",
                        "未通过原因三：速来"
                    ),
                    "name" => "高中英语语法技巧的问题",
                    "img" => "http://i0.letvimg.com/yunzhuanma/201408/21/c4083eecff5ee8fbe14715cce0792492/thumb/1_160_120.jpg",
                    "video" => "http://test.www.genshuixue.com/video/view/759"
                ),
                array(
                    "id" => 1,
                    "status" => 60, // 已暂停
                    "name" => "高中英语语法技巧的问题",
                    "img" => "http://i0.letvimg.com/yunzhuanma/201408/21/c4083eecff5ee8fbe14715cce0792492/thumb/1_160_120.jpg",
                    "video" => "http://test.www.genshuixue.com/video/view/759"
                ),
                array(
                    "id" => 1,
                    "status" => 80, // 已屏蔽
                    "name" => "高中英语语法技巧的问题",
                    "img" => "http://i0.letvimg.com/yunzhuanma/201408/21/c4083eecff5ee8fbe14715cce0792492/thumb/1_160_120.jpg",
                    "video" => "http://test.www.genshuixue.com/video/view/759"
                )
            )
        )
    )
);

