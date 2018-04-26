/**
 * @file 课程列表
 * @author niejianhui
 */

define(function (require) {
    'use strict';
    require ('./services');

    angular
        .module('detail.courseList.controllers', [
            'Manage.services',
            'detail.courseList.services'
        ])
        .controller('One2oneListCtrl', require('./one2one/controller'))
        .controller('VideoCourseListCtrl', require('./videoCourse/controller'));
});