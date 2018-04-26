/**
 * @file 是否是正数
 * @author zhujialu
 */
define(function (require, exports, module) {

    'use strict';

    var isNumber = require('./isNumber');

    return function (value) {
        return isNumber(value) && value > 0;
    };

});