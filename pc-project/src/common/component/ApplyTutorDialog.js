/**
 * @file 申请免费家教弹出层
 * @author zhangliyuan
 */
define(function (require) {

    'use strict';

    var Dialog = require('cobble/ui/Dialog');

    /**
     * 登录弹窗类
     *
     * @param {Object} options 配置信息
     * @property {Function=} options.onSuccess 申请成功后的回调
     * @property {string=} options.failNext 登录失败后的跳转url
     */
    function ApplyTutorDialog(options) {

        $.extend(this, ApplyTutorDialog.defaultOptions, options);

        this.init();
    }

    ApplyTutorDialog.prototype = {

        init: function () {

            var me = this;
            var failNext = me.failNext;

            me.dialog = new Dialog({
                title: me.title,
                // 必须在这里读取，不然可能会因为 DOM 没加载完而拿不到模板
                content: $('#tutor-apply-form').html(),
                width: me.width,
                skinClass: me.skinClass
            });

        },

        show: function () {
            this.dialog.show();
        },

        hide: function () {
            this.dialog.hide();
        }
    };

    ApplyTutorDialog.defaultOptions = {
        title: '申请免费家教',
        width: 380,
        onSuccess: $.noop,
        skinClass: 'apply-tutor'
    };

    return ApplyTutorDialog;
});