/**
 * @file 是否是手机号
 * @author zhujialu
 */
define(function (require, exports, module) {

    'use strict';

    return function (value) {
        return /^1\d{10}$/.test(value);
    };

});