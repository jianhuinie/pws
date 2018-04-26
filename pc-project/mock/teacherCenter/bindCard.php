<?php

require("../bootstrap.php");

render(
    "teacher_center/bindCard",
    [
        "tpl_data" => [
            "user_name" => "哈哈",
/*            "card_owner_name" => "xxx",
            "bank_no" => 'CMB',
            "region" => '广东_广州_增城',
            "card_open_location" => "asdasdasd",
            "card_num" => '6624123421312312'*/
            "notice" => "公告啦啦啦啦啦啦啦",
            "card_list" => [
                [
                    "card_id" => "1201",
                    "card_no" => "**2023",
                    "card_no_mask_mid" => "6214********2023",
                    "bank_no" => "CMB",
                    "card_type" => "D",
                    "owner_mobile" => "13031615371",
                    "owner_name" => "郭绍民",
                    "card_exp" => false,
                    "unique_id" => "798a65c9958ec2f0354ad441ce516b9d",
                    "pay_day" => 20000,
                    "pay_each" => 20000,
                    "pay_fast" => true,
                    "use_passwd" => 1
                ],
                [
                    "card_id" => "1202",
                    "card_no" => "**2023",
                    "card_no_mask_mid" => "6214********2023",
                    "bank_no" => "CMB",
                    "card_type" => "D",
                    "owner_mobile" => "13031615371",
                    "owner_name" => "郭绍民",
                    "card_exp" => false,
                    "unique_id" => "798a65c9958ec2f0354ad441ce516b9d",
                    "pay_day" => 20000,
                    "pay_each" => 20000,
                    "pay_fast" => true,
                    "use_passwd" => 1
                ],
                [
                    "card_id" => "1203",
                    "card_no" => "**2023",
                    "card_no_mask_mid" => "6214********2023",
                    "bank_no" => "CMB",
                    "card_type" => "D",
                    "owner_mobile" => "13031615371",
                    "owner_name" => "郭绍民",
                    "card_exp" => false,
                    "unique_id" => "798a65c9958ec2f0354ad441ce516b9d",
                    "pay_day" => 20000,
                    "pay_each" => 20000,
                    "pay_fast" => true,
                    "use_passwd" => 1
                ],
                [
                    "card_id" => "1204",
                    "card_no" => "**2023",
                    "card_no_mask_mid" => "6214********2023",
                    "bank_no" => "CMB",
                    "card_type" => "D",
                    "owner_mobile" => "13031615371",
                    "owner_name" => "郭绍民",
                    "card_exp" => false,
                    "unique_id" => "798a65c9958ec2f0354ad441ce516b9d",
                    "pay_day" => 20000,
                    "pay_each" => 20000,
                    "pay_fast" => true,
                    "use_passwd" => 1
                ]
            ],
            "bank_list" => [
                [
                    "name" => "招商银行",
                    "code" => "ABC",
                    "pay_fast" => 1
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
