<?php

require("../bootstrap.php");

render(
    "teacher_center/courseCombo",
    array(
        "tpl_data" => array(

            "combo_quota" => 4,
            "combo_list" => array(
                array(
                    "id" => "628",
                    "name" => "试听课程，为学生提供试听机会哈哈哈哈哈哈哈",
                    "description" => null,
                    "hours" => 2,
                    "discount" => 0.5,
                    "verify_status" => 0, // 0审核中 1通过 2未通过
                    "reasons" => array(
                        "未通过原因一：人傻",
                        "未通过原因二：钱多",
                        "未通过原因三：速来"
                    )
                ),
                array(
                    "id" => "628",
                    "name" => "试听课程，为学生提供试听机会哈哈哈哈哈哈哈",
                    "description" => null,
                    "hours" => 2,
                    "discount" => 0.5,
                    "verify_status" => 0, // 0审核中 1通过 2未通过
                    "reasons" => array(
                        "未通过原因一：人傻",
                        "未通过原因二：钱多",
                        "未通过原因三：速来"
                    )
                ),
                array(
                    "id" => "628",
                    "name" => "试听课程，为学生提供试听机会哈哈哈哈哈哈哈",
                    "description" => null,
                    "hours" => 2,
                    "discount" => 0.5,
                    "verify_status" => 0, // 0审核中 1通过 2未通过
                    "reasons" => array(
                        "未通过原因一：人傻",
                        "未通过原因二：钱多",
                        "未通过原因三：速来"
                    )
                )
            )


        )
    )
);

