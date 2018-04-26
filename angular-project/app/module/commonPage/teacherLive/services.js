/**
 * @file 老师直播助手services
 * @author niejianhui
 * @date 2017/07/31
 */
define(function () {
    'use strict';
    angular.module('commonPage.teacherLive.services', ['Manage.services'])
        .factory('teacherLiveServices', ['ajaxService', 
            function (ajaxService) {
                return {
                    getPagedCourses: function (params) {
                        return ajaxService.send('/api/tcenter/live-client/timetable', params);
                    }
                };
            }
        ]);
});