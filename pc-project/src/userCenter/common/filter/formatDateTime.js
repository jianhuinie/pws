/**
 * @file 格式化日期时间，如 2015-12-12 12:00
 * @author zhujialu
 */
define(function (require, exports, module) {

    'use strict';

    var moment = require('moment');

    return function (date, format) {
        return moment(date).format(format || 'YYYY-MM-DD HH:mm');
    };

});