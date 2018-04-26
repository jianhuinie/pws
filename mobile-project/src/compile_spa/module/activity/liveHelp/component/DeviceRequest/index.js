define(function (require, exports) {
    'use strict';
    var _react = require('react');
    var lazyLoadImage = require('common/lazyLoadImage');
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
    var DeviceRequestContainer = function (_React$Component) {
        _inherits(DeviceRequestContainer, _React$Component);
        function DeviceRequestContainer() {
            _classCallCheck(this, DeviceRequestContainer);
            return _possibleConstructorReturn(this, (DeviceRequestContainer.__proto__ || Object.getPrototypeOf(DeviceRequestContainer)).apply(this, arguments));
        }
        _createClass(DeviceRequestContainer, [
            {
                key: 'componentDidMount',
                value: function componentDidMount() {
                    lazyLoadImage.init();
                }
            },
            {
                key: 'render',
                value: function render() {
                    return _react2.default.createElement('div', { className: 'livehelp-box-main livehelp-box-device-request' }, _react2.default.createElement('div', { className: 'livehelp-rule-title' }, '硬件要求'), _react2.default.createElement('div', { className: 'livehelp-rule-line' }), _react2.default.createElement('div', { className: 'livehelp-rule-box-sub' }, _react2.default.createElement('div', { className: 'livehelp-rule-box-sub-title livehelp-device-box-sub-title' }, '直播助手对网络的要求'), _react2.default.createElement('div', { className: 'livehelp-rule-box-sub-content' }, '优先使用有线网\uFF0C建议使用联通或电信2M带宽及以上独享网络\u3002低于2M的网络\uFF0C会影响上课品质\u3002跟谁学直播助手是您在电脑端上完成在线课程的学习工具\u3002'), _react2.default.createElement('div', { className: 'livehelp-rule-box-sub-title' }, '直播助手对电脑的配置要求'), _react2.default.createElement('div', { className: 'livehelp-rule-box-sub-content' }, '为确保直播助手能正常运行\uFF0C保证直播课上课品质\uFF0C您的电脑需满足以下最低系统需求\u3002')), _react2.default.createElement('img', {
                        className: 'livehelp-rule-pic livehelp-request-pic-one',
                        'data-src': 'https://imgs.genshuixue.com/0cms/d/file/content/2017/05/59154fcba669c.png'
                    }));
                }
            }
        ]);
        return DeviceRequestContainer;
    }(_react2.default.Component);
    ;
    exports.default = DeviceRequestContainer;
});