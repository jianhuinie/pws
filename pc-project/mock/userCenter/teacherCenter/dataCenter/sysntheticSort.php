<?php

require("../../../bootstrap.php");

render(
    "userCenter/teacherCenter/dataCenter/sysntheticSort",
    array(
        "tpl_data" => array(
            "city_name" => "北京",
            "results" => array(
                "234" => array(
                    "Obj" => array( // 五维评分解读
                        array(
                            "factor" => array(
                                "sub_factor" => array(
                                    array(
                                        "content" => "您的过往经历、相关案例、更多详情的填写是否充分，信息量是否充足，内容质量优劣程度都会影响这部分指标",
                                        "name" => "基本信息",
                                        "number" => 20,
                                        "title" => "您击败了0%的老师",
                                        "url" => "http://www.genshuixue.com/teacher_center/profile",
                                        "url_title" => "马上完善",
                                        "url_num" => "E4"
                                    ),
                                    array(
                                        "content" => "您是否填写了充足而有效的文本格式的内容，是否上传了一定数量的图片和视频，都会影响这部分指标",
                                        "name" => "图文丰富",
                                        "number" => 30,
                                        "title" => "您击败了0%的老师",
                                        "url" => "http://www.genshuixue.com/teacher_center/photos",
                                        "url_title" => "马上完善",
                                        "url_num" => "E5"
                                    ),
                                    array(
                                        "content" => "您是否有经过认证的标签，包括名校毕业、教师资质、教务职称等，都会影响这部分指标",
                                        "name" => "认证标签",
                                        "number" => 0.9,
                                        "title" => "您击败了0%的老师",
                                        "url" => "http://www.genshuixue.com/teacher_center/user_cert",
                                        "url_title" => "马上完善",
                                        "url_num" => "E6"
                                    )
                                )
                            ),
                            "name" => "主页完善度",
                            "score" => "90"
                        ),
                        array(
                            "factor" => array(
                                "sub_factor" => array(
                                    array(
                                    "content" => "您是否有迟到、早退、旷课、刷单等各种违规行为将大大折损这部分指标，请务必严格遵守平台规则，一切以学生利益为重",
                                    "name" => "惩罚记录",
                                    "number" => 20,
                                    "title" => "您击败了0%的老师",
                                    "url" => "http://www.genshuixue.com/teacher_center/deductList",
                                    "url_num" => "E7",
                                    "url_title" => "查看扣分记录"
                                    ),
                                    array(
                                    "content" => "您在im响应学生咨询的响应率和响应时长，以及回答学生问题的质量和态度，都会影响这部分指标",
                                    "name" => "im响应",
                                    "number" => 90,
                                    "title" => "您击败了0%的老师"
                                    ),
                                    array(
                                    "content" => "您收到的学生订单是否能及时排课和上课，让学生能尽快享受服务，都会影响这部分指标",
                                    "name" => "订单分配",
                                    "number" => 20,
                                    "title" => "您击败了0%的老师"
                                    )
                                )
                            ),
                            "name" => "服务质量",
                            "score" => "60"
                        ),
                        array(
                            "factor" => array(
                                "sub_factor" => array(
                                    array(
                                    "content" => "您在近3个月内交易额的累计值会影响这部分指标，恶意刷交易额行为不但不会增加分值反而会增加惩罚记录",
                                    "name" => "交易额",
                                    "number" => 40,
                                    "title" => "您击败了0%的老师"
                                    ),
                                    array(
                                    "content" => "您在近3个月内所有课程的学生数（去重）会影响这部分指标，恶意刷学生数行为不但不会增加分值反而会增加惩罚记录",
                                    "name" => "学生数",
                                    "number" => 30,
                                    "title" => "您击败了0%的老师"
                                    ),
                                    array(
                                    "content" => "您在近3个月内在平台上累计的教学时长会影响这部分指标，不正常的教学时长不但不会增加分值反而会增加惩罚记录",
                                    "name" => "教学时长",
                                    "number" => 70,
                                    "title" => "您击败了0%的老师"
                                    )
                                )
                            ),
                            "name" => "平台积累",
                            "score" => "20"
                        ),
                        array(
                            "factor" => array(
                                "sub_factor" => array(
                                    array(
                                    "content" => "您在搜索展现的结果中是否被用户点击的比例会影响这部分指标，多关注并优化您的搜索结果中展示的内容能大大提升这部分指标，把价格定在合理区间范围也会改善这部分指标",
                                    "name" => "搜索点击",
                                    "number" => 30,
                                    "title" => "您击败了0%的老师"
                                    ),
                                    array(
                                    "content" => "您在用户点击进入详情页后能否收到学生的订单的比例会影响这部分指标，多关注并优化详情页的内容质量能大大提升这部分指标，提升课程质量从而提升课程的评价信息有助于改善这部分指标",
                                    "name" => "点击成单",
                                    "number" => 0,
                                    "title" => "您击败了0%的老师"
                                    )
                                )
                            ),
                            "name" => "交易转化",
                            "score" => "80"
                        ),
                        array(
                            "factor" => array(
                                "sub_factor" => array(
                                    array(
                                    "content" => "您收到学生的综合打分会影响这部分指标，努力提高课程质量，让学生真正受益，会大大提升这部分指标",
                                    "name" => "学生打分",
                                    "number" => 30,
                                    "title" => "您击败了0%的老师"
                                    ),
                                    array(
                                    "content" => "在您收到所有评价中，好评的比例会影响这部分指标，努力提高课程质量，让学生真正受益，会大大提升这部分指标",
                                    "name" => "好评数",
                                    "number" => 40,
                                    "title" => "您击败了0%的老师"
                                    )
                                )
                            ),
                            "name" => "学生口碑",
                            "score" => "100"
                        )
                    ),
                    "name" => "语文", // 科目
                    "rank" => 10, // 排名
                    "rank_rate" => 90, // 打败百分多少老师
                    "top_5" => array(
                        array(
                            "avatar" => "http://test-img.gsxservice.com/5660_m0fayypj.png",
                            "nickname" => "唐赫男",
                            "rank" => 1,
                            "homelink" => "http://test.genshuixue.com/329016648"
                        ),
                        array(
                            "avatar" => "http://test-img.gsxservice.com/9901_95q5q62o.png",
                            "nickname" => "张宇疆",
                            "rank" => 2,
                            "homelink" => "http://test.genshuixue.com/667732658"
                        ),
                        array(
                            "avatar" => "http://test-img.gsxservice.com/9938_5makc3sk.jpeg",
                            "nickname" => "邓智梁",
                            "rank" => 3,
                            "homelink" => "http://test.genshuixue.com/749182918"
                        ),
                        array(
                            "avatar" => "http://test-img.gsxservice.com/5757_jilz1k6l.png",
                            "nickname" => "罗卫锋",
                            "rank" => 4,
                            "homelink" => "http://test.genshuixue.com/328996098"
                        ),
                        array(
                            "avatar" => "http://test-img.gsxservice.com/5635_yhozo1ti.jpeg",
                            "nickname" => "王上",
                            "rank" => 5,
                            "homelink" => "http://test.genshuixue.com/667163048"
                        )
                    ),
                ),
                "233" => array(
                    "Obj" => array(
                        array(
                            "factor" => array(
                                "sub_factor" => array(
                                    array(
                                        "content" => "您的过往经历、相关案例、更多详情的填写是否充分，信息量是否充足，内容质量优劣程度都会影响这部分指标",
                                        "name" => "基本信息",
                                        "number" => 40,
                                        "title" => "您击败了10%的老师",
                                        "url" => "http://www.genshuixue.com/teacher_center/profile",
                                        "url_title" => "马上完善",
                                        "url_num" => "E4"
                                    ),
                                    array(
                                        "content" => "您是否填写了充足而有效的文本格式的内容，是否上传了一定数量的图片和视频，都会影响这部分指标",
                                        "name" => "图文丰富",
                                        "number" => 60,
                                        "title" => "您击败了20%的老师",
                                        "url" => "http://www.genshuixue.com/teacher_center/photos",
                                        "url_title" => "马上完善",
                                        "url_num" => "E5"
                                    ),
                                    array(
                                        "content" => "您是否有经过认证的标签，包括名校毕业、教师资质、教务职称等，都会影响这部分指标",
                                        "name" => "认证标签",
                                        "number" => 80,
                                        "title" => "您击败了30%的老师",
                                        "url" => "http://www.genshuixue.com/teacher_center/user_cert",
                                        "url_title" => "马上完善",
                                        "url_num" => "E6"
                                    )
                                )
                            ),
                            "name" => "主页完善度",
                            "score" => "0"
                        ),
                        array(
                            "factor" => array(
                                "sub_factor" => array(
                                    array(
                                        "content" => "您是否有迟到、早退、旷课、刷单等各种违规行为将大大折损这部分指标，请务必严格遵守平台规则，一切以学生利益为重",
                                        "name" => "惩罚记录",
                                        "number" => 40,
                                        "title" => "您击败了0%的老师",
                                        "url" => "http://www.genshuixue.com/teacher_center/deductList",
                                        "url_num" => "E7",
                                        "url_title" => "查看扣分记录"
                                    ),
                                    array(
                                        "content" => "您在im响应学生咨询的响应率和响应时长，以及回答学生问题的质量和态度，都会影响这部分指标",
                                        "name" => "im响应",
                                        "number" => 30,
                                        "title" => "您击败了0%的老师"
                                    ),
                                    array(
                                        "content" => "您收到的学生订单是否能及时排课和上课，让学生能尽快享受服务，都会影响这部分指标",
                                        "name" => "订单分配",
                                        "number" => 50,
                                        "title" => "您击败了0%的老师"
                                    )
                                )
                            ),
                            "name" => "服务质量",
                            "score" => "40"
                        ),
                        array(
                            "factor" => array(
                                "sub_factor" => array(
                                    array(
                                        "content" => "您在近3个月内交易额的累计值会影响这部分指标，恶意刷交易额行为不但不会增加分值反而会增加惩罚记录",
                                        "name" => "交易额",
                                        "number" => 40,
                                        "title" => "您击败了0%的老师"
                                    ),
                                    array(
                                    "content" => "您在近3个月内所有课程的学生数（去重）会影响这部分指标，恶意刷学生数行为不但不会增加分值反而会增加惩罚记录",
                                    "name" => "学生数",
                                    "number" => 50,
                                    "title" => "您击败了0%的老师"
                                    ),
                                    array(
                                    "content" => "您在近3个月内在平台上累计的教学时长会影响这部分指标，不正常的教学时长不但不会增加分值反而会增加惩罚记录",
                                    "name" => "教学时长",
                                    "number" => 30,
                                    "title" => "您击败了0%的老师"
                                    )
                                )
                            ),
                            "name" => "平台积累",
                            "score" => "70"
                        ),
                        array(
                            "factor" => array(
                                "sub_factor" => array(
                                    array(
                                        "content" => "您在搜索展现的结果中是否被用户点击的比例会影响这部分指标，多关注并优化您的搜索结果中展示的内容能大大提升这部分指标，把价格定在合理区间范围也会改善这部分指标",
                                        "name" => "搜索点击",
                                        "number" => 20,
                                        "title" => "您击败了0%的老师"
                                    ),
                                    array(
                                    "content" => "您在用户点击进入详情页后能否收到学生的订单的比例会影响这部分指标，多关注并优化详情页的内容质量能大大提升这部分指标，提升课程质量从而提升课程的评价信息有助于改善这部分指标",
                                    "name" => "点击成单",
                                    "number" => 60,
                                    "title" => "您击败了0%的老师"
                                    )
                                )
                            ),
                            "name" => "交易转化",
                            "score" => "30"
                        ),
                        array(
                            "factor" => array(
                                "sub_factor" => array(
                                    array(
                                        "content" => "您收到学生的综合打分会影响这部分指标，努力提高课程质量，让学生真正受益，会大大提升这部分指标",
                                        "name" => "学生打分",
                                        "number" => 20,
                                        "title" => "您击败了0%的老师"
                                        ),
                                    array(
                                    "content" => "在您收到所有评价中，好评的比例会影响这部分指标，努力提高课程质量，让学生真正受益，会大大提升这部分指标",
                                    "name" => "好评数",
                                    "number" => 10,
                                    "title" => "您击败了0%的老师"
                                    )
                                )
                            ),
                            "name" => "学生口碑",
                            "score" => "90"
                        )
                    ),
                    "name" => "数学",
                    "rank" => 10,
                    "rank_rate" => 90,
                    "top_5" => array(
                        array(
                            "avatar" => "http://test-img.gsxservice.com/5660_m0fayypj.png",
                            "nickname" => "唐赫男",
                            "rank" => 1,
                            "homelink" => "http://test.genshuixue.com/329016648"
                        ),
                        array(
                            "avatar" => "http://test-img.gsxservice.com/9901_95q5q62o.png",
                            "nickname" => "张宇疆",
                            "rank" => 2,
                            "homelink" => "http://test.genshuixue.com/667732658"
                        ),
                        array(
                            "avatar" => "http://test-img.gsxservice.com/9938_5makc3sk.jpeg",
                            "nickname" => "邓智梁",
                            "rank" => 3,
                            "homelink" => "http://test.genshuixue.com/749182918"
                        ),
                        array(
                            "avatar" => "http://test-img.gsxservice.com/5757_jilz1k6l.png",
                            "nickname" => "罗卫锋",
                            "rank" => 4,
                            "homelink" => "http://test.genshuixue.com/328996098"
                        ),
                        array(
                            "avatar" => "http://test-img.gsxservice.com/5635_yhozo1ti.jpeg",
                            "nickname" => "王上",
                            "rank" => 5,
                            "homelink" => "http://test.genshuixue.com/667163048"
                        )
                    ),
                ),
                "133" => array(
                    "Obj" => array(
                        array(
                            "factor" => array(
                                "sub_factor" => array(
                                    array(
                                    "content" => "您的过往经历、相关案例、更多详情的填写是否充分，信息量是否充足，内容质量优劣程度都会影响这部分指标",
                                    "name" => "基本信息",
                                    "number" => 30,
                                    "title" => "您击败了0%的老师",
                                    "url" => "http://www.genshuixue.com/teacher_center/profile",
                                    "url_title" => "马上完善",
                                    "url_num" => "E4"
                                    ),
                                    array(
                                    "content" => "您是否填写了充足而有效的文本格式的内容，是否上传了一定数量的图片和视频，都会影响这部分指标",
                                    "name" => "图文丰富",
                                    "number" => 20,
                                    "title" => "您击败了0%的老师",
                                    "url" => "http://www.genshuixue.com/teacher_center/photos",
                                    "url_title" => "马上完善",
                                    "url_num" => "E5"
                                    ),
                                    array(
                                    "content" => "您是否有经过认证的标签，包括名校毕业、教师资质、教务职称等，都会影响这部分指标",
                                    "name" => "认证标签",
                                    "number" => 30,
                                    "title" => "您击败了0%的老师",
                                    "url" => "http://www.genshuixue.com/teacher_center/user_cert",
                                    "url_title" => "马上完善",
                                    "url_num" => "E6"
                                    )
                                )
                            ),
                            "name" => "主页完善度",
                            "score" => "20"
                        ),
                        array(
                            "factor" => array(
                                "sub_factor" => array(
                                    array(
                                    "content" => "您是否有迟到、早退、旷课、刷单等各种违规行为将大大折损这部分指标，请务必严格遵守平台规则，一切以学生利益为重",
                                    "name" => "惩罚记录",
                                    "number" => 50,
                                    "title" => "您击败了0%的老师",
                                    "url" => "http://www.genshuixue.com/teacher_center/deductList",
                                    "url_num" => "E7",
                                    "url_title" => "查看扣分记录"
                                    ),
                                    array(
                                    "content" => "您在im响应学生咨询的响应率和响应时长，以及回答学生问题的质量和态度，都会影响这部分指标",
                                    "name" => "im响应",
                                    "number" => 60,
                                    "title" => "您击败了0%的老师"
                                    ),
                                    array(
                                    "content" => "您收到的学生订单是否能及时排课和上课，让学生能尽快享受服务，都会影响这部分指标",
                                    "name" => "订单分配",
                                    "number" => 0,
                                    "title" => "您击败了0%的老师"
                                    )
                                )
                            ),
                            "name" => "服务质量",
                            "score" => "30"
                        ),
                        array(
                            "factor" => array(
                                "sub_factor" => array(
                                    array(
                                    "content" => "您在近3个月内交易额的累计值会影响这部分指标，恶意刷交易额行为不但不会增加分值反而会增加惩罚记录",
                                    "name" => "交易额",
                                    "number" => 70,
                                    "title" => "您击败了0%的老师"
                                    ),
                                    array(
                                    "content" => "您在近3个月内所有课程的学生数（去重）会影响这部分指标，恶意刷学生数行为不但不会增加分值反而会增加惩罚记录",
                                    "name" => "学生数",
                                    "number" => 90,
                                    "title" => "您击败了0%的老师"
                                    ),
                                    array(
                                    "content" => "您在近3个月内在平台上累计的教学时长会影响这部分指标，不正常的教学时长不但不会增加分值反而会增加惩罚记录",
                                    "name" => "教学时长",
                                    "number" => 60,
                                    "title" => "您击败了0%的老师"
                                    )
                                )
                            ),
                            "name" => "平台积累",
                            "score" => "30"
                        ),
                        array(
                            "factor" => array(
                                "sub_factor" => array(
                                    array(
                                    "content" => "您在搜索展现的结果中是否被用户点击的比例会影响这部分指标，多关注并优化您的搜索结果中展示的内容能大大提升这部分指标，把价格定在合理区间范围也会改善这部分指标",
                                    "name" => "搜索点击",
                                    "number" => 20,
                                    "title" => "您击败了0%的老师"
                                    ),
                                    array(
                                    "content" => "您在用户点击进入详情页后能否收到学生的订单的比例会影响这部分指标，多关注并优化详情页的内容质量能大大提升这部分指标，提升课程质量从而提升课程的评价信息有助于改善这部分指标",
                                    "name" => "点击成单",
                                    "number" => 30,
                                    "title" => "您击败了0%的老师"
                                    )
                                )
                            ),
                            "name" => "交易转化",
                            "score" => "60"
                        ),
                        array(
                            "factor" => array(
                                "sub_factor" => array(
                                    array(
                                        "content" => "您收到学生的综合打分会影响这部分指标，努力提高课程质量，让学生真正受益，会大大提升这部分指标",
                                        "name" => "学生打分",
                                        "number" => 0,
                                        "title" => "您击败了0%的老师"
                                    ),
                                    array(
                                        "content" => "在您收到所有评价中，好评的比例会影响这部分指标，努力提高课程质量，让学生真正受益，会大大提升这部分指标",
                                        "name" => "好评数",
                                        "number" => 0,
                                        "title" => "您击败了0%的老师"
                                    )
                                )
                            ),
                            "name" => "学生口碑",
                            "score" => "70"
                        )
                    ),
                    "name" => "英语",
                    "rank" => 0,
                    "rank_rate" => 0,
                    "top_5" => array(
                        array(
                            "avatar" => "http://test-img.gsxservice.com/5660_m0fayypj.png",
                            "nickname" => "唐赫男",
                            "rank" => 1,
                            "homelink" => "http://test.genshuixue.com/329016648"
                        ),
                        array(
                            "avatar" => "http://test-img.gsxservice.com/9901_95q5q62o.png",
                            "nickname" => "张宇疆",
                            "rank" => 2,
                            "homelink" => "http://test.genshuixue.com/667732658"
                        ),
                        array(
                            "avatar" => "http://test-img.gsxservice.com/9938_5makc3sk.jpeg",
                            "nickname" => "邓智梁",
                            "rank" => 3,
                            "homelink" => "http://test.genshuixue.com/749182918"
                        ),
                        array(
                            "avatar" => "http://test-img.gsxservice.com/5757_jilz1k6l.png",
                            "nickname" => "罗卫锋",
                            "rank" => 4,
                            "homelink" => "http://test.genshuixue.com/328996098"
                        ),
                        array(
                            "avatar" => "http://test-img.gsxservice.com/5635_yhozo1ti.jpeg",
                            "nickname" => "王上",
                            "rank" => 5,
                            "homelink" => "http://test.genshuixue.com/667163048"
                        )
                    ),
                ),
            ),
            // "results" => null,
            "others" => array(
                "answer" => array(
                    "A1" => "是指您在当前城市当前科目老师中的排名，可在跟谁学电脑版首页点击相关科目查看确认。",
                    "A2" => "最主要受五维评估评分，会员级别和广告投放的影响。另外还受如下因素的影响：用户与老师的距离、课程定价合理性、搜索词相关性。"
                ),
                "name" => "影响排名因素",
                "question" => array(
                    "Q1" => "1、排名含义？如何查看？",
                    "Q2" => "2、排名主要影响因素有哪些？"
                )
            ),
        )
    )
);

