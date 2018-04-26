<?php

require('../../bootstrap.php');

render(
    // 'userCenter/teacherCenter/vipCenter/orgVipCenter',
    'userCenter/teacherCenter/vipCenter/vipCenter',
    array(
        'tpl_data' => array(
            'vip_1' => array(
                'total_remain_days' => 111,
                'renew_support' => true
            ),
            'vip_2' => array(
                'total_remain_days' => 222,
                'renew_support' => true
            ),
            'vip_3' => array(
                'total_remain_days' => 333,
                'renew_support' => true
            ),
        )
    )
);
