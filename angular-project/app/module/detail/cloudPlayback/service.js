/**
 * @file cloudPlayback
 * @author niejianhui
 */

define(function () {

    'use strict';

    angular.module('detail.cloudPlayback.service', ['Manage.services'])
        .factory('cloudPlaybackService', ['ajaxService',
            function (ajaxService){
                return {
                    //查询直播回放LIST
                    getCourseList: function (params) {
                        return ajaxService.send('/api/tcenter/courses/playback-course/list', params);
                    },
                    setExpireDay: function (params) {
                        return ajaxService.send('/api/cloudPlayBack/setExpireDay', params);
                    },
                    deletePlayback: function (params) {
                        return ajaxService.send('/api/cloudPlayBack/delete', params);
                    },
                    convertToVideoCourse: function (params) {
                        return ajaxService.send('/api/cloudPlayBack/copyToCloudVideoCourse', params);
                    },
                    setCourseStatus: function (params) {
                        return ajaxService.send('/api/videoCourse/setCourseStatus', params);
                    },
                    cancelVideoCourse: function (params) {
                        return ajaxService.send('/api/videoCourse/cancelCourse', params);
                    },
                    changeVideo: function (params) {
                        return ajaxService.send('/api/cloudPlayBack/changeVideo', params);
                    },
                    uploadVideoCallBack: function (params) {
                        return ajaxService.send('/api/tcenter/foundation/storage/upload-video-callback', params);
                    },
                    closePlaybackCourse: function (params) {
                        return ajaxService.send('/api/tcenter/courses/playback-course/close', params);
                    },
                    
                };
            }
        ]);
});