/**
 * @file 科目查询
 * @author hurry
 */

define(function () {
    'use strict';

    angular.module('Manage.directives')
        .directive('subjectSelector', ['ajaxService', '$rootScope', function (ajaxService, $rootScope) {
            // Runs during compile
            return {
                restrict: 'EA',
                scope: {
                    /**
                     * 配置信息
                     * @params {Object} options
                     * @params {string} options.subject1Id
                     * @params {string} options.subject2Id
                     * @params {string} options.subject3Id
                     * @params {Function(Object)} options.onSelected 选中回调函数
                     */
                    options: '='
                },
                replace: true,
                templateUrl: 'app/common/ngDirective/subjectSelector/tpl.html',
                // name: '',
                // priority: 1,
                // terminal: true,
                // scope: {}, // {} = isolate, true = child, false/undefined = no change
                // controller: function($scope, $element, $attrs, $transclude) {},
                // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
                // restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
                // template: '',
                // templateUrl: '',
                // replace: true,
                // transclude: true,
                // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
                link: function($scope) {
                    var vm = $scope;
                    var opts = vm.options;
                    function getSubjects(id) {
                        return ajaxService
                            .send('/api/subject/searchByFid', {
                                isHuikejian: opts.isHuikejian,
                                id: id
                            });
                    }
                    // 科目1
                    vm.subject1SearchOptions = {
                        placeholder: '输入类目名称',
                        onSearch: function (searchKey) {
                            $rootScope.safeApply(function () {
                                vm.subject1ListOptions.dataList = search(vm.subject1AllSource, searchKey);
                                vm.subject2ListOptions.dataList = null;
                                vm.subject3ListOptions.dataList = null;
                            });
                        }
                    };
                    vm.subject1ListOptions = {
                        hasChildren: true,
                        onSelected: function (dt) {
                            vm.selectedSubject1Id = dt.id;
                            vm.selectedSubject1Name = dt.remarkName;
                            getSubjects(dt.id).then(function (res) {
                                var data = res.data;
                                vm.subject2AllSource = data;
                                vm.subject2ListOptions.dataList = data;
                                vm.isShowSearchSubject2 = data && data.length;
                                vm.subject3AllSource = null;
                                vm.subject3ListOptions.dataList = null;
                                vm.isShowSearchSubject3 = false;
                            });
                        }
                    };
                    // 科目2
                    vm.subject2SearchOptions = {
                        placeholder: '输入类目名称',
                        onSearch: function (searchKey) {
                            $rootScope.safeApply(function () {
                                vm.subject2ListOptions.dataList = search(vm.subject2AllSource, searchKey);
                                vm.subject3ListOptions.dataList = null;
                            });
                        }
                    };
                    vm.subject2ListOptions = {
                        hasChildren: true,
                        onSelected: function (dt) {
                            vm.selectedSubject2Id = dt.id;
                            vm.selectedSubject2Name = dt.remarkName;
                            getSubjects(dt.id).then(function (res) {
                                var ds = res.data;
                                vm.subject3AllSource = ds;
                                vm.subject3ListOptions.dataList = ds;
                                vm.isShowSearchSubject3 = ds && ds.length;
                            });
                        }
                    };
                    // 科目3
                    vm.subject3SearchOptions = {
                        placeholder: '输入类目名称',
                        onSearch: function (searchKey) {
                            $rootScope.safeApply(function () {
                                vm.subject3ListOptions.dataList = search(vm.subject3AllSource, searchKey);
                            });
                        }
                    };
                    vm.subject3ListOptions = {
                        hasChildren: false,
                        onSelected: function (dt) {
                            vm.selectedSubject3Id = dt.id;
                            vm.selectedSubject3Name = dt.remarkName;
                            if ($.isFunction(opts.onSelected)) {
                                opts.onSelected({
                                    1: {
                                        id: vm.selectedSubject1Id,
                                        name: vm.selectedSubject1Name
                                    },
                                    2: {
                                        id: vm.selectedSubject2Id,
                                        name: vm.selectedSubject2Name
                                    },
                                    3: {
                                        id: vm.selectedSubject3Id,
                                        name: vm.selectedSubject3Name
                                    }
                                });
                            }
                        }
                    };

                    function search(allSource, searchKey) {
                        if (!searchKey) {
                            return allSource;
                        }
                        var source = [];
                        $.each(allSource, function (i, n) {
                            if (n.remarkName.indexOf(searchKey) !== -1) {
                                source.push(n);
                            }
                        });
                        return source;
                    }
                    function main() {
                        getSubjects().then(function (res) {
                            vm.subject1AllSource = res.data;
                            vm.subject1ListOptions.dataList = vm.subject1AllSource;
                        });
                    }
                    main();
                }
            };
        }]);
});
