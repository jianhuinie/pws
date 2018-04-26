/**
 * @file 修改订单价格对话框
 * @author zhujialu
 */
define(function (require) {

    'use strict';

    var Dialog = require('cobble/ui/Dialog');
    var Validator = require('cobble/form/Validator');
    var service = require('common/service');
    var etpl = require('cobble/util/etpl');
    var SaveButton = require('common/component/SaveButton');
    var multi = require('cobble/function/multiply');
    var divide = require('cobble/function/divide');
    /**
     * 修改订单价格对话框
     *
     * @param {Object} options
     * @property {Object} options.order 订单对象
     * @property {boolean} options.editTotalPrice 是否修改总价
     */
    function EditOrderPriceDialog(options) {
        $.extend(this, options);
        this.init();
    }

    function validateMoneyWhenKeyDown(e, start, oldVal, maxLength) {

        var code = e.which !== undefined ? e.which : e.keyCode;
        if (code == 8) {
            return true;
        }
        var ch = String.fromCharCode(code);

        if (/\./.test(oldVal) && ch == '.') return false; //只能存在一个小数点
        if (!(/[\d,\.]/.test(ch))) return false; //不能是非数字或小数点

        var val = oldVal.replace(new RegExp('(.{' + start + '})'), '$1' + ch );
        if (val.replace(/(\d*\.?)/, '').length > 2 || val.replace(/(\.\d*)/, '').length > maxLength ) { //精度2位小数 最大5位数
            return false;
        }
        else {
            return true;
        }
    }

    EditOrderPriceDialog.prototype = {

        init: function () {
            var me = this;

            if (me.order.create_time) {
                me.order.create_time = me.order.create_time.replace(/:\d+$/, '');
            }

            var data;

            if (me.editTotalPrice) {
                data = $.extend(
                    me.order,
                    {
                        editTotalPrice: true
                    }
                );
            }
            else {
                data = me.order;
            }

            var dialog = new Dialog({
                title: '修改订单价格',
                content: tpl(data),
                width: 650,
                skinClass: 'edit-order-price-dialog'
            });

            var form  = $('.order-new-price-form');
            var priceInput = form.find('[name="new-price"]');
            var payMoneyInput = form.find('[name="new-paymoney"]');
            var payMoneyText = form.find('.text-paymoney span');

            var validator = new Validator({
                element: form,
                fields: {
                    'new-price': {
                        errors: {
                            required: '请输入正确的金额',
                            pattern: '请输入正确的金额',
                            min: '请输入大于0的金额'
                        }
                    },
                    'new-paymoney': {
                        errors: {
                            required: '请输入正确的金额',
                            pattern: '请输入正确的金额',
                            min: '请输入大于0的金额'
                        }
                    }
                }
            });

            form
            .on('click', '.cancel', function () {
                dialog.hide();
            });

            priceInput
            .on('keypress', function (e) {

                return validateMoneyWhenKeyDown(e, $(this)[0].selectionStart, $(this).val(), 5);
            });

            priceInput
            .on('keyup', function (e) {

                var price =  $(this).val();
                var payMoney = $.isNumeric(price) ? multi(price, me.order.hours) : '0';

                payMoneyText.text(payMoney);
                payMoneyInput.val(payMoney);

            });

            payMoneyInput
            .on('keypress', function (e) {

                return validateMoneyWhenKeyDown(e, $(this)[0].selectionStart, $(this).val(), 7);
            });

            payMoneyInput
            .on('keyup', function (e) {

                var payMoney = $(this).val();
                var price = divide(payMoney, me.order.hours);

                price = Number(price).toFixed(2);

                priceInput.val(price);
                payMoneyText.text(payMoney);

            });

            new SaveButton({
                element: form.find('.confirm'),
                form: form,
                save: function () {

                    if (validator.validate()) {
                        var payMoney = payMoneyInput.val();
                        var purchaseId = me.order.purchase_id;

                        service
                        .changeOrderMoney({
                            purchaseId: purchaseId,
                            payMoney: payMoney
                        })
                        .done(function (response) {
                            if (response.code === 0) {
                                alert({
                                    title: '温馨提示',
                                    content: '修改价格成功',
                                    buttons: [{
                                        text: '确定',
                                        type: 'primary',
                                        handler: function() {
                                            location.reload();
                                        }
                                    }]
                                });
                            }
                        })
                    }
                }
            });

        }

    };


    var tpl = etpl.compile(''
        + '<div class="form edit-price-form">'
        +     '<h4>你当前要修改以下订单总价格</h4>'
        +     '<div class="form-group">'
        +         '<label class="form-label">'
        +             '学生姓名：'
        +         '</label>'
        +         '<div class="form-controls">'
        +             '<span class="form-static">'
        +                 '${display_name}'
        +             '</span>'
        +         '</div>'
        +     '</div>'
        +     '<div class="form-group">'
        +         '<label class="form-label">'
        +             '<!-- if: ${editTotalPrice} -->'
        +             '班课名称：'
        +             '<!-- else -->'
        +             '课程名称：'
        +             '<!-- /if -->'
        +         '</label>'
        +         '<div class="form-controls">'
        +             '<span class="form-static _typ-name">'
        +                 '${course_name}'
        +             '</span>'
        +         '</div>'
        +     '</div>'
        +     '<div class="form-group course-duration">'
        +         '<label class="form-label">'
        +             '课程时长：'
        +         '</label>'
        +         '<div class="form-controls">'
        +             '<span class="form-static">'
        +                 '${hours}'
        +             '</span>'
        +         '</div>'
        +     '</div>'
        +     '<div class="form-group course-price">'
        +         '<label class="form-label">'
        +             '课程单价：'
        +         '</label>'
        +         '<div class="form-controls">'
        +             '<span class="form-static">'
        +                 '￥${price}/小时'
        +             '</span>'
        +         '</div>'
        +     '</div>'
        +     '<div class="form-group order-time">'
        +         '<label class="form-label">'
        +             '下单时间：'
        +         '</label>'
        +         '<div class="form-controls">'
        +             '<span class="form-static">'
        +                 '${create_time}'
        +             '</span>'
        +         '</div>'
        +     '</div>'
        +     '<div class="form-group order-id">'
        +         '<label class="form-label">'
        +             '订单号：'
        +         '</label>'
        +         '<div class="form-controls">'
        +             '<span class="form-static">'
        +                 '${purchase_id}'
        +             '</span>'
        +         '</div>'
        +     '</div>'
        +     '<div class="form-group order-origin-paymoney">'
        +         '<label class="form-label">订单原总价：</label>'
        +         '<div class="form-controls">'
        +             '<span class="form-static text-primary">'
        +                 '￥${pay_money}'
        +             '</span>'
        +         '</div>'
        +     '</div>'
        +     '<div class="form order-new-price-form">'
        +         '<div class="form-group order-new-price">'
        +              '<label class="form-label prompt">'
        +                  '<!-- if: ${editTotalPrice} -->'
        +                  '请输入修改后的订单总价，并确认：'
        +                  '<!-- else -->'
        +                  '请输入修改后的课程单价或订单总价，并确认：'
        +                  '<!-- /if -->'
        +              '</label>'
        +              '<div class="form-controls">'
        +                 '<div class="input-group">'
        +                     '<!-- if: ${editTotalPrice} -->'
        +                         '<input class="form-text" type="money" name="new-paymoney" min="0.01" placeholder="订单总价" required/>'
        +                         '<span class="input-group-addon">元</span>'
        +                     '<!-- else -->'
        +                         '<input class="form-text" type="money" name="new-price" min="0.01" placeholder="课程单价" required/>'
        +                         '<span class="input-group-addon">元/小时</span>'
        +                         '<span class="hours"><i>×</i><b>${hours}</b>小时<i>=</i></span>'
        +                         '<input class="form-text" type="money" name="new-paymoney" min="0.01" placeholder="订单总价" required/>'
        +                         '<span class="input-group-addon">元</span>'
        +                     '<!-- /if -->'
        +                 '</div>'
        +                 '<div class="form-group order-new-paymoney">'
        +                     '<label class="form-label">订单新总价：</label>'
        +                     '<div class="form-controls">'
        +                         '<span class="form-static text-error text-paymoney">'
        +                             '￥<span>0</span>'
        +                         '</span>'
        +                     '</div>'
        +                 '</div>'
        +                 '<div class="form-block form-hint">'
        +                     '学生将按照新订单总价进行支付'
        +                 '</div>'
        +                 '<span class="error"></span>'
        +             '</div>'
        +         '</div>'
        +         '<div class="form-action">'
        +             '<button class="btn-primary confirm">确定</button>'
        +             '<button class="btn-default cancel">取消</button>'
        +         '</div>'
        +     '</div>'
        +     '<small>'
        +         '注意：点击确定后，学生会收到订单价格修改的通知，请通知学生刷新订单支付页面，查看最新订单价格并支付'
        +     '</small>'
        + '</div>');

    return EditOrderPriceDialog;

})