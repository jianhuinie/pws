/**
 * @file 页面底部
 * @author zhujialu
 */
define(function (require, exports, module) {

    'use strict';

    var Dialog = require('custom/ui/Dialog');

    return Ractive.extend({
        template: require('html!./Footer.html'),
        showWechatQrcode: function () {
            new Dialog({
                title: '跟谁学官方微信',
                content: require('html!./wechatQrcode.html'),
                footer: '',
                removeOnEmpty: true,
                skinClass: 'wechat-qrcode-dialog'
            });
        },
        onrender: function () {
            $.ajax({
                url: '/customer_tel/customerServiceTel',
                method: 'post',
                data: {
                },
                success: function(response) {
                    if (response.data) {
                        $('.service h4').text(response.data);
                        //console.log(1);
                    }
                    else {
                        //$('.service h4').text("4000-910-910");
                    }
                }
            });
        }
    });

});