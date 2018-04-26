define(function (require, exports) {
    'use strict';
    var _react = require('react');
    var _antd = require('antd');
    var _PageController2 = require('common/controller/PageController');
    var _ajaxConfig = require('common/ajaxConfig');
    var _ajaxService = require('common/util/ajaxService');
    (require('css-loader!./index.styl'))
    Object.defineProperty(exports, '__esModule', { value: true });
    var _react2 = _interopRequireDefault(_react);
    var _PageController3 = _interopRequireDefault(_PageController2);
    var _ajaxConfig2 = _interopRequireDefault(_ajaxConfig);
    var _ajaxService2 = _interopRequireDefault(_ajaxService);
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
    var logoutTimer = void 0;
    var TopBanner = function (_PageController) {
        _inherits(TopBanner, _PageController);
        function TopBanner(props) {
            _classCallCheck(this, TopBanner);
            var _this = _possibleConstructorReturn(this, (TopBanner.__proto__ || Object.getPrototypeOf(TopBanner)).call(this, props));
            _this.getUserInfo = function () {
                var self = _this;
                _ajaxService2.default.post(_ajaxConfig2.default.GET_USER_INFO).then(function (res) {
                    if (res && res.code === 200) {
                        self.setState({ profile: res.data.user });
                    }
                });
            };
            _this.showLogout = function (e) {
                e.stopPropagation();
                var self = _this;
                self.setState({ showLogoutPanel: !0 });
            };
            _this.hideLogout = function (e) {
                e.stopPropagation();
                var self = _this;
                logoutTimer = setTimeout(function () {
                    self.setState({ showLogoutPanel: !1 });
                }, 500);
            };
            _this.keepLogout = function (e) {
                e.stopPropagation();
                clearTimeout(logoutTimer);
            };
            _this.logout = function () {
                $('#logout-form').submit();
            };
            _this.state = {
                showLogoutPanel: !1,
                profile: {}
            };
            return _this;
        }
        _createClass(TopBanner, [
            {
                key: 'componentWillMount',
                value: function componentWillMount() {
                    var self = this;
                    self.getUserInfo();
                }
            },
            {
                key: 'render',
                value: function render() {
                    var self = this;
                    var profile = self.state.profile || {};
                    return _react2.default.createElement('div', { className: 'top-banner' }, _react2.default.createElement('div', { className: 'left' }, _react2.default.createElement('span', { className: 'icon-ic-logo' })), _react2.default.createElement('div', { className: 'right' }, _react2.default.createElement('div', { className: 'user-avator right-item' }, _react2.default.createElement('img', {
                        alt: '用户头像',
                        src: profile.avatarUrl
                    })), _react2.default.createElement('div', { className: 'user-name right-item' }, profile.nickName), _react2.default.createElement('div', { className: 'show-logout right-item' }, _react2.default.createElement(_antd.Icon, {
                        type: 'caret-down',
                        onMouseOver: self.showLogout,
                        onMouseOut: self.hideLogout
                    }), _react2.default.createElement('div', {
                        className: self.state.showLogoutPanel ? 'logout-panel' : 'logout-panel hide',
                        onMouseOver: self.keepLogout,
                        onMouseOut: self.hideLogout
                    }, _react2.default.createElement('div', { className: 'logout-triangle' }), _react2.default.createElement('div', {
                        className: 'logout-btn cursor',
                        onClick: self.logout
                    }, '退出')))), _react2.default.createElement('div', { className: 'clearfix' }), _react2.default.createElement('form', {
                        id: 'logout-form',
                        action: _ajaxConfig2.default.LOGOUT,
                        method: 'post'
                    }));
                }
            }
        ]);
        return TopBanner;
    }(_PageController3.default);
    ;
    exports.default = TopBanner;
});