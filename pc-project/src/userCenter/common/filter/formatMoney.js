/**
 * @file 格式化钱
 * @author zhujialu
 */
define(function (require, exports, module) {

    'use strict';

    var lpad = require('cc/function/lpad');
    var multiply = require('cc/function/multiply');
    var toString = require('cc/function/toString');

    /**
     * @param {number} money
     * @param {boolean} isCent money 的单位是否为分
     * @param {string=} separator 分隔符，默认是 ,
     * @return {string}
     */
    return function (money, isCent, separator) {

        if (!$.isNumeric(money)) {
            return '';
        }

        money = toString(money);

        var terms = money.split('.');
        var term1 = terms[0];
        var term2 = terms[1] || '';

        var signed = '';
        if (term1.indexOf('-') === 0
            || term1.indexOf('+') === 0
        ) {
            signed = term1.charAt(0);
            var list = [ term1.substr(1) ];
            if (term2) {
                list.push(term2);
            }
            money = list.join('.');
        }

        if (!isCent) {
            money = '' + multiply(money, 100);
        }

        var unit = 3;
        if (money.length < 3) {
            money = lpad(money, unit);
        }

        var end = money.length - 2;
        var start = end - unit;

        var decimal = money.substr(end);

        var result = [ ];

        while (true) {

            if (start < 0) {
                start = 0;
            }

            result.unshift(
                money.slice(start, end)
            );

            if (start > 0) {
                start -= unit;
                end -= unit;
            }
            else {
                break;
            }

        }

        if ($.type(separator) !== 'string') {
            separator = ',';
        }

        return signed + result.join(separator) + '.' + decimal;

    };

});