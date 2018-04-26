/**
 * @file 取消订单、申诉 对话框
 * @author zhangjiayi
 */
define(function (require, exports) {

    'use strict';

    var Dialog = require('cobble/ui/Dialog');
    var Select = require('cobble/form/Select');
    var Editor = require('common/component/Editor');
    var service = require('common/service');
    var Validator = require('cobble/form/Validator');
    var SaveButton = require('common/component/SaveButton');
    var store = require('common/store');
    var JSON = require('cobble/util/json');
    var operation = '';
    var title = '';
    var roleMap;
    var pageType;

    /**
     * @constructor
     * @param {Object} options
     * @property {string} options.price
     */

    function CancelOrderDialog(options) {
        $.extend(this, options);
        
        pageType = this.pageType || 'orderList';
        if (this.price && (+this.price !== 0)) {
            // roleMap.price = this.price;
            operation = '退款';
            title = '申请退款';
        }
        else {
            operation = '取消';
            title = '取消订单';
        }

        roleMap = {

            teacher: {
                appeal: {
                    title: '我要申诉',

                    message: '',

                    reason: '<li data-value="1">学生无故取消课程</li>'
                    + '<li data-value="2">对学生学习态度不满意</li>'
                    + '<li data-value="3">已自动支付，但课程未按原计划进行</li>'
                    + '<li data-value="4">对学生的评价不满意</li>'
                    + '<li data-value="100">其他</li>',

                    texrareaContent: ['申诉原因：', '请选择申诉原因', '请填写您的申诉原因']
                },
                order: {
                    title: '取消订单',

                    reason: '<li data-value="1">与学生无法达成一致</li>'
                    + '<li data-value="2">对学生不满意</li>'
                        //10月底上线的时候，打开，兼容后端
                        //+ '<li data-value="3">上课时间地点不合适</li>'
                        //+ '<li data-value="4">学生无真实上课意愿</li>'
                    + '<li data-value="5">双方协商后取消</li>'
                    + '<li data-value="100">其他</li>',

                    message: '<div class="message-error">'
                    + '<i class="icon icon-info-circle"></i>'
                    + '您确认取消订单吗？',
                    // + '</div>',

                    texrareaContent: ['取消原因：', '请选择取消原因', '请填写您的取消原因']
                },
                lesson: {
                    title: '取消课程',

                    reason: '<li data-value="1">学生时间不合适</li>'
                    + '<li data-value="2">我的时间不合适</li>'
                    + '<li data-value="3">对学生不满意</li>'
                    + '<li data-value="100">其他</li>',

                    message: '<div class="message-primary">'
                    + '<i style="margin-right:6px;" class="icon icon-info-circle"></i>'
                    + '您确定取消该课程么？ 课程取消后，将不能恢复。'
                    + '</div>',

                    texrareaContent: ['取消原因：', '请选择取消原因', '请填写您的取消原因']
                }
            },

            student: {
                appeal: {
                    title: '我要申诉',

                    message: '',

                    reason: '<li data-value="1">无法与老师联系取消课程</li>'
                    + '<li data-value="2">老师无故取消课程</li>'
                    + '<li data-value="3">对老师授课态度不满意</li>'
                    + '<li data-value="4">已自动支付，但课程未按原计划进行</li>'
                    + '<li data-value="100">其他</li>',

                    texrareaContent: ['申诉原因：', '请选择申诉原因', '请填写您的申诉原因']
                },
                order: {
                    title: title,

                    reason: '<li data-value="1">与老师无法达成一致</li>'
                    + '<li data-value="2">下错单了</li>'
                    + '<li data-value="3">对老师不满意</li>'
                    + '<li data-value="100">其他</li>',

                    message: '<div class="message-error">'
                    + '<i class="icon icon-info-circle"></i>'
                    + '您确认' + title + '吗？',

                    texrareaContent: [operation + '原因：', '请选择' + operation + '原因', '请填写您的' + operation + '原因']
                },
                lesson: {
                    title: '取消课程',

                    reason: '<li data-value="1">老师时间不合适</li>'
                    + '<li data-value="2">我的时间不合适</li>'
                    + '<li data-value="3">对老师不满意</li>'
                    + '<li data-value="100">其他</li>',

                    message: '<div class="message-primary">'
                    + '<i style="margin-right:6px;" class="icon icon-info-circle"></i>'
                    + '您确定取消该课程么？'
                    + '课程取消后，将不能恢复。'
                    + '</div>',

                    texrareaContent: ['取消原因：', '请选择取消原因', '请填写您的取消原因']
                }
            }
        };

        this.init();
    }

    CancelOrderDialog.prototype = {
        getPrice: function () {
            return this.price;
        },
        init: function () {

            var message = '';
            var price = Number(this.price);
            if (price == 0) {
                message = roleMap[this.userType][this.type].message
                    + '取消订单后将不能恢复，直播课如果有回放则仅可看确认课酬部分的回放。'
                    + '</div>';
            } else if (this.price) {
                message = roleMap[this.userType][this.type].message;
                if (this.userType == 'student') {
                    message += ''
                    + '申请退款后直播课如果有回放则仅可看确认课酬部分的回放。'
                    + '剩余金额将退回至原支付渠道。'
                    + '退至其它支付渠道预计3-10个工作日到账，退至跟谁学钱包实时到账。';
                }
                else {
                    message += ''
                    // + '取消订单后直播课如果有回放则仅可看确认课酬部分的回放。'
                    + '该订单还有未确认课酬'
                    + this.price
                    + '，取消订单后，未确认课酬将一并退还给学生。'
                    // + '将不能恢复，剩余金额将退回至原支付渠道。'
                }

                    message += '</div>';
            } else {
                message = roleMap[this.userType][this.type].message
                    + '</div>';
            }

            var content = ''
                + message
                + '<div class="reason">'
                + '<i class="form-required"></i>'
                + roleMap[this.userType][this.type].texrareaContent[0]
                + '<div class="dropdown">'
                + '<button class="btn-default">'
                + '<i class="caret"></i>'
                + '<span>'
                + roleMap[this.userType][this.type].texrareaContent[1]
                + '</span>'
                + '</button>'
                + '<ul class="dropdown-menu" style="display: none;">'
                + roleMap[this.userType][this.type].reason
                + '</ul>'
                + '</div>'
                + '</div>'
                + '<div class="form-group">'
                + '<div class="form-editor">'
                + '<div class="wrapper">'
                + '<textarea class="form-text" name="remark" placeholder="'
                + roleMap[this.userType][this.type].texrareaContent[2]
                + '"></textarea>'
                + '<div class="form-hint">'
                + '还可以输入 <strong>200</strong> 个字'
                + '</div>'
                + '</div>'
                + '</div>'
                + '</div>'
                + dialogBottom;

            var dialog = new Dialog({
                title: roleMap[this.userType][this.type].title,
                content: content,
                disposeOnHide: true,
                width: 450,
                skinClass: 'cancel-order-dialog'
            });

            var element = dialog.element;

            var select = new Select({
                element: element.find('.dropdown'),
                onChange: function () {
                    element.find('.btn-primary').prop('disabled', false);
                }
            });

            var editor = new Editor({
                element: element.find('.form-editor'),
                maxLength: 200
            });

            var url = this.url;

            // 要发送的额外数据
            var postData = this.postData;

            // 验证对象
            var validatorDialog = new Validator({
                element: element,
                realtime: true,
                fields: {
                    remark: {
                        rules: {
                            require: true,
                            maxlength: 200
                        },
                        errors: {
                            require: '必填',
                            maxlength: '请将字数控制在 200 字以内'
                        }
                    }
                }
            });

            // 保存对象
            new SaveButton({
                element: element.find('.btn-confirm'),
                save: function () {
                    // 重复提交失效...置灰按钮
                    element.find('.btn-confirm').prop('disabled', true);

                    var reasonType = element.find('.dropdown-menu .active').first().data('value');
                    var reasonText = element.find('.form-text').first().val();

                    if (reasonType == '100' && reasonText.length < 1) {
                        alert({
                            title: '温馨提示', 
                            content: '输入内容不能为空',
                            buttons: [
                                {
                                    text: '确定',
                                    type: 'primary',
                                    handler: function () {
                                        element.find('.btn-confirm').prop('disabled', false);
                                        this.hide();
                                    }
                                }
                            ]
                        });
                    }
                    else {
                        var data = $.extend(
                            {
                                url: url,
                                reason: reasonType,
                                reason_text: reasonText
                            },
                            postData || {}
                        );

                        if (validatorDialog.validate()) {
                            //老师取消订单走不同的逻辑
                            if (pageType === 'orderDetail' 
                                && store.get('user').type === 0
                                && +store.get('courseType') === 2) {
                                service
                                .teacherCancelOrder({
                                    purchaseId: store.get('purchaseId'),
                                    action: 'seller_cancel_order',
                                    args: JSON.stringify({
                                            reason: reasonType,
                                            reason_text: reasonText
                                        })
                                })
                                .done(function (response) {
                                    if (response.code === 0) {
                                        element.find('.btn-confirm').prop('disabled', false);
                                        success('提交成功', function () {
                                            location.reload();
                                        });
                                    }

                                });
                            } 
                            else {
                                service
                                .cancelOrderByUrl(data)
                                .done(function (response) {
                                    if (response.code === 0) {
                                        element.find('.btn-confirm').prop('disabled', false);
                                        success('提交成功', function () {
                                            location.reload();
                                        });
                                    }

                                });
                            }
                        }
                    }
                }
            });

            element
            .on('click', '.btn-cancel', function () {
                dialog.hide();
            });


        }

    };

    var dialogBottom = ''
        + '<div class="dialog-action">'
        + '<button class="btn btn-primary btn-confirm" disabled>确定</button>'
        + '<button class="btn btn-default btn-cancel">取消</button>'
        + '</div>';

    return CancelOrderDialog;

});