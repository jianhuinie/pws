define(function (require, exports) {
    'use strict';
    var _react = require('react');
    var _ajaxService = require('common/util/ajaxService');
    var _ajaxConfig = require('common/ajaxConfig');
    var _PageController2 = require('common/controller/PageController');
    var _ui = require('gsx-design/component/ui');
    var _index = require('module/components/Avatar/index');
    var _index3 = require('common/components/Upload/index');
    var _stringService = require('common/util/stringService');
    var _util = require('common/util/util');
    (require('css-loader!./index.styl'))
    Object.defineProperty(exports, '__esModule', { value: true });
    var _react2 = _interopRequireDefault(_react);
    var _ajaxService2 = _interopRequireDefault(_ajaxService);
    var _ajaxConfig2 = _interopRequireDefault(_ajaxConfig);
    var _PageController3 = _interopRequireDefault(_PageController2);
    var _ui2 = _interopRequireDefault(_ui);
    var _index2 = _interopRequireDefault(_index);
    var _index4 = _interopRequireDefault(_index3);
    var _stringService2 = _interopRequireDefault(_stringService);
    var _util2 = _interopRequireDefault(_util);
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
    var BasicModify = function (_PageController) {
        _inherits(BasicModify, _PageController);
        function BasicModify(props) {
            _classCallCheck(this, BasicModify);
            var _this = _possibleConstructorReturn(this, (BasicModify.__proto__ || Object.getPrototypeOf(BasicModify)).call(this, props));
            _this.handleUploaded = function (file) {
                _this.setState({
                    avatarUrl: file.url,
                    avatarStorageId: file.storageId
                });
            };
            _this.getStudentInfo = function () {
                _ajaxService2.default.get(_ajaxConfig2.default.USER.GET_STUDENT_INFO).then(function (res) {
                    var _res$data = res.data, nickName = _res$data.nickName, intro = _res$data.intro, avatarUrl = _res$data.avatarUrl;
                    _this.setState({
                        nickName: nickName,
                        intro: intro,
                        avatarUrl: avatarUrl
                    });
                });
            };
            _this.handleNameChange = function (e) {
                var value = e.target.value;
                if (_stringService2.default.getCharacterLength(value) <= 32) {
                    _this.setState({ nickName: value });
                }
            };
            _this.handleIntroChange = function (e) {
                var value = e.target.value;
                if (_stringService2.default.getCharacterLength(value) <= 100) {
                    _this.setState({ intro: value });
                }
            };
            _this.submit = function () {
                _this.setState({ submiting: true });
                var _this$state = _this.state, nickName = _this$state.nickName, avatarStorageId = _this$state.avatarStorageId, intro = _this$state.intro;
                _ajaxService2.default.post(_ajaxConfig2.default.USER.UPDATE_STUDENT_INFO, {
                    nickName: nickName,
                    avatarStorageId: avatarStorageId,
                    intro: intro
                }).then(function () {
                    _ui2.default.alert('修改成功').done(function () {
                        location.replace('/mweb/student/home');
                    });
                }, function () {
                    _this.setState({ submiting: false });
                });
            };
            _this.state = {
                nickName: '',
                intro: '',
                avatarStorageId: null,
                avatarUrl: '',
                submiting: false
            };
            return _this;
        }
        _createClass(BasicModify, [
            {
                key: 'componentDidMount',
                value: function componentDidMount() {
                    document.title = '编辑个人信息';
                    this.getStudentInfo();
                    _util2.default.sharePage();
                }
            },
            {
                key: 'render',
                value: function render() {
                    return _react2.default.createElement('div', { className: 'basic-modify' }, _react2.default.createElement('div', { className: 'basic-modify-item avatar' }, _react2.default.createElement('div', { className: 'title' }, '头像'), _react2.default.createElement(_index4.default, { onUploaded: this.handleUploaded }, _react2.default.createElement(_index2.default, { src: this.state.avatarUrl }))), _react2.default.createElement('div', { className: 'basic-modify-item' }, _react2.default.createElement('div', { className: 'title' }, '昵称'), _react2.default.createElement('input', {
                        onChange: this.handleNameChange,
                        className: 'nickName',
                        value: this.state.nickName
                    })), _react2.default.createElement('div', { className: 'basic-modify-submit' }, _react2.default.createElement('button', {
                        onClick: this.submit,
                        disabled: !this.state.nickName || this.state.submiting,
                        className: 'ws-btn-red'
                    }, this.state.submiting ? '提交中' : '保存')));
                }
            }
        ]);
        return BasicModify;
    }(_PageController3.default);
    exports.default = BasicModify;
});