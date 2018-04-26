<?php

require("../bootstrap.php");

render(
    "userCenter/teacherCenter/videoCourseEdit",
    array(
        "tpl_data" => array(
            "is_cloud_playback" => false, // 该视频课是否来自录播回放视频
            "edit_info" => 0, // 是否默认展开第一步
            "edit_video" => 1, // 是否默认展开第二步
            "status" => 3,// 1新增 2更新未发布 3更新已发布
            "video_status" => 1, //表示检查及审核状态, 0成功 1视频检查中 2视频检查失败 3审核中 4审核失败
            "user_number" => 123123,
            "number" => '', // 视频课程number
            "title" => "手把手教你如果做微信营销", //标题
            "portrait" => "http://img.gsxservice.com/114578_yp7j5hrw.jpeg",// 封面url
            "introduce" => "微信，一款当下最火的应用，超过三亿人使用，注册用户量超过6亿，已然改变着人们的生活方式，庞大的用户群潜藏着巨大的商机，如果说八年前你错过了淘宝，而今，微信刚刚风生水起，你能用微信做什么呢，升值加薪？推广产品？微型创业？……没有不敢想，只有不敢做，本课讲师从零基础开始，手把手教你教你，不论你是哪个行业，都能按图索骥，汲取到实用的养分而发展壮大。",// 简介
            "price" => 120,// 价格
            "price_ios" => 110, //ios价格
            "expire_time" => 10,// 过期时间
            "subject_id" => '1011,1090,1086,声乐,戏剧,鉴赏',//课程类别
            "language" => 3,//语言
            "label_ids" => "教学经验丰富,耐心细致,喜闻乐见,认真负责",//
            "divide_info" => [
                'join_divide' => 1,
                "divide_proportion" => [
                    "platform_proportion" => "0.30",
                    "teacher_proportion" => "0.70",
                    "share_platform_proportion" => "0.10",
                    "share_teacher_proportion" => "0.90"
                ]
            ],
            "video_list" => array(
                array(
                    "id" => 1111,// 课节id
                    "video_id" => 1231,//视频id
                    "title" => "微信营销第一课：如何获取有效粉丝群，提升粉丝活跃度", // 课节标题
                    "file_name" => "黑猫警长.mp4",
                    "type" => 1, //1 免费课节 2 试听课节 3付费课节
                    //时长这个待定最后来做
                    "video_status" => 4, //表示检查及审核状态, 0成功 1视频检查中 2视频检查失败 3审核中 4审核失败
                    "can_edit" => 0,// 是否可编辑, 1可编辑,0不可编辑
                    "video_can_del" => 0,//课节视频是否可删, 1是 0否
                    "section_can_del" => 0, //课节是否可删, 1是 0否,
                    "can_change" => 1, //1 可切换 0 不可切换
                    "verify_msg" => array(
                        "title" => array(
                            "可能涉及推广信息（广告、联系方式）",
                            "涉及版权、色情、政治等问题"
                        )
                    )
                ),
                array(
                    "id" => 1112,// 课节id
                    "video_id" => 1231,//视频id
                    "title" => "微信营销第二课：很便捷哦！支持电脑键盘快速输入、实时新消息提醒等功能", // 课节标题
                    "file_name" => "黑猫警长.mp4",
                    "type" => 2, //1 免费课节 2 试听课节 3付费课节
                    //时长这个待定最后来做
                    "video_status" => 2, //表示检查及审核状态, 0成功 1视频检查中 2视频检查失败 3审核中 4审核失败
                    "can_edit" => 1,// 是否可编辑, 1可编辑,0不可编辑
                    "video_can_del" => 1,//课节视频是否可删, 1是 0否
                    "section_can_del" => 1, //
                    "can_change" => 1, //1 可切换 0 不可切换
                    "verify_msg" => array(
                        "title" => array(
                            "可能涉及推广信息（广告、联系方式）",
                            "涉及版权、色情、政治等问题"
                        ),
                        "content" => array(
                        )
                    )
                ),
                array(
                    "id" => 1113,// 课节id
                    "video_id" => 1231,//视频id
                    "title" => "一键呼出微信窗口，实时提醒新消息，方便好用。更有豪礼大奖活动进行！", // 课节标题
                    "file_name" => "黑猫警长.mp4",
                    "type" => 3, //1 免费课节 2 试听课节 3付费课节
                    //时长这个待定最后来做
                    "video_status" => 4, //表示检查及审核状态, 0成功 1视频检查中 2视频检查失败 3审核中 4审核失败
                    "can_edit" => 1,// 是否可编辑, 1可编辑,0不可编辑
                    "video_can_del" => 1,//课节视频是否可删, 1是 0否
                    "section_can_del" => 1, //
                    "can_change" => 0, //1 可切换 0 不可切换
                    "verify_msg" => array(
                        "title" => array(
                        ),
                        "content" => array(
                            "内容跑题啦"
                        )
                    )
                ),
                array(
                    "id" => 1114,// 课节id
                    "video_id" => 1231,//视频id
                    "title" => "微信是腾讯公司基于QQ开发的一种可以用语音说的软件,不过手机是智能机才可以用的", // 课节标题
                    "file_name" => "黑猫警长.mp4",
                    "type" => 1, //1 免费课节 2 试听课节 3付费课节
                    //时长这个待定最后来做
                    "video_status" => 4, //表示检查及审核状态, 0成功 1视频检查中 2视频检查失败 3审核中 4审核失败
                    "can_edit" => 1,// 是否可编辑, 1可编辑,0不可编辑
                    "video_can_del" => 1,//课节视频是否可删, 1是 0否
                    "section_can_del" => 1, //
                    "can_change" => 0, //1 可切换 0 不可切换
                    "verify_msg" => array(
                    )
                ),
                array(
                    "id" => 1115,// 课节id
                    "video_id" => 1231,//视频id
                    "title" => "总是对着手机看微信是不是觉得屏幕太小不是特别方便", // 课节标题
                    "file_name" => "黑猫警长.mp4",
                    "type" => 1, //1 免费课节 2 试听课节 3付费课节
                    //时长这个待定最后来做
                    "video_status" => 4, //表示检查及审核状态, 0成功 1视频检查中 2视频检查失败 3审核中 4审核失败
                    "can_edit" => 1,// 是否可编辑, 1可编辑,0不可编辑
                    "video_can_del" => 1,//课节视频是否可删, 1是 0否
                    "section_can_del" => 1, //
                    "can_change" => 1, //1 可切换 0 不可切换
                ),
            ),
            "verify_faild_fields" => array(
                // "portrait" => array(
                //     "可能涉及推广信息（广告、联系方式）",
                //     "涉及版权、色情、政治等问题"
                // ),
                // "title" => array(
                //     "可能涉及推广信息（广告、联系方式）",
                //     "涉及版权、色情、政治等问题"
                // ),
                // "price" => array(
                //     "可能涉及推广信息（广告、联系方式）"
                // ),
                // "expire_time" => array(
                //     "可能涉及推广信息（广告、联系方式）",
                //     "涉及版权、色情、政治等问题"
                // ),
                "introduce" => array(
                    "可能涉及推广信息（广告、联系方式）",
                    "涉及版权、色情、政治等问题"
                ),
                // "subject_id" => array(
                //     "可能涉及推广信息（广告、联系方式）",
                //     "涉及版权、色情、政治等问题"
                // ),
                // "language" => array(
                //     "可能涉及推广信息（广告、联系方式）",
                //     "涉及版权、色情、政治等问题"
                // ),
                // "label_ids" => array(
                //     "可能涉及推广信息（广告、联系方式）",
                //     "涉及版权、色情、政治等问题"
                // ),
                // "brief" => array(
                //     "可能涉及推广信息（广告、联系方式）",
                //     "涉及版权、色情、政治等问题"
                // )
            ),
            "brief" => "课程详情",// 课程详情
            "report" => array( //视频上传上报
                "user_number" => "1321", //用户number
                "user_role" => 2, //用户角色 学生2 老师0
                "client" => 1, //客户端类型 1iphone 2ipad 3Android 4手机m站 5pc网页int
                "app" => 1, //app类型 1学生app 2老师app 3机构app 4直播助手
                "version" => '1.2.3.3' //版本号 包括:pc版本号、前端版本号、app版本号、ipad版本号
            )
        )
    )
);