/**
 * @file ipad 进入教室弹窗
 * @author niejianhui
 */
define(function (require) {

    'use strict';

    var Dialog = require('cobble/ui/Dialog');

    /**
     * @param {Object} options 配置信息
     */
    function IpadRemindDialog(options) {

        $.extend(this, IpadRemindDialog.defaultOptions, options);

        this.init();
    }

    IpadRemindDialog.prototype = {

        init: function () {

            var me = this;
            var content = ''
                        + '<div class="text-remind">'
                        +         '目前仅支持在iPad使用iPhone客户端上直播课，体验依然流畅。'
                        +         '你也可以通过电脑端的直播助手上课，直播助手在官网首页下载。'
                        + '</div>'
                        + '<div class="download-btn">'
                        +       '<a href="https://itunes.apple.com/app/apple-store/id919947654?pt=101822803&mt=8">安装iPhone客户端</a>'
                        + '</div>'
                        + '<div class="enter-later">暂不进入教室</div>';

            me.dialog = new Dialog({
                title: me.title,
                content: content,
                width: me.width,
                skinClass: me.skinClass
            });

            var element = me.dialog.element;
            element
            .on('click', '.enter-later', function () { // 取消
                me.dialog.hide();
            });

        },

        show: function () {
            this.dialog.show();
        },

        hide: function () {
            this.dialog.hide();
        }
    };

    IpadRemindDialog.defaultOptions = {
        title: '友情提示',
        width: 355,
        onSuccess: $.noop,
        skinClass: 'ipad-remind-dialog'
    };

    return IpadRemindDialog;
});