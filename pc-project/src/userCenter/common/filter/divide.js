/**
 * @file 除法
 * @author zhujialu
 */
define(function (require, exports, module) {

    'use strict';

    var divide = require('cc/function/divide');

    return function (num, factor) {
        return divide(num, factor);
    };

});