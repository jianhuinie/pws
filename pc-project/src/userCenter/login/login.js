/**
 * @file 汇课间登录
 * @author wangtianhua
 */
define(function(require, exports, module) {

    'use strict';

    var Validator = require('custom/form/Validator');
    var service = require('./service');

    exports.init = function(data) {

        var ractive = new Ractive({
            el: '#container',
            template: require('html!./login.html'),
            data: {
                rootUrl: siteData.source + '/userCenter/login/img',
                mobileInputOptions: {
                    name: 'mobile',
                    placeholder: '请输入手机号',
                    autofocus: true,
                    className: 'text-input'
                },
                passwordInputOptions: {
                    name: 'password',
                    placeholder: '请输入密码',
                    type: 'password',
                    className: 'text-input'
                },
                usertype: 2,
                rememberMe: true,
                submiting: false,
            },
            components: {
                Input: require('userCenter/common/component/Input'),
                CodeButton: require('userCenter/common/component/CodeButton')
            },
            onrender: function () {
                var me = this;
                me.validator = new Validator({
                    mainElement: $(this.getElement()),
                    fields: {
                        mobile: {
                            rules: {
                                required: true,
                                pattern: 'mobile'
                            },
                            errors: {
                                required: '请输入手机号',
                                pattern: '请输入正确的手机号'
                            }
                        },
                        password: {
                            rules: {
                                required: true,
                            },
                            errors: {
                                required: '请输入密码'
                            }
                        }
                    }
                });
            },
            switchtype: function (value) {
                var me = this;
                me.set('usertype', value);
            },
            login: function () {
                var me = this;
                if (!me.validator.validate(['mobile', 'password'])) {
                    return;
                }
                service
                .loginByPassword({
                    mobile: $.trim(me.get('mobileInputOptions.value')),
                    password: $.trim(me.get('passwordInputOptions.value')),
                    rememberMe: me.get('rememberMe'),
                    userType: me.get('usertype')
                })
                .then(function (response) {
                    tip({
                        type: 'success',
                        content: '登录成功，正在跳转...',
                        modal: true
                    })
                    .then(function () {
                        location.href = response.data.url;
                    });
                });
            }
        });
    };

});