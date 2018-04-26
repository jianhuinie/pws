<?php


require("../bootstrap.php");


render(
    // "org/teacher",
    "orgRoom/teacher",
    array(
        "tpl_data" => array(
            "abtest" => 1,
            "is_favored" => false,
            'coupon' => array(),
            //机构头部
            'header'=> array(
                'id' => 1231, //机构id
                'number' => 123213,//机构number
                'name' => '乐闻携尔', // 机构名称
                'avatar' => 'http://img.gsxservice.com/headpic_man.png', //机构头像
                'score' => 4.5,
                'location' => '海淀区西二旗',
                'comments_cnt' => 123, //评价数
                'brief' => '乐闻携尔，是一家集TOEFL、SAT、GRE、GMAT等出国考试培训、留学申请服务、图书出版等业务于一身的专业创新型教育咨询机', //机构简介
                'tags' => array(
                    array('name'=>'幽默风趣'),
                    array('name'=>'方法独特'),
                    array('name'=>'逻辑十足'),
                    array('name'=>'批判及客观思维')
                ),
                'mobile' => '400-182-182'
            ),
            'base_info' => array(
                'id' => '329016489',
                'name' => '北大1',
                'avatar' => 'http://test-img.gsxservice.com/17159_bkc4jcbu.jpg',
                'number' => '329016489',
                'mobile' => '010-1101101',
                'score' => '4.7',
                'location' => '北京',
                'comments_cnt' => '34',
                'brief' => '一句话简介',
                'tags' => array
                    (
                        '0' => array
                            (
                                'name' => 'kobe',
                            ),

                        '1' => array
                            (
                                'name' => 'nba',
                            ),

                        '2' => array
                            (
                                'name' => '单挑贝尔',
                            ),

                    ),

                'domain' => 'liumeiyu03',
                'count' => 20,
                'page' => 2,
                'page_size' => 1
            ),
            //导航栏
            'nav'=> array(
                'course'=> true,//true表示该机构有课程否则false
                'teacher'=> true,//该机构是否有老师
                'video'=> true,//该机构是否有视频
                'photo'=>true,//该机构是否有照片
                'area'=>true,//该机构是否有区域
                'comment'=>true,//该机构是否有评价
                'content'=>true,//该机构是否有内容
            ),
            //分页数据
            'pager'=>array(
                'count' => 10000,
                'page' => 500 ,
                'page_size' => 10
            ),
            //教师数据
            'teachers' => array(
                array(
                    "avatar_url" => "http://img.gsxservice.com/4924885_yn6weogp.jpeg",
                    "comment"=> 2681,
                    "course"=> "高一奥数-高中竞赛\\高二数学-高中数学\\高一数学\\高考数学-高考数学冲刺140/高三数学",
                    "detail_url"=> "/bj37du2",
                    "full_address"=> "北京西城区北京市大兴区黄村西大街",
                    "certification"=> array(
                        "idcard"
                    ),
                    "has_activity_auth"=> false,
                    "id"=> "703250",
                    "invite_comment_count"=> 3,
                    "isDisable"=> false,
                    "like"=> 24,
                    "location"=> "北京-西城区",
                    "name"=> "宋利峰",
                    "number"=> 856530328,
                    "price"=> "500",
                    "school_age"=> 10,
                    "sex"=> 1,
                    "short_introduce"=> "高三数学顶级名师，最佳人气金奖",
                    "stars_level"=> 5,
                    "style"=> "在线授课\\协商地点\\学生上门\\老师上门",
                    "summary"=> "高三数学顶级名师，最佳人气金奖",
                    "tag"=> array(
                        array(
                        "name"=> "归纳总结"
                        ),
                        array(
                        "name"=> "方法独特"
                        ),
                        array(
                        "name"=> "思路清晰"
                        )
                    ),
                    "video_id"=> 114257,
                    "video_type"=> 0,
                    "location_cut"=> "北京-西城...",
                    "video_url"=> "/video/view/114257",
                    "course_cut"=> "高一奥数-高中竞赛\\高二数学-高中数学\\高一数学\\高考数学-...",
                    "is_online"=> true,
                    "name_cut"=> "宋利峰",
                    "video_name"=> "自我介绍",
                    "organization"=> null
                )
            ),
            "title" => "北京 徐梅山-星座-居家风水-找好老师，上跟谁学",
            "description" => "【找好老师，上跟谁学】因为专业所以权威，深入浅出、简单易懂、化繁为简、结合实际、实例分析，教授科目：星座-居家风水",
            "keywords" => "北京 徐梅山-星座",

        )
    )
);

