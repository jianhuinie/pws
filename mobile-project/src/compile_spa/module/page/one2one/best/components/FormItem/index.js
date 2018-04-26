define(function (require, exports) {
    'use strict';
    var _react = require('react');
    var SERVICE = require('common/service');
    var UI = require('common/ui');
    var UTIL = require('common/util');
    var SlideSelect = require('common/ui/SlideSelect/index');
    var observer = require('common/mvc/observer');
    var ImageCheckCodeDialog = require('common/ui/ImageCheckCodeDialog/ImageCheckCodeDialog');
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
    var VideoItem = function (_React$Component) {
        _inherits(VideoItem, _React$Component);
        function VideoItem(props) {
            _classCallCheck(this, VideoItem);
            var _this = _possibleConstructorReturn(this, (VideoItem.__proto__ || Object.getPrototypeOf(VideoItem)).call(this, props));
            var urlParamsObj = UTIL.getHashParams();
            _this.state = props.item;
            _this.state.firstSubjects = [].concat(_this.state.subjects);
            _this.state.isRegister = 1;
            _this.state.isGetCode = 0;
            _this.state.scdSubjects = [];
            _this.state.inputName = null;
            _this.state.inputMobile = null;
            _this.state.inputCode = null;
            _this.state.type = urlParamsObj.type || 'k12';
            _this.state.from = urlParamsObj.from || null;
            _this.state.selectedGradeId = null;
            _this.state.selectedGradeName = null;
            _this.state.selectedSubjectId = null;
            _this.state.selectedSubjectName = null;
            _this.state.showImg = 0;
            _this.state.imgUrl = null;
            _this.nameChange = _this.nameChange.bind(_this);
            _this.mobileChange = _this.mobileChange.bind(_this);
            _this.codeChange = _this.codeChange.bind(_this);
            _this.postDemand = _this.postDemand.bind(_this);
            _this.hideImg = _this.hideImg.bind(_this);
            _this.getVerifyCode = _this.getVerifyCode.bind(_this);
            return _this;
        }
        _createClass(VideoItem, [
            {
                key: 'componentDidMount',
                value: function componentDidMount() {
                    var self = this;
                    SlideSelect.init({
                        content: self.state.firstSubjects,
                        title: '年级',
                        name: 'tpl-grade',
                        containerName: 'abroad-form',
                        callback: self.selectGrade.bind(self),
                        iconName: 'icon-show-grade'
                    });
                }
            },
            {
                key: 'getScdSubjects',
                value: function getScdSubjects(obj) {
                    var self = this;
                    var url = '/cms-liudan/get-subject-list';
                    var params = { subject_id: obj.id };
                    SERVICE.post(url, params).then(function (res) {
                        if (+res.code === 0) {
                            self.setState({ scdSubjects: res.data.subject_list });
                            SlideSelect.init({
                                content: self.state.scdSubjects,
                                title: '科目',
                                name: 'tpl-subject',
                                containerName: 'abroad-form',
                                callback: self.selectSubject.bind(self),
                                iconName: 'icon-show-subject'
                            });
                        }
                    });
                }
            },
            {
                key: 'getVerifyCode',
                value: function getVerifyCode(code) {
                    var self = this;
                    var verifyCodeWaiting = 60;
                    var params = {
                        mobile: self.state.inputMobile,
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
                    SERVICE.post('/sms/send', params).then(function (res) {
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
                key: 'selectGrade',
                value: function selectGrade(obj) {
                    var self = this;
                    self.setState({
                        selectedGradeId: obj.id,
                        selectedGradeName: obj.name,
                        selectedSubjectId: null,
                        selectedSubjectName: null
                    });
                    $('.tpl-subject').unbind();
                    self.getScdSubjects(obj);
                }
            },
            {
                key: 'selectSubject',
                value: function selectSubject(obj) {
                    var self = this;
                    self.setState({
                        selectedSubjectId: obj.id,
                        selectedSubjectName: obj.name
                    });
                }
            },
            {
                key: 'clearSubject',
                value: function clearSubject() {
                    var self = this;
                    self.setState({
                        selectedGradeId: null,
                        selectedGradeName: null,
                        selectedSubjectId: null,
                        selectedSubjectName: null
                    });
                }
            },
            {
                key: 'initCustomInfo',
                value: function initCustomInfo() {
                    var self = this;
                    self.setState({
                        inputName: null,
                        inputMobile: null,
                        inputCode: null,
                        isRegister: 1
                    });
                    self.clearSubject();
                }
            },
            {
                key: 'nameChange',
                value: function nameChange(event) {
                    var self = this;
                    self.setState({ inputName: event.target.value });
                }
            },
            {
                key: 'checkMobileExist',
                value: function checkMobileExist(mobile) {
                    var self = this;
                    var reg = /^1\d{10}$/;
                    if (mobile && reg.test(mobile)) {
                        var params = { mobile: mobile };
                        SERVICE.post('/auth/check_mobile_ajax', params).then(function (res) {
                            if (+res.code === 0) {
                                var isRegister = res && res.data && res.data.exist;
                                self.setState({ isRegister: isRegister });
                            }
                        });
                    } else {
                        self.setState({ isRegister: 1 });
                    }
                }
            },
            {
                key: 'mobileChange',
                value: function mobileChange(event) {
                    var self = this;
                    var val = event.target.value;
                    if (!+val) {
                        val = null;
                    } else if (val.length === 11) {
                        self.checkMobileExist(val);
                    } else if (val.length > 11) {
                        val = val.substr(0, 11);
                    }
                    self.setState({
                        inputMobile: val,
                        isRegister: 1
                    });
                }
            },
            {
                key: 'codeChange',
                value: function codeChange(event) {
                    var self = this;
                    self.setState({ inputCode: event.target.value });
                }
            },
            {
                key: 'postDemand',
                value: function postDemand() {
                    var self = this;
                    var name = $.trim(self.state.inputName);
                    var mobile = $.trim(self.state.inputMobile);
                    var gradeId = self.state.selectedGradeId;
                    var subjectName = self.state.selectedSubjectName;
                    if (!name) {
                        UI.remind('请输入姓名\uFF01');
                        return;
                    }
                    if (!gradeId) {
                        UI.remind('请选择年级\uFF01');
                        return;
                    }
                    if (!subjectName) {
                        UI.remind('请选择科目\uFF01');
                        return;
                    }
                    if (!mobile) {
                        UI.remind('请输入手机号\uFF01');
                        return;
                    }
                    var url = '/cms-liudan/submit';
                    var params = {
                        user_name: name,
                        course_name: subjectName,
                        mobile: mobile,
                        from: self.state.from,
                        tpl_type: self.state.type
                    };
                    if (!self.isRegister) {
                        params.sms_code = self.state.inputCode;
                    }
                    SERVICE.post(url, params).then(function (res) {
                        if (+res.code === 0) {
                            self.initCustomInfo();
                            if (res.data && res.data.img_url) {
                                self.setState({
                                    showImg: 1,
                                    imgUrl: res.data.img_url
                                });
                            }
                        }
                    });
                }
            },
            {
                key: 'hideImg',
                value: function hideImg() {
                    var self = this;
                    self.setState({
                        showImg: 0,
                        imgUrl: null
                    });
                }
            },
            {
                key: 'render',
                value: function render() {
                    var self = this;
                    var inputName = self.state.inputName || '';
                    var inputMobile = self.state.inputMobile || '';
                    var inputCode = self.state.inputCode || '';
                    var selectedGrade = self.state.selectedGradeName || '请选择年级';
                    var selectedSubject = self.state.selectedSubjectName || '请选择科目';
                    return _react2.default.createElement('div', { className: 'form-item' }, _react2.default.createElement('div', { className: 'big-title' }, self.state.title), _react2.default.createElement('div', { className: 'small-title' }, self.state.sub_title), _react2.default.createElement('div', { className: 'abroad-form' }, _react2.default.createElement('input', {
                        className: 'input-border name',
                        value: inputName,
                        type: 'text',
                        required: 'required',
                        maxLength: '30',
                        placeholder: '请输入您的姓名',
                        onChange: self.nameChange
                    }), _react2.default.createElement('div', { className: 'abroad-select' }, _react2.default.createElement('div', { className: 'input-border select-subject abroad-grade' }, _react2.default.createElement('div', { className: self.state.selectedGradeName ? 'tpl-grade' : 'tpl-grade uninput' }, selectedGrade), _react2.default.createElement('i', { className: 'icon-show-grade icon-caret-down2' })), _react2.default.createElement('div', { className: 'input-border select-subject abroad-subject' }, _react2.default.createElement('div', { className: self.state.selectedSubjectName ? 'tpl-subject' : 'tpl-subject uninput' }, selectedSubject), _react2.default.createElement('i', { className: 'icon-show-subject icon-caret-down2' })), _react2.default.createElement('div', { className: 'clear' })), _react2.default.createElement('input', {
                        className: 'input-border mobile',
                        value: inputMobile,
                        type: 'number',
                        required: 'required',
                        maxLength: '20',
                        placeholder: '请输入您的手机号码',
                        onChange: self.mobileChange
                    }), _react2.default.createElement('div', { className: self.state.isRegister ? 'input-border code-block hide' : 'input-border code-block' }, _react2.default.createElement('input', {
                        className: 'input-border code',
                        type: 'text',
                        maxLength: '6',
                        placeholder: '输入短信验证码',
                        value: inputCode,
                        onChange: self.codeChange
                    }), _react2.default.createElement('div', {
                        className: self.state.isGetCode ? 'get-code hide' : 'get-code',
                        onClick: self.getVerifyCode
                    }, '获取验证码'), _react2.default.createElement('div', { className: self.state.isGetCode ? 'get-code sending-code' : 'get-code sending-code hide' }, self.state.getCodeTitle)), _react2.default.createElement('div', {
                        className: 'post-btn abroad-post',
                        onClick: self.postDemand
                    }, '立即预约')), _react2.default.createElement('div', { className: self.state.showImg ? 'mask-container' : 'mask-container hide' }, _react2.default.createElement('div', { className: 'success-dialog' }, _react2.default.createElement('img', {
                        src: self.state.imgUrl,
                        alt: '',
                        className: 'q-card'
                    }), _react2.default.createElement('span', {
                        className: 'icon icon-close',
                        onClick: self.hideImg
                    }))));
                }
            }
        ]);
        return VideoItem;
    }(_react2.default.Component);
    exports.default = VideoItem;
});