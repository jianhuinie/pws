<?php

$response = array(
    "code" => 0,
    "data" => array(
        "purchase_money" => "1000",
        "plat_fee_money" => 10,
        "fenqi_total_money" => 1010,
        "fenqi" => array(
            "tag_name" => "免息",
            "tiexi_info" => "3,6",
            "desc" => "可享3期分期付学费"
        ),
        "fenqi_detail" => array(
            array(
                "fenqi_total_money" => 1010,
                "every_periods_repayment" => 70,
                "detail" => array(
                    "money" => 100,
                    "fee_money" => "3",
                    "deadline" => "2016-10-10"
                ),
                "periods" => 12,
                "every_period_fee" => "10",
                "total_fee" => "10"
            ),
            array(
                "fenqi_total_money" => 1010,
                "every_periods_repayment" => 80,
                "detail" => array(
                    "money" => 100,
                    "fee_money" => "3",
                    "deadline" => "2016-10-10"
                ),
                "periods" => 9,
                "every_period_fee" => "10",
                "total_fee" => "10"
            ),
            array(
                "fenqi_total_money" => 1010,
                "every_periods_repayment" => 90,
                "detail" => array(
                    "money" => 100,
                    "fee_money" => "3",
                    "deadline" => "2016-10-10"
                ),
                "periods" => 6,
                "every_period_fee" => "10",
                "total_fee" => "10"
            ),
            array(
                "fenqi_total_money" => 1010,
                "every_periods_repayment" => 100,
                "detail" => array(
                    "money" => 100,
                    "fee_money" => "3",
                    "deadline" => "2016-10-10"
                ),
                "periods" => 3,
                "every_period_fee" => "10",
                "total_fee" => "10"
            )
        )
    )
);

echo json_encode($response);