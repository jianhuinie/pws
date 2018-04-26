<?php

require("../bootstrap.php");

render(
    "video/detailOld",
    array(
        "tpl_data" => array(
            "huike" => array(
                "is_huike_course" => 1, // 1汇课间课程 0不是
                "org_logo" => 'http://img.gsxservice.com/15598803_ok17gpts.jpg@1e_98w_98h_1c_0i_1o_90Q_1x.jpg', // 机构logo
                "org_name" => '这里是机构名字',
                "org_url" => 'http://www.baidu.com/' // 机构链接
            ),
            "cashback" => 23, // 返奖学金
            "vip_level" => 3, // 0非会员 1普通会员 2高级会员 3超级会员
            "status" => 1, // 视频课编辑状态 1已发布 2待发布 3已下架
            "price" => 1, // 价格，0元课可直接开始学习
            "can_study" => false, // 是否可学习，true/false
            "sign" => 'xxxx',
            "is_verify" => true,
            "video_store_url" => 'http://www.genshuixue.com', // 来自知识视频库
            "zhenti_store_url" => 'http://www.genshuixue.com', // 来自真题库
            "is_juhuixue" => true, // 该课程是否来自聚惠学
            "user_number" => 1231231 , // 用户number
            "im_online_status" => 1,
            "is_access" => 1, // 0表示不可播,
            "course_type" => 3,
            "self_share_info" => "分享该课程获得的课酬，暂不收取平台服务费",
            "is_staging" => 1,
            "staging" => array(
                'desc' => "可享受3-12期分期付款",
                "data" => array(

                )
            ),
            "crumb"=>array(
                array(
                    "name"=>"123",
                    "url"=>"aaa"
                ),
                array(
                    "name"=>"123",
                    "url"=>"aaa"
                ),
                array(
                    "name"=>"123",
                    "url"=>"aaa"
                ),
                array(
                    "name"=>"123",
                    "url"=>"aaa"
                )
            ),
            "course_related" => array(
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
            "video_list" => array(
                array(
                    "id" => 12, //课节id 相当于section_id
                    "video_id" => 123232, //视频id
                    "video_unique" => '',//不知道这个是干嘛的
                    "name" => "玩转微信，你需要的四大技能玩转微信，你需要的四大技能玩转微信，你需要的四大技能",//课程标题
                    //"img" => "待确认" string
                    //preface_url_prefix  string
                    //video   string
                    "status" => 1,//课节状态 1 免费 2 试听 3 收费
                    "play_count" => 123,//播放次数
                    "video_verify_status" => 1, ///////0审核通过, 1标题审核失败,
                    //保留字段verify_status
                    //reasons string}
                ),
                array(
                    "id" => 232, //课节id 相当于section_id
                    "video_id" => 123232, //视频id
                    "video_unique" => '',//不知道这个是干嘛的
                    "name" => "玩转微信，你需要的四大技能",//课程标题
                    //"img" => "待确认" string
                    //preface_url_prefix  string
                    //video   string
                    "status" => 2,//课节状态 1 免费 2 试听 3 收费
                    "play_count" => 123,//播放次数
                    "video_verify_status" => 1, ///////0审核通过, 1标题审核失败,
                    //保留字段verify_status
                    //reasons string}
                ),
                array(
                    "id" => 12312, //课节id 相当于section_id
                    "video_id" => 123232, //视频id
                    "video_unique" => '',//不知道这个是干嘛的
                    "name" => "玩转微信，你需要的四大技能",//课程标题
                    //"img" => "待确认" string
                    //preface_url_prefix  string
                    //video   string
                    "status" => 3,//课节状态 1 免费 2 试听 3 收费
                    "play_count" => 123,//播放次数
                    "video_verify_status" => 1, ///////0审核通过, 1标题审核失败,
                    //保留字段verify_status
                    //reasons string}
                ),
                array(
                    "id" => 1212, //课节id 相当于section_id
                    "video_id" => 123232, //视频id
                    "video_unique" => '',//不知道这个是干嘛的
                    "name" => "玩转微信，你需要的四大技能",//课程标题
                    //"img" => "待确认" string
                    //preface_url_prefix  string
                    //video   string
                    "status" => 1,//课节状态 1 免费 2 试听 3 收费
                    "play_count" => 123,//播放次数
                    "video_verify_status" => 1, ///////0审核通过, 1标题审核失败,
                    //保留字段verify_status
                    //reasons string}
                ),
            ),
            "course_items_count" => 12312, //课节数
            "number" => 1231231,// 视频课number
            "title" => "北京 徐梅山-星座-居家风水-找好老师，上跟谁学",
            "name" => "课程标题课程标题课程标题课程标题课程标题", //课程标题
            "portrait" => "http://img.gsxservice.com/114578_yp7j5hrw.jpeg", //视频课封面图片url
            "introduce" => "视频玩转微信，你需要的四大技能玩转微信，你需要的四大技能玩转微信，你需要的四大技能玩转微信，你需要的四大技能玩转微信，你需要的四大技能玩转微信，你需要的四大技能玩转微信，你需要的四大技能玩转微信，你需要的四大技能玩转微信，你需要的四大技能简介", //视频简介
            "payers_count" => 123,//多少人在学
            "profit" => 0,
            "profile_show" => 0,
            "brief" => "课程详情页",
            "expire_time" => 0, // 过期时间
            "subject_id" => "12312,12212,1221,职业培训,求职技能,网络营销", //课程类别
            "language" => 2, //视频课语言 值为int类型
            "label_ids" => "互联网广告,微信营销,广告产品,经理培训,互联网广告,微信营销,广告产品,经理培训,互联网广告,微信营销,广告产品,经理培训,互联网广告,微信营销,广告产品,经理培训", //视频课程标签逗号分隔
            "teacher_name" => "老师名字是",
            "teacher_url" => "http://test03.genshuixue.com/874933708",//表示老师主页的url
            "teacher_avatar" => "http://img.gsxservice.com/80212_rycsv1at.png",//老师的头像
            "teacher_location" => "北京海淀区",//老师地址
            "teacher_short_introduce" => "7天教会你做互联天教会你做互联网产品交互逻辑网产品交互逻辑",//老师简介
            "teacher_id" => '438768537',
            "experience" => array(
                array(
                    "start_time" => '2012-12-12 12:12:12', //开始时间
                    "end_time" => 0, //结束时间为0表示至今
                    "content" => "先后在北京新东方、中国农业大学日语二外班、北京大学日语二外班、新东方在线、万门大学从事日语教学工作。率领【苏曼日语】团队驻守沪江CCTalk，提供高质量直播课公开课。", // 个人经历
                ),
                array(
                    "start_time" => '2011-12-12 12:12:12', //开始时间
                    "end_time" => '2010-02-12 12:12:12', //结束时间为0表示至今
                    "content" => "先后在北京新东方、中国农业大学日语二外班、北京大学日语二外班、新东方在线、万门大学从事日语教学工作。率领【苏曼日语】团队驻守沪江CCTalk，提供高质量直播课公开课。", // 个人经历
                ),
                array(
                    "start_time" => '2009-11-02 12:12:12', //开始时间
                    "end_time" => '2010-11-22 12:12:12', //结束时间为0表示至今
                    "content" => "先后在北京新东方、中国农业大学日语二外班、北京大学日语二外班、新东方在线、万门大学从事日语教学工作。率领【苏曼日语】团队驻守沪江CCTalk，提供高质量直播课公开课。", // 个人经历
                ),
                array(
                    "start_time" => '2009-11-02 12:12:12', //开始时间
                    "end_time" => '2010-11-22 12:12:12', //结束时间为0表示至今
                    "content" => "先后在北京新东方、中国农业大学日语二外班、北京大学日语二外班、新东方在线、万门大学从事日语教学工作。率领【苏曼日语】团队驻守沪江CCTalk，提供高质量直播课公开课。", // 个人经历
                ),
                array(
                    "start_time" =>  '2012-12-12 12:12:12', //开始时间
                    "end_time" => '2012-12-12 12:12:12', //结束时间为0表示至今
                    "content" => "先后在北京新东方、中国农业大学日语二外班、北京大学日语二外班、新东方在线、万门大学从事日语教学工作。率领【苏曼日语】团队驻守沪江CCTalk，提供高质量直播课公开课。", // 个人经历
                ),
            ),
            "keywords" => "北京 徐梅山-星座",
            "description" => "【找好老师，上跟谁学】因为专业所以权威，深入浅出、简单易懂、化繁为简、结合实际、实例分析，教授科目：星座-居家风水",
            "is_favored" => false, // 是否已收藏
            "popularity" => 120, // 收藏人气值
            "organization"=> array(
                "avatar"=>"http://img.gsxservice.com/7651908_qzp04fsm.jpg",
                "url"=>"asdsadsa",
                "number"=>"124312321",
                "im_online_status" => 1,
                "name"=>"张祥工作室",
                "brief"=>"简介简介简介简介简介简介",
                "vip_level"=>2
            ),
            "related_course"=>array(
            ),
            "other_courses"=>array(
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
            "limit_discount" => array( // 限时折扣
                "0" => array(
                    "start_time" => "2016-10-12 00:00:00",
                    "end_time" => "2016-10-14 00:00:00",
                    "tag_name" => "限时折扣",
                    "info" => "TEST 616",
                    "id" => "5",
                    "price" => "200.00", // 现价
                    "pre_price" => "500.00" // 原价
                )
            )
        )
    )
);

