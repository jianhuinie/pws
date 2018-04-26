<?php

require("../bootstrap.php");

render(
    'pay/fenqi',
    array(
        "tpl_data" => array(

            "purchase_id" => "1116101368619953",
            "purchase_money" => 100,
            "plat_fee" => "10.00",
            "fenqi_total_money" => 110,
            "course_type" => "1",
            "course_number" => "362465956177",
            "course_name" => "爵士舞",
            "fenqi_pay_list" => array(
                "huabai" => array(
                    "action" => "huabai",
                    "pay_type" => 40,
                    "icon" => "dddddd"
                )
            ),
            "purchase_type" => "11",
            "fenqi_detail" => array(
                array(
                    "fenqi_total_money" => 1120,
                    "plat_fee" => 10.00,
                    "fenqi_need_all_money" => 1111,
                    "fenqi_need_all_rate_fee" => 0.98,
                    "every_periods_repayment" => 100,
                    "detail" => array(
                        array(
                            "money" => 100,
                            "fee_money" => "3",
                            "deadline" => "2016-10-10"
                        ),
                        array(
                            "money" => 100,
                            "fee_money" => "3",
                            "deadline" => "2016-10-10"
                        ),
                        array(
                            "money" => 100,
                            "fee_money" => "3",
                            "deadline" => "2016-10-10"
                        )
                    ),
                    "periods" => 12,
                    "every_period_fee" => "10",
                    "total_fee" => "120"
                ),
                array(
                    "fenqi_total_money" => 1060,
                    "plat_fee" => 11.00,
                    "fenqi_need_all_money" => 1121,
                    "fenqi_need_all_rate_fee" => 0.38,
                    "every_periods_repayment" => 100,
                    "detail" => array(
                        array(
                            "money" => 100,
                            "fee_money" => "3",
                            "deadline" => "2016-10-10"
                        ),
                        array(
                            "money" => 100,
                            "fee_money" => "3",
                            "deadline" => "2016-10-10"
                        ),
                        array(
                            "money" => 100,
                            "fee_money" => "3",
                            "deadline" => "2016-10-10"
                        )
                    ),
                    "periods" => 6,
                    "every_period_fee" => "10",
                    "total_fee" => "60"
                ),
                array(
                    "fenqi_total_money" => 1030,
                    "plat_fee" => 12.00,
                    "fenqi_need_all_money" => 1141,
                    "fenqi_need_all_rate_fee" => 0.48,
                    "every_periods_repayment" => 100,
                    "detail" => array(
                        array(
                            "money" => 100,
                            "fee_money" => "3",
                            "deadline" => "2016-10-10"
                        ),
                        array(
                            "money" => 100,
                            "fee_money" => "3",
                            "deadline" => "2016-10-10"
                        ),
                        array(
                            "money" => 100,
                            "fee_money" => "3",
                            "deadline" => "2016-10-10"
                        )
                    ),
                    "periods" => 3,
                    "every_period_fee" => "10",
                    "total_fee" => "30"
                )
            ),
            "chosed_fenqi_type" => array(
                "fenqi_total_money" => 1010,
                "plat_fee" => 10.00,
                "fenqi_need_all_money" => 1111,
                "fenqi_need_all_rate_fee" => 0.98,
                "every_periods_repayment" => 100,
                "detail" => array(
                    array(
                        "money" => 100,
                        "fee_money" => "3",
                        "deadline" => "2016-10-10"
                    ),
                    array(
                        "money" => 100,
                        "fee_money" => "3",
                        "deadline" => "2016-10-10"
                    ),
                    array(
                        "money" => 100,
                        "fee_money" => "3",
                        "deadline" => "2016-10-10"
                    )
                ),
                "periods" => 3,
                "every_period_fee" => "10",
                "total_fee" => "10"
            ),
            "can_use_fenqi" => false,
            'fenqi_message' => 'aaa'
        )
    )
);

