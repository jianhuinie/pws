/**
 * @file 减法
 * @author zhujialu
 */
define(function (require, exports, module) {

    'use strict';

    var minus = require('cc/function/minus');

    return function (num, factor) {
        return minus(num, factor);
    };

});