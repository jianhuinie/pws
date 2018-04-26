/**
 * @file 切换身份 对话框
 * @author zhujialu
 */
define(function (require, exports) {

    'use strict';

    var service = require('common/service');
    var store = require('common/store');
    var InviteResultDialog = require('./InviteResultDialog');

    var instances = [];

    /**
     * @constructor
     * @param {Object} options
     * @property {string} options.createText 开通身份的话术，一般根据使用场景传
     * @property {string} options.switchText 切换身份的话术，一般根据使用场景传
     * @property {string} options.switchTo 需要切换的身份，teacher 或 student
     * @property {Function} options.onSuccess 成功后执行的回调函数
     */
    function SwitchRoleDialog (options) {

        // 避免连续点击，出现多个
        if (instances.length > 0) {
            return;
        }

        $.extend(this, SwitchRoleDialog.defaultOptions, options);
        this.init();

        instances.push(this);
    }

    SwitchRoleDialog.prototype = {

        init: function () {

            var me = this;

            service
            .getUserType()
            .done(function (response) {

                instances.length = 0;

                if (response.code === 0) {

                    var role = me.switchTo === 'teacher'
                             ? ROLE_TEACHER
                             : ROLE_STUDENT;

                    // 转成字符串比较
                    role = '' + role;

                    var roles = response.data.roles;
                    if ($.inArray(role, roles) > -1) {
                        me.confirm(true);
                    }
                    else {
                        me.confirm(false);
                    }
                }
            });

        },

        /**
         * 确认开通身份
         */
        confirm: function (created) {

            var me = this;

            var text = created ? '切换' : '开通';

            alert({
                title: '温馨提示',
                content: created ? me.switchText : me.createText,
                width: 420,
                buttons: [
                    {
                        text: text,
                        type: 'primary',
                        handler: function () {

                            if (created) {
                                me.switchRole();
                            }
                            else {
                                me.createRole();
                            }

                            this.hide();
                        }
                    },
                    {
                        text: '不' + text,
                        handler: function () {
                            this.hide();
                        }
                    }
                ]
            });
        },

        createRole: function () {

            var me = this;
            var user = store.get('user');
            var role = me.switchTo === 'student'
                    ? ROLE_STUDENT
                    : ROLE_TEACHER;

            service
            .switchRole({
                role: role
            })
            .done(function (response) {
                if (response.code === 0) {
                    new InviteResultDialog({
                        userType: user.type,
                        status: 'succ',
                        onAfterHide: function () {
                            me.switchComplete(
                                response.data.url
                            );
                        }
                    });
                }
                else {
                    new InviteResultDialog({
                        userType: user.type,
                        status: 'err',
                    });
                }
            });

        },

        switchRole: function () {

            var me = this;

            var role = me.switchTo === 'student'
                    ? ROLE_STUDENT
                    : ROLE_TEACHER;

            service
            .switchRole({
                role: role
            })
            .done(function (response) {

                if (response.code === 0) {
                    success(
                        '切换身份成功',
                        function () {
                            me.switchComplete(
                                response.data.url
                            );
                        }
                    );
                }

                else {
                    success(
                        '切换身份失败，请稍候...',
                        function () {
                            me.switchComplete();
                        }
                    );
                }
            });

        },

        switchComplete: function (url) {

            var me = this;

            if ($.isFunction(me.onSuccess)) {
                me.onSuccess({
                    next: url
                });
            }
        }

    };

    var ROLE_STUDENT = 2;
    var ROLE_TEACHER = 0;

    SwitchRoleDialog.defaultOptions = {

    };

    return SwitchRoleDialog;

});