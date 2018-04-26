/**
 * @file 是否是整型
 * @author zhujialu
 */
define(function (require, exports, module) {

    'use strict';

    return function (value) {
        return /^\d+$/.test(value);
    };

});