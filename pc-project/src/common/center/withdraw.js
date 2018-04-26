/**
 * @file 钱包管理 - 提现
 * @author wangyujie
 */
define(function (require, exports) {

    'use strict';

    var Dialog = require('cobble/ui/Dialog');
    var Validator = require('cobble/form/Validator');
    var form = require('common/form');
    var store = require('common/store');
    var service = require('common/service');
    var redirect = require('cobble/util/redirect');

    var FindPasswordDialog = require('pay/common/component/FindPasswordDialog');
    var SetPasswordDialog = require('pay/common/component/SetPasswordDialog');

    /**
     * 初始化
     */
    exports.init = function () {

        var container = $('#content');
        var isMethodPC = false;

        // 表单验证
        var formElement = container.find('.form');
        var validator = new Validator({
            element: formElement,
            fields: {
                money: {
                    errors: {
                        required: '请填写提现金额',
                        pattern: '请填写正确的金额',
                        min: '单次提现金额最少1元',
                        max: '已超出可提取金额上限'
                    }
                },
                pay_password: {
                    errors: {
                        required: '请填写支付密码'
                    }
                }
            }
        });

        var setPasswordComplete = function (data) {

            success('设置密码成功');

            container
            .find('.pay-password').hide();

            var input = container.find('[name="pay_password"]');
            input.val(data.password);

            validator.validate();
        };

        container

        .on('click', '.withdraw-method', function (e) {

            if (e.target.tagName === 'INPUT') {
                return;
            }

            var target = $(this);


            var type = target.find(':radio').val();
            var addClass = 'method-' + type;
            var removeClass = 'method-';

            var input = formElement.find('[name="money"]');
            input.prop('placeholder', input.data(type));

            if (type === 'pc') {
                removeClass += 'mobile';
                validator.fields.money.rules.min = input.data('min');
                isMethodPC = true;
            }
            else {
                removeClass += 'pc';
                validator.fields.money.rules.min = 0;
                isMethodPC = false;
            }

            formElement
            .addClass(addClass)
            .removeClass(removeClass);

        })

        // 设置支付密码 - 对话框
        .on('click', '.pay-password', function () {

            var formData = form.parse(formElement);

            new SetPasswordDialog({
                mobile: formData.mobile,
                mobile_mask: formData.mobile_mask,
                onSuccess: setPasswordComplete
            });
        })
        // 提交提现表单
        .on('click', '.btn-save', function () {
            if (isMethodPC) {
                confirm({
                    title: '温馨提示',
                    content: '您正使用电脑提现，每笔会收取1元手续费，推荐下载APP使用手机提现免手续费哦~',
                    width: 400,
                    buttons: [
                        {
                            text: '下载APP手机提现',
                            type: 'primary',
                            handler: function () {
                                location.href = '/static/app';
                            }
                        },
                        {
                            text: '仍然电脑提现',
                            handler: function () {
                                this.hide();
                                withdrawHandler();
                            }
                        }
                    ]
                });
            }
            else {
                withdrawHandler();
            }

        });

        var withdrawHandler = function () {
            if (validator.validate()) {

                var formData = form.parse(formElement);

                if (formData.method === 'mobile') {
                    redirect.openLink(
                        'http://www.genshuixue.com/static/app'
                    );
                    return;
                }

                service
                .createWithdraw({
                    cardId: formData.card_id,
                    money: formData.money,
                    payPassword: formData.pay_password
                })
                .done(function (response) {
                    if (response.code === 0) {
                        formElement.hide();
                        container.find('.withdraw-success').show();
                    }
                });

            }
        }

        container.find('.icon-mobile').click();

    };

});
