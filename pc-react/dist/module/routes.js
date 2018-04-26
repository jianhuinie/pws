define(function (require, exports) {
    'use strict';
    var _react = require('react');
    var _reactRouter = require('react-router');
    var _routes = require('./demo/routes');
    var _index = require('./Course/index');
    var _index3 = require('./Classroom/index');
    var _index5 = require('./Income/index');
    var _index7 = require('./Order/index');
    var _index9 = require('./Purse/index');
    var _routes3 = require('./Single/routes');
    var _routes5 = require('./Series/routes');
    var _routes7 = require('./Video/routes');
    var _index11 = require('common/components/LeftSider/index');
    var _index13 = require('common/components/TopBanner/index');
    Object.defineProperty(exports, '__esModule', { value: true });
    var _react2 = _interopRequireDefault(_react);
    var _routes2 = _interopRequireDefault(_routes);
    var _index2 = _interopRequireDefault(_index);
    var _index4 = _interopRequireDefault(_index3);
    var _index6 = _interopRequireDefault(_index5);
    var _index8 = _interopRequireDefault(_index7);
    var _index10 = _interopRequireDefault(_index9);
    var _routes4 = _interopRequireDefault(_routes3);
    var _routes6 = _interopRequireDefault(_routes5);
    var _routes8 = _interopRequireDefault(_routes7);
    var _index12 = _interopRequireDefault(_index11);
    var _index14 = _interopRequireDefault(_index13);
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
    }
    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError('Cannot call a class as a function');
        }
    }
    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ('value' in descriptor)
                    descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }
        return function (Constructor, protoProps, staticProps) {
            if (protoProps)
                defineProperties(Constructor.prototype, protoProps);
            if (staticProps)
                defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();
    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');
        }
        return call && (typeof call === 'object' || typeof call === 'function') ? call : self;
    }
    function _inherits(subClass, superClass) {
        if (typeof superClass !== 'function' && superClass !== null) {
            throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
        }
        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass)
            Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }
    var App = function (_React$Component) {
        _inherits(App, _React$Component);
        function App() {
            _classCallCheck(this, App);
            return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).apply(this, arguments));
        }
        _createClass(App, [{
                key: 'render',
                value: function render() {
                    return _react2.default.createElement('div', { className: 'main' }, _react2.default.createElement(_index14.default, null), _react2.default.createElement(_index12.default, null), this.props.children);
                }
            }]);
        return App;
    }(_react2.default.Component);
    App.propTypes = { children: _react.PropTypes.node };
    App.defaultProps = { children: '' };
    var routesPromise = function () {
        for (var _len = arguments.length, routes = Array(_len), _key = 0; _key < _len; _key++) {
            routes[_key] = arguments[_key];
        }
        return _react2.default.createElement(_reactRouter.Route, {
            key: 'root',
            path: '/',
            component: App
        }, _react2.default.createElement(_reactRouter.IndexRedirect, { to: '/classroom' }), routes, _routes4.default, _routes6.default, _routes8.default, _react2.default.createElement(_reactRouter.Route, {
            key: 'income',
            path: 'income',
            component: _index6.default
        }), _react2.default.createElement(_reactRouter.Route, {
            key: 'order',
            path: 'order',
            component: _index8.default
        }), _react2.default.createElement(_reactRouter.Route, {
            key: 'purse',
            path: 'purse',
            component: _index10.default
        }), _react2.default.createElement(_reactRouter.Route, {
            key: 'course',
            path: 'course',
            component: _index2.default
        }), _react2.default.createElement(_reactRouter.Route, {
            key: 'classroom',
            path: 'classroom',
            component: _index4.default
        }));
    }(_routes2.default);
    exports.default = routesPromise;
});