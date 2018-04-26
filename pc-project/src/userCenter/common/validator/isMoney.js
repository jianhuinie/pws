/**
 * @file 是否是钱
 * @author zhujialu
 */
define(function (require, exports, module) {

    'use strict';

    var isNumber = require('./isNumber');
    var isLessThanDecimalLength = require('./isLessThanDecimalLength');

    return function (value) {
        return isNumber(value) && isLessThanDecimalLength(value, 3);
    };

});