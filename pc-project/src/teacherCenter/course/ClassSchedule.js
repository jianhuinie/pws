/**
 * @file
 * @author wangyujie, liucong 重构
 */
define(function (require, exports) {

    'use strict';

    var Select = require('cobble/form/Select');
    var Text = require('cobble/form/Text');
    var service = require('common/service');
    var SaveButton = require('common/component/SaveButton');
    var form = require('common/form');
    var moment = require('moment');
    var store = require('common/store');

    var Validator = require('cobble/form/Validator');
    var Dialog = require('cobble/ui/Dialog');
    var dateUtil = require('cobble/util/date'); // 解析日期
    var timeUtil = require('cobble/util/time'); // 解析时间
    var etpl = require('cobble/util/etpl');

    var DateCalendar = require('cobble/form/Date'); // 日历
    var DaytimeSelect = require('common/component/DaytimeSelect'); // 开始时间

    var halfHour = timeUtil.MINUTE * 30;

    // 添加结束时间处的时间差
    var endItemRender = etpl.compile(

      '<!-- for: ${list} as ${item} -->'
    + '<li data-value="${item.value}" data-text="${item.value}">'
    +     '${item.value}<small class="text-info">${item.hour}小时</small>'
    + '</li>'
    + '<!-- /for -->'

    );

    // 今天的日期
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
    var today = year + '-' + month + '-' + day;

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

    /**
     * 刷新开始时段 Select
     *
     * @inner
     * @param {Select} select
     * @param {boolean} isToday 是否是当天
     * @param {boolean} selectFirst 是否选定第一项
     */
    function refreshStartTime(select, isToday, selectFirst) {

        var range = startTimeMap;

        // 上课开始时段区间
        var min = timeUtil.parse(range.min);
        var max = timeUtil.parse(range.max);

        // 当天过去时段不可选
        if (isToday) {

            var current = new Date();

            if (current > min) {

                if (current.getMinutes() > 30) {
                    min.setHours(current.getHours() + 1);
                    min.setMinutes(0);
                }
                else {
                    min.setHours(current.getHours());
                    min.setMinutes(30);
                }
            }
        }

        select.refresh({
            min: timeUtil.simplify(min),
            max: timeUtil.simplify(max)
        });

        if (selectFirst) {
            select.setValue(timeUtil.simplify(min));
        }
    }

    /**
     * 刷新结束时段 Select
     *
     * @inner
     * @param {Select} select
     * @param {Date} startTimeMin 开始时段的起始时间
     * @param {number=} courseLength 课程时长，半小时单位，1代表半小时，2代表1小时
     */
    function refreshEndTime(select, startTimeMin, courseLength, selectFirst) {

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
        // 默认选中一小时
        var target;

        if (selectFirst) {
            if (courseLength == 0) {
                target = data.length > 1 ? data[1] : data[0];
            }
            else {
                target = data.length <= (courseLength - 1) ? data[data.length - 1] : data[courseLength - 1];
            }
        }

        select.refresh({
            data: data,
            value: target ? target.value : null
        });
    }

    function getTimePeriod(date, begin, end) {

        // 年月日变时间戳
        if (end == '00:00') {
            end = '24:00';
        }

        if (begin) {
            begin = date + ' ' + begin;
            begin = moment(begin)._d.getTime();
        }

        if (end) {
            end = date + ' ' + end;
            end = moment(end)._d.getTime();
        }

        return {
            begin: begin ? begin / 1000 : null,
            end: end ? end / 1000 : null
        }
    }


    /**
     *
     * @constructor
     * @param {Object} options
     * @property {jQuery} options.element
     * @property {Object} options.data
     * @property {number} options.data.date 日期
     * @property {number} options.data.time 时间
     * @property {string} options.data.content 课程内容
     * @property {Object} options.data.teacher_list 机构老师列表
     */
    function ClassSchedule(options) {
        $.extend(this, options);
        this.init();
    }

    ClassSchedule.prototype = {

        init: function () {

            var me = this;
            var element = me.element;
            if (!me.data) {
                me.data = { };
            }

            //计算课程时长
            me.courseLength = 0; //半小时单位 1代表半小时
            if (me.data.begin_time && me.data.end_time) {
                me.courseLength = ((me.data.end_time - me.data.begin_time) * 1000) / halfHour;
            }

            me.setIndex(me.index);

            // 课程时间
            me.courseDateInput = new Text({
                element: element.find('input[name="course_date"]')
            });

            // 开始时段

            var startTimeSelect =
            me.startTimeSelect =
            new DaytimeSelect({
                element: element.find('.start-time'),
                selectFirst: false,
                defaultText: '上课时间',
                onChange: function () {
                    var value = this.element.find(':text').val();
                    refreshEndTime(
                        endTimeSelect,
                        timeUtil.parse(value),
                        me.courseLength,
                        true
                    );
                }
            });

            // 结束时段
            var endTimeSelect =
            me.endTimeSelect =
            new Select({
                element: element.find('.end-time'),
                defaultText: '- 下课时间 -',
                name: 'end_time',
                renderTemplate: function (data) {
                    return endItemRender({
                        list: data
                    });
                },
                onChange: function () {
                    var data = form.parse(element);
                }
            });

            // 课程内容
            me.courseContentInput = new Text({
                element: element.find('input[name="content"]')
            });

            // 课程时间
            new DateCalendar({
                element: element.find('.form-date'),
                onChange: function () {

                    // 当前选中的日期，如 2014-08-30
                    var date = this.element.val();

                    var isToday = false;
                    if (date == today) {
                        isToday = true;
                    }

                    refreshStartTime(
                        startTimeSelect,
                        isToday,
                        false
                    );

                    refreshEndTime(
                        endTimeSelect,
                        timeUtil.parse(startTimeSelect.min),
                        me.courseLength,
                        false
                    );

                }
            });

            // 机构老师列表
            var organization = me.data.organization;
            if (organization.is_organization) {
                // 显示机构授课老师
                element.find('.is-org').show();

                var teacherList = new Array();
                $.each(organization.teacher_list, function (index, item) {
                    teacherList.push({
                        'value': item.number,
                        'text': item.display_name,
                    });
                });
            }

            // 授课老师下拉框
            me.teacherListSelect = new Select({
                element: element.find('.teacher-list'),
                name: 'teacher_user_number',
                data: teacherList
            });

            element
            .on('click', '.past' , function () {
                return false;
            });

            me.validator = new Validator({
                element: element,
                fields: {
                    course_content: {
                        errors: {
                            required: '请输入课程内容'
                        },
                        custom: function (element) {
                            var value = element.val();
                            if (/<[^>]+?>/.test(value)) {
                                return '不能输入HTML标签';
                            }
                            else {
                                return '';
                            }
                        }
                    },
                    arrangement: {
                        errors: {
                            required: '请填写课程安排'
                        }
                    },
                    teacher_user_number: {
                        errors: {
                            required: '请选择授课老师'
                        }
                    }
                }
            });

            if ($.isNumeric(me.data.id) || me.force) {
                me.refresh();
            }

            if (me.data.total_pay > 0) {
                me.element.find('.cancel').hide();
                me.element.find('.end-time button').prop('disabled', true);
            }
        },
        /**
         * 获取数据
         * @return {object or boolean} { error: 'xxx', data: {} }
         */
        getData: function () {
            var me = this;

            var formData = form.parse(me.element);
            var error;
            var prefix = '第' + me.index + '节：';

            var timePeriod = getTimePeriod(
                formData.course_date,
                formData.start_time,
                formData.end_time
            );

            if (!timePeriod.begin || !timePeriod.end) {
                error = prefix + '请输入yyyy-mm-dd格式的课程时间';
                return {
                    error: error
                };
            }

            var fields = [];

            if (me.data.organization.is_organization) {
                fields.push('teacher_user_number');
            }
            else {
                formData.teacher_user_number = store.get('user').number;
            }

            var data = {
                begin_time: timePeriod.begin,
                end_time: timePeriod.end,
                teacher_user_number: formData.teacher_user_number,
                content: formData.content,
                class_course_number: formData.class_course_number,
                id: formData.id
            }

            if (fields.length > 0) {
                if (me.validator.validate(fields)) {
                    return {
                        data: data
                    };
                }
                else {
                    return {
                        error: prefix + '校验未通过',
                        hide: true //不显示到alert上
                    };
                }
            }
            else {
                return {
                    data: data
                };
            }
        },
        refresh: function () {

            var me = this;
            var data = me.data;
            var element = me.element;

            var avoidRefresh = data.begin_time * 1000 < (new Date()).getTime();

            var startTime;
            var endTime;

            // 日期时间戳变换年月日
            if (data.begin_time) {

                startTime = timeUtil.stringify(
                    new Date(data.begin_time * 1000)
                );

                var courseDate = dateUtil.stringify(data.begin_time * 1000);
                me.courseDateInput.setValue(
                    courseDate || ''
                );

                // 今天的日期，起止时间点
                var isToday = false;
                if (courseDate == today) {
                    isToday = true;
                }

                if (!avoidRefresh) {
                    refreshStartTime(
                        me.startTimeSelect,
                        isToday
                    );

                    refreshEndTime(
                        me.endTimeSelect,
                        timeUtil.parse(me.startTimeSelect.min),
                        me.courseLength,
                        true
                    );
                }
                else {
                    refreshEndTime(
                        me.endTimeSelect,
                        timeUtil.parse(startTime),
                        24
                    );
                }

            }


            // 上下课时间
            if (data.begin_time && data.end_time) {

                endTime = timeUtil.stringify(
                    new Date(data.end_time * 1000)
                );

                me.startTimeSelect.setValue(
                    startTime,
                    {
                        silence: avoidRefresh
                    }
                );
                me.endTimeSelect.setValue(
                    endTime
                );

            }

            // 课程内容
            me.courseContentInput.setValue(
                data.content || ''
            );

            // 授课老师
            if (data.teacher) {
                me.teacherListSelect.setValue(
                    data.teacher.number
                );
            }
            else if (me.data.organization.last_teacher) { // 主讲或上次的老师
                me.teacherListSelect.setValue(
                    me.data.organization.last_teacher.number
                );
            }
            // 班课id
            element.find('[name="id"]').val(data.id);


        },
        dispose: function () {

        },
        setIndex: function (index) {
            this.index = index;
            this.element.find('.label').html('&nbsp&nbsp第' + index + '节');
            this.element.data('index', index);
        },
        getId: function () {
            return this.element.find('[name="id"]').val();
        },
        getTimePeriod: function () {
            var data = form.parse(this.element);

            return getTimePeriod(data.course_date, data.start_time, data.end_time);
        },
        getContent: function () {
            return this.element.find('input[name="content"]').val();
        },
        getIndex: function () {
            return this.index;
        },
        remove: function () {
            this.element.remove();
        }
    };

    return ClassSchedule;
});