/**
 * @file 网站左导  老师个人中心
 * @author niejianhui
 * @options  暂时不需要  保留做扩展用
 * usage
 * <side-bar></side-bar>
 */

define(function () {
    'use strict';

    angular.module('Manage.directives')
        .directive('sideBar', ['getSideNavAuth', 
        function (getSideNavAuth) {
            return {
                restrict: 'E',
                scope: {
                    /**
                     * 配置信息
                     * @params {Object} options
                     */
                    options: '='
                },
                replace: true,
                templateUrl: 'app/common/ngDirective/sideBar/tpl.html',
                link: function($scope) {
                    //获取左导信息
                    getSideNavAuth().then(function (response) {
                        $scope.sidebarConfig = response.data;
                    });
                }
            };
        }]);
});
