/**
 * @file 本地存储（从 flash -> local storage -> cookie 三层兼容）
 * @author zhujialu
 */
define(function (require, exports) {

    'use strict';

    var support = require('./support');

    var SwfStore = require('SwfStore');
    var localStorage = require('cc/util/localStorage');
    var cookie = require('cc/util/cookie');

    var instance;

    exports.init = function (callback) {

        callback = callback || $.noop;

        if (support.flash) {

            instance = new SwfStore({
                onready: callback
            });

            window.swfStore = instance;

            return;
        }

        instance = support.localStorage
                 ? localStorage
                 : cookie;

        callback();

    };

    exports.set = function (key, value) {
        instance.set(key, value);
    };

    exports.get = function (key) {
        return instance.get(key);
    };

    exports.remove = function (key) {
        instance.remove(key);
    };

});