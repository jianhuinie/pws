define(function (require, exports) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });
    var string = {};
    string.initcap = function () {
        var cache = {};
        return function (str) {
            return cache[str] || (cache[str] = str.substr(0, 1).toUpperCase() + str.substr(1));
        };
    }();
    string.trim = function (str) {
        return str == null ? '' : String.prototype.trim.call(str);
    };
    string.encodeHTML = function () {
        var tempDom = document.createElement('div');
        return function (txt) {
            var t = document.createTextNode(txt);
            var res = tempDom.appendChild(t).parentNode.innerHTML;
            tempDom.innerHTML = '';
            return res;
        };
    }();
    string.decodeHTML = function (source) {
        var str = String(source).replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, '\'');
        return str.replace(/&#([\d]+);/g, function ($0, $1) {
            return String.fromCharCode(parseInt($1, 10));
        });
    };
    string.padStart = function (target, targetLength, padString) {
        target = target === undefined ? '' : target;
        padString = padString === undefined ? ' ' : padString;
        if (target.length >= targetLength) {
            return target;
        }
        var padLen = [];
        padLen.length = targetLength - target.length + 1;
        return padLen.join(padString) + target;
    };
    exports.default = string;
});