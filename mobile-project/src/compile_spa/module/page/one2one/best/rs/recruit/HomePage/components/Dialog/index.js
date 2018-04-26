define(function (require, exports) {
    'use strict';
    var _react = require('react');
    var _reactRouter = require('react-router');
    var _config = require('../../../config');
    var _index = require('compile_spa/common/components/Suggestion/index');
    var _index3 = require('compile_spa/common/components/Dialog/index');
    var service = require('common/service');
    var $ = require('zepto');
    var ui = require('common/ui');
    (require('css-loader!./index.styl'))
    Object.defineProperty(exports, '__esModule', { value: true });
    var _react2 = _interopRequireDefault(_react);
    var _config2 = _interopRequireDefault(_config);
    var _index2 = _interopRequireDefault(_index);
    var _index4 = _interopRequireDefault(_index3);
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
    var RecruitDialog = function (_React$Component) {
        _inherits(RecruitDialog, _React$Component);
        function RecruitDialog(props) {
            _classCallCheck(this, RecruitDialog);
            var _this = _possibleConstructorReturn(this, (RecruitDialog.__proto__ || Object.getPrototypeOf(RecruitDialog)).call(this, props));
            _this.closeHander = _this.closeHander.bind(_this);
            _this.onSubmitHandler = _this.onSubmitHandler.bind(_this);
            _this.onSubjectSelectedHandler = _this.onSubjectSelectedHandler.bind(_this);
            _this.onChanged = _this.onChanged.bind(_this);
            _this.state = {
                name: '',
                mobile: '',
                isOpen: props.isShowDialog
            };
            return _this;
        }
        _createClass(RecruitDialog, [
            {
                key: 'componentDidMount',
                value: function componentDidMount() {
                }
            },
            {
                key: 'componentWillReceiveProps',
                value: function componentWillReceiveProps(nextProps) {
                    var me = this;
                    me.setStateProps({ isOpen: nextProps.isShowDialog });
                    if (nextProps.isShowDialog) {
                        service.get(_config2.default.PATHS.TEACHER_INFO).then(function (res) {
                            if (res.code === 0) {
                                var dt = res.data;
                                me.setStateProps({
                                    name: dt.real_name,
                                    mobile: dt.mobile,
                                    ratio: dt.share_ratio
                                });
                            } else {
                                ui.alert(res.msg).then(function () {
                                    _reactRouter.hashHistory.push('/one2one/best/rs/');
                                });
                            }
                        });
                    }
                }
            },
            {
                key: 'onSubjectSelectedHandler',
                value: function onSubjectSelectedHandler(dt) {
                    this.subjectId = dt.value;
                    this.setStateProps({
                        subjectName: dt.title,
                        subjectSource: null,
                        subjectError: null,
                        subjectTips: null
                    });
                }
            },
            {
                key: 'onChanged',
                value: function onChanged(event) {
                    var val = event.target.value;
                    var type = $(event.target).data('type');
                    switch (type) {
                    case 'name':
                        this.onNameChanged(val);
                        return;
                    case 'mobile':
                        this.onMobileChanged(val);
                        return;
                    case 'subject':
                        this.onSubjectChanged(val, event);
                        return;
                    }
                }
            },
            {
                key: 'onNameChanged',
                value: function onNameChanged(val) {
                    this.setStateProps({ name: val });
                    if (val) {
                        this.setStateProps({ nameError: null });
                        return true;
                    }
                    this.setStateProps({ nameError: '请填写姓名' });
                    return false;
                }
            },
            {
                key: 'onMobileChanged',
                value: function onMobileChanged(mobile) {
                    this.setStateProps({ mobile: mobile });
                    if (!mobile) {
                        this.setStateProps({ mobileError: '请填写手机号' });
                        return false;
                    } else if (!/^1\d{3,}$/.test(mobile)) {
                        this.setStateProps({ mobileError: '请输入正确的手机格式' });
                        return false;
                    }
                    this.setStateProps({ mobileError: null });
                    return true;
                }
            },
            {
                key: 'onSubjectChanged',
                value: function onSubjectChanged(val) {
                    var me = this;
                    var url = 'https://suggestion.genshuixue.com/s';
                    if (location.host.indexOf('beta') !== -1) {
                        url = 'https://beta-suggestion.genshuixue.com/s';
                    }
                    me.setStateProps({ subjectName: val });
                    me.subjectId = null;
                    me.setStateProps({
                        subjectTips: '请通过下拉列表选择科目',
                        subjectError: null
                    });
                    if (val) {
                        $.ajax({
                            url: url,
                            data: {
                                key: val,
                                type: 1,
                                v: 2
                            },
                            dataType: 'jsonp'
                        }).done(function (res) {
                            var dt = res.result.r;
                            if (Array.isArray(dt) && dt.length) {
                                var state = me.state;
                                state.subjectSource = res.result.r.map(function (item) {
                                    return {
                                        value: item.sub_id,
                                        title: item.title
                                    };
                                });
                                me.setState(state);
                                return;
                            }
                            me.setStateProps({ subjectTips: '暂不开放该科目的报名' });
                        });
                    }
                }
            },
            {
                key: 'onSubmitHandler',
                value: function onSubmitHandler() {
                    var _this2 = this;
                    if (this.validator() && !this.isSubmit) {
                        this.isSubmit = true;
                        service.post(_config2.default.PATHS.RECRUIT, {
                            name: this.state.name,
                            mobile: this.state.mobile,
                            subject_id: this.subjectId,
                            share_ratio: this.state.ratio
                        }).then(function (res) {
                            if (res.code === 0) {
                                _this2.setStateProps({ isOpen: false });
                                if (typeof _this2.props.onCloseHandler === 'function') {
                                    _this2.props.onCloseHandler('ok');
                                }
                            } else {
                                ui.alert(res.msg);
                            }
                            _this2.isSubmit = false;
                        });
                    }
                }
            },
            {
                key: 'setStateProps',
                value: function setStateProps(newProps) {
                    this.setState($.extend(this.state, newProps));
                }
            },
            {
                key: 'validator',
                value: function validator() {
                    var name = this.state.name;
                    var mobile = this.state.mobile;
                    var subject = this.state.subjectName;
                    var result = true;
                    result = this.onNameChanged(name);
                    result = this.onMobileChanged(mobile) && result;
                    if (!subject) {
                        result = false;
                        this.setStateProps({
                            subjectError: '请填写科目',
                            subjectTips: null
                        });
                    } else if (!this.subjectId) {
                        result = false;
                        this.setStateProps({
                            subjectError: '请通过下拉列表选择科目',
                            subjectTips: null
                        });
                    } else {
                        this.setStateProps({ subjectError: null });
                    }
                    return result;
                }
            },
            {
                key: 'closeHander',
                value: function closeHander() {
                    this.setStateProps({ isOpen: false });
                    if (typeof this.props.onCloseHandler === 'function') {
                        this.props.onCloseHandler('cancel');
                    }
                }
            },
            {
                key: 'render',
                value: function render() {
                    return _react2.default.createElement(_index4.default, {
                        isShowDialog: this.state.isOpen,
                        onCloseHandler: this.closeHander
                    }, _react2.default.createElement('div', { className: 'recruit-home-dialog' }, _react2.default.createElement('div', { className: 'header' }, _react2.default.createElement('div', { className: 'title' }, '提交您的主营科目'), _react2.default.createElement('div', { className: 'sub-title' }, '术业有专攻\uFF0C只能提交一个主营科目哦')), _react2.default.createElement('div', { className: 'body' }, _react2.default.createElement('form', {
                        noValidate: 'novalidate',
                        onSubmit: function onSubmit() {
                            return false;
                        }
                    }, _react2.default.createElement('div', { className: 'txt' }, _react2.default.createElement('input', {
                        type: 'text',
                        'data-type': 'name',
                        placeholder: '您的姓名',
                        value: this.state.name,
                        maxLength: '10',
                        onChange: this.onChanged
                    }), _react2.default.createElement('span', { className: 'error' }, this.state.nameError)), _react2.default.createElement('div', { className: 'txt subject' }, _react2.default.createElement('input', {
                        type: 'text',
                        'data-type': 'subject',
                        placeholder: '您的主营科目',
                        value: this.state.subjectName,
                        onChange: this.onChanged
                    }), _react2.default.createElement(_index2.default, {
                        dataSource: this.state.subjectSource,
                        onSelectedHandler: this.onSubjectSelectedHandler,
                        className: 'subject-suggestion'
                    }), _react2.default.createElement('span', { className: 'error' }, this.state.subjectError), _react2.default.createElement('span', { className: 'tips' }, this.state.subjectTips)), _react2.default.createElement('div', { className: 'txt' }, _react2.default.createElement('input', {
                        type: 'number',
                        'data-type': 'mobile',
                        placeholder: '您的手机号码\uFF0C方便顾问联系',
                        value: this.state.mobile,
                        maxLength: '11',
                        onChange: this.onChanged
                    }), _react2.default.createElement('span', { className: 'error' }, this.state.mobileError)), _react2.default.createElement('div', null, _react2.default.createElement('div', {
                        className: 'button',
                        onClick: this.onSubmitHandler
                    }, '确认报名'))))));
                }
            }
        ]);
        return RecruitDialog;
    }(_react2.default.Component);
    RecruitDialog.propTypes = {
        isShowDialog: _react.PropTypes.bool,
        onCloseHandler: _react.PropTypes.func
    };
    RecruitDialog.defaultProps = {
        isShowDialog: false,
        onCloseHandler: null
    };
    exports.default = RecruitDialog;
});