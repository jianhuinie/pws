/**
 * @file 优选一对一
 * @author niejianhui
 */

define(function () {
    'use strict';
    angular.module('Manage.one2oneEdit.services', ['Manage.services'])
        .factory('one2oneEditService', ['ajaxService',
            function (ajaxService) {
                return {
                    //获取视频列表
                    getVideoList: function (params) {
                        return ajaxService.send('/api/tcenter/album/video/list', params || {});
                    },
                    //获取相册列表
                    getPhotoList: function (params) {
                        return ajaxService.send('/api/tcenter/album/photo/list', params || {});
                    },
                    //获取成功案例列表
                    getCaseList: function (params) {
                        return ajaxService.send('/api/tcenter/success-case/list', params || {});
                    },
                    //获取常用地址
                    getDefaultAddress: function (params) {
                        return ajaxService.send('/api/tcenter/addresses/default-address', params || {});
                    },
                    //获取教学科目
                    getSubjects: function (params) {
                        return ajaxService.send('/api/tcenter/courses/one-on-one-course/subjects', params || {});
                    },
                    //发布课程
                    saveCourse: function (params) {
                        return ajaxService.send('/api/tcenter/courses/one-on-one-course/save', params || {});
                    },
                    //获取课程信息
                    getCourse: function (params) {
                        return ajaxService.send('/api/tcenter/courses/one-on-one-course/get', params || {});
                    }
                };
            }
        ]);
});