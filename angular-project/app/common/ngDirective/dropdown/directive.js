/**
 * @fileOverview 百度分享的指令
 * @author hurry
 *
 * usage:
 *
 * <dropdown></dropdown>
 */

define(function (require) {
    'use strict';
    require('cc-config/form/Select');
    var Select = require('cc/form/Select');
    // var Select = require('cobble/form/Select');
    angular.module('Manage.directives')
        .directive('dropdown', ['$rootScope',
            function ($rootScope) {
            return {
                restrict: 'EA',
                scope: {
                    /**
                     * 选项
                     * @param {Object} options
                     * @property {jQuery=} options.element 主元素
                     * @property {string} options.defaultValue 默认选中值
                     * @property {string} options.valName 对应value的名称
                     * @property {string} options.txtName 对应text的名称
                     * @property {string} options.assignedValue 选中的值
                     * @property {Array<Object>} options.dataSource 主元素
                     * @property {string} options.dataSource.value value
                     * @property {string} options.dataSource.text 显示值
                     * @property {function(data)} options.onSelected 显示值
                     * @property {function(data.text)} options.onSelected 显示值
                     * @property {function(data.value)} options.onSelected 显示值
                     */
                    options: '=',
                    /**
                     * 用户自定义数据
                     * @type {String}
                     */
                    userDefData: '@'
                },
                templateUrl: 'app/common/ngDirective/dropdown/tpl.html',
                // replace: true,
                link: function($scope, iElm) {
                    var vm = $scope;
                    var select;
                    vm.defaultText = vm.options && vm.options.defaultText;
                    var defaultOption = {
                        // value: vm.defaultText,
                        mainElement: $(iElm).find('.dropdown'),
                        menuSelector: '.menu',
                        labelSelector: '.selected-value',
                        onselect: function (e) {
                            var target = $(e.target);
                            var value = target.data('value');
                            if (value !== '' && $.isFunction(vm.options.onSelected)) {
                                $rootScope.safeApply(function () {
                                    var data = {
                                        text: target.text(),
                                        value: value
                                    };
                                    vm.options.onSelected(tranDtToUserDt(data), vm.userDefData);
                                    vm.options.assignedValue = value;
                                });
                            }
                            // return false;
                        }
                    };
                    function tranDtToUserDt(dt) {
                        var options = vm.options;
                        var newDt = dt;
                        if (options.valName || options.txtName) {
                            newDt = {};
                            options.valName = options.valName || 'value';
                            options.txtName = options.txtName || 'text';
                            newDt[options.valName] = dt.value;
                            newDt[options.txtName] = dt.text;
                        }
                        return newDt;
                    }
                    function formatArrData() {
                        var options = vm.options;
                        // datasource有值，需要转换
                        if (
                            options.dataSource && options.dataSource.length
                            && (options.valName || options.txtName)
                        ) {
                            var newData = [];
                            options.valName = options.valName || 'value';
                            options.txtName = options.txtName || 'text';
                            $.each(options.dataSource, function (i, v) {
                                newData.push({
                                    text: v[options.txtName],
                                    value: v[options.valName]
                                });
                            });
                            options.data = newData;
                            return;
                        }
                        if (options.dataSource && options.dataSource.length) {
                            options.data = options.dataSource;
                            return;
                        }
                        options.data = getEmpty();
                    }
                    function init() {
                        formatArrData();
                        var opt = $.extend(
                                { value: vm.options.defaultValue },
                                defaultOption,
                                vm.options
                            );
                        // opt.defaultText = opt.defaultText;
                        select = new Select(opt);
                        // if (opt.defaultText) {
                        //     select.setValue(opt.defaultText);
                        // }
                    }

                    function getEmpty() {
                        return [{
                            text: '暂无数据',
                            value: ''
                        }];
                    }
                    // init();
                    function main() {
                        // if (vm.options) {
                        vm.$watch('options.dataSource', function (newVal) {
                            if (newVal && newVal.length) {
                                if (select) {
                                    select.set({
                                        data: newVal
                                    });
                                    return;
                                }
                                init();
                            }
                            else if (vm.options) {
                                if (select) {
                                    select.set({
                                        data: getEmpty()
                                    });
                                    return;
                                }
                                init();
                            }
                        });
                        vm.$watch('options.defaultValue', function (newVal) {
                            if (newVal && select) {
                                select.set({
                                    value: newVal
                                });
                            }
                        });
                        //用户指定选中下拉框的值
                        vm.$watch('options.assignedValue', function (newVal) {
                            if (newVal && select) {
                                select.set({
                                    value: newVal
                                });
                            }
                        });
                        vm.$on('$destroy', function () {
                            if (select) {
                                select.dispose();
                            }
                        });
                        // }
                    }
                    main();
                }
            };
        }]);
});