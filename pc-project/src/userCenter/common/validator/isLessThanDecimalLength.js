/**
 * @file 判断小数点位数是否小于几位（是 < 不是 <=）
 * @author zhujialu
 */
define(function (require, exports, module) {

    'use strict';

    var decimalLength = require('cc/function/decimalLength');

    return function (value, length) {
        return decimalLength(value) < length;
    };

});