define(function (require, exports) {
    'use strict';
    var _react = require('react');
    var _ajaxService = require('common/util/ajaxService');
    var _ajaxConfig = require('common/ajaxConfig');
    var _stringService = require('common/util/stringService');
    var _PageController2 = require('common/controller/PageController');
    var _reactRouter = require('react-router');
    var _index = require('./UploadPerson/index');
    var _index3 = require('./UploadLicense/index');
    var _index5 = require('./Privilege/index');
    (require('css-loader!./index.styl'))
    Object.defineProperty(exports, '__esModule', { value: true });
    var _react2 = _interopRequireDefault(_react);
    var _ajaxService2 = _interopRequireDefault(_ajaxService);
    var _ajaxConfig2 = _interopRequireDefault(_ajaxConfig);
    var _stringService2 = _interopRequireDefault(_stringService);
    var _PageController3 = _interopRequireDefault(_PageController2);
    var _index2 = _interopRequireDefault(_index);
    var _index4 = _interopRequireDefault(_index3);
    var _index6 = _interopRequireDefault(_index5);
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
    }
    function _defineProperty(obj, key, value) {
        if (key in obj) {
            Object.defineProperty(obj, key, {
                value: value,
                enumerable: true,
                configurable: true,
                writable: true
            });
        } else {
            obj[key] = value;
        }
        return obj;
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
    var authenTypeEnum = {
        PERSON: 1,
        ORG: 2
    };
    var Apply = function (_PageController) {
        _inherits(Apply, _PageController);
        function Apply(props) {
            _classCallCheck(this, Apply);
            var _this = _possibleConstructorReturn(this, (Apply.__proto__ || Object.getPrototypeOf(Apply)).call(this, props));
            _this.handleTypeClick = function (type) {
                _this.setState({ authenType: type });
            };
            _this.handleInputChange = function (key, value) {
                var maxLength = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 50;
                if (_stringService2.default.getCharacterLength(value) <= maxLength * 2) {
                    _this.setState(_defineProperty({}, key, value));
                }
            };
            _this.handlePersonUploaded = function (file) {
                _this.setState({
                    teacherStorageId: file.storageId,
                    teacherUrl: file.url
                });
            };
            _this.handleOrgUploaded = function (file) {
                _this.setState({
                    orgStorageId: file.storageId,
                    orgUrl: file.url
                });
            };
            _this.submit = function () {
                _this.setState({ submiting: true });
                _ajaxService2.default.post(_ajaxConfig2.default.CLASSROOM.AUTHEN, _this.state).then(function (res) {
                    if (res.data && res.data.status) {
                        _reactRouter.hashHistory.replace('/verifying?id=' + res.data.classId);
                    }
                }, function () {
                    _this.setState({ submiting: false });
                });
            };
            _this.state = {
                authenType: authenTypeEnum.PERSON,
                teacherName: '',
                teacherID: '',
                teacherStorageId: '',
                teacherUrl: '',
                teacherWechatAccount: '',
                orgName: '',
                orgTax: '',
                orgStorageId: '',
                orgUrl: '',
                brandName: '',
                mpAccount: '',
                submiting: false
            };
            return _this;
        }
        _createClass(Apply, [
            {
                key: 'componentDidMount',
                value: function componentDidMount() {
                    document.title = '微师认证';
                }
            },
            {
                key: 'render',
                value: function render() {
                    var _this2 = this;
                    var state = this.state;
                    var teacherEnabled = state.teacherName && state.teacherID && state.teacherWechatAccount && state.teacherStorageId;
                    var btnEnabled = state.authenType === authenTypeEnum.PERSON ? teacherEnabled : teacherEnabled && state.orgName && state.orgTax && state.orgStorageId && state.brandName;
                    return _react2.default.createElement('div', { className: 'apply-authen' }, _react2.default.createElement('div', { className: 'apply-authen-title' }, '选择认证类型'), _react2.default.createElement('div', { className: 'apply-authen-type' }, _react2.default.createElement('div', {
                        className: 'type-item',
                        onClick: function onClick() {
                            _this2.handleTypeClick(authenTypeEnum.PERSON);
                        }
                    }, _react2.default.createElement('div', { className: 'type ' + (authenTypeEnum.PERSON === state.authenType ? 'active' : '') }, _react2.default.createElement('span', { className: 'icon-authen-person' })), _react2.default.createElement('div', { className: 'name' }, '个人认证')), _react2.default.createElement('div', {
                        className: 'type-item',
                        onClick: function onClick() {
                            _this2.handleTypeClick(authenTypeEnum.ORG);
                        }
                    }, _react2.default.createElement('div', { className: 'type ' + (authenTypeEnum.ORG === state.authenType ? 'active' : '') }, _react2.default.createElement('span', { className: 'icon-authen-org' })), _react2.default.createElement('div', { className: 'name' }, '机构认证'))), _react2.default.createElement('div', { className: 'apply-authen-title' }, '填写基本信息'), _react2.default.createElement('div', { className: 'apply-authen-item' }, _react2.default.createElement('div', { className: 'name' }, '运营者姓名'), _react2.default.createElement('input', {
                        className: 'content',
                        placeholder: '请输入姓名',
                        value: state.teacherName,
                        onChange: function onChange(e) {
                            _this2.handleInputChange('teacherName', e.target.value, 20);
                        }
                    })), _react2.default.createElement('div', { className: 'apply-authen-item' }, _react2.default.createElement('div', { className: 'name' }, '运营者身份证'), _react2.default.createElement('input', {
                        className: 'content',
                        placeholder: '请输入身份证或护照ID',
                        value: state.teacherID,
                        onChange: function onChange(e) {
                            _this2.handleInputChange('teacherID', e.target.value, 20);
                        }
                    })), _react2.default.createElement('div', { className: 'apply-authen-item' }, _react2.default.createElement('div', { className: 'name' }, '运营者微信号'), _react2.default.createElement('input', {
                        className: 'content',
                        placeholder: '请输入微信号',
                        value: state.teacherWechatAccount,
                        onChange: function onChange(e) {
                            _this2.handleInputChange('teacherWechatAccount', e.target.value, 30);
                        }
                    })), _react2.default.createElement(_index2.default, {
                        storageId: state.teacherStorageId,
                        url: state.teacherUrl,
                        onUploaded: this.handlePersonUploaded
                    }), authenTypeEnum.ORG === state.authenType ? _react2.default.createElement('div', null, _react2.default.createElement('div', { className: 'apply-authen-title' }, '填写机构信息'), _react2.default.createElement('div', { className: 'apply-authen-item' }, _react2.default.createElement('div', { className: 'name' }, '企业名称'), _react2.default.createElement('input', {
                        className: 'content',
                        placeholder: '请输入企业全称',
                        value: this.state.orgName,
                        onChange: function onChange(e) {
                            _this2.handleInputChange('orgName', e.target.value);
                        }
                    })), _react2.default.createElement('div', { className: 'apply-authen-item' }, _react2.default.createElement('div', { className: 'name' }, '企业税号'), _react2.default.createElement('input', {
                        className: 'content',
                        placeholder: '请输入用于开发票的企业税号',
                        value: this.state.orgTax,
                        onChange: function onChange(e) {
                            _this2.handleInputChange('orgTax', e.target.value, 50);
                        }
                    })), _react2.default.createElement('div', { className: 'apply-authen-item' }, _react2.default.createElement('div', { className: 'name' }, '品牌名称'), _react2.default.createElement('input', {
                        className: 'content',
                        placeholder: '请输入企业旗下品牌名称',
                        value: this.state.brandName,
                        onChange: function onChange(e) {
                            _this2.handleInputChange('brandName', e.target.value, 30);
                        }
                    })), _react2.default.createElement('div', { className: 'apply-authen-item' }, _react2.default.createElement('div', { className: 'name' }, '公众号(选填)'), _react2.default.createElement('input', {
                        className: 'content',
                        placeholder: '请输入公众号名称',
                        value: this.state.mpAccount,
                        onChange: function onChange(e) {
                            _this2.handleInputChange('mpAccount', e.target.value, 30);
                        }
                    })), _react2.default.createElement(_index4.default, {
                        storageId: state.orgStorageId,
                        url: state.orgUrl,
                        onUploaded: this.handleOrgUploaded
                    })) : null, _react2.default.createElement('div', { className: 'apply-authen-submit' }, _react2.default.createElement('button', {
                        disabled: !btnEnabled || state.submiting,
                        className: 'ws-btn-red',
                        onClick: this.submit
                    }, this.state.submiting ? '提交中' : '提交申请')), _react2.default.createElement(_index6.default, { isOrg: authenTypeEnum.ORG === state.authenType }));
                }
            }
        ]);
        return Apply;
    }(_PageController3.default);
    exports.default = Apply;
    ;
});