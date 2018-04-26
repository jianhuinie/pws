define(function (require, exports) {

    'use strict';
    var Dialog = require('cobble/ui/Dialog');
    var qrcode = require('common/component/qrcode');

    /**
     * 构造函数
     * @param {string} options.money 支付金额
     * @param {string} options.url       用于生成二维码的支付url
     */
    function WechatPayDialog(options) {
        $.extend(this, options);
        this.init();
    }

    WechatPayDialog.prototype = {
        init: function () {
            var me = this;
            var content = ''
                +   '<div class="qr-code">'
                +       '<div class="code">'
                +           '<div class="wechat-center"></div>'
                +       '</div>'
                +       '<div>'
                +           '请使用微信扫一扫</br>扫描二维码支付'
                +       '</div>'
                +   '</div>'
                +   '<div class="wechat-hint">'
                +   '</div>';

            var dialog = me.dialog = new Dialog({
                title: '<span class="pay-amount text-error">支付￥' + me.money + '</span><h2>微信支付</h2>',
                content: content,
                skinClass: 'wechat-pay-dialog',
                width: 730,
                disposeOnHide: false
            });

            var supportCavans = document.createElement('canvas').getContext;

            qrcode({
                element: dialog.element.find('.qr-code .code'),
                text: me.url,
                width: 195,
                height: 195,
                render: supportCavans ? 'canvas' : 'table'
            });

        },
        show: function () {
            this.dialog.show();
        }
    }

    return WechatPayDialog;
});