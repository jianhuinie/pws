/**
 * @file 一对一排课弹窗
 * @author wangyujie
 */
define(function (require) {

    'use strict';

    var Dialog = require('cobble/ui/Dialog');
    var store = require('common/store');

    var userType;

    /**
     * 排课弹窗
     *
     * @param {Object} options 配置信息
     * @property {Function=} options.onSuccess 申请成功后的回调
     * @property {string=} options.failNext 登录失败后的跳转url
     */
    function ScheduleClassDialog(options) {

        $.extend(this, ScheduleClassDialog.defaultOptions, options);

        this.init();
    }

    ScheduleClassDialog.prototype = {

        init: function () {

            var me = this;
            var failNext = me.failNext;

            // 身份
            if (store.get('user').type === 0) {
                me.dialog = new Dialog({
                    title: '<span>选择学生</span><i class="icon icon-arrows"></i><span>选择订单</span>',
                    // 必须在这里读取，不然可能会因为 DOM 没加载完而拿不到模板
                    content: $('#schedule-class-dialog').html(),
                    width: me.width,
                    skinClass: me.skinClass
                });
            }
            else if (store.get('user').type === 2) {
                me.dialog = new Dialog({
                    title: '<span>选择老师</span><i class="icon icon-arrows"></i><span>选择订单</span>',
                    // 必须在这里读取，不然可能会因为 DOM 没加载完而拿不到模板
                    content: $('#schedule-class-dialog').html(),
                    width: me.width,
                    skinClass: me.skinClass
                });
            }

        },
    };


    ScheduleClassDialog.defaultOptions = {
        title: '一对一排课',
        width: 770,
        onSuccess: $.noop,
        skinClass: 'schedule-class-dialog',
        disposeOnHide: true
    };

    return ScheduleClassDialog;
});