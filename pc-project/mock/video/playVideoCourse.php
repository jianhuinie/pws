<?php

require("../bootstrap.php");

render(
    "video/playVideoCourse",
    array(
        "tpl_data" => array(
           "sign" => 'xxxx',
           "advert" => [
                "list" => [
                    [
                        "city" => "北京",
                        "company" => "百家互联科技有限公司百家互联科技有限公司",
                        "position" => "php研发工程师",
                        "payment" => "10-15元",
                        "url" => "http://www.genshuixue.com",
                        "more_url" => "http://www.genshuixue.com"
                    ],
                    [
                        "city" => "北京",
                        "company" => "百家互联科技有限公司",
                        "position" => "php研发工程师",
                        "payment" => "10-15元",
                        "url" =>  "http://www.genshuixue.com"
                    ]
                ],
                "more_url" => "http://www.genshuixue.com"
           ],
           "course_info"=> array(
                "id" => "1",
                "user_role" => "6", // 0老师 6机构
                "chapter_mode" => 2, // 章节模式，1：多节模式，2：章节模式
                "title_verify_status" => 1, // 视频标题0是成功 1是审核有问题
                "user_id" => "135000",
                "number" => "4294967295",
                "name" => "测试课程",
                "portrait" => "http://test-img.gsxservice.com/19064_zg3kqct1.jpeg",
                "price" => "30",
                "introduce" => "sdfsf ",
                "label_ids" => "12,23",
                "subject_id" => "13454",
                "expire_hours" => "240",
                "language" => "1",
                "profile_show" => "1",
                "course_items_count" => "20",
                "detail" => "sdfsf",
                "profit" => "0",
                "payers_count" => "0",
                "status" => "1",
                "create_time" => "2015-01-30 14:07:17",
                "update_time" => "0000-00-00 00:00:00",
                "material_info" => array(
                    "material_list" => array(
                        array(
                            "fid" => 76534, // 资料ID
                            "name" => "新高一语新高一语文知识点基础新高一语文知识点基础新高一语文知识点基础文知识点基础.jpg",    // 资料名称
                            "type" => "jpg1",    // 资料类型
                            "size" => "123",    // 资料大小(字节数)
                            "is_new" => true, // 是否是老师一周内上传的资料
                            "can_download" => true, // 是否可下载
                            "is_open" => true, // 是否可公开
                            "download_url" => "http://oss-cn-beijing.aliyuncs.com/genshuixue-private/ziliaoku/412964518/上庄水库尚野山庄.pdf?OSSAccessKeyId=BPvWuBAlq5rxM3qm&Expires=1473602727&Signature=Sl0llXCvDxPe8esZgOf5qeBBNF0=",
                            "preview_url" => "http://officeweb365.com/o/?i=0&furl=http%3A%2F%2Foss-cn-beijing.aliyuncs.com%2Fgenshuixue-private%2Fziliaoku%2F412964518%2F%E4%B8%8A%E5%BA%84%E6%B0%B4%E5%BA%93%E5%B0%9A%E9%87%8E%E5%B1%B1%E5%BA%84.pdf%3FOSSAccessKeyId%3DBPvWuBAlq5rxM3qm%26Expires%3D1473602727%26Signature%3DSl0llXCvDxPe8esZgOf5qeBBNF0%3D",
                            "download_report" => "page_str=/market/detail/course@user_number=877451078@fid=772139@course_number=160810488278@course_type=2@type=1",
                            "preview_report" => "page_str=/market/detail/course@user_number=877451078@fid=772139@course_number=160810488278@course_type=2@type=2"
                        ),
                        array(
                            "fid" => 76534, // 资料ID
                            "name" => "新高一语文知识点基础.jpg",    // 资料名称
                            "type" => "jpg",    // 资料类型
                            "size" => "123",    // 资料大小(字节数)
                            "is_new" => true, // 是否是老师一周内上传的资料
                            "can_download" => true, // 是否可下载
                            "is_open" => false, // 是否可公开
                            "download_url" => "http://oss-cn-beijing.aliyuncs.com/genshuixue-private/ziliaoku/412964518/上庄水库尚野山庄.pdf?OSSAccessKeyId=BPvWuBAlq5rxM3qm&Expires=1473602727&Signature=Sl0llXCvDxPe8esZgOf5qeBBNF0=",
                            "preview_url" => "http://officeweb365.com/o/?i=0&furl=http%3A%2F%2Foss-cn-beijing.aliyuncs.com%2Fgenshuixue-private%2Fziliaoku%2F412964518%2F%E4%B8%8A%E5%BA%84%E6%B0%B4%E5%BA%93%E5%B0%9A%E9%87%8E%E5%B1%B1%E5%BA%84.pdf%3FOSSAccessKeyId%3DBPvWuBAlq5rxM3qm%26Expires%3D1473602727%26Signature%3DSl0llXCvDxPe8esZgOf5qeBBNF0%3D",
                            "download_report" => "page_str=/market/detail/course@user_number=877451078@fid=772139@course_number=160810488278@course_type=2@type=1",
                            "preview_report" => "page_str=/market/detail/course@user_number=877451078@fid=772139@course_number=160810488278@course_type=2@type=2"
                        ),
                        array(
                            "fid" => 76534, // 资料ID
                            "name" => "课程资料支持下载副本.docx",    // 资料名称
                            "type" => "jpg",    // 资料类型
                            "size" => "123",    // 资料大小(字节数)
                            "is_new" => true, // 是否是老师一周内上传的资料
                            "can_download" => true, // 是否可下载
                            "is_open" => false, // 是否可公开
                            "download_url" => "http://oss-cn-beijing.aliyuncs.com/genshuixue-private/ziliaoku/412964518/上庄水库尚野山庄.pdf?OSSAccessKeyId=BPvWuBAlq5rxM3qm&Expires=1473602727&Signature=Sl0llXCvDxPe8esZgOf5qeBBNF0=",
                            "preview_url" => "http://officeweb365.com/o/?i=0&furl=http%3A%2F%2Foss-cn-beijing.aliyuncs.com%2Fgenshuixue-private%2Fziliaoku%2F412964518%2F%E4%B8%8A%E5%BA%84%E6%B0%B4%E5%BA%93%E5%B0%9A%E9%87%8E%E5%B1%B1%E5%BA%84.pdf%3FOSSAccessKeyId%3DBPvWuBAlq5rxM3qm%26Expires%3D1473602727%26Signature%3DSl0llXCvDxPe8esZgOf5qeBBNF0%3D",
                            "download_report" => "page_str=/market/detail/course@user_number=877451078@fid=772139@course_number=160810488278@course_type=2@type=1",
                            "preview_report" => "page_str=/market/detail/course@user_number=877451078@fid=772139@course_number=160810488278@course_type=2@type=2"
                        ),
                        array(
                            "fid" => 76534, // 资料ID
                            "name" => "新高一已语文知识点基础.jpg",    // 资料名称
                            "type" => "jpg",    // 资料类型
                            "size" => "123",    // 资料大小(字节数)
                            "is_new" => true, // 是否是老师一周内上传的资料
                            "can_download" => true, // 是否可下载
                            "is_open" => false, // 是否可公开
                            "download_url" => "http://oss-cn-beijing.aliyuncs.com/genshuixue-private/ziliaoku/412964518/上庄水库尚野山庄.pdf?OSSAccessKeyId=BPvWuBAlq5rxM3qm&Expires=1473602727&Signature=Sl0llXCvDxPe8esZgOf5qeBBNF0=",
                            "preview_url" => "http://officeweb365.com/o/?i=0&furl=http%3A%2F%2Foss-cn-beijing.aliyuncs.com%2Fgenshuixue-private%2Fziliaoku%2F412964518%2F%E4%B8%8A%E5%BA%84%E6%B0%B4%E5%BA%93%E5%B0%9A%E9%87%8E%E5%B1%B1%E5%BA%84.pdf%3FOSSAccessKeyId%3DBPvWuBAlq5rxM3qm%26Expires%3D1473602727%26Signature%3DSl0llXCvDxPe8esZgOf5qeBBNF0%3D",
                            "download_report" => "page_str=/market/detail/course@user_number=877451078@fid=772139@course_number=160810488278@course_type=2@type=1",
                            "preview_report" => "page_str=/market/detail/course@user_number=877451078@fid=772139@course_number=160810488278@course_type=2@type=2"
                        ),
                        array(
                            "fid" => 76534, // 资料ID
                            "name" => "新高一语文知识点基础.jpg",    // 资料名称
                            "type" => "jpg",    // 资料类型
                            "size" => "123",    // 资料大小(字节数)
                            "is_new" => true, // 是否是老师一周内上传的资料
                            "can_download" => true, // 是否可下载
                            "is_open" => false, // 是否可公开
                            "download_url" => "http://oss-cn-beijing.aliyuncs.com/genshuixue-private/ziliaoku/412964518/上庄水库尚野山庄.pdf?OSSAccessKeyId=BPvWuBAlq5rxM3qm&Expires=1473602727&Signature=Sl0llXCvDxPe8esZgOf5qeBBNF0=",
                            "preview_url" => "http://officeweb365.com/o/?i=0&furl=http%3A%2F%2Foss-cn-beijing.aliyuncs.com%2Fgenshuixue-private%2Fziliaoku%2F412964518%2F%E4%B8%8A%E5%BA%84%E6%B0%B4%E5%BA%93%E5%B0%9A%E9%87%8E%E5%B1%B1%E5%BA%84.pdf%3FOSSAccessKeyId%3DBPvWuBAlq5rxM3qm%26Expires%3D1473602727%26Signature%3DSl0llXCvDxPe8esZgOf5qeBBNF0%3D",
                            "download_report" => "page_str=/market/detail/course@user_number=877451078@fid=772139@course_number=160810488278@course_type=2@type=1",
                            "preview_report" => "page_str=/market/detail/course@user_number=877451078@fid=772139@course_number=160810488278@course_type=2@type=2"
                        )
                    ),
                    "total_count" => 23,  // 资料总数
                    "can_download_count" => 20, //可下载的资料总数
                    "has_more" => true,    // 更多资料
                    "user_login_status" => true, // 学生登录状态
                    "is_join" => true ,// 学生是否报名了该课程
                    "more_url" => "bjhlstudent://o.c?a=material_list?course_number=150616543488&course_type=2&page=2"
                )
            ),
            "teacher_info" => array( // 老师信息
                "user_number" => "374254498",
                "avatar" => "http://test-img.gsxservice.com/18732_i8vizsrd.jpeg",
                "realname" => "周伟",
                "url" => "http://www.genshuixue.com/yuin",
                "intro" => "理论联系实际理论联系实际理论联系实际理亿",
                "great_rate" => 12, // 好评率
            ),
            "organization_info" => array( // 机构信息
                "avatar_url"=>"http://img.gsxservice.com/7651908_qzp04fsm.jpg",
                "url"=>"http://www.genshuixue.com/yuin",
                "number"=>"124312321",
                "name"=>"张祥工作室",
                "brief"=>"简介简介简介简介简介简介",
                "great_rate" => 0.62, // 好评率
            ),
            "video_list" => array( // 课节列表(多节模式)
                array(
                    "section_id" => "16112587654", // 课节id
                    "title" => "Tyger自然拼读1a游戏攻略", // 课节名称
                    "status" => 0, // 审核状态, 0通过 1未通过
                    "play_count" => 549, // 视频播放次数
                    "total_length" => "15", // 总时长(分钟为单位)
                    "pay_status" => "1", // 付费状态标志1:免费，2:收费，3:试听
                    "media_id" => "4111", // ++
                    "index" => "100", // ++
                ),
                array(
                    "section_id" => "16112587654", // 课节id
                    "title" => "Tyger自然拼读1a游戏攻略", // 课节名称
                    "status" => 1,
                    "play_count" => 549, // 视频播放次数
                    "total_length" => "15", // 总时长(分钟为单位)
                    "pay_status" => "2", // 付费状态标志1:免费，2:收费，3:试听
                    "media_id" => "4111",
                    "index" => "101",
                ),
                array(
                    "section_id" => "16112587670",
                    "title" => "Tyger自然拼读1b游戏攻略",
                    "status" => 1,
                    "play_count" => 97,
                    "total_length" => "15", // 总时长(分钟为单位)
                    "pay_status" => "3", // 付费状态标志1:免费，2:收费，3:试听
                    "media_id" => "4111",
                    "index" => "102",
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
                            "pay_status" => "1", // 付费状态标志1:免费，2:收费，3:试听
                            "media_id" => "4111", // ++
                            "index" => "100", // ++
                        ),
                        array(
                            "section_id" => "16112587654", // 课节id
                            "title" => "Tyger自然拼读1a游戏攻略", // 课节名称
                            "status" => 1,
                            "play_count" => 549, // 视频播放次数
                            "total_length" => "15", // 总时长(分钟为单位)
                            "pay_status" => "2", // 付费状态标志1:免费，2:收费，3:试听
                            "media_id" => "4111", // ++
                            "index" => "110", // ++
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
                            "pay_status" => "3", // 付费状态标志1:免费，2:收费，3:试听
                            "media_id" => "4111", // ++
                            "index" => "100", // ++
                        )
                    ),
                    "item_list" => array(
                        array(
                            "id" => "16112587654", // 课节id
                            "name" => "Tyger自然拼读1a游戏攻略", // 课节名称
                            "status" => 1,
                            "play_count" => 549, // 视频播放次数
                            "total_length" => "15", // 总时长(分钟为单位)
                            "pay_status" => "3", // 付费状态标志1:免费，2:收费，3:试听
                            "media_id" => "4111", // ++
                            "index" => "100", // ++
                        )
                    )
                )
            ),
            "index_info" => array(
                "index" => 1,
                "section_id" => 123123123
            ),
            "additional" => array(  // 视频可评论后增加数据
                'price' => "10",
                'is_free' => true,
                'can_comment' => true,
                'has_comment' => false,
                'user_id' => "345739",
                'purchase_id_video' => null,
                'average' => 3, // 评分
                'short_introduce' => "一二三四五六七八九十"
            )
        )
    )
);