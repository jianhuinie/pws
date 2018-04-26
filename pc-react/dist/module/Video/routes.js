define(function (require, exports) {
    'use strict';
    var _react = require('react');
    var _reactRouter = require('react-router');
    var _index = require('./index');
    var _index3 = require('./VideoList/index');
    Object.defineProperty(exports, '__esModule', { value: true });
    var _react2 = _interopRequireDefault(_react);
    var _index2 = _interopRequireDefault(_index);
    var _index4 = _interopRequireDefault(_index3);
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
    }
    var routes = _react2.default.createElement(_reactRouter.Route, {
        key: 'video',
        path: 'video',
        component: _index2.default
    }, _react2.default.createElement(_reactRouter.IndexRoute, { component: _index4.default }));
    exports.default = routes;
});