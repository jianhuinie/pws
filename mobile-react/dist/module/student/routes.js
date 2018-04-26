define(function (require, exports) {
    'use strict';
    var _react = require('react');
    var _reactRouter = require('react-router');
    var _PageController2 = require('common/controller/PageController');
    var _index = require('./home/index');
    var _index3 = require('./follow/index');
    var _index5 = require('./purchase/index');
    var _index7 = require('./phone/index');
    var _index9 = require('./basicModify/index');
    var _routes = require('./course/routes');
    Object.defineProperty(exports, '__esModule', { value: true });
    var _react2 = _interopRequireDefault(_react);
    var _PageController3 = _interopRequireDefault(_PageController2);
    var _index2 = _interopRequireDefault(_index);
    var _index4 = _interopRequireDefault(_index3);
    var _index6 = _interopRequireDefault(_index5);
    var _index8 = _interopRequireDefault(_index7);
    var _index10 = _interopRequireDefault(_index9);
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
    var Student = function (_PageController) {
        _inherits(Student, _PageController);
        function Student() {
            _classCallCheck(this, Student);
            return _possibleConstructorReturn(this, (Student.__proto__ || Object.getPrototypeOf(Student)).apply(this, arguments));
        }
        _createClass(Student, [{
                key: 'render',
                value: function render() {
                    return _react2.default.createElement('div', { className: 'student' }, this.props.children);
                }
            }]);
        return Student;
    }(_PageController3.default);
    Student.propTypes = { children: _react.PropTypes.node };
    Student.defaultProps = { children: '' };
    var routesPromise = function () {
        for (var _len = arguments.length, routes = Array(_len), _key = 0; _key < _len; _key++) {
            routes[_key] = arguments[_key];
        }
        return _react2.default.createElement(_reactRouter.Route, {
            key: 'student',
            path: 'student',
            component: Student
        }, _react2.default.createElement(_reactRouter.Route, {
            key: 'home',
            path: 'home',
            component: _index2.default
        }), _react2.default.createElement(_reactRouter.Route, {
            key: 'follow',
            path: 'follow',
            component: _index4.default
        }), _react2.default.createElement(_reactRouter.Route, {
            key: 'purchase',
            path: 'purchase',
            component: _index6.default
        }), _react2.default.createElement(_reactRouter.Route, {
            key: 'modify',
            path: 'modify',
            component: _index10.default
        }), _react2.default.createElement(_reactRouter.Route, {
            key: 'phone',
            path: 'phone',
            component: _index8.default
        }), routes);
    }(_routes2.default);
    exports.default = routesPromise;
});