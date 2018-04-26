/**
 * @file 汇课间登录
 * @author wangtianhua
 */
define(function (require, exports, module) {

    'use strict';

    var service = require('userCenter/common/service');

    /**
     * 汇课间 - 学生登录
     * @param {Object} data
     * @param {string} data.mobile 电话
     * @param {string} data.password 密码
     * @param {string} data.user_type 用户类型
     * @param {string} data.remember_me 记住我
     * @return {Promise}
     */
    exports.loginByPassword = function (data) {
        return service.post(
            '/auth/new_login_ajax',
            {
                user_name: data.mobile,
                password: data.password,
                user_type: data.userType,
                remember_me: data.rememberMe
            }
        );
    };


});