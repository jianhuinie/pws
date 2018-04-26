/**
 * @file 课程列表
 * @author niejianhui
 */

define(function (require) {
    'use strict';

    require('./controllers');

    angular
        .module('detail.courseList', [
            'ui.router',
            'pasvaz.bindonce',
            'templates',
            'Manage.services',
            'Manage.filters',
            'detail.courseList.controllers'
        ])
        .config(['$stateProvider',
            function ($stateProvider) {
                $stateProvider
                    .state('detail.courseList', {
                        url: 'courseList',
                        abstract: true,
                        controller: ['$scope', '$state', 'utilService',
                            '$rootScope', 'ajaxService',
                            function ($scope, $state, utilService, $rootScope, ajaxService) {
                                $scope.$state = $state;
                                $scope.env = utilService.getEnvName();
                            }
                        ],
                        templateUrl: 'app/module/detail/courseList/tpl.html'
                    })
                    .state('detail.courseList.one2one', {
                        url: '/one2one',
                        controller: 'One2oneListCtrl',
                        templateUrl: 'app/module/detail/courseList/one2one/tpl.html'
                    })
                    .state('detail.courseList.videocourse', {
                        url: '/videocourse',
                        controller: 'VideoCourseListCtrl',
                        templateUrl: 'app/module/detail/courseList/videoCourse/tpl.html'
                    });
            }
        ]);

});