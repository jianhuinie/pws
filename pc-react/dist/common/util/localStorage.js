define(function (require, exports) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });
    exports.default = {
        storager: window.sessionStorage,
        get: function get(key, callback) {
            var result = void 0;
            if (this.storager[key]) {
                result = this.storager.getItem(key);
                if (result) {
                    result = JSON.parse(result);
                }
            }
            if (typeof callback === 'function') {
                callback(result);
            }
            return result;
        },
        set: function set(key, value, callback) {
            if (typeof value !== 'undefined') {
                value = JSON.stringify(value);
                this.storager.setItem(key, value);
            }
            if (typeof callback === 'function') {
                callback(value);
            }
        },
        remove: function remove(key, callback) {
            this.storager.removeItem(key);
            if (typeof callback === 'function') {
                callback();
            }
        },
        clear: function clear() {
            this.storager.clear();
        }
    };
});