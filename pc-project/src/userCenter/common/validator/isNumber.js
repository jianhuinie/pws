/**
 * @file 是否是数字
 * @author zhujialu
 */
define(function (require, exports, module) {

    'use strict';

    var toNumber = require('cc/function/toNumber');

    return function (value) {
        return toNumber(value, null) !== null;
    };

});