<?php

require("../bootstrap.php");

render(
    "activity/superTeacher",
    array(
       "tpl_data" => array(
            "status" => 2, // 1:用户已报名，2:用户未报名
            'hot_teacher' => array(
                'list' => array(
                    [
                        'avatar' => '头像',
                        'preface' => '封面图',
                        'teacher_name' => '老师称',
                        'title' => '视频title',
                        'video_url' => '视频id',
                        'vote_count' => '99999',
                        'teacher_link' => "teacher_link"
                    ],
                    [
                        'avatar' => 'http://img.gsxservice.com/959247_a9t8u72w.jpeg',
                        'preface' => 'http://img.gsxservice.com/959247_a9t8u72w.jpeg',
                        'teacher_name' => '老师称',
                        'title' => '视频title',
                        'video_url' => '视频id',
                        'vote_count' => '投票总数',
                        'teacher_link' => "teacher_link"
                    ],
                    [
                        'avatar' => '头像',
                        'preface' => '封面图',
                        'teacher_name' => '老师名称',
                        'title' => '视频title',
                        'video_url' => '视频id',
                        'vote_count' => '投票总数',
                        'teacher_link' => "teacher_link"
                    ],
                    [
                        'avatar' => 'http://img.gsxservice.com/959247_a9t8u72w.jpeg',
                        'preface' => 'http://img.gsxservice.com/959247_a9t8u72w.jpeg',
                        'teacher_name' => '老师称',
                        'title' => '视频title',
                        'video_url' => '视频id',
                        'vote_count' => '投票总数',
                        'teacher_link' => "teacher_link"
                    ],
                    [
                        'avatar' => 'http://img.gsxservice.com/959247_a9t8u72w.jpeg',
                        'preface' => 'http://img.gsxservice.com/959247_a9t8u72w.jpeg',
                        'teacher_name' => '老师称',
                        'title' => '视频title',
                        'video_url' => '视频id',
                        'vote_count' => '投票总数',
                        'teacher_link' => "teacher_link"
                    ],
                    [
                        'avatar' => 'http://img.gsxservice.com/959247_a9t8u72w.jpeg',
                        'preface' => 'http://img.gsxservice.com/959247_a9t8u72w.jpeg',
                        'teacher_name' => '老师称',
                        'title' => '视频title',
                        'video_url' => '视频id',
                        'vote_count' => '投票总数',
                        'teacher_link' => "teacher_link"
                    ],
                    [
                        'avatar' => 'http://img.gsxservice.com/959247_a9t8u72w.jpeg',
                        'preface' => 'http://img.gsxservice.com/959247_a9t8u72w.jpeg',
                        'teacher_name' => '老师称',
                        'title' => '视频title',
                        'video_url' => '视频id',
                        'vote_count' => '投票总数',
                        'teacher_link' => "teacher_link"
                    ],
                    [
                        'avatar' => 'http://img.gsxservice.com/959247_a9t8u72w.jpeg',
                        'preface' => 'http://img.gsxservice.com/959247_a9t8u72w.jpeg',
                        'teacher_name' => '老师称',
                        'title' => '视频title',
                        'video_url' => '视频id',
                        'vote_count' => '投票总数',
                        'teacher_link' => "teacher_link"
                    ]
                ),
                'more_url' => '全部url'
            )
        )
    )
);