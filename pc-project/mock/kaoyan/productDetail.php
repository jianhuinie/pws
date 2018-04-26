<?php

require("../bootstrap.php");

render(
    "kaoyan/productDetail",
    array(
        "tpl_data" => array(
            "student_profile" => array(
                "id" => "341959",
                "number" => "874278348",
                "user_id" => "341959",
                "display_name" => "2048hx",
                "realname" => "邹洋",
                "nickname" => "2048hx",
                "mobile" => "18511865925",
                "private_domain" => "874278348",
                "sex" => "1",
                "email" => "zouyang@baijiahulian.com",
                "avatar" => "http://test-img.gsxservice.com/329374_hq9dx3rg.jpeg",
                "role" => 2,
                "area_id" => null,
                "private_protected" => 0,
                "short_introduce" => null
            ),
            "product" => array(
                "cover" => "http://test-img.gsxservice.com/0cms/d/file/content/2015/12/568287f5d9781.jpg",
                "detail_url" => "#", // 课程页面
                "name" => "第一门打包课",
                "price" => 20.02, // 0免费课
                "total" => 3,
                "course_type" => 7 // 7组合课
            )
        )
    )
);

