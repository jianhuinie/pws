/**
 * @file 约课日历
 * @author zhujialu
 */
define(function (require, exports) {

    'use strict';

    var Calendar = require('cobble/form/Date');
    var lpad = require('cobble/function/lpad');

    /**
     * 约课日历
     *
     * @param {Object} options
     * @property {jQuery} options.element 输入框元素，如果结构完整，也可传容器元素
     * @property {Date=} options.today 服务器时间校正，避免客户端时间不准
     * @property {Date=} options.date 打开面板所在月份
     * @property {string=} options.value 选中的日期
     * @property {Array.<number>} options.weekdays 星期几可选，如[1,2,3]表示可选周一周二周三
     * @property {Function=} options.onChange
     */
    function ReserveCalendar(options) {
        $.extend(this, ReserveCalendar.defaultOptions, options);
        this.init();
    }

    ReserveCalendar.prototype = {

        constructor: ReserveCalendar,

        init: function () {

            var me = this;

            me.calendar = new Calendar({
                element: me.element,
                today: me.today,
                value: me.value,
                date: me.date,
                renderCalendarTemplate: function (data) {

                    $.each(
                        data.list,
                        function (index, item) {

                            item.text = [
                                item.year,
                                lpad(item.month),
                                lpad(item.date)
                            ].join('-');

                        }
                    );

                    var html = [
                        '<div class="calendar-header">',
                            '<i class="icon icon-chevron-left"></i>',
                            '<strong>', data.year, '年', data.month, '月</strong>',
                            '<i class="icon icon-chevron-right"></i>',
                        '</div>',
                        '<table>',
                              '<thead>',
                                  '<tr>',
                                      '<th>一</th>',
                                      '<th>二</th>',
                                      '<th>三</th>',
                                      '<th>四</th>',
                                      '<th>五</th>',
                                      '<th>六</th>',
                                      '<th>日</th>',
                                  '</tr>',
                              '</thead>',
                              '<tbody>'
                    ];

                    $.each(
                        data.list,
                        function (index, item) {

                            if (index % 7 === 0) {
                                html.push(
                                    index === 0 ? '<tr>' : '</tr>'
                                );
                            }

                            html.push('<td class="' + item.phase);

                            var disabled = item.phase === 'past';

                            if (!disabled) {
                                disabled = $.inArray(item.day, me.weekdays) < 0;
                            }


                            // 当天大于23:00 则时间不可再点击
                            if (item.phase === 'today') {
                                var d = new Date(item.text);
                                if (d.getHours() == 23 && d.getMinutes() >= 30) {
                                    html.push(' date-disabled');
                                }
                            }

                            if (disabled) {
                                html.push(' date-disabled');
                            }

                            html.push('"');

                            if (!disabled) {
                                html.push(' data-value="' + item.text + '"');
                            }

                            html.push(' data-year="' + item.year + '"');
                            html.push(' data-month="' + item.month + '"');
                            html.push(' data-date="' + item.date + '">');
                            html.push(item.date);
                            html.push('</td>');

                        }
                    );

                    html.push('</tbody></table>');

                    return html.join('');
                },
                onChange: me.onChange
            });
        },

        setValue: function (value, options) {
            this.calendar.setValue(value, options);
        },

        /**
         * 刷新
         *
         * @param {Object} options
         * @property {Array} options.weekdays
         * @property {Date=} options.date 打开面板所在月份
         */
        refresh: function (options) {

            var me = this;

            $.extend(me, options);

            me.calendar.render(me.date);

        }

    };

    ReserveCalendar.defaultOptions = {
        weekdays: [0, 1, 2, 3, 4, 5, 6],
        date: new Date(),
        today: new Date()
    };

    return ReserveCalendar;

});