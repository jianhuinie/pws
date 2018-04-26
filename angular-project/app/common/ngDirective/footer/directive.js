/**
 * @file 网站底部
 * @author niejianhui
 * @options  暂时不需要  保留做扩展用
 * usage
 * <footer></footer>
 */

define(function () {
    'use strict';

    angular.module('Manage.directives')
        .directive('footer', function () {
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
                templateUrl: 'app/common/ngDirective/footer/tpl.html',
                link: function($scope) {
                    $scope.currentYear = new Date().getFullYear();
                }
            };
        });
});
