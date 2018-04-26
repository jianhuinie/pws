/**
 * @file 选课周视图
 * @author zhujialu
 */
define(function (require) {

    'use strict';

    var Calendar = require('cobble/ui/Calendar');
    var Tooltip = require('cobble/ui/Tooltip');
    var etpl = require('cobble/util/etpl');
    var dateUtil = require('cobble/util/date');
    var service = require('../service');
    var store = require('common/store');
    var underscore = require('underscore');

    /**
     *
     * @constructor
     * @param options
     * @property {string} options.purchaseId 订单 ID
     * @property {Date=} options.today 今天的日期，用作服务器时间校正
     * @property {Date=} options.date 初始化时视图所在的日期，默认是当天
     * @property {?Function} options.onChange
     * @property {?Function} options.onBeforeRender
     * @property {?Function} options.onAfterRender
     */
    function CourseWeekCalendar(options) {
        $.extend(this, options);
        this.init();
    }

    CourseWeekCalendar.prototype = {

        init: function () {

            var me = this;
            var element = me.element;

            var activeClass = 'active';

            var serverTime = store.get('serverTime');

            // 因为是单选
            // 所以可以记录当前选中的日期
            var activeYear;
            var activeMonth;
            var activeDate;
            var activePart;

            var calendar = new Calendar({

                mode: 'week',
                date: me.date,
                today: me.today,

                element: element,
                activeClass: activeClass,

                prevSelector: '.prev',
                nextSelector: '.next',

                onBeforeRender: function (e, data) {

                    // 不能往前翻
                    if (data.start.phase !== 'future') {
                        data.prevHidden = true;
                    }

                    var endDate = data.end;
                    var time =  dateUtil.parse(endDate.year, endDate.month, endDate.date) - serverTime;

                    if (time / dateUtil.WEEK > 7) {
                        data.nextHidden = true;
                    }

                    // 当天
                    var date = new Date();

                    // 设置是否可选
                    $.each(
                        data.list,
                        function (index, item) {

                            var morning = false;
                            var afternoon = false;
                            var evening = false;

                            if (item.phase === 'future') {
                                morning = true;
                                afternoon = true;
                                evening = true;
                            }
                            else if (item.phase === 'today') {
                                morning = isMorningEnable(date);
                                afternoon = isAfternoonEnable(date);
                                evening = isEveningEnable(date);
                            }

                            if (item.month < 10) {
                                item.month = '0' + item.month;
                            }
                            if (item.date < 10) {
                                item.date = '0' + item.date;
                            }

                            item.morning = morning;
                            item.afternoon = afternoon;
                            item.evening = evening;
                        }
                    );

                    if ($.isFunction(me.onBeforeRender)) {
                        me.onBeforeRender(data);
                    }
                },

                onAfterRender: function (e, data) {

                    var start = data.start;
                    var end = data.end;

                    service
                    .getLessons({
                        purchaseId: me.purchaseId,
                        startDate: [ start.year, start.month, start.date ].join('-'),
                        endDate: [ end.year, end.month, end.date ].join('-')
                    })
                    .done(function (response) {
                        if (response.code === 0) {

                            addLessonDataToCalendar(
                                element,
                                response.data.lessons,
                                response.data.flags
                            );

                            if (activeYear) {
                                var value = [ activeYear, activeMonth, activeDate, activePart ].join('-');
                                calendar.setValue(value);
                            }

                            element.find('.enabled').find('em').append(
                                '<label class="label-success tiny">可约</label>'
                            );

                            if ($.isFunction(me.onAfterRender)) {
                                me.onAfterRender(data);
                            }
                        }
                    });
                },

                onChange: function () {

                    me.value = this.value;

                    if (me.value) {
                        var target = element.find('.' + activeClass);
                        activeYear = target.data('year');
                        activeMonth = target.data('month');
                        activeDate = target.data('date');
                        activePart = target.data('part');

                        if ($.isFunction(me.onChange)) {
                            me.onChange();
                        }
                    }
                },
                renderTemplate: function (data) {
                    return render(data);
                }
            });

        }

    };

    /**
     * 上午是否可用，在 12:30 之前都算可以
     *
     * @inner
     * @param {Date} date
     * @return {boolean}
     */
    function isMorningEnable(date) {
        var time = date.getTime();

        var copy = new Date(time);
        copy.setHours(12);
        copy.setMinutes(30);
        return time < copy.getTime();
    }

    /**
     * 上午是否可用，在 18:30 之前都算可以
     *
     * @inner
     * @param {Date} date
     * @return {boolean}
     */
    function isAfternoonEnable(date) {
        var time = date.getTime();

        var copy = new Date(time);
        copy.setHours(18);
        copy.setMinutes(30);
        return time < copy.getTime();
    }

    /**
     * 上午是否可用，在 23:30 之前都算可以
     *
     * @inner
     * @param {Date} date
     * @return {boolean}
     */
    function isEveningEnable(date) {
        var time = date.getTime();

        var copy = new Date(time);
        copy.setHours(23);
        copy.setMinutes(30);
        return time < copy.getTime();
    }

    /**
     * 往日历中添加课程信息
     *
     * @inner
     * @param {jQuery} element 日历元素
     * @param {Object} lessons 课程信息
     * @param {Object} flags
     */
    function addLessonDataToCalendar(element, lessons, flags) {

        // flags 标识某个日期是否不上课
        // flasg 格式为
        // {
        //    '2014-08-30': [ 0, 1, 0 ]
        // }
        // 表示 8 月 30 号，上午不上课，下午有课，晚上不上课

        $.each(
            flags,
            function (date, dateFlags) {

                // 获取 key 所在日期的课程信息
                var lesson = lessons[date] || [ ];

                $.each(
                    dateFlags,
                    function (index, flag) {

                        var data = lesson[index];
                        var value;

                        index = + index;

                        switch (index) {
                            case 0:
                                value = date + '-1';
                                break;

                            case 1:
                                value = date + '-2';
                                break;

                            case 2:
                                value = date + '-4';
                                break;
                        }

                        var target = element.find('[data-value="' + value + '"]');
                        var wrapper = target.find('em');
                        var icon;

                        if (flag === 0) {
                            icon = '<i class="icon icon-ban"></i>';
                            target.addClass('disabled');
                            target.removeAttr('data-value');
                        }
                        else if (data) {
                            icon = '<i class="icon icon-circle"></i>';
                            wrapper.addClass('course-tip-trigger');
                            wrapper.data('lesson', data);
                        }

                        if (icon) {
                            target.removeClass('enabled');
                            wrapper.append(icon);
                        }
                    }
                );
            }
        );

        var user = store.get('user');
        var userName = user.name;
        var userType = user.type;

        // 初始化提示浮层
        Tooltip.init(
            element.find('.course-tip-trigger'),
            {
                placement: 'top',
                template: '<div class="tooltip tooltip-default"></div>',
                updateContent: function () {

                    var html = [ ];

                    $.each(
                        this.element.data('lesson'),
                        function (index, lesson) {

                            var time = formatDate(lesson.start_time)
                                     + '-'
                                     + formatDate(lesson.end_time);

                            var teacherName = lesson.teacher_name;
                            var studentName = lesson.student_name;
                            var courseType = lesson.course_type;

                            var desc;

                            // course_type为2表示班课,对应的话术做修改
                            // mock数据里面没加上course_type有时间再加
                            if (courseType != '班课') {
                                if (teacherName === userName) {
                                    desc = '你与' + studentName + '有课';
                                }
                                else {

                                    desc = studentName === userName
                                         ? '你'
                                         : '其他人';

                                    desc += '与' + teacherName + '有课';
                                }
                            } else {
                                if (teacherName === userName) {
                                    desc = '你有班课';
                                }
                                else {

                                    desc = studentName === userName
                                         ? '你'
                                         : '其他人';

                                    desc += '有该老师班课';
                                }
                            }

                            html.push(
                                '<li>' + time + '<span>' + desc +'</span>' + '</li>'
                            );
                        }
                    );

                    html = underscore.uniq(html);

                    this.layer.html(
                         '<ul>'
                        +     html.join('')
                        + '</ul>'
                    );

                },
                // 为了避免影响其他 tooltip，处理一下 className
                onBeforeShow: function () {
                    this.layer.addClass('course-tip');
                },
                onAfterHide: function () {
                    this.layer.removeClass('course-tip');
                }
            }
        );
    }

    /**
     * 把 2014-08-28 07:00:00 格式格式化成 07:00
     *
     * @inner
     * @param {string} date
     * @return {string}
     */
    function formatDate(date) {
        var time = date.split(' ')[1];
        return time.substr(0, 5);
    }

    var render = etpl.compile(
          '<div class="course-week-calendar">'
        +     '<div class="header">'

        +         '${year} 年 ${month} 月'

        +         '<div class="prev">'
        +             '<i class="icon icon-chevron-left"></i>上周'
        +         '</div>'

        +         '<!-- if: !${nextHidden} -->'
        +         '<div class="next">'
        +             '下周<i class="icon icon-chevron-right"></i>'
        +         '</div>'
        +         '<!-- /if -->'

        +     '</div>'
        +     '<table>'
        +         '<thead>'
        +             '<tr>'

        +                 '<!-- for: ${list} as ${item} -->'
        +                 '<th class="${item.phase} date">'
        +                     '周 '
        +                     '<!-- if: ${item.day} == 0 -->日'
        +                     '<!-- elif: ${item.day} == 1 -->一'
        +                     '<!-- elif: ${item.day} == 2 -->二'
        +                     '<!-- elif: ${item.day} == 3 -->三'
        +                     '<!-- elif: ${item.day} == 4 -->四'
        +                     '<!-- elif: ${item.day} == 5 -->五'
        +                     '<!-- elif: ${item.day} == 6 -->六'
        +                     '<!-- /if -->'
        +                     '<div>${item.date}</div>'
        +                 '</th>'
        +                 '<!-- /for -->'
        +                 '</th>'

        +             '</tr>'
        +         '</thead>'
        +         '<tbody>'
        +             '<tr>'
        +                 '<!-- for: ${list} as ${item} -->'
        +                 '<td class="${item.phase} <!-- if: ${item.morning} === false -->disabled<!-- else -->enabled<!-- /if -->"'
        +                 ' data-year="${item.year}" data-month="${item.month}" data-date="${item.date}"'
        +                 ' data-day="${item.day}" data-part="1"'
        +                 '<!-- if: ${item.morning} --> data-value="${item.year}-${item.month}-${item.date}-1"<!-- /if -->'
        +                 '><em>上</em></td>'
        +                 '<!-- /for -->'
        +             '</tr>'
        +             '<tr>'
        +                 '<!-- for: ${list} as ${item} -->'
        +                 '<td class="${item.phase} <!-- if: ${item.afternoon} === false -->disabled<!-- else -->enabled<!-- /if -->"'
        +                 ' data-year="${item.year}" data-month="${item.month}" data-date="${item.date}"'
        +                 ' data-day="${item.day}" data-part="2"'
        +                 '<!-- if: ${item.afternoon} --> data-value="${item.year}-${item.month}-${item.date}-2"<!-- /if -->'
        +                 '><em>下</em></td>'
        +                 '<!-- /for -->'
        +             '</tr>'
        +             '<tr>'
        +                 '<!-- for: ${list} as ${item} -->'
        +                 '<td class="${item.phase} <!-- if: ${item.evening} === false -->disabled<!-- else -->enabled<!-- /if -->"'
        +                 ' data-year="${item.year}" data-month="${item.month}" data-date="${item.date}"'
        +                 ' data-day="${item.day}" data-part="4"'
        +                 '<!-- if: ${item.evening} --> data-value="${item.year}-${item.month}-${item.date}-4"<!-- /if -->'
        +                 '><em>晚</em></td>'
        +                 '<!-- /for -->'
        +             '</tr>'
        +         '</tbody>'
        +     '</table>'
        + '</div>'
    );

    return CourseWeekCalendar;

});