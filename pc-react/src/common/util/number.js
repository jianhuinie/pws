/**
 * 数字操作.
 */

    const number = {};

    /**
     * 精确到小数点后若干位
     * @params {number} num 浮点数
     * @params {number} precision 精确到小数点后几位，例如 小数点后两位（0.12），就传2
     * */
    number.round = function (num, precision) {
        const factor = Math.pow(10, precision);
        return Math.round(num * factor) / factor;
    };

    /**
     * 忽略js浮点数运算带来的误差，判断两个数字是否相等
     * */
    number.equals = function (a, b) {
        return Math.abs(a - b) <= 1E-10;
    };

    number.format = function (num, length) {
        const o = (isNaN(num) ? 0 : num).toString();
        const n = length - o.length;
        return n > 0 ? [new Array(n + 1).join('0'), o].join('') : o;
    };

    export default number;