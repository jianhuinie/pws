define(function (require, exports) {
    'use strict';
    var _react = require('react');
    var _ajaxService = require('common/util/ajaxService');
    var _ajaxConfig = require('common/ajaxConfig');
    var _PageController2 = require('common/controller/PageController');
    var _index = require('module/components/MenuList/index');
    var _authStatus = require('common/enum/authStatus');
    var _ui = require('gsx-design/component/ui');
    var _index3 = require('module/components/Avatar/index');
    var _wxContext = require('common/util/wxContext');
    var _index5 = require('gsx-design/component/Loading/index');
    var _util = require('common/util/util');
    var _index7 = require('module/discovery/component/DiscoveryFooter/index');
    (require('css-loader!./index.styl'))
    Object.defineProperty(exports, '__esModule', { value: true });
    var _react2 = _interopRequireDefault(_react);
    var _ajaxService2 = _interopRequireDefault(_ajaxService);
    var _ajaxConfig2 = _interopRequireDefault(_ajaxConfig);
    var _PageController3 = _interopRequireDefault(_PageController2);
    var _index2 = _interopRequireDefault(_index);
    var _authStatus2 = _interopRequireDefault(_authStatus);
    var _ui2 = _interopRequireDefault(_ui);
    var _index4 = _interopRequireDefault(_index3);
    var _wxContext2 = _interopRequireDefault(_wxContext);
    var _index6 = _interopRequireDefault(_index5);
    var _util2 = _interopRequireDefault(_util);
    var _index8 = _interopRequireDefault(_index7);
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
    var Home = function (_PageController) {
        _inherits(Home, _PageController);
        function Home(props) {
            _classCallCheck(this, Home);
            var _this = _possibleConstructorReturn(this, (Home.__proto__ || Object.getPrototypeOf(Home)).call(this, props));
            _this.getBasicInfo = function () {
                _ajaxService2.default.get(_ajaxConfig2.default.USER.GET_STUDENT_INFO).then(function (res) {
                    _this.setState(_extends({}, res.data, { loading: false }), function () {
                        _this.loading.hide();
                    });
                });
            };
            _this.clickCollect = function () {
                _ui2.default.toast('该功能即将上线');
            };
            _this.clickFollow = function () {
                location.href = '/mweb/student/follow';
            };
            _this.state = {
                nickName: '',
                avatarUrl: '',
                intro: '',
                followClassNum: 0,
                isTeacher: false,
                balance: 0,
                classroom: {
                    classId: '',
                    name: '',
                    headUrl: '',
                    authStatus: _authStatus2.default.UNAUTHORIZED
                },
                loading: true
            };
            _this.loading = new _index6.default();
            _this._hackIos();
            return _this;
        }
        _createClass(Home, [
            {
                key: 'componentDidMount',
                value: function componentDidMount() {
                    document.title = '个人中心';
                    this.loading.show();
                    new _wxContext2.default().setShareInfo({ title: '哈哈哈' });
                    this.getBasicInfo();
                    _util2.default.sharePage();
                }
            },
            {
                key: 'componentWillUnmount',
                value: function componentWillUnmount() {
                    this.loading.destroy();
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
                    var state = this.state;
                    var intro = state.intro ? state.intro : '学会在学习中寻找乐趣\uFF0C学会乐在其中并保持热情\u3002';
                    return _react2.default.createElement('div', { className: 'student-center' }, _react2.default.createElement('a', { href: '/mweb/student/basicModify' }, _react2.default.createElement('div', { className: 'student-center-basic' }, _react2.default.createElement(_index4.default, { src: state.avatarUrl }), _react2.default.createElement('div', { className: 'student-center-basic-detail' }, _react2.default.createElement('div', { className: 'name' }, state.nickName)), _react2.default.createElement('div', { className: 'menu-list-item-next icon-next' }))), _react2.default.createElement('div', { className: 'student-center-focus' }, _react2.default.createElement('div', {
                        className: 'student-center-focus-item',
                        onClick: this.clickFollow
                    }, _react2.default.createElement('div', { className: 'count' }, state.followClassNum), '关注'), _react2.default.createElement('div', {
                        className: 'student-center-focus-item',
                        onClick: this.clickCollect
                    }, _react2.default.createElement('div', { className: 'count' }, '0'), '收藏')), state.loading ? null : state.isTeacher ? _react2.default.createElement(_index.MenuList, null, _react2.default.createElement(_index2.default, {
                        next: '/mweb/classroom?id=' + state.classroom.classId,
                        menuClassName: 'student-center-room-entry',
                        title: _react2.default.createElement('div', { className: 'student-center-room-entry-basic' }, _react2.default.createElement(_index4.default, {
                            className: 'classroom-avatar',
                            src: state.classroom.headUrl,
                            isV: state.classroom.authStatus === _authStatus2.default.AUTHORIZED
                        }), state.classroom.name)
                    })) : _react2.default.createElement('a', { href: '/mweb/teacher/initialization/#/step-one' }, _react2.default.createElement('div', { className: 'student-center-join' }, _react2.default.createElement('div', { className: 'entry' }, '入驻微师\uFF0C立即拥有你的小课堂'))), _react2.default.createElement(_index.MenuList, null, _react2.default.createElement(_index2.default, {
                        title: '购买记录',
                        next: '/mweb/student/purchase'
                    }), _react2.default.createElement(_index2.default, {
                        title: '钱包',
                        next: '/mweb/fund/wallet',
                        content: '余额' + state.balance.toFixed(2) + '元'
                    })), _react2.default.createElement(_index.MenuList, null, _react2.default.createElement(_index2.default, {
                        title: '绑定手机号',
                        next: '/mweb/student/phone'
                    }), _react2.default.createElement(_index2.default, {
                        title: '客服',
                        next: '/mweb/student/custom'
                    })), _react2.default.createElement(_index8.default, {
                        key: 'home',
                        current: 'home'
                    }));
                }
            }
        ]);
        return Home;
    }(_PageController3.default);
    exports.default = Home;
    ;
});