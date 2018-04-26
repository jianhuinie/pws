/**
 * @file 添加单一课节
 */
define(function (require, exports) {

    'use strict';
    var Dialog = require('cobble/ui/Dialog');
    var Calendar = require('cobble/form/Date');
    var dateUtil = require('cobble/util/date');
    var Select = require('cobble/form/Select');
    var eventEmitter = require('common/eventEmitter');
    var timeUtil = require('cobble/util/time'); // 解析时间
    var etpl = require('cobble/util/etpl');

    var courseLength = 0; //半小时单位 1代表半小时
    // 刷新开始小时
    function refreshstartHour(select, isToday) {

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
    // 刷新开始分钟
    function refreshstartMinute(select, isToday, hour) {
        var minutes = [];
        var current = new Date();
        var minute = 55;
        var smin = 0;
        /*
        if (hour == 23) {
            minute = 30
        }
        */
        if (isToday && current.getHours() == hour) {
            for (var i = 5; i <= 55; i = i + 5) {
                if (current.getMinutes() < i) {
                    smin = i;
                    break;
                }
            }
        }
        for (var i = smin; i <= minute ; i = i + 5) {
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
    // 刷新结束时间
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
    // 今天的日期
    var today = function () {
        var d = new Date();
        var year = d.getFullYear();
        var month = d.getMonth() + 1;
        if (month < 10) {
            month = '0' + month;
        }
        var day = d.getDate();
        if (day < 10) {
            day = '0' + day;
        }
        return year + '-' + month + '-' + day;
    }();

    var initItemCalendar = function (container, me) {
        var selectors = {};
        $(container).each(function () {

            var startHour = new Select({
                element: $(this).find('.hour'),
                defaultText: '小时',
                name: 'hour',
                renderTemplate: function (data) {
                    return Simplite.render('plan-time-item', data);
                },
                onChange: function () {
                    var isToday = false;
                    if (dateSelect.getValue() == today) {
                        isToday = true;
                    }
                    refreshstartMinute(startMinute, isToday, startHour.getValue());
                    refreshEndTime( endTime, startHour.getValue(), startMinute.getValue());
                    validatePlan(selectors, container);
                }
            });
            var startMinute = new Select({
                element: $(this).find('.minute'),
                defaultText: '分钟',
                name: 'minute',
                renderTemplate: function (data) {
                    return Simplite.render('plan-time-item', data);
                },
                onChange: function () {
                    refreshEndTime( endTime, startHour.getValue(), startMinute.getValue());
                    validatePlan(selectors, container);
                }
            });
            var endTime = new Select({
                element: $(this).find('.end-time'),
                defaultText: '选择课程时长',
                name: 'endTime',
                renderTemplate: function (data) {
                    return Simplite.render('plan-time-item', data);
                },
                onChange: function () {
                    validatePlan(selectors, container);
                }
            });

            if (me.isOrganization) {
                var teacherSelect = new Select({
                    element: $(this).find('.teacher-list'),
                    defaultText: '请选择授课老师',
                    data: me.teacherList,
                    onChange: function () {
                        validateTeacher(selectors, container);
                    }
                });
            }

            var dateSelect = new Calendar({
                element: $(this).find('.course-date'),
                onChange: function () {

                    // 当前选中的日期，如 2014-08-30
                    var date = this.element.val();

                    var isToday = false;
                    if (date == today) {
                        isToday = true;
                    }
                    refreshstartHour ( startHour, isToday);
                    refreshstartMinute ( startMinute, isToday);
                    refreshEndTime( endTime );

                    validatePlan(selectors, container);
                }
            });
            dateSelect.close();
            selectors.startHour = startHour;
            selectors.startMinute = startMinute;
            selectors.endTime = endTime;
            selectors.dateSelect = dateSelect;
            if (me.isOrganization) {
                selectors.teacherSelect = teacherSelect;
            }
        });
        return selectors;
    };

    var validate = function (result, container, me) {
        var valid = validatePlan(result, container);
        if (me.isOrganization) {
            valid = valid & validateTeacher(result, container);
        }
        return valid;
    };

    var validatePlan = function (result, container) {
        var scheduleErrors = [];
        var valid = true;
        if (!result.dateSelect.getValue()) {
            scheduleErrors.push('授课日期');
        }
        if (!result.startHour.getValue()) {
            scheduleErrors.push('上课小时');
        }
        if (!result.startMinute.getValue()) {
            scheduleErrors.push('上课分钟');
        }
        if (!result.endTime.getValue()) {
            scheduleErrors.push('课程时长');
        }
        if (scheduleErrors.length) {
            valid = false;
            container.find('.time-error').text('请选择' + scheduleErrors.join(', ')).show();
        } else {
            container.find('.time-error').text('').hide();
        }
        return valid;
    };

    var validateTeacher = function (result, container) {
        var valid = true;
        if (!result.teacherSelect.getValue()) {
            valid = false;
            container.find('.teacher-error').show();
        } else {
            container.find('.teacher-error').hide();
        }
        return valid;
    };

    function SingleTeachingPlanDialog(options) {
        $.extend(this, options);
        this.init();
    }

    SingleTeachingPlanDialog.prototype = {

        init: function () {

            var me = this;

            var planTpl = Simplite.render('single-plan-item', {
                isOrganization: me.isOrganization
            });

            var dialog = this.dialog = new Dialog({
                title: '添加单一课节',
                content: planTpl,
                width: 800,
                skinClass: 'single-teaching-plan-dialog',
                disposeOnHide: false
            });

            var element = dialog.element;

            var selectors = this.selectors = initItemCalendar(element, this);

            if (me.date) {
                selectors.dateSelect.setValue(me.date);
            }
            if (me.start && me.end) {
                var start = $.trim(me.start).split(":");
                var end = $.trim(me.end).split(":");
                selectors.startHour.setValue(start[0]);
                selectors.startMinute.setValue(start[1]);
                var duration = end[0] - start[0];
                if (duration < 0) {
                    duration = duration + 24;
                }
                var durationMinute = end[1] - start[1];
                if (durationMinute > 0) {
                    duration = duration + 0.5;
                }
                else if (durationMinute < 0) {
                    duration = duration - 0.5;
                }
                selectors.endTime.setValue(duration + '小时');
            }
            if (me.content) {
                $(element).find('.plan-content').val(me.content);
            }
            if (me.isOrganization && me.teacherId) {
                selectors.teacherSelect.setValue(me.teacherId);
            }

            element
            .on('click', '.cancel', function () {
                eventEmitter.emit('add-single-schedule-cancel');
                dialog.hide();
            })

            .on('click', '.add-single-schedule', function () {
                if (validate(selectors, element, me)) {
                    var con = element.find('.plan-content').val();
                    if (con.length > 200) {
                        element.find('.content-error').html('课程内容不能大于200个字哦~').show();
                    }
                    eventEmitter.emit('add-single-schedule-success', me.getValue());
                }
            });
        },
        hide: function () {
            this.dialog.hide();
        },

        getValue: function () {
            var $this = $(this.dialog.element);
            var selectors = this.selectors;
            var result = {};
            var dateStr = selectors.dateSelect.getValue();
            var startTime = selectors.startHour.getValue() + ":" + selectors.startMinute.getValue();
            var minute = parseInt(selectors.startMinute.getValue()) + parseFloat(selectors.endTime.getValue()) * 60;
            var endHour = parseInt(selectors.startHour.getValue()) + Math.floor( minute / 60 );
            var endMinute = minute % 60;
            var date = dateUtil.parse(dateStr);
            if (endHour < 10) {
                endHour = '0' + endHour;
            }
            if (endMinute < 10) {
                endMinute = '0' + endMinute;
            }
            date.setHours(selectors.startHour.getValue());
            date.setMinutes(selectors.startMinute.getValue());
            result.startTime = date.getTime() / 1000;
            var endTimes = endHour + ':' + endMinute ;
            if (endHour >= 24) {
                endHour -= 24;
                var day = date.getDate();
                date.setDate(day + 1);
                date.setHours(endHour);
                date.setMinutes(endMinute);
                if (endHour < 10) {
                    endHour = '0' + endHour;
                }
                endTimes = endHour + ':' + endMinute ;
            }
            else {
                date.setHours(endHour);
                date.setMinutes(endMinute);
            }
            result.endDate = dateUtil.stringify(date);
            result.endTime = date.getTime() / 1000;
            result.date = dateStr;
            result.start = startTime;
            result.end = endTimes;
            result.content = $this.find('.plan-content').val();
            result.id = this.id;
            if (this.isOrganization) {
                result.teacherId = selectors.teacherSelect.getValue();
                result.teacherName = selectors.teacherSelect.element.find(selectors.teacherSelect.labelSelector).text();
            }
            return result;
        }
    }
    return SingleTeachingPlanDialog;
});