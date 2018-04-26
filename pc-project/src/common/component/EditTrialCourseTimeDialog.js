/*
@file 修改约课时间对话框 - 试听课
@author wangyujie
 */
define(function (require, exports) {

    'use strict';

    var Dialog = require('cobble/ui/Dialog');
    var etpl = require('cobble/util/etpl');
    var service = require('common/service');

    var dateUtil = require('cobble/util/date');
    var timeUtil = require('cobble/util/time');
    var DateCalendar = require('cobble/form/Date');
    var Select = require('cobble/form/Select');
    var store = require('common/store');

    var form  = require('common/form');

    var isToday = false; // 用户选择的起始日期是否是今天
    var HOUR = 60;

    var dayOfWeek = [
        '周日',
        '周一',
        '周二',
        '周三',
        '周四',
        '周五',
        '周六'
    ];
    

    /*
     * 今天的日期
     */
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
     * 修改约课时间
     * @param {Object} options 配置项
     * @param {string} options.lessonInfo 课程信息
     */
    function EditTrialCourseTimeDialog(options) {
        $.extend(this, options);
        this.init();
    }

    /**
     * 刷新开始时间 - 时 Select
     *
     * @inner
     * @param {Select} select
     * @param {boolean} isToday 是否是当天
     */
    function refreshStartHour(select, isToday) {

        var min = 0;
        var max = 23;
        var data = [];

        // 当天过去时段不可选
        if (isToday) {
            var currentHour = (new Date()).getHours();
            min = (currentHour > min) ? currentHour : min;
        }

        for (var i = min; i <= max; i++) {
            if (i < 10) {
                data.push({
                    value: '0' + i,
                    text: '0' + i
                });
            }
            else {
                data.push({
                    value: i,
                    text: i
                });
            }
        }

        select.refresh({
            data: data,
            value: null
        });
        select.setValue(data[0].value);
    }

    /**
     * 刷新开始时间 － 分 Select
     *
     * @inner
     * @param {Select} select
     * @param {boolean} isCurrentTodayHour 是否是当天当前小时
     * @param {boolean} userHour 用户当前选择的时
     */
    function refreshStartMinute(select, isCurrentTodayHour, userHour) {

        // 以5分钟间隔，取值00-55
        var min = 0;
        var max = 11;
        var step = 5;
        var data = [];

        // 当天过去时段不可选
        if (isCurrentTodayHour) {

            var currentMinute = new Date().getMinutes();

            if (currentMinute % 5 === 0) { // 正好整5分钟，则取下一个5分钟
                min = (currentMinute + 5) / 5;
            }
            else {
                do {
                    currentMinute++;
                    if (currentMinute % 5 === 0) {
                        min = currentMinute / 5;
                    }
                }while(currentMinute % 5 !== 0);
            }
        }

        // 当小时选择位23时，分钟最大为30
        /*
        if (userHour == 23) {
            max = 6;
        }*/

        for (var i = min; i <= max; i++) {
            if (i < 2) {
                data.push({
                    value: '0' + (i * step),
                    text: '0' + (i * step)
                });
            }
            else {
                data.push({
                    value: i * step,
                    text: i * step
                });
            }
        }

        select.refresh({
            data: data,
            value: null
        });
        select.setValue(data[0].value);
    }

    /**
     * 刷新时长 Select 以0.5小时递增
     *
     * @inner
     * @param {Select} select
     * @param {number} maxHours 最大修改时长
     * @param {number} userHour 用户当前所选 － 时
     * @param {number} userMinute 用户当前所选 － 分
     */
    function refreshDuration(select, maxHours, userHour, userMinute) {

        // 0.5小时 - 12小时
        var step = 0.5;
        var data = [];

        // 订单可约时长剩余次数
        var endTimes = maxHours * 2;

        // 用户所选时间不可跨越24点，故剩余次数
        /*
        userHour = parseInt(userHour) || 6;
        userMinute = parseInt(userMinute) || 0;
        var userTimes = Math.ceil((24 * 60) - (userHour * 60 + userMinute)) / 30;

        // 谁小取谁
        if (userTimes < endTimes) {
            endTimes = userTimes;
        }*/

        for (var i = 1; i <= endTimes; i++) {

            var dura = step * i;

            data.push({
                value: dura,
                text: dura.toFixed(1) + '小时'
            });
        }

        select.refresh({
            data: data,
            value: null
        });
        select.setValue(data[0].value);
    }

    /*
     * 计算结束时间
     *
     * @param {number} startTime 开始日期
     * @param {number} duration 时长
    */
    function getEndTime(startTime, duration) {
        var startTimeObj = new Date(startTime.replace(/-/g, '/')).getTime();
        var endTime = startTimeObj + duration * 60 * 60 * 1000;
        var endTimeObj = new Date(endTime);

        var endYear = endTimeObj.getFullYear();
        var endMonth = endTimeObj.getMonth() + 1;
        if (endMonth < 10) {
            endMonth = '0' + endMonth;
        }
        var endDate = endTimeObj.getDate();
        if (endDate < 10) {
            endDate = '0' + endDate;
        }
        var endHour = endTimeObj.getHours();
        if (endHour < 10) {
            endHour = '0' + endHour;
        }
        var endMinute = endTimeObj.getMinutes();
        if (endMinute < 10) {
            endMinute = '0' + endMinute;
        }

        return endYear + '-' + endMonth + '-' + endDate + ' ' + endHour + ':' + endMinute + ':00';
    }

    /**
     * 获得学生修改时间异常话术
     * @param  {Boolean} isClassCourse 是否是班课
     * @param  {Boolean} isSameStudent 是否是相同学生的冲突
     * @param  {string}  teacherName   老师姓名
     * @return {string}  异常话术
     */
    function getStudentConflictErrorMsg(isClassCourse, isSameStudent, teacherName) {
        var msg;

        if (!isClassCourse) {
            if (isSameStudent) {
                msg = '该约课时间你已经与' + teacherName + '确认约课，仍要修改为该约课时间吗？';
            }
            else {
                msg = '该约课时间' + teacherName + '已经与其他同学确认约课，仍要修改为该约课时间吗？';
            }
        }
        else {
            if (isSameStudent) {
                msg = '该约课时间你已经购买' + teacherName + '的班课，仍要修改为该约课时间吗？';
            }
            else {
                msg = '该约课时间' + teacherName + '已开设班课，仍要修改为该约课时间吗？';
            }

        }

        return msg;
    }

    /**
     * 获得老师修改约课时间异常话术
     * @param  {Boolean} isClassCourse 是否是班课
     * @param  {string}  studentName   学生姓名
     * @return {string}  异常话术
     */
    function getTeacherConflictErrorMsg(isClassCourse, studentName) {
        var msg;

        if (!isClassCourse) {
            msg = '该约课时间你已经与' + studentName + '确认约课,仍要修改为该约课时间吗?';
        }
        else {
            msg = '该约课时间你已有班课正在招生,仍要修改为该约课时间吗?';
        }

        return msg;
    }

    /**
     * 根据给定日期得出开始最小时间
     * 若给定时间不是当天 则从6点开始
     * 若给定时间是当天 则从当前时刻后的整半点开始
     * @param  {Date} date 给定的时间
     * @return {Object} { hour, minute }
     */
    function getStartTimeMin(date) {
        var curTime = new Date();
        var curDate = dateUtil.stringify(curTime);
        var date = dateUtil.stringify(date);
        if (curDate != date) {
            return {
                hour: 0,
                minute: 0
            }
        }

        var curMinute = curTime.getMinutes();
        var curHour = curTime.getHours();

        return {
            hour: curMinute > 30 ? curHour + 1 : curHour,
            minute: curMinute > 30 ? 0 : 30
        }
    }


    EditTrialCourseTimeDialog.prototype = {

        init: function () {
            var me = this;
            var user = store.get('user');
            //后端数据对照表
            var data = {
                lessonId: me.lessonInfo.lesson_id,
                teacherId: me.lessonInfo.teacher_id,
                studentId: me.lessonInfo.student_id,
                avatar: me.lessonInfo.avatar,
                userName: me.lessonInfo.display_name,
                maxHours: me.lessonInfo.max_hours,
                // courseName: me.lessonInfo.course_name,
                start: me.lessonInfo.start_time,
                end: me.lessonInfo.end_time,
                // userType: user.type,
                purchaseId: me.lessonInfo.purchase_id
            };

            // 计算课程时长
            var start = data.start;
            var end = data.end;
            var startObj = new Date(start.replace(/-/g, '/')).getTime();
            var endObj = new Date(end.replace(/-/g, '/')).getTime();
            data.duration = (endObj - startObj) / 3600 / 1000;

            //初始化对话框
            var dialog = new Dialog({
                title: '修改约课时间',
                content: dialogTpl(data),
                width: 500,
                skinClass: 'edit-reserved-lesson-dialog'
            });

            var element = dialog.element;
            var formEl = element.find('.form');

            // 日期选择
            var courseDate = data.start ?
                dateUtil.parse(data.start.replace(/\s.*/, '')) : null;
            var courseDataStr = dateUtil.stringify(courseDate);
            var dayOfWeekEl = element.find('.day-of-week');
            var dateCalendar = new DateCalendar({
                element: element.find('.form-date'),
                value: courseDataStr,
                date: courseDate,
                onChange: function () {
                    var value = this.value;
                    if (value) {
                        var changedMin = getStartTimeMin(dateUtil.parse(value));
                        dayOfWeekEl.text(dayOfWeek[dateUtil.parse(value).getDay()]);
                    }

                    if (value == today) {
                        isToday = true;
                    }
                    else {
                        isToday = false;
                    }

                    refreshStartHour(
                        startHourSelect,
                        isToday
                    );
                }
            });

            element
            .on('click', '.icon-calendar', function (e) { // 选择上课日期
                e.stopPropagation();

                dateCalendar.open();
                element
                .find('.dropdown-menu')
                .hide();
            });

            // 开始时间 - 时
            var startHourSelect = new Select({
                element: element.find('.start-hour'),
                name: 'start_hour',
                defaultText: '小时',
                renderTemplate: function (data) {
                    return selectItemRender({
                        list: data
                    });
                },
                onChange: function () {
                    var active = this.element.find('.active');

                    var userHour = this.getValue();
                    // 今日今时
                    if (isToday) {
                        var isCurrentTodayHour = false;
                        if (userHour == new Date().getHours()) {
                            isCurrentTodayHour = true;
                        }
                    }

                    refreshStartMinute(
                        startMinuteSelect,
                        isCurrentTodayHour,
                        userHour
                    );
                }
            });

            // 开始时间 － 分
            var startMinuteSelect = new Select({
                element: element.find('.start-minute'),
                name: 'start_minute',
                defaultText: '分钟',
                renderTemplate: function (data) {
                    return selectItemRender({
                        list: data
                    });
                },
                onChange: function () {
                    var active = this.element.find('.active');
                    var userHour = startHourSelect.getValue();
                    var userMinute = this.getValue();

                    refreshDuration(
                        durationSelect,
                        data.maxHours,
                        userHour,
                        userMinute
                    );
                }
            });

            // 课程时长
            var durationSelect = new Select({
                element: element.find('.duration'),
                name: 'duration',
                renderTemplate: function (data) {
                    return selectItemRender({
                        list: data
                    });
                }
            });

            /*
             * 初始化－各种赋值
             */
            // 上课日期
            dateCalendar.setValue(courseDataStr);
            dayOfWeekEl.text(dayOfWeek[dateUtil.parse(courseDataStr).getDay()]);

            // 开始时间
            var courseStartTime = timeUtil.simplify(timeUtil.parse(data.start.match(/\d\d:\d\d:\d\d/)[0]));
            var startHour = courseStartTime.hour > 9 ? courseStartTime.hour : '0' + courseStartTime.hour;
            var startMinute = courseStartTime.minute > 9 ? courseStartTime.minute : '0' + courseStartTime.minute;

            // 赋值 － 开始时间 － 时
            if (dateCalendar.getValue() == today) {
                isToday = true;
            }
            refreshStartHour(
                startHourSelect,
                isToday
            );
            startHourSelect.setValue(startHour);

            // 赋值 － 开始时间 － 分
            if (isToday) {
                var isCurrentTodayHour = false;
                if (startHourSelect.getValue() == new Date().getHours()) {
                    isCurrentTodayHour = true;
                }
            }
            refreshStartMinute(
                startMinuteSelect,
                isCurrentTodayHour,
                startHour
            );
            startMinuteSelect.setValue(startMinute);

            // 赋值 － 课程时长
            refreshDuration(
                durationSelect,
                data.maxHours,
                startHourSelect.getValue(),
                startMinuteSelect.getValue()
            );
            durationSelect.setValue(data.duration);

            var submit = element.find('.confirm');
            //提交
            var onSuccess = function () {
                dialog.hide();
                success('修改约课时间成功', function () {
                    location.reload();
                });
            }

            submit
            .on('click', function () {
                var formData = form.parse(formEl);
                formData.start_time = formData.course_date + ' '
                                      + formData.start_hour + ':'
                                      + formData.start_minute + ':00';
                formData.end_time = getEndTime(formData.start_time, formData.duration);

                service
                .updateReservedLesson(
                    formData,
                    {
                        errorHandler: {
                            '100051': function (response) {

                                alert({
                                    title: '温馨提示',
                                    content: '本次修改约课时长超过订单实际可用课时，请重新选择约课时间',
                                    buttons: [
                                        {
                                            text: '确定',
                                            type: 'primary',
                                            handler: function () {
                                                location.reload();
                                            }
                                        }
                                    ]
                                });

                            },
                            '100053': function (response) {
                                alert({
                                    title: '温馨提示',
                                    content: response.msg,
                                    buttons: [
                                        {
                                            text: '确定',
                                            type: 'primary',
                                            handler: function () {
                                                location.reload();
                                            }
                                        }
                                    ]
                                });
                            }
                        }
                    }
                )
                .done(function (response) {

                    if (response.code === 0) {

                        var conflicts = response.data.conflict_lessons;

                        if (conflicts && conflicts.length > 0) {

                            var conflict = conflicts[0];
                            var errMsg = (user.type == 0)
                                ? getTeacherConflictErrorMsg(
                                    conflict.type == 2,
                                    conflict.student_name)
                                : getStudentConflictErrorMsg(
                                    conflict.type == 2,
                                    conflict.student_id == user.id,
                                    conflict.teacher_name);

                            confirm(errMsg, '确认修改约课时间')
                            .done(function () {
                                formData.force = 1;
                                service
                                .updateReservedLesson(formData)
                                .done(function (response) {

                                    if (response.code === 0) {
                                        onSuccess();
                                    }
                                });

                            });
                        }
                        else {
                            onSuccess();
                        }

                    }
                });
            });

            //取消
            element
            .on('click', '.cancel', function () {
                dialog.hide();
            })
        }
    }

    var dialogTpl = etpl.compile(''
        + '<div class="form">'
        +     '<input type="hidden" name="lesson_id" value="${lessonId}">'
        +     '<input type="hidden" name="purchase_id" value="${purchaseId}">'
        +     '<input type="hidden" name="max_hours" value="${maxHours}">'
        +     '<div class="info">'
        +         '<img src="${avatar}" class="thumbnail">'
        +         '<div class="lesson-info">'
        +             '<p class="name">'
        +                 '课程名称：试听课${maxHours}小时'
        +             '</p>'
        +             '<p>'
        +                 '学生：${userName}'
        +             '</p>'
        +             '<p>'
        +                 '时长：${maxHours}小时'
        +             '</p>'
        +         '</div>'
        +     '</div>'
        +     '<div class="select">'
        +         '<div class="date">'
        +             '<div class="form-group">'
        +                 '<label class="form-label">请选择上课日期：</label>'
        +                 '<div class="form-date">'
        +                     '<input type="text" name="course_date" class="form-text course-date" required readonly />'
        +                     '<div class="calendar"></div>'
        +                     '<span class="day-of-week"></span>'
        +                     '<span class="trigger">'
        +                         '<i class="icon icon-calendar"></i>'
        +                     '</span>'
        +                 '</div>'
        +             '</div>'
        +         '</div>'
        +         '<div class="time">'

        +             '<div class="form-group">'
        +                 '<div class="form-label">设置开始时间：</div>'
        +                 '<div class="form-controls">'
        +                     '<div class="dropdown start-hour">'
        +                         '<button class="btn-default">'
        +                             '<i class="caret"></i><span></span>'
        +                         '</button>'
        +                         '<ul class="dropdown-menu"></ul>'
        +                     '</div>'
        +                     '&nbsp;:&nbsp;'
        +                     '<div class="dropdown start-minute">'
        +                         '<button class="btn-default">'
        +                             '<i class="caret"></i><span></span>'
        +                         '</button>'
        +                         '<ul class="dropdown-menu"></ul>'
        +                     '</div>'
        +                 '</div>'
        +             '</div>'

        +             '<div class="form-group">'
        +                 '<div class="form-label">设置课程时长：</div>'
        +                 '<div class="form-controls">'
        +                     '<div class="dropdown duration">'
        +                         '<button class="btn-default">'
        +                             '<i class="caret"></i>'
        +                             '<span></span>'
        +                         '</button>'
        +                         '<ul class="dropdown-menu"></ul>'
        +                     '</div>'
        +                 '</div>'
        +             '</div>'

        +         '</div>'
        +     '</div>'

        +     '<div>'
        +         '<div class="form-action">'
        +             '<button class="btn-primary confirm">提交修改</button>'
        +             '<button class="btn-default cancel">取消</button>'
        +         '</div>'
        +     '</div>'
        + '</div>');

    /*
     * 设置下拉框模板
     */
    var selectItemRender = etpl.compile(
      '<!-- for: ${list} as ${item} -->'
    + '<li data-value="${item.value}" data-text="${item.text}">'
    +     '${item.text}'
    + '</li>'
    + '<!-- /for -->'
    );


    return EditTrialCourseTimeDialog;
});
