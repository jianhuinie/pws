/**
 * @file 日期选择器
 * @author zhujialu
 */
define(function (require) {

    'use strict';

    var Select = require('cobble/form/Select');
    var dateUtil = require('cobble/util/date');
    var currentYear = new Date().getFullYear();

    /**
     *
     * 构造函数
     *
     * @constructor
     * @param {Object} options
     * @property {jQuery} options.element
     * @property {?string} options.prefix name 的 prefix，便于使用 form.parse
     *
     * @property {?string} options.defaultYearText 默认年文案
     * @property {?string} options.defaultMonthText 默认月文案
     * @property {?string} options.defaultDateText 默认日文案
     *
     * @property {?number} options.startYear 开始年份
     * @property {?number} options.endYear 结束年份
     * @property {?boolean} options.sofar 是否包含至今选项,
     *
     * @property {?number} options.year 选中年份
     * @property {?number} options.month 选中月份
     * @property {?number} options.date 选中日期
     * @property {?Function} options.onYearChange 年份变化时触发
     * @property {?Function} options.onMonthChange 月份变化时触发
     * @property {?Function} options.onDateChange 日期变化时触发
     */
    function DateSelect(options) {
        $.extend(this, DateSelect.defaultOptions, options);
        this.init();
    }

    DateSelect.prototype = {

        init: function () {

            var me = this;
            var element = this.element;

            var prefix = me.prefix || '';
            var defaultYearText = me.defaultYearText || '- 年 -';
            var defaultMonthText = me.defaultMonthText || '- 月 -';
            var defaultDateText = me.defaultDateText || '- 日 -';

            var yearSelect =
            me.yearSelect = new Select({
                element: element.find('.year'),
                defaultText: defaultYearText,
                name: prefix + 'year',
                onChange: function () {
                    monthSelect.refresh({
                        data: createMonthData(yearSelect.getValue()),
                        value: me.month
                    });

                    if ($.isFunction(me.onYearChange)) {
                        me.onYearChange();
                    }
                }
            });

            var monthSelect =
            me.monthSelect = new Select({
                element: element.find('.month'),
                defaultText: defaultMonthText,
                name: prefix + 'month',
                onChange: function () {

                    var year = yearSelect.getValue();
                    var month = monthSelect.getValue();

                    var data = month
                             ? createDateData(year, month)
                             : [ ];

                    dateSelect.refresh({
                        data: data,
                        value: me.date
                    });

                    if ($.isFunction(me.onMonthChange)) {
                        me.onMonthChange();
                    }
                }
            });

            var dateSelect =
            me.dateSelect = new Select({
                element: element.find('.date'),
                defaultText: defaultDateText,
                name: 'date',
                onChange: function () {
                    if ($.isFunction(me.onDateChange)) {
                        me.onDateChange();
                    }
                }
            });

            yearSelect.refresh({
                data: createYearData(me.startYear, me.endYear, me.sofar)
            });

            me.refresh();

        },

        /**
         * 刷新
         *
         * @param {Object} data
         * @property {number} data.year
         * @property {number} data.month
         * @property {number} data.date
         */
        refresh: function (data) {

            var me = this;

            if (data) {
                $.extend(me, data);
            }

            // 逆序操作
            setValue(me.dateSelect, me.date);
            setValue(me.monthSelect, me.month);
            setValue(me.yearSelect, me.year);

        }

    };

    DateSelect.defaultOptions = {
        startYear: 1914,
        endYear: currentYear
    };

    function setValue(select, value) {
        select.setValue(null);
        if (value != null) {
            select.setValue(value);
        }
    }

    /**
     * 创建年份下拉框的数据
     *
     * @inner
     * @param {number} start 开始年份
     * @parma {number} end 结束年份
     * @param {?boolean} sofar 是否包含至今
     * @return {Array}
     */
    function createYearData(start, end, sofar) {

        var data = [ ];

        if (sofar) {
            data.push({
                text: '至今',
                value: -1
            });
        }

        for (var i = end; i >= start; i--) {
            data.push({
                text: i,
                value: i
            });
        }
        return data;
    }

    /**
     * 创建月份下拉框的数据
     *
     * @inner
     * @return {Array}
     */
    function createMonthData(year) {
        var maxMonth = 12;
        if (currentYear === year) {
            maxMonth = new Date().getMonth() + 1;
        }
        var data = [ ];
        for (var i = 1; i <= maxMonth; i++) {
            data.push({
                text: i,
                value: i
            });
        }
        return data;
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

        var firstDay = dateUtil.parse({
            year: year,
            month: month,
            date: 1
        });

        var lastDay = dateUtil.getMonthLastDay(firstDay);

        var count = lastDay.getDate();
        var data = [ ];

        for (var i = 1; i <= count; i++) {
            data.push({
                text: i,
                value: i
            });
        }

        return data;

    }

    DateSelect.createYearData = createYearData;
    DateSelect.createMonthData = createMonthData;
    DateSelect.createDateData = createDateData;


    return DateSelect;

});
