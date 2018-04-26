/**
 * @file releaseSuccess
 * @author niejianhui
 */
define(function (require) {
    'use strict';
    
    angular.module('Manage.releaseSuccess.controller', [
            'Manage.services'
        ])
        .controller('ReleaseSuccessCtrl', ['$scope', '$window', '$sce', 
            '$stateParams', '$state', 'utilService',
            function ($scope, $window, $sce, $stateParams, $state, utilService) {
                //解绑编辑页的scroll事件
                $(window).unbind('scroll.sideNav');
                $('html,body').animate({scrollTop: '0px'}, 200);
                $scope.courseNumber = $stateParams.courseNumber;
                $scope.courseListUrl = location.origin + '/detail.html#/courseList/one2one';
                
                // $scope.openNewCourse = function () {
                //     $state.go('Manage.one2oneEdit', {
                //         courseNumber: 0
                //     })
                // };

                var env = utilService.getEnvName();
                var detailUrl;
                var str = $scope.courseNumber + '&preview=1';
                if (env === 'test') {
                    detailUrl = 'https://test-m.genshuixue.com/one-on-one-course/get?number=' + str;
                }
                else if (env === 'beta') {
                    detailUrl = 'https://beta-m.genshuixue.com/one-on-one-course/get?number=' + str;
                }
                else {
                    detailUrl = 'https://m.genshuixue.com/one-on-one-course/get?number=' + str;
                }
                //二维码配置
                $scope.detailPageQrcodeOpt = {
                    url: detailUrl,
                    width: 150,
                    height: 150,
                };

            }
        ]);
});