<?php

require("../bootstrap.php");

render(
    "teacher_center/profile",
    array(
        "tpl_data" => array(
            "uid" => '811339928',
            "base_info" => array(
                "has_avatar" => false,
                "avatar" => "http://img.gsxservice.com/headpic_woman.png",
                "def_avatar" => "headpic_woman_02.jpg",
                "realname" => "范毅雄",
                "realname_locked" => false, // 真实姓名锁定
                "sex" => 0,
                "nickname" => "范毅雄",
                "short_introduce" => "上“跟谁学”跟我学",  // 一句话个性签名
                "birthday" => null, // year,month,day
                "constellation" => null,
                "edu_back" => '0',
                "school" => "吉首大学",
                "major" => "中文专业",
                "category" => "1",
                "location" => array(
                    "path" => '' // 这字段，我没用啊...
                ),
                "location_addr" => '龙岗中心城愉龙路160号东方沁园会所3楼',
                "domain" => null,
                'lesson_way' => array(
                    'teacher' => false, // 老师上门
                    'student' => true, // 学生上门
                    'online' => false, // 在线教学
                    'discuss' => true // 协商地点
                ),
                "introduce" => "杀掉了看法了撒娇发到",
                "regions" => array(
                    '16777216' => array(
                        "id" => "16777216",
                        "pid" => 0,
                        "data" => array(
                            "id" => "16777216",
                            "name" => "北京省",
                            "display_order" => "1000",
                            "level" => "1",
                            "hidden" => "0"
                        ),
                        "children" => array(
                            "17039360"
                        )
                    ),
                    '17039360' => array(
                        "id" => "17039360",
                        "pid" => 16777216,
                        "data" => array(
                            "id" => "17039360",
                            "name" => "北京市",
                            "display_order" => "0",
                            "level" => "2",
                            "hidden" => "0"
                        ),
                        "children" => array(
                            "17050624"
                        )
                    ),
                    '17050624' => array(
                        "id" => "17050624",
                        "pid" => 17039360,
                        "data" => array(
                            "id" => "17050624",
                            "name" => "昌平区",
                            "display_order" => "9",
                            "level" => "3",
                            "hidden" => "0"
                        ),
                        "children" => array(
                            "17050631",
                            "17050632",
                            "17050633"
                        )
                    ),
                    '17050631' => array(
                        "id" => "17050631",
                        "pid" => 17050624,
                        "data" => array(
                            "id" => "17050631",
                            "name" => "回龙观",
                            "display_order" => "9",
                            "level" => "4",
                            "hidden" => "0"
                        ),
                        "children" => array()
                    ),
                    '17050632' => array(
                        "id" => "17050632",
                        "pid" => 17050624,
                        "data" => array(
                            "id" => "17050632",
                            "name" => "霍营",
                            "display_order" => "8",
                            "level" => "4",
                            "hidden" => "0"
                        ),
                        "children" => array()
                    ),

                    '167772161' => array(
                        "id" => "167772161",
                        "pid" => 0,
                        "data" => array(
                            "id" => "167772161",
                            "name" => "北京省",
                            "display_order" => "1000",
                            "level" => "1",
                            "hidden" => "0"
                        ),
                        "children" => array(
                            "170393601"
                        )
                    ),
                    '170393601' => array(
                        "id" => "170393601",
                        "pid" => 16777216,
                        "data" => array(
                            "id" => "170393601",
                            "name" => "",
                            "display_order" => "0",
                            "level" => "2",
                            "hidden" => "0"
                        ),
                        "children" => array(
                            "170506241"
                        )
                    ),
                    '170506241' => array(
                        "id" => "170506241",
                        "pid" => 1703936011,
                        "data" => array(
                            "id" => "170506241",
                            "name" => "昌平区",
                            "display_order" => "9",
                            "level" => "3",
                            "hidden" => "0"
                        ),
                        "children" => array(
                            "170506311",
                            "170506321",
                            "170506331"
                        )
                    ),
                    '170506311' => array(
                        "id" => "170506311",
                        "pid" => 170506241,
                        "data" => array(
                            "id" => "170506311",
                            "name" => "回龙观",
                            "display_order" => "9",
                            "level" => "4",
                            "hidden" => "0"
                        ),
                        "children" => array()
                    ),
                    '170506321' => array(
                        "id" => "170506321",
                        "pid" => 170506241,
                        "data" => array(
                            "id" => "170506321",
                            "name" => "霍营",
                            "display_order" => "8",
                            "level" => "4",
                            "hidden" => "0"
                        ),
                        "children" => array()
                    ),
                    '170506331' => array(
                        "id" => "170506331",
                        "pid" => 170506241,
                        "data" => array(
                            "id" => "170506331",
                            "name" => "立水桥",
                            "display_order" => "7",
                            "level" => "4",
                            "hidden" => "0"
                        ),
                        "children" => array()
                    ),
                    '0' => array(
                        "id" => "0",
                        "pid" => null,
                        "data" => array(
                            "id" => "0",
                            "name" => "全国",
                            "level" => "0",
                            "display_order" => "4",
                            "hidden" => "0"
                        ),
                        "children" => array(
                            "16777216",
                            "167772161"
                        )
                    )
                ),
                "province" => array(
                    "id" => "83886080",
                    "name" => "广东",
                    "display_order" => "880",
                    "level" => "1",
                    "hidden" => "0",
                    "bid" => "7",
                    "bname" => "广东省",
                    "tid" => "440000"
                ),
                "city" => array(
                    "id" => "84410368",
                    "name" => "深圳",
                    "display_order" => "0",
                    "level" => "2",
                    "hidden" => "0",
                    "bid" => "340",
                    "bname" => "深圳市",
                    "tid" => "440300"
                ),
                "area" => array(
                    "id" => "84415488",
                    "name" => "龙岗区",
                    "display_order" => "0",
                    "level" => "3",
                    "hidden" => "0",
                    "bid" => "2003",
                    "bname" => "龙岗区",
                    "tid" => "440307"
                ),
                "country" => array(),
                "uid" => "707201158",
                "blank" => false, // true,没编辑过
                "private_show" => 3, // 位运算 1昵称 2头像 3两者
                "default_avatars" => array(
                    "sexless" => "http://img.gsxservice.com/headpic_sexless.jpg",
                    "male" => "http://img.gsxservice.com/headpic_man.png",
                    "female" => "http://img.gsxservice.com/headpic_woman.png"
                ),
                "offline_poi" => array(
                    "lng" => 114.230487,
                    "lat" => 22.731865
                )
            ),
            "background" => array(
                "school_age" => '3',
                "institution" => '百家互联科技有限公司',
                // "tags" => '范德萨、的飞洒、范德萨发的、发的萨芬撒'
                "tags" => array(
                    array(
                        "id" => 1,
                        "title" => '保就业',
                        "click_count" => 1024,
                        "is_system" => true
                    ),
                    array(
                        "id" => 2,
                        "title" => '提分快',
                        "click_count" => 1024,
                        "is_system" => true
                    ),
                    array(
                        "id" => 4,
                        "title" => '培养高分学员',
                        "click_count" => 1024,
                        "is_system" => true
                    )
                ),
                "system_tags" => array(
                    "8" => array(
                        "group" => array(
                            "id" => 8,
                            "display" => '常用标签'
                        ),
                        "tags" => array(
                            array(
                                "id" => 1,
                                "title" => '保就业'
                            ),
                            array(
                                "id" => 2,
                                "title" => '提分快'
                            ),
                            array(
                                "id" => 3,
                                "title" => '考证达人'
                            ),
                            array(
                                "id" => 4,
                                "title" => '培养高分学员'
                            ),
                            array(
                                "id" => 5,
                                "title" => '效果明显'
                            ),
                            array(
                                "id" => 6,
                                "title" => '名校海归'
                            ),
                            array(
                                "id" => 7,
                                "title" => '高分得主'
                            ),
                            array(
                                "id" => 8,
                                "title" => '从前有座山'
                            ),
                            array(
                                "id" => 9,
                                "title" => '山上有座庙'
                            ),
                            array(
                                "id" => 10,
                                "title" => '庙里有个老和尚'
                            )
                        )
                    ),
                    "4" => array(
                        "group" => array(
                            "id" => 4,
                            "display" => '出国考试类标签'
                        ),
                        "tags" => array(
                            array(
                                "id" => 41,
                                "title" => '保就业4'
                            ),
                            array(
                                "id" => 42,
                                "title" => '提分快4'
                            ),
                            array(
                                "id" => 43,
                                "title" => '考证达人4'
                            )
                        )
                    ),
                    "2" => array(
                        "group" => array(
                            "id" => 2,
                            "display" => '艺术类标签'
                        ),
                        "tags" => array(
                            array(
                                "id" => 21,
                                "title" => '保就业2'
                            ),
                            array(
                                "id" => 22,
                                "title" => '提分快2'
                            ),
                            array(
                                "id" => 23,
                                "title" => '考证达人2'
                            )
                        )
                    ),
                    "1" => array(
                        "group" => array(
                            "id" => 1,
                            "display" => '中小学标签'
                        ),
                        "tags" => array(
                            array(
                                "id" => 11,
                                "title" => '保就业1'
                            ),
                            array(
                                "id" => 12,
                                "title" => '提分快1'
                            ),
                            array(
                                "id" => 13,
                                "title" => '考证达人1'
                            )
                        )
                    )
                ),
                "subjects" => array(

                )
            ),
            "experience_list" => array(
                array(
                    "id" => 10,
                    "verify_status" => 0, // 0审核中 1通过 2未通过 3未审核
                    "reasons" => array(
                        "未通过原因一：人傻",
                        "未通过原因二：钱多",
                        "未通过原因三：速来"
                    ),
                    "start_year" => 2012,
                    "start_month" => 1,
                    "end_year" => 2014,
                    "end_month" => 2,
                    "content" => '打扫打扫打是的撒的'
                ),
                array(
                    "id" => 1,
                    "verify_status" => 2, // 0审核中 1通过 2未通过
                    "reasons" => array(
                        "未通过原因一：人傻",
                        "未通过原因二：钱多",
                        "未通过原因三：速来"
                    ),
                    "start_year" => 2012,
                    "start_month" => 1,
                    "end_year" => 2014,
                    "end_month" => 2,
                    "content" => "测试包含单引号发的讲述了咖啡删不掉的问题"
                ),
                array(
                    "id" => 1,
                    "verify_status" => 2, // 0审核中 1通过 2未通过
                    "reasons" => array(
                        "未通过原因一：人傻",
                        "未通过原因二：钱多",
                        "未通过原因三：速来"
                    ),
                    "start_year" => 2012,
                    "start_month" => 1,
                    "end_year" => -1,
                    "end_month" => '',
                    "content" => "至今"
                )
            ),
            "success_list" => array(
                array(
                    "id" => 9,
                    "verify_status" => 0, // 0审核中 1通过 2未通过 3未审核
                    "reasons" => array(
                        "未通过原因一：人傻",
                        "未通过原因二：钱多",
                        "未通过原因三：速来"
                    ),
                    "title" => "成功案例的30字标题",
                    "year" => 1988,
                    "month" => 11,
                    "content" => "曾经沧海难为水，除却巫山不是云。好汉不提当年勇。
                                曾经沧海难为水，除却巫山不是云。好汉不提当年勇。
                                曾经沧海难为水，除却巫山不是云。好汉不提当年勇。
                                曾经沧海难为水，除却巫山不是云。好汉不提当年勇。"
                ),
                array(
                    "id" => 10,
                    "verify_status" => 2, // 0审核中 1通过 2未通过 3未审核
                    "reasons" => array(
                        "未通过原因一：人傻",
                        "未通过原因二：钱多",
                        "未通过原因三：速来"
                    ),
                    "title" => "成功案例的30字标题",
                    "year" => 1988,
                    "month" => 11,
                    "content" => "好汉不提&#34;当年勇&#34;。好汉不提当年勇。好汉不提当年勇。好汉不提当年勇。"
                )
            ),
            "photo_list" => array(
                array(
                    "id" => 9,
                    "verify_status" => 0, // 0审核中 1通过 2未通过 3未审核
                    "reasons" => array(
                        "未通过原因一：人傻",
                        "未通过原因二：钱多",
                        "未通过原因三：速来"
                    ),
                    "title" => "别人的故事",
                    "url" => "http://test-img.gsxservice.com/4876_2xl90wju.jpeg",
                    "width" => '180',
                    "height" => '134'
                ),
                array(
                    "id" => 10,
                    "verify_status" => 1, // 0审核中 1通过 2未通过
                    "reasons" => array(
                        "未通过原因一：人傻",
                        "未通过原因二：钱多",
                        "未通过原因三：速来"
                    ),
                    "title" => "往昔",
                    "url" => "http://test-img.gsxservice.com/4876_2xl90wju.jpeg",
                    "width" => '180',
                    "height" => '134'
                ),
                array(
                    "id" => 10,
                    "verify_status" => 2, // 0审核中 1通过 2未通过
                    "reasons" => array(
                        "未通过原因一：人傻",
                        "未通过原因二：钱多",
                        "未通过原因三：速来"
                    ),
                    "title" => "往昔",
                    "url" => "http://test-img.gsxservice.com/4876_2xl90wju.jpeg",
                    "width" => '180',
                    "height" => '134'
                ),
                array(
                    "id" => 10,
                    "verify_status" => 1, // 0审核中 1通过 2未通过
                    "reasons" => array(
                        "未通过原因一：人傻",
                        "未通过原因二：钱多",
                        "未通过原因三：速来"
                    ),
                    "title" => "往昔",
                    "url" => "http://test-img.gsxservice.com/4876_2xl90wju.jpeg",
                    "width" => '180',
                    "height" => '134'
                ),
                array(
                    "id" => 10,
                    "verify_status" => 0, // 0审核中 1通过 2未通过
                    "reasons" => array(
                        "未通过原因一：人傻",
                        "未通过原因二：钱多",
                        "未通过原因三：速来"
                    ),
                    "title" => "往昔",
                    "url" => "http://test-img.gsxservice.com/4876_2xl90wju.jpeg",
                    "width" => '180',
                    "height" => '134'
                ),
                array(
                    "id" => 10,
                    "verify_status" => 1, // 0审核中 1通过 2未通过
                    "reasons" => array(
                        "未通过原因一：人傻",
                        "未通过原因二：钱多",
                        "未通过原因三：速来"
                    ),
                    "title" => "往昔",
                    "url" => "http://test-img.gsxservice.com/4876_2xl90wju.jpeg",
                    "width" => '180',
                    "height" => '134'
                ),
                array(
                    "id" => 10,
                    "verify_status" => 2, // 0审核中 1通过 2未通过
                    "reasons" => array(
                        "未通过原因一：人傻",
                        "未通过原因二：钱多",
                        "未通过原因三：速来"
                    ),
                    "title" => "往昔",
                    "url" => "http://test-img.gsxservice.com/4876_2xl90wju.jpeg",
                    "width" => '180',
                    "height" => '134'
                ),
                array(
                    "id" => 10,
                    "verify_status" => 1, // 0审核中 1通过 2未通过
                    "reasons" => array(
                        "未通过原因一：人傻",
                        "未通过原因二：钱多",
                        "未通过原因三：速来"
                    ),
                    "title" => "往昔",
                    "url" => "http://test-img.gsxservice.com/4876_2xl90wju.jpeg",
                    "width" => '180',
                    "height" => '134'
                ),
                array(
                    "id" => 10,
                    "verify_status" => 0, // 0审核中 1通过 2未通过
                    "reasons" => array(
                        "未通过原因一：人傻",
                        "未通过原因二：钱多",
                        "未通过原因三：速来"
                    ),
                    "title" => "往昔",
                    "url" => "http://test-img.gsxservice.com/4876_2xl90wju.jpeg",
                    "width" => '180',
                    "height" => '134'
                ),
                array(
                    "id" => 10,
                    "verify_status" => 1, // 0审核中 1通过 2未通过
                    "reasons" => array(
                        "未通过原因一：人傻",
                        "未通过原因二：钱多",
                        "未通过原因三：速来"
                    ),
                    "title" => "往昔",
                    "url" => "http://test-img.gsxservice.com/4876_2xl90wju.jpeg",
                    "width" => '180',
                    "height" => '134'
                ),
                array(
                    "id" => 10,
                    "verify_status" => 0, // 0审核中 1通过 2未通过
                    "reasons" => array(
                        "未通过原因一：人傻",
                        "未通过原因二：钱多",
                        "未通过原因三：速来"
                    ),
                    "title" => "往昔",
                    "url" => "http://test-img.gsxservice.com/4876_2xl90wju.jpeg",
                    "width" => '180',
                    "height" => '134'
                ),
                array(
                    "id" => 10,
                    "verify_status" => 0, // 0审核中 1通过 2未通过
                    "reasons" => array(
                        "未通过原因一：人傻",
                        "未通过原因二：钱多",
                        "未通过原因三：速来"
                    ),
                    "title" => "往昔",
                    "url" => "http://test-img.gsxservice.com/4876_2xl90wju.jpeg",
                    "width" => '180',
                    "height" => '134'
                )
            ),
            "other" => "sa'das",
            "private_show" => 1,
            "audits" => array( // 审核具体信息
                'realname' => array(
                    'verify_status' => 2, // 0审核中 1通过 2未通过 3未填写该字段，无审核
                    'reasons' => array(
                        "人傻",
                        "钱多",
                        "速来"
                    )
                ),
                'nickname' => array(
                    'verify_status' => 2,
                    'reasons' => array(
                        "未通过原因一：人傻",
                        "未通过原因二：钱多",
                        "未通过原因三：速来"
                    )
                ),
                'short_introduce' => array(
                    'verify_status' => 2,
                    'reasons' => array(
                        "未通过原因一：人傻",
                        "未通过原因二：钱多",
                        "未通过原因三：速来"
                    )
                ),
                'introduce' => array( // 老师介绍
                    'verify_status' => 2,
                    'reasons' => array(
                        "未通过原因一：人傻",
                        "未通过原因二：钱多",
                        "未通过原因三：速来"
                    )
                ),
                'graduation_major' => array(
                    'verify_status' => 2,
                    'reasons' => array(
                        "未通过原因一：人傻",
                        "未通过原因二：钱多",
                        "未通过原因三：速来"
                    )
                ),
                'graduation_school' => array(
                    'verify_status' => 2,
                    'reasons' => array(
                        "未通过原因一：人傻",
                        "未通过原因二：钱多",
                        "未通过原因三：速来"
                    )
                ),
                'location_addr' => array(
                    'verify_status' => 2,
                    'reasons' => array(
                        "未通过原因一：人傻",
                        "未通过原因二：钱多",
                        "未通过原因三：速来"
                    )
                ),
                'private_domain' => array(
                    'verify_status' => 3,
                    'reasons' => array(
                        "未通过原因一：人傻",
                        "未通过原因二：钱多",
                        "未通过原因三：速来"
                    )
                ),
                'avatar' => array(
                    'verify_status' => 2,
                    'reasons' => array(
                        "未通过原因一：人傻",
                        "未通过原因二：钱多",
                        "未通过原因三：速来"
                    )
                ),
                'institution' => array(
                    'verify_status' => 2,
                    'reasons' => array(
                        "未通过原因一：人傻a",
                        "未通过原因二：钱多",
                        "未通过原因三：速来"
                    )
                ),
                'skills' => array(
                    'verify_status' => '0',
                    'reasons' => array(
                        "未通过原因一：人傻",
                        "未通过原因二：钱多",
                        "未通过原因三：速来"
                    )
                ),
                'other_info' => array(
                    'verify_status' => '2',
                    'reasons' => array(
                        "未通过原因一：人傻1",
                        "未通过原因二：钱多",
                        "未通过原因三：速来"
                    )
                ),
                'school_age' => array(
                    'verify_status' => 2,
                    'reasons' => array(
                        "人傻1",
                        "钱多",
                        "速来"
                    )
                ),
                'regions' => array(
                    'verify_status' => 2,
                    'reasons' => array(
                        "未通过原因一：人傻1",
                        "未通过原因二：钱多",
                        "未通过原因三：速来"
                    )
                )
            ),
            "verify_group" => array( // 审核分组状态
                'basic' => '2', // 0审核中 1审核通过 2未通过 3未审核
                'background' => '2',
                'bio' => '0',
                'case' => '0',
                'photo' => '0',
                'other_info' => '2',
                'video' => '0',
                'user_cert' => '0',
                'course' => '0',
                'combo' => '0',
                'id_card' => '1', // 身份证认证的状态 - 判断年月日的可修改与否
                'identity' => '1' // 身份认证审核状态 0审核中、1已认证、2未通过、3未审核
            ),
            "photo_max" => 60,
            "photo_count" => 60
        )
    )
);

