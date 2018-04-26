/**
 * @file 机构视频
 * @author jixiaohui
 */
define(function (require, exports) {

    'use strict';

    var base = require('./common/base');
    var VideoDialog = require('common/component/VideoDialog');
    var container = $('.video');
    var store = require('common/store');
    var tianxiaoLog = require('common/tianxiaoLog');

    exports.init = function () {

        base.init();
        tianxiaoLog.send(store.get('orgnumber'), 'video');

        container
        /**
         * 弹出教师视频
         */
        .on('click' , '.video-thumbnail' , function (e) {

            var element = $(this);
            var title = element.data('name');
            new VideoDialog({
                url: element.data('video'),
                title: title ? title : '机构视频'
            });

        });

    };
});