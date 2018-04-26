<?php

require("../../../bootstrap.php");


render(
    "userCenter/teacherCenter/mktCenter/activityApply",
    array(
        "tpl_data" => array(
            'new_activity' => array(
                'list' => array(
                    array(
                        'title' => '标题',
                        'description' => '活动描述活动描述v活动描述活动描述活动描述活动描述活动描述活动描述活动描述活动描述活动描述活动描述活动描述活动描述活动描述活动描述',
                        'requirements' => '报名条件',
                        'cover_url' => '../../../../src/img/photo.jpg',
                        'begin_time' => '开始时间',
                        'end_time' => '结束时间',
                        'status' => '0',
                        'enrolled_count' => '已报名人数',
                        'enroll_url' => 'http://www.baidu.com'
                    ),
                    array(
                        'title' => '标题',
                        'description' => '活动描述',
                        'requirements' => '报名条件',
                        'cover_url' => '封面图',
                        'begin_time' => '开始时间',
                        'end_time' => '结束时间',
                        'status' => '1',
                        'enrolled_count' => '已报名人数',
                        'enroll_url' => 'http://www.sina.com'
                    ),
                    array(
                        'title' => '标题',
                        'description' => '活动描述',
                        'requirements' => '报名条件',
                        'cover_url' => '封面图',
                        'begin_time' => '开始时间',
                        'end_time' => '结束时间',
                        'status' => '2',
                        'enrolled_count' => '已报名人数',
                        'enroll_url' => 'http://www.baidu.com'
                    ),
                    array(
                        'title' => '标题',
                        'description' => '活动描述活动描述v活动描述活动描述活动描述活动描述活动描述活动描述活动描述活动描述活动描述活动描述活动描述活动描述活动描述活动描述',
                        'requirements' => '报名条件',
                        'cover_url' => '封面图',
                        'begin_time' => '开始时间',
                        'end_time' => '结束时间',
                        'status' => '0',
                        'enrolled_count' => '已报名人数',
                        'enroll_url' => 'http://www.baidu.com'
                    ),
                    array(
                        'title' => '标题',
                        'description' => '活动描述',
                        'requirements' => '报名条件',
                        'cover_url' => '封面图',
                        'begin_time' => '开始时间',
                        'end_time' => '结束时间',
                        'status' => '1',
                        'enrolled_count' => '已报名人数',
                        'enroll_url' => 'http://www.baidu.com'
                    ),
                ),
            ),
            'enrolled_activity' => array(
                'list' => array(
                    array(
                        'title' => '标题',
                        'description' => '活动描述',
                        'requirements' => '报名条件',
                        'cover_url' => '封面图',
                        'begin_time' => '开始时间',
                        'end_time' => '结束时间',
                        'status' => '-1',
                        'enrolled_count' => '已报名人数',
                        'enroll_url' => '报名url'
                    ),
                    array(
                        'title' => '标题',
                        'description' => '活动描述',
                        'requirements' => '报名条件',
                        'cover_url' => '封面图',
                        'begin_time' => '开始时间',
                        'end_time' => '结束时间',
                        'status' => '1',
                        'enrolled_count' => '已报名人数',
                        'enroll_url' => '报名url'
                    ),
                    array(
                        'title' => '标题',
                        'description' => '活动描述',
                        'requirements' => '报名条件',
                        'cover_url' => '封面图',
                        'begin_time' => '开始时间',
                        'end_time' => '结束时间',
                        'status' => '2',
                        'enrolled_count' => '已报名人数',
                        'enroll_url' => '报名url'
                    ),
                ),
            ),

        )

    )
);