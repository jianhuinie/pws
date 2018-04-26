define(function (require, exports) {
    'use strict';
    var _react = require('react');
    var _reactRouter = require('react-router');
    var _index = require('./index');
    var _index3 = require('./react/index');
    var _index5 = require('./styl/index');
    var _index7 = require('./ajax/index');
    var _index9 = require('./async/index');
    var _routes = require('./redux/routes');
    var _index11 = require('./react-redux/index');
    Object.defineProperty(exports, '__esModule', { value: true });
    var _react2 = _interopRequireDefault(_react);
    var _index2 = _interopRequireDefault(_index);
    var _index4 = _interopRequireDefault(_index3);
    var _index6 = _interopRequireDefault(_index5);
    var _index8 = _interopRequireDefault(_index7);
    var _index10 = _interopRequireDefault(_index9);
    var _routes2 = _interopRequireDefault(_routes);
    var _index12 = _interopRequireDefault(_index11);
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
    }
    var routes = _react2.default.createElement(_reactRouter.Route, {
        key: 'demo',
        path: 'demo',
        component: _index2.default
    }, _react2.default.createElement(_reactRouter.Route, {
        key: 'demo-react',
        path: 'react',
        component: _index4.default
    }), _react2.default.createElement(_reactRouter.Route, {
        key: 'demo-styl',
        path: 'styl',
        component: _index6.default
    }), _react2.default.createElement(_reactRouter.Route, {
        key: 'demo-ajax',
        path: 'ajax',
        component: _index8.default
    }), _react2.default.createElement(_reactRouter.Route, {
        key: 'demo-async',
        path: 'async',
        component: _index10.default
    }), _react2.default.createElement(_reactRouter.Route, {
        key: 'demo-react-redux',
        path: 'react-redux',
        component: _index12.default
    }), _routes2.default);
    exports.default = routes;
});