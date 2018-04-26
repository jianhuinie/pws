/**
 * Created by gsx on 16/1/11.
 */
define(function (require, exports) {
    'use strict';

    var HOUR_TIME = 60 * 60 * 1000;

    function getCookie(name) {
        var regex = new RegExp(name + '=([^;]+)(?:;|$)');
        var match = document.cookie.match(regex);
        return match ? decodeURIComponent(match[1]) : '';
    }

    /**
     * 设置 cookie
     *
     * @inner
     * @param {string} name
     * @param {string} value
     * @param {Object=} options
     */
    function setCookie(name, value, options) {

        options = options || {};

        var expires = options.expires;
     
        if (!isNaN(expires)) {
            var hours = expires;
            expires = new Date();
            expires.setTime(expires.getTime() + hours * HOUR_TIME);
        }

        var path = options.path;
        if (path == null) {
            // 保证网站全局可用
            path = '/';
        }

        var domain = options.domain;
        //if (domain == null) {
            // 保证网站全局可用
            //var terms = location.hostname.split('.');
            //if (terms.length > 2) {
            //    terms.shift();
            //}
            //domain = terms.join('.');
        //}

        document.cookie = [
            encodeURIComponent(name), '=', encodeURIComponent(value),
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

        setCookie(
            key,
            '',
            options
        );
    }

    exports.set = setCookie;
    exports.get = getCookie;
    exports.remove = remove;
});