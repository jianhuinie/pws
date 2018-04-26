/**
 * @file 签到日历
 * @author wangyujie
 */
define(function (require) {

    'use strict';

    var Calendar = require('custom/ui/Calendar');
    var etpl = require('cc/util/etpl');
    var parseDate = require('cc/function/parseDate');

    var service = require('./service');

    /**
     *
     * @constructor
     * @param {Object} options
     * @property {Date=} options.today 今天的日期，用作服务器时间校正
     * @property {Date=} options.date 初始化时视图所在的日期，默认是当天
     * @property {Object=} options.watch
     */
    function SignCalendar(options) {
        $.extend(this, options);
        this.init();
    }

    SignCalendar.prototype = {

        init: function () {

            var me = this;
            var element = me.element;

            var calendar = new Calendar({

                mainElement: element,

                mode: 'month',
                date: me.date,
                today: me.today,
                value: me.value,
                stable: false,

                itemActiveClass: 'active',

                prevSelector: '.prev:not(.disabled)',
                nextSelector: '.next:not(.disabled)',

                onbeforerender: function () {

                    var data = this.get('data');

                    $.each(
                        data.list,
                        function (index, item) {
                            if (parseInt(item.month) < 10) {
                                item.month = '0' + parseInt(item.month);
                            }
                            if (parseInt(item.date) < 10) {
                                item.date = '0' + parseInt(item.date);
                            }
                        }
                    );

                },

                onafterrender: function () {

                    var date = this.get('date');
                    var year = date.getFullYear();
                    var month = date.getMonth() + 1;

                    if (month < 10) {
                        month = '0' + month;
                    }

                    var yearMonth = [ year, month ].join('-');

                    service
                    .getCheckinCalendar({
                        month: yearMonth,
                    })
                    .then(function (response) {

                        $.each(
                            response.data.checkin.calendar,
                            function (key, value) {

                                if (value) {
                                    var target = element.find('[data-value="' + value.date + '"]');
                                    target.find('.icon').remove();
                                    target.find('img').remove(); // 防止多次添加表情图
                                    target.append('<img src="' + require.toUrl(siteData.source + '/img/im/expression-' + value.mood + '.png') + '" />');
                                    target.data('mood', value.mood);
                                    target.data('text', value.text);
                                    target.data('time', value.create_time);
                                }

                            }
                        );

                        if ($.isFunction(me.onafterrender)) {
                            me.onafterrender();
                        }

                    });
                },

                watch: me.watch,

                render: function (data) {
                    return render(data);
                }
            });

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
             '<div class="overview">'
        +         '<div class="header">'
        +             '${year} 年 ${month} 月'
        +             '<i class="icon icon-chevron-left prev"></i>'
        +             '<i class="icon icon-chevron-right next"></i>'
        +         '</div>'
        +     '</div>'

        +     '<div class="oneday">'
        +         '<img src="" alt="" />'
        +         '<p class="checkin-text"></p>'
        +         '<p class="checkin-time"></p>'
        +     '</div>'

        +     '<table>'
        +         '<thead>'
        +             '<tr>'
        +                 '<th>一</th>'
        +                 '<th>二</th>'
        +                 '<th>三</th>'
        +                 '<th>四</th>'
        +                 '<th>五</th>'
        +                 '<th>六</th>'
        +                 '<th>日</th>'
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
        +                 ' data-year="${item.year}" data-month="${item.month}" data-date="${item.date}" data-day="${item.day}" data-mood="" data-text="" data-time=""'
        +                 '>${item.date}<i class="icon icon-smile-o"></i></td>'

        +             '<!-- /for -->'
        +         '</tbody>'
        +     '</table>'
    );


    return SignCalendar;

});