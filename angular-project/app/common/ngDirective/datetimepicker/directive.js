/**
 * @file 时间选择
 * @author hurry
 * 该指令在使用的时候只能以属性的形式挂在input元素上，
 * 通过ng-model进行双向数据绑定。ng-model的值即为当前选定日期0点的时间戳
 * 如：<input datetimepicker options="options" ng-model="selectedTime" />
 * @date   2015/11/06
 */
define(function (require) {
    'use strict';
    var config = require('common/config/common');
    var moment = require('moment');
    require('../../ui/datetimepicker/index');
    angular
        .module('Manage.directives')
        .directive('datetimepicker', function () {
            return {
                restrict: 'A',
                scope: {

                    /**
                     * @param {number} options.selectedDate 默认选中时间
                     * @param {boolean} options.isDefaultSelected
                     *        是否默认选中，默认true，
                     *        选中默认selectedDate，
                     *        不选中，反之
                     * @param {number} options.selectableBegin 可选时间的开始时间戳
                     * @param {number} options.selectableEnd 可选时间的结束结束时间戳
                     * @param {number} options.onDateSelect 选择时间以后的回调
                     */
                    options: '=options'
                },
                require: '?ngModel',
                link: function (scope, element, attrs, ngModelCtrl) {
                    var isToggle = true;
                    var picker;
                    var vm = scope;
                    var defaultOptions = {
                        selectedDate: moment().format(config.MOMENT_DATE_FORMAT).replace(/-/g, '/'),
                        selectableBegin: '2014/6/16',
                        selectableEnd: new Date(),
                        isDefaultSelected: true
                    };
                    function init() {
                        var ele = $(element);
                        var pre = ele.prev();
                        var next = ele.next();
                        var parent = ele.parent();
                        var wrapper = $('<div class="date-time-wrapper"></div>');
                        var icon = $('<i class="icon-ic_calendar"></i>');
                        icon.on('click', function (e) {
                            if (picker) {
                                var instance = picker.data('DateTimePicker');
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
                    }
                    function main() {
                        init();
                    }
                    main();
                    /**
                     * modelValue转为视图用的数据
                     */
                    ngModelCtrl.$formatters.push(function (modelValue) {
                        if (modelValue) {
                            vm.selectedDate = vm.options.selectedDate = modelValue;
                        }
                        return modelValue;
                    });


                    ngModelCtrl.$parsers.push(function (viewValue) {
                        return viewValue;
                    });

                    ngModelCtrl.$render = function () {
                        if (vm.options) {
                            var options = $.extend({}, defaultOptions, vm.options);
                            var begin = options.selectableBegin;
                            var end = options.selectableEnd;
                            begin = angular.isString(begin)
                                ? begin.replace(/-/g, '/') : begin;
                            end = angular.isString(end)
                                ? end.replace(/-/g, '/') : end;
                            var selectedDate = options.selectedDate;
                            selectedDate = angular.isString(selectedDate)
                                ? selectedDate.replace(/-/g, '/') : selectedDate;
                            var uiParam = {
                                selectedDate: new Date(selectedDate),
                                isAppendBody: true,
                                zIndex: options.zIndex || 1100,
                                isDefaultSelected: options.isDefaultSelected,
                                selectableDateRange: {
                                    from: new Date(begin),
                                    to: new Date(end)
                                },
                                onDateSelect: function (val) {
                                    val = new Date(val).getTime();
                                    ngModelCtrl.$setViewValue(val);
                                    options.onDateSelect && options.onDateSelect(val);
                                }
                            };
                            picker = $(element).datetimepicker(uiParam);
                            picker.prop('readonly', true);
                        }
                    };
                }
            };
        });
});