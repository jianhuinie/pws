/**
 * @file videoCourseEdit
 * @author niejianhui
 * @date 2017/08/15
 */

define(function () {
    'use strict';
    angular.module('Manage.videoCourseEdit.service', ['Manage.services'])
        .factory('videoCourseEditService', ['ajaxService',
            function (ajaxService) {
                return {
                    //开课获取课程信息
                    getCourseInfo: function (params) {
                        return ajaxService.send('/api/tcenter/courses/video-courses/form', params || {});
                    },
                    //发布课程
                    saveVideoCourse: function (params) {
                        return ajaxService.send('/api/tcenter/courses/video-courses/save', params || {});
                    },
                    // 获取课程分组
                    getClassGroup: function () {
                        return ajaxService.send('/api/org/org_class_group/search');
                    },
                    // 获取课程分组ById
                    getClassGroupById: function (params) {
                        return ajaxService.send('/api/org/org_class_group/searchById', params);
                    },
                    // 保存课程分组
                    saveClassGroup: function (params) {
                        return ajaxService.send('/api/org/org_class_group/save', params);
                    },
                    // 删除课程分组
                    deleteClassGroup: function (params) {
                        return ajaxService.send('/api/org/org_class_group/delete', params);
                    },
                    // 上传视频成功后回调
                    uploadVideoCallback: function (params) {
                        return ajaxService.send('/api/tcenter/foundation/storage/upload-video-callback', params);
                    },
                };
            }
        ]);
});