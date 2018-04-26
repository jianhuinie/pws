<?php

require("../bootstrap.php");

// 我的学生 - 获取该学生可领取的优惠券列表
if (isset($_GET['student_number'])) {
    render(
        "teacher_center/usableCoupons",
        array(
            "tpl_data" => array(
                "join_org" => true, // 是否是机构老师
                "coupons" => array( // 优惠券列表
                    array(
                        'serial_num' => '11',
                        'coupon_code' => 'ac2b4ce0817bc9921fb459da5ec52be2', // 券code
                        'balance' => 2000, // 面额
                        'effect_time' => 1431408453, // 生效时间
                        'expire_time' => 1431409453, // 失效时间
                        'cond_threshold' => 100000, // 满减阈值(0为无限制，100表示订单大于100元可以使用)
                        'max_recv_count' => 1, // 每人限领1张
                        'recv_count' => 1000, // 已领取
                        'total_count' => 1000, // 共发送
                        'sync' => false, // 同步到老师主页
                        'remark' => '一二三四五六七八九十一二三四五', // 备注
                        'status' => 0, // 优惠券状态（0未生效 1已生效 2已失效 3冻结 4下线 5已领完）
                        'qr_url' => 'http://img.genshuixue.com/123.jpeg', // 二维码地址
                        'dt_url' => 'http://img.genshuixue.com/123.jpeg' // 查看优惠券页面
                    ),
                    array(
                        'serial_num' => '22',
                        'coupon_code' => 'ac2b4ce0817bc9921fb459da5ec52be2', // 券code
                        'balance' => 50, // 面额
                        'effect_time' => 1431408453, // 生效时间
                        'expire_time' => 1431409453, // 失效时间
                        'cond_threshold' => 100, // 满减阈值(0为无限制，100表示订单大于100元可以使用)
                        'max_recv_count' => 1, // 每人限领1张
                        'recv_count' => 30, // 已领取
                        'total_count' => 100, // 共发送
                        'sync' => true, // 同步到老师主页
                        'remark' => '暑期风暴', // 备注
                        'status' => 1, // 优惠券状态（0未生效 1已生效 2已失效 3冻结 4下线 5已领完）
                        'qr_url' => 'http://img.genshuixue.com/123.jpeg', // 二维码地址
                        'dt_url' => 'http://img.genshuixue.com/123.jpeg' // 查看优惠券页面
                    ),
                    array(
                        'serial_num' => '33',
                        'coupon_code' => 'ac2b4ce0817bc9921fb459da5ec52be2', // 券code
                        'balance' => 50, // 面额
                        'effect_time' => 1431408453, // 生效时间
                        'expire_time' => 1431409453, // 失效时间
                        'cond_threshold' => 100, // 满减阈值(0为无限制，100表示订单大于100元可以使用)
                        'max_recv_count' => 1, // 每人限领1张
                        'recv_count' => 40, // 已领取
                        'total_count' => 100, // 共发送
                        'sync' => true, // 同步到老师主页
                        'remark' => '暑期风暴', // 备注
                        'status' => 2, // 优惠券状态（0未生效 1已生效 2已失效 3冻结 4下线 5已领完）
                        'qr_url' => 'http://img.genshuixue.com/123.jpeg', // 二维码地址
                        'dt_url' => 'http://img.genshuixue.com/123.jpeg' // 查看优惠券页面
                    ),
                    array(
                        'serial_num' => '44',
                        'coupon_code' => 'ac2b4ce0817bc9921fb459da5ec52be2', // 券code
                        'balance' => 50, // 面额
                        'effect_time' => 1431408453, // 生效时间
                        'expire_time' => 1431409453, // 失效时间
                        'cond_threshold' => 100, // 满减阈值(0为无限制，100表示订单大于100元可以使用)
                        'max_recv_count' => 1, // 每人限领1张
                        'recv_count' => 50, // 已领取
                        'total_count' => 100, // 共发送
                        'sync' => true, // 同步到老师主页
                        'remark' => '暑期风暴', // 备注
                        'status' => 3, // 优惠券状态（0未生效 1已生效 2已失效 3冻结 4下线 5已领完）
                        'qr_url' => 'http://img.genshuixue.com/123.jpeg', // 二维码地址
                        'dt_url' => 'http://img.genshuixue.com/123.jpeg' // 查看优惠券页面
                    ),
                    array(
                        'serial_num' => '55',
                        'coupon_code' => 'ac2b4ce0817bc9921fb459da5ec52be2', // 券code
                        'balance' => 50, // 面额
                        'effect_time' => 1431408453, // 生效时间
                        'expire_time' => 1431409453, // 失效时间
                        'cond_threshold' => 100, // 满减阈值(0为无限制，100表示订单大于100元可以使用)
                        'max_recv_count' => 1, // 每人限领1张
                        'recv_count' => 60, // 已领取
                        'total_count' => 100, // 共发送
                        'sync' => true, // 同步到老师主页
                        'remark' => '暑期风暴', // 备注
                        'status' => 4, // 优惠券状态（0未生效 1已生效 2已失效 3冻结 4下线 5已领完）
                        'qr_url' => 'http://img.genshuixue.com/123.jpeg', // 二维码地址
                        'dt_url' => 'http://img.genshuixue.com/123.jpeg' // 查看优惠券页面
                    )

                ),
                'pager'=>array( // 分页
                    'count' => 58,
                    'page' => 3,
                    'page_size' => 20
                )
            )
        )
    );
}

// 营销中心 - 获取老师全部的优惠券列表
else {
    render(
        "teacher_center/myCoupons",
        array(
            "tpl_data" => array(
                'today_count' => 9, // 今天已创建的优惠券数量
                "has_sync" => 3, // 发到机构主页的优惠券数量
                'join_org' => false, // 是否是机构老师
                'org_name' => '汇聚名家', // 机构名
                'org_url' => 'http://www.baidu.com/', // 机构主页链接
                "coupons" => array( // 优惠券列表
                    array(
                        'serial_num' => '11',
                        'coupon_code' => 'ac2b4ce0817bc9921fb459da5ec52be2', // 券code
                        'balance' => 2000, // 面额
                        'effect_time' => 1431408453, // 生效时间
                        'expire_time' => 1431409453, // 失效时间
                        'cond_threshold' => 100000.09, // 满减阈值(0为无限制，100表示订单大于100元可以使用)
                        'max_recv_count' => 1, // 每人限领1张
                        'recv_count' => 1000, // 已领取
                        'total_count' => 1000, // 共发送
                        'used_num' => 5,  // 已使用优惠券数量
                        'unused_num' => 6, // 未使用优惠券数量
                        'expired_num' => 7, // 已过期优惠券数量
                        'sync' => false, // 同步到老师主页
                        'remark' => '一二三四五六七八九十一二三四五', // 备注
                        'status' => 5, // 优惠券状态（0未生效 1已生效 2已失效 3冻结 4下线 5已领完）
                        'qr_url' => 'http://img.genshuixue.com/123.jpeg', // 二维码地址
                        'dt_url' => 'http://img.genshuixue.com/123.jpeg' // 查看优惠券页面
                    ),
                    array(
                        'serial_num' => '9',
                        'coupon_code' => 'ac2b4ce0817bc9921fb459da5ec52be2', // 券code
                        'balance' => 50, // 面额
                        'effect_time' => 1431408453, // 生效时间
                        'expire_time' => 1431409453, // 失效时间
                        'cond_threshold' => 100000.00, // 满减阈值(0为无限制，100表示订单大于100元可以使用)
                        'max_recv_count' => 1, // 每人限领1张
                        'recv_count' => 30, // 已领取
                        'total_count' => 100, // 共发送
                        'used_num' => 5,  // 已使用优惠券数量
                        'unused_num' => 6, // 未使用优惠券数量
                        'expired_num' => 7, // 已过期优惠券数量
                        'sync' => true, // 同步到老师主页
                        'remark' => '500元面值，有效期5与2012从前', // 备注
                        'status' => 1, // 优惠券状态（0未生效 1已生效 2已失效 3冻结 4下线 5已领完）
                        'qr_url' => 'http://img.genshuixue.com/123.jpeg', // 二维码地址
                        'dt_url' => 'http://img.genshuixue.com/123.jpeg' // 查看优惠券页面
                    ),
                    array(
                        'serial_num' => '9',
                        'coupon_code' => 'ac2b4ce0817bc9921fb459da5ec52be2', // 券code
                        'balance' => 50, // 面额
                        'effect_time' => 1431408453, // 生效时间
                        'expire_time' => 1431409453, // 失效时间
                        'cond_threshold' => 100, // 满减阈值(0为无限制，100表示订单大于100元可以使用)
                        'max_recv_count' => 1, // 每人限领1张
                        'recv_count' => 40, // 已领取
                        'total_count' => 100, // 共发送
                        'used_num' => 5,  // 已使用优惠券数量
                        'unused_num' => 6, // 未使用优惠券数量
                        'expired_num' => 7, // 已过期优惠券数量
                        'sync' => true, // 同步到老师主页
                        'remark' => '暑期风暴', // 备注
                        'status' => 2, // 优惠券状态（0未生效 1已生效 2已失效 3冻结 4下线 5已领完）
                        'qr_url' => 'http://img.genshuixue.com/123.jpeg', // 二维码地址
                        'dt_url' => 'http://img.genshuixue.com/123.jpeg' // 查看优惠券页面
                    ),
                    array(
                        'serial_num' => '9',
                        'coupon_code' => 'ac2b4ce0817bc9921fb459da5ec52be2', // 券code
                        'balance' => 50, // 面额
                        'effect_time' => 1431408453, // 生效时间
                        'expire_time' => 1431409453, // 失效时间
                        'cond_threshold' => 100, // 满减阈值(0为无限制，100表示订单大于100元可以使用)
                        'max_recv_count' => 1, // 每人限领1张
                        'recv_count' => 50, // 已领取
                        'total_count' => 100, // 共发送
                        'used_num' => 5,  // 已使用优惠券数量
                        'unused_num' => 6, // 未使用优惠券数量
                        'expired_num' => 7, // 已过期优惠券数量
                        'sync' => true, // 同步到老师主页
                        'remark' => '暑期风暴', // 备注
                        'status' => 3, // 优惠券状态（0未生效 1已生效 2已失效 3冻结 4下线 5已领完）
                        'qr_url' => 'http://img.genshuixue.com/123.jpeg', // 二维码地址
                        'dt_url' => 'http://img.genshuixue.com/123.jpeg' // 查看优惠券页面
                    ),
                    array(
                        'serial_num' => '9',
                        'coupon_code' => 'ac2b4ce0817bc9921fb459da5ec52be2', // 券code
                        'balance' => 50, // 面额
                        'effect_time' => 1431408453, // 生效时间
                        'expire_time' => 1431409453, // 失效时间
                        'cond_threshold' => 100, // 满减阈值(0为无限制，100表示订单大于100元可以使用)
                        'max_recv_count' => 1, // 每人限领1张
                        'recv_count' => 60, // 已领取
                        'total_count' => 100, // 共发送
                        'used_num' => 5,  // 已使用优惠券数量
                        'unused_num' => 6, // 未使用优惠券数量
                        'expired_num' => 7, // 已过期优惠券数量
                        'sync' => true, // 同步到老师主页
                        'remark' => '暑期风暴', // 备注
                        'status' => 4, // 优惠券状态（0未生效 1已生效 2已失效 3冻结 4下线 5已领完）
                        'qr_url' => 'http://img.genshuixue.com/123.jpeg', // 二维码地址
                        'dt_url' => 'http://img.genshuixue.com/123.jpeg' // 查看优惠券页面
                    )

                ),
                'pager'=>array( // 分页
                    'count' => 58,
                    'page' => 3,
                    'page_size' => 20
                ),

            )
        )
    );
}
