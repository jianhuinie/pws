<?php

require("../../bootstrap.php");
render(
        "userCenter/teacherCenter/liveCourseList",
        array(
            "tpl_data" => array(
                "is_complete" => '2', // 所有班课信息是否完整
                "max_class_course" => 5, // 班课科目上限 5
                "subject_list" => array(
                    array(
                        "subject_id" => '121',
                        "count" => '3',
                        "path" => array(
                            "1" => array(
                                "id" => "387",
                                "name" => "艺术",
                                "level" => "1",
                                "subnodes" => "6",
                                "display_order" => "500",
                                "hidden" => "0",
                                "parent_id" => "0",
                                "remark_name" => "艺术",
                                "subject_type" => "0",
                                "verify_status" => "1",
                                "tag" => null
                            ),
                            "2" => array(
                                "id" => "388",
                                "name" => "画画",
                                "level" => "2",
                                "subnodes" => "4",
                                "display_order" => "1",
                                "hidden" => "0",
                                "parent_id" => "387",
                                "remark_name" => "艺术画画",
                                "subject_type" => "0",
                                "verify_status" => "1",
                                "tag" => null
                            ),
                            "3" => array(
                                "id" => "3891",
                                "name" => "水彩画",
                                "level" => "3",
                                "subnodes" => "0",
                                "display_order" => "1",
                                "hidden" => "0",
                                "parent_id" => "388",
                                "remark_name" => "水彩画别名",
                                "subject_type" => "0",
                                "verify_status" => "1",
                                "tag" => null
                            )
                        ),
                        "selected_subject" => array(
                            "path" => array(
                                "1" => array(
                                    "id" => "387",
                                    "name" => "\u5927\u5b66",
                                    "level" => "1",
                                    "subnodes" => "6",
                                    "display_order" => "500",
                                    "hidden" => "0",
                                    "parent_id" => "0",
                                    "remark_name" => "\u5927\u5b66",
                                    "subject_type" => "0",
                                    "verify_status" => "1",
                                    "tag" => null
                                ),
                                "2" => array(
                                    "id" => "388",
                                    "name" => "\u82f1\u8bed\u8003\u7ea7",
                                    "level" => "2",
                                    "subnodes" => "4",
                                    "display_order" => "1",
                                    "hidden" => "0",
                                    "parent_id" => "387",
                                    "remark_name" => "\u82f1\u8bed\u8003\u7ea7",
                                    "subject_type" => "0",
                                    "verify_status" => "1",
                                    "tag" => null
                                ),
                                "3" => array(
                                    "id" => "389",
                                    "name" => "\u56db\u7ea7",
                                    "level" => "3",
                                    "subnodes" => "0",
                                    "display_order" => "1",
                                    "hidden" => "0",
                                    "parent_id" => "388",
                                    "remark_name" => "\u56db\u7ea7",
                                    "subject_type" => "0",
                                    "verify_status" => "1",
                                    "tag" => null
                                )
                            ),
                            "course" => array(
                                array(
                                    "id" => "1",
                                    "number" => "141113475716",
                                    "user_id" => "987",
                                    "subject_id" => "389",
                                    "name" => "水彩画构图技巧",
                                    "lesson_way" => 4, // 2在线授课 4线下教学（学生上门）
                                    "create_time" => 1415836800000,
                                    "update_time" => 1415836800000,
                                    "begin_time" => 1415836800000,
                                    "end_time" => 1415750400000,
                                    "course_len" => "12000",
                                    "price" => "300",
                                    "is_complete" => 1, // 该课程信息是否完整
                                    "max_student" => "10",
                                    "now_students" => '10',
                                    "unpay_students" => '2',
                                    "introduction" => "有个介绍么？？",
                                    "province" => array( // 上课地点 - 单独填写
                                        "name" => "北京",
                                        "id" => 1
                                    ),
                                    "city" => array(
                                        "name" => "北京",
                                        "id" => 2
                                    ),
                                    "area" => array(
                                        "name" => "昌平区",
                                        "id" => 3
                                    ),
                                    "country" => array(
                                        "name" => "五道口",
                                        "id" => 4
                                    ),
                                    "address" => "生命科学园星巴克咖啡厅",
                                    "schedule" => null,
                                    "student_desc" => "零基础学员",
                                    "status" => "5", // 班课状态.1填写资料中,2 正在招生,3停止招生,4上课中,5班课结束,6班课删除
                                    "verify_status" => "0",
                                    "reason" => "0",
                                    "reason_text" => ""
                                ),
                                array(
                                    "id" => "2",
                                    "number" => "141113475716",
                                    "user_id" => "987",
                                    "subject_id" => "389",
                                    "name" => "水彩画构图技巧",
                                    "lesson_way" => 2, // 2在线授课 4线下教学（学生上门）
                                    "create_time" => 1415836800000,
                                    "update_time" => 1415836800000,
                                    "begin_time" => 1415836800000,
                                    "end_time" => 1415750400000,
                                    "course_len" => "12000",
                                    "price" => "300",
                                    "is_complete" => 1, // 该课程信息是否完整
                                    "max_student" => "10",
                                    "now_students" => '6',
                                    "unpay_students" => '2',
                                    "introduction" => "有个介绍么？？",
                                    "province" => array( // 上课地点 - 单独填写
                                        "name" => "北京",
                                        "id" => 1
                                    ),
                                    "city" => array(
                                        "name" => "北京周边",
                                        "id" => 2
                                    ),
                                    "area" => array(
                                        "name" => "五道口",
                                        "id" => 3
                                    ),
                                    "country" => array(
                                        "name" => "五道口",
                                        "id" => 4
                                    ),
                                    "address" => "生命科学园星巴克咖啡厅",
                                    "schedule" => null,
                                    "student_desc" => "零基础学员",
                                    "status" => "3", // 班课状态.1填写资料中,2 正在招生,3停止招生,4上课中,5班课结束,6课程结束
                                    "verify_status" => "0",
                                    "reason" => "0",
                                    "reason_text" => ""
                                )
                            )
                        )
                    ),
                    array(
                        "subject_id" => '122',
                        "count" => '3',
                        "path" => array(
                            "1" => array(
                                "id" => "387",
                                "name" => "艺术",
                                "level" => "1",
                                "subnodes" => "6",
                                "display_order" => "500",
                                "hidden" => "0",
                                "parent_id" => "0",
                                "remark_name" => "艺术",
                                "subject_type" => "0",
                                "verify_status" => "1",
                                "tag" => null
                            ),
                            "2" => array(
                                "id" => "388",
                                "name" => "音乐",
                                "level" => "2",
                                "subnodes" => "4",
                                "display_order" => "1",
                                "hidden" => "0",
                                "parent_id" => "387",
                                "remark_name" => "艺术音乐",
                                "subject_type" => "0",
                                "verify_status" => "1",
                                "tag" => null
                            ),
                            "3" => array(
                                "id" => "389",
                                "name" => "声乐",
                                "level" => "3",
                                "subnodes" => "0",
                                "display_order" => "1",
                                "hidden" => "0",
                                "parent_id" => "388",
                                "remark_name" => "声乐别名",
                                "subject_type" => "0",
                                "verify_status" => "1",
                                "tag" => null
                            )
                        ),
                        "selected_subject" => array(
                            "path" => array(
                                "1" => array(
                                    "id" => "387",
                                    "name" => "\u5927\u5b66",
                                    "level" => "1",
                                    "subnodes" => "6",
                                    "display_order" => "500",
                                    "hidden" => "0",
                                    "parent_id" => "0",
                                    "remark_name" => "\u5927\u5b66",
                                    "subject_type" => "0",
                                    "verify_status" => "1",
                                    "tag" => null
                                ),
                                "2" => array(
                                    "id" => "388",
                                    "name" => "\u82f1\u8bed\u8003\u7ea7",
                                    "level" => "2",
                                    "subnodes" => "4",
                                    "display_order" => "1",
                                    "hidden" => "0",
                                    "parent_id" => "387",
                                    "remark_name" => "\u82f1\u8bed\u8003\u7ea7",
                                    "subject_type" => "0",
                                    "verify_status" => "1",
                                    "tag" => null
                                ),
                                "3" => array(
                                    "id" => "389",
                                    "name" => "\u56db\u7ea7",
                                    "level" => "3",
                                    "subnodes" => "0",
                                    "display_order" => "1",
                                    "hidden" => "0",
                                    "parent_id" => "388",
                                    "remark_name" => "\u56db\u7ea7",
                                    "subject_type" => "0",
                                    "verify_status" => "1",
                                    "tag" => null
                                )
                            ),
                            "course" => array(
                                array(
                                    "id" => "1",
                                    "number" => "141113475716",
                                    "user_id" => "987",
                                    "subject_id" => "389",
                                    "name" => "水彩画构图技巧",
                                    "lesson_way" => 2, // 2在线授课 4线下教学（学生上门）
                                    "create_time" => 1415836800000,
                                    "update_time" => 1415836800000,
                                    "begin_time" => 1415836800000,
                                    "end_time" => 1415750400000,
                                    "course_len" => "12000",
                                    "price" => "300",
                                    "is_complete" => 1, // 该课程信息是否完整
                                    "max_student" => "10",
                                    "now_students" => '6',
                                    "unpay_students" => '2',
                                    "introduction" => "有个介绍么？？",
                                    "province" => array( // 上课地点 - 单独填写
                                        "name" => "北京",
                                        "id" => 1
                                    ),
                                    "city" => array(
                                        "name" => "北京周边",
                                        "id" => 2
                                    ),
                                    "area" => array(
                                        "name" => "五道口",
                                        "id" => 3
                                    ),
                                    "country" => array(
                                        "name" => "五道口",
                                        "id" => 4
                                    ),
                                    "address" => "生命科学园星巴克咖啡厅",
                                    "schedule" => null,
                                    "student_desc" => "零基础学员",
                                    "status" => "3", // 班课状态.1填写资料中,2 正在招生,3停止招生,4上课中,5班课结束,6课程结束
                                    "verify_status" => "0",
                                    "reason" => "0",
                                    "reason_text" => ""
                                ),
                                array(
                                    "id" => "2",
                                    "number" => "141113475716",
                                    "user_id" => "987",
                                    "subject_id" => "389",
                                    "name" => "水彩画构图技巧",
                                    "lesson_way" => 2, // 2在线授课 4线下教学（学生上门）
                                    "create_time" => 1415836800000,
                                    "update_time" => 1415836800000,
                                    "begin_time" => 1415836800000,
                                    "end_time" => 1415750400000,
                                    "course_len" => "12000",
                                    "price" => "300",
                                    "is_complete" => 1, // 该课程信息是否完整
                                    "max_student" => "10",
                                    "now_students" => '6',
                                    "unpay_students" => '2',
                                    "introduction" => "有个介绍么？？",
                                    "province" => array( // 上课地点 - 单独填写
                                        "name" => "北京",
                                        "id" => 1
                                    ),
                                    "city" => array(
                                        "name" => "北京周边",
                                        "id" => 2
                                    ),
                                    "area" => array(
                                        "name" => "五道口",
                                        "id" => 3
                                    ),
                                    "country" => array(
                                        "name" => "五道口",
                                        "id" => 4
                                    ),
                                    "address" => "生命科学园星巴克咖啡厅",
                                    "schedule" => null,
                                    "student_desc" => "零基础学员",
                                    "status" => "3", // 班课状态.1填写资料中,2 正在招生,3停止招生,4上课中,5班课结束,6课程结束
                                    "verify_status" => "0",
                                    "reason" => "0",
                                    "reason_text" => ""
                                )
                            )
                        )
                    )
                ),
                "class_course_count" => 6,
                "search_status" => array(
                    '1' => '待编辑完整',
                    '2' => '待提交审核',
                    '3' => '正在招生',
                    '7' => '已完成',
                    '11' => '无人报名'
                )
            )
        )
);