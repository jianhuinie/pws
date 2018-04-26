<?php

$action = $_GET['action'];

switch ($action) {
    case 'verifymobile':
        # 发送手机验证码
        $response = array(
            "code" => 0,
            "data" => '手机验证码发送成功'
        );
        break;

    case 'verifyemail':
        # 发送邮箱验证码
        $response = array(
            "code" => 0,
            "data" => '邮箱验证码发送成功'
        );
        break;

    case 'savenewpwd':
        # 保存登录密码
        $response = array(
            "code" => 0,
            "data" => '登录密码修改成功'
        );
        break;

    case 'savephone':
        # 保存手机绑定
        $response = array(
            "code" => 0,
            "data" => '手机绑定成功'
        );
        break;

    case 'saveemail':
        # 首次保存邮箱绑定
        $response = array(
            "code" => 0,
            "data" => '邮箱绑定成功'
        );
        break;

    case 'savenewemail':
        # 修改保存邮箱绑定
        $response = array(
            "code" => 0,
            "data" => '绑定邮箱修改成功'
        );
        break;

    default:
        # code...
        $response = array(
            "code" => 0,
            "data" => '保存成功'
        );
        break;
}

echo json_encode($response);




