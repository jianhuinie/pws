/**
 * 过滤富文本的px，根据缩放比进行缩放
 */

define(function (require, exports) {
    'use strict';
    var $ = require('zepto');

    exports.init = function (strings) {
        if (!strings) {
            return;
        }
        var ratio = $('#viewport').attr('ratio');
        var deviceRatio = 1;
        if (ratio < 1) {
            deviceRatio = window.devicePixelRatio;
        }
        var reg = /(\-|\+)?\d+(\.\d+)?\px/g;
        var regD =  /(\-|\+)?\d+(\.\d+)?/g;
        var filterString;
        if (strings.indexOf('px') > -1) {
            filterString = strings.replace(reg, function () {
                    return arguments[0].match(regD)[0] * deviceRatio + 'px';
                });
            return filterString;
        }

        return strings;
    };
});