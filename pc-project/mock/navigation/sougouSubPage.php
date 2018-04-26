<?php

require("../bootstrap.php");

render(
    "navigation/sougouSubPage",
    array(
        "tpl_data" => array(
            "site" => "qq",
            "page_type" => "zxx", //zxx -中小学 cglx - 出国留学 ysxq - 艺术兴趣
            "current_city" => array(
                "id" => "126716032",
                "name" => "长春"
            ),
            "courses" => array(
                array(
                    "title" => "高中",
                    "tab" => array(
                        array(
                            "subject_id" => "1",
                            "name" => "吉他",
                        ),
                        array(
                            "subject_id" => "2",
                            "name" => "小提琴",
                        ),
                        array(
                            "subject_id" => "3",
                            "name" => "声乐",
                        ),
                        array(
                            "subject_id" => "4",
                            "name" => "音乐理论",
                        ),
                        array(
                            "subject_id" => "5",
                            "name" => "其他",
                        ),
                    ),
                    "more_url" => "XX",
                    "list" => array(
                        // 老师
                        array(
                            "course_number" => "150308480013", //课程编号
                            "teacher_name" => "张",
                            "org_name" => "组织名称",//不存在时为null
                            "name" => "班课名称",
                            "cover" => "http://img.gsxservice.com/2846962_mgtekcd5.jpeg", //图片url
                            "price" => "200", //当前价格
                            "course_url" => "http://baidu.com", //课程链接
                            "teacher_url" => "xxx",//老师主页
                            "org_url" => "xxx",//机构主页
                            "is1to1" => "1"//是老师
                        ),
                        // 班课
                        array(
                            "course_number" => "150308480013", //课程编号
                            "teacher_name" => "张",
                            "org_name" => "组织名称",//不存在时为null
                            "name" => "班课名称",
                            "cover" => "http://img.gsxservice.com/2846962_mgtekcd5.jpeg", //图片url
                            "price" => "200", //当前价格
                            "original_price" => "240", //原始价格
                            "begin_time" => "09月10日",
                            "course_url" => "http://baidu.com", //课程链接
                            "teacher_url" => "xxx",//老师主页
                            "org_url" => "xxx",//机构主页
                            "is1to1" => "0",//是班课
                            "chaban_price" => "0.01",//chabanjia
                        ),
                    ),
                    "hot_news" => array(
                        array(
                            "subject" => "国内油价下周有望迎6连跌v国内油价下周有望迎6连跌",
                            "url" => "http://www.genshuixue.com/teacher/classCourseDetail/150907477918",
                        ),
                        array(
                            "subject" => "小洞洞",
                            "url" => "http://www.genshuixue.com/teacher/classCourseDetail/150907477918",
                        ),
                        array(
                            "subject" => "小洞洞",
                            "url" => "http://www.genshuixue.com/teacher/classCourseDetail/150907477918",
                        ),
                        array(
                            "subject" => "小洞洞",
                            "url" => "http://www.genshuixue.com/teacher/classCourseDetail/150907477918",
                        ),
                        array(
                            "subject" => "小洞洞",
                            "url" => "http://www.genshuixue.com/teacher/classCourseDetail/150907477918",
                        ),
                        array(
                            "subject" => "小洞洞",
                            "url" => "http://www.genshuixue.com/teacher/classCourseDetail/150907477918",
                        ),
                        array(
                            "subject" => "小洞洞",
                            "url" => "http://www.genshuixue.com/teacher/classCourseDetail/150907477918",
                        ),
                        array(
                            "subject" => "小洞洞",
                            "url" => "http://www.genshuixue.com/teacher/classCourseDetail/150907477918",
                        ),
                    ),
                    "hot_orgs" => array(
                        array(
                            "logo" => "http://img.gsxservice.com/2365340_9m42aau2.jpg",
                            "title" => "乐学教育",
                            "address" => "北京市海淀区",
                            "phone" => "010-12312311",
                            "desc" => "火星人是专业从事计算机设计艺术的教育培训机构，集设计理念、设计创意和设计工具培训于一体的多行业正规培训机构。",
                            "org_url" => "http://www.genshuixue.com/teacher/classCourseDetail/150907477918",
                            "org_number" => "1231231",
                        ),
                        array(
                            "logo" => "http://img.gsxservice.com/2365340_9m42aau2.jpg",
                            "title" => "乐学教育",
                            "address" => "北京市海淀区",
                            "phone" => "010-12312311",
                            "desc" => "火星人是专业从事计算机设计艺术的教育培训机构，集设计理念、设计创意和设计工具培训于一体的多行业正规培训机构。",
                            "org_url" => "http://www.genshuixue.com/teacher/classCourseDetail/150907477918",
                            "org_number" => "1231231",
                        ),
                        array(
                            "logo" => "http://img.gsxservice.com/2365340_9m42aau2.jpg",
                            "title" => "乐学教育",
                            "address" => "北京市海淀区",
                            "phone" => "010-12312311",
                            "desc" => "火星人是专业从事计算机设计艺术的教育培训机构，集设计理念、设计创意和设计工具培训于一体的多行业正规培训机构。",
                            "org_url" => "http://www.genshuixue.com/teacher/classCourseDetail/150907477918",
                            "org_number" => "1231231",
                        ),
                        array(
                            "logo" => "http://img.gsxservice.com/2365340_9m42aau2.jpg",
                            "title" => "乐学教育",
                            "address" => "北京市海淀区",
                            "phone" => "010-12312311",
                            "desc" => "火星人是专业从事计算机设计艺术的教育培训机构，集设计理念、设计创意和设计工具培训于一体的多行业正规培训机构。",
                            "org_url" => "http://www.genshuixue.com/teacher/classCourseDetail/150907477918",
                            "org_number" => "1231231",
                        ),
                        array(
                            "logo" => "http://img.gsxservice.com/2365340_9m42aau2.jpg",
                            "title" => "乐学教育",
                            "address" => "北京市海淀区",
                            "phone" => "010-12312311",
                            "desc" => "火星人是专业从事计算机设计艺术的教育培训机构，集设计理念、设计创意和设计工具培训于一体的多行业正规培训机构。",
                            "org_url" => "http://www.genshuixue.com/teacher/classCourseDetail/150907477918",
                            "org_number" => "1231231",
                        ),
                        array(
                            "logo" => "http://img.gsxservice.com/2365340_9m42aau2.jpg",
                            "title" => "乐学教育",
                            "address" => "北京市海淀区",
                            "phone" => "010-12312311",
                            "desc" => "火星人是专业从事计算机设计艺术的教育培训机构，集设计理念、设计创意和设计工具培训于一体的多行业正规培训机构。",
                            "org_url" => "http://www.genshuixue.com/teacher/classCourseDetail/150907477918",
                            "org_number" => "1231231",
                        ),
                        array(
                            "logo" => "http://img.gsxservice.com/2365340_9m42aau2.jpg",
                            "title" => "乐学教育",
                            "address" => "北京市海淀区",
                            "phone" => "010-12312311",
                            "desc" => "火星人是专业从事计算机设计艺术的教育培训机构，集设计理念、设计创意和设计工具培训于一体的多行业正规培训机构。",
                            "org_url" => "http://www.genshuixue.com/teacher/classCourseDetail/150907477918",
                            "org_number" => "1231231",
                        ),
                        array(
                            "logo" => "http://img.gsxservice.com/2365340_9m42aau2.jpg",
                            "title" => "乐学教育",
                            "address" => "北京市海淀区",
                            "phone" => "010-12312311",
                            "desc" => "火星人是专业从事计算机设计艺术的教育培训机构，集设计理念、设计创意和设计工具培训于一体的多行业正规培训机构。",
                            "org_url" => "http://www.genshuixue.com/teacher/classCourseDetail/150907477918",
                            "org_number" => "1231231",
                        ),
                        array(
                            "logo" => "http://img.gsxservice.com/2365340_9m42aau2.jpg",
                            "title" => "乐学教育",
                            "address" => "北京市海淀区",
                            "phone" => "010-12312311",
                            "desc" => "火星人是专业从事计算机设计艺术的教育培训机构，集设计理念、设计创意和设计工具培训于一体的多行业正规培训机构。",
                            "org_url" => "http://www.genshuixue.com/teacher/classCourseDetail/150907477918",
                            "org_number" => "1231231",
                        )
                    ),
                ),
                array(
                    "title" => "初中",
                    "tab" => array(
                        array(
                            "subject_id" => "1",
                            "name" => "吉他",
                        ),
                        array(
                            "subject_id" => "2",
                            "name" => "小提琴",
                        ),
                        array(
                            "subject_id" => "3",
                            "name" => "声乐",
                        ),
                        array(
                            "subject_id" => "4",
                            "name" => "音乐理论",
                        ),
                        array(
                            "subject_id" => "5",
                            "name" => "其他",
                        ),
                    ),
                    "more_url" => "XX",
                    "list" => array(
                        // 老师
                        array(
                            "course_number" => "150308480013", //课程编号
                            "teacher_name" => "张",
                            "org_name" => "组织名称",//不存在时为null
                            "name" => "班课名称",
                            "cover" => "http://img.gsxservice.com/2846962_mgtekcd5.jpeg", //图片url
                            "price" => "200", //当前价格
                            "course_url" => "http://baidu.com", //课程链接
                            "teacher_url" => "xxx",//老师主页
                            "org_url" => "xxx",//机构主页
                            "is1to1" => "1"//是老师
                        ),
                        // 班课
                        array(
                            "course_number" => "150308480013", //课程编号
                            "teacher_name" => "张",
                            "org_name" => "组织名称",//不存在时为null
                            "name" => "班课名称",
                            "cover" => "http://img.gsxservice.com/2846962_mgtekcd5.jpeg", //图片url
                            "price" => "200", //当前价格
                            "original_price" => "240", //原始价格
                            "begin_time" => "09月10日",
                            "course_url" => "http://baidu.com", //课程链接
                            "teacher_url" => "xxx",//老师主页
                            "org_url" => "xxx",//机构主页
                            "is1to1" => "0"//是班课
                        ),
                    ),
                    "hot_news" => array(
                        array(
                            "subject" => "国内油价下周有望迎6连跌v国内油价下周有望迎6连跌",
                            "url" => "http://www.genshuixue.com/teacher/classCourseDetail/150907477918",
                        ),
                        array(
                            "subject" => "小洞洞",
                            "url" => "http://www.genshuixue.com/teacher/classCourseDetail/150907477918",
                        ),
                        array(
                            "subject" => "小洞洞",
                            "url" => "http://www.genshuixue.com/teacher/classCourseDetail/150907477918",
                        ),
                        array(
                            "subject" => "小洞洞",
                            "url" => "http://www.genshuixue.com/teacher/classCourseDetail/150907477918",
                        ),
                        array(
                            "subject" => "小洞洞",
                            "url" => "http://www.genshuixue.com/teacher/classCourseDetail/150907477918",
                        ),
                        array(
                            "subject" => "小洞洞",
                            "url" => "http://www.genshuixue.com/teacher/classCourseDetail/150907477918",
                        ),
                        array(
                            "subject" => "小洞洞",
                            "url" => "http://www.genshuixue.com/teacher/classCourseDetail/150907477918",
                        ),
                        array(
                            "subject" => "小洞洞",
                            "url" => "http://www.genshuixue.com/teacher/classCourseDetail/150907477918",
                        ),
                    ),
                    "hot_orgs" => array(
                        array(
                            "logo" => "http://img.gsxservice.com/2365340_9m42aau2.jpg",
                            "title" => "乐学教育",
                            "address" => "北京市海淀区",
                            "phone" => "010-12312311",
                            "desc" => "火星人是专业从事计算机设计艺术的教育培训机构，集设计理念、设计创意和设计工具培训于一体的多行业正规培训机构。",
                            "org_url" => "http://www.genshuixue.com/teacher/classCourseDetail/150907477918",
                            "org_number" => "1231231",
                        ),
                        array(
                            "logo" => "http://img.gsxservice.com/2365340_9m42aau2.jpg",
                            "title" => "乐学教育",
                            "address" => "北京市海淀区",
                            "phone" => "010-12312311",
                            "desc" => "火星人是专业从事计算机设计艺术的教育培训机构，集设计理念、设计创意和设计工具培训于一体的多行业正规培训机构。",
                            "org_url" => "http://www.genshuixue.com/teacher/classCourseDetail/150907477918",
                            "org_number" => "1231231",
                        ),
                        array(
                            "logo" => "http://img.gsxservice.com/2365340_9m42aau2.jpg",
                            "title" => "乐学教育",
                            "address" => "北京市海淀区",
                            "phone" => "010-12312311",
                            "desc" => "火星人是专业从事计算机设计艺术的教育培训机构，集设计理念、设计创意和设计工具培训于一体的多行业正规培训机构。",
                            "org_url" => "http://www.genshuixue.com/teacher/classCourseDetail/150907477918",
                            "org_number" => "1231231",
                        ),
                        array(
                            "logo" => "http://img.gsxservice.com/2365340_9m42aau2.jpg",
                            "title" => "乐学教育",
                            "address" => "北京市海淀区",
                            "phone" => "010-12312311",
                            "desc" => "火星人是专业从事计算机设计艺术的教育培训机构，集设计理念、设计创意和设计工具培训于一体的多行业正规培训机构。",
                            "org_url" => "http://www.genshuixue.com/teacher/classCourseDetail/150907477918",
                            "org_number" => "1231231",
                        ),
                        array(
                            "logo" => "http://img.gsxservice.com/2365340_9m42aau2.jpg",
                            "title" => "乐学教育",
                            "address" => "北京市海淀区",
                            "phone" => "010-12312311",
                            "desc" => "火星人是专业从事计算机设计艺术的教育培训机构，集设计理念、设计创意和设计工具培训于一体的多行业正规培训机构。",
                            "org_url" => "http://www.genshuixue.com/teacher/classCourseDetail/150907477918",
                            "org_number" => "1231231",
                        ),
                        array(
                            "logo" => "http://img.gsxservice.com/2365340_9m42aau2.jpg",
                            "title" => "乐学教育",
                            "address" => "北京市海淀区",
                            "phone" => "010-12312311",
                            "desc" => "火星人是专业从事计算机设计艺术的教育培训机构，集设计理念、设计创意和设计工具培训于一体的多行业正规培训机构。",
                            "org_url" => "http://www.genshuixue.com/teacher/classCourseDetail/150907477918",
                            "org_number" => "1231231",
                        ),
                        array(
                            "logo" => "http://img.gsxservice.com/2365340_9m42aau2.jpg",
                            "title" => "乐学教育",
                            "address" => "北京市海淀区",
                            "phone" => "010-12312311",
                            "desc" => "火星人是专业从事计算机设计艺术的教育培训机构，集设计理念、设计创意和设计工具培训于一体的多行业正规培训机构。",
                            "org_url" => "http://www.genshuixue.com/teacher/classCourseDetail/150907477918",
                            "org_number" => "1231231",
                        ),
                        array(
                            "logo" => "http://img.gsxservice.com/2365340_9m42aau2.jpg",
                            "title" => "乐学教育",
                            "address" => "北京市海淀区",
                            "phone" => "010-12312311",
                            "desc" => "火星人是专业从事计算机设计艺术的教育培训机构，集设计理念、设计创意和设计工具培训于一体的多行业正规培训机构。",
                            "org_url" => "http://www.genshuixue.com/teacher/classCourseDetail/150907477918",
                            "org_number" => "1231231",
                        ),
                        array(
                            "logo" => "http://img.gsxservice.com/2365340_9m42aau2.jpg",
                            "title" => "乐学教育",
                            "address" => "北京市海淀区",
                            "phone" => "010-12312311",
                            "desc" => "火星人是专业从事计算机设计艺术的教育培训机构，集设计理念、设计创意和设计工具培训于一体的多行业正规培训机构。",
                            "org_url" => "http://www.genshuixue.com/teacher/classCourseDetail/150907477918",
                            "org_number" => "1231231",
                        )
                    ),
                ),
            ),
        )
    )
);
