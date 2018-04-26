<?php

require("../bootstrap.php");

render(
    "teacher_center/courseList",
    array(
        "tpl_data" => array(
            "is_huike_teacher" => 1, // 是否是汇课间老师
            "course_quota" => 10, // 最大课程数目
            "is_complete" => true, // 班课资料是否完整
            "course_list" => array(
                array(
                    "id" => 123,
                    "name" => "口语",
                    "lesson_way" => 1, // 1协商地点 2在线授课 4学生上门 8老师上门
                    "verify_status" => 1, // 0审核中 1通过 2未通过
                    "display_total_count" => 2046, // 已授课时
                    "price_max" => 99,
                    "price_min" => 9.9,
                    "roster_url" => '',
                    "reasons" => array(
                        "未通过原因一：人傻未通过原因三：速来未通过原因三：速来未通过原因三：速来",
                        "未通过原因二：钱多未通过原因三：速来未通过原因三：速来",
                        "未通过原因三：速来未通过原因三：速来"
                    ),
                    "total_pay" => 10
                ),
                array(
                    "id" => 123,
                    "name" => "口语",
                    "lesson_way" => 3, // 1协商地点 2在线授课 4学生上门 8老师上门
                    "verify_status" => 2, // 0审核中 1通过 2未通过
                    "display_total_count" => 2046, // 已授课时
                    "price_max" => 99,
                    "price_min" => 9.9,
                    "roster_url" => '',
                    "reasons" => array(
                        "未通过原因一：人傻未通过原因三：速来未通过原因三：速来未通过原因三：速来",
                        "未通过原因二：钱多未通过原因三：速来未通过原因三：速来",
                        "未通过原因三：速来未通过原因三：速来"
                    ),
                    "total_pay" => 10
                ),
                array(
                    "id" => 123,
                    "name" => "口语",
                    "lesson_way" => 7, // 1协商地点 2在线授课 4学生上门 8老师上门
                    "verify_status" => 2, // 0审核中 1通过 2未通过
                    "display_total_count" => 2046, // 已授课时
                    "price_max" => 99,
                    "price_min" => 9.9,
                    "roster_url" => '',
                    "reasons" => array(
                        "未通过原因一：人傻未通过原因三：速来未通过原因三：速来未通过原因三：速来",
                        "未通过原因二：钱多未通过原因三：速来未通过原因三：速来",
                        "未通过原因三：速来未通过原因三：速来"
                    ),
                    "total_pay" => 0
                ),
                array(
                    "id" => 123,
                    "name" => "口语",
                    "lesson_way" => 15, // 1协商地点 2在线授课 4学生上门 8老师上门
                    "verify_status" => 0, // 0审核中 1通过 2未通过
                    "display_total_count" => 2046, // 已授课时
                    "price_max" => 99,
                    "price_min" => 9.9,
                    "roster_url" => '',
                    "reasons" => array(
                        "未通过原因一：人傻未通过原因三：速来未通过原因三：速来未通过原因三：速来",
                        "未通过原因二：钱多未通过原因三：速来未通过原因三：速来",
                        "未通过原因三：速来未通过原因三：速来"
                    ),
                    "total_pay" => 10
                ),
                array(
                    "id" => 123,
                    "name" => "口语",
                    "lesson_way" => 15, // 1协商地点 2在线授课 4学生上门 8老师上门
                    "verify_status" => 0, // 0审核中 1通过 2未通过
                    "display_total_count" => 2046, // 已授课时
                    "price_max" => 99,
                    "price_min" => 9.9,
                    "roster_url" => '',
                    "reasons" => array(
                        "未通过原因一：人傻未通过原因三：速来未通过原因三：速来未通过原因三：速来",
                        "未通过原因二：钱多未通过原因三：速来未通过原因三：速来",
                        "未通过原因三：速来未通过原因三：速来"
                    ),
                    "total_pay" => 10
                ),
                array(
                    "id" => 123,
                    "name" => "口语",
                    "lesson_way" => 1, // 1协商地点 2在线授课 4学生上门 8老师上门
                    "verify_status" => 1, // 0审核中 1通过 2未通过
                    "display_total_count" => 2046, // 已授课时
                    "price_max" => 99,
                    "price_min" => 9.9,
                    "roster_url" => '',
                    "reasons" => array(
                        "未通过原因一：人傻未通过原因三：速来未通过原因三：速来未通过原因三：速来",
                        "未通过原因二：钱多未通过原因三：速来未通过原因三：速来",
                        "未通过原因三：速来未通过原因三：速来"
                    ),
                    "total_pay" => 10
                ),
                array(
                    "id" => 123,
                    "name" => "口语",
                    "lesson_way" => 3, // 1协商地点 2在线授课 4学生上门 8老师上门
                    "verify_status" => 2, // 0审核中 1通过 2未通过
                    "display_total_count" => 2046, // 已授课时
                    "price_max" => 99,
                    "price_min" => 9.9,
                    "roster_url" => '',
                    "reasons" => array(
                        "未通过原因一：人傻未通过原因三：速来未通过原因三：速来未通过原因三：速来",
                        "未通过原因二：钱多未通过原因三：速来未通过原因三：速来",
                        "未通过原因三：速来未通过原因三：速来"
                    ),
                    "total_pay" => 10
                ),
                array(
                    "id" => 123,
                    "name" => "口语",
                    "lesson_way" => 7, // 1协商地点 2在线授课 4学生上门 8老师上门
                    "verify_status" => 2, // 0审核中 1通过 2未通过
                    "display_total_count" => 2046, // 已授课时
                    "price_max" => 99,
                    "price_min" => 9.9,
                    "roster_url" => '',
                    "reasons" => array(
                        "未通过原因一：人傻未通过原因三：速来未通过原因三：速来未通过原因三：速来",
                        "未通过原因二：钱多未通过原因三：速来未通过原因三：速来",
                        "未通过原因三：速来未通过原因三：速来"
                    ),
                    "total_pay" => 0
                ),
                array(
                    "id" => 123,
                    "name" => "口语",
                    "lesson_way" => 15, // 1协商地点 2在线授课 4学生上门 8老师上门
                    "verify_status" => 0, // 0审核中 1通过 2未通过
                    "display_total_count" => 2046, // 已授课时
                    "price_max" => 99,
                    "price_min" => 9.9,
                    "roster_url" => '',
                    "reasons" => array(
                        "未通过原因一：人傻未通过原因三：速来未通过原因三：速来未通过原因三：速来",
                        "未通过原因二：钱多未通过原因三：速来未通过原因三：速来",
                        "未通过原因三：速来未通过原因三：速来"
                    ),
                    "total_pay" => 10
                )
            ),
            "has_roster" => false
        )
    )
);

