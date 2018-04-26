/**
 * @file 批量添加课节
 * @author wangtianhua
 */
define(function (require, exports) {

    'use strict';

    var formatDateTime = require('userCenter/common/filter/formatDateTime');
    var AddSigleCourse = require('./AddSigleCourse');
    var Validator = require('custom/form/Validator');
    var moment = require('moment');

    var spliceArr = [];
    var indexArr = [];

    function formatDateList(options, weekList, teacherId) {
        var planList = [];
        var options = options.timeList;

        $.each(
            options,
            function (index1, item1) {
                for (var i = 0; i <= item1.weekList.length; i++) {
                    var stamp = item1.weekList[i];
                    if (stamp == 7) {
                        stamp = 0
                    }
                    var weekDate = weekList[stamp];

                    if (!weekDate) {
                        continue;
                    }
                    $.each (
                        weekDate,
                        function (index2, item2) {

                            var listItem = AddSigleCourse.getPlanTime({
                                date: item2,
                                hour: item1.hour,
                                minute: item1.minute,
                                duration: item1.duration,
                                teacherId: teacherId
                            });
                            listItem.index = index1;
                            planList.push(listItem);
                        }
                    );
                }

            }
        );
        return planList;
    }

    function getWeekList(start, end) {
        var weekList = {};

        var index = new Date(start);
        var end = new Date(end);
        while (index.getTime() <= end.getTime()) {
            if (!weekList[index.getDay()]) {
                weekList[index.getDay()] = [];
                weekList[index.getDay()].push(
                    formatDateTime(index.getTime(), 'YYYY-MM-DD')
                );
            }
            else {
                weekList[index.getDay()].push(
                    formatDateTime(index.getTime(), 'YYYY-MM-DD')
                );
            }
            index = moment(index).add(1, 'd').toDate();
        }
        return weekList;
    }

    return Ractive.extend({
        template: require('html!./AddMoreCourses.html'),
        data: function () {
            return {
                style: require('text!./AddMoreCourses.styl'),
                timeTableOptions: {
                    timeList: [
                        {
                            hour: '',
                            minute: '',
                            duration: '',
                            weekList: [],
                            isToday: false,
                            disabled: true
                        }
                    ]
                },
                orgTeachersSelectOptions: {
                    name: 'orgTeachers',
                    className: 'org-teachers-select',
                    defaultText: '请选择主讲老师',
                    data: null,
                    value: '',
                },
                startDatePickerOptions: {
                    name: 'startDate',
                    className: 'start-select',
                    value: '',
                    placeholder: '请选择开始时间',
                    disableBefore: new Date(),
                    readonly: true,
                },
                endDatePickerOptions: {
                    name: 'endDate',
                    className: 'end-select',
                    value: '',
                    placeholder: '请选择结束时间',
                    disableBefore: new Date(),
                    readonly: true
                },
                options: {
                    disabled: true,
                    orgTeachers: [],
                    save: $.noop,
                    close: $.noop,
                    onScheduleAdd: $.noop,
                    onScheduleRemove: $.noop
                }
            }
        },

        onrender: function () {
            var me = this;

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

            me.on('*.remove', function (data) {
                var planList = me.get('timeTableOptions.timeList');
                if (planList.length <= 1) {
                    alert({
                        title: '温馨提示',
                        content: '只剩下一个时间段了，不可以删除'
                    });
                }
                else {
                    planList.splice(data.index, 1);
                    var onScheduleRemove = me.get('options.onScheduleRemove');
                    if ($.isFunction(onScheduleRemove)) {
                        onScheduleRemove();
                    }
                }

            });

            var container = $(me.getElement());
            me.validator = new Validator({
                mainElement: container,
                validateOnBlur: true,
                fields: {
                    orgTeachers: {
                        rules: {
                            required: true
                        },
                        errors: {
                            required: '请选择主讲老师'
                        }
                    },
                    startDate: {
                        validateOnBlur: false,
                        rules: {
                            required: true
                        },
                        errors: {
                            required: '请输入开始日期'
                        }
                    },
                    endDate: {
                        validateOnBlur: false,
                        rules: {
                            required: true
                        },
                        errors: {
                            required: '请输入结束日期'
                        }
                    }
                }
            });

            me.observe('startDatePickerOptions.value', function (value) {
                if (!value) {
                    return;
                }
                me.isToday();
                var date = new Date(value);
                me.set('endDatePickerOptions.disableBefore', date)
            });
            me.observe('endDatePickerOptions.value', function (value) {
                if (!value) {
                    return;
                }
                me.isToday();
                if (me.validateDatePicker()) {
                    var data = { };
                    $.each(
                        me.get('timeTableOptions.timeList'),
                        function (index, value) {
                            data[
                                'timeTableOptions.timeList.' + index + '.disabled'
                            ] = false;
                        }
                    );
                    me.set(data);
                }
            });
        },
        components: {
            Select: require('userCenter/common/component/Select'),
            Input: require('userCenter/common/component/Input'),
            DatePicker: require('userCenter/common/component/DatePicker'),
            TimeTable: require('./TimeTable')
        },
        isToday: function () {
            var me = this;
            var startDate = me.get('startDatePickerOptions.value');
            var endDate = me.get('endDatePickerOptions.value');
            var nowDate = formatDateTime(new Date().getTime(), 'YYYY/MM/DD');
            var list = me.get('timeTableOptions.timeList');
            if (startDate == endDate && startDate == nowDate) {
                $.each(
                    list,
                    function (index, value) {
                        value['isToday'] = true;
                    }
                );
            }
            else {
                $.each(
                    list,
                    function (index, value) {
                        value['isToday'] = false;
                    }
                );
            }
            me.set('timeTableOptions.timeList', list);
        },
        validateDatePicker: function () {
            var me = this;

            if (!me.validator.validate('startDate') || !me.validator.validate('endDate')) {
                return false;
            }
            if (me.get('startDatePickerOptions.value') > me.get('endDatePickerOptions.value')) {
                alert({
                    title: '温馨提示',
                    content: '开始时间不可以大于结束时间',
                    type: 'error'
                });
                return false;
            }

            return true;
        },
        addSchedule: function () {

            var me = this;
            if (me.validateDatePicker()) {
                var planList = me.get('timeTableOptions.timeList');
                if (planList.length < 3) {
                    // 将这些时间转化成正确的格式
                    if (!me.validator.validate()) {
                        return;
                    }
                    var data = {
                        hour: '',
                        minute: '',
                        duration: '',
                        weekList: [],
                        isToday: false
                    };
                    // 判断是不是今天
                    var startDate = me.get('startDatePickerOptions').value;
                    var endDate = me.get('endDatePickerOptions').value;
                    var nowDate = formatDateTime(new Date().getTime(), 'YYYY/MM/DD');
                    if (startDate == endDate && startDate == nowDate) {
                        data['isToday'] = true;
                    }
                    planList.push(data);
                }
                else {
                    alert({
                        title: '温馨提示',
                        content: '亲，一次最多设置3种不同的时间段'
                    });
                }
                me.set('timeTableOptions.timeList', planList);

                var onScheduleAdd = me.get('options.onScheduleAdd');
                if ($.isFunction(onScheduleAdd)) {
                    onScheduleAdd();
                }
            }
        },
        getPlanList: function () {
            var me = this;
            var startDate = me.get('startDatePickerOptions').value;
            var endDate = me.get('endDatePickerOptions').value;
            var week = getWeekList(startDate, endDate);
            var teacherId = me.get('orgTeachersSelectOptions').value;
            var planList = formatDateList(me.get('timeTableOptions'), week, teacherId);
            var list = me.sortList(planList);
            if (me.validateConflict(list, me.get('timeTableOptions').timeList)) {
                return list;
            }
        },
        save: function () {
            var me = this;
            if (!me.validateDatePicker()) {
                return;
            }

            if (!me.validator.validate()) {
                return;
            }
            var list = me.get('timeTableOptions');
            var options = list.timeList;

            // 如果有空的就提示用户没填完不能提交
            var error = '';
            $.each(
                options,
                function (index, item) {
                    if (!item.hour || !item.minute || !item.duration || item.weekList.length == 0) {
                        error = '请将信息填写完整才能提交哦';
                    }
                }
            );
            if (error) {
                alert({
                    title: '温馨提示',
                    content: error,
                    type: 'error'
                });
                return;
            }

            var timeTable = me.findComponent('TimeTable');
            if (!timeTable.validate()) {
                return;
            }

            var planList = me.getPlanList();
            if (planList) {
                me.get('options').save(planList);
            }
        },
        sortList: function (list) {
            var me = this;
            var beginTimes = [];
            $.map(
                list,
                function (value, index) {
                    beginTimes.push(value.beginTime);
                }
            );

            beginTimes.sort();

            var tempList = [];
            $.map(
                list,
                function (value, idx) {
                    for (var i = 0, len = beginTimes.length; i < len; i++ ) {
                        if (value.beginTime === beginTimes[i]) {
                            if (!tempList[i]) {
                                tempList[i] = value;
                                break;
                            }
                        }
                    }
                }
            );
            return tempList;
        },
        validateConflict: function (schedules, item) {

            var me = this;

            $.each(
                schedules,
                function (index, value) {
                    var nextIndex = index + 1;
                    if (!schedules[nextIndex]) {
                        return;
                    }
                    if (value.endTime <= schedules[nextIndex].beginTime) {
                        return true;
                    }
                    else {
                        spliceArr.push(schedules[nextIndex]);
                        if (indexArr.indexOf(value.index) == -1) {
                            indexArr.push(value.index);
                        }
                        if (indexArr.indexOf(schedules[nextIndex].index) == -1) {
                            indexArr.push(schedules[nextIndex].index);
                        }
                    }
                }
            );
            if (spliceArr.length != 0) {
                var weeks = [];
                $.each(
                    spliceArr,
                    function (index, value) {
                        var week = new Date(value.beginTime.replace(/-/g, '/')).getDay();
                        if (weeks.indexOf(week) == -1) {
                            weeks.push(week);
                        }
                    }
                );
                var weekMap = {
                    '0': '周日',
                    '1': '周一',
                    '2': '周二',
                    '3': '周三',
                    '4': '周四',
                    '5': '周五',
                    '6': '周六',
                }
                var content = [];
                weeks = weeks.sort();
                var sunDay = '';
                $.each(weeks, function(index, value) {
                    if (value == 0) {
                        sunDay = weekMap[value]
                    }
                    else {
                        content.push(weekMap[value]);
                    }
                });
                if (sunDay) {
                    content.push(sunDay);
                }
                if (indexArr) {
                    indexArr = indexArr.sort()
                }
                if (indexArr.length == 3) {
                    alert({
                        title: '温馨提示',
                        content: '第1、2、3个时间段有冲突，快检查一下吧'
                    });
                }
                else {
                    alert({
                        title: '温馨提示',
                        content: '第'
                                +   (indexArr[0] + 1)
                                +   '、'
                                +   (indexArr[1] + 1)
                                +   '个时间段在'
                                +   content.join('，')
                                +   '有冲突，快检查一下吧'
                    });
                }

                indexArr = [];
                spliceArr = [];
                return false;
            }
            else {
                return true;
            }
        },
        close: function () {
            this.get('options').close();
        }
    });

})