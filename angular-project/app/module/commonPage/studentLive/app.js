/**
 * @file 学生直播助手相关页面 app.js
 * @author niejianhui 
 * @date 2017/08/04
 */

define(function (require) {
    'use strict';
    require('./controllers');
    angular.module('commonPage.studentLive', [
        'ui.router',
        'pasvaz.bindonce',
        'commonPage.studentLive.controllers'
    ])
    .config(['$stateProvider', 
        function ($stateProvider) {
            $stateProvider
                .state('commonPage.studentLive', {
                    url: 'studentLive',
                    abstract: true,
                    controller: ['$scope', '$state', 'userInfo', 'utilService', function ($scope, $state, userInfo, utilService) {
                        userInfo()
                            .then(function (response) {
                                $scope.user = response.data;
                            });

                        $scope.$state = $state;
                        $scope.env = utilService.getEnvName();
                        $scope.isWinXP = utilService.isWinXP();
                    }],
                    templateUrl: 'app/module/commonPage/studentLive/tpl.html'
                })
                .state('commonPage.studentLive.courses', {
                    url: '/courses',
                    controller: 'StudentCoursesCtrl',
                    templateUrl: 'app/module/commonPage/studentLive/courses/tpl.html'
                })
                .state('commonPage.studentLive.playback', {
                    url: '/playback',
                    controller: 'PlaybackCtrl',
                    templateUrl: 'app/module/commonPage/studentLive/playback/tpl.html'
                })
                .state('commonPage.studentLive.videoCourses', {
                    url: '/videoCourses',
                    controller: 'StudentVCoursesCtrl',
                    templateUrl: 'app/module/commonPage/studentLive/videoCourses/tpl.html'
                });
        }
    ]);
});