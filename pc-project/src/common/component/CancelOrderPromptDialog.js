/**
 * @file 学生 课表页“我要退课”，订单列表页“申请退款” 的提示框
 * @author liucong
 */
define(function (require, exports) {

    'use strict';
    var Dialog = require('cobble/ui/Dialog');
    var CancelOrderDialog = require('common/component/CancelOrderDialog');
    var entrance = require('im/entrance');

    /**
     * 构造函数
     * @param {string} options.status
     * @param {string=} options.teacherNumber
     * @param {string} options.cancelType {schedule, order}
     * @param {string} options.type
     * @param {string} options.url
     * @param {string} options.postData
     * @param {string} options.userType
     * @param {string=} options.price
     */
    function CancelOrderPromptDialog(options) {
        $.extend(this, options);
        this.init();
    }

    CancelOrderPromptDialog.prototype = {

        init: function () {
            var me = this;

            var dialog = new Dialog({
                title: '温馨提示',
                content: getContent(me.cancelType, me.status),
                disposeOnHide: true,
                width: 410,
                skinClass: 'cancel-order-prompt-dialog'
            });

            dialog.element
            .on('click', '.confirm', function () {
                dialog.hide();
            })
            .on('click', '.appeal', function () {

                var options = {
                    cancelType: me.cancelType,
                    type: me.type,
                    url: me.url,
                    postData: me.postData,
                    userType: me.userType,
                    price: me.price
                };

                dialog.hide();
                new CancelOrderDialog(options);
            })
            .on('click', '.contact-teacher', function () {
                dialog.hide();
                entrance.chatTo({
                    userNumber: me.teacherNumber
                });
            });
        }
    }

    var courseStatusMap = {
        '20': '目前距离上课已不足24小时，',
        '30': '目前课程正在进行中，',
        '40': '目前已过下课时间，',
        '50': '目前已过下课时间，',
        '81': '目前已过下课时间，'
    }

    var orderStatusMap = {
        'pay_success': '请首先处理完课程后再申请退款，如有问题',
        'other': '该订单已完成所有课时，如需退款或有其他问题'
    }

    function getContent(cancelType, status) {

        var icon = '<i class="icon icon-info-circle text-primary"></i>';
        var content;

        if (cancelType == 'schedule') {
            content = ''
                +   '<div class="content">'
                +       icon
                +       '<div>'
                +           courseStatusMap[status] + '你可以<span class="text-info action contact-teacher">联系老师</span></br>'
                +           '取消约课，如有其他问题请拨打客服电话'
                +           '</br><strong class="text-primary">4000-910-910</strong>或<span class="text-info action appeal">发起申诉</span>'
                +       '</div>'
                +   '</div>'
                +   '<div class="dialog-action">'
                +       '<button class="btn-primary confirm">我知道了</button>'
                +   '</div>';
        }
        else if (cancelType == 'order') {
            content = ''
                +   '<div class="content">'
                +       icon
                +       '<div>'
                +           orderStatusMap[status]
                +           '</br>请拨打客服电话<strong class="text-primary">4000-910-910</strong>或<span class="text-info action appeal">发起申诉</span>'
                +       '</div>'
                +   '</div>'
                +   '<div class="dialog-action">'
                +       '<button class="btn-primary confirm">我知道了</button>'
                +   '</div>';
        }

        return content;
    }

    return CancelOrderPromptDialog;
});