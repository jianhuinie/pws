<?php

$response = array(
    'code' => '110000',
    'msg' => '银行卡信息或手机号不正确，请核对后重新输入。手机号是办理该银行卡时所填写的手机号码，没有预留、手机号忘记或者已停用，请联系银行客服更新处理。'
);

echo json_encode($response);
