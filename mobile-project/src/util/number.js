/**
 * Created by xuzheng on 15/12/25.
 */
define(function (require) {
    'use strict';

    var number = {};

    /**
     * 精确到小数点后若干位
     * @params {number} number 浮点数
     * @params {number} precision 精确到小数点后几位，例如 小数点后两位（0.12），就传2
     * */
    number.round = function (number, precision) {

        var factor = Math.pow(10, precision);
        return Math.round(number * factor) / factor;
    };

    /**
     * 忽略js浮点数运算带来的误差，判断两个数字是否相等
     * */
    number.equals = function (a, b) {
        return Math.abs(a - b) <= 1E-10
    };

    number.format = function (number, length) {
        var o = (isNaN(number) ? 0 : number).toString();
        var n = length - o.length;
        return n > 0 ? [new Array(n + 1).join("0"), o].join("") : o;
    };

    return number;
});