define(function (require, exports) {
    'use strict';
    var _react = require('react');
    var _ajaxService = require('common/util/ajaxService');
    var _ajaxConfig = require('common/ajaxConfig');
    var _authStatus = require('common/enum/authStatus');
    var _PageController2 = require('common/controller/PageController');
    var _index = require('module/components/Avatar/index');
    var _util = require('common/util/util');
    (require('css-loader!./index.styl'))
    Object.defineProperty(exports, '__esModule', { value: true });
    var _react2 = _interopRequireDefault(_react);
    var _ajaxService2 = _interopRequireDefault(_ajaxService);
    var _ajaxConfig2 = _interopRequireDefault(_ajaxConfig);
    var _authStatus2 = _interopRequireDefault(_authStatus);
    var _PageController3 = _interopRequireDefault(_PageController2);
    var _index2 = _interopRequireDefault(_index);
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
    var Center = function (_PageController) {
        _inherits(Center, _PageController);
        function Center(props) {
            _classCallCheck(this, Center);
            var _this = _possibleConstructorReturn(this, (Center.__proto__ || Object.getPrototypeOf(Center)).call(this, props));
            _this.getSummary = function () {
                _ajaxService2.default.get(_ajaxConfig2.default.CLASSROOM.GET_ROOM_SUMMARY).then(function (res) {
                    _this.setState({ roomInfo: res.data });
                });
            };
            _this.state = {
                roomInfo: {
                    headUrl: '',
                    name: '',
                    yesterdayFollowers: '',
                    totalFollowers: '',
                    yesterdayIncome: '',
                    authStatus: ''
                }
            };
            return _this;
        }
        _createClass(Center, [
            {
                key: 'componentDidMount',
                value: function componentDidMount() {
                    document.title = '课堂管理';
                    this.getSummary();
                    _util2.default.sharePage();
                }
            },
            {
                key: 'render',
                value: function render() {
                    return _react2.default.createElement('div', { className: 'manager-center' }, _react2.default.createElement('div', { className: 'manager-center-head' }, _react2.default.createElement('div', { className: 'manager-center-head-avatar' }, _react2.default.createElement(_index2.default, {
                        className: 'avatar',
                        src: this.state.roomInfo.headUrl,
                        isV: this.state.roomInfo.authStatus === _authStatus2.default.AUTHORIZED
                    })), _react2.default.createElement('div', { className: 'manager-center-head-detail' }, _react2.default.createElement('div', { className: 'room-name' }, this.state.roomInfo.name), this.state.roomInfo.authStatus !== _authStatus2.default.AUTHORIZED ? _react2.default.createElement('a', {
                        className: 'apply-link',
                        href: '/mweb/teacher/authentication'
                    }, _react2.default.createElement('div', { className: 'apply' }, '点击认证课堂')) : null), _react2.default.createElement('a', { href: '/mweb/teacher/manager/modify' }, _react2.default.createElement('div', { className: 'manager-center-head-next icon-next' }))), _react2.default.createElement('div', { className: 'manager-center-body' }, _react2.default.createElement('div', { className: 'manager-center-body-title' }, '最新数据'), _react2.default.createElement('div', { className: 'manager-center-body-content' }, _react2.default.createElement('div', { className: 'data-item' }, _react2.default.createElement('div', { className: 'value' }, this.state.roomInfo.yesterdayFollowers), _react2.default.createElement('div', { className: 'name' }, '昨日新增粉丝')), _react2.default.createElement('div', { className: 'data-item' }, _react2.default.createElement('div', { className: 'value' }, this.state.roomInfo.totalFollowers), _react2.default.createElement('div', { className: 'name' }, '累计粉丝')), _react2.default.createElement('div', { className: 'data-item' }, _react2.default.createElement('div', { className: 'value highlight' }, this.state.roomInfo.yesterdayIncome), _react2.default.createElement('div', { className: 'name' }, '昨日收益/元')))), _react2.default.createElement('div', { className: 'manager-center-tip' }, _react2.default.createElement('img', { src: 'https://imgs.genshuixue.com/0cms/d/file/content/2018/02/5a7d3624dfa26.png' })));
                }
            }
        ]);
        return Center;
    }(_PageController3.default);
    exports.default = Center;
    ;
});