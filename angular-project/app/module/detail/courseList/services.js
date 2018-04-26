/**
 * @file 课程列表
 * @author niejianhui
 */

define(function () {

    'use strict';

    angular
        .module('detail.courseList.services', ['Manage.services'])
        .factory('courseListService', ['ajaxService',
            function (ajaxService){
                return {
                    // 查询优选一对一LIST
                    getOne2oneList: function (params) {
                        return ajaxService.send('/api/tcenter/courses/one-on-one-course/list', params);
                    },
                    // 删除优选一对一课程
                    deleteOne2oneCourse: function (params) {
                        return ajaxService.send('/api/tcenter/courses/one-on-one-course/delete', params);
                    },
                    // 获取视频课列表
                    getVideoCourseList: function (params) {
                        return ajaxService.send('/api/tcenter/courses/video-courses/list', params);
                    },
                    // 视频课执行的操作们
                    videoCourseDoSomething: function (params) {
                        return ajaxService.send('/api/tcenter/courses/video-courses/do', params);
                    }

                };
            }
        ]);
});