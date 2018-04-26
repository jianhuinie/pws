define(function (require, exports) {
    'use strict';
    var _react = require('react');
    var _ajaxService = require('common/util/ajaxService');
    var _ajaxConfig = require('common/ajaxConfig');
    var _index = require('common/components/Upload/index');
    var _ui = require('gsx-design/component/ui');
    var _PageController2 = require('common/controller/PageController');
    var _index3 = require('module/components/Avatar/index');
    var _wxContext = require('common/util/wxContext');
    var _index5 = require('gsx-design/component/Loading/index');
    (require('css-loader!./index.styl'))
    Object.defineProperty(exports, '__esModule', { value: true });
    var _react2 = _interopRequireDefault(_react);
    var _ajaxService2 = _interopRequireDefault(_ajaxService);
    var _ajaxConfig2 = _interopRequireDefault(_ajaxConfig);
    var _index2 = _interopRequireDefault(_index);
    var _ui2 = _interopRequireDefault(_ui);
    var _PageController3 = _interopRequireDefault(_PageController2);
    var _index4 = _interopRequireDefault(_index3);
    var _wxContext2 = _interopRequireDefault(_wxContext);
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
    var StepTwo = function (_PageController) {
        _inherits(StepTwo, _PageController);
        function StepTwo(props) {
            _classCallCheck(this, StepTwo);
            var _this = _possibleConstructorReturn(this, (StepTwo.__proto__ || Object.getPrototypeOf(StepTwo)).call(this, props));
            _this.getClassBasic = function () {
                _ajaxService2.default.get(_ajaxConfig2.default.CLASSROOM.GET_ROOM_BASE).then(function (res) {
                    _this.setState({
                        headUrl: res.data.headUrl,
                        name: res.data.name,
                        intro: res.data.intro
                    });
                });
            };
            _this.handleNameChange = function (e) {
                var self = _this;
                var name = e.target.value;
                self.setState({ name: name });
            };
            _this.handleIntroChange = function (e) {
                _this.setState({ intro: e.target.value });
            };
            _this.handleUploaded = function (file) {
                _this.setState({
                    headUrl: file.url,
                    headStorageId: file.storageId
                });
            };
            _this.submit = function () {
                var _this$state = _this.state, headStorageId = _this$state.headStorageId, name = _this$state.name, intro = _this$state.intro;
                var length = name.length;
                if (length > 20 || length < 3) {
                    _ui2.default.alert('课堂名称为3-20个字');
                    return;
                }
                _this.setState({ submiting: true });
                _ajaxService2.default.post(_ajaxConfig2.default.CLASSROOM.CREATE_ROOM, {
                    headStorageId: headStorageId,
                    name: name,
                    intro: intro
                }).then(function (res) {
                    var classId = res.data.classId;
                    new _wxContext2.default().wxPay(_ajaxConfig2.default.CLASSROOM.PAY_CREATE_ROOM, {}, function () {
                        _this.paySuccess(classId);
                    }, _this.payCancel);
                }, function () {
                    _this.setState({ submiting: false });
                });
            };
            _this.paySuccess = function (classId) {
                _ajaxService2.default.post('/m/classroom/createPart2').then(function () {
                    _ui2.default.alert('创建成功').done(function () {
                        location.href = '/mweb/classroom?id=' + classId;
                    });
                });
            };
            _this.payCancel = function () {
                _this.setState({ submiting: false });
            };
            _this.state = {
                headUrl: '',
                name: '',
                intro: '',
                headStorageId: null,
                submiting: false
            };
            _this._hackIos();
            _this.loading = new _index6.default();
            _this.loading.show();
            return _this;
        }
        _createClass(StepTwo, [
            {
                key: 'componentDidMount',
                value: function componentDidMount() {
                    var _this2 = this;
                    document.title = '课堂基本信息';
                    _ajaxService2.default.get(_ajaxConfig2.default.USER.GET_USER).then(function (res) {
                        var isTeacher = res.data.user.isTeacher;
                        var classId = res.data.classroom && res.data.classroom.classId;
                        _this2.loading.hide();
                        if (isTeacher) {
                            location.replace('/mweb/classroom?id=' + classId);
                        } else {
                            _this2.getClassBasic();
                        }
                    });
                }
            },
            {
                key: '_hackIos',
                value: function _hackIos() {
                    window.onpageshow = function (event) {
                        if (event.persisted) {
                            window.location.reload();
                        }
                    };
                }
            },
            {
                key: 'render',
                value: function render() {
                    return _react2.default.createElement('div', { className: 'classroom-basic' }, _react2.default.createElement('div', { className: 'classroom-basic-title' }, '课堂基本信息'), _react2.default.createElement('div', { className: 'classroom-basic-portrait' }, _react2.default.createElement(_index2.default, { onUploaded: this.handleUploaded }, _react2.default.createElement(_index4.default, {
                        className: 'portrait',
                        src: this.state.headUrl
                    }), _react2.default.createElement('div', { className: 'upload' }, '点击上传课堂头像')), _react2.default.createElement('div', { className: 'des' }, '建议尺寸 100px*100px 大小不超过2M')), _react2.default.createElement('div', { className: 'classroom-basic-title' }, '课堂名称\uFF08必填\uFF0C3-20个字\uFF09'), _react2.default.createElement('div', { className: 'classroom-basic-name' }, _react2.default.createElement('input', {
                        value: this.state.name,
                        onChange: this.handleNameChange,
                        placeholder: '请填写课堂名称'
                    })), _react2.default.createElement('div', { className: 'classroom-basic-title' }, '课堂介绍\uFF08选填\uFF09'), _react2.default.createElement('div', { className: 'classroom-basic-dec' }, _react2.default.createElement('textarea', {
                        value: this.state.intro,
                        onChange: this.handleIntroChange,
                        className: 'text',
                        placeholder: '请填写课堂介绍'
                    })), _react2.default.createElement('button', {
                        onClick: this.submit,
                        disabled: this.state.submiting,
                        className: 'ws-btn-red classroom-basic-next'
                    }, this.state.submiting ? '提交中' : '立即支付 \uFFE50.01'), _react2.default.createElement('div', { className: 'classroom-basic-tip' }, '提示\uFF1A本次创建所支付的0.01元会返现至个人账户余额'));
                }
            }
        ]);
        return StepTwo;
    }(_PageController3.default);
    exports.default = StepTwo;
    ;
});