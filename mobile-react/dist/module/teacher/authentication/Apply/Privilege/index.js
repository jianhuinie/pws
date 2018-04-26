define(function (require, exports) {
    'use strict';
    var _react = require('react');
    var _PageController2 = require('common/controller/PageController');
    (require('css-loader!./index.styl'))
    Object.defineProperty(exports, '__esModule', { value: true });
    var _react2 = _interopRequireDefault(_react);
    var _PageController3 = _interopRequireDefault(_PageController2);
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
    var Privilege = function (_PageController) {
        _inherits(Privilege, _PageController);
        function Privilege() {
            _classCallCheck(this, Privilege);
            return _possibleConstructorReturn(this, (Privilege.__proto__ || Object.getPrototypeOf(Privilege)).apply(this, arguments));
        }
        _createClass(Privilege, [{
                key: 'render',
                value: function render() {
                    var props = this.props;
                    return _react2.default.createElement('div', { className: 'privilege-view' }, _react2.default.createElement('div', { className: 'desc-title' }, '认证后的课堂会有以下特权'), _react2.default.createElement('div', null, _react2.default.createElement('span', null, '1'), '.\xA0\xA0独有官方认证标识'), _react2.default.createElement('div', null, _react2.default.createElement('span', null, '2'), '.\xA0\xA0有机会优先获取官方推广资源'), _react2.default.createElement('div', { className: 'desc-title' }, '申请须知'), _react2.default.createElement('div', null, _react2.default.createElement('span', null, '1'), '.\xA0\xA0你已阅读', _react2.default.createElement('a', {
                        className: 'protocol',
                        href: '/mweb/student/protocol'
                    }, '\u300A微师平台用户协议\u300B')), _react2.default.createElement('div', null, _react2.default.createElement('span', null, '2'), '.\xA0\xA0微师会对你的个人信息进行保密'), _react2.default.createElement('div', null, _react2.default.createElement('span', null, '3'), '.\xA0\xA0如需帮助或加急审核\uFF0C请点击添加你的', _react2.default.createElement('a', {
                        className: 'protocol',
                        href: '/mweb/student/custom'
                    }, '客服')));
                }
            }]);
        return Privilege;
    }(_PageController3.default);
    exports.default = Privilege;
});