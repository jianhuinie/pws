<?php

require("../bootstrap.php");

render(
    "teacher_center/myVideoCourse",
    //video_course/getcourselist?type=1&page=1&page_size=10
    //全部1 付费2 免费3 待发布4 已下架 5
    //添加视频课url /video_course/getcourseeditdetail?status=1
    //编辑视频课url /video_course/getcourseeditdetail?number=asdlkfalsd&user_number=alsdkfj&status=2
    //视频详情页url /video_course/getcourseshowdetail?number=asldkfjsaldf&user_number=alsjfsal
    //视频详情页url(新) /video_course/number=asldkfjsaldf?user_number=alsjfsal
    array(
        "tpl_data" => array(
            'type' => 1, //全部1 付费2 免费3 待发布4 已下架 5
            'main_count' => 2, //表示一共有多少条数据显示在主页
            "video_list" => array(
                array(
                    'number' => '954673829',
                    'portrait' => 'http://img.gsxservice.com/114578_yp7j5hrw.jpeg', //封面url
                    'name' => '1手把手教你微信营销手把手教你微信营销手把手教你微信营销手把手教你微信营销',
                    'introduce' => '大搜车作为二手车寄售大搜车作为二手车寄售大搜车作为二手车寄售大搜车作为二手车寄售大搜车作为二手车寄售大搜车作为二手车寄售大搜车作为二手车寄售大搜车作为二手车寄售大搜车作为二手车寄售大搜车作为二手车寄售大搜车作为二手车寄售大搜车作为二手车寄售大搜车作为二手车寄售大搜车作为二手车寄售大搜车作为二手车寄售大搜车作为二手车寄售大搜车作为二手车寄售大搜车作为二手车寄售大搜车作为二手车寄售',
                    'price' => 59, //价格
                    'price_ios' => 65, //ios设备上的价格
                    'self_share_info' => "分享该课程获得的课酬，暂不收取平台服务费",
                    'payers_count' => 0, //多少人购买
                    'income' => 1000,
                    'outer_from' => "0",
                    'profit' => 13039, // 课程收益
                    'profile_show' => 0, // 是否展示在主页
                    'status' => 3, //表示课程状态(1已发布 2待发布 3已下架)
                    'online_status' => 1, // 在线状态（-1无效 1上架 3下架） 在线状态优先用这个属性，而不是 status
                    'video_status' => 1, //0成功 1视频检查中 2视频检查失败 3审核中 4审核失败
                    'video_status_msg' => '', //视频状态相关信息
                    'can_delete' => 'true', // 是否可删除
                    'can_cancel' => 'true', // 是否可撤销发布
                ),
                array(
                    'number' => '9',
                    'portrait' => 'http://img.gsxservice.com/114578_yp7j5hrw.jpeg', //封面url
                    'name' => '2手把手教你微信营销手把手教你微信营销手把手教你微信营销手把手教你微信营销',
                    'introduce' => '大搜车作为二手车寄售平台，上游经销商委托其代理销售；但是因为车辆销售存在一定周期，为了提高资金周转效率，进而产生了融资需求。根据合作协议，大搜车向积木盒子推荐其稳定合作关系的二手车经销商作为融资主体；经销商拟销售车辆必须通过大搜车车辆准入并完成车况检验后，存放于大搜车自有仓库待销售后，方可上线融资。',
                    'price' => 59, //价格
                    'price_ios' => 65, //ios设备上的价格
                    'self_share_info' => "分享该课程获得的课酬，暂不收取平台服务费",
                    'payers_count' => 221, //多少人购买
                    'income' => 1000,
                    'outer_from' => "0",
                    'profit' => 13039, // 课程收益
                    'profile_show' => 0, // 是否展示在主页
                    'status' => 3, //表示课程状态(1已发布 2待发布 3已下架)
                    'video_status' => 2, //0成功 1视频检查中 2视频检查失败 3审核中 4审核失败
                    'video_status_msg' => '视频课中4个课节无法正常播放，请替换后再次发布', //视频状态相关信息
                    'can_delete' => 'true', // 是否可删除
                    'can_cancel' => 'false', // 是否可撤销发布
                ),
                array(
                    'number' => '9',
                    'portrait' => 'http://img.gsxservice.com/114578_yp7j5hrw.jpeg', //封面url
                    'name' => '3手把手教你微信营销手把手教你微信营销手把手教你微信营销手把手教你微信营销',
                    'introduce' => '大搜车作为二手车寄售平台，上游经销商委托其代理销售；但是因为车辆销售存在一定周期，为了提高资金周转效率，进而产生了融资需求。根据合作协议，大搜车向积木盒子推荐其稳定合作关系的二手车经销商作为融资主体；经销商拟销售车辆必须通过大搜车车辆准入并完成车况检验后，存放于大搜车自有仓库待销售后，方可上线融资。',
                    'price' => 0, //价格
                    'outer_from' => "0",
                    'price_ios' => 65, //ios设备上的价格
                    'self_share_info' => "分享该课程获得的课酬，暂不收取平台服务费",
                    'payers_count' => 221, //多少人购买
                    'income' => 1000,
                    'profit' => 13039, // 课程收益
                    'profile_show' => 0, // 是否展示在主页
                    'status' => 3, //表示课程状态(1已发布 2待发布 3已下架)
                    'video_status' => 3, //0成功 1视频检查中 2视频检查失败 3审核中 4审核失败
                    'video_status_msg' => '', //视频状态相关信息
                    'can_delete' => 'true', // 是否可删除
                    'can_cancel' => 'false', // 是否可撤销发布
                ),
                array(
                    'number' => '9',
                    'portrait' => 'http://img.gsxservice.com/114578_yp7j5hrw.jpeg', //封面url
                    'name' => '4手把手教你微信营销手把手教你微信营销手把手教你微信营销手把手教你微信营销',
                    'introduce' => '大搜车作为二手车寄售平台，上游经销商委托其代理销售；但是因为车辆销售存在一定周期，为了提高资金周转效率，进而产生了融资需求。根据合作协议，大搜车向积木盒子推荐其稳定合作关系的二手车经销商作为融资主体；经销商拟销售车辆必须通过大搜车车辆准入并完成车况检验后，存放于大搜车自有仓库待销售后，方可上线融资。',
                    'price' => 59, //价格
                    'outer_from' => "0",
                    'price_ios' => 65, //ios设备上的价格
                    'self_share_info' => "分享该课程获得的课酬，暂不收取平台服务费",
                    'payers_count' => 221, //多少人购买
                    'income' => 1000,
                    'profit' => 13039, // 课程收益
                    'profile_show' => 1, // 是否展示在主页
                    'status' => 2, //表示课程状态(1已发布 2待发布 3已下架)
                    'video_status' => 4, //0成功 1视频检查中 2视频检查失败 3审核中 4审核失败
                    'video_status_msg' => '', //视频状态相关信息
                    'can_delete' => 'true', // 是否可删除
                    'can_cancel' => 'true', // 是否可撤销发布
                ),
                array(
                    'number' => '9',
                    'portrait' => 'http://img.gsxservice.com/114578_yp7j5hrw.jpeg', //封面url
                    'name' => '5手把手教你微信营销手把手教你微信营销手把手教你微信营销手把手教你微信营销',
                    'introduce' => '大搜车作为二手车寄售平台，上游经销商委托其代理销售；但是因为车辆销售存在一定周期，为了提高资金周转效率，进而产生了融资需求。根据合作协议，大搜车向积木盒子推荐其稳定合作关系的二手车经销商作为融资主体；经销商拟销售车辆必须通过大搜车车辆准入并完成车况检验后，存放于大搜车自有仓库待销售后，方可上线融资。',
                    'price' => 59, //价格
                    'price_ios' => 65, //ios设备上的价格
                    'self_share_info' => "分享该课程获得的课酬，暂不收取平台服务费",
                    'payers_count' => 221, //多少人购买
                    'income' => 1000,
                    'outer_from' => "2",
                    'profit' => 13039, // 课程收益
                    'profile_show' => 0, // 是否展示在主页
                    'status' => 1, //表示课程状态(1已发布 2待发布 3已下架)
                    'video_status' => 0, //0成功 1视频检查中 2视频检查失败 3审核中 4审核失败
                    'video_status_msg' => '', //视频状态相关信息
                    'can_delete' => 'true', // 是否可删除
                    'can_cancel' => 'false', // 是否可撤销发布
                ),
            ),
            //分页
            'pager'=>array(
                'count' => 58, //总条数
                'page' => 6 , //
                'page_size' => 10 //
            ),
        )
    )
);
