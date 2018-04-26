/**
 * @file 发送邀请码对话框
 * @author zhujialu
 */
define(function (require, exports) {

    'use strict';

    var service = require('../service');
    var constant = require('../constant');

    var ractiveDialog = require('../function/ractiveDialog');

    /**
     * @constructor
     * @param {Object} options
     * @property {string} options.userType constant 中的 USER_TYPE_XX
     * @property {boolean} options.needNext 后续是否需要跳转
     * @property {string=} options.next 后续跳转地址，不传使用接口返回的地址
     * @property {Function} options.onsuccess
     * @property {Function} options.onfail
     */
    function InviteDialog (options) {
        $.extend(this, options);
        this.init();
    };

    InviteDialog.prototype = {

        init: function () {

            var me = this;

            var userType = me.userType;
            var formData = me.formData;

            var onsuccess = me.onsuccess;
            var onfail = me.onfail;

            var needNext = me.needNext;
            var next = me.next;

            var dialog = ractiveDialog({
                template: require('html!./InviteDialog.html'),
                data: {
                    codeInputOptions: {
                        name: 'code',
                        value: '',
                        className: 'code-input'
                    },
                    style: require('text!./InviteDialog.styl')
                },
                components: {
                    Input: require('../component/Input')
                },
                onrender: function () {

                },
                submit: function () {

                    var me = this;

                    service
                    .sendInviteCode({
                        inviteCode: me.get('codeInputOptions.value'),
                        role: userType,
                        formData: formData
                    })
                    .then(function (response) {

                        if ($.isFunction(onsuccess)) {
                            onsuccess();
                        }

                        if (needNext) {
                            setTimeout(
                                function () {
                                    if (userType == constant.USER_TYPE_STUDENT) {
                                        location.href = next || response.data.url;
                                    }
                                },
                                5500
                            );
                        }

                    }, onfail);
                },
                cancel: function () {
                    dialog.hide();
                }
            });

        }

    };

    return InviteDialog;

});