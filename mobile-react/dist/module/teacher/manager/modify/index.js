define(function (require, exports) {
    'use strict';
    var _react = require('react');
    var _ajaxService = require('common/util/ajaxService');
    var _ajaxConfig = require('common/ajaxConfig');
    var _index = require('common/components/Upload/index');
    var _ui = require('gsx-design/component/ui');
    var _PageController2 = require('common/controller/PageController');
    var _stringService = require('common/util/stringService');
    var _util = require('common/util/util');
    (require('css-loader!./index.styl'))
    Object.defineProperty(exports, '__esModule', { value: true });
    var _react2 = _interopRequireDefault(_react);
    var _ajaxService2 = _interopRequireDefault(_ajaxService);
    var _ajaxConfig2 = _interopRequireDefault(_ajaxConfig);
    var _index2 = _interopRequireDefault(_index);
    var _ui2 = _interopRequireDefault(_ui);
    var _PageController3 = _interopRequireDefault(_PageController2);
    var _stringService2 = _interopRequireDefault(_stringService);
    var _util2 = _interopRequireDefault(_util);
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
    }
    var _extends = Object.assign || function (target) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];
            for (var key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key];
                }
            }
        }
        return target;
    };
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
    var Modify = function (_PageController) {
        _inherits(Modify, _PageController);
        function Modify(props) {
            _classCallCheck(this, Modify);
            var _this = _possibleConstructorReturn(this, (Modify.__proto__ || Object.getPrototypeOf(Modify)).call(this, props));
            _this.handleNameChange = function (e) {
                _this.setState({ name: e.target.value });
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
                var length = _stringService2.default.getCharacterLength(name);
                if (length > 24 || length < 8) {
                    _ui2.default.alert('课堂名称为4-12个字');
                    return;
                }
                _this.setState({ submiting: true });
                _ajaxService2.default.post(_ajaxConfig2.default.CLASSROOM.UPDATE_ROOM_BASE, {
                    headStorageId: headStorageId,
                    name: name,
                    intro: intro
                }).then(function (res) {
                    var status = res.data.status;
                    if (status) {
                        _ui2.default.alert('修改成功').done(function () {
                            location.replace('/mweb/teacher/manager/center');
                        });
                    }
                }, function () {
                    _this.setState({ submiting: false });
                });
            };
            _this.state = {
                headUrl: '',
                name: '',
                intro: '',
                headStorageId: null,
                submiting: false,
                nameValid: false
            };
            return _this;
        }
        _createClass(Modify, [
            {
                key: 'componentDidMount',
                value: function componentDidMount() {
                    var _this2 = this;
                    document.title = '课堂基本信息';
                    _ajaxService2.default.get(_ajaxConfig2.default.CLASSROOM.GET_ROOM_BASE).then(function (res) {
                        _this2.setState(_extends({}, res.data, { nameValid: _stringService2.default.getCharacterLength(res.data.name) >= 8 }));
                    });
                    _util2.default.sharePage();
                }
            },
            {
                key: 'render',
                value: function render() {
                    return _react2.default.createElement('div', { className: 'classroom-basic' }, _react2.default.createElement('div', { className: 'classroom-basic-title' }, '课堂基本信息'), _react2.default.createElement('div', { className: 'classroom-basic-portrait' }, _react2.default.createElement(_index2.default, { onUploaded: this.handleUploaded }, _react2.default.createElement('img', {
                        className: 'portrait',
                        src: this.state.headUrl
                    }), _react2.default.createElement('div', { className: 'upload' }, '点击上传课堂头像')), _react2.default.createElement('div', { className: 'des' }, '建议尺寸 100px*100px 大小不超过2M')), _react2.default.createElement('div', { className: 'classroom-basic-title' }, '课堂名称\uFF08必填\uFF0C4-12个字\uFF09'), _react2.default.createElement('div', { className: 'classroom-basic-name' }, _react2.default.createElement('input', {
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
                        disabled: !this.state.nameValid || this.state.submiting,
                        className: 'ws-btn-red classroom-basic-next'
                    }, this.state.submiting ? '提交中' : '确定'));
                }
            }
        ]);
        return Modify;
    }(_PageController3.default);
    exports.default = Modify;
    ;
});