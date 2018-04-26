define(function (require, exports) {
    'use strict';
    var _react = require('react');
    var _config = require('compile_spa/module/page/one2one/best/studentEnter/detail/config');
    var _index = require('compile_spa/module/page/one2one/best/components/AutoSearchSubject/index');
    var service = require('common/service');
    var uiNew = require('common/ui');
    var observer = require('common/mvc/observer');
    var app = require('common/app');
    var ImageCheckCodeDialog = require('common/ui/ImageCheckCodeDialog/ImageCheckCodeDialog');
    (require('css-loader!./index.styl'))
    Object.defineProperty(exports, '__esModule', { value: true });
    var _react2 = _interopRequireDefault(_react);
    var _config2 = _interopRequireDefault(_config);
    var _index2 = _interopRequireDefault(_index);
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
    var DemandForm = function (_React$Component) {
        _inherits(DemandForm, _React$Component);
        function DemandForm(props) {
            _classCallCheck(this, DemandForm);
            var _this = _possibleConstructorReturn(this, (DemandForm.__proto__ || Object.getPrototypeOf(DemandForm)).call(this, props));
            _this.state = {
                isRegister: 1,
                subjectId: null,
                subjectName: null,
                inputName: null,
                inputMobile: null,
                getCodeTitle: '',
                isGetCode: 0,
                isPost: 0
            };
            _this.checkMobile = _this.checkMobile.bind(_this);
            _this.choosedSubject = _this.choosedSubject.bind(_this);
            _this.getVerifyCode = _this.getVerifyCode.bind(_this);
            _this.postForm = _this.postForm.bind(_this);
            _this.nameChange = _this.nameChange.bind(_this);
            _this.mobileChange = _this.mobileChange.bind(_this);
            _this.getOrangeBorder = _this.getOrangeBorder.bind(_this);
            _this.removeOrangeBorder = _this.removeOrangeBorder.bind(_this);
            return _this;
        }
        _createClass(DemandForm, [
            {
                key: 'componentDidMount',
                value: function componentDidMount() {
                    this.initCustomInfo();
                }
            },
            {
                key: 'getOrangeBorder',
                value: function getOrangeBorder(e) {
                    $(e.target).removeClass('gray');
                    $(e.target).parent().removeClass('gray').addClass('orange');
                }
            },
            {
                key: 'getVerifyCode',
                value: function getVerifyCode(code) {
                    var self = this;
                    var verifyCodeWaiting = 60;
                    var params = {
                        mobile: $.trim(self.refs.myMobile.value),
                        type: 'signin'
                    };
                    if (code && typeof code === 'string') {
                        params.captcha = code;
                        params.captcha_name = 'signin';
                    }
                    var updateCountdown = function updateCountdown() {
                        self.setState({
                            isGetCode: 1,
                            getCodeTitle: verifyCodeWaiting + '秒后可重新发送'
                        });
                    };
                    var verifyCodeTimer = setInterval(function () {
                        verifyCodeWaiting--;
                        if (!verifyCodeWaiting) {
                            clearInterval(verifyCodeTimer);
                            self.setState({ isGetCode: 0 });
                        } else {
                            updateCountdown();
                        }
                    }, 1000);
                    updateCountdown();
                    service.post(_config2.default.PATHS.SENDSMS, params).then(function (res) {
                        if (+res.code === 0) {
                            console.log('ok!');
                        } else if (+res.code === 1000111 || +res.code === 110056) {
                            var imageCodeDialog = new ImageCheckCodeDialog({
                                title: '请输入图形验证码',
                                type: 'signin',
                                errorText: +res.code === '110056' ? '验证码错误\uFF0C请重新输入' : ''
                            });
                            observer.addListenerOnce(imageCodeDialog, 'success', function (resCode) {
                                imageCodeDialog.hide();
                                imageCodeDialog.destroy();
                                clearInterval(verifyCodeTimer);
                                self.setState({ isGetCode: 0 });
                                self.getVerifyCode(resCode);
                            });
                            observer.addListenerOnce(imageCodeDialog, 'cancel', function () {
                                imageCodeDialog.hide();
                                imageCodeDialog.destroy();
                                clearInterval(verifyCodeTimer);
                            });
                            imageCodeDialog.show();
                            clearInterval(verifyCodeTimer);
                            self.setState({ isGetCode: 0 });
                        }
                    });
                }
            },
            {
                key: 'removeOrangeBorder',
                value: function removeOrangeBorder(e) {
                    var domEle = $(e.target);
                    var val = $.trim(domEle.val());
                    if (!val) {
                        domEle.addClass('gray');
                        domEle.parent().addClass('gray');
                    }
                    domEle.parent().removeClass('orange');
                }
            },
            {
                key: 'postForm',
                value: function postForm() {
                    var self = this;
                    var name = $.trim(self.refs.myName.value);
                    var mobile = $.trim(self.refs.myMobile.value);
                    var smsCode = $.trim(self.refs.myCode.value);
                    var subjectId = self.state.subjectId;
                    var subjectName = self.state.subjectName;
                    if (!name) {
                        uiNew.remind('请输入姓名\uFF01');
                        return;
                    }
                    if (!subjectId) {
                        uiNew.remind('请输入科目\uFF01');
                        return;
                    }
                    if (!mobile) {
                        uiNew.remind('请输入手机号\uFF01');
                        return;
                    }
                    if (!self.state.isRegister && !smsCode) {
                        uiNew.remind('请输入短信验证码\uFF01');
                        return;
                    }
                    var params = {
                        name: name,
                        subject: subjectName,
                        mobile: mobile,
                        sms_code: smsCode || null
                    };
                    service.post(_config2.default.PATHS.SUBMIT, params).then(function (res) {
                        if (+res.code === 0) {
                            uiNew.remind('提交成功\uFF01').then(function () {
                                self.initCustomInfo();
                                if (params.sms_code) {
                                    if (app.isStudentApp()) {
                                        window.location.reload();
                                    } else {
                                        self.reloadInWX();
                                    }
                                }
                            });
                        }
                    });
                }
            },
            {
                key: 'reloadInWX',
                value: function reloadInWX() {
                    var str = location.href;
                    var arr = str.split('#');
                    arr[0] = arr[0].split('?')[0] + '?t=' + +new Date();
                    var newUrl = arr.join('#');
                    window.location.href = newUrl;
                }
            },
            {
                key: 'choosedSubject',
                value: function choosedSubject(item) {
                    var self = this;
                    self.setState({
                        subjectId: item.sub_id,
                        subjectName: item.title,
                        isPost: 1
                    });
                }
            },
            {
                key: 'checkMobile',
                value: function checkMobile(e) {
                    var self = this;
                    var val = $.trim(self.refs.myMobile.value);
                    self.removeOrangeBorder(e);
                    if (val && _config2.default.MOBILEREG.test(val)) {
                        var params = { mobile: val };
                        service.post(_config2.default.PATHS.CHECKMOBILE, params).then(function (res) {
                            if (+res.code === 0) {
                                var isRegister = res && res.data && res.data.exist;
                                self.setState({ isRegister: isRegister });
                            } else {
                                uiNew.remind(res.msg);
                            }
                        });
                    } else {
                        self.refs.myMobile.value = null;
                        self.setState({ isRegister: 1 });
                    }
                }
            },
            {
                key: 'initCustomInfo',
                value: function initCustomInfo() {
                    var self = this;
                    if (window.gsx_ready) {
                        window.gsx_ready(function (config) {
                            if (config && config.user) {
                                var user = config.user;
                                self.setState({
                                    inputMobile: user.mobile,
                                    inputName: user.name,
                                    subjectId: null,
                                    subjectName: null,
                                    isGetCode: 0,
                                    isPost: 0
                                });
                            } else {
                                self.clearCustomInfo();
                            }
                        });
                    } else {
                        self.clearCustomInfo();
                    }
                }
            },
            {
                key: 'clearCustomInfo',
                value: function clearCustomInfo() {
                    this.setState({
                        inputMobile: null,
                        inputName: null,
                        subjectId: null,
                        subjectName: null,
                        isGetCode: 0,
                        isPost: 0
                    });
                }
            },
            {
                key: 'nameChange',
                value: function nameChange(event) {
                    this.setState({ inputName: event.target.value });
                }
            },
            {
                key: 'mobileChange',
                value: function mobileChange(event) {
                    this.setState({ inputMobile: event.target.value });
                }
            },
            {
                key: 'render',
                value: function render() {
                    var self = this;
                    var inputName = self.state.inputName || '';
                    var inputMobile = self.state.inputMobile || '';
                    return _react2.default.createElement('div', {
                        id: 'form',
                        className: 'liudan-form'
                    }, _react2.default.createElement('div', { className: 'input-box' }, _react2.default.createElement('div', { className: 'input-border name-border gray' }, _react2.default.createElement('input', {
                        className: 'name gray',
                        value: inputName,
                        onChange: self.nameChange,
                        onFocus: self.getOrangeBorder,
                        onBlur: self.removeOrangeBorder,
                        type: 'text',
                        name: 'name',
                        required: 'required',
                        maxLength: '20',
                        placeholder: '您的姓名',
                        ref: 'myName'
                    })), _react2.default.createElement(_index2.default, {
                        callbackChoosed: self.choosedSubject,
                        isPost: self.state.isPost
                    })), _react2.default.createElement('div', { className: 'input-box input-border gray' }, _react2.default.createElement('input', {
                        className: 'number gray',
                        value: inputMobile,
                        onChange: self.mobileChange,
                        onFocus: self.getOrangeBorder,
                        type: 'number',
                        name: 'number',
                        required: 'required',
                        maxLength: '15',
                        placeholder: '您的手机号码\uFF0C方便顾问联系',
                        ref: 'myMobile',
                        onBlur: self.checkMobile
                    })), _react2.default.createElement('div', { className: self.state.isRegister ? 'input-box input-border gray hide' : 'input-box input-border gray' }, _react2.default.createElement('input', {
                        className: 'number gray',
                        type: 'number',
                        name: 'number',
                        required: 'required',
                        maxLength: '6',
                        placeholder: '输入短信验证码',
                        ref: 'myCode',
                        onFocus: self.getOrangeBorder,
                        onBlur: self.removeOrangeBorder
                    }), _react2.default.createElement('div', {
                        className: self.state.isGetCode ? 'get-code hide' : 'get-code',
                        onClick: self.getVerifyCode
                    }, '获取验证码'), _react2.default.createElement('div', { className: self.state.isGetCode ? 'get-code sending-code' : 'get-code sending-code hide' }, self.state.getCodeTitle)), _react2.default.createElement('div', {
                        className: 'submit center analysis-habo-log one-to-one-post',
                        onClick: self.postForm
                    }, '立即抢跑'));
                }
            }
        ]);
        return DemandForm;
    }(_react2.default.Component);
    ;
    exports.default = DemandForm;
});