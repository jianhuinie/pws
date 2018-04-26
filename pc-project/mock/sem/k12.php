<?php

require('../bootstrap.php');

render(
    'sem/k12',
    array(
        'tpl_data' => array(
            "pager" => array(
                "count" => 1221,
                "page" => 3,
                "page_size" => 10
            ),
            "current_city" => array(
                "name" => "石家庄",
                "id" => 123
            ),
            "banner" => array(
                array(
                    "hover" => "重新定义好老师，智能精准匹配",
                    "material" => "http://img.gsxservice.com/0cms/d/file/content/2015/08/55d2f4c07f15a.jpg"
                ),
                array(
                    "hover" => "25万实名认证老师，相当于千家机构之和",
                    "material" => "http://img.gsxservice.com/0cms/d/file/content/2015/08/55d6c7ad026d6.jpg"
                ),
                array(
                    "hover" => "不满意课程，平台随时退费",
                    "material" => "http://img.gsxservice.com/0cms/d/file/content/2015/08/55d2f4c0edaa2.jpg"
                ),
                array(
                    "hover" => "迄今为止，最自由的上课方式",
                    "material" => "http://img.gsxservice.com/0cms/d/file/content/2015/08/55d2f4c121933.jpg"
                )
            ),
            "ticket" => array(
                // 优惠券，这期木有
            ),
            "juhuixue" => array(
                "options" => array(
                    "course_1" => array(
                        array (
                            "id" => 123,
                            "name" => "aaa",
                            "selected" => 1
                        ),
                        array (
                            "id" => 124,
                            "name" => "bbb",
                            "selected" => 0
                        )
                    ),
                    "course_2" => array(
                        array (
                            "id" => 123,
                            "name" => "aaa",
                            "selected" => 0
                        ),
                        array (
                            "id" => 124,
                            "name" => "bbb",
                            "selected" => 1
                        )
                    ),
                    "area" => array(
                        array (
                            "id" => 123,
                            "name" => "aaa",
                            "selected" => 1
                        ),
                        array (
                            "id" => 124,
                            "name"=> "bbb",
                            "selected" => 0
                        )
                    )
                ),
                "data" => array(
                    array (
                        "number" => "234",        // 课程number
                        "name" => "高一升高二物理衔接课高一升高二物理衔接课",          // 课程名称
                        "photo_url" => "http://img.gsxservice.com/0cms/d/file/content/2015/04/5523603f09fa6.jpg",    // 课程图片
                        "price" => "123.22",       // 价格
                        "total_pay" => 15,         // 已报名人数
                        "teacher_number" => 123,  // 主讲老师number
                        "teacher_name" => "aaa",  // 主讲老师名字
                        "school_age" => 12,       // 主讲老师教龄
                        "comment_count" => 32,    // 课程评论数
                        "student_desc" => "适应人群适应人群适应人群适应人群适应人群适应人群适应人群",   // 适应人群
                        "teach_time" => 123,      // 课程长度
                        "certification" => 1 // ,2,3
                    ),
                    array (
                        "number" => "234",        // 课程number
                        "name" => "xxx",          // 课程名称
                        "photo_url" => "http://img.gsxservice.com/0cms/d/file/content/2015/04/5523603f09fa6.jpg",    // 课程图片
                        "price" => "123.22",       // 价格
                        "total_pay" => 15,         // 已报名人数
                        "teacher_number" => 123,  // 主讲老师number
                        "teacher_name" => "aaa",  // 主讲老师名字
                        "school_age" => 12,       // 主讲老师教龄
                        "comment_count" => 32,    // 课程评论数
                        "student_desc" => "xx",   // 适应人群
                        "teach_time" => 123,      // 课程长度
                        "certification" => 1 // ,2,3
                    ),
                    array (
                        "number" => "234",        // 课程number
                        "name" => "xxx",          // 课程名称
                        "photo_url" => "http://img.gsxservice.com/0cms/d/file/content/2015/04/5523603f09fa6.jpg",    // 课程图片
                        "price" => "123.22",       // 价格
                        "total_pay" => 15,         // 已报名人数
                        "teacher_number" => 123,  // 主讲老师number
                        "teacher_name" => "aaa",  // 主讲老师名字
                        "school_age" => 12,       // 主讲老师教龄
                        "comment_count" => 32,    // 课程评论数
                        "student_desc" => "xx",   // 适应人群
                        "teach_time" => 123,      // 课程长度
                        "certification" => 1 // ,2,3
                    ),
                    array (
                        "number" => "234",        // 课程number
                        "name" => "xxx",          // 课程名称
                        "photo_url" => "http://img.gsxservice.com/0cms/d/file/content/2015/04/5523603f09fa6.jpg",    // 课程图片
                        "price" => "123.22",       // 价格
                        "total_pay" => 15,         // 已报名人数
                        "teacher_number" => 123,  // 主讲老师number
                        "teacher_name" => "aaa",  // 主讲老师名字
                        "school_age" => 12,       // 主讲老师教龄
                        "comment_count" => 32,    // 课程评论数
                        "student_desc" => "xx",   // 适应人群
                        "teach_time" => 123,      // 课程长度
                        "certification" => 1 // ,2,3
                    )
                )
            ),
            "course" => array(
                "middle" => array(
                    "options" => array(
                        "course_1" => array(
                            array (
                                "id" => 123,
                                "name" => "aaa",
                                "selected" => 0
                            ),
                            array (
                                "id" => 124,
                                "name" => "bbb",
                                "selected" => 0
                            )
                        ),
                        "course_2" => array(
                            array (
                                "id" => 123,
                                "name" => "aaa",
                                "selected" => 0
                            ),
                            array (
                                "id" => 124,
                                "name" => "bbb",
                                "selected" => 1
                            )
                        ),
                        "area" => array(
                            array (
                                "id" => 123,
                                "name" => "aaa",
                                "selected" => 1
                            ),
                            array (
                                "id" => 124,
                                "name" => "bbb",
                                "selected" => 0
                            )
                        )
                    ),
                    "data" => array(
                        array (
                            "number" => "234",        // 课程number
                            "name" => "初中，中考",          // 课程名称
                            "photo_url" => "http://img.gsxservice.com/0cms/d/file/content/2015/04/5523603f09fa6.jpg",    // 课程图片
                            "price" => "123.22",       // 价格
                            "total_pay" => 15,         // 已报名人数
                            "teacher_number" => 123,  // 主讲老师number
                            "teacher_name" => "aaa",  // 主讲老师名字
                            "school_age" => 12,       // 主讲老师教龄
                            "comment_count" => 32,    // 课程评论数
                            "teach_time" => 10,       // 课程时长
                            "student_desc" => "xx",   // 适应人群
                        ),
                        array (
                            "number" => "234",        // 课程number
                            "name" => "初中中考",          // 课程名称
                            "photo_url" => "xx.xx",    // 课程图片
                            "price" => "123.22",       // 价格
                            "total_pay" => 15,         // 已报名人数
                            "teacher_number" => 123,  // 主讲老师number
                            "teacher_name" => "aaa",  // 主讲老师名字
                            "school_age" => 12,       // 主讲老师教龄
                            "comment_count" => 32,    // 课程评论数
                            "teach_time" => 10,       // 课程时长
                            "student_desc" => "xx",   // 适应人群
                        ),
                        array (
                            "number" => "234",        // 课程number
                            "name" => "初中，中考",          // 课程名称
                            "photo_url" => "http://img.gsxservice.com/0cms/d/file/content/2015/04/5523603f09fa6.jpg",    // 课程图片
                            "price" => "123.22",       // 价格
                            "total_pay" => 15,         // 已报名人数
                            "teacher_number" => 123,  // 主讲老师number
                            "teacher_name" => "aaa",  // 主讲老师名字
                            "school_age" => 12,       // 主讲老师教龄
                            "comment_count" => 32,    // 课程评论数
                            "teach_time" => 10,       // 课程时长
                            "student_desc" => "xx",   // 适应人群
                        ),
                        array (
                            "number" => "234",        // 课程number
                            "name" => "初中中考",          // 课程名称
                            "photo_url" => "xx.xx",    // 课程图片
                            "price" => "123.22",       // 价格
                            "total_pay" => 15,         // 已报名人数
                            "teacher_number" => 123,  // 主讲老师number
                            "teacher_name" => "aaa",  // 主讲老师名字
                            "school_age" => 12,       // 主讲老师教龄
                            "comment_count" => 32,    // 课程评论数
                            "teach_time" => 10,       // 课程时长
                            "student_desc" => "xx",   // 适应人群
                        )
                    )
                ),
                "high" => array(
                    "options" => array(
                        "course_1" => array(
                            array (
                                "id" => 123,
                                "name" => "aaa",
                                "selected" => 0
                            ),
                            array (
                                "id" => 124,
                                "name" => "bbb",
                                "selected" => 0
                            )
                        ),
                        "course_2" => array(
                            array (
                                "id" => 123,
                                "name" => "aaa",
                                "selected" => 0
                            ),
                            array (
                                "id" => 124,
                                "name" => "bbb",
                                "selected" => 1
                            )
                        ),
                        "area" => array(
                            array (
                                "id" => 123,
                                "name" => "aaa",
                                "selected" => 1
                            ),
                            array (
                                "id" => 124,
                                "name" => "bbb",
                                "selected" => 0
                            )
                        )
                    ),
                    "data" => array(
                        array (
                            "number" => "234",        // 课程number
                            "name" => "高中、高考",          // 课程名称
                            "photo_url" => "xx.xx",    // 课程图片
                            "price" => "123.22",       // 价格
                            "total_pay" => 15,         // 已报名人数
                            "teacher_number" => 123,  // 主讲老师number
                            "teacher_name" => "aaa",  // 主讲老师名字
                            "school_age" => 12,       // 主讲老师教龄
                            "comment_count" => 32,    // 课程评论数
                            "teach_time" => 10,       // 课程时长
                            "student_desc" => "xx",   // 适应人群
                        ),
                        array (
                            "number" => "234",        // 课程number
                            "name" => "高中高考",          // 课程名称
                            "photo_url" => "xx.xx",    // 课程图片
                            "price" => "123.22",       // 价格
                            "total_pay" => 15,         // 已报名人数
                            "teacher_number" => 123,  // 主讲老师number
                            "teacher_name" => "aaa",  // 主讲老师名字
                            "school_age" => 12,       // 主讲老师教龄
                            "comment_count" => 32,    // 课程评论数
                            "teach_time" => 10,       // 课程时长
                            "student_desc" => "xx",   // 适应人群
                        )
                    )
                )
            ),
            "teacher" => array(
                "middle" => array(
                    "options" => array(
                        "course_1" => array(
                            array (
                                "id" => 123,
                                "name" => "aaa",
                                "selected" => 0
                            ),
                            array (
                                "id" => 124,
                                "name" => "bbb",
                                "selected" => 0
                            )
                        ),
                        "course_2" => array(
                            array (
                                "id" => 123,
                                "name" => "aaa",
                                "selected" => 0
                            ),
                            array (
                                "id" => 124,
                                "name" => "bbb",
                                "selected" => 1
                            )
                        ),
                        "area" => array(
                            array (
                                "id" => 123,
                                "name" => "aaa",
                                "selected" => 0
                            ),
                            array (
                                "id" => 124,
                                "name" => "bbb",
                                "selected" => 1
                            )
                        )
                    ),
                    "data" => array(
                        array (
                            "number" => "234",        // 老师number
                            "name" => "小王老师",          // 老师名字
                            "avatar" => "http://img.gsxservice.com/0cms/d/file/content/2015/04/5523603f09fa6.jpg",      // 老师头像
                            "domain" => "123.22",     // 老师私有域名
                            "student_count" => 15,    // 学生数
                            "class_count" => 123,     // 班课数量
                            "certification" => "1, 2,6", // 认证
                            "school_age" => 12,       // 主讲老师教龄
                            "courses" => "aaabbb",   // 教授科目
                            "teach_time" => 400,     // 教学时长
                            "favor_percent" => 1.0,  // 好评率
                            "is_recommand" => true   // 推荐老师
                        ),
                        array (
                            "number" => "234",        // 老师number
                            "name" => "中考",          // 老师名字
                            "avatar" => "xx.xx",      // 老师头像
                            "domain" => "123.22",     // 老师私有域名
                            "student_count" => 15,    // 学生数
                            "class_count" => 123,     // 班课数量
                            "certification" => "aaa", // 认证
                            "school_age" => 12,       // 主讲老师教龄
                            "courses" => "aaabbb",   // 教授科目
                            "teach_time" => 400,     // 教学时长
                            "favor_percent" => 1.0,  // 好评率
                            "is_recommand" => true   // 推荐老师
                        ),
                        array (
                            "number" => "234",        // 老师number
                            "name" => "初中",          // 老师名字
                            "avatar" => "http://img.gsxservice.com/0cms/d/file/content/2015/04/5523603f09fa6.jpg",      // 老师头像
                            "domain" => "123.22",     // 老师私有域名
                            "student_count" => 15,    // 学生数
                            "class_count" => 123,     // 班课数量
                            "certification" => "aaa", // 认证
                            "school_age" => 12,       // 主讲老师教龄
                            "courses" => "aaabbb",   // 教授科目
                            "teach_time" => 400,     // 教学时长
                            "favor_percent" => 1.0,  // 好评率
                            "is_recommand" => true   // 推荐老师
                        ),
                        array (
                            "number" => "234",        // 老师number
                            "name" => "中考",          // 老师名字
                            "avatar" => "xx.xx",      // 老师头像
                            "domain" => "123.22",     // 老师私有域名
                            "student_count" => 15,    // 学生数
                            "class_count" => 123,     // 班课数量
                            "certification" => "aaa", // 认证
                            "school_age" => 12,       // 主讲老师教龄
                            "courses" => "aaabbb",   // 教授科目
                            "teach_time" => 400,     // 教学时长
                            "favor_percent" => 1.0,  // 好评率
                            "is_recommand" => true   // 推荐老师
                        ),
                        array (
                            "number" => "234",        // 老师number
                            "name" => "中考",          // 老师名字
                            "avatar" => "http://img.gsxservice.com/0cms/d/file/content/2015/04/5523603f09fa6.jpg",  // 老师头像
                            "domain" => "123.22",     // 老师私有域名
                            "student_count" => 15,    // 学生数
                            "class_count" => 123,     // 班课数量
                            "certification" => "aaa", // 认证
                            "school_age" => 12,       // 主讲老师教龄
                            "courses" => "aaabbb",   // 教授科目
                            "teach_time" => 400,     // 教学时长
                            "favor_percent" => 1.0,  // 好评率
                            "is_recommand" => true   // 推荐老师
                        )
                    )
                ),
                "high" => array(
                    "options" => array(
                        "course_1" => array(
                            array (
                                "id" => 123,
                                "name" => "aaa",
                                "selected" => 0
                            ),
                            array (
                                "id" => 124,
                                "name" => "bbb",
                                "selected" => 0
                            )
                        ),
                        "course_2" => array(
                            array (
                                "id" => 123,
                                "name" => "aaa",
                                "selected" => 0
                            ),
                            array (
                                "id" => 124,
                                "name" => "bbb",
                                "selected" => 1
                            )
                        ),
                        "area" => array(
                            array (
                                "id" => 123,
                                "name" => "aaa",
                                "selected" => 1
                            ),
                            array (
                                "id" => 124,
                                "name" => "bbb",
                                "selected" => 0
                            )
                        )
                    ),
                    "data" => array(
                        array (
                            "number" => "234",        // 老师number
                            "name" => "高中",          // 老师名字
                            "avatar" => "xx.xx",      // 老师头像
                            "domain" => "123.22",     // 老师私有域名
                            "student_count" => 15,    // 学生数
                            "class_count" => 123,     // 班课数量
                            "certification" => "aaa", // 认证
                            "school_age" => 12,       // 主讲老师教龄
                            "courses" => "aaabbb",   // 教授科目
                            "teach_time" => 400,     // 教学时长
                            "favor_percent" => 1.0,  // 好评率
                            "is_recommand" => true   // 推荐老师
                        ),
                        array (
                            "number" => "234",        // 老师number
                            "name" => "高考",          // 老师名字
                            "avatar" => "xx.xx",      // 老师头像
                            "domain" => "123.22",     // 老师私有域名
                            "student_count" => 15,    // 学生数
                            "class_count" => 123,     // 班课数量
                            "certification" => "aaa", // 认证
                            "school_age" => 12,       // 主讲老师教龄
                            "courses" => "aaabbb",   // 教授科目
                            "teach_time" => 400,     // 教学时长
                            "favor_percent" => 1.0,  // 好评率
                            "is_recommand" => true   // 推荐老师
                        )
                    )
                )
            ),
            "org" => array(
                "middle" => array(
                    "options" => array(
                        "course_1" => array(
                            array (
                                "id" => 123,
                                "name" => "aaa",
                                "selected" => 0
                            ),
                            array (
                                "id" => 124,
                                "name" => "bbb",
                                "selected" => 0
                            )
                        ),
                        "course_2" => array(
                            array (
                                "id" => 123,
                                "name" => "aaa",
                                "selected" => 0
                            ),
                            array (
                                "id" => 124,
                                "name" => "bbb",
                                "selected" => 1
                            )
                        ),
                        "area" => array(
                            array (
                                "id" => 123,
                                "name" => "aaa",
                                "selected" => 0
                            ),
                            array (
                                "id" => 124,
                                "name" => "bbb",
                                "selected" => 1
                            )
                        )
                    ),
                    "data" => array(
                        array (
                            "number" => "123",        // 机构number
                            "name" => "初中",          // 机构名称
                            "avatar" => "http://img.gsxservice.com/0cms/d/file/content/2015/04/5523603f09fa6.jpg",      // 机构图片
                            "type" => "1",             // 机构类型 1工作室 2学校 3公司
                            "score" => 5.0,           // 机构打分
                            "domain" => "xxxx",       // 机构私有域名
                            "comment_count" => 12,     // 评论数
                            "desc_match" => 5.0,      // 描述相符
                            "teach_result" => 5.0,    // 教学态度
                            "service_attitude" => 5.0, // 响应速度
                            "org_type" => 2            // 机构类型
                        ),
                        array (
                            "number" => "123",        // 机构number
                            "name" => "中考",          // 机构名称
                            "avatar" => "http://img.gsxservice.com/0cms/d/file/content/2015/04/5523603f09fa6.jpg",      // 机构图片
                            "type" => "2",             // 机构类型
                            "score" => 5.0,           // 机构打分
                            "domain" => "xxxx",       // 机构私有域名
                            "comment_count" => 12,     // 评论数
                            "desc_match" => 5.0,      // 描述相符
                            "teach_result" => 5.0,    // 教学态度
                            "service_attitude" => 5.0, // 响应速度
                            "org_type" => 2            // 机构类型
                        ),
                        array (
                            "number" => "123",        // 机构number
                            "name" => "中考",          // 机构名称
                            "avatar" => "http://img.gsxservice.com/0cms/d/file/content/2015/04/5523603f09fa6.jpg",      // 机构图片
                            "type" => "3",             // 机构类型
                            "score" => 5.0,           // 机构打分
                            "domain" => "xxxx",       // 机构私有域名
                            "comment_count" => 12,     // 评论数
                            "desc_match" => 5.0,      // 描述相符
                            "teach_result" => 5.0,    // 教学态度
                            "service_attitude" => 5.0, // 响应速度
                            "org_type" => 2            // 机构类型
                        ),
                        array (
                            "number" => "123",        // 机构number
                            "name" => "中考",          // 机构名称
                            "avatar" => "http://img.gsxservice.com/0cms/d/file/content/2015/04/5523603f09fa6.jpg",      // 机构图片
                            "type" => "3",             // 机构类型
                            "score" => 5.0,           // 机构打分
                            "domain" => "xxxx",       // 机构私有域名
                            "comment_count" => 12,     // 评论数
                            "desc_match" => 5.0,      // 描述相符
                            "teach_result" => 5.0,    // 教学态度
                            "service_attitude" => 5.0, // 响应速度
                            "org_type" => 2            // 机构类型
                        ),
                        array (
                            "number" => "123",        // 机构number
                            "name" => "中考",          // 机构名称
                            "avatar" => "http://img.gsxservice.com/0cms/d/file/content/2015/04/5523603f09fa6.jpg",      // 机构图片
                            "type" => "3",             // 机构类型
                            "score" => 5.0,           // 机构打分
                            "domain" => "xxxx",       // 机构私有域名
                            "comment_count" => 12,     // 评论数
                            "desc_match" => 5.0,      // 描述相符
                            "teach_result" => 5.0,    // 教学态度
                            "service_attitude" => 5.0, // 响应速度
                            "org_type" => 2            // 机构类型
                        )
                    )
                ),
                "high" => array(
                    "options" => array(
                        "course_1" => array(
                            array (
                                "id" => 123,
                                "name" => "aaa",
                                "selected" => 0
                            ),
                            array (
                                "id" => 124,
                                "name" => "bbb",
                                "selected" => 0
                            )
                        ),
                        "course_2" => array(
                            array (
                                "id" => 123,
                                "name" => "aaa",
                                "selected" => 0
                            ),
                            array (
                                "id" => 124,
                                "name" => "bbb",
                                "selected" => 1
                            )
                        ),
                        "area" => array(
                            array (
                                "id" => 123,
                                "name" => "aaa",
                                "selected" => 1
                            ),
                            array (
                                "id" => 124,
                                "name" => "bbb",
                                "selected" => 1
                            )
                        )
                    ),
                    "data" => array(
                        array (
                            "number" => "123",        // 机构number
                            "name" => "高中高考",          // 机构名称
                            "avatar" => "xx.xx",      // 机构图片
                            "type" => "",             // 机构类型
                            "score" => 5.0,           // 机构打分
                            "domain" => "xxxx",       // 机构私有域名
                            "comment_count" => 12,     // 评论数
                            "desc_match" => 5.0,      // 描述相符
                            "teach_result" => 5.0,    // 教学态度
                            "service_attitude" => 5.0, // 响应速度
                            "org_type" => 2            // 机构类型
                        ),
                        array (
                            "number" => "123",        // 机构number
                            "name" => "高中、高考",          // 机构名称
                            "avatar" => "xx.xx",      // 机构图片
                            "type" => "",             // 机构类型
                            "score" => 5.0,           // 机构打分
                            "domain" => "xxxx",       // 机构私有域名
                            "comment_count" => 12,     // 评论数
                            "desc_match" => 5.0,      // 描述相符
                            "teach_result" => 5.0,    // 教学态度
                            "service_attitude" => 5.0, // 响应速度
                            "org_type" => 2            // 机构类型
                        )
                    )
                )
            ),
            "comments" => array(
                "great" => 123,
                "middle" => 12,
                "bad" => 1
            )
        )
    )
);