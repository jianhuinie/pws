/**
 * @file 科目选择
 * @author niejianhui
 */

define(function () {
    'use strict';

    angular.module('Manage.directives')
        .directive('selectSubject', ['ajaxService', '$rootScope', function (ajaxService, $rootScope) {
            return {
                restrict: 'EA',
                scope: {
                    /**
                     * 配置信息
                     * @params {Object} options
                     * @params {Object} options.subjectId 选中的科目ID
                     * @params {Object} options.subjectName 选中的科目第三级名称
                     * @params {Object} options.pathCrumbs  已选中的科目名称
                     * @params {Function(Object)} options.onSelected 选中回调函数
                     */
                    options: '='
                },
                replace: true,
                templateUrl: 'app/common/ngDirective/selectSubject/tpl.html',
                link: function($scope) {
                    //阻止事件冒泡
                    $('.select-subject-wrappers').click(function (e) {
                        e.stopPropagation();
                    });
                    //初始化历史科目参数
                    $scope.historySubjectsOpts = {
                        onSelected: $scope.options.onSelected
                    };

                    //初始化三级下拉科目参数
                    $scope.tribbleSubjectOpts = {
                        onSelected: $scope.options.onSelected
                    };

                    //添加watch
                    $scope.$watch('options', function (newVal) {
                        if (newVal.subjectId) {
                            $scope.historySubjectsOpts.subjectId = newVal.subjectId;
                            $scope.tribbleSubjectOpts.subjectId = newVal.subjectId;
                            $scope.tribbleSubjectOpts.subjectName = newVal.subjectName;
                            $scope.tribbleSubjectOpts.pathCrumbs = newVal.pathCrumbs;
                        }
                    }, true);
                }
            };
        }]);
});
