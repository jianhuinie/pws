/**
 * @file 没数据提示
 * @author niejianhui
 */

define(function () {
    'use strict';

    angular.module('Manage.directives')
        .directive('loadingStatus', function () {
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
                templateUrl: 'app/common/ngDirective/loadingStatus/tpl.html',
                link: function() {
                    
                }
            };
        });
});
