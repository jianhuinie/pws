/**
 * @file 网站头部导航
 * @author niejianhui
 * usage
 * <language-selector></language-selector>
 */

define(function () {
    'use strict';

    angular.module('Manage.directives')
        .directive('languageSelector', ['$rootScope', 'utilService',
         function ($rootScope, utilService) {
            return {
                restrict: 'E',
                scope: {
                    /**
                     * 配置信息
                     * @params {Object} options.defaultValue
                     * @params {Object} options.onSelected
                     */
                    options: '='
                },
                replace: true,
                templateUrl: 'app/common/ngDirective/languageSelector/tpl.html',
                link: function($scope) {
                    $scope.languageSelectorOptions = {
                        defaultValue: $scope.options.defaultValue,
                        dataSource: [
                            {
                                value: 1,
                                text: '中文_普通话'
                            },
                            {
                                value: 2,
                                text: '中文_方言'
                            },
                            {
                                value: 3,
                                text: '英语'
                            },
                            {
                                value: 4,
                                text: '日语'
                            },
                            {
                                value: 5,
                                text: '法语'
                            },
                            {
                                value: 6,
                                text: '韩语'
                            },
                            {
                                value: 7,
                                text: '德语'
                            },
                            {
                                value: 8,
                                text: '西班牙语'
                            },
                            {
                                value: 9,
                                text: '俄语'
                            },
                            {
                                value: 10,
                                text: '意大利语'
                            },
                            {
                                value: 11,
                                text: '葡萄牙语'
                            }
                        ],
                        onSelected: function (data) {
                            $scope.options.onSelected(data.value);
                        }
                    };
                    $scope.$watch('options.defaultValue', function (newValue) {
                        if (newValue) {
                            $scope.languageSelectorOptions.assignedValue = newValue;
                        }
                    });
                }
                
                
            };
        }]);
});
