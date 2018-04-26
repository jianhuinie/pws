<?php

require("../bootstrap.php");

render(
    "rave/index",
    array(
        "tpl_data" => array(
            "info" => array(
                "on" => false,
                "curr_hour" => 16,
                "curr_time" => 1434010474000,
                "start_time" => 1434420000000,
                "count" => 0,
                "url" => array(
                    "main" => "http://616.genshuixue.com",
                    "sub" => "http://616.genshuixue.com/sub?"
                )
            ),
            "seckill" => array(
                array(
                    "info" => array(
                        "time" => "10:00-10:30",
                        "hour" => 10,
                        "start_time" => 1432260000000,
                        "end_time" => 1432261800000
                    ),
                    "courses" => array(
                        array(
                            "number" => "150516545618",
                            "price" => "100.00",
                            "original_price" => "300.00",
                            "max_student" => "100",
                            "cover" => array(
                                "pk" => 5232,
                                "url" => "http://test-img.gsxservice.com/6593_q41sitps.jpeg",
                                "width" => 150,
                                "height" => 150
                            ),
                            "name" => "c++",
                            "arrangement" => "每周2节",
                            "des" => "描述",
                            "total_pay" => 0,
                            "teacher_name" => "测试老师名称"
                        ),
                        array(
                            "number" => "150516481750",
                            "price" => "1.00",
                            "original_price" => "0.00",
                            "max_student" => "1",
                            "cover" => array(
                                "pk" => 5230,
                                "url" => "http://test-img.gsxservice.com/6591_vxcdwz56.jpeg",
                                "width" => 3264,
                                "height" => 2448
                            ),
                            "name" => "吉他课程02",
                            "arrangement" => "发发发发的发的",
                            "total_pay" => 0,
                            "teacher_name" => "测试老师名称"
                        ),
                        array(
                            "number" => "150516481746",
                            "price" => "1.00",
                            "original_price" => "0.00",
                            "max_student" => "1",
                            "cover" => array(
                                "pk" => 5228,
                                "url" => "http://test-img.gsxservice.com/6497_z5vofdxk.jpeg",
                                "width" => 5760,
                                "height" => 3840
                            ),
                            "name" => "吉他课程03",
                            "arrangement" => "发发发发的发的",
                            "total_pay" => 0,
                            "teacher_name" => "测试老师名称"
                        ),
                        array(
                            "number" => "150516481622",
                            "price" => "1.00",
                            "original_price" => "0.00",
                            "max_student" => "1",
                            "cover" => array(
                                "pk" => 5226,
                                "url" => "http://test-img.gsxservice.com/6488_n3dp9zkb.jpeg",
                                "width" => 150,
                                "height" => 150
                            ),
                            "name" => "吉他课程04",
                            "arrangement" => "发发发发的发的",
                            "total_pay" => 0,
                            "teacher_name" => "测试老师名称"
                        )
                    )
                ),
                array(
                    "info" => array(
                        "time" => "11:00-11:30",
                        "hour" => 11,
                        "count" => 1
                    ),
                    "courses" => array(
                       array(
                            "number" => "150516545618",
                            "price" => "100.00",
                            "original_price" => "300.00",
                            "max_student" => "100",
                            "cover" => array(
                                "pk" => 5232,
                                "url" => "http://test-img.gsxservice.com/6593_q41sitps.jpeg",
                                "width" => 150,
                                "height" => 150
                            ),
                            "name" => "c++",
                            "arrangement" => "每周2节",
                            "total_pay" => 0,
                            "teacher_name" => "测试老师名称"
                        ),
                        array(
                            "number" => "150516481750",
                            "price" => "1.00",
                            "original_price" => "0.00",
                            "max_student" => "1",
                            "cover" => array(
                                "pk" => 5230,
                                "url" => "http://test-img.gsxservice.com/6591_vxcdwz56.jpeg",
                                "width" => 3264,
                                "height" => 2448
                            ),
                            "name" => "吉他课程02",
                            "arrangement" => "发发发发的发的",
                            "total_pay" => 0,
                            "teacher_name" => "测试老师名称"
                        ),
                        array(
                            "number" => "150516481746",
                            "price" => "1.00",
                            "original_price" => "0.00",
                            "max_student" => "1",
                            "cover" => array(
                                "pk" => 5228,
                                "url" => "http://test-img.gsxservice.com/6497_z5vofdxk.jpeg",
                                "width" => 5760,
                                "height" => 3840
                            ),
                            "name" => "吉他课程02",
                            "arrangement" => "发发发发的发的",
                            "total_pay" => 0,
                            "teacher_name" => "测试老师名称"
                        ),
                        array(
                            "number" => "150516481622",
                            "price" => "1.00",
                            "original_price" => "0.00",
                            "max_student" => "1",
                            "cover" => array(
                                "pk" => 5226,
                                "url" => "http://test-img.gsxservice.com/6488_n3dp9zkb.jpeg",
                                "width" => 2448,
                                "height" => 3264
                            ),
                            "name" => "吉他课程02",
                            "arrangement" => "发发发发的发的",
                            "total_pay" => 0,
                            "teacher_name" => "测试老师名称"
                        )
                    )
                ),
                array(
                    "info" => array(
                        "time" => "12:00-12:30",
                        "hour" => 12,
                        "count" => 100
                    ),
                    "courses" => array(
                       array(
                            "number" => "150516545618",
                            "price" => "100.00",
                            "original_price" => "300.00",
                            "max_student" => "100",
                            "cover" => array(
                                "pk" => 5232,
                                "url" => "http://test-img.gsxservice.com/6593_q41sitps.jpeg",
                                "width" => 3264,
                                "height" => 2448
                            ),
                            "name" => "c++",
                            "arrangement" => "每周2节",
                            "total_pay" => 0,
                            "teacher_name" => "测试老师名称"
                        ),
                        array(
                            "number" => "150516481750",
                            "price" => "1.00",
                            "original_price" => "0.00",
                            "max_student" => "1",
                            "cover" => array(
                                "pk" => 5230,
                                "url" => "http://test-img.gsxservice.com/6591_vxcdwz56.jpeg",
                                "width" => 3264,
                                "height" => 2448
                            ),
                            "name" => "吉他课程02",
                            "arrangement" => "发发发发的发的",
                            "total_pay" => 0,
                            "teacher_name" => "测试老师名称"
                        ),
                        array(
                            "number" => "150516481746",
                            "price" => "1.00",
                            "original_price" => "0.00",
                            "max_student" => "1",
                            "cover" => array(
                                "pk" => 5228,
                                "url" => "http://test-img.gsxservice.com/6497_z5vofdxk.jpeg",
                                "width" => 5760,
                                "height" => 3840
                            ),
                            "name" => "吉他课程02",
                            "arrangement" => "发发发发的发的",
                            "total_pay" => 0,
                            "teacher_name" => "测试老师名称"
                        ),
                        array(
                            "number" => "150516481622",
                            "price" => "1.00",
                            "original_price" => "0.00",
                            "max_student" => "1",
                            "cover" => array(
                                "pk" => 5226,
                                "url" => "http://test-img.gsxservice.com/6488_n3dp9zkb.jpeg",
                                "width" => 2448,
                                "height" => 3264
                            ),
                            "name" => "吉他课程02",
                            "arrangement" => "发发发发的发的",
                            "total_pay" => 0,
                            "teacher_name" => "测试老师名称"
                        )
                    )
                )
            ),
            "coupon" => array(
                array(
                    "info" => array(
                        "title" => "名师V1",
                        "category" => "msydy",
                        "type" => 2,// 1老师 2机构
                        "key" => "birthday_all_hdzy_yhq_msydy"
                    ),
                    "coupons" => array(
                        array(
                            "avatar" => "http://test-img.gsxservice.com/345379_mr0xi21c.jpeg",
                            "number" => "2363634",
                            "display_name" => "机构1",
                            "subject" => "你好收到",
                            "type" => 2, //1是老师 2是机构
                            "coupon" => array(
                                array(
                                    "serial_num" => "273627423434",
                                    "value" => "10.0",
                                    "cond_threshold" => 100,
                                    "available" => true
                                ),
                                array(
                                    "serial_num" => "273627423434",
                                    "value" => "10.0",
                                    "cond_threshold" => 100,
                                    "available" => true
                                ),
                                array(
                                    "serial_num" => "273627423434",
                                    "value" => "10.0",
                                    "cond_threshold" => 100,
                                    "available" => true
                                ),
                                array(
                                    "serial_num" => "273627423434",
                                    "value" => "10.0",
                                    "cond_threshold" => 1000,
                                    "available" => false
                                )
                            ),
                            "available" => true, //是否还有优惠劵
                            "value" => 10 //当前有效的优惠劵面值
                        ),
                        array(
                            "avatar" => "http://test-img.gsxservice.com/345379_mr0xi21c.jpeg",
                            "display_name" => "机构2",
                            "number" => "236323",
                            "type" => 2,
                            "coupon" => array(
                                array(
                                    "serial_num" => "92836423743",
                                    "value" => "10.0",
                                    "cond_threshold" => 100,
                                    "available" => true
                                ),
                                array(
                                    "serial_num" => "92836423743",
                                    "value" => "10.0",
                                    "cond_threshold" => 100,
                                    "available" => true
                                ),
                                array(
                                    "serial_num" => "92836423743",
                                    "value" => "10.0",
                                    "cond_threshold" => 100,
                                    "available" => true
                                )
                            ),
                            "available" => true,
                            "value" => 10
                        ),
                        array(
                            "avatar" => "http://test-img.gsxservice.com/345379_mr0xi21c.jpeg",
                            "display_name" => "机构2",
                            "number" => "236323",
                            "coupon" => array(
                                array(
                                    "serial_num" => "92836423743",
                                    "value" => "10.0",
                                    "cond_threshold" => 100,
                                    "available" => true
                                ),
                                array(
                                    "serial_num" => "92836423743",
                                    "value" => "10.0",
                                    "cond_threshold" => 100,
                                    "available" => true
                                )
                            ),
                            "available" => true,
                            "value" => 10
                        ),
                        array(
                            "avatar" => "http://test-img.gsxservice.com/345379_mr0xi21c.jpeg",
                            "display_name" => "机构2",
                            "number" => "236323",
                            "coupon" => array(
                                array(
                                    "serial_num" => "92836423743",
                                    "value" => "10.0",
                                    "cond_threshold" => 100,
                                    "available" => true
                                )
                            ),
                            "available" => true,
                            "value" => 10
                        ),
                        array(
                            "avatar" => "http://test-img.gsxservice.com/345379_mr0xi21c.jpeg",
                            "display_name" => "机构2",
                            "number" => "236323",
                            "coupon" => array(
                                array(
                                    "serial_num" => "92836423743",
                                    "value" => "10.0",
                                    "cond_threshold" => 100,
                                    "available" => true
                                )
                            ),
                            "available" => true,
                            "value" => 10
                        ),
                        array(
                            "avatar" => "http://test-img.gsxservice.com/345379_mr0xi21c.jpeg",
                            "number" => "2363634",
                            "display_name" => "机构1",
                            "type" => 1, //1是老师 2是机构
                            "coupon" => array(
                                array(
                                    "serial_num" => "273627423434",
                                    "value" => "10.0",
                                    "cond_threshold" => 100,
                                    "available" => true
                                ),
                                array(
                                    "serial_num" => "273627423434",
                                    "value" => "10.0",
                                    "cond_threshold" => 1000,
                                    "available" => false
                                )
                            ),
                            "available" => true, //是否还有优惠劵
                            "value" => 10 //当前有效的优惠劵面值
                        ),
                        array(
                            "avatar" => "http://test-img.gsxservice.com/345379_mr0xi21c.jpeg",
                            "display_name" => "机构2",
                            "number" => "236323",
                            "coupon" => array(
                                array(
                                    "serial_num" => "92836423743",
                                    "value" => "10.0",
                                    "cond_threshold" => 100,
                                    "available" => true
                                )
                            ),
                            "available" => true,
                            "value" => 10
                        ),
                        array(
                            "avatar" => "http://test-img.gsxservice.com/345379_mr0xi21c.jpeg",
                            "display_name" => "机构2",
                            "number" => "236323",
                            "coupon" => array(
                                array(
                                    "serial_num" => "92836423743",
                                    "value" => "10.0",
                                    "cond_threshold" => 100,
                                    "available" => true
                                )
                            ),
                            "available" => true,
                            "value" => 10
                        ),
                        array(
                            "avatar" => "http://test-img.gsxservice.com/345379_mr0xi21c.jpeg",
                            "display_name" => "机构2",
                            "number" => "236323",
                            "coupon" => array(
                                array(
                                    "serial_num" => "92836423743",
                                    "value" => "10.0",
                                    "cond_threshold" => 100,
                                    "available" => true
                                )
                            ),
                            "available" => true,
                            "value" => 10
                        ),
                        array(
                            "avatar" => "http://test-img.gsxservice.com/345379_mr0xi21c.jpeg",
                            "display_name" => "机构2",
                            "number" => "236323",
                            "coupon" => array(
                                array(
                                    "serial_num" => "92836423743",
                                    "value" => "10.0",
                                    "cond_threshold" => 100,
                                    "available" => true
                                )
                            ),
                            "available" => true,
                            "value" => 10
                        ),
                        array(
                            "avatar" => "http://test-img.gsxservice.com/345379_mr0xi21c.jpeg",
                            "number" => "2363634",
                            "display_name" => "机构1",
                            "type" => 1, //1是老师 2是机构
                            "coupon" => array(
                                array(
                                    "serial_num" => "273627423434",
                                    "value" => "10.0",
                                    "cond_threshold" => 100,
                                    "available" => true
                                ),
                                array(
                                    "serial_num" => "273627423434",
                                    "value" => "10.0",
                                    "cond_threshold" => 1000,
                                    "available" => false
                                )
                            ),
                            "available" => true, //是否还有优惠劵
                            "value" => 10 //当前有效的优惠劵面值
                        ),
                        array(
                            "avatar" => "http://test-img.gsxservice.com/345379_mr0xi21c.jpeg",
                            "display_name" => "机构2",
                            "number" => "236323",
                            "coupon" => array(
                                array(
                                    "serial_num" => "92836423743",
                                    "value" => "10.0",
                                    "cond_threshold" => 100,
                                    "available" => true
                                )
                            ),
                            "available" => true,
                            "value" => 10
                        ),
                        array(
                            "avatar" => "http://test-img.gsxservice.com/345379_mr0xi21c.jpeg",
                            "display_name" => "机构2",
                            "number" => "236323",
                            "coupon" => array(
                                array(
                                    "serial_num" => "92836423743",
                                    "value" => "10.0",
                                    "cond_threshold" => 100,
                                    "available" => true
                                )
                            ),
                            "available" => true,
                            "value" => 10
                        )
                    )
                ),
                array(
                    "info" => array(
                        "title" => "名师V2",
                        "category" => "msyda",
                        "type" => 1,
                        "key" => "birthday_all_hdzy_yheq_msyda"
                    ),
                    "coupons" => array(
                        array(
                            "avatar" => "http://test-img.gsxservice.com/345379_mr0xi21c.jpeg",
                            "number" => "2363634",
                            "display_name" => "机构测试册是",
                            "subject" => null,
                            "type" => 1,
                            "coupon" => array(
                                array(
                                    "serial_num" => "273627423434",
                                    "value" => "10.0",
                                    "cond_threshold" => 100,
                                    "available" => false
                                )
                            ),
                            "available" => false,
                            "value" => 10
                        ),
                        array(
                            "avatar" => "http://test-img.gsxservice.com/345379_mr0xi21c.jpeg",
                            "display_name" => "机构机构机构",
                            "number" => "236323",
                            "subject" => null,
                            "type" => 1,
                            "coupon" => array(
                                array(
                                    "serial_num" => "92836423743",
                                    "value" => "10.0",
                                    "cond_threshold" => 100,
                                    "available" => true
                                )
                            ),
                            "available" => true,
                            "value" => 10
                        )
                    )
                )
            ),
            "subject" => array(
                array(
                    "info" => array(
                        "title" => '大学专场',
                        "subject" => 'xcgzc',
                        "category" => 'hdzc',
                        "key" => 'birthday_bj_hdzc_dxzc_bpkc'
                    ),
                    "courses" => array(
                        array(
                            "number" => "2346343434",
                            "price" => "100.00",
                            "original_price" => "300.00",
                            "max_student" => "100",
                            "cover" => array(
                                "pk" => 523,
                                "url" => "http://img.gsxservice.com/934475_2muunzbk.png",
                                "width" => 3264,
                                "height" => 2448
                            ),
                            "name" => "c++",
                            "arrangement" => "开课时间：5月22日",
                            "total_pay" => 0,
                            "teacher_name" => "测试老师名称"
                        ),
                        array(
                            "number" => "2346343434",
                            "price" => "100.00",
                            "original_price" => "300.00",
                            "max_student" => "100",
                            "cover" => array(
                                "pk" => 523,
                                "url" => "http://test-img.gsxservice.com/6593_q41sitps.jpeg",
                                "width" => 3264,
                                "height" => 2448
                            ),
                            "name" => "c++",
                            "arrangement" => "开课时间：5月22日",
                            "total_pay" => 100,
                            "teacher_name" => "测试老师名称"
                        ),
                         array(
                            "number" => "2346343434",
                            "price" => "100.00",
                            "original_price" => "300.00",
                            "max_student" => "100",
                            "cover" => array(
                                "pk" => 523,
                                "url" => "http://test-img.gsxservice.com/6593_q41sitps.jpeg",
                                "width" => 3264,
                                "height" => 2448
                            ),
                            "name" => "c++",
                            "arrangement" => "开课时间：5月22日",
                            "total_pay" => 0,
                            "teacher_name" => "测试老师名称"
                        ),
                        array(
                            "number" => "2346343434",
                            "price" => "100.00",
                            "original_price" => "300.00",
                            "max_student" => "100",
                            "cover" => array(
                                "pk" => 523,
                                "url" => "http://test-img.gsxservice.com/6593_q41sitps.jpeg",
                                "width" => 3264,
                                "height" => 2448
                            ),
                            "name" => "c++",
                            "arrangement" => "开课时间：5月22日",
                            "total_pay" => 100,
                            "teacher_name" => "测试老师名称"
                        ),
                         array(
                            "number" => "2346343434",
                            "price" => "100.00",
                            "original_price" => "300.00",
                            "max_student" => "100",
                            "cover" => array(
                                "pk" => 523,
                                "url" => "http://test-img.gsxservice.com/6593_q41sitps.jpeg",
                                "width" => 3264,
                                "height" => 2448
                            ),
                            "name" => "c++",
                            "arrangement" => "开课时间：5月22日",
                            "total_pay" => 0,
                            "teacher_name" => "测试老师名称"
                        ),
                        array(
                            "number" => "2346343434",
                            "price" => "100.00",
                            "original_price" => "300.00",
                            "max_student" => "100",
                            "cover" => array(
                                "pk" => 523,
                                "url" => "http://test-img.gsxservice.com/6593_q41sitps.jpeg",
                                "width" => 3264,
                                "height" => 2448
                            ),
                            "name" => "c++",
                            "arrangement" => "开课时间：5月22日",
                            "total_pay" => 100,
                            "teacher_name" => "测试老师名称"
                        )
                    )
                ),
                array(
                    "info" => array(
                        "title" => '大学专场',
                        "subject" => 'dxzc',
                        "category" => 'hdzc',
                        "key" => 'birthday_bj_hdzc_dxzc_bpkc'
                    ),
                    "courses" => array(
                        array(
                            "number" => "2346343434",
                            "price" => "100.00",
                            "original_price" => "300.00",
                            "max_student" => "100",
                            "cover" => array(
                                "pk" => 523,
                                "url" => "http://test-img.gsxservice.com/6593_q41sitps.jpeg",
                                "width" => 3264,
                                "height" => 2448
                            ),
                            "name" => "c++",
                            "arrangement" => "开课时间：5月22日",
                            "total_pay" => 0,
                            "teacher_name" => "测试老师名称"
                        ),
                        array(
                            "number" => "2346343434",
                            "price" => "100.00",
                            "original_price" => "300.00",
                            "max_student" => "100",
                            "cover" => array(
                                "pk" => 523,
                                "url" => "http://test-img.gsxservice.com/6593_q41sitps.jpeg",
                                "width" => 3264,
                                "height" => 2448
                            ),
                            "name" => "c++",
                            "arrangement" => "开课时间：5月22日",
                            "total_pay" => 100,
                            "teacher_name" => "测试老师名称"
                        )
                    )
                ),
                array(
                    "info" => array(
                        "title" => '大学专场',
                        "subject" => 'ysxqzc',
                        "category" => 'hdzc',
                        "key" => 'birthday_bj_hdzc_dxzc_bpkc'
                    ),
                    "courses" => array(
                        array(
                            "number" => "2346343434",
                            "price" => "100.00",
                            "original_price" => "300.00",
                            "max_student" => "100",
                            "cover" => array(
                                "pk" => 523,
                                "url" => "http://test-img.gsxservice.com/6593_q41sitps.jpeg",
                                "width" => 3264,
                                "height" => 2448
                            ),
                            "name" => "c++",
                            "arrangement" => "开课时间：5月22日",
                            "total_pay" => 0,
                            "teacher_name" => "测试老师名称"
                        ),
                        array(
                            "number" => "2346343434",
                            "price" => "100.00",
                            "original_price" => "300.00",
                            "max_student" => "100",
                            "cover" => array(
                                "pk" => 523,
                                "url" => "http://test-img.gsxservice.com/6593_q41sitps.jpeg",
                                "width" => 3264,
                                "height" => 2448
                            ),
                            "name" => "c++",
                            "arrangement" => "开课时间：5月22日",
                            "total_pay" => 100,
                            "teacher_name" => "测试老师名称"
                        )
                    )
                ),
                array(
                    "info" => array(
                        "title" => '大学专场',
                        "subject" => 'lxzc',
                        "category" => 'hdzc',
                        "key" => 'birthday_bj_hdzc_dxzc_bpkc'
                    ),
                    "courses" => array(
                        array(
                            "number" => "2346343434",
                            "price" => "100.00",
                            "original_price" => "300.00",
                            "max_student" => "100",
                            "cover" => array(
                                "pk" => 523,
                                "url" => "http://test-img.gsxservice.com/6593_q41sitps.jpeg",
                                "width" => 3264,
                                "height" => 2448
                            ),
                            "name" => "c++",
                            "arrangement" => "开课时间：5月22日",
                            "total_pay" => 0,
                            "teacher_name" => "测试老师名称"
                        ),
                        array(
                            "number" => "2346343434",
                            "price" => "100.00",
                            "original_price" => "300.00",
                            "max_student" => "100",
                            "cover" => array(
                                "pk" => 523,
                                "url" => "http://test-img.gsxservice.com/6593_q41sitps.jpeg",
                                "width" => 3264,
                                "height" => 2448
                            ),
                            "name" => "c++",
                            "arrangement" => "开课时间：5月22日",
                            "total_pay" => 100,
                            "teacher_name" => "测试老师名称"
                        )
                    )
                )
            )
        )
    )
);