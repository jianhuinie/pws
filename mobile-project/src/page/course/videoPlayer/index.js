/* 云端录制视频承载页面
* @author huangshiming
* date 2017-02-17
*/
define(function (require) {
    'use strict';

    var $ = require('zepto');
    var pageDate;

    var initVideo = function () {
        window.initBjVideoReplay({
            videoAreaId: 'playerBox',
            messageAreaId: '',
            env: pageDate.env,
            appVersion: '',
            isBrowser: true,
            isVideoCourse: true,
            sectionId: pageDate.sectionId,
            courseNumber: pageDate.courseNumber
        });
    }

    return function (page_data) {
        pageDate = page_data;
        initVideo();
    }
});