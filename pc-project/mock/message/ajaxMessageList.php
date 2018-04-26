<?php
require("../bootstrap.php");

// $tpl = 'common/center/component/userMessage';
// $tpl = 'common/center/component/messageList';
$tpl = 'message/common/messageList';


$response = array(
    "code" => 0,
    "data" => array(
        "tpl" => array(
            "message_list" => fetch(
                $tpl,
                array(
                    "tpl_data" => array(
                        "sys_messages" => array(
                            "list" => array(
                                array(
                                    "msg_id" => "45159",
                                    "msg" => "曾经有一条珍贵的信息发送到我的邮箱，我没有好好查收，等到我看到它的时候，我才知道，优惠券已经过期了，如果上天再给我一次机会，我会对那条信息说，我想立马查收你，如果给这个动作一个响应时间，我希望是一瞬间！",
                                    "ext_date" => "2010-10-10",
                                    "ext_type" => "订单",
                                    "ext_info" => array( // 调起im
                                        "c_id" => '3123124234', // 用户number
                                        "c_role" => 0, // c_role(0老师 2学生 6机构)
                                        "group_id" => 4362874
                                    )
                                ),
                                array(
                                    "msg_id" => "45159",
                                    "msg" => "曾经有一条珍贵的信息发送到我的邮箱，我没有好好查收，等到我看到它的时候，我才知道，优惠券已经过期了，如果上天再给我一次机会，我会对那条信息说，我想立马查收你，如果给这个动作一个响应时间，我希望是一瞬间！",
                                    "ext_date" => "2010-10-10",
                                    "ext_type" => "订单",
                                    "ext_info" => null
                                )
                            )
                        ),
                        "forum_messages" => [
                            "list" => [
                                [
                                    "msg_id" => 1,
                                    "type" => 101,     // 101：主帖被评论，102：主帖被赞，201：评论被回复，202：评论被赞，301：回复被回复
                                    "user_name" => '孙立军',   // 来源用户姓名
                                    "ext_name" => '怎么学好数学',    // 帖子标题
                                    "ext_type" => "评论",
                                    "ext_url" => "https://www.genshuixue.com/student_center/cash",
                                    "ext_date" => '2015-09-20 21:05:16'
                                ],
                                [
                                    "msg_id" => 2,
                                    "type" => 102,     // 101：主帖被评论，102：主帖被赞，201：评论被回复，202：评论被赞，301：回复被回复
                                    "user_name" => '孙立军',   // 来源用户姓名
                                    "user_role" => 2,         // 来源用户角色
                                    "avatar"    => 'http://img.genshuixue.com/x.jpeg', // 来源用户头像
                                    "ext_name" => '怎么学好数学',    // 帖子标题
                                    "ext_type" => "点赞",
                                    "ext_url" => "https://www.genshuixue.com/student_center/cash",
                                    "ext_date" => '2015-09-20 21:05:16'
                                ],
                                [
                                    "msg_id" => 3,
                                    "type" => 201,     // 101：主帖被评论，102：主帖被赞，201：评论被回复，202：评论被赞，301：回复被回复
                                    "user_name" => '孙立军',   // 来源用户姓名
                                    "ext_name" => '怎么学好数学',    // 帖子标题
                                    "ext_type" => "回复",
                                    "ext_url" => "https://www.genshuixue.com/student_center/cash",
                                    "ext_date" => '2015-09-20 21:05:16'
                                ],
                                [
                                    "msg_id" => 4,
                                    "type" => 202,     // 101：主帖被评论，102：主帖被赞，201：评论被回复，202：评论被赞，301：回复被回复
                                    "user_name" => '孙立军',   // 来源用户姓名
                                    "user_role" => 2,         // 来源用户角色
                                    "avatar" => 'http://img.genshuixue.com/x.jpeg', // 来源用户头像
                                    "ext_name" => '怎么学好数学', // 帖子标题
                                    "ext_type" => "点赞",
                                    "ext_url" => "https://www.genshuixue.com/student_center/cash",
                                    "ext_date" => '2015-09-20 21:05:16'
                                ],
                                [
                                    "msg_id" => 5,
                                    "type" => 301,     // 101：主帖被评论，102：主帖被赞，201：评论被回复，202：评论被赞，301：回复被回复
                                    "user_name" => '孙立军',   // 来源用户姓名
                                    "ext_name" => '怎么学好数学',    // 帖子标题
                                    "ext_type" => "回复",
                                    "ext_url" => "https://www.genshuixue.com/student_center/cash",
                                    "ext_date" => '2015-09-20 21:05:16'
                                ],
                                [
                                    "msg_id" => 6,
                                    "type" => 401,     // 401：主帖被加精，402：主帖被置顶，403：主帖被举报删除，404：举报无效，405：主帖删除后恢复 501：用户被封禁，502：解除封禁，503：任命版主/超管，504：拒绝版主申请
                                    "ext_name" => '怎么学好数学',    // 帖子标题
                                    "ext_type" => "评论",
                                    "ext_url" => "https://www.genshuixue.com/student_center/cash",
                                    "ext_date" => '2015-09-20 21:05:16'
                                ],
                                [
                                    "msg_id" => 7,
                                    "type" => 402,     // 401：主帖被加精，402：主帖被置顶，403：主帖被举报删除，404：举报无效，405：主帖删除后恢复 501：用户被封禁，502：解除封禁，503：任命版主/超管，504：拒绝版主申请
                                    "ext_name" => '怎么学好数学',    // 帖子标题
                                    "ext_type" => "系统",
                                    "ext_url" => "https://www.genshuixue.com/student_center/cash",
                                    "ext_date" => '2015-09-20 21:05:16'
                                ],
                                [
                                    "msg_id" => 8,
                                    "type" => 403,     // 401：主帖被加精，402：主帖被置顶，403：主帖被举报删除，404：举报无效，405：主帖删除后恢复 501：用户被封禁，502：解除封禁，503：任命版主/超管，504：拒绝版主申请
                                    "user_name" => '举报人姓名',   // 举报人姓名
                                    "ext_name" => '怎么',    // 帖子标题
                                    "ext_type" => "系统",
                                    "reason" => "sdsds",
                                    "ext_url" => "https://www.genshuixue.com/student_center/cash",
                                    "ext_date" => '2015-09-20 21:05:16'
                                ],
                                [
                                    "msg_id" => 9,
                                    "type" => 404,     // 401：主帖被加精，402：主帖被置顶，403：主帖被举报删除，404：举报无效，405：主帖删除后恢复 501：用户被封禁，502：解除封禁，503：任命版主/超管，504：拒绝版主申请
                                    "ext_name" => '怎么学好数学',    // 帖子标题
                                    "ext_type" => "系统",
                                    "ext_url" => "https://www.genshuixue.com/student_center/cash",
                                    "ext_date" => '2015-09-20 21:05:16'
                                ],
                                [
                                    "msg_id" => 10,
                                    "type" => 405,     // 401：主帖被加精，402：主帖被置顶，403：主帖被举报删除，404：举报无效，405：主帖删除后恢复 501：用户被封禁，502：解除封禁，503：任命版主/超管，504：拒绝版主申请
                                    "ext_name" => '怎么学好数学',    // 帖子标题
                                    "ext_type" => "系统",
                                    "ext_url" => "https://www.genshuixue.com/student_center/cash",
                                    "ext_date" => '2015-09-20 21:05:16'
                                ],
                                [
                                    "msg_id" => 11,
                                    "type" => 501,     // 401：主帖被加精，402：主帖被置顶，403：主帖被举报删除，404：举报无效，405：主帖删除后恢复 501：用户被封禁，502：解除封禁，503：任命版主/超管，504：拒绝版主申请
                                    "ext_name" => '雅思学习', // 小组名称,
                                    "baned_days" => 10,    // 封禁天数
                                    "ext_type" => "评论",
                                    "ext_url" => "https://www.genshuixue.com/student_center/cash",
                                    "ext_date" => '2015-09-20 21:05:16',
                                    "banned_days" => '3'
                                ],
                                [
                                    "msg_id" => 12,
                                    "type" => 502,     // 401：主帖被加精，402：主帖被置顶，403：主帖被举报删
                                    "ext_name" => '雅思学习', // 小组名称,
                                    "ext_type" => "系统",
                                    "ext_url" => "https://www.genshuixue.com/student_center/cash",
                                    "ext_date" => '2015-09-20 21:05:16'
                                ],
                                [
                                    "msg_id" => 13,
                                    "type" => 503,     // 401：主帖被加精，402：主帖被置顶，403：主帖被举报删除，404：举报无效，405：主帖删除后恢复 501：用户被封禁，502：解除封禁，503：任命版主/超管，504：拒绝版主申请
                                    "ext_name" => '雅思学习', // 小组名称,
                                    "ext_type" => "系统",
                                    "ext_url" => "https://www.genshuixue.com/student_center/cash",
                                    "ext_date" => '2015-09-20 21:05:16'
                                ],
                                [
                                    "msg_id" => 14,
                                    "type" => 504,     // 401：主帖被加精，402：主帖被置顶，403：主帖被举报删除，404：举报无效，405：主帖删除后恢复 501：用户被封禁，502：解除封禁，503：任命版主/超管，505：拒绝版主申请
                                    "ext_name" => '雅思学习', // 小组名称,
                                    "ext_type" => "系统",
                                    "ext_url" => "https://www.genshuixue.com/student_center/cash",
                                    "ext_date" => '2015-09-20 21:05:16'
                                ]
                            ]
                        ],
                        "pager" => array(
                            "count" => 136,
                            "page" => 6,
                            "page_size" => 10,
                            "total_page" => 2
                        )
                    )
                )
            )
        )
    )
);

echo json_encode($response);