/**
 * @file 手机号显示为掩码格式，如 138****4321
 * @author zhujialu
 */
define(function (require, exports, module) {

    'use strict';

    var formatMask = require('./formatMask');

    return function (mobile) {
        if ($.type(mobile) !== 'string') {
            mobile = '' + mobile;
        }
        return mobile.length === 11
             ? formatMask(mobile, 3, 7)
             : '';
    };

});