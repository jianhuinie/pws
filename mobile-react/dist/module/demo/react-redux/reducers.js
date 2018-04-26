define(function (require, exports) {
    'use strict';
    var _redux = require('redux');
    var _reducer = require('./component/Counter/reducer');
    Object.defineProperty(exports, '__esModule', { value: true });
    var _reducer2 = _interopRequireDefault(_reducer);
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
    }
    var rootReducer = (0, _redux.combineReducers)({ count: _reducer2.default });
    exports.default = rootReducer;
});