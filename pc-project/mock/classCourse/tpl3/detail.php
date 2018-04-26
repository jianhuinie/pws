<?php

require("../../bootstrap.php");

render(
    "classCourse/tpl3/detail",
    array(
        "tpl_data" => array(
            "is_one_on_one_teacher" => true, //是否是一对一老师
            "one_on_one_teacher_mobile" => 14444444,
            "support_student_advisory" => true, // 该机构班课是否支持学生预约试听（个人老师班课直接走留单逻辑）
            "is_preview" => 0,
            "is_favored" => false, // 是否收藏本课程
            "popularity" => 1899, // 已被收藏次数，人气值
            "is_juhuixue" =>true, //是否是聚会学
            "course_type" => 3, // 4－3810课程
            "is_staging" => 1,
            "fenqi" => array(
                "tag_name" => "分期付款",
                "tiexi_info" => "",
                "desc" => "可享3期分期付学费"
            ),
            "staging" => array(
                'desc' => "可享受3-12期分期付款",
                "data" => array(

                )
            ),
            "course_path" => array(
                "1" => array(
                    "id" => "573",
                    "name" => "IT",
                    "level" => "1",
                    "subnodes" => "9",
                    "display_order" => "498",
                    "hidden" => "0",
                    "parent_id" => "0",
                    "remark_name" => "IT",
                    "subject_type" => "0",
                    "verify_status" => "1",
                    "tag" => null,
                    "image" => "http://img.gsxservice.com/87490_57d3vyno.jpeg",
                    "teacher_count" => "1"
                ),
                "2" => array(
                    "id" => "578",
                    "name" => "常用软件",
                    "level" => "2",
                    "subnodes" => "16",
                    "display_order" => "7",
                    "hidden" => "0",
                    "parent_id" => "573",
                    "remark_name" => "常用软件",
                    "subject_type" => "0",
                    "verify_status" => "1",
                    "tag" => null,
                    "image" => "http://img.gsxservice.com/88124_ge5x6cqu.png",
                    "teacher_count" => "1"
                ),
                "3" => array(
                    "id" => "587",
                    "name" => "其他",
                    "level" => "3",
                    "subnodes" => "0",
                    "display_order" => "0",
                    "hidden" => "0",
                    "parent_id" => "578",
                    "remark_name" => "其他",
                    "subject_type" => "0",
                    "verify_status" => "1",
                    "tag" => null,
                    "image" => "http://img.gsxservice.com/80383_2qgqwoyw.jpeg",
                    "teacher_count" => "1"
                )
            ),
            "course_related" => array( // 面包屑－相关课程
                array(
                    "id" => "238",
                    "name" => "语文",
                    "level" => "3",
                    "parent_id" => "238"
                ),
                array(
                    "id" => "239",
                    "name" => "数学",
                    "level" => "3",
                    "parent_id" => "238"
                )
            ),
            "is_organization" => true,
            "teacher_profiles" => array(
                array(
                    "vip_level" => 3, // 0非会员 1普通会员 2高级会员 3超级会员
                    "display_name" => "江天权",
                    "number" => "371534498",
                    "im_online_status" => 1,
                    "private_domain" => "371534498",
                    "order_comment_count" => 10,
                    "invite_comment_count" => 10,
                    "photo_url" => "../../../src/img/classCourse/pic1.jpg",
                    "school_age" => -1,
                    "score" => 4.5,
                    "area_id" => '32479801324',
                    'user_id' => '112233',
                    "short_intro" => "深入浅出深入浅出权威名师深入浅出权威名师权威名师权威名师",
                ),
                array(
                    "vip_level" => 3, // 0非会员 1普通会员 2高级会员 3超级会员
                    "display_name" => "江天权1",
                    "im_online_status" => 1,
                    "number" => "371534498",
                    "private_domain" => "371534498",
                    "order_comment_count" => 10,
                    "invite_comment_count" => 10,
                    "photo_url" => "../../../src/img/classCourse/pic1.jpg",
                    "school_age" => -1,
                    "score" => 4.5,
                    "area_id" => '32479801324',
                    'user_id' => '112233',
                    "short_intro" => "深入浅出深入浅出权威名师深入浅出权威名师权威名师权威名师",
                ),
                array(
                    "vip_level" => 3, // 0非会员 1普通会员 2高级会员 3超级会员
                    "display_name" => "江天权2",
                    "im_online_status" => 1,
                    "number" => "371534498",
                    "private_domain" => "371534498",
                    "order_comment_count" => 10,
                    "invite_comment_count" => 10,
                    "photo_url" => "../../../src/img/classCourse/pic1.jpg",
                    "school_age" => -1,
                    "score" => 4.5,
                    "area_id" => '32479801324',
                    'user_id' => '112233',
                    "short_intro" => "深入浅出深入浅出权威名师深入浅出权威名师权威名师权威名师",
                )
            ),
            "crumb" => array(
                "host" => "http://www.genshuixue.com/bj/",
                "city" => array(
                    "name" => "北京"
                )
            ),
            "coupons" => array(
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
            "course_info" => array(
                "playback_expire_day" => 10,  // 回放有效期
                "auto_playback_record" => 1,
                "id" => 123213, //班课id
                "is_sign" => true,
                "recent_time" => '2017-12-11 18:45',
                "number" => "1311134745712",//班课number
                "user_id" => 1232131, //老师的UID
                "subject_id" => '383', //班课包含的subject的id
                "organization_number" => null,
                "lesson_way" => 2, //可上课的方式 4普通场地课2普通在线3在线公开课
                "class_type" => 1,
                "price" => 0.01,//课程价格
                "original_price" => "0.06",
                "max_student" => 200,//最大学生数
                "apply_student" => 3,
                "min_student" => 5, //最低开班人数,
                "count_over" => "3",
                "cover" => array(
                    "id" => 1243,
                    "title" => "班课上课中",
                    "url" => "http://test-img.gsxservice.com/12403_fgedr62s.png",
                    "width" => 1440,
                    "height" => 810,
                    "storage_id" => "88258",
                    "create_time" => '1420605172'
                ),
                "name" => "班课介绍班课介绍班课介绍班课介绍班课介绍班课介绍",
                "information" => "班课介绍班课介绍班课介绍",
                "introduction" => "", // 班课介绍
                "material_info" => array(
                    "material_list" => array(
                        array(
                            "fid" => 76534, // 资料ID
                            "name" => "新高一语文知识点基础.jpg",    // 资料名称
                            "type" => "jpg",    // 资料类型
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
                    "is_join" => false ,// 学生是否报名了该课程
                    "more_url" => "bjhlstudent://o.c?a=material_list?course_number=150616543488&course_type=2&page=2"
                ),
                "intro" => array(
                    "style" => "pink",
                    "items" => [
                        array(
                            "id" => "2053",
                            "class_course_number" => "160816486209",
                            "type" => "title",
                            "text" => "我是一个标题",
                            "font_weight" => null,
                            "font_size" => null,
                            "text_align" => null,
                            "color" => null,
                            "length" => "0",
                            "storage_id" => null,
                            "video_id" => null,
                            "created_at" => "2016-08-16 09:58:52",
                            "updated_at" => null
                        ),
                        array(
                            "id" => "2054",
                            "class_course_number" => "160816486209",
                            "type" => "body",
                            "text" => "   测试hdajshdSD哈金斯等哈说记到哈三季度哈市撒娇的哈就四点哈斯基等哈圣诞节哈斯基等哈圣诞节卡上贷记卡三大和撒就看到哈市\n\n\ndasdasda\n\n\ndasdasdas\nda   dasd\ndasdas\n\n\ndasdad   测试ndasdasdandasdasdas\nda   dasd\ndasdasndasdad   测试ndasdasdandasdasdas\nda   dasd\ndasdasndasdad   测试ndasdasdandasdasdas\nda   dasd\ndasdasndasdad   测试ndasdasdandasdasdas\nda   dasd\ndasdasndasdad   测试ndasdasdandasdasdas\nda   dasd\ndasdasndasdad   测试ndasdasdandasdasdas\nda   dasd\ndasdas\n\n\ndasdad",
                            "font_weight" => "bold",
                            "font_size" => "17px",
                            "text_align" => "left",
                            "color" => "#FC5C5A",
                            "length" => "0",
                            "storage_id" => null,
                            "video_id" => null,
                            "created_at" => "2016-08-16 09:58:52",
                            "updated_at" => null
                        ),
                        array(
                            "type" => "title",
                            "text" => "22",
                            "font_weight" => null,
                            "font_size" => null,
                            "text_align" => null,
                            "color" => null,
                            "length" => "0",
                            "storage_id" => null,
                            "video_id" => null,
                            "url" => null,
                            "cover" => null
                        ),
                        array(
                            "type" => "body",
                            "text" => "3333",
                            "font_weight" => "normal",
                            "font_size" => "15px",
                            "text_align" => "left",
                            "color" => "#000000",
                            "length" => "0",
                            "storage_id" => null,
                            "video_id" => null,
                            "url" => null,
                            "cover" => null
                            ),
                        array(
                            "type" => "image",
                            "text" => null,
                            "font_weight" => null,
                            "font_size" => null,
                            "text_align" => null,
                            "color" => null,
                            "length" => "0",
                            "storage_id" => 189395,
                            "video_id" => null,
                            "url" => "http://test-img.gsxservice.com/753527_ceyk1kh1.jpeg",
                            "cover" => null
                        ),
                        array(
                            "type" => "image",
                            "text" => null,
                            "font_weight" => null,
                            "font_size" => null,
                            "text_align" => null,
                            "color" => null,
                            "length" => "0",
                            "storage_id" => 189394,
                            "video_id" => null,
                            "url" => "http://test-img.gsxservice.com/753526_hk51sr7z.jpeg",
                            "cover" => null
                        ),
                        array(
                            "type" => "audio",
                            "text" => null,
                            "font_weight" => null,
                            "font_size" => null,
                            "text_align" => null,
                            "color" => null,
                            "length" => "0",
                            "storage_id" => 189396,
                            "video_id" => null,
                            "url" => "http://test-img.gsxservice.com/753528_31fkwon9.mp3",
                            "cover" => null
                        ),
                        array(
                            "type" => "video",
                            "text" => null,
                            "font_weight" => null,
                            "font_size" => null,
                            "text_align" => null,
                            "color" => null,
                            "length" => "0",
                            "storage_id" => null,
                            "video_id" => 15569,
                            "url" => "http://test.genshuixue.com/video/view/vu103800",
                            "cover" => "http://test-img.gsxservice.com/00-upload/image-test/66260_0b5c5d553ad458fdb2846496e145f71b_phlvYcGf.jpg"
                        )
                    ]
                ),
                "student_desc" => "小学生", //适学人群
                "target" => "提高到100分", //教学目标
                "arrangement" => "01月13日 18:30开课 01月31日 12:00结课 共14节",//课程安排
                "use_regular_addr" => "1",
                "area_id" => '17040384',
                "address" => "北京市昌平区回龙观镇史各庄村村委会村委会", //上课地点
                "offline_poi"=> array(
                    "lng"=> "116.246701",
                    "lat"=> "39.914957"
                ),
                "user_address_id" => '35374',
                "status" => 1, //班课状态 1初始状态,2可以招生但是尚未招生
                               //3正在招生,4停止招生,5开课,6课程结束
                "open_status" => 2, //确认开班 1 未确认开班 2 关闭开班 3
                "verify_status" => 1, //审核状态 1审核通过 2审核被拒
                "mobile_visible" => 1,
                "reason" => 1, //审核拒绝原因
                "reason_text" => "XXX", //审核拒绝相关
                "is_complete" => 1,
                "chaban_flag" => 1, //插班标识 1不可插班 2第n节课前可插班 3随时可插班
                "chaban_quota" => 0, //第n节课前可插班
                "chaban_price_flag" => 1, //插班价格标识 1未结束课程的总价 2自定义插班价
                "chaban_price" => 9.9,//插班价格
                "retire_flag" => 1, //退班规则 1.随时可退 2.1小时 3第几节课
                "retire_length" => 3,
                "begin_time" => "2014年12月2日", //课程开始时间
                "end_time" => "2014年12月3日", //课程结束时间
                "course_len" => 4800,
                "create_time" => "2013-08-03 19:27:21", //课程创建时间
                "update_time" => "2014-08-11 19:30:07", //课程更新时间
                "special_time_reason" => null,
                "user_number" => "32438729473",
                "photos" => array(
                    array(
                        'id' => '',
                        'create_time' => '',
                        'url' => "../../../src/img/classCourse/title.jpg",
                        'title' => '纷纷为撒旦法',
                        'width' => 1200,
                        'height' => 801
                    ),
                    array(
                        'id' => '',
                        'create_time' => '',
                        'url' => "../../../src/img/classCourse/content.jpg",
                        'title' => '纷纷为撒旦法',
                        'width' => 1200,
                        'height' => 801
                    ),
                    array(
                        'id' => '',
                        'create_time' => '',
                        'url' => "../../../src/img/classCourse/pic5.jpg",
                        'title' => '纷纷为撒旦法',
                        'width' => 1200,
                        'height' => 801
                    ),
                ), //照片
                "schedule" => array(
                    array(
                        "id" => "1",
                        "user_id" => "987",
                        "class_course_number" => "1415954843297",
                        "begin_time" => "1444719498",
                        "end_time" => "1444719598",
                        "course_len" => "01:00:00",
                        "is_over" => "1",
                        "content" => "单元格格式”对话框之“对齐”、“字体”选项",
                        "teacher" => array(
                            "display_name" => "teacher display name",
                            "number" => 321422218,
                            "order_comment_count" => 0,
                            "invite_comment_count" => 0,
                            "photo_url" => "",
                            "school_age" => 2,
                            "score" => 5,
                            "private_domain" => "XX",
                        )
                    ),
                    array(
                        "id" => "1",
                        "user_id" => "987",
                        "class_course_number" => "1415954843297",
                        "begin_time" => "1444719498",
                        "end_time" => "1444719598",
                        "course_len" => "01:00:00",
                        "is_over" => "0",
                        "content" => "单元格格式”对话框之“对齐”、“字体”选项",
                        "teacher" => array(
                            "display_name" => "teacher display name",
                            "number" => 321422218,
                            "order_comment_count" => 0,
                            "invite_comment_count" => 0,
                            "photo_url" => "",
                            "school_age" => 2,
                            "score" => 5,
                            "private_domain" => "XX",
                        )
                    ),
                    array(
                        "id" => "1",
                        "user_id" => "987",
                        "class_course_number" => "1415954843297",
                        "begin_time" => "1444719498",
                        "end_time" => "1444719598",
                        "course_len" => "01:00:00",
                        "is_over" => "1",
                        "content" => "",
                        "teacher" => array(
                            "display_name" => "teacher display name",
                            "number" => 321422218,
                            "order_comment_count" => 0,
                            "invite_comment_count" => 0,
                            "photo_url" => "",
                            "school_age" => 2,
                            "score" => 5,
                            "private_domain" => "XX",
                        )
                    ),
                    array(
                        "id" => "1",
                        "user_id" => "987",
                        "class_course_number" => "1415954843297",
                        "begin_time" => "1444719498",
                        "end_time" => "1444719598",
                        "course_len" => "01:00:00",
                        "is_over" => "1",
                        "content" => "单元格格式”对话框之“对齐”、“字体”选项",
                        "teacher" => array(
                            "display_name" => "teacher display name",
                            "number" => 321422218,
                            "order_comment_count" => 0,
                            "invite_comment_count" => 0,
                            "photo_url" => "",
                            "school_age" => 2,
                            "score" => 5,
                            "private_domain" => "XX",
                        )
                    ),
                    array(
                        "id" => "1",
                        "user_id" => "987",
                        "class_course_number" => "1415954843297",
                        "begin_time" => "1444719498",
                        "end_time" => "1444719598",
                        "course_len" => "01:00:00",
                        "is_over" => "0",
                        "content" => "",
                        "teacher" => array(
                            "display_name" => "teacher display name",
                            "number" => 321422218,
                            "order_comment_count" => 0,
                            "invite_comment_count" => 0,
                            "photo_url" => "",
                            "school_age" => 2,
                            "score" => 5,
                            "private_domain" => "XX",
                        )
                    ),
                ),
                "address_area" => array(
                    "province" => array(
                        'id' => '570425344',
                        'name' => '台湾',
                        'display_order' => '460',
                        'level' => '1',
                        'hidden' => '0'
                    ),
                    "city" => array(
                        'id' => '570425344',
                        'name' => '台湾',
                        'display_order' => '0',
                        'level' => '2',
                        'hidden' => '0'
                    ),
                    "area" => array(
                        'id' => '570425344',
                        'name' => '澎湖县',
                        'display_order' => '0',
                        'level' => '3',
                        'hidden' => '0'
                    ),
                    "country" => array(
                        'id' => '570425344',
                        'name' => '宁江区',
                        'display_order' => '0',
                        'level' => '3',
                        'hidden' => '0'
                    ),
                    "location_addr" => "中关村新东方大厦",
                ),
                "location" => "北京市昌平区回龙观镇史各庄村村委会",
                "reason_list" => array(
                    'basic' => '',
                    'photo' => '',
                    'introduction' => '',
                    'schedule' => ''
                ),
                "display_status" => 15,//1初始化 2正在招生 3 暂停招生 4满班 5 班课进行中 6 已完成 8审核中 12已失效 13班课终止 15进入教室 16即将开课 17本班课进行中
                "total_pay" => 7,
                "has_replay" => true, //在display_status为6的前提下true为观看回放false为已结束
                "replay_valid" => true, //true跳转到回放页false跳转到视频课详情页
                "replay_url" => 'http://www.genshuixue.com', //跳转链接
                "has_master_teacher" => true,
                "succ_pay" => 5,
                "can_chaban" => true,//当前时间能否插班
                "realtime_price" => 1.1, //实时价格
                "can_pay" => 10, //剩余人数
                "is_full" => true, // 是否满班
                "over_close_time" => 0,
                "freq" => 12,//课次数
                // "realtime_course_len" => 3600, //剩余长度，
                "discount" => array( // 限时折扣
                    "start_time" => "2016-03-08 14:06:00",
                    "end_time" => "2016-10-11 14:06:00",
                    "type" => 2, // 1为限额 2为限时
                    "remain_amount" => 40, // 限额，剩余名额
                    "discount_price" => '0.03', //现价
                    "pre_price" => "83.32"//原价
                )
            ),
            "organization" => array(
                "id" => 1,
                'membership_level' => 4, // 机构会员等级标示 1非会员 2会员 3高级会员 4超级会员
                "name" => "完美国际",
                "im_online_status" => 1,
                "avatar" => "../../../src/img/classCourse/pic2.jpg",
                "number" => 329672009,
                "mobile" => 13233333333,
                "score" => 5,
                "location" => 4,
                "comments_cnt" => 1,
                "brief" => "中华人民共和国完了事撒了款到即发阿拉山口解封爱上了",
                "tags" => array(),
                'extension' => '400-516-516 转 123123', // 400电话
                'city_filter' => 1, // 1西安、武汉 0其他城市 － 400试点城市
            ),
            "other_courses" => array(
                array(
                    "name" => "托福可信词汇",
                    "price" => "500",
                    "course_length" => "6",
                    "display_status_search" => "6",
                    "number" => 123123,
                    "type" => 4,
                    "photo_url" => "../../../src/img/classCourse/pic3.jpg",
                    "total_pay" => "578",
                    "detail_url" => "http://www.genshuixue.com",
                ),
                array(
                    "name" => "托福可信词汇",
                    "price" => "0",
                    "course_length" => "6",
                    "display_status_search" => "6",
                    "number" => 123123,
                    "type" => 2,
                    "photo_url" => "../../../src/img/classCourse/pic3.jpg",
                    "total_pay" => "5566",
                    "detail_url" => "http://www.genshuixue.com",
                ),
                array(
                    "name" => "托福可信词汇",
                    "price" => "500",
                    "course_length" => "6",
                    "display_status_search" => "6",
                    "number" => 123123,
                    "type" => 4,
                    "photo_url" => "../../../src/img/classCourse/pic3.jpg",
                    "total_pay" => "453",
                    "detail_url" => "http://www.genshuixue.com",
                ),
                array(
                    "name" => "托福可信词汇",
                    "price" => "500",
                    "course_length" => "6",
                    "display_status_search" => "6",
                    "number" => 123123,
                    "type" => 2,
                    "photo_url" => "../../../src/img/classCourse/pic3.jpg",
                    "total_pay" => "234",
                    "detail_url" => "http://www.genshuixue.com",
                )
            ),
            "relative_course" => array(
                array(
                    "name" => "出国读研申请流程",
                    "headline" => "哈哈",
                    "number" => "16010350235",
                    "course_number" => "16010350235",
                    "course_type" => 3,
                    "now_price" => "1000",
                    "original_price" => null,
                    "courses_detail_url" => "http://wangtingkui-m.test.genshuixue.com/video_course/16010350235",
                    "subhead" => "",
                    "button_text" => "立即报名",
                    "button_color" => "orange",
                    "img_url" => "../../../src/img/classCourse/pic5.jpg"
                ),
                array(
                    "name" => "出国读研申请流程",
                    "headline" => "哈哈",
                    "number" => "16010350235",
                    "course_number" => "16010350235",
                    "course_type" => 3,
                    "now_price" => "1000",
                    "original_price" => null,
                    "courses_detail_url" => "http://wangtingkui-m.test.genshuixue.com/video_course/16010350235",
                    "subhead" => "",
                    "button_text" => "立即报名",
                    "button_color" => "orange",
                    "img_url" => "../../../src/img/classCourse/pic5.jpg"
                ),
                array(
                    "name" => "出国读研申请流程",
                    "headline" => "哈哈",
                    "number" => "16010350235",
                    "course_number" => "16010350235",
                    "course_type" => 3,
                    "now_price" => "1000",
                    "original_price" => null,
                    "courses_detail_url" => "http://wangtingkui-m.test.genshuixue.com/video_course/16010350235",
                    "subhead" => "",
                    "button_text" => "立即报名",
                    "button_color" => "orange",
                    "img_url" => "../../../src/img/classCourse/pic5.jpg"
                ),
                array(
                    "name" => "出国读研申请流程出国读研申请流程",
                    "headline" => "哈哈",
                    "number" => "16010350235",
                    "course_number" => "16010350235",
                    "course_type" => 3,
                    "now_price" => "1000",
                    "original_price" => null,
                    "courses_detail_url" => "http://wangtingkui-m.test.genshuixue.com/video_course/16010350235",
                    "subhead" => "",
                    "button_text" => "立即报名",
                    "button_color" => "orange",
                    "img_url" => "../../../src/img/classCourse/pic5.jpg"
                ),
            ),
            //右侧相关课程
            'relatedcourse' => array(
                array(
                    "coursenumber" => "151110482000",
                    "pic" => null,
                    "name" => "对外汉语《》&amp;lt;&amp;gt;》",
                    "price" => 0.01
                )
            ),
            "comment_data" => array (
                "additional" => array (
                    "desc_match" => "3.8",
                    "service_attitude" => "4.0",
                    "teach_result" => "4.0",
                    "average" => "3.9",
                    "user_total_number" => "21",
                    "face_type" => array (
                        "total" => 57,
                        "lower" => 6,
                        "great" => 45,
                        "middle" => 6,
                        "has_photo" => 12
                     ),
                    "user_diff" => 0,
                    "comment_nav" => array (
                        "face_type" => null,
                        "comment_type" => 3,
                        "sort_by" => "display_order"
                    ),
                    "comment_type" =>array (
                        "total" => array (
                            "value" => 0,
                            "name" => "全部评价",
                            "total_count" => 114
                        ),
                        "normal" => array (
                            "value" => 1,
                            "name" => "一对一评价",
                            "total_count" => 38
                        ),
                        "class" => array (
                            "value" => 3,
                            "name" => "班课评价",
                            "total_count" => 57
                        ),
                        "video" => array (
                            "value" => 4,
                            "name" => "视频课评价",
                            "total_count" => 5
                        ),
                        "invite" => array (
                            "value" => 2,
                            "name" => "邀请评价",
                            "total_count" => 5
                        )
                    ),
                    "comment_tag"=> "",
                ),
                "comment_list" => array (
                    array (
                        "user_id" => "825679",
                        "desc_match" => "2.0",
                        "teach_result" => "3.0",
                        "service_attitude" => "3.0",
                        "face_type" => "2",
                        "info" =>"给佳佳老师的班课评价：中评价 2015-11-24",
                        "create_time" => "2015-11-24 20:26",
                        "fr" => "0",
                        "course_type" => "2",
                        "course_number" => "151116849066",
                        "thumb_up" => "0",
                        "has_photo" => "1",
                        "display_title" => "总课程",
                        "anonymous" => "1",
                        "teacher_user_number" => "874910888",
                        "private_domain" => "liumeiyuabc",
                        "comment_id" => "649301",
                        "has_thumb_up" => false,
                        "comprehensive_score" => "2.6",
                        "course" => array (
                            "course_name" => "初二语文",
                            "hours" => "3.0",
                            "lesson_way" => "4",
                            "real_student" => "小邓登",
                            "lesson_way_name" => "线下授课",
                            "teacher_url" => "http://www.genshuixue.com/liumeiyuabc",
                            "course_number" => "151116849066",
                            "course_url" => "http://www.genshuixue.com/teacher/classCourseDetail/151116849066",
                            "teacher_name" => "浅浅"
                        ),
                        "user" => array (
                            "display_name" => "匿名用户",
                            "avatar_url" => "http://img.gsxservice.com/0common/ic_anonymous_user_n.png",
                            "url" => ""
                        ),
                        "photo_list" => array (
                            array (
                                "title" => "1",
                                "url" => "http://img.gsxservice.com/4451585_d6kc4p8x.jpeg",
                                "width" => "400",
                                "height" => "250"
                            ),
                            array (
                                "title" => "1",
                                "url" => "http://img.gsxservice.com/4451585_d6kc4p8x.jpeg",
                                "width" => "400",
                                "height" => "250"
                            ),
                            array (
                                "title" => "1",
                                "url" => "http://img.gsxservice.com/4451585_d6kc4p8x.jpeg",
                                "width" => "400",
                                "height" => "250"
                            ),
                        ),
                        "is_my_comment" => false,
                        "if_can_addition" => false,
                        "if_can_review" => false,
                        "additional" => array (
                            "teacher" => array (
                                "teacher_comment_id" => "649301",
                                "info" => "佳佳老师回复小邓登学生的评价 佳佳老师回复小邓登学生的评价 佳佳老师回复小邓登学生的评价 佳佳老师回复小邓登学生的评价 佳佳老师回复小邓登学生的评价 佳佳老师回复小邓登学生的评价",
                                "type" => "2",
                                "create_time" => "2015-11-24 20:27:29"
                            )
                        )
                    ),
                     array (
                        "user_id" => "825679",
                        "desc_match" => "2.0",
                        "teach_result" => "3.0",
                        "service_attitude" => "3.0",
                        "face_type" => "2",
                        "info" =>"给佳佳老师的班课评价：中评价 2015-11-24",
                        "create_time" => "2015-11-24 20:26",
                        "fr" => "0",
                        "course_type" => "2",
                        "course_number" => "151116849066",
                        "thumb_up" => "0",
                        "has_photo" => "1",
                        "display_title" => "总课程",
                        "anonymous" => "1",
                        "teacher_user_number" => "874910888",
                        "private_domain" => "liumeiyuabc",
                        "comment_id" => "649301",
                        "has_thumb_up" => false,
                        "comprehensive_score" => "2.6",
                        "course" => array (
                            "course_name" => "初二语文",
                            "hours" => "3.0",
                            "lesson_way" => "4",
                            "real_student" => "小邓登",
                            "lesson_way_name" => "线下授课",
                            "teacher_url" => "http://www.genshuixue.com/liumeiyuabc",
                            "course_number" => "151116849066",
                            "course_url" => "http://www.genshuixue.com/teacher/classCourseDetail/151116849066",
                            "teacher_name" => "浅浅"
                        ),
                        "user" => array (
                            "display_name" => "匿名用户",
                            "avatar_url" => "http://img.gsxservice.com/0common/ic_anonymous_user_n.png",
                            "url" => ""
                        ),
                        "photo_list" => array (
                            array (
                                "title" => "1",
                                "url" => "http://img.gsxservice.com/4451585_d6kc4p8x.jpeg",
                                "width" => "400",
                                "height" => "250"
                            ),
                            array (
                                "title" => "1",
                                "url" => "http://img.gsxservice.com/4451585_d6kc4p8x.jpeg",
                                "width" => "400",
                                "height" => "250"
                            ),
                            array (
                                "title" => "1",
                                "url" => "http://img.gsxservice.com/4451585_d6kc4p8x.jpeg",
                                "width" => "400",
                                "height" => "250"
                            ),
                        ),
                        "is_my_comment" => false,
                        "if_can_addition" => false,
                        "if_can_review" => false,
                        "additional" => array (
                            "teacher" => array (
                                "teacher_comment_id" => "649301",
                                "info" => "佳佳老师回复小邓登学生的评价 佳佳老师回复小邓登学生的评价 佳佳老师回复小邓登学生的评价 佳佳老师回复小邓登学生的评价 佳佳老师回复小邓登学生的评价 佳佳老师回复小邓登学生的评价",
                                "type" => "2",
                                "create_time" => "2015-11-24 20:27:29"
                            )
                        )
                    ),
                     array (
                        "user_id" => "825679",
                        "desc_match" => "2.0",
                        "teach_result" => "3.0",
                        "service_attitude" => "3.0",
                        "face_type" => "2",
                        "info" =>"给佳佳老师的班课评价：中评价 2015-11-24",
                        "create_time" => "2015-11-24 20:26",
                        "fr" => "0",
                        "course_type" => "2",
                        "course_number" => "151116849066",
                        "thumb_up" => "0",
                        "has_photo" => "1",
                        "display_title" => "总课程",
                        "anonymous" => "1",
                        "teacher_user_number" => "874910888",
                        "private_domain" => "liumeiyuabc",
                        "comment_id" => "649301",
                        "has_thumb_up" => false,
                        "comprehensive_score" => "2.6",
                        "course" => array (
                            "course_name" => "初二语文",
                            "hours" => "3.0",
                            "lesson_way" => "4",
                            "real_student" => "小邓登",
                            "lesson_way_name" => "线下授课",
                            "teacher_url" => "http://www.genshuixue.com/liumeiyuabc",
                            "course_number" => "151116849066",
                            "course_url" => "http://www.genshuixue.com/teacher/classCourseDetail/151116849066",
                            "teacher_name" => "浅浅"
                        ),
                        "user" => array (
                            "display_name" => "匿名用户",
                            "avatar_url" => "http://img.gsxservice.com/0common/ic_anonymous_user_n.png",
                            "url" => ""
                        ),
                        "photo_list" => array (
                            array (
                                "title" => "1",
                                "url" => "http://img.gsxservice.com/4451585_d6kc4p8x.jpeg",
                                "width" => "400",
                                "height" => "250"
                            ),
                            array (
                                "title" => "1",
                                "url" => "http://img.gsxservice.com/4451585_d6kc4p8x.jpeg",
                                "width" => "400",
                                "height" => "250"
                            ),
                            array (
                                "title" => "1",
                                "url" => "http://img.gsxservice.com/4451585_d6kc4p8x.jpeg",
                                "width" => "400",
                                "height" => "250"
                            ),
                        ),
                        "is_my_comment" => false,
                        "if_can_addition" => false,
                        "if_can_review" => false,
                        "additional" => array (
                            "teacher" => array (
                                "teacher_comment_id" => "649301",
                                "info" => "佳佳老师回复小邓登学生的评价 佳佳老师回复小邓登学生的评价 佳佳老师回复小邓登学生的评价 佳佳老师回复小邓登学生的评价 佳佳老师回复小邓登学生的评价 佳佳老师回复小邓登学生的评价",
                                "type" => "2",
                                "create_time" => "2015-11-24 20:27:29"
                            )
                        )
                    ),
                ),
                "pager" => array (
                    "count" => 57,
                    "page" => 1,
                    "page_size" => 10
                ),
                "my_comment_list" => "",
                "can_comment_list" => ""
            ),
        )
    )
);

