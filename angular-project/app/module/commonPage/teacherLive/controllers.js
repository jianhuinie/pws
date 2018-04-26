/**
 * @file 老师直播助手 controllers
 * @author niejianhui
 * @date 2017/07/31
 */
define(function (require) {
    'use strict';
    require('./services');
    angular.module('commonPage.teacherLive.controllers', [
        'Manage.services',
        'commonPage.teacherLive.services'
    ])
    .controller('CoursesCtrl', require('./courses/controller'));
});