/**
 * @file 加法
 * @author zhujialu
 */
define(function (require, exports, module) {

    'use strict';

    var plus = require('cc/function/plus');

    return function (num, factor) {
        return plus(num, factor);
    };

});