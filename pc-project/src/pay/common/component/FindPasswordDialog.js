/**
 * @file 找回支付密码对话框
 * @author zhujialu
 */
define(function (require, exports) {

    'use strict';

    var Dialog = require('cobble/ui/Dialog');
    var Validator = require('cobble/form/Validator');
    var etpl = require('cobble/util/etpl');

    var form = require('common/form');
    var service = require('common/service');
    var SetPasswordDialog = require('./SetPasswordDialog');
    var CodeButton = require('common/component/CodeButton');

    /**
     * 找回支付密码对话框
     *
     * @constructor
     * @param {Object} options
     * @property {string} options.mobile 手机号
     * @property {Function=} options.onSuccess 密码成功重置后的回调
     */
    function FindPasswordDialog(options) {
        $.extend(this, options);
        this.init();
    }

    FindPasswordDialog.prototype = {

        init: function () {

            var me = this;
            var mobile = this.mobile;

            var dialog = new Dialog({
                title: '找回密码',
                content: render({ mobile: mobile }),
                width: 480,
                onBeforeHide: function () {
                    this.element.off();
                }
            });

            var element = dialog.element;

            var validator = new Validator({
                element: element,
                fields: {
                    code: {
                        errors: {
                            required: '请输入验证码'
                        }
                    }
                }
            })

            var codeBtn = new CodeButton({
                element: element.find('.btn-info'),
                send: function () {
                    return service
                    .getSMSCode({
                        mobile: mobile
                    });
                }
            });


            element
            .on('click', '.btn-primary', function () {

                if (validator.validate()) {

                    service
                    .verifyNormalSMSCode(form.parse(element))
                    .done(function (response) {
                        if (response.code === 0) {
                            dialog.hide();
                            new SetPasswordDialog({
                                onSuccess: me.onSuccess
                            });
                        }
                    });

                }

            });
        }
    };

    var render = etpl.compile(
          '<div class="form form-find-password">'
        +     '<div class="form-group">'
        +         '<label class="form-label">手机号码：</label>'
        +         '<div class="form-controls">'
        +             '<span class="form-static">${mobile}</span>'
        +             '<input type="hidden" name="mobile" value="${mobile}" />'
        +         '</div>'
        +     '</div>'
        +     '<div class="form-group">'
        +         '<label class="form-label">验证码：</label>'
        +         '<div class="form-controls">'
        +             '<input class="form-text" type="text" name="code" required />'
        +             '<div class="form-inline">'
        +                 '<button class="btn btn-info">获取验证码</button>'
        +             '</div>'
        +             '<span class="error"></span>'
        +         '</div>'
        +     '</div>'
        +     '<div class="form-action">'
        +         '<button class="btn btn-primary">下一步</button>'
        +     '</div>'
        + '</div>'
    );

    return FindPasswordDialog;

});