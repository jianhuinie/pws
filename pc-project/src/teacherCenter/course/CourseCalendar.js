/**
 * @file 可授课时间日历
 * @author zhujialu
 */
define(function (require) {

    'use strict';

    var Calendar = require('cobble/ui/Calendar');
    var date = require('cobble/util/date');
    var etpl = require('cobble/util/etpl');

    /**
     * 可授课时间日历
     *
     * @constructor
     * @param {Object} options
     * @property {jQuery} options.element
     * @property {?Function} options.onBeforeRender
     * @property {?Function} options.onAfterRender
     * @property {?Function} options.onChange
     */
    function CourseCalendar(options) {
        $.extend(this, options);
        this.init();
    }

    CourseCalendar.prototype = {

        init: function () {

            var me = this;

            var today = new Date();
            // 只能往后翻 7 周，共计8周
            var maxWeek = 7;

            this.calendar = new Calendar({

                element: me.element,

                mode: 'week',
                toggle: true,
                multiple: true,

                firstDay: 1,
                activeClass: 'active',

                prevSelector: '.prev',
                nextSelector: '.next',

                onChange: function () {
                    if ($.isFunction(me.onChange)) {
                        me.onChange();
                    }
                },
                onAfterRender: function (e, data) {
                    if ($.isFunction(me.onAfterRender)) {
                        me.onAfterRender(data);
                    }
                },

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

                    var start = date.parse(data.start);
                    var end = date.parse(data.end);

                    // 大于两个月
                    data.enableNext = (end - today) <= maxWeek * date.WEEK;

                    data.enablePrev = start > today;

                    if ($.isFunction(me.onBeforeRender)) {
                        me.onBeforeRender();
                    }

                },

                renderTemplate: function (data) {
                    return render(data);
                }

            });

        },

        /**
         * 应用选中时间
         *
         * @param {Object} selectedDate
         */
        apply: function (selectedDate) {

            var element = this.element;

            $.each(
                selectedDate,
                function (date, value) {

                    var list = [ ];

                    if ((value & 1) === 1) {
                        list.push(1);
                    }
                    if ((value & 2) === 2) {
                        list.push(2);
                    }
                    if ((value & 4) === 4) {
                        list.push(4);
                    }

                    $.each(list, function (index, bit) {
                        var target = element.find('[data-value="' + date + '-' + bit + '"]');
                        target.addClass('active');
                    });

                }
            );
        }
    };

    var render = etpl.compile(
          '<div class="course-calendar">'
        +     '<div class="calendar-body">'
        +         '<table>'
        +             '<thead>'
        +                 '<tr>'
        +                     '<!-- for: ${list} as ${item} -->'
        +                     '<th class="${item.phase}">'
        +                         '<!-- if: ${item.day} === 0 -->周日'
        +                         '<!-- elif: ${item.day} === 1 -->周一'
        +                         '<!-- elif: ${item.day} === 2 -->周二'
        +                         '<!-- elif: ${item.day} === 3 -->周三'
        +                         '<!-- elif: ${item.day} === 4 -->周四'
        +                         '<!-- elif: ${item.day} === 5 -->周五'
        +                         '<!-- elif: ${item.day} === 6 -->周六'
        +                         '<!-- /if -->'
        +                     '</th>'
        +                     '<!-- /for -->'
        +                 '</tr>'
        +             '</thead>'
        +             '<tbody>'
        +                 '<tr>'
        +                     '<!-- var: code = 1 -->'
        +                     '<!-- for: ${list} as ${item} -->'

        +                     '<td class="${item.phase}"'
        +                     ' data-code="${code}"'
        +                     ' data-date="${item.year}-${item.month}-${item.date}"'
        +                     ' data-value="${item.year}-${item.month}-${item.date}-1">'

        +                     '<i class="icon icon-check-circle"></i>上'

        +                     '</td>'

        +                     '<!-- var: code = ${code} * 8 -->'
        +                     '<!-- /for -->'
        +                 '</tr>'
        +                 '<tr>'
        +                     '<!-- var: code = 2 -->'
        +                     '<!-- for: ${list} as ${item} -->'

        +                     '<td class="${item.phase}"'
        +                     ' data-code="${code}"'
        +                     ' data-date="${item.year}-${item.month}-${item.date}"'
        +                     ' data-value="${item.year}-${item.month}-${item.date}-2">'

        +                     '<i class="icon icon-check-circle"></i>下'

        +                     '</td>'

        +                     '<!-- var: code = ${code} * 8 -->'
        +                     '<!-- /for -->'
        +                 '</tr>'
        +                 '<tr>'
        +                     '<!-- var: code = 4 -->'
        +                     '<!-- for: ${list} as ${item} -->'

        +                     '<td class="${item.phase}"'
        +                     ' data-code="${code}"'
        +                     ' data-date="${item.year}-${item.month}-${item.date}"'
        +                     ' data-value="${item.year}-${item.month}-${item.date}-4">'

        +                     '<i class="icon icon-check-circle"></i>晚'

        +                     '</td>'

        +                     '<!-- var: code = ${code} * 8 -->'
        +                     '<!-- /for -->'
        +                 '</tr>'
        +             '</tbody>'
        +         '</table>'
        +     '</div>'
        + '</div>'
    );

    return CourseCalendar;

});