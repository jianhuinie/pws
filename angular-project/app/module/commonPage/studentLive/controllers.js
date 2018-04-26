/**
 * @file 学生直播助手 controllers
 * @author niejianhui
 * @date 2017/08/04
 * 入口文件相同的代码里面不要有同名controller
 */
define(function (require) {
    'use strict';
    require('./services');
    angular.module('commonPage.studentLive.controllers', [
        'Manage.services',
        'commonPage.studentLive.services'
    ])
    .controller('StudentCoursesCtrl', require('./courses/controller'))
    .controller('PlaybackCtrl', require('./playback/controller'))
    .controller('StudentVCoursesCtrl', require('./videoCourses/controller'));
});