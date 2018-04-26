/**
 * @file 乘法
 * @author zhujialu
 */
define(function (require, exports, module) {

    'use strict';

    var multiply = require('cc/function/multiply');

    return function (num, factor) {
        return multiply(num, factor);
    };

});