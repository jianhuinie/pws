define(function (require, exports) {

    'use strict';
    var DaytimeSelect = require('common/component/DaytimeSelect');
    var dateUtil = require('cobble/util/date');
    var timeUtil = require('cobble/util/time');
    var Select = require('cobble/form/Select');
    var etpl = require('cobble/util/etpl');
    var moment = require('moment');
    var Validator = require('cobble/form/Validator');

    var tpl = ''
        +   '<div class="form">'
        +       '<div class="time">'
        +           '<div class="form-group inline">'
        +               '<label class="form-label">上课时间</label>'
        +               '<div class="form-controls">'
        +                   '<div class="dropdown start-time">'
        +                       '<input type="text" class="form-text" name="start_time" required/>'
        +                       '<span class="trigger"><i class="caret"></i></span>'
        +                       '<ul class="dropdown-menu"></ul>'
        +                   '</div>'
        +                   '<span class="error"></span>'
        +               '</div>'
        +           '</div>'
        +               '<span class="to">&nbsp;&nbsp;至&nbsp;&nbsp;</span>'
        +           '<div class="form-group inline">'
        +               '<label class="form-label">下课时间</label>'
        +               '<div class="form-controls">'
        +                   '<div class="dropdown end-time" required>'
        +                       '<button class="btn-default">'
        +                           '<i class="caret"></i>'
        +                           '<span>下课时间</span>'
        +                       '</button>'
        +                       '<ul class="dropdown-menu"></ul>'
        +                   '</div>'
        +                   '<span class="error"></span>'
        +               '</div>'
        +           '</div>'
        +       '</div>'
        +       '<div class="week-day form-group inline">'
        +       $.map([
                        {
                            labelName: '周一',
                            value: '1'
                        },
                        {
                            labelName: '周二',
                            value: '2'
                        },
                        {
                            labelName: '周三',
                            value: '3'
                        },
                        {
                            labelName: '周四',
                            value: '4'
                        },
                        {
                            labelName: '周五',
                            value: '5'
                        },
                        {
                            labelName: '周六',
                            value: '6'
                        },
                        {
                            labelName: '周日',
                            value: '0'
                        },
                        {
                            labelName: '全选',
                            value: 'all'
                        }
                    ], function (item) {
                    return ''
                        +   '<label class="day">'
                        +       '<div>' + item.labelName + '</div>'
                        +       '<div class="day-check"><input type="checkbox" name="week_day" value="'+ item.value + '"></div>'
                        +   '</label>'
                }).join('')
        +           '<span class="error"></span>'
        +       '</div>'
        +       '<div class="actions">'
        +           '<b class="delete">删除时段</b>'
        +       '</div>'
        +   '</div>';

    var namespace = '.QuickTeachingPlanSchedule';

    /**
     * 上课开始时段
     *
     * @inner
     * @type {Object}
     */
    var startTimeMap = {
        min: { hour: 6, minute: 0 },
        max: { hour: 23, minute: 30 }
    };

    var halfHour = timeUtil.MINUTE * 30;

    // 添加结束时间处的时间差
    var endItemRender = etpl.compile(

      '<!-- for: ${list} as ${item} -->'
    + '<li data-value="${item.value}" data-text="${item.value}">'
    +     '${item.value}<small class="text-info">${item.hour}小时</small>'
    + '</li>'
    + '<!-- /for -->'

    );

    /**
     * 刷新开始时段 Select
     *
     * @inner
     * @param {Select} select
     * @param {boolean} isToday 是否是当天
     * @param {boolean} selectFirst 是否选定第一项
     */
    function refreshStartTime(select) {

        var range = startTimeMap;

        // 上课开始时段区间
        var min = timeUtil.parse(range.min);
        var max = timeUtil.parse(range.max);

        select.refresh({
            min: timeUtil.simplify(min),
            max: timeUtil.simplify(max)
        });

    }

    /**
     * 刷新结束时段 Select
     *
     * @inner
     * @param {Select} select
     * @param {Date} startTimeMin 开始时段的起始时间
     */
    function refreshEndTime(select, startTimeMin) {

        // 确定好开始时间的 min，结束时间的 min 等于开始时间 + 30 分钟
        var min = timeUtil.add(startTimeMin, { minute: 30 });

        var range = startTimeMap;
        var max = timeUtil.add(timeUtil.parse(range.max), { minute: 30 });

        var data = [];

        for (var i = + min, date; i <= max; i += halfHour) {

            date = new Date(i);

            var hour = (date.getTime() - startTimeMin.getTime()) / timeUtil.HOUR;

            data.push({
                value: timeUtil.stringify(date),
                hour: hour
            });
        }

        select.refresh({
            data: data,
            value: null
        });
    }

    function addHourMinute(date, time) {

        date = date.clone();

        var arr = time.split(':');
        var hour = arr[0];
        var min  = arr[1];

        if(hour == 0 && min == 0) {
            date.add(1, 'd');
        }

        return date.add(hour, 'h').add(min, 'm');
    }

    function QuickTeachingPlanSchedule(options) {
        $.extend(this, options);
        this.init();
    }

    QuickTeachingPlanSchedule.prototype = {
        init: function () {
            var me = this;

            var element = me.element = $(tpl);
            if (me.container) {
                me.container.append(element);

                var startTime = me.startTime = new DaytimeSelect({
                    element: element.find('.start-time'),
                    selectFirst: false,
                    defaultText: '上课时间',
                    onChange: function () {
                        var value = this.element.find(':text').val();
                        refreshEndTime(endTime, timeUtil.parse(value));
                    }
                });

                refreshStartTime(startTime);

                var endTime = me.endTime =  new Select({
                    element: element.find('.end-time'),
                    defaultText: '下课时间',
                    name: 'end_time',
                    renderTemplate: function (data) {
                        return endItemRender({
                            list: data
                        });
                    }
                });

                me.validator = new Validator({
                    element: element,
                    fields: {
                        start_time: {
                            errors: {
                                required: '请选择上课时间'
                            }
                        },
                        end_time: {
                            errors: {
                                required: '请选择下课时间'
                            }
                        },
                        week_day: {
                            custom: function (field, callback) {
                                if (element.find('.week-day :checked').length > 0) {
                                    return false;
                                }
                                else {
                                    return '请至少选择一项';
                                }
                            }
                        }
                    }
                })

            }

            element
            .on('click' + namespace, '.delete', function () {
                me.container.trigger('removeschedule', me);
            })
            .on('click', '.week-day [value="all"]', function () {

                if ($(this).is(':checked')) {
                    me.element.find('.week-day :checkbox').prop('checked', true);
                }
                else {
                    me.element.find('.week-day :checkbox').prop('checked', false);
                }

            })

        },
        remove: function () {

            this.endTime.dispose();
            this.endTime = null;

            this
            .element
            .off(namespace)
            .remove();
        },
        //根据当前选中的日期 开始结束时间 星期数 计算开始结束时间数组
        getCalculatedSchedule: function () {
            var me = this;

            var weekDays = $.map(me.element.find('.week-day :checked').filter('[value!="all"]'), function (item) {
                return Number($(item).val());
            });

            var startDate = moment(me.startDate);
            var endDate = moment(me.endDate);

            var startTime = me.startTime.getValue();
            var endTime = me.endTime.getValue();

            var rt = [];

            for(var date = startDate; date <= endDate; date.add(1, 'd')) {

                if ($.inArray(date.day(), weekDays) != -1) {

                    rt.push({
                        begin: addHourMinute(date, startTime)._d.getTime() / 1000,
                        end: addHourMinute(date, endTime)._d.getTime() / 1000,
                    });
                }
            }

            return rt;
        },
        validate: function () {
            return this.validator.validate();
        },
        refresh: function (data) {
            this.startDate = data.startDate;
            this.endDate = data.endDate;
        }
    };

    return QuickTeachingPlanSchedule;
});