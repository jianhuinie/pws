<?php

require("../bootstrap.php");

render(
    "teacher_center/certification/identity",
    array(
        "tpl_data" => array(
            "id" => 123, // 证件不存在null
            "user_id" => null,
            "create_time" => null,
            "update_time" => null,
            "verify_time" => null,
            "type" => 6, // 1身份证认证 6护照认证
            "typename" => null,
            "idnumber" => "130123198811281869",
            "verify_status" => 2, // 0审核中 1已通过 2未通过
            "reasons" => array(
                "storage_id" => array(
                    'if not now, when?',
                    'if not here, where?',
                    'if not you, who?'
                ),
                "additional_imga_id" => array(
                    'if not now, when?',
                    'if not here, where?',
                    'if not you, who?'
                ),
                "additional_imgb_id" => array(
                    'if not now, when?',
                    'if not here, where?',
                    'if not you, who?'
                )
            ),
            "name" => "王余洁",
            "storage_id" => "123",
            "url" => "http://test-img.gsxservice.com/6669_c97m9u44.jpg",
            "additional_imga_id" => "321",
            "additional_imga_url" => "",
            "additional_imgb_id" => "1234567",
            "additional_imgb_url" => "http://test-img.gsxservice.com/178763_ewhyebfl.jpeg"
        )
    )
);