<?php

require("../bootstrap.php");
// 修改不同的课程需要修改 condition 的 courseType
// 和对应的 course 的数据
render(
    "course/search",
    array(
        "tpl_data" => array(
            "is_www" => true, // 全国站
            'hit_tag' => array(
                'sub_id_1'=>array(
                    'name'  => '艺术',
                    'id'    => '1',
                ),
                'sub_id_2'=> array(
                    'name'  => '器乐',
                    'id'    => '11',
                ),
                'sub_id_3'=> array(
                    'name'  => '钢琴',
                    'id'    => '111',
                ),
                'area' => array(
                    "朝阳区",
                    "海淀区",
                    "昌平区",
                    "东莞区",
                    "西城区",
                    "海淀区",
                    "朝阳区"
                ),
            ),
            'course_related' => array( // 面包屑中的相关课程
                array(
                    "id" => "119",
                    "name" => "二年级",
                    "level" => "3",
                    "parent_id" => "116"
                ),
                array(
                    "id" => "121",
                    "name" => "四年级",
                    "level" => "3",
                    "parent_id" => "116"
                ),
                array(
                    "id" => "122",
                    "name" => "五年级",
                    "level" => "3",
                    "parent_id" => "116"
                ),
                array(
                    "id" => "123",
                    "name" => "六年级",
                    "level" => "3",
                    "parent_id" => "116"
                )
            ),
            'hit_nav' => array(
                array(
                        'name'=> '艺术',
                        'type'=> 'course',
                        'id' => 343
                ),
                array(
                        'name'=> '器乐',
                        'type'=> 'course',
                ),
                array(
                        'name'=> '钢琴',
                        'type'=> 'course',
                )
            ),
            'filter'  => array(// 筛选数据
                'course_lesson_body' => array( // 授课方
                    array('id'=>'1','name'=>'机构','style'=>'show'),
                    array('id'=>'2','name'=>'个体老师','style'=>'active'),
                ),
                'course_type' => array(
                    array('id'=>1,'name'=>'一对一课','style'=>'show'),
                    array('id'=>2,'name'=>'线下班课','style'=>'active'),
                    array('id'=>8,'name'=>'直播课','style'=>'show'),
                    array('id'=>3,'name'=>'视频课','style'=>'show'),
                ),
                'sub_id_1' => array(
                    array('id' => '1','name' => '艺术','style' => 'disable'),
                    array('id' => '2','name' => '体育', 'style' => 'show'),
                    array('id' => '3','name' => '生活', 'style' => 'show'),
                    array('id' => '4','name' => '兴趣','style' => 'show'),
                    array('id' => '5','name' => '出国','style' => 'disable'),
                    array('id' => '6','name' => '留学','style' => 'disable'),
                    array('id' => '7','name' => '学前','style' => 'disable'),
                    array('id' => '1','name' => '小学','style' => 'active'),
                    array('id' => '2','name' => '初中', 'style' => 'show'),
                    array('id' => '3','name' => '高中','style' => 'show'),
                    array('id' => '4','name' => '大学考试','style' => 'show'),
                    array('id' => '4','name' => '管理培训','style' => 'show'),
                    array('id' => '4','name' => '财经金融','style' => 'show'),
                    array('id' => '4','name' => '公务员','style' => 'show'),
                    array('id' => '4','name' => '司法','style' => 'show'),
                    array('id' => '4','name' => '中考','style' => 'show'),
                    array('id' => '4','name' => '职业技能','style' => 'show'),
                    array('id' => '4','name' => '资格考试','style' => 'show'),
                    array('id' => '4','name' => '国际旅游','style' => 'show'),
                    array('id' => '4','name' => '中学考试','style' => 'show'),
                    array('id' => '4','name' => '小学考试','style' => 'show'),
                    array('id' => '4','name' => '大学考试','style' => 'show'),
                    array('id' => '5','name' => '语言培训','style' => 'disable'),
                    array('id' => '6', 'name' => 'IT','style' => 'disable')
                ),
                "sub_id_2"=>array(
                    array('id'=>'1','name'=>'初一','style'=>'show'),
                    array('id'=>'-1','name'=>'初二','style'=>'show'),
                    array('id'=>'3','name'=>'初三','style'=>'show'),
                    array('id'=>'4','name'=>'高一','style'=>'show'),
                    array('id'=>'5','name'=>'高二','style'=>'show'),
                    array('id'=>'6','name'=>'高三','style'=>'show'),
                    array('id'=>'7','name'=>'大学1','style'=>'show'),
                    array('id'=>'7','name'=>'大学2','style'=>'show'),
                    array('id'=>'7','name'=>'大学','style'=>'show'),
                    array('id'=>'7','name'=>'大学','style'=>'show'),
                    array('id'=>'7','name'=>'大学','style'=>'show'),
                    array('id'=>'7','name'=>'大学','style'=>'show'),
                    array('id'=>'7','name'=>'大学','style'=>'show'),
                    array('id'=>'7','name'=>'大学','style'=>'show'),
                    array('id'=>'7','name'=>'大学','style'=>'show'),
                    array('id'=>'7','name'=>'大学','style'=>'show'),
                    array('id'=>'7','name'=>'大学','style'=>'show'),
                    array('id'=>'7','name'=>'大学','style'=>'active'),
                    array('id'=>'7','name'=>'大学','style'=>'show'),
                    array('id'=>'7','name'=>'大学','style'=>'show'),
                    array('id'=>'7','name'=>'大学','style'=>'show')
                ),
                "sub_id_3"=>array(
                    array('id'=>'1','name'=>'初一','style'=>'show'),
                    array('id'=>'2','name'=>'初二','style'=>'show'),
                    array('id'=>'3','name'=>'初三','style'=>'show'),
                    array('id'=>'4','name'=>'高一','style'=>'show'),
                    array('id'=>'5','name'=>'高二','style'=>'show'),
                    array('id'=>'6','name'=>'高三3','style'=>'show'),
                    array('id'=>'7','name'=>'大学','style'=>'show'),
                    array('id'=>'7','name'=>'大学','style'=>'show'),
                    array('id'=>'7','name'=>'大学','style'=>'show'),
                    array('id'=>'7','name'=>'大学','style'=>'show'),
                    array('id'=>'7','name'=>'大学','style'=>'show'),
                    array('id'=>'7','name'=>'大学3','style'=>'show'),
                    array('id'=>'7','name'=>'大学','style'=>'show'),
                    array('id'=>'7','name'=>'大学','style'=>'show'),
                    array('id'=>'7','name'=>'大学3','style'=>'show'),
                    array('id'=>'7','name'=>'大学','style'=>'show'),
                    array('id'=>'7','name'=>'大学','style'=>'show'),
                    array('id'=>'7','name'=>'大学','style'=>'show'),
                    array('id'=>'7','name'=>'大学3','style'=>'active'),
                    array('id'=>'7','name'=>'大学','style'=>'show'),
                    array('id'=>'7','name'=>'大学','style'=>'show')
                ),
                //一级商圈
                'area' => array(
                    array('id'=>'1','name'=>'东城区','style'=>'show'),
                    array('id'=>'2','name'=>'地铁沿线','style'=>'show'),
                    array('id'=>'3','name'=>'海淀区','style'=>'active'),
                    array('id'=>'4','name'=>'朝阳区','style'=>'show'),
                    array('id'=>'5','name'=>'石景山区','style'=>'show'),
                    array('id'=>'6','name'=>'丰台区','style'=>'show'),
                    array('id'=>'7','name'=>'通州区','style'=>'show'),
                    array('id'=>'8','name'=>'顺义区','style'=>'show'),
                    array('id'=>'9','name'=>'大兴区','style'=>'show'),
                    array('id'=>'10','name'=>'昌平区','style'=>'disable'),
                    array('id'=>'11','name'=>'房山区','style'=>'show'),
                    array('id'=>'12','name'=>'怀柔区','style'=>'show'),
                    array('id'=>'13','name'=>'平谷区','style'=>'show'),
                    array('id'=>'14','name'=>'顺义区','style'=>'show'),
                    array('id'=>'15','name'=>'密云县','style'=>'show'),
                    array('id'=>'16','name'=>'延庆县','style'=>'show')
                ),
                //二级商圈
                'business' => array(
                    array('id'=>'1','name'=>'中关村','style'=>'active'),
                    array('id'=>'2','name'=>'知春路','style'=>'show'),
                    array('id'=>'3','name'=>'西二旗','style'=>'show'),
                    array('id'=>'4','name'=>'上帝','style'=>'show'),
                    array('id'=>'5','name'=>'肖家河','style'=>'show'),
                    array('id'=>'6','name'=>'西苑','style'=>'show'),
                    array('id'=>'7','name'=>'苏州街','style'=>'show'),
                    array('id'=>'8','name'=>'区政府','style'=>'show'),
                    array('id'=>'9','name'=>'万柳','style'=>'show'),
                    array('id'=>'10','name'=>'白石桥','style'=>'disable'),
                    array('id'=>'11','name'=>'世纪城','style'=>'show'),
                    array('id'=>'12','name'=>'马连洼','style'=>'show'),
                    array('id'=>'13','name'=>'北沙滩','style'=>'show'),
                    array('id'=>'14','name'=>'西北旺','style'=>'show'),
                    array('id'=>'15','name'=>'农业大学','style'=>'show'),
                    array('id'=>'16','name'=>'永定门','style'=>'show'),
                    array('id'=>'16','name'=>'西直门','style'=>'show'),
                    array('id'=>'16','name'=>'大前门','style'=>'show')
                ),
                'school_age' => array(
                    array('id'=>'1','name'=>'0-5年','style'=>'show'),
                    array('id'=>'2','name'=>'5-10年','style'=>'active'),
                    array('id'=>'3','name'=>'10-15年','style'=>'show'),
                    array('id'=>'4','name'=>'15年以上','style'=>'show')
                ),
                'week' => array(
                    array('id'=>'1','name'=>'星期一','style'=>'show'),
                    array('id'=>'2','name'=>'星期二','style'=>'active'),
                    array('id'=>'3','name'=>'星期三','style'=>'show'),
                    array('id'=>'4','name'=>'星期四','style'=>'show'),
                    array('id'=>'4','name'=>'星期五','style'=>'show'),
                    array('id'=>'4','name'=>'星期六','style'=>'show'),
                    array('id'=>'4','name'=>'星期日','style'=>'show')
                ),
                'sex' => array(
                    array('id'=>'1','name'=>'男','style'=>'show'),
                    array('id'=>'2','name'=>'女','style'=>'show'),
                ),
                'teacher_type' => array(
                    array('id'=>'1','name'=>'专业老师','style'=>'show'),
                    array('id'=>'2','name'=>'在校学生','style'=>'active'),
                    array('id'=>'3','name'=>'达人','style'=>'show'),
                ),
                'teacher_qualification'=>array(
                    array("id"=>1,"name"=>'教师认证','style'=>"active"),
                    array("id"=>2,"name"=>'专业证书','style'=>"active")
                ),
                'org_type'=>array(
                    array("id"=>1,"name"=>'公司','style'=>"active"),
                    array("id"=>2,"name"=>'工作室','style'=>"show"),
                    array("id"=>2,"name"=>'学校','style'=>"show")
                )
            ),
            'is_recommend' => 1, // 搜索不到课程时，会展示推荐课程 推荐课程字段依然取自courses&teachers 1 || 0
            'courses' => array( // 课程数据
                // 课程搜索重构 不同类型的课程数据基本一致
                array(
                    "is_local" => 1,
                    "cps_flag" => 1,
                    "number" => "160520709662",
                    "name" => "2017届暑假免费线下班课",
                    "photo_url" => "http://img.gsxservice.com/12078064_9ph6vwuy.jpeg",
                    "sales" => '已报30人',
                    "arrangement" => "7月16日上课,4节课",
                    "address" => "北京西城区北京市大兴区黄村西大街",
                    "price" => "312",
                    "can_chaban" => false,
                    "chaban_price" => "0",
                    "detail_url" => "http://www.genshuixue.com/teacher/classCourseDetail/160520709662",
                    "org" => array(
                        "avatar" => "http://img.gsxservice.com/12543709_ynr6yokk.jpg",
                        "domain" => "37du2jy",
                        "name" => "三十七度二",
                        "org_is_hero" => true,
                        "number" => 707251219,
                        "score" => 4.5,
                        "vip_level" => 1,
                        "total_comment" => 219,
                        "url" => "http://37du2jy.genshuixue.com/"
                    ),
                    "teacher" => array(
                        "avatar" => "http://img.gsxservice.com/headpic_woman.png",
                        "domain" => "37du2jy",
                        "name" => "三十七度二",
                        "number" => 707251219,
                        "score" => 4.5,
                        "vip_level" => 1,
                        "total_comment" => 219
                    ),
                    "tag_fenqi" => 0,
                    "tag_playback" => 0,
                    "tag_trial" => 0,
                    "tag_ziliao" => 0,
                    "fenqi" => array(
                        "tag_name" => "分期",
                        "tiexi_info" => "",
                        "desc" => "可享3期分期付学费"
                    )
                )
            ),
            'teachers' => array(// 教师数据
                // 一对一课程搜索的时候是走的老师搜索逻辑
                array(
                    "avatar"=>"http://img.gsxservice.com/2076880_pu7emoyb.jpeg",
                    "is_local" => 1,
                    "private_domain" => 'xiaoxia',
                    "online_stat" => 1,
                    "url" => 'http://www.genshuixue.com',
                    "vip_level" => 3, // 0非会员 1普通会员 2高级会员 3超级会员
                    "name"=>"张三李四",
                    "online_stat"=>1,
                    "org_name" => "三十七度二",
                    "org_is_hero" => 1,
                    "display_area" => '北京',
                    "tags"=>array(
                        array(
                            "name"=>"认真负责"
                        ),
                        array(
                            "name"=>"考研达人"
                        ),
                        array(
                            "name"=>"名校毕业"
                        ),
                        array(
                            "name"=>"免费试听"
                        )
                    ),
                    "teacher_score"=>"5.0",
                    "comment_count"=>"",
                    "has_more"=>0,
                    "short_introduce"=>"我是一匹来自北方的狼",
                    "number"=>"124314321321",
                    "courses"=>array(
                        array(
                            "course_lesson_way_str"=> '线上',
                            "course_type"=>1,
                            "cps_flag"=>1,
                            "price"=>"0.1",
                            "name"=>"日语－考验辅导",
                            "sales"=>"月售10课时",
                            "detail_url"=>"ahskjadfbfajhkbfdas"
                        ),
                        array(
                            "course_lesson_way_str"=> '线上',
                            "cps_flag" => 1,
                            "course_type" => 13,
                            "price"=>"0.1",
                            "name"=>"日语－考验辅导sdsds",
                            "sales"=>"月售100课时",
                            "detail_url"=>"ahskjadfbfajhkbfdas"
                        )
                    )
                )
            ),
            'relatedteacher' => array(// 右侧相关老师
                array(
                    "name" => "传世美jdskkldfjksfhjksdhdjkskdsjfkkldjs",
                    "course" => "数学－高中数学ssdddsafsdafdsgdsasd",
                    "price" => 234,
                    "avatar_url" => 'http://pic3.zhongsou.com/image/380b94d58dd70103ef2.jpg',
                    'detail_url' => 'http://www.gensheixue.com',
                    'stars_level' => 4.5,
                ),
                array(
                    "name" => "传世美",
                    "course" => "数学－高中数学",
                    "price" => 234,
                    "avatar_url" => 'http://pic3.zhongsou.com/image/380b94d58dd70103ef2.jpg',
                    "detail_url" => 'xxx',
                    "stars_level" => 4.5,
                ),
                array(
                    "name" => "传世美",
                    "course" => "数学－高中数学",
                    "price" => 234,
                    "avatar_url" => 'http://pic3.zhongsou.com/image/380b94d58dd70103ef2.jpg',
                    "detail_url" => 'xxx',
                    "stars_level" => 4.5,
                ),
                array(
                    "name" => "传世美",
                    "course" => "数学－高中数学",
                    "price" => 234,
                    "avatar_url" => 'http://pic3.zhongsou.com/image/380b94d58dd70103ef2.jpg',
                    "detail_url" => 'xxx',
                    "stars_level" => 4.5,
                ),
                array(
                    "name" => "传世美",
                    "course" => "数学－高中数学",
                    "price" => 234,
                    "avatar_url" => 'http://pic3.zhongsou.com/image/380b94d58dd70103ef2.jpg',
                    "detail_url" => 'xxx',
                    "stars_level" => 4.5,
                ),
            ),
            'condition'=>array(// 筛选条件 基本和filter下的保持一致
                "query" => "数学", //搜索关键词
                "sex" => 1, //老师性别
                "source" => "search", //搜索来源
                "course_type" => 13, // 1一对一 2线下班课 3视频课 8直播课 13优选一对一
                "sort" => "all", //分类
                'course_lesson_body' => 1, //授课主体
                'sub_id1' => 1, //一级科目id
                'sub_id2' => 2, //二级科目id
                'sub_id3' => 3, //三级科目id
                'area' => '243533', //一级商圈
                'business' => '243533', //二级商圈
                "is_free" =>"xxx", //是否是免费课
                "teacher_type" =>"xxx", //老师类型
                "teacher_qualification" =>"xxx", //老师资质
                "school_age " =>"xxx", //老师教龄
                "week" =>"xxx", //可授课时间
                "org_type" =>"xxx", //机构类型
                "begin_time" =>"xxx", //开始时间
                "course_lesson_way" =>"xxx" //课程类型
            ),
            'category' => '分类关键词',
            'keywords' => '海淀区, 男, 上门教学',
            'title' => '北京 数学 老师-跟谁学',
            'description' => '【找好老师，上跟谁学】跟谁学拥有大量优秀的老师，在北京提供教学服务，每位老师都有详尽的个人信息展示，让您全面了解老师，轻松选择，快来看看吧',
            'has_filter' => false,
            'pager'=>array(
                'result_total' => 144,
                'local_total' => 40,
                'page' => 3 ,
                'page_size' => 21
            ),
            'suggest' => '英语',// 搜索词纠错
            'suggests' => array(
                '英语',
                '音乐'
            ),
            'pageInnerLinks' => array(
                "channel" => array(
                    "title" => "北京英语频道",
                    "desc" => "跟谁学北京站北京艺术培训频道汇聚了众多的北京名师，为您提供最新北京艺术培训的教学、课程信息。使用北京艺术培训频道、北京艺术培训移动版，让您找到更理想的北京艺术培训."
                ),
                "recommend" => array(
                    ["name" => "北京老师", "link" => "http://"]
                ),
                "around" => array(
                    "title" => '',
                    "data" => array(
                        ["name" => "北京老师" , "link" => ""],
                        ["name" => "北京老师" , "link" => ""],
                        ["name" => "北京老师" , "link" => ""],
                        ["name" => "北京老师" , "link" => ""],
                        ["name" => "北京老师" , "link" => ""],
                        ["name" => "北京老师" , "link" => ""],
                        ["name" => "北京老师" , "link" => ""],
                        ["name" => "北京老师" , "link" => ""],
                        ["name" => "北京老师" , "link" => ""],
                        ["name" => "北京老师" , "link" => ""],
                        ["name" => "北京老师" , "link" => ""],
                        ["name" => "北京老师" , "link" => ""],
                        ["name" => "北京老师" , "link" => ""],
                        ["name" => "北京老师" , "link" => ""],
                        ["name" => "北京老师" , "link" => ""],
                        ["name" => "北京老师" , "link" => ""]
                    )
                ),
                "local" => array(
                    "title" => "北京老师",
                    "data" => array(
                        ["name" => "北京老师" , "link" => ""],
                        ["name" => "北京老师" , "link" => ""],
                        ["name" => "北京老师" , "link" => ""]
                    )
                )
            ),
            "abtest" => 0, // 已废弃
            "city_pinyin" => 'sjz',
            'relatedcourse' => array( // 相关课程
                array(
                    'name' => '沈佳宜', // 课程名称
                    'id' => '324',
                    'coursenumber' => 32432423234, // 课程number
                    'detail_url' => 'xxx', // 课程地址
                    'pic' => '123', // 课程图片
                    'price' => 243, // 课程价格
                ),
                array(
                    'name' => '沈佳宜', // 课程名称
                    'id' => '324',
                    'coursenumber' => 32432423234, // 课程number
                    'detail_url' => 'xxx', // 课程地址
                    'pic' => '123', // 课程图片
                    'price' => 243, // 课程价格
                ),
                array(
                    'name' => '沈佳宜', // 课程名称
                    'id' => '324',
                    'coursenumber' => 32432423234, // 课程number
                    'detail_url' => 'xxx', // 课程地址
                    'pic' => '123', // 课程图片
                    'price' => 243, // 课程价格
                )
            ),
            "gold_cert_org" => [
                [
                    "imgUrl" => 'http://img.gsxservice.com/4873150_b4d0ym7d.png@0e_1190w_110h_1c_0i_1o_90Q_1x.jpg',
                    "webUrl" => 'www.genshuixue.com',
                    "orgNumber" => 413075219,
                    "cityId" => 17039360
                ],
                [
                    "imgUrl" => 'http://img.gsxservice.com/4873231_88l65hxf.jpg@0e_1190w_110h_1c_0i_1o_90Q_1x.jpg',
                    "webUrl" => 'www.genshuixue.com',
                    "orgNumber" => 413075219,
                    "cityId" => 17039360
                ],
                [
                    "imgUrl" => 'http://img.gsxservice.com/4873159_y4nf3mhx.jpg@0e_1190w_110h_1c_0i_1o_90Q_1x.jpg',
                    "webUrl" => 'www.genshuixue.com',
                    "orgNumber" => 413075219,
                    "cityId" => 17039360
                ]
            ]
        )
    )
);
