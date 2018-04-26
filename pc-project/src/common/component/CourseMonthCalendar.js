/**
 * @file 选课周视图
 * @author zhujialu
 */
define(function (require) {

    'use strict';

    var Calendar = require('cobble/ui/Calendar');
    var etpl = require('cobble/util/etpl');
    var dateUtil = require('cobble/util/date');
    var service = require('../service');
    var store = require('../store');

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
    function CourseMonthCalendar(options) {
        $.extend(this, options);
        this.init();
    }

    CourseMonthCalendar.prototype = {

        init: function () {

            var me = this;
            var element = me.element;

            var activeClass = 'active';

            // 因为是单选
            // 所以可以记录当前选中的日期
            var activeYear;
            var activeMonth;
            var activeDate;
            var activePart;

            var calendar = new Calendar({

                mode: 'month',
                date: me.date,
                today: me.today,

                element: element,
                activeClass: activeClass,

                prevSelector: '.prev:not(.disabled)',
                nextSelector: '.next:not(.disabled)',

                onBeforeRender: function (e, data) {

                    $.each(
                        data.list,
                        function (index, item) {

                            if (item.month < 10) {
                                item.month = '0' + item.month;
                            }
                            if (item.date < 10) {
                                item.date = '0' + item.date;
                            }
                        }
                    );

                    if ($.isFunction(me.onBeforeRender)) {
                        me.onBeforeRender(data);
                    }
                },

                onAfterRender: function (e, data) {

                    var start = data.start;
                    var end = data.end;

                    var startDate = dateUtil.parse(start);

                    // 获取第二天的日期
                    var endDate = dateUtil.add(
                                    dateUtil.parse(end),
                                    1
                                );

                    end = dateUtil.simplify(endDate);

                    var user = store.get('user');
                    var method = user.type == 0
                               ? 'getTeacherLessons'
                               : 'getStudentLessons';

                    service[method]({
                        startDate: dateUtil.stringify(startDate),
                        endDate: dateUtil.stringify(endDate)
                    })
                    .done(function (response) {
                        if (response.code === 0) {

                            $.each(
                                response.data,
                                function (key, value) {

                                    if (value) {
                                        var target = element.find('[data-value="' + key + '"]');
                                        if (!target.children().length) {
                                            target.append('<i class="icon icon-circle"></i>');
                                        }
                                    }

                                }
                            );

                            if (activeYear) {
                                var value = [ activeYear, activeMonth, activeDate, activePart ].join('-');
                                calendar.setValue(value);
                            }

                            if ($.isFunction(me.onAfterRender)) {
                                me.onAfterRender(data);
                            }
                        }
                    });

                    if ($.isFunction(me.onAfterRender)) {
                        me.onAfterRender(data);
                    }
                },

                onChange: function () {

                    me.value = this.value;

                    if (me.value) {
                        var target = element.find('.' + activeClass);
                        activeYear = target.data('year');
                        activeMonth = target.data('month');
                        activeDate = target.data('date');
                        activePart = target.data('part');

                        element.find('.active-year').html(activeYear);
                        element.find('.active-month').html(activeMonth);
                        element.find('.active-date').html(activeDate);
                        element.find('.active-day').html(dayMap[target.data('day')]);

                        if ($.isFunction(me.onChange)) {
                            me.onChange();
                        }
                    }
                },

                renderTemplate: function (data) {
                    return render(data);
                }
            });

            if (me.value) {
                calendar.setValue(me.value);
            }

            element.on('click', '.toggle', function (e) {
                me.toggle();
            });

        },

        /**
         * 展开收起
         *
         */
        toggle: function () {

            var element = this.element;
            var calendarElement = element.find('.course-calendar');
            var toggleElement = element.find('.toggle');

            // 收起 className
            var packClass = 'pack';

            // 展开
            if (calendarElement.hasClass(packClass)) {
                calendarElement.removeClass(packClass);
                calendarElement.find('tr:hidden').show();
                toggleElement.html('收起');
            }

            // 收起
            else {
                calendarElement.addClass(packClass);
                toggleElement.html('展开');

                // 默认展现第一行
                var index = 0;

                var target = calendarElement.find('.active');
                if (target.length === 1) {
                    // 周视图，不能展现一天的某个时段，而显示当前日期
                    if (!target.data('part')) {
                        index = target.closest('tr').index();
                    }
                }

                calendarElement
                    .find('tbody tr')
                    .each(function (rowIndex) {
                        if (rowIndex !== index) {
                            $(this).hide();
                        }
                    });
            }
        }

    };

    var dayMap = {
        '0': '周日',
        '1': '周一',
        '2': '周二',
        '3': '周三',
        '4': '周四',
        '5': '周五',
        '6': '周六'
    };

    var render = etpl.compile(
          '<div class="course-calendar">'
        +     '<table>'
        +         '<thead>'
        +             '<tr>'
        +                 '<th>周一</th>'
        +                 '<th>周二</th>'
        +                 '<th>周三</th>'
        +                 '<th>周四</th>'
        +                 '<th>周五</th>'
        +                 '<th>周六</th>'
        +                 '<th>周日</th>'
        +             '</tr>'
        +         '</thead>'
        +         '<tbody>'
        +             '<!-- for: ${list} as ${item}, ${index} -->'
        +                 '<!-- if: ${index} % 7 === 0 -->'

        +                 '<!-- if: ${index} === 0 -->'
        +                 '<tr>'
        +                 '<!-- else -->'
        +                 '</tr><tr>'
        +                 '<!-- /if -->'

        +                 '<!-- /if -->'

        +                 '<td class="${item.phase} '
        +                 '<!-- if: ${item.month} != ${month} -->'
        +                 'adjacency-month'
        +                 '<!-- else -->'
        +                 'current-month'
        +                 '<!-- /if -->'
        +                 '" data-value="${item.year}-${item.month}-${item.date}"'
        +                 ' data-year="${item.year}" data-month="${item.month}" data-date="${item.date}" data-day="${item.day}"'
        +                 '>${item.date}</td>'

        +             '<!-- /for -->'
        +         '</tbody>'
        +     '</table>'

        +     '<div class="overview">'
        +         '<div class="header">'
        +             '<span class="active-year">${year}</span> 年 '
        +             '<span class="active-month">${month}</span> 月'
        +             '<i class="icon icon-chevron-left prev"></i>'
        +             '<i class="icon icon-chevron-right next"></i>'
        +         '</div>'
        +         '<div class="body">'
        +             '<strong class="active-date"></strong>'
        +             '<strong class="active-day"></strong>'
        +         '</div>'
        +     '</div>'

        +     '<div class="toggle">收起</div>'
        + '</div>'
    );


    return CourseMonthCalendar;

});