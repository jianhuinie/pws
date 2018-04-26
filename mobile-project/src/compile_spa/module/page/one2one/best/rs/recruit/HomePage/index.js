define(function (require, exports) {
    'use strict';
    var _react = require('react');
    var _reactRouter = require('react-router');
    var _index = require('./components/Header/index');
    var _index3 = require('./components/Rights/index');
    var _index5 = require('./components/Advantage/index');
    var _index7 = require('./components/Flow/index');
    var _index9 = require('./components/Dialog/index');
    var _index11 = require('../../../components/Button/index');
    var _PageController2 = require('compile_spa/common/controller/PageController');
    var $ = require('zepto');
    var ui = require('common/ui');
    var app = require('common/app');
    (require('css-loader!./index.styl'))
    Object.defineProperty(exports, '__esModule', { value: true });
    var _react2 = _interopRequireDefault(_react);
    var _index2 = _interopRequireDefault(_index);
    var _index4 = _interopRequireDefault(_index3);
    var _index6 = _interopRequireDefault(_index5);
    var _index8 = _interopRequireDefault(_index7);
    var _index10 = _interopRequireDefault(_index9);
    var _index12 = _interopRequireDefault(_index11);
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
    var HomePage = function (_PageController) {
        _inherits(HomePage, _PageController);
        function HomePage(props) {
            _classCallCheck(this, HomePage);
            var _this = _possibleConstructorReturn(this, (HomePage.__proto__ || Object.getPrototypeOf(HomePage)).call(this, props));
            _this.signHandler = _this.signHandler.bind(_this);
            _this.onDialogCloseHandler = _this.onDialogCloseHandler.bind(_this);
            _this.state = {
                bottomBtnClassName: 'sign-bottom-btn-hidden',
                isShowDialog: false
            };
            return _this;
        }
        _createClass(HomePage, [
            {
                key: 'componentDidMount',
                value: function componentDidMount() {
                    var me = this;
                    $(window).scroll(function () {
                        var topBtnOffset = $('.sign-top-btn').offset();
                        var scrollTop = $(window).scrollTop();
                        if (scrollTop > topBtnOffset.top + 48) {
                            me.setState({ bottomBtnClassName: 'sign-bottom-btn' });
                        } else {
                            me.setState({ bottomBtnClassName: 'sign-bottom-btn-hidden' });
                        }
                    });
                }
            },
            {
                key: 'onDialogCloseHandler',
                value: function onDialogCloseHandler(type) {
                    if (type === 'ok') {
                        _reactRouter.hashHistory.push('one2one/best/rs/recruit/success');
                    }
                    this.setState({ isShowDialog: false });
                }
            },
            {
                key: 'signHandler',
                value: function signHandler() {
                    var isNoValid = this.props.params.isNoValid;
                    if (isNoValid === '1') {
                        ui.confirm({
                            content: '仅通过跟谁学认证的老师才能报名\uFF0C快去老师端APP认证吧',
                            button_ok: '去认证',
                            button_cancel: '我知道了'
                        }).done(function () {
                            app.wakeUpApp('', 't');
                        });
                        return;
                    }
                    var state = this.state;
                    state.isShowDialog = true;
                    this.setState(state);
                }
            },
            {
                key: 'render',
                value: function render() {
                    return _react2.default.createElement('div', { className: 'recruit-home-page' }, _react2.default.createElement(_index2.default, null), _react2.default.createElement('div', { className: 'body' }, _react2.default.createElement('div', null, _react2.default.createElement('div', { className: 'desc' }, _react2.default.createElement('span', { className: 'key' }, '优选1对1'), '专注于为学生提供优质1对1教学服务\uFF0C 专属助教为您连接学生\uFF0C并提供上课过程中的辅助服务\uFF0C让您摆脱招生束缚\uFF0C专注于教学\u3002'), _react2.default.createElement('div', { className: 'total-title' }, '首批招募仅', _react2.default.createElement('span', { className: 'num' }, '1000'), '个名额\uFF0C招满为止'), _react2.default.createElement(_index12.default, {
                        title: '立即报名',
                        callback: this.signHandler,
                        containerClass: 'sign-top-btn'
                    }), _react2.default.createElement('div', null, _react2.default.createElement('i', { className: 'icon-down-o icon-angle-down' }))), _react2.default.createElement(_index4.default, null), _react2.default.createElement(_index6.default, null), _react2.default.createElement(_index8.default, null), _react2.default.createElement(_index12.default, {
                        title: '立即报名',
                        callback: this.signHandler,
                        containerClass: this.state.bottomBtnClassName
                    })), _react2.default.createElement(_index10.default, {
                        isShowDialog: this.state.isShowDialog,
                        onCloseHandler: this.onDialogCloseHandler
                    }));
                }
            }
        ]);
        return HomePage;
    }(_PageController3.default);
    exports.default = HomePage;
    ;
});