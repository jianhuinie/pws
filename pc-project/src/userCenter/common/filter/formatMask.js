/**
 * @file 把指定位置的字符改为星号
 * @author zhujialu
 */
define(function (require, exports, module) {

    'use strict';

    return function (str, start, end, replacement) {
        if ($.type(str) !== 'string') {
            str = '' + str;
        }
        if (start == null) {
            start = 0;
        }
        if (end == null) {
            end = str.length - 1;
        }

        var result = '';
        if (start > 0) {
            result += str.substr(0, start);
        }
        if (end - start > 0) {
            result += (new Array(end - start + 1)).join(replacement || '*');
        }
        if (end > 0) {
            result += str.substr(end);
        }
        return result;
    };

});