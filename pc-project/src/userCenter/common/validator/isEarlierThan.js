/**
 * @file 是否比某个日期早
 * @author zhujialu
 */
define(function (require, exports, module) {

    'use strict';

    return function (date, comparedDate) {

        if ($.type(date) === 'number') {
            date = new Date(date);
        }

        if ($.type(comparedDate) === 'number') {
            comparedDate = new Date(comparedDate);
        }

        date.setHours(0, 0, 0, 0);
        comparedDate.setHours(0, 0, 0, 0);

        return date.getTime() < comparedDate.getTime();

    };

});