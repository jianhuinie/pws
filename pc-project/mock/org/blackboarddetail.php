<?php

require("../bootstrap.php");

render(
    "org/blackboardDetail",
    array(
        'code' => 0,
        'tpl_data' => array(
            'is_favored' => false,
            'board_course' => array(// 推荐课程
                'id' => "133",
                'number' => "141126475716",
                'name' => "托福考核托福考核托福考核托福考核托福考核托福考核托福考核",
                'teacher_name' => "杨柳音子 ",
                'teacher_number' => "876795788",
                'teacher_avatar' => "http://test-img.gsxservice.com/headpic_woman.png",
                'course_len' => 1,
                'max_student' => "1000",
                'pay_student' => 0,
                'begin_time' => "2015-08-28",
                'n_begin_time' => "2015-08-28 17:30:00",
                'end_time' => "2014-11-27",
                'preface' => "http://test-img.gsxservice.com/16834_fqlam21x.png",
                'original_price' => 32,
                'price' => "23",
                'url' => "http://tianrui-m.test.genshuixue.com/teacher/classCourseDetail/141126475716",
                'pc_url' => "http://tianrui-www.test.genshuixue.com/teacher/classCourseDetail/141126475716",
                'is_online' => false,
                'create_time' => "2014-11-26 20:09:51",
                'des' => null,
                'time' => "8月28日-11月27日 17:30-15:30,共一个小时",
                'arrangement' => " 2014年11月27日14:30-15:30,共一个小时",
                'student_desc' => "这里是适用人群,共一个小时,共一个小时,共一个小时",
                'address' => "这里是上课地址,共一个小时,共一个小时,共一个小时",
                'teacher_score' => '2' ,//老师五角星
                'order_comment_count' => 3,
                'invite_comment_count' => 4,//老师评价
                'school_age' => 4,//教年
                'comment_url' => "http://www.genshuixue.com",
                'teacher_url' => "http://www.genshuixue.com",
            ),
            'sign_info' => array(// 报名信息
                array(
                    'label' => "孩子姓名",
                    'hint' => "请输入姓名",
                    'required' => 1,
                    'name' => "name"
                ),
                array(
                    'label' => "年龄",
                    'hint' => "请输入年龄",
                    'required' => 1,
                    'name' => "age"
                ),array(
                    'label' => "年龄",
                    'hint' => "请输入年龄",
                    'required' => 0,
                    'name' => "ageq"
                )
            ),
            'board_conf' => array(// 活动的宣传内容
                'start_time' => "2015-11-03 19:58:43",
                'end_time' => "332015-08-20 17:30:00",
                'address' => "beijing ",
                'count_limit' => "",
                'report_end_time' => "222015-08-20 23:30:00",
                'apply_count' => '3',
                'activity_end' => false,
                'has_apply' => true,
            ),
            'user_info' => array(// 用户的信息
                'user_name' => "啦啦啦",
                'user_mobile' => "13177771403",
            ),
            'coupon' => array(
                '0' => array(
                    'id' => "705491276b540ecfa6976a31c3b071e3",
                    'total_money' => "100.00",
                    'cond_threshold' => null,
                    'url' => "/org/orgCoupon?serial_num=705491276b540ecfa6976a31c3b071e3",
                ),
                '1' => array(
                    'id' => "ce1c859e272475dd54dff64253663fdc",
                    'total_money' => "20.00",
                    'cond_threshold' => 100.00,
                    'url' => "/org/orgCoupon?serial_num=705491276b540ecfa6976a31c3b071e3",
                ),
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
                'tags' => array(
                    '0' => array(
                        'name' => 'kobe',
                    ),
                    '1' => array(
                        'name' => 'nba',
                    ),
                    '2' => array(
                        'name' => '单挑贝尔',
                    ),
                ),
                'domain' => 'liumeiyu03',
                'pager_count' => 20
            ),
            'board_detail' => array(
                'id' => 1234333,
                'img' => 'http://www.sanguosha.com/uploads/201501/54b8889a91536.jpg',
                'type' => '2',
                'title' => '《三国杀传奇》今日全民公测 等你来战！',
                'content' => '<p>微软雅黑-48-居中</p><p>绿色字体，蓝色底-居左</p><p><strong><em>加粗-斜体-下划线-居右</em></strong></p><p><img src="http://img.baidu.com/hi/jx2/j_0002.gif" /><img src="http://img.baidu.com/hi/jx2/j_0071.gif" /><img src="http://img.baidu.com/hi/jx2/j_0079.gif" /><img src="http://img.baidu.com/hi/tsj/t_0014.gif" /><img src="http://img.baidu.com/hi/ldw/w_0016.gif" /><img src="http://img.baidu.com/hi/babycat/C_0019.gif" /><img src="http://img.baidu.com/hi/face/i_f25.gif" /><img src="http://img.baidu.com/hi/youa/y_0039.gif" />一串表情~</p><ol><li><p>嘿嘿嘿嘿额<br /></p></li><li><p>哈哈哈哈哈<br /></p></li><li><p>呵呵呵呵<br /></p></li></ol><ul><li><p>1111111111<br /></p></li></ul><ul><li><p>2222222222</p></li><li><p>3333333333</p></li><li><p><img src="http://test-img.gsxservice.com/179150_e7n3njws.jpg" /></p></li></ul>',
                'create_time' => '2015-01-30',
                'read_times' => '680',
                'support_num' => '2000',
                'liked' => true ,
                'img' => "http://img.gsxservice.com/3825184_ep3tg5fs.jpg",
            ),
            "title" => "北京 徐梅山-星座-居家风水-找好老师，上跟谁学",
            "description" => "【找好老师，上跟谁学】因为专业所以权威，深入浅出、简单易懂、化繁为简、结合实际、实例分析，教授科目：星座-居家风水",
            "keywords" => "北京 徐梅山-星座",
        )
    )
);