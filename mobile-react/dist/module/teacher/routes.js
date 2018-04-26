define(function (require, exports) {
    'use strict';
    var _react = require('react');
    var _reactRouter = require('react-router');
    var _CommonController2 = require('common/controller/CommonController');
    var _routes = require('./initialization/routes');
    var _routes3 = require('./manager/routes');
    var _routes5 = require('./authentication/routes');
    Object.defineProperty(exports, '__esModule', { value: true });
    var _react2 = _interopRequireDefault(_react);
    var _CommonController3 = _interopRequireDefault(_CommonController2);
    var _routes2 = _interopRequireDefault(_routes);
    var _routes4 = _interopRequireDefault(_routes3);
    var _routes6 = _interopRequireDefault(_routes5);
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
    var Teacher = function (_CommonController) {
        _inherits(Teacher, _CommonController);
        function Teacher() {
            _classCallCheck(this, Teacher);
            return _possibleConstructorReturn(this, (Teacher.__proto__ || Object.getPrototypeOf(Teacher)).apply(this, arguments));
        }
        _createClass(Teacher, [{
                key: 'render',
                value: function render() {
                    return _react2.default.createElement('div', { className: 'teacher' }, this.props.children);
                }
            }]);
        return Teacher;
    }(_CommonController3.default);
    Teacher.propTypes = { children: _react.PropTypes.node };
    Teacher.defaultProps = { children: '' };
    var routesPromise = function () {
        for (var _len = arguments.length, routes = Array(_len), _key = 0; _key < _len; _key++) {
            routes[_key] = arguments[_key];
        }
        return _react2.default.createElement(_reactRouter.Route, {
            key: 'teacher',
            path: 'teacher',
            component: Teacher
        }, routes);
    }(_routes2.default, _routes4.default, _routes6.default);
    exports.default = routesPromise;
});