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
    var LiveRuleContainer = function (_React$Component) {
        _inherits(LiveRuleContainer, _React$Component);
        function LiveRuleContainer() {
            _classCallCheck(this, LiveRuleContainer);
            return _possibleConstructorReturn(this, (LiveRuleContainer.__proto__ || Object.getPrototypeOf(LiveRuleContainer)).apply(this, arguments));
        }
        _createClass(LiveRuleContainer, [
            {
                key: 'componentDidMount',
                value: function componentDidMount() {
                    lazyLoadImage.init();
                }
            },
            {
                key: 'render',
                value: function render() {
                    return _react2.default.createElement('div', { className: 'livehelp-box-main livehelp-box-main-rule' }, _react2.default.createElement('div', { className: 'livehelp-rule-title' }, '直播须知'), _react2.default.createElement('div', { className: 'livehelp-rule-line' }), _react2.default.createElement('div', { className: 'livehelp-rule-box-sub' }, _react2.default.createElement('div', { className: 'livehelp-rule-box-sub-title' }, '跟谁学直播助手是做什么的\uFF1F'), _react2.default.createElement('div', { className: 'livehelp-rule-box-sub-content' }, '跟谁学直播助手是您在电脑上完成在线课程的学习工具\u3002'), _react2.default.createElement('div', { className: 'livehelp-rule-box-sub-title' }, '使用直播助手需要什么设备\uFF1F'), _react2.default.createElement('div', { className: 'livehelp-rule-box-sub-content' }, '您需要一台笔记本电脑 或 一台台式电脑 +带麦克风的耳机+ 摄像头\u3002'), _react2.default.createElement('div', { className: 'livehelp-rule-box-sub-title' }, '直播助手在哪里下载\uFF1F'), _react2.default.createElement('div', { className: 'livehelp-rule-box-sub-content' }, '通过电脑端访问跟谁学官网 www.genshuixue.com , 在官网首页上即可下载直播助手客户端\u3002')), _react2.default.createElement('img', {
                        className: 'livehelp-rule-pic livehelp-big-one-pic',
                        'data-src': 'https://imgs.genshuixue.com/0cms/d/file/content/2017/05/59154b560ea4d.png'
                    }), _react2.default.createElement('div', { className: 'livehelp-rule-box-sub' }, _react2.default.createElement('div', { className: 'livehelp-rule-box-sub-title' }, '直播助手如何安装\uFF1F'), _react2.default.createElement('div', { className: 'livehelp-rule-box-sub-content-2' }, _react2.default.createElement('span', { className: 'livehelp-rule-box-sub-circle' }), 'Windows版直播助手\uFF0C双击下载的压缩文件gsxliveclient.zip 解压\u3002若没有解压工具\uFF0C可通过百度搜索\u201C解压软件\u201D即可下载并安装\u3002通过解压工具解压后\uFF0C再点击直播助手文件\uFF0C按照安装流程操作即可\u3002'), _react2.default.createElement('div', { className: 'livehelp-rule-box-sub-content-2' }, _react2.default.createElement('span', { className: 'livehelp-rule-box-sub-circle' }), 'Mac版直播助手\uFF0C双击 gsxclientmac.dmg 文件后\uFF0C按照安装流程操作即可\u3002')), _react2.default.createElement('img', {
                        className: 'livehelp-rule-pic livehelp-big-two-pic',
                        'data-src': 'https://imgs.genshuixue.com/0cms/d/file/content/2017/05/59154c00e59d7.png'
                    }));
                }
            }
        ]);
        return LiveRuleContainer;
    }(_react2.default.Component);
    ;
    exports.default = LiveRuleContainer;
});