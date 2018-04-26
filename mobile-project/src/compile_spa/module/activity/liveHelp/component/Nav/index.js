define(function (require, exports) {
    'use strict';
    var _react = require('react');
    var $ = require('zepto');
    var fixTab = require('common/fixTab/fixTab');
    (require('css-loader!./index.styl'))
    Object.defineProperty(exports, '__esModule', { value: true });
    var _react2 = _interopRequireDefault(_react);
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
    var headerHeight = void 0;
    var NavContainer = function (_React$Component) {
        _inherits(NavContainer, _React$Component);
        function NavContainer(props) {
            _classCallCheck(this, NavContainer);
            var _this = _possibleConstructorReturn(this, (NavContainer.__proto__ || Object.getPrototypeOf(NavContainer)).call(this, props));
            _this.gotoRequest = _this.gotoRequest.bind(_this);
            _this.gotoProcess = _this.gotoProcess.bind(_this);
            _this.gotoRule = _this.gotoRule.bind(_this);
            return _this;
        }
        _createClass(NavContainer, [
            {
                key: 'componentDidMount',
                value: function componentDidMount() {
                    headerHeight = $('.livehelp-header-img').height();
                    fixTab($('.livehelp-nav')[0], false);
                }
            },
            {
                key: 'gotoRequest',
                value: function gotoRequest() {
                    var requestHeight = $('.livehelp-box-device-request').position().top;
                    $(window).scrollTop(requestHeight - headerHeight);
                }
            },
            {
                key: 'gotoProcess',
                value: function gotoProcess() {
                    var processHeight = $('.livehelp-box-main-process').position().top;
                    $(window).scrollTop(processHeight - headerHeight);
                }
            },
            {
                key: 'gotoRule',
                value: function gotoRule() {
                    $(window).scrollTop(headerHeight);
                }
            },
            {
                key: 'render',
                value: function render() {
                    return _react2.default.createElement('div', { className: 'livehelp-nav' }, _react2.default.createElement('div', {
                        className: 'item normal',
                        onClick: this.gotoRule
                    }, '直播须知'), _react2.default.createElement('div', {
                        className: 'item normal',
                        onClick: this.gotoProcess
                    }, '检测流程'), _react2.default.createElement('div', {
                        className: 'item',
                        onClick: this.gotoRequest
                    }, '硬件要求'));
                }
            }
        ]);
        return NavContainer;
    }(_react2.default.Component);
    ;
    exports.default = NavContainer;
});