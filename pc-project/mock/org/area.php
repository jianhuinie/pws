<?php


require("../bootstrap.php");


render(
    "org/area",
    array(
        "tpl_data" => array(
            'abtest' => 1,
            'is_favored' => true,
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
            //地图地区列表
            'area' => array(
                array(
                    'name'=>'北京市-北京市-海淀区-北京中关村软件园',
                    'detail'=>'刘美玉测试使用详细地址'
                ),
                array(
                    'name'=>'北京市-北京市-东城区-北京天安门',
                    'detail'=>'北京天安门'
                ),
                array(
                    'name'=>'山东省-菏泽市-曹县-山东曹县一中',
                    'detail'=>'山东省菏泽市曹县一中'
                ),
                array(
                    'name'=>'国贸校区',
                    'detail'=>'辽宁-大连-甘井子区'
                ),                array(
                    'name'=>'海淀苏州街总部',
                    'detail'=>'辽宁-大连-沙河口区'
                ),
                array(
                    'name'=>'国贸校区',
                    'detail'=>'广东-深圳-南山区'
                ),
                array(
                    'name'=>'海淀苏州街总部',
                    'detail'=>'湖北-武汉-武昌'
                ),
                array(
                    'name'=>'国贸校区',
                    'detail'=>'山西-大同-南郊'
                ),
                array(
                    'name'=>'天津',
                    'detail'=>'天津-北辰区（中关村软件园，地铁13号线西二旗站下车，A1出口）'
                ),
                array(
                    'name'=>'海淀苏州街总部',
                    'detail'=>'天津-北辰区天津-北辰区天津-北辰区天津-北辰区天津-北辰区天津-北辰区天津-北辰区天津-北辰区'
                ),
                array(
                    'name'=>'国贸校区',
                    'detail'=>'山西-大同-南郊'
                ),
                array(
                    'name'=>'天津',
                    'detail'=>'天津-北辰区（中关村软件园，地铁13号线西二旗站下车，A1出口）'
                )
            ),
            "title" => "北京 徐梅山-星座-居家风水-找好老师，上跟谁学",
            "description" => "【找好老师，上跟谁学】因为专业所以权威，深入浅出、简单易懂、化繁为简、结合实际、实例分析，教授科目：星座-居家风水",
            "keywords" => "北京 徐梅山-星座",
        )
    )
);

