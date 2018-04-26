/**
 * @file 优选一对一课程详情页 － 老师介绍
 * @author wangyujie
 */
define(function (require, exports) {

    'use strict';

    var VideoDialog = require('common/component/VideoDialog');

    var container = $('#course-teacher');

    exports.init = function () {

        container
        .on('click', '.video-thumbnail', function() { // 视频播放

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