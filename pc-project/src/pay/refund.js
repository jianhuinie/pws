/**
 * @file 申请退款
 * @author wangyujie
 */
define(function (require, exports, module) {

    'use strict';

    var store = require('common/store');
    var Select = require('cobble/form/Select');
    var service = require('common/service');
    var Validator = require('cobble/form/Validator');
    var SaveButton = require('common/component/SaveButton');

    exports.init = function () {

        var container = $('#main');

        if (store.get('status') == 2 || store.get('action') == 'edit') { // 申请退款

            var formElement = container.find('.form');
            // 退课退款原因
            var reasonSelect = new Select({
                element: $('.refund-reason-select'),
                name: 'refund_reason'
            });

            // 编辑时，返填退课原因
            if (store.get('action') == 'edit') {
                reasonSelect.setValue(store.get('reasonId'));
            }

            // 验证对象
            var validator = new Validator({
                element: formElement,
                realtime: true,
                fields: {
                    refund_reason: {
                        rules: {
                            required: true
                        },
                        errors: {
                            required: '请选择退款原因'
                        }
                    }
                }
            });

            var submitBtn = formElement.find('.btn-submit');
            // 提交退款申请
            new SaveButton({
                element: submitBtn,
                save: function () {

                    // 验证后操作
                   if (validator.validate()) {

                        return service
                        .refundSubmit({
                            purchaseId: store.get('orderNumber'),
                            reasonId: formElement.find('input[name="refund_reason"]').val(),
                            action: (submitBtn.data('action') == 'edit') ? 1 : 0
                        })
                        .done(function (response) {
                            if (response.code === 0) {
                                success('提交成功', function(){
                                    window.location.href = '/pay/refund?purchase_id=' + store.get('orderNumber');
                                });
                            }
                        });
                    }

                }
            });
        }

        container
        .on('click', '.cancel-refund', function () { // 撤销退款申请
            alert({
                title: '温馨提示',
                content: '确认取消退款申请吗？',
                buttons: [
                    {
                        text: '确认',
                        type: 'primary',
                        handler: function () {
                            service
                            .refundCancel({
                                purchaseId: store.get('orderNumber'),
                            })
                            .done(function (response) {
                                if (response.code === 0) {
                                    success('撤销成功', function(){
                                        location.href = '/order/studentOrders';
                                    });
                                }
                            });
                        }
                    },
                    {
                        text: '不了',
                        type: 'default',
                        handler: function () {
                            this.hide();
                        }
                    }
                ]
            });
        });

    };

});