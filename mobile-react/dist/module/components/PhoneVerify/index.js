define(function (require, exports) {
    'use strict';
    var _react = require('react');
    var _ajaxService = require('common/util/ajaxService');
    var _ajaxConfig = require('common/ajaxConfig');
    var _CommonController2 = require('common/controller/CommonController');
    (require('css-loader!./index.styl'))
    Object.defineProperty(exports, '__esModule', { value: true });
    var _react2 = _interopRequireDefault(_react);
    var _ajaxService2 = _interopRequireDefault(_ajaxService);
    var _ajaxConfig2 = _interopRequireDefault(_ajaxConfig);
    var _CommonController3 = _interopRequireDefault(_CommonController2);
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
    var CODE_BTN_DEFAULT = '获取验证码';
    var PhoneVerify = function (_CommonController) {
        _inherits(PhoneVerify, _CommonController);
        function PhoneVerify(props) {
            _classCallCheck(this, PhoneVerify);
            var _this = _possibleConstructorReturn(this, (PhoneVerify.__proto__ || Object.getPrototypeOf(PhoneVerify)).call(this, props));
            _this.state = {
                mobile: '',
                code: '',
                tip: '',
                showTip: false,
                isError: false,
                codeBtnText: CODE_BTN_DEFAULT,
                submiting: false
            };
            _this.handleMobileChange = _this.handleMobileChange.bind(_this);
            _this.handleCodeChange = _this.handleCodeChange.bind(_this);
            _this.getCode = _this.getCode.bind(_this);
            _this.submit = _this.submit.bind(_this);
            return _this;
        }
        _createClass(PhoneVerify, [
            {
                key: 'getCode',
                value: function getCode() {
                    var _this2 = this;
                    var self = this;
                    if (this.state.codeBtnText !== CODE_BTN_DEFAULT) {
                        return;
                    }
                    var mobile = this.state.mobile;
                    if (this.validateMobile()) {
                        this.setState({ codeBtnText: '获取中' });
                        _ajaxService2.default.post(_ajaxConfig2.default.PHONE.GET_CODE, { mobile: mobile }).then(function () {
                            _this2.setBtnStatus();
                            _this2.setTip('验证码已发送\uFF0C请查看手机短信', false);
                        }, function () {
                            var codeBtnText = CODE_BTN_DEFAULT;
                            self.setState({ codeBtnText: codeBtnText });
                        });
                    }
                }
            },
            {
                key: 'setTip',
                value: function setTip(tip, isError) {
                    var _this3 = this;
                    this.setState({
                        showTip: true,
                        isError: isError,
                        tip: tip
                    });
                    setTimeout(function () {
                        _this3.setState({ showTip: false });
                    }, 2000);
                }
            },
            {
                key: 'setBtnStatus',
                value: function setBtnStatus() {
                    var _this4 = this;
                    var time = 60;
                    var codeBtnText = '';
                    this.timer = setInterval(function () {
                        time--;
                        if (time > 0) {
                            codeBtnText = time + 's';
                        } else {
                            clearInterval(_this4.timer);
                            codeBtnText = CODE_BTN_DEFAULT;
                        }
                        _this4.setState({ codeBtnText: codeBtnText });
                    }, 1000);
                }
            },
            {
                key: 'componentDidMount',
                value: function componentDidMount() {
                    var self = this;
                    _ajaxService2.default.get(_ajaxConfig2.default.USER.GET_USER, {}).then(function (res) {
                        if (res && res.code === 200 && res.data.user.mobile) {
                            var mobile = res.data.user.mobile;
                            self.setState({ mobile: mobile });
                        }
                    });
                }
            },
            {
                key: 'componentWillUnmount',
                value: function componentWillUnmount() {
                    if (this.timer) {
                        clearInterval(this.timer);
                    }
                }
            },
            {
                key: 'validateMobile',
                value: function validateMobile() {
                    var mobile = this.state.mobile;
                    if (mobile && mobile.length === 11) {
                        return true;
                    }
                    this.setTip('请填写正确的11位数字手机号码', true);
                    return false;
                }
            },
            {
                key: 'handleMobileChange',
                value: function handleMobileChange(e) {
                    var value = e.target.value;
                    if (/^\d*$/.test(value)) {
                        this.setState({ mobile: value });
                    }
                }
            },
            {
                key: 'handleCodeChange',
                value: function handleCodeChange(e) {
                    var value = e.target.value;
                    if (/^\d*$/.test(value)) {
                        this.setState({ code: value });
                    }
                }
            },
            {
                key: 'submit',
                value: function submit() {
                    var _this5 = this;
                    if (!this.validateMobile()) {
                        return;
                    }
                    this.setState({ submiting: true });
                    _ajaxService2.default.post(_ajaxConfig2.default.PHONE.VERIFY, {
                        mobile: this.state.mobile,
                        code: this.state.code
                    }).then(function (res) {
                        _this5.setState({ submiting: false });
                        if (res.data && res.data.isValid) {
                            _this5.props.onSubmitSuccess();
                        } else {
                            _this5.setTip('验证码不符', true);
                        }
                    });
                }
            },
            {
                key: 'render',
                value: function render() {
                    return _react2.default.createElement('div', { className: 'phone-vertify' }, _react2.default.createElement('div', { className: 'phone-vertify-tip ' + (this.state.isError ? 'error' : 'success') + '\n                        ' + (this.state.showTip ? 'tip-appear' : 'tip-hidden') }, this.state.tip), _react2.default.createElement('div', { className: 'phone-vertify-title' }, '手机短信认证'), _react2.default.createElement('div', { className: 'phone-vertify-number' }, _react2.default.createElement('label', {
                        className: 'label',
                        htmlFor: 'mobile'
                    }, '手机号码'), _react2.default.createElement('div', { className: 'content' }, _react2.default.createElement('input', {
                        value: this.state.mobile,
                        className: 'content',
                        name: 'mobile',
                        placeholder: '请输入手机号码',
                        onChange: this.handleMobileChange
                    })), _react2.default.createElement('button', {
                        className: 'get',
                        onClick: this.getCode
                    }, this.state.codeBtnText)), _react2.default.createElement('div', { className: 'phone-vertify-code' }, _react2.default.createElement('label', {
                        className: 'label',
                        htmlFor: 'code'
                    }, '验证码'), _react2.default.createElement('div', { className: 'content' }, _react2.default.createElement('input', {
                        className: 'content',
                        name: 'code',
                        placeholder: '请输入获取的验证码',
                        onChange: this.handleCodeChange
                    }))), _react2.default.createElement('button', {
                        onClick: this.submit,
                        disabled: !(this.state.mobile && this.state.code) || this.state.submiting,
                        className: 'ws-btn-red phone-vertify-next'
                    }, this.state.submiting ? '提交中' : this.props.submitLabel));
                }
            }
        ]);
        return PhoneVerify;
    }(_CommonController3.default);
    PhoneVerify.propTypes = {
        onSubmitSuccess: _react.PropTypes.func.isRequired,
        submitLabel: _react.PropTypes.string
    };
    PhoneVerify.defaultProps = { submitLabel: '提交' };
    exports.default = PhoneVerify;
    ;
});