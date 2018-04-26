define(function (require, exports) {

    'use strict';

    var Dialog = require('cobble/ui/Dialog');
    var Validator = require('cobble/form/Validator');
    var SaveButton = require('common/component/SaveButton');
    var form = require('common/form');
    var service = require('common/service');

    /**
     * 解绑银行卡对话框
     * @param {string} options.bankCardId 银行卡 ID
     * @param {Function=} options.onSuccess 成功后的回调
     */
    function UnbindCardDialog(options) {
        $.extend(this, options);
        this.init();
    }

    UnbindCardDialog.prototype = {
        init: function () {

            var me = this;

            var content = ''
                +   '<div>请输入支付密码</div>'
                +   '<form class="form">'
                +       '<div class="form-group">'
                +           '<div class="form-controls">'
                +               '<input class="form-text" type="password" name="pay_password" required minlength="6" maxlength="6" pattern="^\\s*\\d{6}\\s*$">'
                +               '<span class="error"></span>'
                +           '</div>'
                +       '</div>'
                +       '<div class="form-action">'
                +           '<button type="submit" class="btn-primary">确定</button>'
                +       '</div>'
                +       '<div class="form-hint forget">'
                +           '<a href="/static/forget_pay_password" target="_blank">忘记支付密码</a>'
                +       '</div>'
                +   '</form>'

            var dialog = new Dialog({
                title: '温馨提示',
                content: content,
                skinClass: 'unbind-dialog',
                width: 300,
                onBeforeHide: function () {
                    this.element.off();
                }
            });

            var element = dialog.element;
            var formElement = element.find('.form');

            var validator = new Validator({
                element: element.find('.form'),
                realtime: true,
                fields: {
                    pay_password: {
                        errors: {
                            required: '请输入支付密码',
                            minlength: '支付密码要求是 6 位数字',
                            maxlength: '支付密码要求是 6 位数字',
                            pattern: '支付密码要求是 6 位数字'
                        }
                    }
                }
            });

            new SaveButton({
                element: element.find('.btn-primary'),
                form: formElement,
                save: function () {

                    if (validator.validate()) {

                        var formData = form.parse(formElement);

                        var extra = {
                            id: me.bankCardId
                        };

                        formData = $.extend(formData, extra);

                        var post = me.post || service.unBindBankCard;

                        post(formData)
                        .done(function (response) {
                            if (response.code === 0) {

                                dialog.hide();
                                if($.isFunction(me.onSuccess)) {
                                    me.onSuccess();
                                }
                            }
                        });
                    }
                },
                saveText: '正在解绑'
            });

            element
            .on('click', '.forget a', function () {
                dialog.hide();
            });
        }
    }

    return UnbindCardDialog;
});