/**
 * @file 字符串截断
 * @author zhujialu
 */
define(function (require, exports, module) {

    'use strict';

    var stringUtil = require('cc/util/string');

    return function (str, length) {
        return $.type(str) === 'string'
             ? stringUtil.cut(str, length)
             : '';
    };

});