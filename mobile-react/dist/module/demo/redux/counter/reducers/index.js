define(function (require, exports) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });
    exports.default = function () {
        var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        var action = arguments[1];
        switch (action.type) {
        case 'INCREMENT':
            return state + 1;
        case 'DECREMENT':
            return state - 1;
        default:
            return state;
        }
    };
});