/**
 * @file subjectList
 * @author hurry
 */

define(function () {
    'use strict';

    angular.module('Manage.directives')
        .directive('subjectList', function (){
            // Runs during compile
            return {
                restrict: 'EA',
                scope: {
                    /**
                     * 配置信息
                     * @params {Object} options
                     * @params {Array<Object>} options.dataList 展现数据
                     * @params {string} options.dataList.remarkName
                     * @params {string} options.dataList.id
                     * @params {Function(Object)} options.onSelected 选中回调函数
                     * @params {string} options.onSelected.id
                     * @params {string} options.onSelected.remarkName
                     */
                    options: '='
                },
                replace: true,
                templateUrl: 'app/common/ngDirective/subjectList/tpl.html',
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
                    vm.onSelected = function (event) {
                        var target = $(event.currentTarget);
                        var classNames = target.attr('class');
                        if (classNames.indexOf('item') > -1) {
                            var id = target.data('id');
                            vm.selectedId = id;
                            var remarkName = target.data('remarkName');
                            if ($.isFunction(opts.onSelected)) {
                                opts.onSelected({
                                    id: id,
                                    remarkName: remarkName
                                });
                            }
                            event.stopPropagation();
                        }
                    };
                    vm.$watch('options.dataList', function () {
                        vm.selectedId = null;
                    });
                }
            };
        });
});
