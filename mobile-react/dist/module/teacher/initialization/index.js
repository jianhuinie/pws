define(function (require, exports) {
    'use strict';
    var _react = require('react');
    var _reactRouter = require('react-router');
    var _routes = require('./routes');
    var _util = require('common/util/util');
    Object.defineProperty(exports, '__esModule', { value: true });
    var _react2 = _interopRequireDefault(_react);
    var _routes2 = _interopRequireDefault(_routes);
    var _util2 = _interopRequireDefault(_util);
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
    }
    function RouterIndex() {
        return _react2.default.createElement(_reactRouter.Router, {
            history: _reactRouter.hashHistory,
            routes: _routes2.default
        });
    }
    exports.default = RouterIndex;
});