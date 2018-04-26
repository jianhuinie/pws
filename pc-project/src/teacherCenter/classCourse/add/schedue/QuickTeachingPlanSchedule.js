/**
 * @file 批量添加课节
 * @author wangtianhua
 */
define(function (require, exports) {

    'use strict';

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
        +                   '<div class="starTime">'
        +                       '<div class="dropdown start-hour" style="width: 65px" required>'
        +                           '<button class="btn-default" style="width: 65px">'
        +                               '<i class="caret"></i>'
        +                               '<span>小时</span>'
        +                           '</button>'
        +                           '<ul class="dropdown-menu"></ul>'
        +                       '</div>'
        +                       '&nbsp;&nbsp;：'
        +                       '<div class="dropdown start-minute" style="width: 65px" required>'
        +                           '<button class="btn-default" style="width: 65px">'
        +                               '<i class="caret"></i>'
        +                               '<span>分钟</span>'
        +                           '</button>'
        +                           '<ul class="dropdown-menu"></ul>'
        +                       '</div>'
        +                   '</div>'
        +               '</div>'
        +           '</div>'
        +           '<div class="form-group inline">'
        +               '<label class="form-label" style="margin-left: 30px;">课程时长</label>'
        +               '<div class="form-controls">'
        +                   '<div class="dropdown end-time" style="margin-left: 20px;width: 110px" required>'
        +                       '<button class="btn-default" style="width: 110px">'
        +                           '<i class="caret"></i>'
        +                           '<span>课程时长</span>'
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

    var halfHour = timeUtil.MINUTE * 30;

    // 添加结束时间处的时间差
    var ItemRender = etpl.compile(

          '<!-- for: ${list} as ${item} -->'
        + '<li data-value="${item}" data-text="${item}">'
        +     '${item}'
        + '</li>'
        + '<!-- /for -->'

    );

    /**
     * 刷新结束时段 Select
     *
     * @inner
     * @param {Select} select
     * @param {Date} hour 小时
     * @param {Date} minute 分钟
     */
    function refreshEndTime(select,  hour, minute) {

        var duration = 6;
        /*
        if ( hour >= 18 ) {
            if ( minute > 30 ) {
                duration = 24 - hour - 1;
            }
            else {
                duration = 24 - hour - 0.5;
            }
        }
        */
        var endTimes = [];
        for (var i = 0.5; i <= duration ; i = i + 0.5) {
            endTimes.push( i + '小时')
        }
        select.refresh({
            data: endTimes,
            value: null
        });
    }

    /**
     * 上课时间 Select
     *
     * @inner
     * @param {Select} select
     */
    function refreshstartHour(select,isToday) {
        var hours = [];
        var current = new Date();
        var hour = 0;
        if (isToday && current.getHours() >= 0) {
            if (current.getMinutes() > 55) {
                hour = current.getHours() + 1;
            }
            else {
                hour = current.getHours()
            }
        }
        for (var i = hour; i < 24 ; i++) {
            if (i < 10) {
                hours.push('0'+ i)
            }
            else {
                hours.push(i)
            }
        }
        select.refresh({
            data: hours,
            value: ''
        });
    }

    function refreshstartMinute(select, hour,isToday) {
        var maxm = 55;
        var min = 0;
        var current = new Date();
        /*
        if (hour == 23) {
            maxm = 30
        }
        */
        var minutes = [];
        if (isToday && current.getHours() == hour) {
            for (var i = 5; i <= 55; i = i + 5) {
                if (current.getMinutes() < i) {
                    min = i;
                    break;
                }
            }
        }
        for (var i = min; i <= maxm ; i = i + 5) {
            if (i < 10) {
                minutes.push('0'+ i)
            }
            else {
                minutes.push(i)
            }
        }
        select.refresh({
            data: minutes,
            value: ''
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
            var isToday = false;
            var nowDate = new Date();
            var today = dateUtil.stringify(nowDate);
            if (today == me.startDate) {
                isToday = true;
            }
            var element = me.element = $(tpl);
            if (me.container) {
                me.container.append(element);

                var starTime = element.find('.starTime');

                var startHour = me.startHour = new Select({
                    element: element.find('.start-hour'),
                    defaultText: '小时',
                    name: 'hour',
                    renderTemplate: function (data) {
                        return ItemRender({
                            list: data
                        });
                    },
                    onChange: function () {
                        var hour = this.element.find('[name = "hour"]').val();
                        var minute = starTime.find('[name = "minute"]').val();
                        refreshstartMinute(startMinute, hour,isToday);
                        if (hour && minute) {
                            refreshEndTime(endTime, hour, minute);
                        }
                    }
                });

                var startMinute = me.startMinute = new Select({
                    element: element.find('.start-minute'),
                    defaultText: '分钟',
                    name: 'minute',
                    renderTemplate: function (data) {
                        return ItemRender({
                            list: data
                        });
                    },
                    onChange: function () {
                        var minute = this.element.find('[name = "minute"]').val();
                        var hour = starTime.find('[name = "hour"]').val();
                        if (hour && minute) {
                            refreshEndTime(endTime, hour, minute);
                        }
                    }
                });

                var endTime = me.endTime =  new Select({
                    element: element.find('.end-time'),
                    defaultText: '课程时长',
                    name: 'end_time',
                    renderTemplate: function (data) {
                        return ItemRender({
                            list: data
                        });
                    }
                });
                var hour = starTime.find('[name = "hour"]').val();
                refreshstartHour(startHour,isToday);
                refreshstartMinute(startMinute,hour,isToday);

                me.validator = new Validator({
                    element: element,
                    fields: {
                        hour: {
                            errors: {
                                required: '请选择上课时间'
                            }
                        },
                        minute: {
                            errors: {
                                required: '请选择上课时间'
                            }
                        },
                        end_time: {
                            errors: {
                                required: '请选择课节时长'
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

            var startTime = me.startHour.getValue() + ":" + me.startMinute.getValue();
            var minute = parseInt(me.startMinute.getValue()) + parseFloat(me.endTime.getValue()) * 60;
            var endHour = parseInt(me.startHour.getValue()) + Math.floor( minute / 60 );
            var endMinute = minute % 60;
            var endTime;
            if (endHour == 24) {
                endTime == '00.00'
            }
            endTime = endHour + ':' + endMinute ;
            var nowDate = new Date();
            var today = dateUtil.stringify(nowDate);
            var nowTime = timeUtil.stringify(nowDate);

            if (today == me.startDate) {
                if (timeUtil.parse(nowTime) > timeUtil.parse(startTime)) {
                    var sDate = dateUtil.parse(today).getTime();
                    sDate = sDate + dateUtil.DAY;
                    me.startDate = dateUtil.stringify(sDate);
                }
            }
            var startDate = moment(me.startDate);
            var endDate = moment(me.endDate);


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