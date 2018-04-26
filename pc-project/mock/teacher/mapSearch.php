<?php

require("../bootstrap.php");


$tpl_data = array(
    "tpl_data" => array(
            'hit_tag' => array(
                'course1'=>array(
                    'name'  => '艺术',
                    'id'    => '1',
                ),
                'course2'=> array(
                    'name'  => '器乐',
                    'id'    => '11',
                ),
                'course3'=> array(
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
            'hit_nav' => array(
                array(
                        'name'=> '艺术',
                        'type'=> 'course',
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
            'hit_org' => array(
                'id' => 123213,
                'number' => 123213,
                'name'=>'精锐教育',
                'url' =>'XXXX',
                'description' => '一句话简介',
                'brief' => '乐闻携尔是一家集等出国考试培训、留学咨询、图书出版等业务于一身的专业创新型教育机构james版等业务于一身的专业创新型教育机构',
                'avatar_url'=> 'http://img.gsxservice.com/34618_vziuujxs.jpg',
                'teacher_count'=> 12,
                'comment_count'=> 100,
                'tags' => array(
                    '幽默风趣',
                    '方法独特',
                    '逻辑十足',
                    '批判及客观思维'
                ),
                'score' => 3,
            ),
            //筛选数据
            'filter'  => array(
                'course' => array(
                    array(
                            'id' => '1',
                            'name' => '小学',
                            'style' => 'disable'
                    ),
                    array(
                            'id' => '2',
                            'name' => '中学',
                            'style' => 'show'
                    ),
                    array(
                            'id' => '3',
                            'name' => '高中',
                            'style' => 'show'
                    ),
                    array(
                            'id' => '4',
                            'name' => '中考',
                            'style' => 'show'
                    ),
                    array(
                            'id' => '5',
                            'name' => '高考',
                            'style' => 'disable'
                    ),
                    array(
                            'id' => '6',
                            'name' => '艺术',
                            'style' => 'disable'
                    ),
                    array(
                            'id' => '7',
                            'name' => '体育',
                            'style' => 'disable'
                    ),
                    array(
                            'id' => '1',
                            'name' => '小学',
                            'style' => 'disable'
                    ),
                    array(
                            'id' => '2',
                            'name' => '中学',
                            'style' => 'show'
                    ),
                    array(
                            'id' => '3',
                            'name' => '高中',
                            'style' => 'show'
                    ),
                    array(
                            'id' => '4',
                            'name' => '中考',
                            'style' => 'show'
                    ),
                    array(
                            'id' => '5',
                            'name' => '高考',
                            'style' => 'disable'
                    ),
                    array(
                            'id' => '6',
                            'name' => '艺术',
                            'style' => 'disable'
                    ),
                    array(
                            'id' => '7',
                            'name' => '体育',
                            'style' => 'disable'
                    ),
                    array(
                            'id' => '1',
                            'name' => '小学',
                            'style' => 'disable'
                    ),
                    array(
                            'id' => '2',
                            'name' => '中学',
                            'style' => 'show'
                    ),
                    array(
                            'id' => '3',
                            'name' => '高中',
                            'style' => 'show'
                    ),
                    array(
                            'id' => '4',
                            'name' => '中考',
                            'style' => 'show'
                    ),
                    array(
                            'id' => '5',
                            'name' => '高考',
                            'style' => 'disable'
                    ),
                    array(
                            'id' => '6',
                            'name' => '艺术',
                            'style' => 'disable'
                    ),
                    array(
                            'id' => '7',
                            'name' => '体育',
                            'style' => 'disable'
                    )
                ),
                'sex' => array(
                    array('id'=>'1','name'=>'男','style'=>'active'),
                    array('id'=>'0','name'=>'女', 'style'=>'show')
                ),
                'area' => array(
                    'list' => array(
                        array('id'=>'1','name'=>'东城区','style'=>'show'),
                        array('id'=>'-1','name'=>'地铁沿线','style'=>'show'),
                        array('id'=>'3','name'=>'海淀区','style'=>'show'),
                        array('id'=>'4','name'=>'朝阳区','style'=>'show'),
                        array('id'=>'5','name'=>'石景山区','style'=>'show'),
                        array('id'=>'6','name'=>'丰台区','style'=>'active'),
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
                    'subway' => array(
                        array('id'=>'1','name'=>'1号线','style'=>'show'),
                        array('id'=>'2','name'=>'2号线','style'=>'show'),
                        array('id'=>'3','name'=>'3号线','style'=>'show'),
                        array('id'=>'4','name'=>'4号线','style'=>'show'),
                        array('id'=>'5','name'=>'5号线','style'=>'show'),
                        array('id'=>'6','name'=>'6号线','style'=>'active'),
                        array('id'=>'7','name'=>'7号线','style'=>'show'),
                        array('id'=>'8','name'=>'8号线','style'=>'show'),
                        array('id'=>'9','name'=>'9号线','style'=>'show'),
                        array('id'=>'10','name'=>'10号线','style'=>'disable'),
                        array('id'=>'11','name'=>'11号线','style'=>'show'),
                        array('id'=>'12','name'=>'12号线','style'=>'show'),
                        array('id'=>'13','name'=>'13号线','style'=>'show'),
                        array('id'=>'9','name'=>'大兴线','style'=>'show'),
                        array('id'=>'10','name'=>'房山线','style'=>'disable'),
                        array('id'=>'11','name'=>'亦庄线','style'=>'show'),
                        array('id'=>'12','name'=>'通州线','style'=>'show'),
                        array('id'=>'13','name'=>'机场线','style'=>'show')
                    )
                ),
                'approach' => array(
                    array('id'=>'1','name'=>'在线教学','style'=>'show'),
                    array('id'=>'2','name'=>'老师上门','style'=>'show'),
                    array('id'=>'3','name'=>'学生上门','style'=>'show'),
                    array('id'=>'4','name'=>'协商地点','style'=>'active')
                ),
                'date' => array(
                    array('id'=>'1','name'=>'周一','style'=>'show'),
                    array('id'=>'2','name'=>'周二','style'=>'show'),
                    array('id'=>'3','name'=>'周三','style'=>'show'),
                    array('id'=>'4','name'=>'周四','style'=>'active'),
                    array('id'=>'5','name'=>'周五','style'=>'show'),
                    array('id'=>'6','name'=>'周六','style'=>'show'),
                    array('id'=>'7','name'=>'周日','style'=>'active')
                ),
                'is_total' => array(
                    "course"=>1,
                    "sex"=>1,
                    "area"=>array(
                        '1'=>0,
                        '2'=>1
                    ),
                    "date"=>0,
                    "approach"=>0
                )
            ),
            //教师数据
            'teachers' => array(
                array(
                    'id' => '123', //老师ID
                    'name' => '张三', //老师名字
                    'name_cut' => '沈佳宜嘻...', //老师名字
                    'number' => 123213,
                    'like' => 12345,  //点赞数
                    'comment' => 0, //评论数
                    'invite_comment_count' => 0,//邀请评价数
                    'organization' => array(
                        'name'=>'精锐教育',
                        'url' =>'XXXX',
                        'description' => '该机构阿什利款到即发阿斯利康打飞机阿斯蒂芬撒了肯德基'
                    ),
                    'has_activity_auth' => true,
                    'certification' => array(
                        'profession',  //专业资质
                        'teacher',   //教师证
                        'student',  //学历认证
                        'idcard'     //身份证
                    ),
                    'summary' => '北京师范大学毕业,授课时语音精炼,提分率高北京师范大学毕业,授课时语音精炼,提分率高',  //一句话简介
                    'school_age' => '-1', //教龄
                    'course' => '##高中数学##初中数学\高中物理\初中物理高中数学\初中数学\高中物理\初中物理',  //教授的科目
                    'course_cut' => '高中数学\初中数学\高中物...',  //教授的科目
                    'style' => '老师上门\学生上门\在线授课', //上课方式
                    'price' => 0 ,     //上课价格
                    'tag' => array(             //教师标签
                        array('name'=>'擅长托福擅长托福阅读阅读'),
                        array('name'=>'美式口语'),
                        array('name'=>'善于和学生沟通'),
                        array('name'=>'性格活泼开朗'),
                        array('name'=>'性格活泼开朗')
                    ),
                    'stars_level' => 4.5,  //评分
                    'location' => '海淀-上地海淀上地海淀上地海淀上地海淀上地海淀上地海淀上地海淀上地海淀',  //所在地
                    'location_cut' => '海淀海淀-上地',
                    'video_url' => 'http://test.www.genshuixue.com/video/view/390',   //视频地址
                    'video_name' => '老师的视频',
                    'avatar_url' => 'http://img.gsxservice.com/170558_6mk3qxqs.jpeg', //头像地址
                    'detail_url' => 'xxx',  //详情页地址
                    "medal" => array(
                        array(
                            "type" => "21",
                            "desc" => "金质跟谁学名师最具人气奖",
                            "logo" => "http://img.gsxservice.com/0medal/5.png",
                            "phase" => 3,
                            "toplist_type" =>"22"
                        ),
                        array(
                            "type" => "11",
                            "desc" => "金质跟谁学名师最有价值奖",
                            "logo" => "http://img.gsxservice.com/0medal/5.png",
                            "phase" => 3,
                            "toplist_type" =>"22"
                        )
                    ),
                    'area_match' => 1, // 0表示非当前地域,1表示当前地域
                    'class_enrolling_count' => 3, // 表示班课数目
                    'video_course_count' => 0,//视频课数目
                    'teacher_type' => 2, // 老师类型, 1老师2在校生3其他
                    'student_count' => 1, //
                    'longitude' => 115.331398,//经度
                    'latitude' => 40.897445, //纬度
                ),
                array(
                    'id' => '123', //老师ID
                    'name' => '李四', //老师名字
                    'name_cut' => '沈佳宜嘻嘻嘻', //老师名字
                    'like' => 0,  //点赞数
                    'comment' => 12234, //评论数
                    'invite_comment_count' => 123,//邀请评价数
                    'organization' => array(
                        'name'=>'精锐教育',
                        'url' =>'XXXX',
                        'description' => '该机构阿什利款到即发阿斯利康打飞机阿斯蒂芬撒了肯德基'
                    ),
                    'has_activity_auth' => true,
                    'certification' => array(
                        array('name'=>'idcard'),    //身份证
                        array('name'=>'teacher'),   //教师证
                        array('name'=>'profession'),  //专业认证
                        array('name'=>'student')  //学历认证
                    ),
                    'summary' => '北京师范大学毕业,授课时语音精炼,提分率高',  //一句话简介
                    'school_age' => '9', //教龄
                    'course' => '高中数学\初中数学\高中物理\初中物理',  //教授的科目
                    'course_cut' => '高中数学\初中数学\高中物理\初中物理',  //教授的科目
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
                    'location_cut' => '海淀-上..',  //所在地
                    'video_url' => 'http://test.www.genshuixue.com/video/view/390',   //视频地址
                    'avatar_url' => 'http://img.genshuixue.com/1996_9dzf4lui.jpeg', //头像地址
                    'detail_url' => 'xxx',  //详情页地址
                    "medal" => array(
                        array(
                            "type" => "21",
                            "desc" => "金质跟谁学名师最具人气奖",
                            "logo" => "http://img.gsxservice.com/0medal/5.png",
                            "phase" => 3,
                            "toplist_type" =>"22"
                        )
                    ),
                    'area_match' => 1 ,// 0表示非当前地域,1表示当前地域
                    'class_enrolling_count' => 0, // 表示班课数目
                    'video_course_count' => 12,//视频课数目
                    'teacher_type' => 1, // 老师类型, 1老师2在校生3其他
                    'student_count' => 1, //
                    'longitude' => 116,//经度
                    'latitude' => 42, //纬度
                ),
                array(
                    'id' => '123', //老师ID
                    'name' => '猪坚强', //老师名字
                    'name_cut' => '沈佳宜嘻嘻嘻嘻嘻嘻我...', //老师名字
                    'like' => 0,  //点赞数
                    'comment' => 0, //评论数
                    'invite_comment_count' => 123,//邀请评价数
                    'certification' => array(
                        array('name'=>'idcard'),    //身份证认证
                        array('name'=>'teacher'),   //教师证认证
                    ),
                    'has_activity_auth' => true,
                    'summary' => '北京师范大学毕业,授课时语音精炼,提分率高',  //一句话简介
                    'school_age' => '9', //教龄
                    'course' => '高中数学\初中数学\高中物理\初中物理',  //教授的科目
                    'course_cut' => '高中数学\初中数学\高中物理\初中物理',  //教授的科目
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
                    'location_cut' => '海淀阿斯顿',  //所在地
                    'video_url' => 'XXX',   //视频地址
                    'avatar_url' => 'http://img.genshuixue.com/1996_9dzf4lui.jpeg', //头像地址
                    'detail_url' => 'xxx',  //详情页地址
                    'area_match' => 0, // 0表示非当前地域,1表示当前地域
                    'class_enrolling_count' => 3, // 表示班课数目
                    'video_course_count' => 67,//视频课数目
                    'teacher_type' => 2, // 老师类型, 1老师2在校生3其他
                    'student_count' => 1, //
                    'longitude' => 117,//经度
                    'latitude' => 41, //纬度
                ),
                array(
                    'id' => '123', //老师ID
                    'name' => '乱世枭雄', //老师名字
                    'name_cut' => '沈佳宜嘻嘻嘻嘻嘻嘻我...', //老师名字
                    'like' => 12342,  //点赞数
                    'comment' => 0, //评论数
                    'invite_comment_count' => 123,//邀请评价数
                    'certification' => array(
                        array('name'=>'idcard'),    //身份证认证
                        array('name'=>'teacher'),   //教师证认证
                        array('name'=>'student')  //学历认证
                    ),
                    'summary' => '北京师范大学毕业,授课时语音精炼,提分率高',  //一句话简介
                    'school_age' => '9', //教龄
                    'course' => '高中数学\初中数学\高中物理\初中物理',  //教授的科目
                    'course_cut' => '高中数学\初中数学\高中物理\初中物理',  //教授的科目
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
                    'location_cut' => '海淀-..',  //所在地
                    'video_url' => 'XXX',   //视频地址
                    'avatar_url' => 'http://img.genshuixue.com/1996_9dzf4lui.jpeg', //头像地址
                    'detail_url' => 'xxx',  //详情页地址
                    'area_match' => 1, // 0表示非当前地域,1表示当前地域
                    'class_enrolling_count' => 3, // 表示班课数目
                    'teacher_type' => 1, // 老师类型, 1老师2在校生3其他
                    'student_count' => 1, //
                    'longitude' => 113,//经度
                    'latitude' => 45, //纬度
                ),
                array(
                    'id' => '123', //老师ID
                    'name' => '沈佳宜嘻嘻嘻嘻嘻嘻我爱上了肯德基', //老师名字
                    'name_cut' => '沈佳宜嘻...', //老师名字
                    'number' => 123213,
                    'like' => 12345,  //点赞数
                    'comment' => 0, //评论数
                    'invite_comment_count' => 0,//邀请评价数
                    'organization' => array(
                        'name'=>'精锐教育',
                        'url' =>'XXXX',
                        'description' => '该机构阿什利款到即发阿斯利康打飞机阿斯蒂芬撒了肯德基'
                    ),
                    'has_activity_auth' => true,
                    'certification' => array(
                        'profession',  //专业资质
                        'teacher',   //教师证
                        'student',  //学历认证
                        'idcard'     //身份证
                    ),
                    'summary' => '北京师范大学毕业,授课时语音精炼,提分率高北京师范大学毕业,授课时语音精炼,提分率高',  //一句话简介
                    'school_age' => '-1', //教龄
                    'course' => '##高中数学##初中数学\高中物理\初中物理高中数学\初中数学\高中物理\初中物理',  //教授的科目
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
                    'location' => '海淀-上地海淀上地海淀上地海淀上地海淀上地海淀上地海淀上地海淀上地海淀',  //所在地
                    'location_cut' => '海淀海淀-上地',
                    'video_url' => 'http://test.www.genshuixue.com/video/view/390',   //视频地址
                    'video_name' => '老师的视频',
                    'avatar_url' => 'http://img.gsxservice.com/60181_og6hquos.jpeg', //头像地址
                    'detail_url' => 'xxx',  //详情页地址
                    "medal" => array(
                        array(
                            "type" => "21",
                            "desc" => "金质跟谁学名师最具人气奖",
                            "logo" => "http://img.gsxservice.com/0medal/5.png",
                            "phase" => 3,
                            "toplist_type" =>"22"
                        ),
                        array(
                            "type" => "11",
                            "desc" => "金质跟谁学名师最有价值奖",
                            "logo" => "http://img.gsxservice.com/0medal/5.png",
                            "phase" => 3,
                            "toplist_type" =>"22"
                        )
                    ),
                    'area_match' => 1, // 0表示非当前地域,1表示当前地域
                    'class_enrolling_count' => 3, // 表示班课数目
                    'video_course_count' => 0,//视频课数目
                    'teacher_type' => 2, // 老师类型, 1老师2在校生3其他
                    'student_count' => 1, //
                    'longitude' => 114,//经度
                    'latitude' => 43, //纬度
                ),
                array(
                    'id' => '123', //老师ID
                    'name' => '沈佳宜嘻嘻嘻', //老师名字
                    'name_cut' => '沈佳宜嘻嘻嘻', //老师名字
                    'like' => 0,  //点赞数
                    'comment' => 12234, //评论数
                    'invite_comment_count' => 123,//邀请评价数
                    'organization' => array(
                        'name'=>'精锐教育',
                        'url' =>'XXXX',
                        'description' => '该机构阿什利款到即发阿斯利康打飞机阿斯蒂芬撒了肯德基'
                    ),
                    'has_activity_auth' => true,
                    'certification' => array(
                        array('name'=>'idcard'),    //身份证
                        array('name'=>'teacher'),   //教师证
                        array('name'=>'profession'),  //专业认证
                        array('name'=>'student')  //学历认证
                    ),
                    'summary' => '北京师范大学毕业,授课时语音精炼,提分率高',  //一句话简介
                    'school_age' => '9', //教龄
                    'course' => '高中数学\初中数学\高中物理\初中物理',  //教授的科目
                    'course_cut' => '高中数学\初中数学\高中物理\初中物理',  //教授的科目
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
                    'location_cut' => '海淀-上..',  //所在地
                    'video_url' => 'http://test.www.genshuixue.com/video/view/390',   //视频地址
                    'avatar_url' => 'http://img.genshuixue.com/1996_9dzf4lui.jpeg', //头像地址
                    'detail_url' => 'xxx',  //详情页地址
                    "medal" => array(
                        array(
                            "type" => "21",
                            "desc" => "金质跟谁学名师最具人气奖",
                            "logo" => "http://img.gsxservice.com/0medal/5.png",
                            "phase" => 3,
                            "toplist_type" =>"22"
                        )
                    ),
                    'area_match' => 1 ,// 0表示非当前地域,1表示当前地域
                    'class_enrolling_count' => 0, // 表示班课数目
                    'video_course_count' => 12,//视频课数目
                    'teacher_type' => 1, // 老师类型, 1老师2在校生3其他
                    'student_count' => 1, //
                    'longitude' => 117,//经度
                    'latitude' => 43, //纬度
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
                    ),
                    'has_activity_auth' => true,
                    'summary' => '北京师范大学毕业,授课时语音精炼,提分率高',  //一句话简介
                    'school_age' => '9', //教龄
                    'course' => '高中数学\初中数学\高中物理\初中物理',  //教授的科目
                    'course_cut' => '高中数学\初中数学\高中物理\初中物理',  //教授的科目
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
                    'location_cut' => '海淀阿斯顿',  //所在地
                    'video_url' => 'XXX',   //视频地址
                    'avatar_url' => 'http://img.genshuixue.com/1996_9dzf4lui.jpeg', //头像地址
                    'detail_url' => 'xxx',  //详情页地址
                    'area_match' => 0, // 0表示非当前地域,1表示当前地域
                    'class_enrolling_count' => 3, // 表示班课数目
                    'video_course_count' => 67,//视频课数目
                    'teacher_type' => 2, // 老师类型, 1老师2在校生3其他
                    'student_count' => 1, //
                    'longitude' => 126,//经度
                    'latitude' => 44, //纬度
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
                        array('name'=>'student')  //学历认证
                    ),
                    'summary' => '北京师范大学毕业,授课时语音精炼,提分率高',  //一句话简介
                    'school_age' => '9', //教龄
                    'course' => '高中数学\初中数学\高中物理\初中物理',  //教授的科目
                    'course_cut' => '高中数学\初中数学\高中物理\初中物理',  //教授的科目
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
                    'location_cut' => '海淀-..',  //所在地
                    'video_url' => 'XXX',   //视频地址
                    'avatar_url' => 'http://img.genshuixue.com/1996_9dzf4lui.jpeg', //头像地址
                    'detail_url' => 'xxx',  //详情页地址
                    'area_match' => 1, // 0表示非当前地域,1表示当前地域
                    'class_enrolling_count' => 3, // 表示班课数目
                    'teacher_type' => 1, // 老师类型, 1老师2在校生3其他
                    'student_count' => 1, //
                    'longitude' => 118,//经度
                    'latitude' => 42, //纬度
                ),
                array(
                    'id' => '123', //老师ID
                    'name' => '沈佳宜嘻嘻嘻嘻嘻嘻我爱上了肯德基', //老师名字
                    'name_cut' => '沈佳宜嘻...', //老师名字
                    'number' => 123213,
                    'like' => 12345,  //点赞数
                    'comment' => 0, //评论数
                    'invite_comment_count' => 0,//邀请评价数
                    'organization' => array(
                        'name'=>'精锐教育',
                        'url' =>'XXXX',
                        'description' => '该机构阿什利款到即发阿斯利康打飞机阿斯蒂芬撒了肯德基'
                    ),
                    'has_activity_auth' => true,
                    'certification' => array(
                        'profession',  //专业资质
                        'teacher',   //教师证
                        'student',  //学历认证
                        'idcard'     //身份证
                    ),
                    'summary' => '北京师范大学毕业,授课时语音精炼,提分率高北京师范大学毕业,授课时语音精炼,提分率高',  //一句话简介
                    'school_age' => '-1', //教龄
                    'course' => '##高中数学##初中数学\高中物理\初中物理高中数学\初中数学\高中物理\初中物理',  //教授的科目
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
                    'location' => '海淀-上地海淀上地海淀上地海淀上地海淀上地海淀上地海淀上地海淀上地海淀',  //所在地
                    'location_cut' => '海淀海淀-上地',
                    'video_url' => 'http://test.www.genshuixue.com/video/view/390',   //视频地址
                    'video_name' => '老师的视频',
                    'avatar_url' => 'http://img.gsxservice.com/60181_og6hquos.jpeg', //头像地址
                    'detail_url' => 'xxx',  //详情页地址
                    "medal" => array(
                        array(
                            "type" => "21",
                            "desc" => "金质跟谁学名师最具人气奖",
                            "logo" => "http://img.gsxservice.com/0medal/5.png",
                            "phase" => 3,
                            "toplist_type" =>"22"
                        ),
                        array(
                            "type" => "11",
                            "desc" => "金质跟谁学名师最有价值奖",
                            "logo" => "http://img.gsxservice.com/0medal/5.png",
                            "phase" => 3,
                            "toplist_type" =>"22"
                        )
                    ),
                    'area_match' => 1, // 0表示非当前地域,1表示当前地域
                    'class_enrolling_count' => 3, // 表示班课数目
                    'video_course_count' => 0,//视频课数目
                    'teacher_type' => 2, // 老师类型, 1老师2在校生3其他
                    'student_count' => 1, //
                    'longitude' => 119,//经度
                    'latitude' => 42, //纬度
                ),
                array(
                    'id' => '123', //老师ID
                    'name' => '沈佳宜嘻嘻嘻', //老师名字
                    'name_cut' => '沈佳宜嘻嘻嘻', //老师名字
                    'like' => 0,  //点赞数
                    'comment' => 12234, //评论数
                    'invite_comment_count' => 123,//邀请评价数
                    'organization' => array(
                        'name'=>'精锐教育',
                        'url' =>'XXXX',
                        'description' => '该机构阿什利款到即发阿斯利康打飞机阿斯蒂芬撒了肯德基'
                    ),
                    'has_activity_auth' => true,
                    'certification' => array(
                        array('name'=>'idcard'),    //身份证
                        array('name'=>'teacher'),   //教师证
                        array('name'=>'profession'),  //专业认证
                        array('name'=>'student')  //学历认证
                    ),
                    'summary' => '北京师范大学毕业,授课时语音精炼,提分率高',  //一句话简介
                    'school_age' => '9', //教龄
                    'course' => '高中数学\初中数学\高中物理\初中物理',  //教授的科目
                    'course_cut' => '高中数学\初中数学\高中物理\初中物理',  //教授的科目
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
                    'location_cut' => '海淀-上..',  //所在地
                    'video_url' => 'http://test.www.genshuixue.com/video/view/390',   //视频地址
                    'avatar_url' => 'http://img.genshuixue.com/1996_9dzf4lui.jpeg', //头像地址
                    'detail_url' => 'xxx',  //详情页地址
                    "medal" => array(
                        array(
                            "type" => "21",
                            "desc" => "金质跟谁学名师最具人气奖",
                            "logo" => "http://img.gsxservice.com/0medal/5.png",
                            "phase" => 3,
                            "toplist_type" =>"22"
                        )
                    ),
                    'area_match' => 1 ,// 0表示非当前地域,1表示当前地域
                    'class_enrolling_count' => 0, // 表示班课数目
                    'video_course_count' => 12,//视频课数目
                    'teacher_type' => 1, // 老师类型, 1老师2在校生3其他
                    'student_count' => 1, //
                    'longitude' => 123,//经度
                    'latitude' => 42, //纬度
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
                    ),
                    'has_activity_auth' => true,
                    'summary' => '北京师范大学毕业,授课时语音精炼,提分率高',  //一句话简介
                    'school_age' => '9', //教龄
                    'course' => '高中数学\初中数学\高中物理\初中物理',  //教授的科目
                    'course_cut' => '高中数学\初中数学\高中物理\初中物理',  //教授的科目
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
                    'location_cut' => '海淀阿斯顿',  //所在地
                    'video_url' => 'XXX',   //视频地址
                    'avatar_url' => 'http://img.genshuixue.com/1996_9dzf4lui.jpeg', //头像地址
                    'detail_url' => 'xxx',  //详情页地址
                    'area_match' => 0, // 0表示非当前地域,1表示当前地域
                    'class_enrolling_count' => 3, // 表示班课数目
                    'video_course_count' => 67,//视频课数目
                    'teacher_type' => 2, // 老师类型, 1老师2在校生3其他
                    'student_count' => 1, //
                    'longitude' => 116,//经度
                    'latitude' => 45, //纬度
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
                        array('name'=>'student')  //学历认证
                    ),
                    'summary' => '北京师范大学毕业,授课时语音精炼,提分率高',  //一句话简介
                    'school_age' => '9', //教龄
                    'course' => '高中数学\初中数学\高中物理\初中物理',  //教授的科目
                    'course_cut' => '高中数学\初中数学\高中物理\初中物理',  //教授的科目
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
                    'location_cut' => '海淀-..',  //所在地
                    'video_url' => 'XXX',   //视频地址
                    'avatar_url' => 'http://img.genshuixue.com/1996_9dzf4lui.jpeg', //头像地址
                    'detail_url' => 'xxx',  //详情页地址
                    'area_match' => 1, // 0表示非当前地域,1表示当前地域
                    'class_enrolling_count' => 3, // 表示班课数目
                    'teacher_type' => 1, // 老师类型, 1老师2在校生3其他
                    'student_count' => 1, //
                    'longitude' => 116,//经度
                    'latitude' => 48, //纬度
                ),
                array(
                    'id' => '123', //老师ID
                    'name' => '张三', //老师名字
                    'name_cut' => '沈佳宜嘻...', //老师名字
                    'number' => 123213,
                    'like' => 12345,  //点赞数
                    'comment' => 0, //评论数
                    'invite_comment_count' => 0,//邀请评价数
                    'organization' => array(
                        'name'=>'精锐教育',
                        'url' =>'XXXX',
                        'description' => '该机构阿什利款到即发阿斯利康打飞机阿斯蒂芬撒了肯德基'
                    ),
                    'has_activity_auth' => true,
                    'certification' => array(
                        'profession',  //专业资质
                        'teacher',   //教师证
                        'student',  //学历认证
                        'idcard'     //身份证
                    ),
                    'summary' => '北京师范大学毕业,授课时语音精炼,提分率高北京师范大学毕业,授课时语音精炼,提分率高',  //一句话简介
                    'school_age' => '-1', //教龄
                    'course' => '##高中数学##初中数学\高中物理\初中物理高中数学\初中数学\高中物理\初中物理',  //教授的科目
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
                    'location' => '海淀-上地海淀上地海淀上地海淀上地海淀上地海淀上地海淀上地海淀上地海淀',  //所在地
                    'location_cut' => '海淀海淀-上地',
                    'video_url' => 'http://test.www.genshuixue.com/video/view/390',   //视频地址
                    'video_name' => '老师的视频',
                    'avatar_url' => 'http://img.gsxservice.com/170558_6mk3qxqs.jpeg', //头像地址
                    'detail_url' => 'xxx',  //详情页地址
                    "medal" => array(
                        array(
                            "type" => "21",
                            "desc" => "金质跟谁学名师最具人气奖",
                            "logo" => "http://img.gsxservice.com/0medal/5.png",
                            "phase" => 3,
                            "toplist_type" =>"22"
                        ),
                        array(
                            "type" => "11",
                            "desc" => "金质跟谁学名师最有价值奖",
                            "logo" => "http://img.gsxservice.com/0medal/5.png",
                            "phase" => 3,
                            "toplist_type" =>"22"
                        )
                    ),
                    'area_match' => 1, // 0表示非当前地域,1表示当前地域
                    'class_enrolling_count' => 3, // 表示班课数目
                    'video_course_count' => 0,//视频课数目
                    'teacher_type' => 2, // 老师类型, 1老师2在校生3其他
                    'student_count' => 1, //
                    'longitude' => 115.331398,//经度
                    'latitude' => 40.897445, //纬度
                ),
                array(
                    'id' => '123', //老师ID
                    'name' => '李四', //老师名字
                    'name_cut' => '沈佳宜嘻嘻嘻', //老师名字
                    'like' => 0,  //点赞数
                    'comment' => 12234, //评论数
                    'invite_comment_count' => 123,//邀请评价数
                    'organization' => array(
                        'name'=>'精锐教育',
                        'url' =>'XXXX',
                        'description' => '该机构阿什利款到即发阿斯利康打飞机阿斯蒂芬撒了肯德基'
                    ),
                    'has_activity_auth' => true,
                    'certification' => array(
                        array('name'=>'idcard'),    //身份证
                        array('name'=>'teacher'),   //教师证
                        array('name'=>'profession'),  //专业认证
                        array('name'=>'student')  //学历认证
                    ),
                    'summary' => '北京师范大学毕业,授课时语音精炼,提分率高',  //一句话简介
                    'school_age' => '9', //教龄
                    'course' => '高中数学\初中数学\高中物理\初中物理',  //教授的科目
                    'course_cut' => '高中数学\初中数学\高中物理\初中物理',  //教授的科目
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
                    'location_cut' => '海淀-上..',  //所在地
                    'video_url' => 'http://test.www.genshuixue.com/video/view/390',   //视频地址
                    'avatar_url' => 'http://img.genshuixue.com/1996_9dzf4lui.jpeg', //头像地址
                    'detail_url' => 'xxx',  //详情页地址
                    "medal" => array(
                        array(
                            "type" => "21",
                            "desc" => "金质跟谁学名师最具人气奖",
                            "logo" => "http://img.gsxservice.com/0medal/5.png",
                            "phase" => 3,
                            "toplist_type" =>"22"
                        )
                    ),
                    'area_match' => 1 ,// 0表示非当前地域,1表示当前地域
                    'class_enrolling_count' => 0, // 表示班课数目
                    'video_course_count' => 12,//视频课数目
                    'teacher_type' => 1, // 老师类型, 1老师2在校生3其他
                    'student_count' => 1, //
                    'longitude' => 116,//经度
                    'latitude' => 42, //纬度
                ),
                array(
                    'id' => '123', //老师ID
                    'name' => '猪坚强', //老师名字
                    'name_cut' => '沈佳宜嘻嘻嘻嘻嘻嘻我...', //老师名字
                    'like' => 0,  //点赞数
                    'comment' => 0, //评论数
                    'invite_comment_count' => 123,//邀请评价数
                    'certification' => array(
                        array('name'=>'idcard'),    //身份证认证
                        array('name'=>'teacher'),   //教师证认证
                    ),
                    'has_activity_auth' => true,
                    'summary' => '北京师范大学毕业,授课时语音精炼,提分率高',  //一句话简介
                    'school_age' => '9', //教龄
                    'course' => '高中数学\初中数学\高中物理\初中物理',  //教授的科目
                    'course_cut' => '高中数学\初中数学\高中物理\初中物理',  //教授的科目
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
                    'location_cut' => '海淀阿斯顿',  //所在地
                    'video_url' => 'XXX',   //视频地址
                    'avatar_url' => 'http://img.genshuixue.com/1996_9dzf4lui.jpeg', //头像地址
                    'detail_url' => 'xxx',  //详情页地址
                    'area_match' => 0, // 0表示非当前地域,1表示当前地域
                    'class_enrolling_count' => 3, // 表示班课数目
                    'video_course_count' => 67,//视频课数目
                    'teacher_type' => 2, // 老师类型, 1老师2在校生3其他
                    'student_count' => 1, //
                    'longitude' => 117,//经度
                    'latitude' => 41, //纬度
                ),
                array(
                    'id' => '123', //老师ID
                    'name' => '乱世枭雄', //老师名字
                    'name_cut' => '沈佳宜嘻嘻嘻嘻嘻嘻我...', //老师名字
                    'like' => 12342,  //点赞数
                    'comment' => 0, //评论数
                    'invite_comment_count' => 123,//邀请评价数
                    'certification' => array(
                        array('name'=>'idcard'),    //身份证认证
                        array('name'=>'teacher'),   //教师证认证
                        array('name'=>'student')  //学历认证
                    ),
                    'summary' => '北京师范大学毕业,授课时语音精炼,提分率高',  //一句话简介
                    'school_age' => '9', //教龄
                    'course' => '高中数学\初中数学\高中物理\初中物理',  //教授的科目
                    'course_cut' => '高中数学\初中数学\高中物理\初中物理',  //教授的科目
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
                    'location_cut' => '海淀-..',  //所在地
                    'video_url' => 'XXX',   //视频地址
                    'avatar_url' => 'http://img.genshuixue.com/1996_9dzf4lui.jpeg', //头像地址
                    'detail_url' => 'xxx',  //详情页地址
                    'area_match' => 1, // 0表示非当前地域,1表示当前地域
                    'class_enrolling_count' => 3, // 表示班课数目
                    'teacher_type' => 1, // 老师类型, 1老师2在校生3其他
                    'student_count' => 1, //
                    'longitude' => 113,//经度
                    'latitude' => 45, //纬度
                ),
                array(
                    'id' => '123', //老师ID
                    'name' => '沈佳宜嘻嘻嘻嘻嘻嘻我爱上了肯德基', //老师名字
                    'name_cut' => '沈佳宜嘻...', //老师名字
                    'number' => 123213,
                    'like' => 12345,  //点赞数
                    'comment' => 0, //评论数
                    'invite_comment_count' => 0,//邀请评价数
                    'organization' => array(
                        'name'=>'精锐教育',
                        'url' =>'XXXX',
                        'description' => '该机构阿什利款到即发阿斯利康打飞机阿斯蒂芬撒了肯德基'
                    ),
                    'has_activity_auth' => true,
                    'certification' => array(
                        'profession',  //专业资质
                        'teacher',   //教师证
                        'student',  //学历认证
                        'idcard'     //身份证
                    ),
                    'summary' => '北京师范大学毕业,授课时语音精炼,提分率高北京师范大学毕业,授课时语音精炼,提分率高',  //一句话简介
                    'school_age' => '-1', //教龄
                    'course' => '##高中数学##初中数学\高中物理\初中物理高中数学\初中数学\高中物理\初中物理',  //教授的科目
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
                    'location' => '海淀-上地海淀上地海淀上地海淀上地海淀上地海淀上地海淀上地海淀上地海淀',  //所在地
                    'location_cut' => '海淀海淀-上地',
                    'video_url' => 'http://test.www.genshuixue.com/video/view/390',   //视频地址
                    'video_name' => '老师的视频',
                    'avatar_url' => 'http://img.gsxservice.com/60181_og6hquos.jpeg', //头像地址
                    'detail_url' => 'xxx',  //详情页地址
                    "medal" => array(
                        array(
                            "type" => "21",
                            "desc" => "金质跟谁学名师最具人气奖",
                            "logo" => "http://img.gsxservice.com/0medal/5.png",
                            "phase" => 3,
                            "toplist_type" =>"22"
                        ),
                        array(
                            "type" => "11",
                            "desc" => "金质跟谁学名师最有价值奖",
                            "logo" => "http://img.gsxservice.com/0medal/5.png",
                            "phase" => 3,
                            "toplist_type" =>"22"
                        )
                    ),
                    'area_match' => 1, // 0表示非当前地域,1表示当前地域
                    'class_enrolling_count' => 3, // 表示班课数目
                    'video_course_count' => 0,//视频课数目
                    'teacher_type' => 2, // 老师类型, 1老师2在校生3其他
                    'student_count' => 1, //
                    'longitude' => 114,//经度
                    'latitude' => 43, //纬度
                ),
                array(
                    'id' => '123', //老师ID
                    'name' => '沈佳宜嘻嘻嘻', //老师名字
                    'name_cut' => '沈佳宜嘻嘻嘻', //老师名字
                    'like' => 0,  //点赞数
                    'comment' => 12234, //评论数
                    'invite_comment_count' => 123,//邀请评价数
                    'organization' => array(
                        'name'=>'精锐教育',
                        'url' =>'XXXX',
                        'description' => '该机构阿什利款到即发阿斯利康打飞机阿斯蒂芬撒了肯德基'
                    ),
                    'has_activity_auth' => true,
                    'certification' => array(
                        array('name'=>'idcard'),    //身份证
                        array('name'=>'teacher'),   //教师证
                        array('name'=>'profession'),  //专业认证
                        array('name'=>'student')  //学历认证
                    ),
                    'summary' => '北京师范大学毕业,授课时语音精炼,提分率高',  //一句话简介
                    'school_age' => '9', //教龄
                    'course' => '高中数学\初中数学\高中物理\初中物理',  //教授的科目
                    'course_cut' => '高中数学\初中数学\高中物理\初中物理',  //教授的科目
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
                    'location_cut' => '海淀-上..',  //所在地
                    'video_url' => 'http://test.www.genshuixue.com/video/view/390',   //视频地址
                    'avatar_url' => 'http://img.genshuixue.com/1996_9dzf4lui.jpeg', //头像地址
                    'detail_url' => 'xxx',  //详情页地址
                    "medal" => array(
                        array(
                            "type" => "21",
                            "desc" => "金质跟谁学名师最具人气奖",
                            "logo" => "http://img.gsxservice.com/0medal/5.png",
                            "phase" => 3,
                            "toplist_type" =>"22"
                        )
                    ),
                    'area_match' => 1 ,// 0表示非当前地域,1表示当前地域
                    'class_enrolling_count' => 0, // 表示班课数目
                    'video_course_count' => 12,//视频课数目
                    'teacher_type' => 1, // 老师类型, 1老师2在校生3其他
                    'student_count' => 1, //
                    'longitude' => 117,//经度
                    'latitude' => 43, //纬度
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
                    ),
                    'has_activity_auth' => true,
                    'summary' => '北京师范大学毕业,授课时语音精炼,提分率高',  //一句话简介
                    'school_age' => '9', //教龄
                    'course' => '高中数学\初中数学\高中物理\初中物理',  //教授的科目
                    'course_cut' => '高中数学\初中数学\高中物理\初中物理',  //教授的科目
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
                    'location_cut' => '海淀阿斯顿',  //所在地
                    'video_url' => 'XXX',   //视频地址
                    'avatar_url' => 'http://img.genshuixue.com/1996_9dzf4lui.jpeg', //头像地址
                    'detail_url' => 'xxx',  //详情页地址
                    'area_match' => 0, // 0表示非当前地域,1表示当前地域
                    'class_enrolling_count' => 3, // 表示班课数目
                    'video_course_count' => 67,//视频课数目
                    'teacher_type' => 2, // 老师类型, 1老师2在校生3其他
                    'student_count' => 1, //
                    'longitude' => 126,//经度
                    'latitude' => 44, //纬度
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
                        array('name'=>'student')  //学历认证
                    ),
                    'summary' => '北京师范大学毕业,授课时语音精炼,提分率高',  //一句话简介
                    'school_age' => '9', //教龄
                    'course' => '高中数学\初中数学\高中物理\初中物理',  //教授的科目
                    'course_cut' => '高中数学\初中数学\高中物理\初中物理',  //教授的科目
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
                    'location_cut' => '海淀-..',  //所在地
                    'video_url' => 'XXX',   //视频地址
                    'avatar_url' => 'http://img.genshuixue.com/1996_9dzf4lui.jpeg', //头像地址
                    'detail_url' => 'xxx',  //详情页地址
                    'area_match' => 1, // 0表示非当前地域,1表示当前地域
                    'class_enrolling_count' => 3, // 表示班课数目
                    'teacher_type' => 1, // 老师类型, 1老师2在校生3其他
                    'student_count' => 1, //
                    'longitude' => 118,//经度
                    'latitude' => 42, //纬度
                ),
            ),
            //搜索query
            'q'=>'语文',
            'keywords' => '海淀区, 男, 上门教学',
            'title' => '北京 数学 老师-跟谁学',
            'description' => '【找好老师，上跟谁学】跟谁学拥有大量优秀的老师，在北京提供教学服务，每位老师都有详尽的个人信息展示，让您全面了解老师，轻松选择，快来看看吧',
            'has_filter' => true ,
            //筛选条件
            'condition'=>array(
                'course'=>'123',
                'secondcourse' => '13',
                'thirdcourse' => '12',
                'sex' => '1',
                'area' => '132',
                'date' => '4,7',
                'approach' => '2',
                'video' => 1,
                'source' => 'search', //获取搜索来源
                                    //source=hot 来自首页搜索框下方
                                    //source=cat 来自全部课程中的导航
                                    //source=floor-k12 来自首页中小学
                                    //source=floor-abroad 来自首页出国留学
                                    //source=floor-art 来自首页艺术
                'city' => '123',    //新增字段,代表要搜索的城市.
                'local' => 1, // 是否是本地老师
                'price_start' => 100, //开始价格
                'price_end' => 200, //a结束价格
                'min_price_first' => 26, //第一次搜索时的价格最小值
                'max_price_first' => 5000, //第一次搜索时的价格最大值
                'longitude' => 112.321,//经度
                'latitude' => 19.32232,//纬度
                'radius' => 10,//km半径
                //当前选中的tab选项
                //all  综合排序
                //popular  人气
                //price  价格
                //comment  评论数
                //video 有视频
                'sort'=> 'price_desc',
                'has_class' => 0, // 是否有班课 0 , 1
                'has_video_course' => 1 , //是否有视频课 0 , 1
                'teacher_type' => 3, // 老师类型 1老师 2大学生 3其他
            ),
            'pager'=>array(
                'result_total' => 100,
                'local_total' => 40,
                'page' => 50 ,
                'page_size' => 10
            ),
            //搜索词纠错
            'suggest' => '英语',
            'suggests' => array(
                '英语',
                '音乐'
            ),
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
            )

    )
);

$response = array(
    "code" => 0,
    "data" => array(
        "teachers" => $tpl_data['tpl_data']['teachers'],
        "tpl" => array(
            "mapSearchAjax" => fetch('teacher/map/teacherList', array(
                'tpl_data' =>  $tpl_data['tpl_data']
            )),
        ),
        "pager" => $tpl_data['tpl_data']['pager']

    )
);

echo json_encode($response);