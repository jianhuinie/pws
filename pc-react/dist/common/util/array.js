define(function (require, exports) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });
    var array = {};
    array.argsToArray = function (likeArr, start, end) {
        if (likeArr.length === undefined) {
            return;
        }
        return [].slice.call(likeArr, start || 0, end || likeArr.length);
    };
    exports.default = array;
});