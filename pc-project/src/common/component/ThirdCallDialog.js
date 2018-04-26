/**
 * @file 已登陆用户 － 留单弹窗（机构老师） － 至机构
 * @author wangyujie
 */
define(function (require) {

    'use strict';

    var Dialog = require('cobble/ui/Dialog');
    var Validator = require('cobble/form/Validator');
    var service = require('common/service');
    var form = require('common/form');
    var SaveButton = require('common/component/SaveButton');

    
    function ThirdCallDialog(options) {
        $.extend(this, ThirdCallDialog.defaultOptions, options);
        this.init();
    }

    ThirdCallDialog.prototype = {

        init: function () {

            var me = this;

            var dlgContent = '<form class="form">'
                           +     '<div class="form-group">'
                           +        '<div class="form-controls">'
                           +            '<input type="text" name="telephone"' 
                           +            'placeholder="请输入您的手机号">'
                           +            '<span class="error"></span>'
                           +        '</div>'
                           +     '</div>'
                           + '</form>'
                           + '<div class="free-call">免费拨打</div>'
                           + '<div class="text-info">点击【免费拨打】</div>'
                           + '<div class="text-info">系统将为您接通跟谁学专属客户经理电话，请注意接听。</div>';

            me.dialog = new Dialog({
                //默认为5
                zIndex: me.zIndex || 5,
                title: me.title,
                content: dlgContent,
                width: me.width,
                skinClass: me.skinClass
            });

            var element = me.dialog.element;

            me.validator = new Validator({
                realtime: true,
                element: element,
                fields: {
                    telephone: {
                        rules: {
                            required: true,
                            pattern: /^1[34578](\d){9}$/,
                        },
                        errors: {
                            required: '请输入手机号',
                            pattern: '请填写格式正确的手机号'
                        }
                    }
                }
            });

            element
                .on('click', '.free-call', function () {
                    if (me.validator.validate()) {
                        service
                        .sendThirdCall({
                            mobile: element.find('input[name=telephone]').val(),
                        })
                        .done(function (response) {
                            if (response.code === 0) {
                                alert({
                                    title: '温馨提示',
                                    content: '稍后您将接到我们的电话，该通话对您完全免费，请放心接听！',
                                    width: 400,
                                    buttons: [
                                        {
                                            text: '我知道了',
                                            type: 'primary',
                                            handler: function () {
                                                this.hide();
                                                me.dialog.hide();
                                            }
                                        }
                                    ]
                                });
                            }
                        });
                    }
                });

        },

        show: function () {
            this.dialog.show();
        },

        hide: function () {
            this.dialog.hide();
        }
    };

    ThirdCallDialog.defaultOptions = {
        title: '',
        width: 534,
        onSuccess: $.noop,
        skinClass: 'thirdcall-dialog'
    };


    return ThirdCallDialog;

});