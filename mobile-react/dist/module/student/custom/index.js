define(function (require, exports) {
    'use strict';
    var _react = require('react');
    var _reactRouter = require('react-router');
    var _ajaxService = require('common/util/ajaxService');
    var _ajaxConfig = require('common/ajaxConfig');
    var _PageController2 = require('common/controller/PageController');
    var _util = require('common/util/util');
    (require('css-loader!./index.styl'))
    Object.defineProperty(exports, '__esModule', { value: true });
    var _react2 = _interopRequireDefault(_react);
    var _ajaxService2 = _interopRequireDefault(_ajaxService);
    var _ajaxConfig2 = _interopRequireDefault(_ajaxConfig);
    var _PageController3 = _interopRequireDefault(_PageController2);
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
    var Custom = function (_PageController) {
        _inherits(Custom, _PageController);
        function Custom(props) {
            _classCallCheck(this, Custom);
            var _this = _possibleConstructorReturn(this, (Custom.__proto__ || Object.getPrototypeOf(Custom)).call(this, props));
            _this.goBack = function () {
                _reactRouter.hashHistory.goBack();
            };
            _this.state = { qrcodeUrl: '' };
            return _this;
        }
        _createClass(Custom, [
            {
                key: 'componentDidMount',
                value: function componentDidMount() {
                    var _this2 = this;
                    document.title = '联系客服';
                    _ajaxService2.default.get(_ajaxConfig2.default.CLASSROOM.GET_CUSTOM_INFO).then(function (res) {
                        _this2.setState({ qrcodeUrl: res.data.qrcodeUrl });
                    });
                    _util2.default.sharePage();
                }
            },
            {
                key: 'render',
                value: function render() {
                    return _react2.default.createElement('div', { className: 'contact-custom' }, _react2.default.createElement('div', { className: 'contact-custom-qrcode' }, _react2.default.createElement('img', { src: this.state.qrcodeUrl })), _react2.default.createElement('div', { className: 'contact-custom-title' }, '联系客服'), _react2.default.createElement('div', { className: 'contact-custom-desc' }, '长按扫码添加客服\uFF0C添加时请备注咨询事项\u3002'), _react2.default.createElement('button', {
                        className: 'ws-btn-red contact-custom-back',
                        onClick: this.goBack
                    }, '返回'), _react2.default.createElement('a', { href: '/mweb/discovery' }, _react2.default.createElement('button', { className: 'ws-btn-default contact-custom-home' }, '回到首页')));
                }
            }
        ]);
        return Custom;
    }(_PageController3.default);
    exports.default = Custom;
    ;
});