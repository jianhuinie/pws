/**
 * @file 老师直播助手相关页面 app.js
 * @author niejianhui 
 */

define(function (require) {
    'use strict';
    require('./controllers');
    angular.module('commonPage.teacherLive', [
        'ui.router',
        'pasvaz.bindonce',
        'commonPage.teacherLive.controllers'
    ])
    .config(['$stateProvider', 
        function ($stateProvider) {
            $stateProvider
                .state('commonPage.teacherLive', {
                    url: 'teacherLive',
                    abstract: true,
                    controller: ['$scope', '$state', 'userInfo', 'utilService', function ($scope, $state, userInfo, utilService) {
                        userInfo()
                            .then(function (response) {
                                $scope.user = response.data;
                            });

                        $scope.$state = $state;
                        $scope.env = utilService.getEnvName();
                    }],
                    templateUrl: 'app/module/commonPage/teacherLive/tpl.html'
                })
                .state('commonPage.teacherLive.courses', {
                    url: '/courses',
                    controller: 'CoursesCtrl',
                    templateUrl: 'app/module/commonPage/teacherLive/courses/tpl.html'
                });
        }
    ]);
});