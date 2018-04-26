/**
 * @file 学生直播助手services
 * @author niejianhui
 * @date 2017/08/04
 */
define(function () {
    'use strict';
    angular.module('commonPage.studentLive.services', ['Manage.services'])
        .factory('studentLiveServices', ['ajaxService', 
            function (ajaxService) {
                return {
                    getPagedCourses: function (params) {
                        return ajaxService.send('/api/scenter/timetable/paged', params);
                    },
                    getPlaybackCourse: function (params) {
                        return ajaxService.send('/api/playback/courses', params);
                    },
                    getPlaybackLessons: function (params) {
                        return ajaxService.send('/api/playback/lessons', params);
                    },
                    getVideoCourses: function (params) {
                        return ajaxService.send('/api/scenter/video/paged', params);
                    },
                    getVideoSections: function (params) {
                        return ajaxService.send('/api/scenter/video/items', params);
                    }
                };
            }
        ]);
});