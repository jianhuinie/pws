<?php

require("../bootstrap.php");

render(
    "orgCourse/detail",
    array(
        "tpl_data" => array(
            "is_juhuixue" => true, // 是否是聚惠学课程
            "course_path" => array( // 课程级别
                "1" => array(
                    "id" => "237",
                    "name" => "中考",
                    "level" => "1",
                    "subnodes" => "15",
                    "display_order" => "503",
                    "hidden" => "0",
                    "parent_id" => "0",
                    "remark_name" => "中考",
                    "subject_type" => "0",
                    "verify_status" => "1",
                    "tag" => "初三",
                    "image" => "http://img.gsxservice.com/0app/index3/icon_category_5.png",
                    "teacher_count" => "1",
                    "is_deleted" => "2",
                    "remark" => null
                ),
                "2" => array(
                    "id" => "242",
                    "name" => "英语",
                    "level" => "2",
                    "subnodes" => "1",
                    "display_order" => "12",
                    "hidden" => "0",
                    "parent_id" => "237",
                    "remark_name" => "中考英语",
                    "subject_type" => "0",
                    "verify_status" => "1",
                    "tag" => null,
                    "image" => "http://img.gsxservice.com/88058_9c2cxsie.png",
                    "teacher_count" => "1",
                    "is_deleted" => "2",
                    "remark" => null
                ),
                "3" => array(
                    "id" => "243",
                    "name" => "英语",
                    "level" => "3",
                    "subnodes" => "0",
                    "display_order" => "1",
                    "hidden" => "0",
                    "parent_id" => "242",
                    "remark_name" => "中考英语",
                    "subject_type" => "0",
                    "verify_status" => "1",
                    "tag" => null,
                    "image" => "http://img.gsxservice.com/88016_7tntsxh6.jpeg",
                    "teacher_count" => "1",
                    "is_deleted" => "2",
                    "remark" => null
                )
            ),
            "crumb" => array( // 面包屑 - 城市信息
                "host" => "http://www.genshuixue.com/bj/",
                "city" => array(
                    "name" => "北京"
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
            "organization" => array( // 机构信息
                "id" => 1,
                "name" => "应用宝机构",
                "number" => "772705298",
                "avatar" => "../../../src/img/classCourse/pic2.jpg", // 机构头像
                'membership_level' => 4, // 机构会员等级标示 1非会员 2会员 3高级会员 4超级会员
                "im_online_status" => 0, // 非0－>online   0->offline
                "course_count" => 11,
                "student_count" => 10,
                "comment_count" => 1300,
                "photo" => array(
                    "http://img.gsxservice.com/3754831_t06236di.jpeg",
                    "http://img.gsxservice.com/3754831_t06236di.jpeg",
                    "http://img.gsxservice.com/3754831_t06236di.jpeg"
                ),
                "brief" => "专业英语教学10年，专业英语最高8级", // 简介
                "is_authentication" => 1,
                // "phone" =>"400-333-111",
                "homre_url" => "http://baidu.com",
                'extension' => '400-516-516 转 123123', // 400电话
                'city_filter' => 1, // 1西安、武汉 0其他城市 － 400试点城市
            ),
            "course_info" => array( // 课程信息
                "name" => "小学五年级上册英语课本讲解（人教版）",
                "id" => "226894",
                "number" => "160830913682",
                "succ_pay" => 5, // 成功付款多少人
                "status" => 14, //班课状态 1初始状态,2可以招生但是尚未招生
                                //3正在招生,4停止招生,5开课,6课程结束, 14已下架
                "verify_status" => 1, //审核状态 1审核通过 2审核被拒
                "max_student" => 200,// 最大学生数
                "org_id" => "584731",
                "retire_flag" => 0, // 退班规则 0.随时可退 100不可退
                "total_pay" => 7, // 已报名人数
                "organization_number" => null,
                "lesson_way" => "4",
                "course_type" => "12", // 11一对一 12父课,班课
                "price" => "0.00",
                "comment_rate" => "99%", // 好评率
                "comment_count" => 243, // 多少条评价
                "lesson_type_number" => 3, // 多少门课型
                "address" => "北京市海淀区",
                "offline_poi" => array(
                    "lng" => "116.372542",
                    "lat" => "39.999947"
                ),
                "information" => "班课介绍班课介绍班课介绍班课介绍班课介绍班课介绍班课介绍班课介绍班课介绍班课介绍班课介绍班课介绍班课介绍班课介绍班课介绍班课介绍班课介绍班课介绍班课介绍班课介绍班课介绍班课介绍班课介绍班课介绍班课介绍班课介绍班课介绍班课介绍班介绍班课介绍班课介绍班课介绍班课介介绍班课介绍班课介绍班课介绍班课介介绍班课介绍班课介绍班课介绍班课介介绍班课介绍班课介绍班课介绍班课介课介绍班课介绍班课介绍班课介绍班课介绍班课介绍班课介绍班课介绍班课介绍班课介绍班课介绍班课介绍班课介绍班课介绍",
                "increment_service" => array(
                    "助教管理",
                    "课后答疑",
                    "无限次回放",
                    "助教管理",
                    "课后答疑",
                    "无限次回放"
                ),
                "material_info" => array( // 课程资料
                    "material_list" => array(
                        array(
                            "fid" => 76534, // 资料ID
                            "name" => "新高一语新高一语文知识点基础新高一语文知识点基础新高一语文知识点基础文知识点基础.jpg",    // 资料名称
                            "type" => "jpg1",    // 资料类型
                            "size" => "123",    // 资料大小(字节数)
                            "is_new" => true, // 是否是老师一周内上传的资料
                            "can_download" => false, // 是否可下载
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
                    "total_count" => 23, // 资料总数
                    "can_download_count" => 20, //可下载的资料总数
                    "has_more" => true, // 更多资料
                    "user_login_status" => true, // 学生登录状态
                    "is_join" => true ,// 学生是否报名了该课程
                    "more_url" => "bjhlstudent://o.c?a=material_list?course_number=150616543488&course_type=2&page=2"
                ),
                "try_learn_people" => "高三毕业生",
                "try_listen_explain" => "试听说明",
                "info" =>"邱勇老师独创的趣味快速学习法，趣味盎然的串记单词课堂，1轻松记住了大量单词，学会音标发音，了解自然拼读；“邱老师趣味英语版”《西游记》视频让唐僧、孙悟空和如来佛等开口说英语，趣味盎然，帮助学生迅速找到学习兴奋点，发生兴趣，快速学会和牢记英语口语。还有邱老师快速震撼图文单词、口语记忆法。彩色字快速记忆英语课文。该方法同时对学生记忆语文、历史内容有极大启发和帮助",
                "introduction" => "2016-09-1820: 00至 2016-09-1221: 00 课程内容 第一节：家长如何辅导学生英语学习，学生如何高效学习英语。学习人教版英语五年级上册：Unit1What'shelike?Part1--第一单元他长什么样子？第1部分教授形容人物外貌和性格的英语表达和记忆方法、ALet'stalk课文2016-09-2120: 00至 2016-09-1421: 00 课程内容 第二节：复习第一节内容。学习人教版英语五年级上册：Unit1What'shelike?Part2--第一单元他长什么样子？第2部分教授BLet'stalk课文，Let'sspell拼写部分等2016-09-2920: 00至2016-09-1821: 00 课程内容 第三节：复习第二节内容。学习人教版英语六年级上册：Unit2MyweekPart1--第二单元我的一周第1部分教授一周七天每天的英语表达和记忆方法、ALet'stalk课文",
                "video" => array( // 课程详情 - 视频
                    "name" => "课程详情的name",
                    "cover" => "http://img.gsxservice.com/18592129_cn7ipsvx.jpeg",
                    "view" => "/video/view/00ee58e24a"
                ),
                "create_time" => 1472542832,
                "update_time" => 1477482081,
                "display_status" => 3, //1初始化 2正在招生 3 暂停招生 4满班 5开课中 6 已完成 8审核中 12已失效 13班课终止 15进入教室 16即将开课 17线下班课进行中
                "type_info" => array( // 该课程全部课型
                    array(
                        "name" => "高三数学基础班",
                        "number" =>123,
                        "lesson_way" => 2,
                        "code" => "abcdef",
                        "class_time" => "1月9号-3月15号",
                        "class_plan" =>"每天下午2点到4点",
                        "address" => "北京海淀",
                        "display_status" => 2,
                        "class_hour" => 40,
                        "class_hour_explain" => '500元／30课时', // 课时说明
                        "price" => "100",
                        "detail_url" => "http://baidu.com",
                        "sign_up_url" =>"http://baidu.com"
                    ),
                    array(
                        "name" => "高三数学基础班",
                        "number" =>123,
                        "lesson_way" => 4,
                        "code" => "abcdef",
                        "display_status" => 15,
                        "class_time" => "1月9号-3月15号",
                        "class_plan" =>"每天下午2点到4点",
                        "address" => "北京海淀北京海淀北京海淀北京海淀北京海淀北京海淀北京海淀北京海淀北京海淀北北京海淀北京海淀",
                        "class_hour" => 40,
                        "class_hour_explain" => '500元／30课时', // 课时说明
                        "price" => "100",
                        "detail_url" => "http://baidu.com",
                        "sign_up_url" =>"http://baidu.com"
                    )
                ),
                "cover" => array( // 封面
                    "id" => 1243,
                    "title" => "班课上课中",
                    "url" => "http://test-img.gsxservice.com/12403_fgedr62s.png",
                    "width" => 1440,
                    "height" => 810,
                    "storage_id" => "88258",
                    "create_time" => '1420605172'
                )
            ),
            "other_courses" => array( // 该课程全部课型
                array(
                    "number" => 123,
                    "name" => "大家都看",
                    "lesson_way" => 2,
                    "total_pay" => 123,
                    "photo_url" => "http://img.gsxservice.com/18592129_cn7ipsvx.jpeg",
                    "detail_url" => "http://baidu.com",
                    "price" => "0.00"
                ),
                array(
                    "number" => 123,
                    "name" => "大家都看",
                    "lesson_way" => 2,
                    "total_pay" => 123,
                    "photo_url" => "http://img.gsxservice.com/18592129_cn7ipsvx.jpeg",
                    "detail_url" => "http://baidu.com",
                    "price" => "0.00"
                )
            ),
            "relative_course" => array( // 其他同学还在学课程
                array(
                    "number" => 123,
                    "name" => "是就分开多久",
                    "img_url" => "http://img.gsxservice.com/18592129_cn7ipsvx.jpeg",
                    "detail_url" => "http://baidu.com"
                ),
                array(
                    "number" => 123,
                    "name" => "是就分开多久",
                    "img_url" => "http://img.gsxservice.com/18592129_cn7ipsvx.jpeg",
                    "detail_url" => "http://baidu.com"
                )
            ),
            "relatedcourse" => array( // 右边栏 - 相关课程
                array(
                    "name" => "中考英语-中考高分英语 / 剑桥国际二/ 阅读写作",
                    "id" => "189266",
                    "coursenumber" => "313319304017",
                    "detail_url" => "/teacher/one2oneCourseDetail/313319304017",
                    "pic" => "http://img.gsxservice.com/0asset/img/www/10.jpg",
                    "price" => "300"
                ),
                array(
                    "name" => "初中英语-初中英语/新概念",
                    "id" => "189274",
                    "coursenumber" => "318688013137",
                    "detail_url" => "/teacher/one2oneCourseDetail/318688013137",
                    "pic" => "http://img.gsxservice.com/0asset/img/www/2.jpg",
                    "price" => "220"
                ),
                array(
                    "name" => "小升初英语-剑桥英语KET/PET等级证书考试",
                    "id" => "189275",
                    "coursenumber" => "318688018257",
                    "detail_url" => "/teacher/one2oneCourseDetail/318688018257",
                    "pic" => "http://img.gsxservice.com/0asset/img/www/7.jpg",
                    "price" => "300"
                )
            ),

        )
    )
);

