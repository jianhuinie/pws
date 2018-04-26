/**
 * @file   app登陆中间页
 * @author hurry
 * @data   2017/2/10
 * @description 
 *     url: http://m.genshuixue.com/static/common/login/index
 *     @params {string} directUrl 登陆成功后重定向的url，需要做encode处理
 */
define(function(require, exports) {
    'use strict';

    var app = require('common/app');
    var env = require('util/env');
    var user = require('common/user');

    return function (scriptData) {
        gsx_ready(function (config) {
            if (config.user) {
                // 登陆
                location.href = decodeURIComponent(scriptData.url);
                return;
            }
            if(app.isApp()) {
                user.loginStudent();
            }
            else {
                location.href = '/static/login?next=' + encodeURIComponent(scriptData.url);
            }
        });
    };
});