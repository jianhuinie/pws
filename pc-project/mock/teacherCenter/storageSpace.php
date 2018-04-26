<?php

require("../bootstrap.php");

render(
    "teacher_center/storageSpace",
    array(
        "tpl_data" => array(
            "is_org_teacher" => false, // 是否允许购买，机构老师不允许
            "quota_used" => 8769030, // 已使用空间，单位字节
            "new_expire_time" => '2017-03-24', // 本次购买空间有效期
            "quota_total" => 1073741824, // 最大容量，单位GB，单位字节
            "vip_level" => 2, // 0非会员 1普通会员 2高级会员 3超级会员
            "discount" => 8.8, // 享受折扣 10,无折扣
            "unit_price" => 0.01, // 单价
            "price_difference" => 0.01 // 差价，之前无购买，即为0
        )
    )
);
