/**
 * @file 老师不能发起约课 对话框
 * @author zhangjiayi
 */
define(function (require, exports) {

    'use strict';

    var service = require('common/service');
    var InviteResultDialog = require('./InviteResultDialog');

    /**
     * @constructor
     * @param {Object} options
     * @property {string} options.text 提示话术
     * @property {string} options.next 后续跳转url, '0'代表不跳转
     * @property {Function} options.onSuccess 成功后执行的回调函数
     * @property {Object=} options.switchRoleData 切换身份需要上送的data
     */
    function BanLessonDialog (options) {
        $.extend(this, BanLessonDialog.defaultOptions, options);
        this.init();
    }

    BanLessonDialog.prototype = {

        init: function () {

            var me = this;
            var next = me.next;

            alert({
                title: '温馨提示',
                content: me.text,
                width: 420,
                buttons: [
                    {
                        text: me.noskip ? '确认' : (me.hasStudentRole ? '切换身份' : '立即开通'),
                        type: 'primary',
                        handler: function () {
                            this.hide();
                            submit();
                        }
                    },
                    {
                        text: '取消',
                        handler: function () {
                            this.hide();
                            if ($.isFunction(me.onCancel)) {
                                me.onCancel();
                            }
                        }
                    }
                ]
            });

            var submit = function (e) {

                var switchToStudentRole = function (isInvite) {
                    service
                    .sendInviteCode({
                        role: 2,
                        formData: isInvite ? me.switchRoleData : null
                    })
                    .done(function (response) {
                        var callback = function () {

                            if ($.isFunction(me.onSuccess)) {
                                me.onSuccess();
                            }

                            // 跳转URL
                            if (!next) {
                                window.location.href = response.data.url;
                            }
                            else if (next !== '0') {
                                window.location.href = next;
                            }
                        }

                        if (response.code === 0) {
                            if (isInvite) {
                                new InviteResultDialog({
                                    userType: 0,
                                    status: 'succ',
                                    onAfterHide: callback
                                });
                            }
                            else {
                                callback();
                            }
                        }
                        else {
                            if (isInvite) {
                                new InviteResultDialog({
                                    userType: 0,
                                    status: 'err'
                                });
                            }
                            else {
                                alert('数据正在维护！');
                            }
                        }
                    });
                }

                if (me.hasStudentRole) {
                    switchToStudentRole();
                }
                else {
                    switchToStudentRole(true); // 后续要处理倒计时
                }
            };
        }

    }

    BanLessonDialog.defaultOptions = {
        hasStudentRole: false
    };

    return BanLessonDialog;

});