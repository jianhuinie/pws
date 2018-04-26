define(function (require, exports, module) {

    'use strict';

    var DateRange = require('cc/form/DateRange');
    var lpad = require('cc/function/lpad');
    var etpl = require('cc/util/etpl');

    var tplRender = { };

    DateRange.defaultOptions = {
        firstDay: 1,
        mode: 'month',
        multiple: false,
        stable: true,
        separator: ' - ',

        valueAttribute: 'data-value',
        parse: function (text) {
            return new Date(text);
        },

        inputSelector: ':text',
        layerSelector: '> .menu',
        startCalendarSelector: '.calendar-start',
        endCalendarSelector: '.calendar-end',

        itemSelector: '[data-value]',
        itemActiveClass: 'active',

        prevSelector: '.icon-chevron-left',
        nextSelector: '.icon-chevron-right',

        applySelector: '.footer > .buttons > .primary',
        cancelSelector: '.footer > .buttons > .link',

        showLayerTrigger: 'focus',
        hideLayerTrigger: 'click',
        showLayerAnimation: function (options) {
            options.layerElement.show();
        },
        hideLayerAnimation: function (options) {
            options.layerElement.hide();
        },

        calendarTemplate: '<div class="header">'
                        +     '<i class="icon icon-chevron-left"></i>'
                        +     '<strong>${year}年${month}月</strong>'
                        +     '<i class="icon icon-chevron-right"></i>'
                        + '</div>'
                        + '<table class="body">'
                        +     '<thead>'
                        +          '<tr>'
                        +              '<th>一</th>'
                        +              '<th>二</th>'
                        +              '<th>三</th>'
                        +              '<th>四</th>'
                        +              '<th>五</th>'
                        +              '<th>六</th>'
                        +              '<th>日</th>'
                        +          '</tr>'
                        +     '</thead>'
                        +     '<tbody>'
                        +         '<!-- for: ${list} as ${item}, ${index} -->'
                        +         '<!-- if: ${index} % 7 === 0 -->'

                        +         '<!-- if: ${index} === 0 -->'
                        +         '<tr>'
                        +         '<!-- else -->'
                        +         '</tr>'
                        +         '<!-- /if -->'

                        +         '<!-- /if -->'

                        +             '<td class="${item.phase}'

                        +               '<!-- if: ${item.active} -->'
                        +               ' active'
                        +               '<!-- /if -->'

                        +               '<!-- if: ${item.month} !== ${month} -->'
                        +               ' adjacent'
                        +               '<!-- /if -->'

                        +               '"'
                        +               ' data-value="${item.year}/'
                        +               '<!-- if: ${item.month} < 10 -->0<!-- /if -->'
                        +               '${item.month}/'
                        +               '<!-- if: ${item.date} < 10 -->0<!-- /if -->'
                        +               '${item.date}'
                        +               '"'

                        +               ' data-year="${item.year}"'
                        +               ' data-month="${item.month}"'
                        +               ' data-date="${item.date}">'
                        +                 '${item.date}'
                        +             '</td>'

                        +         '<!-- /if -->'
                        +         '<!-- /for -->'
                        +     '</tbody>'
                        + '</table>',

        render: function (data, tpl) {

            var render = tplRender[ tpl ];
            if (!render) {
                render = tplRender[ tpl ] = etpl.compile(tpl);
            }

            return render(data);

        }
    };

    return DateRange;

});