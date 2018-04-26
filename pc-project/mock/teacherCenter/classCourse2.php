<?php

// 添加班课
if (true) {

    require("../bootstrap.php");
    render(
        "teacher_center/classCourse/add",
        array(
            "tpl_data" => array(
                "is_complete" => 2, // 资料完整度
                "display_status" => '1', // 班课状态
                "verify_status" => '0', // 班课审核状态
                "user_address_id" => null,
                "address_list" => null,
                "bs_switch" => 1,
                "address_list11" => array(
                    "1231"  => array(
                        "id" => 1231,
                        "status" => 1, // 0默认 1常用地址 9删除
                        "regular_address" => array( // 常用教学地点
                            "location_addr" => "西二旗软件园孵化器2号楼"
                        )
                    ),
                    "1232"  => array(
                        "id" => 1232,
                        "status" => 0, // 0默认 1常用地址 9删除
                        "regular_address" => array(
                            "location_addr" => "西二旗软件园孵化器2号楼"
                        )
                    ),
                    "1233"  => array(
                        "id" => 1233,
                        "status" => 0, // 0默认 1常用地址 9删除
                        "regular_address" => array(
                            "location_addr" => "西二旗软件园孵化器2号楼"
                        )
                    ),
                    "1234"  => array(
                        "id" => 1233,
                        "status" => 0, // 0默认 1常用地址 9删除
                        "regular_address" => array(
                            "location_addr" => "西二旗软件园孵化器2号楼"
                        )
                    ),
                    "1235"  => array(
                        "id" => 1233,
                        "status" => 0, // 0默认 1常用地址 9删除
                        "regular_address" => array(
                            "location_addr" => "西二旗软件园孵化器2号楼"
                        )
                    ),
                    "1236"  => array(
                        "id" => 1233,
                        "status" => 0, // 0默认 1常用地址 9删除
                        "regular_address" => array(
                            "location_addr" => "西二旗软件园孵化器2号楼"
                        )
                    )
                ),
                "subject_list" => array( // 已有科目列表
                    array(
                        "id" => 111, // 科目id
                        "name" => '一年级数学' // 科目别名
                    ),
                    array(
                        "id" => 222,
                        "name" => '二年级数学'
                    ),
                    array(
                        "id" => 333,
                        "name" => '三年级数学'
                    )
                ),
                "organization" => array( // 机构信息
                    "is_organization" => true,
                    "teacher_list" => array(
                        array(
                            "number" => 1234567890,
                            "display_name" => '小王老师'
                        ),
                        array(
                            "number" => 123456789,
                            "display_name" => '大王老师'
                        )
                    )
                ),
                "selected_subject" => array(
                    "path" => null
                )
            )
        )
    );

}

// 编辑某班课信息
else if (isset($_GET['type']) && $_GET['type'] == 'edit' && isset($_GET['number'])) {

    require("../bootstrap.php");
    render(
        "teacher_center/classCourse",
        array(
            "tpl_data" => array(
                "max_class_course" => 10,
                "number" => '141113475716',
                "user_number" => "12388276262",
                "total_pay" => 0,
                "arrangement" => "这个是课程安排这个是课程安排这个是课程安排这个是课程安排这个是课程安排这个是课程安排",
                "retire_flag" => 1,
                "retire_length" => 1,
                "chaban_flag" => 3, //1 不可插班 2 节课前可插班 3 随时插班
                "chaban_price" => "12.01",
                "chaban_quota" => null,
                "chaban_price_flag" => 2,
                "begin_time" => 1427807400,

                "subject_id" => 1,
                "name" => "这里是课程标题",
                "price" => "1",
                "original_price" => "0.00",
                "max_student" => "10",
                "min_student" => "10",
                "student_desc" => "这里是适学人群",
                "target" => "这里是教学目标",
                "lesson_way" => 4, //4:线下 2:线上
                "use_regular_addr" => 2, // 1地址薄 2新地址
                "mobile_visible" => 1,
                "user_address_id" => "1232",
                "address" => "锡林郭勒",
                "class_type" => 1,
                "bs_switch" => 1,
                "location" => "123123",
                "address_list" => array(
                    "1"  => array(
                        "id" => 1231,
                        "status" => 1, // 0默认 1常用地址 9删除
                        "regular_address" => array( // 常用教学地点
                            "location_addr" => "西二旗软件园孵化器2号楼"
                        )
                    ),
                    "2"  => array(
                        "id" => 1232,
                        "status" => 0, // 0默认 1常用地址 9删除
                        "regular_address" => array(
                            "location_addr" => "西二旗软件园孵化器2号楼"
                        )
                    ),
                    "3"  => array(
                        "id" => 1233,
                        "status" => 0, // 0默认 1常用地址 9删除
                        "regular_address" => array(
                            "location_addr" => "西二旗软件园孵化器2号楼"
                        )
                    ),
                    "4"  => array(
                        "id" => 1231,
                        "status" => 1, // 0默认 1常用地址 9删除
                        "regular_address" => array( // 常用教学地点
                            "location_addr" => "西二旗软件园孵化器2号楼"
                        )
                    ),
                    "5"  => array(
                        "id" => 1232,
                        "status" => 0, // 0默认 1常用地址 9删除
                        "regular_address" => array(
                            "location_addr" => "西二旗软件园孵化器2号楼"
                        )
                    ),
                    "6"  => array(
                        "id" => 1233,
                        "status" => 0, // 0默认 1常用地址 9删除
                        "regular_address" => array(
                            "location_addr" => "西二旗软件园孵化器2号楼"
                        )
                    ),
                    "7"  => array(
                        "id" => 1231,
                        "status" => 1, // 0默认 1常用地址 9删除
                        "regular_address" => array( // 常用教学地点
                            "location_addr" => "西二旗软件园孵化器2号楼"
                        )
                    ),
                    "8"  => array(
                        "id" => 1232,
                        "status" => 0, // 0默认 1常用地址 9删除
                        "regular_address" => array(
                            "location_addr" => "西二旗软件园孵化器2号楼"
                        )
                    ),
                    "9"  => array(
                        "id" => 1233,
                        "status" => 0, // 0默认 1常用地址 9删除
                        "regular_address" => array(
                            "location_addr" => "西二旗软件园孵化器2号楼"
                        )
                    )
                ),
                "selected_subject" => array( // 该科目信息
                        "path" => array(
                            "1" => array(
                                "id" => "976",
                                "name" => "艺术",
                                "level" => "1",
                                "subnodes" => "3",
                                "display_order" => "491",
                                "hidden" => "0",
                                "parent_id" => "0",
                                "remark_name" => "艺术",
                                "subject_type" => "0",
                                "verify_status" => "1",
                                "tag" => null
                            ),
                            "2" => array(
                                "id" => "976",
                                "name" => "书法",
                                "level" => "2",
                                "subnodes" => "4",
                                "display_order" => "1",
                                "hidden" => "0",
                                "parent_id" => "1",
                                "remark_name" => "艺术书法",
                                "subject_type" => "0",
                                "verify_status" => "1",
                                "tag" => null
                            ),
                            "3" => array(
                                "id" => "976",
                                "name" => "软笔",
                                "level" => "3",
                                "subnodes" => "0",
                                "display_order" => "1",
                                "hidden" => "0",
                                "parent_id" => "15",
                                "remark_name" => "软笔书法",
                                "subject_type" => "0",
                                "verify_status" => "1",
                                "tag" => null
                            )
                        ),
                        "course" => array()
                ),
                "address_area" => array( // 新地址
                        "province" => array(
                            "id" => "16777216",
                            "name" => "河北",
                            "display_order" => "1000",
                            "level" => "1",
                            "hidden" => "0"
                        ),
                        "city" => array(
                            "id" => "17039360",
                            "name" => "石家庄",
                            "display_order" => "0",
                            "level" => "2",
                            "hidden" => "0"
                        ),
                        "area" => array(
                            "id" => "17041408",
                            "name" => "正定",
                            "display_order" => "14",
                            "level" => "3",
                            "hidden" => "0"
                        ),
                        "country" => array(
                        ),
                        'full_address' => '中关村软件园孵化器2号楼2308',
                        "location_addr" => "中关村软件园孵化器2号楼2308"
                ),
                "photos" => array(
                    array(
                        "id" => "1",
                        "title" => "封禁",
                        "url" => "http://test-img.gsxservice.com/355595_6waad3zz.jpeg",
                        "width" => "400",
                        "height" => "225",
                        "create_time" => 1415959198
                    ),
                    array(
                        "id" => "2",
                        "title" => "封禁啊",
                        "url" => "http://test-img.gsxservice.com/336276_1xi4vt2k.jpeg",
                        "width" => "293",
                        "height" => "220",
                        "create_time" => 1415959198
                    ),
                    array(
                        "id" => "1",
                        "title" => "封禁",
                        "url" => "http://test-img.gsxservice.com/355595_6waad3zz.jpeg",
                        "width" => "400",
                        "height" => "225",
                        "create_time" => 1415959198
                    ),
                    array(
                        "id" => "2",
                        "title" => "封禁啊",
                        "url" => "http://test-img.gsxservice.com/336276_1xi4vt2k.jpeg",
                        "width" => "293",
                        "height" => "220",
                        "create_time" => 1415959198
                    ),
                    array(
                        "id" => "1",
                        "title" => "封禁",
                        "url" => "http://test-img.gsxservice.com/355595_6waad3zz.jpeg",
                        "width" => "400",
                        "height" => "225",
                        "create_time" => 1415959198
                    ),
                    array(
                        "id" => "2",
                        "title" => "封禁啊",
                        "url" => "http://test-img.gsxservice.com/336276_1xi4vt2k.jpeg",
                        "width" => "293",
                        "height" => "220",
                        "create_time" => 1415959198
                    )
                ),
                "introduction" => "课程简介",
                "schedule" => array( // 教学计划
                    array(
                        'id' => 13,
                        'user_id' => 987,
                        'class_course_number' => 141118541248,
                        'content' => '从前有座山，山上有座庙',
                        'begin_time' => 1437444000,
                        'end_time' => 1437447600,
                        'teacher' => array(
                            'number' => 123456789,
                            'display_name' => '小王老师'
                        )
                    )
                ),
                "organization" => array( // 机构信息
                    "is_organization" => true,
                    "last_teacher" => array(
                        "number" => 123456789,
                        "display_name" => '大王老师'
                    ),
                    "teacher_list" => array(
                        array(
                            "number" => 1234567890,
                            "display_name" => '小王老师',
                            "realname" => "小王老师"
                        ),
                        array(
                            "number" => 12388276262,
                            "display_name" => '大王老师',
                            "realname" => "大王老师"
                        )
                    )
                ),
                "is_complete" => '1', // 信息是否完整，1为true，2为false
                "display_status" => '6',
                "verify_status" => '0', //0 审核中或未提交审核 1 审核成功 2 审核失败
                "reason_list" => array( // 未通过审核原因
                    "basic" => array(
                        '这里有一个错误',
                        '又一个错误'
                    ),
                    "photo" => array(),
                    "introduction" => array(),
                    "schedule" => array()
                )
            )
        )
    );

}
