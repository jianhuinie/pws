/**
 * @file 添加单一课节
 * @author wangtianhua
 */
define(function (require, exports) {

    'use strict'

    var stringifyDate = require('cc/function/stringifyDate');
    var formatDateTime = require('userCenter/common/filter/formatDateTime');
    var Validator = require('custom/form/Validator');
    var autoScrollUp = require('cc/function/autoScrollUp');

    var SECOND = 1000;
    var MINUTE = 60 * SECOND;
    var HOUR = 60 * MINUTE;

    function getDurations() {
        var MIN = 0.5;
        var MAX = 6;
        var STEP = 0.5;
        var data = [];
        for (var i = MIN; i <= MAX; i += STEP){
            if (i == 0.5) {
                data.push({
                    value: i,
                    text: 30 + '分钟',
                });
                data.push({
                    value: 0.75,
                    text: 45 + '分钟',
                });
            }
            else {
                data.push({
                    value: i,
                    text: i + '小时',
                });
            }
        }
        return data;
    }

    //格式化startHourSelect的展示形式
    function formatDisplayHours(hour) {
        switch (parseInt(+hour / 6)) {
            case 0 :
                return '凌晨 ';
                break;
            case 1 :
                return '上午 ';
                break;
            case 2 :
                return '下午 ';
                break;
            default :
                return '晚上 ';
        }
    }

    function getHour(hour) {
        var MIN_HOUR = 0;
        var MAX_HOUR = 23;

        if (hour) {
            MIN_HOUR = hour;
        }

        var data = [];
        for (var i = MIN_HOUR; i <= MAX_HOUR; i++) {
            if (i < 10) {
                i = '0' + i;
            }
            data.push({
                value: i,
                text: formatDisplayHours(i) + i
            });
        }
        return data;
    }

    function getMinute(minute) {
        var MIN_MINUTE = 0;
        var MAX_MINUTE = 55;
        var STEP = 5;

        if (minute) {
            var size = 5 - minute % 5;
            MIN_MINUTE = minute + size;
        }

        var data = [];
        for (var i = MIN_MINUTE; i <= MAX_MINUTE; i += STEP) {
            var j = i;
            if (i < 10) {
                j = '0' + i;
            }

            data.push({
                value: j,
                text: j
            });
        }
        return data;
    }

    function getPlanTime(plan) {
        var date = plan.date.replace(/-/g, '/');
        var beginTime = date + ' ' + plan.hour + ':' + plan.minute + ':00';
        var beginTimeStamp = new Date(beginTime).getTime();
        var gap = HOUR * plan.duration;
        var endTime = formatDateTime(beginTimeStamp + gap, 'YYYY-MM-DD HH:mm:ss');

        return {
            id: plan.id,
            beginTime: formatDateTime(beginTimeStamp, 'YYYY-MM-DD HH:mm:ss'),
            endTime: endTime,
            content: plan.content,
            teacherId: plan.teacherId
        };
    }

    function getNeedDate(item) {
        if (!item.beginTime || !item.endTime) {
            return;
        }
        var itemBegin = item.beginTime.replace(/-/g, '/');
        var itemEnd = item.endTime.replace(/-/g, '/');
        var beginTime = new Date(itemBegin);
        var endTime = new Date(itemEnd);
        var date = formatDateTime(beginTime, 'YYYY/MM/DD');
        var hour = beginTime.getHours();
        if (hour < 10) {
            hour = '0' + hour;
        }
        var minute = beginTime.getMinutes();
        if (minute < 10) {
            minute = '0' + minute;
        }
        var duration = (endTime - beginTime) / 3600000 ;
        return {
            date: date,
            hour: hour,
            minute: minute,
            duration: duration
        }
    }

    var Component = Ractive.extend({
        template: require('html!./AddSigleCourse.html'),
        data: function () {
            return {
                style: require('text!./AddSigleCourse.styl'),
                timeDatePickerOptions: {
                    name: 'time',
                    className: 'time-select',
                    value: '',
                    placeholder: '请选择开始时间',
                    disableBefore: new Date(),
                    readonly: true
                },
                hourSelectOptions: {
                    name: 'hour',
                    className: 'hour-select',
                    defaultText: '小时',
                    data: getHour(),
                    value: ''
                },
                minuteSelectOptions: {
                    name: 'minute',
                    className: 'minute-select',
                    defaultText: '分钟',
                    data: getMinute(),
                    value: '',
                },
                durationSelectOptions: {
                    name: 'duration',
                    className: 'duration-select',
                    defaultText: '时长',
                    data: getDurations(),
                    value: '',
                },
                orgTeachersSelectOptions: {
                    name: 'orgTeachers',
                    className: 'org-teachers-select',
                    defaultText: '请选择主讲老师',
                    data: null,
                    value: '',
                },
                lessonNameInputOptions: {
                    name: 'lessonName',
                    className: 'name-input',
                    value: '',
                    multiple: true,
                    placeholder: '请输入200字以内(选填)'
                },
                editIndex: '',
                options: {
                    schedules: [],
                    save: $.noop,
                    close: $.noop,
                    item: {},
                    orgTeachers: [],
                    isEdit: ''
                }
            };
        },
        components: {
            Select: require('userCenter/common/component/Select'),
            Input: require('userCenter/common/component/Input'),
            DatePicker: require('userCenter/common/component/DatePicker')
        },
        onrender: function () {
            var me = this;
            var container = $(me.getElement());

            var item = me.get('options.item');
            if (item) {
                me.initSchedules(item);
            }

            // 是否可以选择机构老师
            var teachersList = me.get('options.orgTeachers');
            if (teachersList && teachersList.length != 0) {
                var data = [];
                $.each (
                    teachersList,
                    function (index, value) {
                        if (value.is_valid == 1) {
                            data.push({
                                value: value.id,
                                text: value.realname
                            });
                        }
                    }
                );
                me.set('orgTeachersSelectOptions.data', data);
            }

            me.validator = new Validator({
                mainElement: container,
                validateOnBlur: true,
                fields: {
                    time: {
                        validateOnBlur: false,
                        rules: {
                            required: true
                        },
                        errors: {
                            required: '请输入日期'
                        }
                    },
                    hour: {
                        rules: {
                            required: true
                        },
                        errors: {
                            required: '请输入小时'
                        }
                    },
                    minute: {
                        rules: {
                            required: true
                        },
                        errors: {
                            required: '请输入分钟'
                        }
                    },
                    duration: {
                        rules: {
                            required: true
                        },
                        errors: {
                            required: '请输入时长'
                        }
                    },
                    orgTeachers: {
                        rules: {
                            required: true
                        },
                        errors: {
                            required: '请选择主讲老师'
                        }
                    },
                    lessonName: {
                        rules: {
                            maxlength: 200
                        },
                        errors: {
                            maxlength: '请输入200字以内'
                        }
                    }
                }
            });

            var startTimeHandler = function () {
                var date = me.get('timeDatePickerOptions.value');
                var hour = me.get('hourSelectOptions.value');
                var minute = me.get('minuteSelectOptions.value');

                var data = {
                    'hourSelectOptions.disabled': !date,
                    'minuteSelectOptions.disabled': !hour,
                    'durationSelectOptions.disabled': !minute
                };

                var now = new Date();
                var today = formatDateTime(now, 'YYYY/MM/DD');
                var isToday = date == today;
                var currentHour = now.getHours();

                if (date && !hour) {
                    if (isToday) {
                        hour = currentHour < 12 ? 12 : currentHour;
                    }
                    else {
                        hour = 12;
                    }
                    data['hourSelectOptions.value'] = hour;
                }

                data['hourSelectOptions.data'] = isToday
                    ? getHour(currentHour)
                    : getHour();

                var currentMinute = now.getMinutes();
                if (hour && !minute) {
                    if (isToday && currentHour > 12) {
                        minute = currentMinute + (5 - (currentMinute % 5));
                    }
                    else {
                        minute = '00';
                    }
                    data['minuteSelectOptions.value'] = minute;
                    data['durationSelectOptions.value'] = 1;
                }

                data['minuteSelectOptions.data'] = isToday && hour == currentHour
                        ? getMinute(currentMinute)
                        : getMinute();

                me.set(data);

            };

            me.observe('timeDatePickerOptions.value', startTimeHandler);
            me.observe('hourSelectOptions.value', startTimeHandler);
            me.observe('minuteSelectOptions.value', startTimeHandler);
        },
        initSchedules: function (item) {
            var me = this;
            var schedules = me.get('options.schedules');
            $.each (
                schedules,
                function (index, value) {
                    if (value.beginTime == item.beginTime
                     && value.endTime == item.endTime) {
                        me.set('editIndex', index);
                    }
                }
            )
            var targetDates = getNeedDate(item);
            var data = { };
            if (targetDates) {
                var date = targetDates.date.replace(/-/g, '/');
                data['timeDatePickerOptions.value'] = date;
                data['hourSelectOptions.value'] = targetDates.hour;
                data['minuteSelectOptions.value'] = targetDates.minute;
                data['durationSelectOptions.value'] = targetDates.duration;
                data['lessonNameInputOptions.value'] = item.content;
                data['orgTeachersSelectOptions.value'] = item.teacherId;
            }
            else {
                data['timeDatePickerOptions.value'] = '';
                data['hourSelectOptions.value'] = '';
                data['minuteSelectOptions.value'] = '';
                data['durationSelectOptions.value'] = '';
                data['lessonNameInputOptions.value'] = item.content;
                data['orgTeachersSelectOptions.value'] = item.teacherId;
            }
            me.set(data);
        },
        save: function () {
            var me = this;
            if(me.validator.validate()) {
                var date = me.get('timeDatePickerOptions.value');
                var hour = me.get('hourSelectOptions.value');
                var minute = me.get('minuteSelectOptions.value');
                var duration = me.get('durationSelectOptions.value');
                var content = me.get('lessonNameInputOptions.value');
                var teacherId = me.get('orgTeachersSelectOptions.value');
                var item = me.get('options.item');
                var id  = '';
                if (item) {
                    id = item.id ? item.id : ''
                }
                var plan = {
                    id: id,
                    date: date,
                    hour: hour,
                    minute: minute,
                    duration: duration,
                    content: content,
                    teacherId: teacherId
                };
                var planTime = getPlanTime(plan);
                var index = me.get('editIndex');
                me.get('options').save(planTime, index);
            }
        },
        close: function () {
            this.get('options').close();
        }
    });

    Component.getPlanTime = getPlanTime;

    Component.getDurations = getDurations;

    Component.getHour = getHour;

    Component.getMinute = getMinute;

    return Component;
})