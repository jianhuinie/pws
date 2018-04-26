/**
 * @file 快速排课，无一对一购买记录弹窗
 * @author wangyujie
 */
define(function (require) {

    'use strict';

    var Dialog = require('cobble/ui/Dialog');
    var store = require('common/store');

    /**
     * 用户从来没有购买过一对一订单
     *
     * @constructor
     * @param {Object} options
     * @property {string} options.url 视频 url
     * @property {string} options.title 视频标题
     * @property {?number} options.videoWidth 视频播放器宽度
     * @property {?number} options.videoHeight 视频播放器高度
     */
    function ScheduleNotVIPDialog(options) {
        $.extend(this, options);
        this.init();
    }

    ScheduleNotVIPDialog.prototype = {

        init: function () {

            var me = this;

            var content = '';
            var hint;
            var closeBtn;

            if (store.get('user').type == 0) { // 老师
                hint = '<p>暂时还没有学生购买过你的一对一课程<br />购买后你可以在这里直接为学生排课</p>';
                closeBtn = '<a class="btn-primary btn-know">我知道了</a>'
            }
            else if (store.get('user').type == 2) {
                hint = '<p>你还没有购买过老师的一对一课程<br />购买后你可以在这里直接向老师约课</p>';
                closeBtn = '<a class="btn-primary" href="http://www.genshuixue.com/" target="_blank">立即发现好老师</a>'
            }

            content += '<img src="' + window.require.toUrl('img/center/piezui.png') + '" alt="">' + hint + closeBtn;

            var dialog = new Dialog({
                width: 500,
                skinClass: 'not-vip-dialog',
                title: '温馨提示',
                content: content
            });

            me.dialog = dialog;

            var element = me.dialog.element;

            element
            .on('click', '.btn-know', function (e) { // 我知道了
                me.dialog.hide();

            });

        },
        show: function (){
            this.dialog.show();
        }

    };


    return ScheduleNotVIPDialog;

});