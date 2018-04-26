define(function (require, exports) {
    'use strict';
    var _react = require('react');
    var _reactRouter = require('react-router');
    var _routes = require('./share/routes');
    var _routes3 = require('./popular/routes');
    Object.defineProperty(exports, '__esModule', { value: true });
    var _react2 = _interopRequireDefault(_react);
    var _routes2 = _interopRequireDefault(_routes);
    var _routes4 = _interopRequireDefault(_routes3);
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
    var honorRank = function (_React$Component) {
        _inherits(honorRank, _React$Component);
        function honorRank() {
            _classCallCheck(this, honorRank);
            return _possibleConstructorReturn(this, (honorRank.__proto__ || Object.getPrototypeOf(honorRank)).apply(this, arguments));
        }
        _createClass(honorRank, [{
                key: 'render',
                value: function render() {
                    return _react2.default.createElement('div', { className: 'honorRank' }, this.props.children);
                }
            }]);
        return honorRank;
    }(_react2.default.Component);
    honorRank.propTypes = { children: _react2.default.PropTypes.element };
    honorRank.defaultProps = { children: '' };
    ;
    var routesPromise = function () {
        for (var _len = arguments.length, routes = Array(_len), _key = 0; _key < _len; _key++) {
            routes[_key] = arguments[_key];
        }
        return _react2.default.createElement(_reactRouter.Route, {
            key: 'honorRank',
            path: 'honorRank',
            component: honorRank
        }, routes, ';');
    }(_routes4.default, _routes2.default);
    exports.default = routesPromise;
});