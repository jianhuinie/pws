/**
 * @file videoCourseEdit
 * @author niejianhui
 * @date 2017/08/15
 */

define(function (require) {
    'use strict';
    require('./controller');
    require('./ngDirective/main');

    angular.module('Manage.videoCourseEdit', [
            'ui.router',
            'pasvaz.bindonce',
            'Manage.videoCourseEdit.controller',
            'Manage.videoCourseEdit.directives'
        ])
        .config(['$stateProvider',
            function ($stateProvider) {
                $stateProvider
                    .state('Manage.videoCourseEdit', {
                        url: 'videoCourseEdit/:courseNumber',
                        controller: 'VideoCourseEditCtrl',
                        templateUrl: 'app/module/main/videoCourseEdit/tpl.html'
                    });
            }
        ]);

});