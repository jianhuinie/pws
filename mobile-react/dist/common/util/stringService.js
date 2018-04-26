define(function (require, exports) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });
    exports.default = {
        getCharacterLength: function getCharacterLength(str) {
            var lenth = str.length;
            var count = 0;
            for (var i = 0; i < lenth; i++) {
                if (/[^\x00-\xff]/.test(str[i])) {
                    count += 2;
                } else {
                    count++;
                }
            }
            return count;
        }
    };
});