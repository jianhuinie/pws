/**
 * @file 格式化数字
 * @author zhujialu
 */
define(function (require, exports, module) {

    'use strict';

    return function (num, length) {

        var parts = ('' + num).split('.');

        var decimal = parts[1] || '';
        var decimalLength = decimal.length;

        if (decimalLength > length) {
            decimal = decimal.substr(0, length);
        }
        else if (decimalLength < length) {
            decimal += new Array(length - decimalLength + 1).join('0');
        }

        return parts[0] + '.' + decimal;

    };

});