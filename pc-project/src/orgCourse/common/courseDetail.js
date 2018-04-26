/**
 * @file 机构X课 - 课程详情
 * @author wangyujie
 */
define(function (require,exports) {
    'use strict';

    var VideoDialog = require('common/component/VideoDialog');

    exports.init = function () {

        var container = $('#courseDetail');

        container
        .on('click', '.video-thumbnail', function () { // 视频播放

            var element = $(this);
            var title = element.data('name');

            new VideoDialog({
                url: element.data('video'),
                title: title ? title : '机构视频'
            });
        });
    }
});