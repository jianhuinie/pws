/**
 * @file 日期下拉选择，可配置是否需要年、月、日
 * @author zhujialu
 */
define(function (require, exports, module) {

    'use strict';

    var parseDate = require('cc/function/parseDate');
    var lastDateInMonth = require('cc/function/lastDateInMonth');

    var minYear = 1914;
    var maxYear = 2016;

    var VALUE_SOFAR = -1;

    /**
     * 创建年份下拉框的数据
     *
     * @inner
     * @return {Array}
     */
    function createYearData(start, end, hasSofar) {
        var result = [];

        if (hasSofar) {
            result.push({
                text: '至今',
                value: VALUE_SOFAR
            });
        }

        for (var i = end; i >= start; i--) {
            result.push({
                text: i + '年',
                value: i
            });
        }
        return result;
    }

    /**
     * 创建月份下拉框的数据
     *
     * @inner
     * @return {Array}
     */
    function createMonthData() {
        var result = [ ];
        for (var i = 1; i <= 12; i++) {
            result.push({
                text: i + '月',
                value: i
            });
        }
        return result;
    }

    /**
     * 创建日期下拉框的数据
     *
     * @inner
     * @param {number} year 年份
     * @parma {number} month 月份
     * @return {Array}
     */
    function createDateData(year, month) {

        var firstDay = parseDate({
            year: year,
            month: month,
            date: 1
        });

        var lastDay = lastDateInMonth(firstDay);

        var count = lastDay.getDate();
        var result = [ ];

        for (var i = 1; i <= count; i++) {
            result.push({
                text: i + '日',
                value: i
            });
        }

        return result;

    }

    return Ractive.extend({
        template: require('html!./DateSelect.html'),
        data: function () {
            return {
                style: require('text!./DateSelect.styl'),
                options: {

                    className: '',

                    sofar: true,

                    // 如果以下三个任何一个没传值，表示不需要
                    // 比如只需要选择年月，不需要传入 date

                    year: {
                        name: '',
                        value: '',
                        min: '',
                        max: '',
                        defaultText: '年'
                    },

                    month: {
                        name: '',
                        value: '',
                        defaultText: '月'
                    },

                    date: {
                        name: '',
                        value: '',
                        defaultText: '日'
                    }

                }
            };
        },
        components: {
            Select: require('./Select')
        },
        oninit: function () {

            var me =  this;

            var hasSofar = me.get('options.sofar');

            var hasYear = me.get('options.year');
            var hasMonth = me.get('options.month');
            var hasDate = me.get('options.date');

            if (hasYear) {
                var min = me.get('options.year.min') || minYear;
                var max = me.get('options.year.max') || maxYear;

                me.set({
                    'options.year.data': createYearData(min, max, hasSofar),
                    'options.year.onselect': function () {
                        var data = { };
                        if (hasMonth) {
                            data['options.month.value'] = '';
                        }
                        if (hasDate) {
                            data['options.date.value'] = '';
                        }
                        me.set(data);
                    }
                });
            }

            if (hasMonth && hasDate) {
                me.set('options.month.onselect', function () {
                    me.set('options.date.value', '');
                });
            }

        },
        onrender: function () {

            var me = this;

            var hasYear = me.get('options.year');
            var hasMonth = me.get('options.month');
            var hasDate = me.get('options.date');

            if (hasYear) {
                me.observe('options.year.value', function (value) {
                    if (hasMonth) {
                        var data = { };
                        if (value != VALUE_SOFAR) {
                            data['options.month.data'] = createMonthData();
                            data['options.month.hidden'] = false;
                            if (hasDate) {
                                data['options.date.hidden'] = false;
                            }
                        }
                        else {
                            data['options.month.data'] = [ ];
                            data['options.month.hidden'] = true;
                            if (hasDate) {
                                data['options.date.hidden'] = true;
                            }
                        }
                        me.set(data);
                    }
                });
            }

            if (hasMonth && hasDate) {
                me.observe('options.month.value', function (value) {
                    var year = me.get('options.year.value');
                    var month = me.get('options.month.value');
                    me.set(
                        'options.date.data',
                        year > 0 && month > 0
                        ? createDateData(year, month)
                        : [ ]
                    );
                });
            }
        }
    });

});