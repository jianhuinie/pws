define(function (require, exports) {
    'use strict';
    var _react = require('react');
    var _reactRouter = require('react-router');
    var _PageController2 = require('common/controller/PageController');
    var _index = require('./wallet/index');
    var _index3 = require('./details/index');
    var _index5 = require('./withdraw/index');
    var _index7 = require('./records/index');
    Object.defineProperty(exports, '__esModule', { value: true });
    var _react2 = _interopRequireDefault(_react);
    var _PageController3 = _interopRequireDefault(_PageController2);
    var _index2 = _interopRequireDefault(_index);
    var _index4 = _interopRequireDefault(_index3);
    var _index6 = _interopRequireDefault(_index5);
    var _index8 = _interopRequireDefault(_index7);
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
    var Fund = function (_PageController) {
        _inherits(Fund, _PageController);
        function Fund() {
            _classCallCheck(this, Fund);
            return _possibleConstructorReturn(this, (Fund.__proto__ || Object.getPrototypeOf(Fund)).apply(this, arguments));
        }
        _createClass(Fund, [{
                key: 'render',
                value: function render() {
                    return _react2.default.createElement('div', { className: 'fund' }, this.props.children);
                }
            }]);
        return Fund;
    }(_PageController3.default);
    Fund.propTypes = { children: _react.PropTypes.node };
    Fund.defaultProps = { children: '' };
    var routesPromise = function () {
        for (var _len = arguments.length, routes = Array(_len), _key = 0; _key < _len; _key++) {
            routes[_key] = arguments[_key];
        }
        return _react2.default.createElement(_reactRouter.Route, {
            key: 'fund',
            path: 'fund',
            component: Fund
        }, _react2.default.createElement(_reactRouter.Route, {
            key: 'wallet',
            path: 'wallet',
            component: _index2.default
        }), _react2.default.createElement(_reactRouter.Route, {
            key: 'details',
            path: 'details',
            component: _index4.default
        }), _react2.default.createElement(_reactRouter.Route, {
            key: 'withdraw',
            path: 'withdraw',
            component: _index6.default
        }), _react2.default.createElement(_reactRouter.Route, {
            key: 'records',
            path: 'records',
            component: _index8.default
        }), routes);
    }();
    exports.default = routesPromise;
});