/**
 * @file 时间范围选择
 * 该指令在使用的时候只能以属性的形式挂在input元素上，
 * 通过ng-model进行双向数据绑定。
 * ng-model的数据结构为
 * {
 *    begin: 1403020800000, // 范围开始时间戳
 *    end: 1405612800000 // 范围结束时间戳
 * }
 * 如：<input daterangepicker options="options" ng-model="dateRange" />
 *
 * @author hurry
 */
define(function (require) {
    'use strict';
    var config = require('common/config/common');
    require('../../ui/daterangepicker/index');
    require('../../ui/datetimepicker/index');
    angular
        .module('Manage.directives')
        .directive('daterangepicker', function () {
            return {
                restrict: 'A',
                scope: {

                    /**
                     * @param {boolean} options.isDefaultSelected
                     *        是否默认选中，默认true，
                     *        选中默认selectedDate，
                     *        不选中，反之
                     * @param {number} options.selectableBegin 可选时间的开始
                     * @param {number} options.selectableEnd 可选时间的结束
                     * @param {number} options.maxDuration 最大时间间隔
                     * @param {function} options.onDateSelect 选择时间以后的回调
                     */
                    options: '=options'
                },
                /**
                 * @param {number} begin 默认开始时间
                 * @param {number} end 默认结束时间
                 */
                require: '?ngModel',
                link: function (scope, element, attrs, ngModelCtrl) {
                    var vm = scope;
                    var isToggle = true;
                    var picker;
                    var defaultOptions = {
                        // selectedDate: new Date(),
                        selectableBegin: '2014/1/1',
                        selectableEnd: new Date(),
                        isDefaultSelected: true
                    };
                    var options = $.extend(defaultOptions, vm.options);
                    var ele = $(element);
                    var pre = ele.prev();
                    var next = ele.next();
                    var parent = ele.parent();
                    var wrapper = $('<div class="date-time-wrapper"></div>');
                    var icon = $('<i class="icon-ic_calendar"></i>');
                    icon.on('click', function (e) {
                        if (picker) {
                            var instance = picker.data('DateRangePicker');
                            if (isToggle) {
                                instance.show(e);
                            }
                            else {
                                instance.hide(e);
                            }
                            isToggle = !isToggle;
                        }
                    });
                    wrapper.append(ele).append(icon);
                    if (pre.length) {
                        wrapper.insertAfter(pre);
                    }
                    else if (next.length) {
                        wrapper.insertBefore(next);
                    }
                    else {
                        parent.append(wrapper);
                    }
                    /**
                     * modelValue转为视图用的数据
                     */
                    ngModelCtrl.$formatters.push(function (modelValue) {
                        if (modelValue) {
                            var begin = modelValue.begin;
                            var end = modelValue.end;
                            vm.begin = angular.isString(begin)
                                ? begin.replace(/-/g, '/') : begin;
                            vm.end = angular.isString(end)
                                ? end.replace(/-/g, '/') : end;
                        }
                        return modelValue;
                    });


                    ngModelCtrl.$parsers.push(function (viewValue) {
                        return viewValue;
                    });


                    ngModelCtrl.$render = function () {
                        var currentDate = new Date().getTime();
                        var begin = options.selectableBegin;
                        var end = options.selectableEnd;
                        begin = angular.isString(begin)
                            ? begin.replace(/-/g, '/') : begin;
                        end = angular.isString(end)
                            ? end.replace(/-/g, '/') : end;
                        var uiParam = {
                            selectableDateRange: {
                                from: new Date(begin),
                                to: new Date(end)
                            },
                            isDefaultSelected: options.isDefaultSelected,
                            isAppendBody: true,
                            zIndex: options.zIndex || 1060,
                            maxDuration: options.maxDuration || 30,
                            // 当前选择的时间段
                            selectedRange: {
                                from: new Date(vm.begin || (currentDate - 7 * config.ONE_DAY_MILLISECONDS)),
                                to: new Date(vm.end || currentDate)
                            },
                            onDateSelect: function (val) {
                                var split = val.split('-');
                                var begin = split[0].replace(/\./g, '/');
                                var end = split[1].replace(/\./g, '/');
                                var res = {
                                    begin: new Date(begin).getTime(),
                                    // 结束时间为选中日期的23点59分59秒
                                    end: new Date(end).getTime() + (24 * 60 * 60 * 1000 - 1)
                                };
                                ngModelCtrl.$setViewValue(res);
                                options.onDateSelect && options.onDateSelect(res);
                            }
                        };
                        picker = $(element).daterangepicker(uiParam).prop('readonly', true);
                    };
                }
            };
        });
});