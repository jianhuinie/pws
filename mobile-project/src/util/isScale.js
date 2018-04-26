/**
 * 判断页面是否被缩放，用于js中
 * huangshiming
 */

define(function (require, exports) {
    'use strict';
    var $ = require('zepto');
    
    exports.init = function () {
        var viewPort = $('#viewport');
        var ratio = +viewPort.attr('ratio');
        var isScale;
        isScale = (ratio && ratio < 1) ? 1 : 0;
        return isScale;
    };
});