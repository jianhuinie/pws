define(function (require, exports) {

    'use strict';
    var Dialog = require('cobble/ui/Dialog');

    function NetdiskTipDialog(options) {
        $.extend(this, options);
        this.init();
    }

    NetdiskTipDialog.prototype = {
        init: function () {
            var me = this;
            var content = ''
                +   '<div class="message">'
                +       '<i class="icon icon-info-circle text-info"></i>'
                +       '<p>'
                +           me.message
                +       '</p>'
                +   '</div>';

            var tipAction = ''
                +   '<div class="action">'
                +       '<button class="btn-info cancel">我知道了</button>'
                +   '</div>';

            var confirmAction = ''
                +   '<div class="action">'
                +       '<button class="btn-info confirm">确认</button>'
                +       '<button class="btn-default cancel">取消</button>'
                +   '</div>';

            var dilatationAction = ''
                +   '<div class="action">'
                +       '<button class="btn-primary dilatation">购买空间</button>'
                +       '<button class="btn-default cancel">取消</button>'
                +   '</div>';

            if (me.type == 'confirm') {
                content += confirmAction;
            }
            else if (me.type == 'dilatation') {
                content += dilatationAction;
            }
            else {
                content += tipAction;
            }

            var dialog = me.dialog = new Dialog({
                title: '温馨提示',
                content: content,
                width: me.width || 400,
                skinClass: 'netdisk-tip-dialog'
            });

            dialog
            .element
            .on('click', '.action .cancel', function () {
                dialog.hide();
            })
            .on('click', '.action .confirm', function () {
                dialog.hide();
                if ($.isFunction(me.onSuccess)) {
                    me.onSuccess();
                }
            })
            .on('click', '.action .dilatation', function () { // 扩容
                dialog.hide();
                if ($.isFunction(me.onSuccess)) {
                    me.onSuccess();
                }
            });
        },
        hide: function () {
            this.dialog.hide();
        }
    }

    return  NetdiskTipDialog;
})