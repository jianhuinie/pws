define(function (require, exports, module) {

    'use strict';

    var FormDate = require('cc/form/Date');
    var lpad = require('cc/function/lpad');
    var etpl = require('cc/util/etpl');

    var stringifyDate = require('cc/function/stringifyDate');

    var tplRender = { };

    FormDate.defaultOptions = {
        firstDay: 1,
        mode: 'month',
        toggle: false,
        multiple: false,
        stable: true,

        valueAttribute: 'data-value',
        parse: function (text) {
            return new Date(text);
        },

        inputSelector: 'input[type="text"]',
        layerSelector: '.calendar',

        itemSelector: '[data-value]',
        itemActiveClass: 'checked',

        prevSelector: '.icon-chevron-left',
        nextSelector: '.icon-chevron-right',

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

                        +               '<!-- if: ${item.month} !== ${month} -->'
                        +               ' adjacent'
                        +               '<!-- /if -->'

                        +               '<!-- if: ${item.active} -->'
                        +               ' active'
                        +               '<!-- /if -->'

                        +               '<!-- if: ${item.disabled} -->'
                        +               ' disabled'
                        +               '<!-- /if -->'

                        +               '"'

                        +               '<!-- if: ${item.disabled} !== true -->'
                        +               ' data-value="${item.value}"'
                        +               '<!-- /if -->'

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

            var disableBefore = this.option('disableBefore');
            var disableAfter = this.option('disableAfter');

            disableBefore = $.type(disableBefore) === 'date'
                ? stringifyDate(disableBefore, '/')
                : null;

            disableAfter = $.type(disableAfter) === 'date'
                ? stringifyDate(disableAfter, '/')
                : null;

            // 这里要修改数据，为了避免影响二次渲染，这里复制一份
            data = $.extend(true, {}, data);

            $.each(data.list, function (index, item) {

                item.value = [
                    item.year,
                    lpad(item.month, 2),
                    lpad(item.date, 2)
                ].join('/');

                if ((disableBefore && disableBefore > item.value)
                    || (disableAfter && disableAfter < item.value)
                ) {
                    item.disabled = true;
                }
            });

            return render(data);

        }
    };

    return FormDate;

});