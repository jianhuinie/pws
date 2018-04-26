<?php

require('../../bootstrap.php');

render(
    'userCenter/teacherCenter/index',
    array(
        'tpl_data' => array(
            "is_huike_teacher" => 1, // 是否是汇课间老师
            'is_active' => '1', // 是否已激活 0未激活
            'is_bind_card' => true, // 是否绑定银行卡
            "is_def" => 1,
            "sex" => '0',
            'user' => array(
                'status' => '1', // 1正常 2账号被封禁
                'disabled_tip' => '抱歉，该账号已被封禁，暂时不能进行任何操作。查看原因及申请解禁请拨打客服电话4000-910-910',
                'deduct_punishment' => true,
            ),
            "banner" => array(
                'url' => "http://www.genshuixue.com/forum/postBrowse/27017",
                'image' => 'http://img.gsxservice.com/0cms/d/file/content/2016/09/57ce1f55689cb.jpg'
            ),
            'basic_info' => array( // 用户信息 - 大多从user_data中取
                'has_checkin' => false, // 签到
                'checkin_serial_day' => 3,
                'vip_remind' => true, // 首次开通会员提示 true提醒 false不提醒
            ),
            'progress_info' => array( // 账户状态
                'progress' => 67,
                'search_status' => 1, // 0当前能被搜索到 1当前不能被搜索到 2曾经被搜索到过
                'tip' => '22',
                'sections' => array( // 不能被学生搜索到时的任务进度
                    'cert' => array( // 身份认证
                        'status' => 1, // 1未提交 2审核中 3通过 4 未通过
                        // 'tip' => '身份认证失败',
                        // 'is_other_finished' => false
                    ),
                    'profile' => array( // 资料设置
                        'status' => 3,
                        // 'tip' => '审核中: 个人标签<br/>待完善: 毕业学校, 头像<br/>审核通过: 昵称, 一句话简介, 过往经历, 教龄',
                        'group_status' => array(
                            '0' => [
                                'skills'
                            ],
                            '1' => [
                                'nickname',
                                'short_introduce',
                                'school_age',
                                'bio'
                            ],
                            '2' => [],
                            '3' => [
                                'graduation_school',
                                'avatar'
                            ],
                            '5' => []
                        )
                    ),
                    'address' => array( // 地址管理
                        'status' => 3,
                        // 'tip' => '',
                        'full_address' => '北京海淀区西二旗-地铁站'
                    ),
                    'course' => array( // 课程设置
                        'status' => 3,
                        /*
                        'tip' => '课程审核中',
                        'group_status' => array(
                            '0' => [
                                array(
                                    'display_name' => '一对一-ewq',
                                    'type' => 1,
                                    'identity' => '48961'
                                ),
                                array(
                                    'display_name' => '一对一-设置一门课程专门为了测试',
                                    'type' => 1,
                                    'identity' => '49015'
                                ),
                                array(
                                    'display_name' => '一对一-随便来个课程',
                                    'type' => 1,
                                    'identity' => '49171'
                                ),
                                array(
                                    'display_name' => '一对一-添加一门课程',
                                    'type' => 1,
                                    'identity' => '49185'
                                )
                            ],
                            '1' => [],
                            '2' => [],
                            '3' => [],
                            '5' => []
                        )*/
                    ),
                    'verify_phone' => array( // 电话审核
                        'status' => 3, // 1未提交 2审核中 3通过 4 未通过
                        // 'tip' => '电话审核通过',
                        'reasons' => array()
                    )
                ),
                'is_checked' => 0, // 是否检测过 0未检测过 1检测过
                'check_score' => 100, // 检测分数
                'check_item' => array( // 检测项目
                    array(
                        'static_desc' => '您的照片少于4张',
                        'href_desc' => '去上传',
                        'href_url' => '#'
                    ),
                    array(
                        'static_desc' => '缺少视频',
                        'href_desc' => '去上传',
                        'href_url' => '#'
                    ),
                    array(
                        'static_desc' => '真实评价少于50条',
                        'href_desc' => '开课招生源并建议学生写评价',
                        'href_url' => '#'
                    ),
                    array(
                        'static_desc' => '静态描述',
                        'href_desc' => '点击描述',
                        'href_url' => '跳转链接'
                    )
                )
            ),
            'backlog' => array( // 待办事项
                'schedule' => array(
                    'wait_start' => 2,
                    'wait_confirm' => 23
                ),
                'student' => array(
                    'student_num' => 123,
                ),
                'order' => array(
                    'wait_pay' => 123,
                    'underway' => 23,
                    'wait_comment' => 234
                ),
                'course' => array(
                    'underway' => 12,
                    'editing' => 234,
                    'refuse' => 234,
                    'refuse_type' => 'one2one' // 审核被拒的课程类型：one2one一对一 class班课 video视频课
                )
            ),
            'statistic' => array( // 数据统计
                'visitors' => array(
                    'today' => 4324,
                    'week' => 432,
                    'history' => 233
                ),
                'pv' => array(
                    'daily' => 10,
                    'today' => 23
                ),
                'rank' => array(
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
                    "results" => array(
                        "380" => array(
                            "rank" => 0,
                            "rank_score" => 0,
                            "sub_name" => "加拿大",
                            "remark" => "北京加拿大排名"
                        ),
                        "493" => array(
                            "rank" => 0,
                            "rank_score" => 0,
                            "sub_name" => "注册会计师",
                            "remark" => "北京注册会计师排名"
                        ),
                        "856" => array(
                            "rank" => 1,
                            "rank_score" => 0.5,
                            "sub_name" => "刑法",
                            "remark" => "北京刑法排名"
                        ),
                        "1108" => array(
                            "rank" => 1,
                            "rank_score" => 0.96,
                            "sub_name" => "大学专业课",
                            "remark" => "北京大学专业课排名"
                        ),
                        "1117" => array(
                            "rank" => 5,
                            "rank_score" => 0.78,
                            "sub_name" => "魔方",
                            "remark" => "北京魔方排名"
                        ),
                        "1205" => array(
                            "rank" => 1,
                            "rank_score" => 0,
                            "sub_name" => "形体礼仪",
                            "remark" => "北京形体礼仪排名"
                        )
                    )
                ),
                'cash' => array(
                    'balance' => 432.4,
                    'expect' => 432,
                    'total' => 2332
                )
            ),
            'dialog_reminding' => array( // 通用弹窗数据
                'key' => '3db5fdadbdd2e942bfaf3a0b3fee7856', // 唯一识别弹窗，不再提醒使用
                'title' => '支付手续费收费告知：',
                'width' => 390,
                'content' => '为了更好地规范交易秩序，跟谁学平台将对2016年4月15日24:00后支付的订单，代第三方支付渠道对老师（机构）收取学生实际支付金额0.7%的支付手续费，请点击查看详情。',
                'url' => 'http://www.baidu.com'
            )

        )
    )
);
