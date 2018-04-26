define(function (require, exports) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });
    exports.default = function () {
        var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { count: 0 };
        var action = arguments[1];
        var count = state.count;
        switch (action.type) {
        case 'increase':
            return { count: count + 1 };
        default:
            return state;
        }
    };
    ;
});