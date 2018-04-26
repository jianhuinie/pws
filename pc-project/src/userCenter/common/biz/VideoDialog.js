/**
 * @file 视频对话框
 * @author zhujialu
 */
define(function (require) {

    'use strict';

    var Dialog = require('custom/ui/Dialog');

    /**
     * 播放视频对话框
     *
     * @constructor
     * @param {Object} options
     * @property {string} options.url 视频 url
     * @property {string} options.title 视频标题
     * @property {?number} options.videoWidth 视频播放器宽度
     * @property {?number} options.videoHeight 视频播放器高度
     */
    function VideoDialog(options) {
        $.extend(this, VideoDialog.defaultOptions, options);
        this.init();
    }

    VideoDialog.prototype = {

        init: function () {

            var me = this;
            var dialog = new Dialog({
                width: me.videoWidth,
                skinClass: 'video-dialog',
                title: me.title,
                removeOnEmpty: true,
                content: '<iframe src="' + me.url + '" style="width:' + me.videoWidth
                       + 'px;height:' + me.videoHeight + 'px;border:0" '
                       + 'frameborder="no" border="0"></iframe>'
                       + '<style>'
                       + require('text!./VideoDialog.styl')
                       + '</style>'
            });

            me.dialog = dialog;

        },
        show: function (){
            this.dialog.show();
        }

    };

    VideoDialog.defaultOptions = {
        videoWidth: 676,
        videoHeight: 383
    };


    return VideoDialog;

});