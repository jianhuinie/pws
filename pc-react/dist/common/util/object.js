define(function (require, exports) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });
    var object = {};
    object.isEmpty = function (obj) {
        if (obj) {
            var keys = Object.keys(obj);
            return keys.length === 0;
        }
        return false;
    };
    object.toParamUrl = function (data, noCache) {
        var arr = [];
        if (data) {
            for (var key in data) {
                if ('undefined' !== typeof data[key] && null != data[key]) {
                    arr.push(key + '=' + encodeURIComponent(data[key]));
                }
            }
        }
        if (noCache) {
            arr.push('_t=' + (+new Date()).toString(36));
        }
        return arr.join('&');
    };
    exports.default = object;
});