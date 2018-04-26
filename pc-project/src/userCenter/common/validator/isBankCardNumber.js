/**
 * @file 是否是银行卡号
 * @author zhujialu
 */
define(function () {

    'use strict';

    var LENGTH_MIN = 14;
    var LENGTH_MAX = 20;

    var LENGTH_VALIDATE = 8;

    return function (value) {

        value = ('' + value).replace(/\s/g, '');

        if (!/^\d+$/.test(value)) {
            return false;
        }

        var len = value.length;
        if (len < LENGTH_MIN || len > LENGTH_MAX) {
            return false;
        }

        // 不是简单连续数字，如 12345678 or 87654321
        // 不是重复数字，如 11111111

        for (var i = len - LENGTH_VALIDATE - 1; i >= 0; i--) {
            var numbers = value.substr(i, LENGTH_VALIDATE);
            var oldDifference = null;
            var newDifference = null;
            var isRepeat = true;
            for (var j = numbers.length - 1; j > 0; j--) {
                newDifference = numbers.charAt(j) - numbers.charAt(j - 1);
                if (oldDifference == null) {
                    oldDifference = newDifference;
                }
                else if (oldDifference !== newDifference) {
                    isRepeat = false;
                    break;
                }
            }
            if (isRepeat && Math.abs(oldDifference) <= 1) {
                return false;
            }
        }

        return true;

    };

});