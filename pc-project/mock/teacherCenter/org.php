<?php

require("../bootstrap.php");

render(
    "teacher_center/org",
    array(
        "tpl_data" => array(
            "has_myorg" => 1, // 是否有权限查看本页内容
            "vip_level" => 3, // 会员等级
            "signed" => array(
                array(
                    "id" => 0,
                    "status" => 1,// 1表示用户还未处理要求,
                                  // 2表示用户已拒绝
                                  // 3表示已失效
                    "create_time" => "2012-12-01 00:00:00",
                     "im_online_status" => 1,
                    "org_manager_id" => 124, //无用字段
                    "org_number" => "329612312",
                    "org_url" => "http://lejiao.genshuixue.com/",
                    "sign_time" => "2015-05-01 00:00:00",
                    "fire_time" => "0000-00-00 00:00:00",
                    "org_name" => "亲子关系",
                    "org_logo" => "http://img.gsxservice.com/34618_vziuujxs.jpg",
                    "status_name" => "已签约"
                ),
            ),
            "lifted" => array( //已解约
            ),
            "invited" => array(
                array(
                    "id" => 0,
                    "status" => 1,// 1表示用户还未处理要求,
                                  // 2表示用户已拒绝
                                  // 3表示已失效
                    "create_time" => "2012-12-01 00:00:00",
                    "im_online_status" => 1,
                    "org_manager_id" => 124, //无用字段
                    "org_number" => "329612312",
                    "org_url" => "http://lejiao.genshuixue.com/",
                    "sign_time" => "2015-05-01 00:00:00",
                    "fire_time" => "0000-00-00 00:00:00",
                    "org_name" => "亲子关系",
                    "org_logo" => "http://img.gsxservice.com/34618_vziuujxs.jpg",
                    "status_name" => "已签约"
                ),
                array(
                    "id" => 0,
                    "status" => 0,// 0邀请中，1已签约，2已解约，3已拒绝，4已失效，5撤销邀请
                    "create_time" => "2012-12-01 00:00:00",
                    "im_online_status" => 1,
                    "org_manager_id" => 124, //无用字段
                    "org_number" => "329612312",
                    "org_url" => "http://lejiao.genshuixue.com/",
                    "sign_time" => "2015-05-01 00:00:00",
                    "fire_time" => "0000-00-00 00:00:00",
                    "org_name" => "亲子关系",
                    "org_logo" => "http://img.gsxservice.com/34618_vziuujxs.jpg",
                    "status_name" => "已签约"
                ),
                array(
                    "id" => 0,
                    "status" => 1,// 1表示用户还未处理要求,
                                  // 2表示用户已拒绝
                                  // 3表示已失效
                    "create_time" => "2012-12-01 00:00:00",
                    "im_online_status" => 1,
                    "org_manager_id" => 124, //无用字段
                    "org_number" => "329612312",
                    "org_url" => "http://lejiao.genshuixue.com/",
                    "sign_time" => "2015-05-01 00:00:00",
                    "fire_time" => "0000-00-00 00:00:00",
                    "org_name" => "亲子关系",
                    "org_logo" => "http://img.gsxservice.com/34618_vziuujxs.jpg",
                    "status_name" => "已签约"
                ),
            ),
            "shield_status" => 1, //如果为1 默认选中
            "pager" => array(
                'count' => 101,
                'page' => 3 ,
                'page_size' => 10
            ),
        )
    )
);
