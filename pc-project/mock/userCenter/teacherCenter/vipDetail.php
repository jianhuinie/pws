<?php

require('../../bootstrap.php');

render(
    'userCenter/teacherCenter/vipCenter/vipDetail',
    // 'userCenter/teacherCenter/vipCenter/orgVipDetail', 废掉了～
    array(
        'tpl_data' => array(
            "vip_type" => 0
        )
    )
);
