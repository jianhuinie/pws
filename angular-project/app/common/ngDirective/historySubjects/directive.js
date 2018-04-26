/**
 * @file 历史科目选择
 * @author niejianhui
 */

define(function () {
    'use strict';

    angular.module('Manage.directives')
        .directive('historySubjects', ['ajaxService', '$rootScope', '$timeout', function (ajaxService, $rootScope, $timeout) {
            return {
                restrict: 'EA',
                scope: {
                    /**
                     * 配置信息
                     * @params {Object} options
                     * @params {Object} options.subjectId  已选中的科目id
                     * @params {Object} options.pathCrumbs  已选中的科目名称
                     * @params {Function(Object)} options.onSelected 选中回调函数
                     */
                    options: '='
                },
                replace: true,
                templateUrl: 'app/common/ngDirective/historySubjects/tpl.html',
                link: function($scope) {

                    function setItemActive(id) {
                        $.each($scope.historySubjects, function (index, item) {
                            if (item.id === id) {
                                item.active = true;
                            }
                            else {
                                item.active = false;
                            }
                        }); 
                    }

                    
                    //获取历史科目数据 并初始化
                    function initHistorySubjectList() {
                        ajaxService
                            .send('/api/subject/searchHistorySubject', {data:{}, method: 'GET'})
                            .then(function (response) {
                                $scope.historySubjects = response.data;
                                if ($scope.options.subjectId) {
                                    setItemActive($scope.options.subjectId);
                                }
                            });
                    }

                    initHistorySubjectList();

                    //选择历史科目
                    $scope.selectHistorySubject = function (item) {
                        setItemActive(item.id);
                        var data = {
                            id: item.id,
                            pathCrumbs: item.path_crumbs,
                            pathMark: item.path_mark
                            // eventName: 'selectHistorySubject'
                        };
                        $scope.options.onSelected(data);
                    };

                    // //监听选中三级下拉科目
                    // $scope.$on('selectTribbleSubject', function (e, data) {
                    //     setItemActive(data.id);
                    // });

                    //添加watch
                    $scope.$watch('options.subjectId', function (newVal) {
                        if (newVal && $scope.historySubjects) {
                            setItemActive(newVal);
                        }
                    });

                }
            };
        }]);
});
