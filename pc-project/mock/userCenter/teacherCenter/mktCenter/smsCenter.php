<?php

/**
 * @file 老师-营销中心-短信中心
 * @author chenmo
 * @date 16/4/14
 */


require("../../../bootstrap.php");


render(
    "userCenter/teacherCenter/mktCenter/smsCenter",
    array(
        "tpl_data" => array(
            'account' => array(
                'left_count' => 90,
                'status' => "0"
            ),
            'records' => array(
                array(
                    'op_type' => '11',
                    'name' => '托福口语技巧详解',
                    'status' => 1,
                    'create_time' => '2016-04-25 09:48:40',
                    'op_count' => 1000,
                    'op_info' => '上课通知(云端录制课)',
                    'succ_count' => '20',
                    'fail_count' => '0'
                ),
                array(
                        'op_type' => '11',
                        'name' => '托福口语技巧详解',
                        'status' => 0,
                        'create_time' => '2016-04-25 09:48:40',
                        'op_count' => null,
                        'op_info' => '上课通知(云端录制课)',
                        'succ_count' => '',
                        'fail_count' => ''
                ),
                 array(
                        'op_type' => '11',
                        'name' => '托福口语技巧详解',
                        'status' => 2,
                        'create_time' => '2016-04-25 09:48:40',
                        'op_count' => null,
                        'op_info' => '上课通知(云端录制课)',
                        'succ_count' => '',
                        'fail_count' => ''
                ),
                array(
                    'op_type' => '1',
                    'name' => '',
                    'status' => 0,
                    'create_time' => '2016-04-25 09:48:40',
                    'op_count' => 1000,
                    'succ_count' => '0',
                    'fail_count' => '2',
                    'op_info' => '短信充值'
                ),
                array(
                    'op_type' => '2',
                    'name' => '',
                    'status' => 0,
                    'create_time' => '2016-04-25 09:48:40',
                    'op_count' => 1000,
                    'op_info' => '免费送一条',
                    'succ_count' => '20',
                    'fail_count' => '2'
                )

            ),
            'pager' => [
                'total' => 11,
                'page' => 1,
                'page_size' => 10
            ]
        )
    )
);