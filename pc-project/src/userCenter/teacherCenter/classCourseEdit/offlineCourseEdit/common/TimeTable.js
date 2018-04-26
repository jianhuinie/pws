/**
 * @file 批量添加课节的一条
 * @author wangtianhua
 */
define(function (require, exports) {

    'use strict';

    var Validator = require('custom/form/Validator');
    var AddSigleCourse = require('./AddSigleCourse');

    var VALUE_MONDAY = 1;
    var VALUE_TUESDAY = 2;
    var VALUE_WEDNESDAY = 3;
    var VALUE_THURSDAY = 4;
    var VALUE_FRIDAY = 5;
    var VALUE_SATURDAY = 6;
    var VALUE_SUNDAY = 7;
    var VALUE_ALL = -1;

    var dateList = [
        {
            text: '周一',
            value: VALUE_MONDAY
        },
        {
            text: '周二',
            value: VALUE_TUESDAY
        },
        {
            text: '周三',
            value: VALUE_WEDNESDAY
        },
        {
            text: '周四',
            value: VALUE_THURSDAY
        },
        {
            text: '周五',
            value: VALUE_FRIDAY
        },
        {
            text: '周六',
            value: VALUE_SATURDAY
        },
        {
            text: '周日',
            value: VALUE_SUNDAY
        },
        {
            text: '全选',
            value: VALUE_ALL
        },
    ];

    var Compenent = Ractive.extend({
        template: require('html!./TimeTable.html'),
        data: function () {
            return {
                index: '',
                errorContent: '',
                dateList: $.map(
                    dateList,
                    function (item, index) {
                        return {
                            text: item.text,
                            value: item.value,
                            checked: false
                        };
                    }
                ),
                hourSelectOptions: {
                    name: 'hour',
                    className: 'hour-select text',
                    defaultText: '小时',
                    data: AddSigleCourse.getHour(),
                    value: '',
                },
                minuteSelectOptions: {
                    name: 'minute',
                    className: 'minute-select text',
                    defaultText: '分钟',
                    data: AddSigleCourse.getMinute(),
                    value: '',
                    disabled: true
                },
                durationSelectOptions: {
                    name: 'duration',
                    className: 'duration-select',
                    defaultText: '时长',
                    data: AddSigleCourse.getDurations(),
                    value: '',
                    disabled: true
                },
                options: {
                    hour: '',
                    minute: '',
                    duration: '',
                    weekList: [],
                    isToday: false,
                    disabled: false,
                }
            };
        },
        onrender: function () {
            var me = this;
            var container = $(me.getElement());
            me.validator = new Validator({
                mainElement: container,
                fields: {
                    hour: {
                        rules: {
                            required: true
                        },
                        errors: {
                            required: '请选择开始小时'
                        }
                    },
                    minute: {
                        rules: {
                            required: true
                        },
                        errors: {
                            required: '请选择开始分钟'
                        }
                    },
                    duration: {
                        rules: {
                            required: true
                        },
                        errors: {
                            required: '请选择课程时长'
                        }
                    }
                }
            });

            me.bindData({
                'hourSelectOptions.value': 'options.hour',
                'minuteSelectOptions.value': 'options.minute',
                'durationSelectOptions.value': 'options.duration',
                'hourSelectOptions.disabled': 'options.disabled',
            });

            var timeTableHandler = function () {
                var isToday = me.get('options.isToday');
                var hasDate = !me.get('options.disabled');
                var hour = me.get('hourSelectOptions.value');
                var minute = me.get('minuteSelectOptions.value');

                var data = {
                    'hourSelectOptions.disabled': !hasDate,
                    'minuteSelectOptions.disabled': !hasDate || !hour,
                    'durationSelectOptions.disabled': !hasDate || !minute
                }

                var now = new Date();
                var currentHour = now.getHours();
                var currentMinute = now.getMinutes();

                if (hasDate && !hour) {
                    if (isToday) {
                        hour = currentHour < 12 ? 12 : currentHour;
                    }
                    else {
                        hour = 12;
                    }
                    data['hourSelectOptions.value'] = hour;
                }

                data['hourSelectOptions.data'] = isToday
                    ? AddSigleCourse.getHour(currentHour)
                    : AddSigleCourse.getHour();

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
                        ? AddSigleCourse.getMinute(currentMinute)
                        : AddSigleCourse.getMinute();

                me.set(data);
            }

            me.observe('options.isToday', timeTableHandler);
            me.observe('options.disabled', timeTableHandler);
            me.observe('hourSelectOptions.value', timeTableHandler);
            me.observe('minuteSelectOptions.value', timeTableHandler);
            me.observe('dateList.*.checked', function (checked) {
                if (checked && arguments[3] == 7) {
                    me.set('dateList.*.checked', true)
                }
                else if (!checked && arguments[3] == 7) {
                    me.set('dateList.*.checked', false)
                }
                if (!checked && arguments[3] != 7) {
                    me.set('dateList.7.checked', false)
                }
                var weekList = [];
                $.each(
                    me.get('dateList'),
                    function (index, item) {
                        if (item.checked) {
                            weekList.push(item.value);
                        }
                    }
                );
                me.set('options.weekList', weekList);
            });
        },
        components: {
            Select: require('userCenter/common/component/Select'),
            Input: require('userCenter/common/component/Input'),
        },
        validate: function () {
            var me = this;
            if (!me.validator.validate(true)) {
                return;
            }
            if (!me.get('options.weekList').length) {
                me.set('errorContent', '请填写时间段');
                return false;
            }
            return true;
        },
        remove: function () {
            var me = this;
            me.fire(
                'remove',
                {
                    index: me.get('index')
                }
            );
        }
    });

    Compenent.dateList = dateList;

    return Compenent;
})