define(function (require, exports) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });
    var HOUR_TIME = 60 * 60 * 1000;
    function getCookie(name) {
        var regex = new RegExp(name + '=([^;]+)(?:;|$)');
        var match = document.cookie.match(regex);
        return match ? decodeURIComponent(match[1]) : '';
    }
    function setCookie(name, value) {
        var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
        var expires = options.expires;
        if (!isNaN(expires)) {
            var hours = expires;
            expires = new Date();
            expires.setTime(expires.getTime() + hours * HOUR_TIME);
        }
        var path = options.path;
        if (path == null) {
            path = '/';
        }
        var domain = options.domain;
        document.cookie = [
            encodeURIComponent(name),
            '=',
            encodeURIComponent(value),
            expires ? ';expires=' + expires.toUTCString() : '',
            ';path=' + path,
            domain ? ';domain=' + domain : '',
            options.secure ? ';secure' : ''
        ].join('');
    }
    function remove(key, options) {
        if (key == null) {
            return;
        }
        options = options || {};
        options.expires = -1;
        setCookie(key, '', options);
    }
    exports.set = setCookie;
    exports.get = getCookie;
    exports.remove = remove;
    exports.default = {
        set: setCookie,
        get: getCookie,
        remove: remove
    };
});