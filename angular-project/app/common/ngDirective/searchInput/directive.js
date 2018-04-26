/**
 * @file subjectList
 * @author hurry
 */

define(function () {
    'use strict';

    angular.module('Manage.directives')
        .directive('searchInput', function (){
            // Runs during compile
            return {
                restrict: 'EA',
                scope: {
                    /**
                     * 配置信息
                     * @params {Object} options
                     * @params {string} options.placeholder placeholder
                     * @params {Function(string)} options.onSearch 选中回调函数
                     */
                    options: '='
                },
                // replace: true,
                templateUrl: 'app/common/ngDirective/searchInput/tpl.html',
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
                    $(iEle).find('.search-input-wrapper .search-form').on('submit', function () {
                        vm.search();
                    });

                    vm.search = function () {
                        if ($.isFunction(opts.onSearch)) {
                            opts.onSearch(vm.searchKey);
                        }
                    };
                }
            };
        });
});
