<?php

require("../bootstrap.php");

render(
    "video/detail",
    array(
        "tpl_data" => array(
            "verify_status" => 1,
            "is_access" => 1,
            "course_type" => 3,
            "display_status" => 2,
            "crumb"=>array( // 面包屑
                array(
                    "name" => "跟谁学深圳站",
                    "url" => "aaa"
                ),
                array(
                    "name" => "123",
                    "url" => "aaa"
                ),
                array(
                    "name" => "123",
                    "url" => "aaa"
                ),
                array(
                    "name" => "123",
                    "url" => "aaa"
                )
            ),
            "course_related" => array( // 面包屑 - 相关课程
                array(
                    "id" => "109",
                    "name" => "全部",
                    "url" => "http://www.baidu.com/",
                    "level" => "3",
                    "parent_id" => "108"
                ),
                array(
                    "id" => "114",
                    "name" => "五年级",
                    "url" => "http://www.baidu.com/",
                    "level" => "3",
                    "parent_id" => "108"
                ),
                array(
                    "id" => "113",
                    "name" => "四年级",
                    "url" => "http://www.baidu.com/",
                    "level" => "3",
                    "parent_id" => "108"
                ),
                array(
                    "id" => "112",
                    "name" => "三年级",
                    "url" => "http://www.baidu.com/",
                    "level" => "3",
                    "parent_id" => "108"
                ),
                array(
                    "id" => "110",
                    "name" => "一年级",
                    "url" => "http://www.baidu.com/",
                    "level" => "3",
                    "parent_id" => "108"
                ),
                array(
                    "id" => "111",
                    "name" => "二年级",
                    "url" => "http://www.baidu.com/",
                    "level" => "3",
                    "parent_id" => "108"
                )
            ),
            "portrait" => "http://img.gsxservice.com/114578_yp7j5hrw.jpeg", //视频课封面图片url
            "name" => "课程标题课程标题课程标题课程题课程标题课程标题课程标题", // 课程标题
            "number" => 1231231, // 视频课number
            "sign" => 'xxxx',
            "is_verify" => true, // 是否是从审核系统过来
            "self_share_info" => "分享该课程获得的课酬，暂不收取平台服务费",
            "organization"=> array( // 老师所属机构信息
                "avatar_url"=>"http://img.gsxservice.com/7651908_qzp04fsm.jpg",
                "url"=>"asdsadsa",
                "number"=>"124312321",
                "im_online_status" => 1,
                "name"=>"张祥工作室",
                "brief"=>"简介简介简介简介简介简介",
                "membership_level" => 4
            ),
            // "teacher_name" => "老师名字是",
            // "teacher_avatar" => "http://img.gsxservice.com/80212_rycsv1at.png", // 老师的头像
            // "teacher_url" => "http://test03.genshuixue.com/874933708", // 表示老师主页的url
            // "vip_level" => 3, // 0非会员 1普通会员 2高级会员 3超级会员
            // "teacher_short_introduce" => "7天教会你做互联天教会你做互联网产品交互逻辑网产品交互逻辑",// 老师简介
            // "user_number" => 1231231 , // 用户number
            // "im_online_status" => 1,
            "teacher" => array( // 主讲老师
                array(
                    "number" => "877633148",
                    "vip_level" => 0,
                    "name" => "老师名字是",
                    "avatar" => "https://test-imgs.genshuixue.com/333574_u3ky9i9u.jpeg",
                    "intro" => "理论联系实际理论联系实际理论联系实际理亿",
                    "url" => "http://wanghaohua-www.test.genshuixue.com/877633148",
                    "im_online_status" => 0
                ),
                array(
                    "number" => "877633148",
                    "vip_level" => 0,
                    "name" => "老师名字是",
                    "avatar" => "https://test-imgs.genshuixue.com/333574_u3ky9i9u.jpeg",
                    "intro" => "理论联系实际理论联系实际理论联系实际理亿",
                    "url" => "http://wanghaohua-www.test.genshuixue.com/877633148",
                    "im_online_status" => 0
                )
            ),
            "course_items_count" => 12312, // 课节数
            "subject_id" => "12312,12212,1221,职业培训,求职技能,网络营销", // 课程类别
            "language" => 2, // 视频课语言 值为int类型
            "price" => 0, // 价格，0元课可直接开始学习
            "payer_count" => 123, // 多少人在学
            "play_count" => "1234",// 播放次数
            "fenqi_tag" => 1, // 是否可分期
            "fenqi" => array(
                "tag_name" => "分期付款",
                "tiexi_info" => "",
                "desc" => "可享3期分期付学费"
            ),
            "staging" => array( // 分期详细信息
                'desc' => "可享受3-12期分期付款",
                "data" => array(
                )
            ),
            "has_buy_course" => false, // 免费课已加入我的视频 || 付费课已购买
            "can_study" => false, // 是否可学习，true/false
            "first_trial_url" => "http://www.baidu.com/", // 第一节可试听课程链接，空则不可试听
            "expire_time" => 10, // 过期时间
            "limit_discount" => array( // 限时折扣 - 这里后期要改下，限额折扣
                "0" => array(
                    "start_time" => "2016-10-12 00:00:00",
                    "end_time" => "2017-10-14 00:00:00",
                    "tag_name" => "限时折扣",
                    "info" => "TEST 616",
                    "id" => "5",
                    "price" => "200.00", // 现价
                    "pre_price" => "500.00" // 原价
                )
            ),
            "discount" => array( // 限时折扣
                "start_time" => "2016-10-12 00:00:00",
                "end_time" => "2017-10-14 00:00:00",
                // "tag_name" => "限时折扣",
                // "info" => "TEST 616",
                // "id" => "5",
                "discount_price" => "200.00", // 现价
                "pre_price" => "500.00", // 原价
                "type" => 1, // 1为限额 2为限时
                "remain_amount" => 40, // 限额，剩余名额
            ),
            "coupons" => array( // 优惠券
                array(
                    "code" => 5,
                    "source_id" => '13421343',
                    "serial_num" => 'fdjslkfewioeuoiqr342423', // 优惠券编码
                    "source_user_role" => 6, // 6老师 10机构
                    "id" => "705491276b540ecfa6976a31c3b071e3",
                    "org_name" => "博图教育",
                    "status" => 1,
                    "balance" => 50,
                    "cond_threshold" => 500,
                    "total_money" => "20.00",
                    "cond_threshold" => "100.00",
                    "effect_time" => "2015-03-20 00:00:00",
                    "expire_time" => "2015-03-30 00:00:00",
                    "remain_coupon" => 997,
                    "max_recv_count" => "3",
                    "get_status" => 1,
                    "remain_count" => 1,
                    'cond_course_type' => 0 // 0不限 2班课 3视频课
                ),
                array(
                    "code" => 5,
                    "source_id" => '13421343',
                    "serial_num" => 'fdjslkfewioeuoiqr342423', // 优惠券编码
                    "source_user_role" => 6, // 6老师 10机构
                    "id" => "705491276b540ecfa6976a31c3b071e3",
                    "org_name" => "博图教育",
                    "status" => 1,
                    "balance" => 50,
                    "cond_threshold" => 500,
                    "total_money" => "20.00",
                    "cond_threshold" => "100.00",
                    "effect_time" => "2015-03-20 00:00:00",
                    "expire_time" => "2015-03-30 00:00:00",
                    "remain_coupon" => 997,
                    "max_recv_count" => "3",
                    "get_status" => 1,
                    "remain_count" => 1,
                    'cond_course_type' => 2 // 0不限 2班课 3视频课
                )
            ),
            "video_store_url" => 'http://www.genshuixue.com', // 来自知识视频库
            "zhenti_store_url" => 'http://www.genshuixue.com', // 来自真题库
            "is_juhuixue" => true, // 该课程是否来自聚惠学
            "introduce" => "视频玩转微信，你需要的四大技能玩转微信，你需要的四大技能玩转微信，
                            你需要的四大技能玩转微信，你需要的四大技能玩转微信，你需要的四大技能玩转微信，你需要的四大技能玩转微信，
                            你需要的四大技能玩转微信，你需要的四大技能玩转微信，你需要的四大技能简介", // 视频简介
            "brief" => "课程详情页", // 课程详情
            "label_ids" => "微信营销,广告产品,经理培训,微信营销,广告产品,经理培训微信营销,广告产品,经理培训", // 视频课程标签逗号分隔
            "chapter_mode" => 1, // 章节模式，1：多节模式，2：章节模式
            "video_list" => array( // 课节列表(多节模式)
                array(
                    "section_id" => "16112587654", // 课节id
                    "title" => "Tyger自然拼读1a游戏攻略", // 课节名称
                    "status" => 1,
                    "play_count" => 549, // 视频播放次数
                    "total_length" => "15", // 总时长(分钟为单位)
                    "pay_status" => "1" // 付费状态标志1:免费，2:收费，3:试听
                ),
                array(
                    "section_id" => "16112587654", // 课节id
                    "title" => "Tyger自然拼读1a游戏攻略", // 课节名称
                    "status" => 1,
                    "play_count" => 549, // 视频播放次数
                    "total_length" => "15", // 总时长(分钟为单位)
                    "pay_status" => "2" // 付费状态标志1:免费，2:收费，3:试听
                ),
                array(
                    "section_id" => "16112587670",
                    "title" => "Tyger自然拼读1b游戏攻略",
                    "status" => 1,
                    "play_count" => 97,
                    "total_length" => "15", // 总时长(分钟为单位)
                    "pay_status" => "3" // 付费状态标志1:免费，2:收费，3:试听
                )
            ),
            "video_list_chapter" => array( // 课节列表(章节模式)
                array(
                    "title" => "这里是一个章标题", // 章标题
                    "introduce" => "xxx", // 章简介
                    "item_list" => array(
                        array(
                            "section_id" => "16112587654", // 课节id
                            "title" => "Tyger自然拼读1a游戏攻略", // 课节名称
                            "status" => 1,
                            "play_count" => 549, // 视频播放次数
                            "total_length" => "15", // 总时长(分钟为单位)
                            "pay_status" => "1" // 付费状态标志1:免费，2:收费，3:试听
                        ),
                        array(
                            "section_id" => "16112587654", // 课节id
                            "title" => "Tyger自然拼读1a游戏攻略", // 课节名称
                            "status" => 1,
                            "play_count" => 549, // 视频播放次数
                            "total_length" => "15", // 总时长(分钟为单位)
                            "pay_status" => "2" // 付费状态标志1:免费，2:收费，3:试听
                        )
                    )
                ),
                array(
                    "title" => "xxx", // 章标题
                    "introduce" => "xxx", // 章简介
                    "item_list" => array(
                        array(
                            "id" => "16112587654", // 课节id
                            "name" => "Tyger自然拼读1a游戏攻略", // 课节名称
                            "status" => 1,
                            "play_count" => 549, // 视频播放次数
                            "total_length" => "15", // 总时长(分钟为单位)
                            "pay_status" => "3" // 付费状态标志1:免费，2:收费，3:试听
                        )
                    ),
                    "item_list" => array(
                        array(
                            "id" => "16112587654", // 课节id
                            "name" => "Tyger自然拼读1a游戏攻略", // 课节名称
                            "status" => 1,
                            "play_count" => 549, // 视频播放次数
                            "total_length" => "15", // 总时长(分钟为单位)
                            "pay_status" => "3" // 付费状态标志1:免费，2:收费，3:试听
                        )
                    )
                )
            ),
            "material_info" => array( // 课程资料
                "user_login_status" => false, // 用户登录状态
                "is_join" => false, // 用户是否加入了课程(购买)
                "total_count" => 2, // 课程资料总数
                "can_download_count" => 2, // 可下载的课程资料总数
                "material_list" => array(
                    array(
                        "fid" => "26786185", // 资料fid
                        "name" => "总复习三.doc", // 资料名
                        "type" => "word", // 资料类型
                        "size" => "82386", // 资料大小
                        "is_new" => true, // 是否是七天内上传的资料
                        "can_download" => true, // 资料是否可下载
                        "is_open" => true, // 资料是否公开
                        "download_url" => "http://www.genshuixue.com/course_material/download?fid=26851542&number=161126976299"
                    ),
                    array(
                        "fid" => "26046203",
                        "name" => "第八讲：综合历年典型题型(1).doc",
                        "type" => "word",
                        "size" => "137692",
                        "is_new" => false,
                        "can_download" => true,
                        "is_open" => false,
                        "download_url" => "http://www.genshuixue.com/course_material/download?fid=26851542&number=161126976299"
                    )
                )
            ),
            "other_courses"=>array( // 老师其他课程
                array(
                    "name"=>"name",
                    "price"=>"0",
                    "avatar"=>"wqe",
                    "url"=>"asdas",
                    "total_pay"=>"12",
                ),
                array(
                    "name"=>"name",
                    "price"=>"1.2",
                    "avatar"=>"wqe",
                    "url"=>"asdas",
                    "total_pay"=>"12",
                ),
                array(
                    "name"=>"name",
                    "price"=>"1.2",
                    "avatar"=>"wqe",
                    "url"=>"asdas",
                    "total_pay"=>"12",
                ),
                array(
                    "name"=>"name",
                    "price"=>"1.2",
                    "avatar"=>"wqe",
                    "url"=>"asdas",
                    "total_pay"=>"12",
                ),
            ),
            "related_course"=>array( // 相关课程
            ),

        )
    )
);

