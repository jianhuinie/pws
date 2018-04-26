<?php

require("../bootstrap.php");

render(
    "teacher_center/certification",
    array(
        "tpl_data" => array(
            "certs" => array(
                // 其他认证
                "other" => array(
                    "id" => null,
                    "user_id" => null,
                    "create_time" => null,
                    "update_time" => null,
                    "verify_time" => null,
                    "type" => 0,
                    "typename" => null,
                    "idnumber" => null,
                    "verify_status" => null,
                    "reasons" => array(
                        "未通过原因一：人傻",
                        "未通过原因二：钱多",
                        "未通过原因三：速来"
                    ),
                    "storage_id" => null,
                    "name" => null,
                    "additional_imga_id" => null,
                    "additional_imgb_id" => null
                ),

                // 身份认证
                "id_card" => array(
                    "id" => '',
                    "user_id" => null,
                    "create_time" => null,
                    "update_time" => null,
                    "verify_time" => null,
                    "type" => 1,
                    "typename" => null,
                    "idnumber" => "130123198811281869",
                    "verify_status" => 2, // 0审核中 1已通过 2未通过
                    "reasons" => array(
                        "未通过原因一：人傻",
                        "未通过原因二：钱多",
                        "未通过原因三：速来"
                    ),
                    "storage_id" => "123",
                    "name" => "王余洁",
                    "url" => "http://test-img.gsxservice.com/6669_c97m9u44.jpg",
                    "additional_imga_id" => null,
                    "additional_imgb_id" => null
                ),

                // 护照认证
                "id_passport" => array(
                    "id" => '123',
                    "user_id" => null,
                    "create_time" => null,
                    "update_time" => null,
                    "verify_time" => null,
                    "type" => 6,
                    "typename" => null,
                    "idnumber" => "130123198811281869",
                    "verify_status" => 2, // 0审核中 1已通过 2未通过
                    "reasons" => array(
                        "未通过原因一：人傻",
                        "未通过原因二：钱多",
                        "未通过原因三：速来"
                    ),
                    "storage_id" => "123",
                    "name" => "王余洁",
                    "url" => "http://test-img.gsxservice.com/6669_c97m9u44.jpg",
                    "additional_imga_id" => null,
                    "additional_imgb_id" => null
                ),

                // 学历认证
                "student_card" => array(
                    "id" => '',
                    "user_id" => null,
                    "create_time" => null,
                    "update_time" => null,
                    "verify_time" => null,
                    "type" => 3,
                    "typename" => null,
                    "idnumber" => null,
                    "verify_status" => 2,
                    "reasons" => array(
                        "未通过原因一：人傻",
                        "未通过原因二：钱多",
                        "未通过原因三：速来"
                    ),
                    "storage_id" => null,
                    "name" => null,
                    "url" => "http://test-img.gsxservice.com/5327_fvd7f3aw.jpeg",
                    "additional_imga_id" => null,
                    "additional_imgb_id" => null
                ),

                // 教师证认证
                "teacher_certificate" => array(
                    "id" => 1,
                    "user_id" => "53",
                    "create_time" => "2014-09-11 11:39:46",
                    "update_time" => "2014-09-11 11:39:46",
                    "verify_time" => null,
                    "type" => 2,
                    "typename" => null,
                    "idnumber" => null,
                    "verify_status" => 2,
                    "reasons" => array(
                        "未通过原因一：人傻",
                        "未通过原因二：钱多",
                        "未通过原因三：速来"
                    ),
                    "storage_id" => "1",
                    "name" => null,
                    "url" => "http://test-img.gsxservice.com/5327_fvd7f3aw.jpeg",
                    "additional_imga_id" => null,
                    "additional_imgb_id" => null
                ),

                // 专业资质认证
                "professional_certificate" => array(
                    "id" => 2,
                    "user_id" => "53",
                    "create_time" => "2014-09-11 11:39:46",
                    "update_time" => "2014-09-11 11:39:46",
                    "verify_time" => null,
                    "type" => 5,
                    "typename" => null,
                    "idnumber" => null,
                    "verify_status" => 2,
                    "reasons" => array(
                        "未通过原因一：人傻",
                        "未通过原因二：钱多",
                        "未通过原因三：速来"
                    ),
                    "storage_id" => "1",
                    "name" => null,
                    "url" => "http://test-img.gsxservice.com/5327_fvd7f3aw.jpeg",
                    "additional_imga_id" => null,
                    "additional_imgb_id" => null
                ),

                // 机构认证
                "agency_permit" => array(
                    "id" => "73",
                    "user_id" => "53",
                    "create_time" => "2014-09-11 11:39:46",
                    "update_time" => "2014-09-11 11:39:46",
                    "verify_time" => null,
                    "type" => 4,
                    "typename" => null,
                    "idnumber" => null,
                    "verify_status" => "1",
                    "reasons" => array(
                        "未通过原因一：人傻",
                        "未通过原因二：钱多",
                        "未通过原因三：速来"
                    ),
                    "storage_id" => "1",
                    "name" => null,
                    "url" => "http://test-img.gsxservice.com/5327_fvd7f3aw.jpeg",
                    "additional_imga_id" => null,
                    "additional_imgb_id" => null
                )

            )
        )
    )
);