define(function (require) {
    var _react = require('react');
    var _reactDom = require('react-dom');
    var _reactRouter = require('react-router');
    var _routes = require('./routes');
    (require('css-loader!./index.styl'))
    'use strict';
    var _react2 = _interopRequireDefault(_react);
    var _reactDom2 = _interopRequireDefault(_reactDom);
    var _routes2 = _interopRequireDefault(_routes);
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
    }
    _reactDom2.default.render(_react2.default.createElement(_reactRouter.Router, {
        history: _reactRouter.hashHistory,
        routes: _routes2.default
    }), document.getElementById('app'));
});