<?php

require("../bootstrap.php");

render(
    "teacher_center/bindCard",
    [
        "tpl_data" => [
            "notice" => "公告啦啦啦啦啦啦啦",
            "card_list" => [
                [
                    "card_id" => "1069",
                    "card_no" => "**2429",
                    "card_no_mask_mid" => "4392********2429",
                    "card_name" => "CMB",
                    "card_type" => "C",
                    "owner_mobile" => "13552611815",
                    "owner_name" => "王小岗",
                    "card_exp" => false,
                    "unique_id" => "b0a9dcf7a841405000f524c7d4b7bfaf",
                    "pay_day" => 30000,
                    "pay_each" => 30000,
                    "pay_flag" => "1",
                    "use_passwd" => 1
                ],
                [
                    "card_id" => "1068",
                    "card_no" => "**2429",
                    "card_no_mask_mid" => "4392********2429",
                    "card_name" => "CMB",
                    "card_type" => "C",
                    "owner_mobile" => "13552611815",
                    "owner_name" => "王小岗",
                    "card_exp" => false,
                    "unique_id" => "b0a9dcf7a841405000f524c7d4b7bfaf",
                    "pay_day" => 30000,
                    "pay_each" => 30000,
                    "pay_flag" => "1",
                    "use_passwd" => 1
                ]
            ],
            "user_info" => [
              "name" => "王老师",
              "mobile" => "13512345678",
              "is_pass_verify" => true,
              "id_number" => "11011319851220134x",
              "is_passport" => 0
            ]
        ]
    ]
);
