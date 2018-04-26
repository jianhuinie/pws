/**
 * @file 科目查询
 * @author hurry
 */

define(function () {
    'use strict';

    angular.module('Manage.directives')
        .directive('searchSubject', ['ajaxService', '$rootScope', 'utilService', function (ajaxService, $rootScope, utilService) {
            // Runs during compile
            return {
                restrict: 'EA',
                scope: {
                    /**
                     * 配置信息
                     * @params {Object} options
                     * @params {Function(Object)} options.onSelected 选中回调函数
                     */
                    options: '='
                },
                replace: true,
                templateUrl: 'app/common/ngDirective/searchSubject/tpl.html',
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
                link: function($scope, iEle) {
                    var vm = $scope;
                    var opts = vm.options;

                    //watch搜索框内容改变
                    $scope.watchSearchKey = function () {
                        var content = $scope.searchKey;
                        //$scope.$watch('searchKey', function (newVal, oldVal) {
                        if (content && content.trim()) {
                            vm.search();
                        }
                        //});
                    };

                    vm.search = function () {
                        ajaxService
                            .send('/api/subject/searchByName', { name: vm.searchKey })
                            .then(function (res) {
                                if (res.data) {
                                    // vm.isShowResult = true;
                                    var list = res.data.list;
                                    vm.searchResult = list;
                                    vm.isShowEmpty = !list;
                                }
                            });
                    };
                    function onSelected() {
                        $('.search-result').on('click', '.third', function (e) {
                            $rootScope.safeApply(function () {
                                if ($.isFunction(opts.onSelected)) {
                                    var target = $(e.target);
                                    var data = target.data();
                                    vm.searchKey = ''
                                        + data.subject1name
                                        + '>'
                                        + data.subject2name
                                        + '>'
                                        + data.subject3name;
                                    opts.onSelected({
                                        1: {
                                            id: data.subject1id,
                                            name: data.subject1name
                                        },
                                        2: {
                                            id: data.subject2id,
                                            name: data.subject2name
                                        },
                                        3: {
                                            id: data.subject3id,
                                            name: data.subject3name
                                        }
                                    });
                                }
                                vm.searchResult = null;
                            });
                            utilService.stopPropagation(e);
                        });
                    }
                    function bindEvent() {
                        onSelected();
                        //watchSearchKey();

                        $(iEle).find('.search-subject-form').on('submit', function () {
                            vm.search();
                        });
                        $(document.body).on('click', function () {
                            $rootScope.safeApply(function () {
                                vm.searchResult = null;
                                vm.isShowEmpty = false;
                            });
                        });
                    }
                    function main() {
                        bindEvent();
                    }
                    main();
                }
            };
        }]);
});
