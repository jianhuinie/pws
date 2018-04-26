define(function (require, exports) {
    'use strict';
    var _react = require('react');
    var _reactRouter = require('react-router');
    var _PageController2 = require('common/controller/PageController');
    var _index = require('./StepOne/index');
    var _index3 = require('./StepTwo/index');
    var _index5 = require('./StepThree/index');
    (require('css-loader!./index.styl'))
    Object.defineProperty(exports, '__esModule', { value: true });
    var _react2 = _interopRequireDefault(_react);
    var _PageController3 = _interopRequireDefault(_PageController2);
    var _index2 = _interopRequireDefault(_index);
    var _index4 = _interopRequireDefault(_index3);
    var _index6 = _interopRequireDefault(_index5);
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
    var Initialization = function (_PageController) {
        _inherits(Initialization, _PageController);
        function Initialization() {
            _classCallCheck(this, Initialization);
            return _possibleConstructorReturn(this, (Initialization.__proto__ || Object.getPrototypeOf(Initialization)).apply(this, arguments));
        }
        _createClass(Initialization, [{
                key: 'render',
                value: function render() {
                    return _react2.default.createElement('div', { className: 'initialization' }, this.props.children);
                }
            }]);
        return Initialization;
    }(_PageController3.default);
    Initialization.propTypes = { children: _react.PropTypes.node };
    Initialization.defaultProps = { children: '' };
    var routes = _react2.default.createElement(_reactRouter.Route, {
        key: 'init',
        path: '/',
        component: Initialization
    }, _react2.default.createElement(_reactRouter.Route, {
        key: 'step-one',
        path: 'step-one',
        component: _index2.default
    }), _react2.default.createElement(_reactRouter.Route, {
        key: 'step-two',
        path: 'step-two',
        component: _index4.default
    }), _react2.default.createElement(_reactRouter.Route, {
        key: 'step-three',
        path: 'step-three',
        component: _index6.default
    }));
    exports.default = routes;
});