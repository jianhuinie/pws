/**
 * @file 可授课时间
 * @author zhujialu
 */
define(function (require) {

    'use strict';

    var Calendar = require('cobble/ui/Calendar');
    var dateUtil = require('cobble/util/date');
    var etpl = require('cobble/util/etpl');
    var store = require('common/store');

    /**
     * 可授课时间
     *
     * @constructor
     * @param {Object} options
     * @property {jQuery} options.element
     * @property {Object} options.selectedDate 选中的日期，格式为：{ '2014-08-11': 1 }
     * @property {Function} options.onAfterRender
     */
    function WeekCalendar(options) {
        $.extend(this, options);
        this.init();
    }

    WeekCalendar.prototype = {

        constructor: WeekCalendar,

        init: function () {

            var me = this;

            var serverTime = store.get('serverTime');

            this.calendar = new Calendar({

                element: this.element,

                mode: 'week',
                multiple: true,

                firstDay: 1,
                activeClass: 'active',

                prevSelector: '.icon-chevron-left',
                nextSelector: '.icon-chevron-right',

                onAfterRender: function (e, data) {

                    if (me.selectedDate) {
                        me.apply(me.selectedDate);
                    }

                    if ($.isFunction(me.onAfterRender)) {
                        me.onAfterRender(data);
                    }

                },

                onBeforeRender: function (e, data) {

                    // 不能往前翻
                    if (data.start.phase !== 'future') {
                        data.prevHidden = true;
                    }

                    var endDate = data.end;
                    var time =  dateUtil.parse(endDate.year, endDate.month, endDate.date) - serverTime;

                    if (time / dateUtil.WEEK > 8) {
                        data.nextHidden = true;
                    }

                    $.each(
                        data.list,
                        function (index, item) {

                            var key = dateUtil.stringify(dateUtil.parse(item));

                            if (item.month < 10) {
                                item.month = '0' + item.month;
                            }
                            if (item.date < 10) {
                                item.date = '0' + item.date;
                            }

                        }
                    );
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
                        var target = element.find('[data-date="' + date + '-' + bit + '"]');
                        target.html('<i class="icon icon-check"></i>');
                        target.addClass('active');
                    });

                }
            );
        }

    };

    var render = etpl.compile(
          '<div class="week-calendar">'
        +     '<div class="calendar-header">'
        +         '<div class="calendar-title">'
        +             '${start.month}月${start.date}日 - '
        +             '${end.month}月${end.date}日'
        +         '</div>'
        +         '<!-- if: !${prevHidden} -->'
        +         '<i class="icon icon-chevron-left"></i>'
        +         '<!-- /if -->'
        +         '<!-- if: !${nextHidden} -->'
        +         '<i class="icon icon-chevron-right"></i>'
        +         '<!-- /if -->'
        +     '</div>'
        +     '<div class="calendar-body">'
        +         '<table>'
        +             '<thead>'
        +                 '<tr>'
        +                     '<!-- for: ${list} as ${item}, ${index} -->'
        +                     '<th class="${item.phase}">'
        +                         '<div>${item.date}</div>'
        +                         '<!-- if: ${item.day} === 0 -->日'
        +                         '<!-- elif: ${item.day} === 1 -->一'
        +                         '<!-- elif: ${item.day} === 2 -->二'
        +                         '<!-- elif: ${item.day} === 3 -->三'
        +                         '<!-- elif: ${item.day} === 4 -->四'
        +                         '<!-- elif: ${item.day} === 5 -->五'
        +                         '<!-- elif: ${item.day} === 6 -->六'
        +                         '<!-- /if -->'
        +                     '</th>'
        +                     '<!-- /for -->'
        +                 '</tr>'
        +             '</thead>'
        +             '<tbody>'
        +                 '<tr>'
        +                     '<!-- for: ${list} as ${item}, ${index} -->'
        +                     '<td class="${item.phase}'
        +                     '<!-- if: ${item.morning} --> active<!-- /if -->'
        +                     '" data-date="${item.year}-${item.month}-${item.date}-1">上</td>'
        +                     '<!-- /for -->'
        +                 '</tr>'
        +                 '<tr>'
        +                     '<!-- for: ${list} as ${item}, ${index} -->'
        +                     '<td class="${item.phase}'
        +                     '<!-- if: ${item.afternoon} --> active<!-- /if -->'
        +                     '" data-date="${item.year}-${item.month}-${item.date}-2">下</td>'
        +                     '<!-- /for -->'
        +                 '</tr>'
        +                 '<tr>'
        +                     '<!-- for: ${list} as ${item}, ${index} -->'
        +                     '<td class="${item.phase}'
        +                     '<!-- if: ${item.evening} --> active<!-- /if -->'
        +                     '" data-date="${item.year}-${item.month}-${item.date}-4">晚</td>'
        +                     '<!-- /for -->'
        +                 '</tr>'
        +             '</tbody>'
        +         '</table>'
        +     '</div>'
        + '</div>'
    );

    return WeekCalendar;

});