define(function (require, exports) {
    'use strict';
    var _react = require('react');
    var _reactRouter = require('react-router');
    var _index = require('./index');
    var _index3 = require('./alert/index');
    var _index5 = require('./toast/index');
    var _index7 = require('./confirm/index');
    var _index9 = require('./Loading/index');
    var _index11 = require('./ImagePlayer/index');
    var _index13 = require('./SlideInDialog/index');
    Object.defineProperty(exports, '__esModule', { value: true });
    var _react2 = _interopRequireDefault(_react);
    var _index2 = _interopRequireDefault(_index);
    var _index4 = _interopRequireDefault(_index3);
    var _index6 = _interopRequireDefault(_index5);
    var _index8 = _interopRequireDefault(_index7);
    var _index10 = _interopRequireDefault(_index9);
    var _index12 = _interopRequireDefault(_index11);
    var _index14 = _interopRequireDefault(_index13);
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
    }
    var routes = _react2.default.createElement(_reactRouter.Route, {
        key: 'demo-gsx-design',
        path: 'gsx-design',
        component: _index2.default
    }, _react2.default.createElement(_reactRouter.Route, {
        key: 'demo-gsx-design-alert',
        path: 'alert',
        component: _index4.default
    }), _react2.default.createElement(_reactRouter.Route, {
        key: 'demo-gsx-design-toast',
        path: 'toast',
        component: _index6.default
    }), _react2.default.createElement(_reactRouter.Route, {
        key: 'demo-gsx-design-confirm',
        path: 'confirm',
        component: _index8.default
    }), _react2.default.createElement(_reactRouter.Route, {
        key: 'demo-gsx-design-loading',
        path: 'Loading',
        component: _index10.default
    }), _react2.default.createElement(_reactRouter.Route, {
        key: 'demo-gsx-design-imageplayer',
        path: 'ImagePlayer',
        component: _index12.default
    }), _react2.default.createElement(_reactRouter.Route, {
        key: 'demo-gsx-design-slideindialog',
        path: 'SlideInDialog',
        component: _index14.default
    }));
    exports.default = routes;
});