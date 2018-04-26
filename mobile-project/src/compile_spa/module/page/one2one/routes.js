define(function (require, exports) {
    'use strict';
    var _react = require('react');
    var _reactRouter = require('react-router');
    var _routes = require('./best/routes');
    Object.defineProperty(exports, '__esModule', { value: true });
    var _react2 = _interopRequireDefault(_react);
    var _routes2 = _interopRequireDefault(_routes);
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
    var One2OneIndex = function (_React$Component) {
        _inherits(One2OneIndex, _React$Component);
        function One2OneIndex() {
            _classCallCheck(this, One2OneIndex);
            return _possibleConstructorReturn(this, (One2OneIndex.__proto__ || Object.getPrototypeOf(One2OneIndex)).apply(this, arguments));
        }
        _createClass(One2OneIndex, [{
                key: 'render',
                value: function render() {
                    return _react2.default.createElement('div', { className: 'one2one' }, this.props.children);
                }
            }]);
        return One2OneIndex;
    }(_react2.default.Component);
    One2OneIndex.propTypes = { children: _react2.default.PropTypes.element };
    One2OneIndex.defaultProps = { children: '' };
    ;
    var routesPromise = function () {
        for (var _len = arguments.length, routes = Array(_len), _key = 0; _key < _len; _key++) {
            routes[_key] = arguments[_key];
        }
        return _react2.default.createElement(_reactRouter.Route, {
            key: 'one2one',
            path: 'one2one',
            component: One2OneIndex
        }, routes, ';');
    }(_routes2.default);
    exports.default = routesPromise;
});