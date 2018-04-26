/**
 * @file 没数据提示
 * @author niejianhui
 */

define(function () {
    'use strict';

    angular.module('Manage.directives')
        .directive('emptyData', ['ajaxService', '$rootScope', function (ajaxService, $rootScope) {
            return {
                restrict: 'EA',
                scope: {
                    /**
                     * 配置信息
                     * @params {Object} options
                     */
                    options: '='
                },
                replace: true,
                templateUrl: 'app/common/ngDirective/emptyData/tpl.html',
                link: function($scope) {
                    var options = $scope.options;
                    $scope.remindText = options.text || '暂无数据';
                }
            };
        }]);
});
