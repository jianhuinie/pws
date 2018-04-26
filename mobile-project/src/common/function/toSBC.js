/**
 * author: huangshiming
 * 实现全角至半角转换，输入一个字符串为全角字符串将其装换为半角字符串
 * date: 2017-5-18
 */
define(function (require) {
    'use strict';
    return function (str) {
        var result = '';
        var len = str.length;
        for(var i = 0; i < len; i++)
        {
            var cCode = str.charCodeAt(i);
            //全角与半角相差（除空格外）：65248（十进制）
            cCode = (cCode >= 0xFF01 && cCode <= 0xFF5E) ? (cCode - 65248) : cCode;
            //处理空格
            cCode = (cCode === 0x03000) ? 0x0020 : cCode;
            result += String.fromCharCode(cCode);
        }
        return result;
    };
});