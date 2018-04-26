define(function (require, exports) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });
    var number = {};
    number.round = function (num, precision) {
        var factor = Math.pow(10, precision);
        return Math.round(num * factor) / factor;
    };
    number.equals = function (a, b) {
        return Math.abs(a - b) <= 1e-10;
    };
    number.format = function (num, length) {
        var o = (isNaN(num) ? 0 : num).toString();
        var n = length - o.length;
        return n > 0 ? [
            new Array(n + 1).join('0'),
            o
        ].join('') : o;
    };
    exports.default = number;
});