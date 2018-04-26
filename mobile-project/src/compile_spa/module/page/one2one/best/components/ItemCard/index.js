define(function (require, exports) {
    'use strict';
    var _react = require('react');
    var _index = require('./components/Stars/index');
    var observer = require('common/mvc/observer');
    var LoginDialog = require('common/ui/LoginDialog/LoginDialog');
    var app = require('common/app');
    var user = require('common/user');
    var URL = require('util/url');
    var UTIL = require('common/util');
    var lazyLoadImage = require('common/lazyLoadImage');
    (require('css-loader!./index.styl'))
    Object.defineProperty(exports, '__esModule', { value: true });
    var _react2 = _interopRequireDefault(_react);
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
    var ListItem = function (_React$Component) {
        _inherits(ListItem, _React$Component);
        function ListItem(props) {
            _classCallCheck(this, ListItem);
            var _this = _possibleConstructorReturn(this, (ListItem.__proto__ || Object.getPrototypeOf(ListItem)).call(this, props));
            _this.state = { item: _this.props.item };
            return _this;
        }
        _createClass(ListItem, [
            {
                key: 'componentWillReceiveProps',
                value: function componentWillReceiveProps(nextProps) {
                    this.setState({ item: nextProps.item });
                }
            },
            {
                key: 'componentDidUpdate',
                value: function componentDidUpdate() {
                    lazyLoadImage.init();
                }
            },
            {
                key: 'login',
                value: function login(number) {
                    var self = this;
                    if (app.isStudentApp()) {
                        self.appLogin(number);
                    } else {
                        self.browerLogin(number);
                    }
                }
            },
            {
                key: 'appLogin',
                value: function appLogin(number) {
                    var self = this;
                    var callbackFun = function callbackFun() {
                        self.goToTeacherDetail(number);
                    };
                    user.loginStudent(callbackFun);
                }
            },
            {
                key: 'browerLogin',
                value: function browerLogin(number) {
                    var self = this;
                    var loginDialog = new LoginDialog();
                    loginDialog.show();
                    var listener1 = observer.addListener(loginDialog, 'success', function () {
                        self.goToTeacherDetail(number);
                    });
                    var listener2 = observer.addListener(loginDialog, 'display_changed', function () {
                        var display = this.get('display');
                        if (!display) {
                            observer.removeListener(listener1);
                            observer.removeListener(listener2);
                            loginDialog.destroy();
                        }
                    });
                }
            },
            {
                key: 'goToTeacherDetail',
                value: function goToTeacherDetail(number) {
                    var url = location.origin + '/one-on-one-course/get?number=' + number;
                    if (UTIL.platform.isIOS() && app.isWeixin()) {
                        url += '&srcUrl=' + encodeURIComponent(URL().hash);
                    }
                    window.location.href = url;
                }
            },
            {
                key: 'jumptoDetail',
                value: function jumptoDetail(number) {
                    var self = this;
                    if (app.isStudentApp()) {
                        self.login(number);
                    } else if (window.gsx_ready) {
                        window.gsx_ready(function (config) {
                            if (config && config.user && config.user.id) {
                                self.goToTeacherDetail(number);
                            } else {
                                setTimeout(function () {
                                    self.login(number);
                                });
                            }
                        });
                    } else {
                        setTimeout(function () {
                            self.login(number);
                        });
                    }
                }
            },
            {
                key: 'render',
                value: function render() {
                    var self = this;
                    var lessonWay = [
                        '',
                        '',
                        '可线上授课'
                    ];
                    return _react2.default.createElement('div', {
                        className: 'card',
                        onClick: self.jumptoDetail.bind(self, self.state.item.number)
                    }, _react2.default.createElement('div', { className: 'avatar' }, _react2.default.createElement('img', { 'data-src': this.state.item.avatar })), _react2.default.createElement('div', { className: 'name-content' }, _react2.default.createElement('span', { className: 'name' }, this.state.item.name), _react2.default.createElement('span', { className: 'icons' }, '优选')), _react2.default.createElement('div', { className: 'stars' }, _react2.default.createElement(_index2.default, { number: +this.state.item.stars }), _react2.default.createElement('span', { className: 'hours' }, '授课', this.state.item.hours, '小时')), _react2.default.createElement('div', { className: 'tabs' }, this.state.item.tag.map(function (item, index) {
                        return _react2.default.createElement('span', {
                            key: index.number,
                            className: 'tab-item'
                        }, item.name);
                    })), _react2.default.createElement('div', { className: 'remark line-clamp' }, this.state.item.short_introduce), _react2.default.createElement('div', { className: 'item-right-content' }, _react2.default.createElement('div', { className: 'price-content' }, _react2.default.createElement('span', { className: 'price' }, '\uFFE5', this.state.item.price), _react2.default.createElement('span', { className: 'texts' }, '起/时')), _react2.default.createElement('div', { className: this.state.item.area ? 'line-clamp area' : 'line-clamp area hide' }, this.state.item.area), _react2.default.createElement('div', { className: this.state.item.distance ? 'distance line-clamp' : 'distance line-clamp hide' }, this.state.item.distance), _react2.default.createElement('div', { className: 'lessonWay' }, lessonWay[this.state.item.lesson_way])));
                }
            }
        ]);
        return ListItem;
    }(_react2.default.Component);
    ListItem.propTypes = { item: _react.PropTypes.object.isRequired };
    exports.default = ListItem;
});