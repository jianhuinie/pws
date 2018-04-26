/**
 * @file 等待支付对话框
 * @author zhujialu
 */
define(function (require, exports) {

    'use strict';

    var Dialog = require('cobble/ui/Dialog');

    /**
     * 等待支付对话框
     *
     * @constructor
     * @param {Object} options
     * @property {Function} options.onSuccess
     * @property {Function} options.onError
     */
    function WaitPayDialog(options) {
        $.extend(this, WaitPayDialog.defaultOptions, options);
        this.init();
    }

    WaitPayDialog.prototype = {

        init: function () {

            var me = this;

            var dialog = new Dialog({
                title: '温馨提示',
                content: tpl,
                width: 450,
                skinClass: 'wait-pay-dialog',
                onBeforeHide: function () {
                    this.element.off();
                }
            });

            dialog.element
            .on('click', 'button[class^="btn-"]', function (e) {

                dialog.hide();

                if ($(e.currentTarget).hasClass('btn-primary')) {
                    me.onSuccess();
                }
                else {
                    me.onError();
                }

            });

        }
    };

    WaitPayDialog.defaultOptions = {
        onSuccess: function () {
            location.reload();
        },
        onError: function () {
            location.reload();
        }
    };

    var tpl = '<p>请在新打开的页面进行支付，支付完成前请不要关闭该窗口</p>'
            + '<div class="dialog-action">'
            +     '<button class="btn-primary">已完成支付</button>'
            +     '<a href="/guide/pay?a=pay" target="_blank" class="btn-default">支付遇到问题</a>'
            + '</div>'
            + '<small>支付有问题？请拨打客服热线 4000-910-910，010-86448910</small>';

    return WaitPayDialog;

});