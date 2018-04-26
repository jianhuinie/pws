define(function (require, exports) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });
    exports.default = function () {
        var viewPort = document.getElementById('viewport');
        var ratio = +viewPort.attributes.ratio.nodeValue;
        return ratio && ratio < 1 ? 1 : 0;
    };
    ;
});