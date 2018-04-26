<?php


require("../bootstrap.php");


render(
    "orgRoom/intro",
    array(
        "tpl_data" => array(
            "abtest" => 1,
            'is_favored' => false,
            "coupon" => array(),
            "base_info" => array(
                "id" => "328931849",
                "name" => "乐闻携尔",
                "avatar" => "http://img.gsxservice.com/34618_vziuujxs.jpg",
                "number" => "328931849",
                "mobile" => "4000-182-178",
                "score" => "5.0",
                "location" => "北京",
                "comments_cnt" => 406,
                "brief" => "托福、SAT培训；名校留学申请",
                "tags" => [
                    array(
                        "name" => "托福"
                    ),
                    array(
                        "name" => "SAT"
                    ),
                    array(
                        "name" => "英语"
                    ),
                    array(
                        "name" => "出国留学"
                    )
                ],
                "domain" => "lasedu"
            ),
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
            //机构简介,机构老师编辑的html代码
            'content'=>'asdfsadfasdfsadf',
            "title" => "北京 徐梅山-星座-居家风水-找好老师，上跟谁学",
            "description" => "【找好老师，上跟谁学】因为专业所以权威，深入浅出、简单易懂、化繁为简、结合实际、实例分析，教授科目：星座-居家风水",
            "keywords" => "北京 徐梅山-星座",
        )
    )
);

