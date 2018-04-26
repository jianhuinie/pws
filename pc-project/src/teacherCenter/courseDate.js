/**
 * @file 可授课时间
 * @author zhujialu
 */
define(function (require, exports) {

    'use strict';

    var CourseCalendar = require('./course/CourseCalendar');
    var service = require('common/service');
    var store = require('common/store');
    var dateUtil = require('cobble/util/date');
    var Editor = require('common/component/Editor');

    // 选中的样式
    var activeClass = 'active';

    var bitMap = {
        workday: {
            name: 'date',
            code: 32767,
            active: false
        },
        saturday: {
            name: 'date',
            code: 229376,
            active: false
        },
        sunday: {
            name: 'date',
            code: 1835008,
            active: false
        },
        morning: {
            name: 'part',
            code: 299593,
            active: false
        },
        afternoon: {
            name: 'part',
            code: 599186,
            active: false
        },
        evening: {
            name: 'part',
            code: 1198372,
            active: false
        }
    };

    /**
     * 或操作
     *
     * @inner
     * @param {number} code
     * @param {Object} item
     * @return {number}
     */
    function operateOr(code, item) {

        if (item.active) {
            if (code) {
                code |= item.code;
            }
            else {
                code += item.code;
            }
        }

        return code;
    }

    /**
     * 获得当前周的值
     *
     * @inner
     * @param {jQuery} element 日历元素
     * @return {number}
     */
    function getWeekCode(element) {

        var code = 0;

        element
        .find('.' + activeClass)
        .each(function () {
            code += $(this).data('code');
        });

        return code;
    }

    function getWeekIndex(date) {
        date.setHours(0, 0, 0, 0);
        var year = date.getFullYear();
        var yearFirstDay = new Date(year, 0, 1);
        var yearFirstWeekLastDate = dateUtil.getWeekLastDay(yearFirstDay, 1);
        var yearSecondWeekFirstDate = yearFirstWeekLastDate.getTime() + dateUtil.DAY;

        var week = Math.ceil(((date - yearSecondWeekFirstDate) / dateUtil.DAY + 1) / 7) + 1;

        return {
            year: year,
            week: week
        };
    }

    /**
     * 获得 code 对应的数据，如
     * {
     *     '2014-08-30': 1,
     *     '2014-08-31': 2,
     *     '2014-09-01': 3,
     *     '2014-09-02': 4,
     *     '2014-09-03': 5,
     * }
     *
     * @param {string} startDate 开始日期，如 '2014-08-30'
     * @param {number} code
     * @return {Object}
     */
    function code2Data(startDate, code) {

        var result = { };

        var getCode = function (code, index) {

            var result = 0;

            if ((code & 1) === 1) {
                result += 1;
            }

            if ((code & 2) === 2) {
                result += 2;
            }

            if ((code & 4) === 4) {
                result += 4;
            }

            return result;

        };

        var firstDate = dateUtil.parse(startDate);
        // 移位
        var offset = 0;

        // 获得一周的数据
        for (var i = 0; i < 7; i++) {

            var d = new Date(firstDate.getTime() + i * dateUtil.DAY);

            result[ dateUtil.stringify(d) ] = getCode(code >> offset);

            offset += 3;

        }

        return result;
    }

    function confirmOnLeave() {
        window.onbeforeunload = function () {
            return '你刚才设置的可授课时间还没有保存，确定要离开本页面吗？';
        };
    }

    function noConfirmOnLeave() {
        window.onbeforeunload = null;
    }


    /**
     * 初始化
     */
    exports.init = function () {

        var me = this;

        // 可授课时间容器
        var container = $('.course-date');

        // 可授课时间描述
        me.editor = new Editor({
            element: container.find('.form-editor'),
            maxLength: 30
        });


        me.editor.setValue(
            store.get('courseDateDesc') || ''
        );

        // 日历元素
        var calendarElement = container.find('#calendar');

        // 快捷方式容器
        var shortElement = container.find('.short-selector');

        // 需要保存的数据
        var courseData = [ ];

        var today = new Date();
        var startWeek = getWeekIndex(today).week;
        // 时间范围是两个月
        var endWeek = startWeek + 7;

        // 当前显示的年和周
        var currentYear = 0;
        var currentWeek = 0;

        var courseCalendar = new CourseCalendar({
            element: calendarElement,
            onBeforeRender: function (data) {
                // 不是初始化的时候才统计
                if (currentYear !== 0) {
                    var code = getWeekCode(calendarElement);
                    courseData[currentWeek - startWeek] = code;
                }
            },
            onAfterRender: function (data) {

                var info = getWeekIndex(dateUtil.parse(data.end));
                currentYear = info.year;
                currentWeek = info.week;

                var code = courseData[ currentWeek - startWeek ];

                if (code) {

                    courseCalendar.apply(
                        code2Data(data.start, code)
                    );

                }
                else {

                    service
                    .getTeacherBusyDate({
                        number: store.get('user').number,
                        start: dateUtil.stringify(dateUtil.parse(data.start)),
                        end: dateUtil.stringify(dateUtil.parse(data.end))
                    })
                    .done(function (response) {
                        if (response.code === 0) {
                            courseCalendar.apply(
                                response.data
                            );
                        }
                    });

                }
            },
            onChange: function () {

                // 日历变化 => 快捷方式
                var code = getWeekCode(calendarElement);

                $.each(
                    bitMap,
                    function (key, item) {
                        var target = shortElement.find('.' + key);

                        if ((code & item.code) >= item.code) {
                            target.addClass(activeClass);
                        }
                        else {
                            target.removeClass(activeClass);
                        }
                    }
                );

                confirmOnLeave();
            }
        });

        function toggle(element, name) {

            var active;

            if (element.hasClass(activeClass)) {
                active = false;
                element.removeClass(activeClass);
            }
            else {
                active = true;
                element.addClass(activeClass);
            }

            bitMap[name].active = active;

            // 算出天对应的 code
            var dayCode = 0;
            dayCode = operateOr(dayCode, bitMap.workday);
            dayCode = operateOr(dayCode, bitMap.saturday);
            dayCode = operateOr(dayCode, bitMap.sunday);

            // 算出时段对应的 code
            var partCode = 0;
            partCode = operateOr(partCode, bitMap.morning);
            partCode = operateOr(partCode, bitMap.afternoon);
            partCode = operateOr(partCode, bitMap.evening);

            // 天 和 时段 进行与操作
            // 前提是 天 和 时段 都不为 0
            var code = dayCode !== 0 ? dayCode : 0;
            if (code > 0) {
                if (partCode !== 0) {
                    code = code & partCode;
                }
            }
            else {
                code = partCode;
            }

            calendarElement.find('td').each(
                function () {

                    var element = $(this);

                    if ((element.data('code') & code) !== 0) {
                        element.addClass(activeClass);
                    }
                    else {
                        element.removeClass(activeClass);
                    }

                }
            );

            confirmOnLeave();
        }

        var num = 0; // 计数，几周有数据

        container
        .on('click', '.short-selector .workday', function (e) {
            toggle($(e.currentTarget), 'workday');
        })
        .on('click', '.short-selector .saturday', function (e) {
            toggle($(e.currentTarget), 'saturday');
        })
        .on('click', '.short-selector .sunday', function (e) {
            toggle($(e.currentTarget), 'sunday');
        })
        .on('click', '.short-selector .morning', function (e) {
            toggle($(e.currentTarget), 'morning');
        })
        .on('click', '.short-selector .afternoon', function (e) {
            toggle($(e.currentTarget), 'afternoon');
        })
        .on('click', '.short-selector .evening', function (e) {
            toggle($(e.currentTarget), 'evening');
        })

        .on('click', '.btn-save', function (e) {

            var target = $(e.currentTarget);

            target.prop('disabled', true);
            target.html('正在保存...');

            saveCalendar(courseData, target);

        });

        /*
         * 把当前周应用到所有空的周
         */
        function toFuture () {

            var index; // = currentWeek - startWeek;
            var end = endWeek - startWeek;
            var code = getWeekCode(calendarElement); // 当前周的code值

            for (index = 0; index <= end; index++) {
                if (courseData[index] || code == 0) {
                }
                else {
                    courseData[index] = code;
                }
            }

            confirmOnLeave();
        }

        /*
         * 保存当前设置
         * target - 防止反复提交保存
         */
        function saveCalendar (data, target) {

            var index = currentWeek - startWeek; // 当前第几周
            var code = getWeekCode(calendarElement); // 当前第几周的code值

            courseData[index] = code;

            var data = [ ];

            $.map(courseData, function (code, index) {

                var time = (today.getTime() + index * dateUtil.WEEK);
                var info = getWeekIndex(new Date(time));

                data.push([ info.year, info.week, code]);

            });

            var descript = container.find('textarea[name="descript"]').val();

            if (data[0][2]) {

                service
                .setTeacherBusyDate({
                    weeks: data,
                    descript: descript
                })
                .done(function (response) {

                    // 保存按钮生效
                    target.prop('disabled', false);
                    target.html('保存');

                    if (response.code === 0) {
                        noConfirmOnLeave();
                        success('保存成功', function () {
                            location.reload();
                        });
                    }
                });
            }
            else {
                alert({
                    content: '小秘书发现你没有设置可授课时间，请返回修改~',
                    title: '温馨提示',
                    width: 350
                })
                .done(function () {
                    service
                    .setTeacherBusyDate({
                        weeks: data,
                        descript: descript
                    })
                    .done(function (response) {
                        // 保存按钮生效
                        target.prop('disabled', false);
                        target.html('保存');

                        if (response.code === 0) {
                            noConfirmOnLeave();
                            success('保存成功', function () {
                                location.reload();
                            });
                        }
                    });
                });
            }

        }



    };

});
