<?php


require("../bootstrap.php");


render(
    "org/photo",
    array(
        "tpl_data" => array(
            "abtest" => 1,
            'is_favored' => false,
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
            'coupon' => array(),
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
            //相册数据,宽高是实际的宽高
            //相册数据,宽高是实际的宽高
            "photo" => array(

            ),
            "title" => "北京 徐梅山-星座-居家风水-找好老师，上跟谁学",
            "description" => "【找好老师，上跟谁学】因为专业所以权威，深入浅出、简单易懂、化繁为简、结合实际、实例分析，教授科目：星座-居家风水",
            "keywords" => "北京 徐梅山-星座",
        )
    )
);

