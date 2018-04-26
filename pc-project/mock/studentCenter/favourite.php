<?php

require("../bootstrap.php");

render(
    "student_center/favourite",
    array(
        "tpl_data" => array(
            'pager'=>array(
                'count' => 10000,
                'page' => 500 ,
                'page_size' => 10
            ),
            //教师数据
            'teachers' => array(
                array(
                    'id' => '123', //老师ID
                    'name' => '沈佳宜嘻嘻嘻嘻嘻嘻我爱上了肯德基', //老师名字
                    'name_cut' => '沈佳宜嘻嘻嘻嘻嘻嘻我...', //老师名字
                    'like' => 12345,  //点赞数
                    'comment' => 1230, //评论数
                    'invite_comment_count' => 123,//邀请评价数
                    'certification' => array(
                        array('name'=>'other'),   //其他认证
                        array('name'=>'institute'),    //机构认证
                        array('name'=>'profession'),  //专业认证
                        array('name'=>'teacher'),   //教师证认证
                        array('name'=>'student'),  //学生认证
                        array('name'=>'idcard')     //身份证认证
                    ),
                    'summary' => '北京师范大学毕业,授课时语音精炼,提分率高',  //一句话简介
                    'school_age' => '-1', //教龄
                    'course' => '高中数学\初中数学\高中物理\初中物理',  //教授的科目
                    'course_cut' => '高中数学\初中数学\高中物...',  //教授的科目
                    'style' => '老师上门\学生上门\在线授课', //上课方式
                    'price' => 200 ,     //上课价格
                    'tag' => array(             //教师标签
                        array('name'=>'擅长托福擅长托福阅读阅读'),
                        array('name'=>'美式口语'),
                        array('name'=>'善于和学生沟通'),
                        array('name'=>'性格活泼开朗'),
                        array('name'=>'性格活泼开朗')
                    ),
                    'stars_level' => 4.5,  //评分
                    'location' => '海淀-上地',  //所在地
                    'location_cut' => '海淀海淀-上地',
                    'video_url' => 'http://test.www.genshuixue.com/video/view/390',   //视频地址
                    'avatar_url' => 'http://pic3.zhongsou.com/image/380b94d58dd70103ef2.jpg', //头像地址
                    'detail_url' => 'xxx',  //详情页地址
                    'area_match' => 1 // 0表示非当前地域,1表示当前地域
                ),
                array(
                    'id' => '123', //老师ID
                    'name' => '沈佳宜嘻嘻嘻', //老师名字
                    'name_cut' => '沈佳宜嘻嘻嘻', //老师名字
                    'like' => 0,  //点赞数
                    'comment' => 12234, //评论数
                    'invite_comment_count' => 123,//邀请评价数
                    'certification' => array(
                        array('name'=>'idcard'),    //身份证认证
                        array('name'=>'teacher'),   //教师证认证
                        array('name'=>'profession'),  //机构认证
                        array('name'=>'institute'),    //身份证认证
                        array('name'=>'other'),   //教师证认证
                        array('name'=>'student')  //机构认证
                    ),
                    'summary' => '北京师范大学毕业,授课时语音精炼,提分率高',  //一句话简介
                    'school_age' => '9', //教龄
                    'course' => '高中数学\初中数学\高中物理\初中物理',  //教授的科目
                    'course_cut' => '高中数学\初中数学\高中物...',  //教授的科目
                    'style' => '老师上门\学生上门\在线授课', //上课方式
                    'price' => 200 ,     //上课价格
                    'tag' => array(             //教师标签
                        array('name'=>'擅长托福阅擅长托福阅读读'),
                        array('name'=>'美式口语'),
                        array('name'=>'善于和学生沟通'),
                        array('name'=>'性格活泼开朗')
                    ),
                    'stars_level' => 4.5,  //评分
                    'location' => '海淀-上地撒点粉撒点粉阿斯顿发',  //所在地
                    'location_cut' => '海淀海淀-上地',
                    'video_url' => 'http://test.www.genshuixue.com/video/view/390',   //视频地址
                    'avatar_url' => 'http://pic3.zhongsou.com/image/380b94d58dd70103ef2.jpg', //头像地址
                    'detail_url' => 'xxx',  //详情页地址
                    'area_match' => 1 // 0表示非当前地域,1表示当前地域
                ),
                array(
                    'id' => '123', //老师ID
                    'name' => '沈佳宜嘻嘻嘻嘻嘻嘻我爱上了肯德基', //老师名字
                    'name_cut' => '沈佳宜嘻嘻嘻嘻嘻嘻我...', //老师名字
                    'like' => 0,  //点赞数
                    'comment' => 0, //评论数
                    'invite_comment_count' => 123,//邀请评价数
                    'certification' => array(
                        array('name'=>'idcard'),    //身份证认证
                        array('name'=>'teacher'),   //教师证认证
                        array('name'=>'institute')  //机构认证
                    ),
                    'summary' => '北京师范大学毕业,授课时语音精炼,提分率高',  //一句话简介
                    'school_age' => '9', //教龄
                    'course' => '高中数学\初中数学\高中物理\初中物理',  //教授的科目
                    'course_cut' => '高中数学\初中数学\高中物...',  //教授的科目
                    'style' => '老师上门\学生上门\在线授课', //上课方式
                    'price' => 200 ,     //上课价格
                    'tag' => array(             //教师标签
                        array('name'=>'擅长托福阅读'),
                        array('name'=>'美式口语'),
                        array('name'=>'善于和学生沟通'),
                        array('name'=>'性格活泼开朗')
                    ),
                    'stars_level' => 4.5,  //评分
                    'location' => '海淀-上地阿斯顿发撒点粉',  //所在地
                    'location_cut' => '海淀海淀-上地',
                    'video_url' => 'XXX',   //视频地址
                    'avatar_url' => 'http://pic3.zhongsou.com/image/380b94d58dd70103ef2.jpg', //头像地址
                    'detail_url' => 'xxx',  //详情页地址
                    'area_match' => 1 // 0表示非当前地域,1表示当前地域
                ),
                array(
                    'id' => '123', //老师ID
                    'name' => '沈佳宜嘻嘻嘻嘻嘻嘻我爱上了肯德基', //老师名字
                    'name_cut' => '沈佳宜嘻嘻嘻嘻嘻嘻我...', //老师名字
                    'like' => 12342,  //点赞数
                    'comment' => 0, //评论数
                    'invite_comment_count' => 123,//邀请评价数
                    'certification' => array(
                        array('name'=>'idcard'),    //身份证认证
                        array('name'=>'teacher'),   //教师证认证
                        array('name'=>'institute')  //机构认证
                    ),
                    'summary' => '北京师范大学毕业,授课时语音精炼,提分率高',  //一句话简介
                    'school_age' => '9', //教龄
                    'course' => '高中数学\初中数学\高中物理\初中物理',  //教授的科目
                    'course_cut' => '高中数学\初中数学\高中物...',  //教授的科目
                    'style' => '老师上门\学生上门\在线授课', //上课方式
                    'price' => 200 ,     //上课价格
                    'tag' => array(             //教师标签
                        array('name'=>'擅长托福阅读'),
                        array('name'=>'美式口语'),
                        array('name'=>'善于和学生沟通'),
                        array('name'=>'性格活泼开朗')
                    ),
                    'stars_level' => 4.5,  //评分
                    'location' => '海淀-上地阿斯顿发撒点粉',  //所在地
                    'location_cut' => '海淀海淀-上地',
                    'video_url' => 'XXX',   //视频地址
                    'avatar_url' => 'http://pic3.zhongsou.com/image/380b94d58dd70103ef2.jpg', //头像地址
                    'detail_url' => 'xxx',  //详情页地址
                    'area_match' => 1 // 0表示非当前地域,1表示当前地域
                )
            )

        )
    )
);
