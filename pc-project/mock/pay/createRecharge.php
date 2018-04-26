<?php

$response = array(
    'code' => 0,
    'data' => array(
        'pay_url' => "https://mapi.alipay.com/gateway.do?_input_charset=utf-8&defaultbank=CMB&it_b_pay=3m&notify_url=http%3A%2F%2F127.0.0.1%3A8080%2Fpay%2FalipayNotify&out_trade_no=114082537085712&partner=2088511644400960&payment_type=1&return_url=http%3A%2F%2F127.0.0.1%3A8080%2Fpay%2FalipayReturn&seller_email=ranhongran%40163.com&service=create_direct_pay_by_user&subject=course&total_fee=0.1&sign=8c3b77289c2d5488fe49fbfcf195d848&sign_type=MD5",

        'purchase_id' => 1
    )
);

echo json_encode($response);