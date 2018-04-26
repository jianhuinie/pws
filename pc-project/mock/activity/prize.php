<?php

require("../bootstrap.php");

render(
    "activity/prize",
    array(
        "name" => "tangrongyan",
        "user_data" => array(
            "user_type" => 2,
            "user_number" => 888
        ),
        "tpl_data" => array(
            "source_user_id" => "888",
            "source_user_number" => "888",
            "source_user_avatar" => "http://cdn.gsxservice.com/asset/img/main/%e7%8e%8b%e4%b8%80%e6%9d%b0.jpeg",
            "source_user_name" => "Jack",
            "has_get_prize" => false,
            "get_prize_money" => 1200,
            "total_prize" => 1000,
            "total_cashback" => 20,
            "is_owner" => false,
            "expired" => false,
            "teachers" => array(
                array(
                    "name" => "name",
                    "avatar" => "http://img.gsxservice.com/10842_6cwsbfdw.jpeg@1e_167w_167h_1c_0i_1o_90Q_1x.jpeg",
                    "course_name" => "小学数学",
                    "city_name" => "city_name",
                    "detail_url" => "http://www.genshuixue.com/t/resuuu1140",
                    "school_age" => 8
                ),
                array(
                    "name" => "name",
                    "avatar" => "http://img.gsxservice.com/10842_6cwsbfdw.jpeg@1e_167w_167h_1c_0i_1o_90Q_1x.jpeg",
                    "course_name" => "小学数学",
                    "city_name" => "city_name",
                    "detail_url" => "http://www.genshuixue.com/t/resuuu1140",
                    "school_age" => 8
                ),
                array(
                    "name" => "name",
                    "avatar" => "http://img.gsxservice.com/10842_6cwsbfdw.jpeg@1e_167w_167h_1c_0i_1o_90Q_1x.jpeg",
                    "course_name" => "小学数学",
                    "city_name" => "city_name",
                    "detail_url" => "http://www.genshuixue.com/t/resuuu1140",
                    "school_age" => 8
                ),
                array(
                    "name" => "name",
                    "avatar" => "http://img.gsxservice.com/10842_6cwsbfdw.jpeg@1e_167w_167h_1c_0i_1o_90Q_1x.jpeg",
                    "course_name" => "小学数学",
                    "city_name" => "city_name",
                    "detail_url" => "http://www.genshuixue.com/t/resuuu1140",
                    "school_age" => 8
                ),
                array(
                    "name" => "name",
                    "avatar" => "http://img.gsxservice.com/10842_6cwsbfdw.jpeg@1e_167w_167h_1c_0i_1o_90Q_1x.jpeg",
                    "course_name" => "小学数学",
                    "city_name" => "city_name",
                    "detail_url" => "http://www.genshuixue.com/t/resuuu1140",
                    "school_age" => 8
                ),
                array(
                    "name" => "name",
                    "avatar" => "http://img.gsxservice.com/10842_6cwsbfdw.jpeg@1e_167w_167h_1c_0i_1o_90Q_1x.jpeg",
                    "course_name" => "小学数学",
                    "city_name" => "city_name",
                    "detail_url" => "http://www.genshuixue.com/t/resuuu1140",
                    "school_age" => 8
                ),
                array(
                    "name" => "name",
                    "avatar" => "http://img.gsxservice.com/10842_6cwsbfdw.jpeg@1e_167w_167h_1c_0i_1o_90Q_1x.jpeg",
                    "course_name" => "小学数学",
                    "city_name" => "city_name",
                    "detail_url" => "http://www.genshuixue.com/t/resuuu1140",
                    "school_age" => 8
                ),
                array(
                    "name" => "name",
                    "avatar" => "http://img.gsxservice.com/10842_6cwsbfdw.jpeg@1e_167w_167h_1c_0i_1o_90Q_1x.jpeg",
                    "course_name" => "小学数学",
                    "city_name" => "city_name",
                    "detail_url" => "http://www.genshuixue.com/t/resuuu1140",
                    "school_age" => 8
                ),
                array(
                    "name" => "name",
                    "avatar" => "http://img.gsxservice.com/10842_6cwsbfdw.jpeg@1e_167w_167h_1c_0i_1o_90Q_1x.jpeg",
                    "course_name" => "小学数学",
                    "city_name" => "city_name",
                    "detail_url" => "http://www.genshuixue.com/t/resuuu1140",
                    "school_age" => 8
                ),
                array(
                    "name" => "name",
                    "avatar" => "http://img.gsxservice.com/10842_6cwsbfdw.jpeg@1e_167w_167h_1c_0i_1o_90Q_1x.jpeg",
                    "course_name" => "小学数学",
                    "city_name" => "city_name",
                    "detail_url" => "http://www.genshuixue.com/t/resuuu1140",
                    "school_age" => 8
                )
            ),
            "prize_record" => array(
                "pager" => array(
                    "page" => 1,
                    "page_size" => 3,
                    "count" => 100
                ),
                "list" => array(
                    array(
                        "user_id"=> "806",
                        "name"=> "name", //用户的名称
                        "avatar"=> "http://cdn.gsxservice.com/asset/img/main/%e7%8e%8b%e4%b8%80%e6%9d%b0.jpeg" ,//用户的头像
                        "money"=> 100 ,//该用户抽取的奖金金额
                        "info"=> "以上上课就靠你了！",//
                        "time"=> "10-26 22:15",//
                    ),
                    array(
                        "user_id"=> "806", //用户的ID
                        "name"=> "name", //用户的名称
                        "avatar"=> "http://cdn.gsxservice.com/asset/img/main/%e7%8e%8b%e4%b8%80%e6%9d%b0.jpeg" ,//用户的头像
                        "money"=> 10 ,//该用户抽取的奖金金额
                        "info"=> "以上上课就靠你了！",//
                        "time"=> "10-26 22:15",//
                    ),
                    array(
                        "user_id"=> "806", //用户的ID
                        "name"=> "name", //用户的名称
                        "avatar"=> "http://cdn.gsxservice.com/asset/img/main/%e7%8e%8b%e4%b8%80%e6%9d%b0.jpeg" ,//用户的头像
                        "money"=> 1000 ,//该用户抽取的奖金金额
                        "info"=> "以上上课就靠你了以上上课就靠你了！以上上课就靠你了",//
                        "time"=> "10-26 22:15",//
                    )
                )
            )
        )

    )
);