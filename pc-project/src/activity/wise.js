/**
 * @file 老师介绍页面
 * @author tangrongyan
 */
define(function(require, exports) {

    'use strict';

    var VideoDialog = require('common/component/VideoDialog');


    exports.init = function() {

        /**
         * 弹出教师视频
         */
        $('#videoShow')
                .on('click', '.video-thumbnail', function(e) {

                    var element = $(this);
                    var url = element.data('video');
                    var title = element.data('name');

                    new VideoDialog({
                        url: url,
                        title: title
                    });

                });















    };


});