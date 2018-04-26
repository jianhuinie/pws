/**
 * @file 进入在线课程弹出层
 * @author zhangliyuan
 */
define(function (require) {

    'use strict';

    var Dialog = require('cobble/ui/Dialog');
    /**
     * 在线课程弹窗类
     *
     * @param {Object} options 配置信息
     * @property {Function=} options.onSuccess 申请成功后的回调
     * @property {string=} options.failNext 登录失败后的跳转url
     */
    function OnlineCourseDialog(options) {

        $.extend(this, OnlineCourseDialog.defaultOptions, options);

        this.init();
    }

    OnlineCourseDialog.prototype = {

        init: function () {

            var me = this;
            var failNext = me.failNext;

            me.dialog = new Dialog({
                title: me.title,
                // 必须在这里读取，不然可能会因为 DOM 没加载完而拿不到模板
                content: $('#online-course-dialog').html(),
                width: me.width,
                skinClass: me.skinClass
            });

        },
    };

    OnlineCourseDialog.defaultOptions = {
        title: '在线教室列表',
        width: 770,
        onSuccess: $.noop,
        skinClass: 'online-course-dialog',
        disposeOnHide: true
    };

    return OnlineCourseDialog;
});