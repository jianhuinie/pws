/**
 * @file 获取时间间隔
 * @author liucong
 */
define(function (require, exports) {

    'use strict';

    function fillZero(number) {

        if (number.toString().length === 1) {
            return '0' + number;
        }
        else {
            return number;
        }
    }

    /**
     * 利用时间间隔数字 获取时间间隔对象
     * @param  {Number} time 间隔 单位为秒
     * @return {Object}
     *         {String} days
     *         {String} hours
     *         {String} minutes
     *         {String} seconds
     */
    return function(time) {
        if (time < 1) {
            time = 0;
        }

        var days = parseInt(time / 86400, 10);
        var hours = parseInt((time - (days * 86400)) / 3600, 10);
        var minutes = parseInt((time - (days * 86400) - (hours * 3600)) / 60, 10);
        var seconds = parseInt((time - (days * 86400) - (hours * 3600) - (minutes * 60)), 10);

        return {
            days: days,
            hours: fillZero(hours),
            minutes: fillZero(minutes),
            seconds: fillZero(seconds)
        }

    }
});