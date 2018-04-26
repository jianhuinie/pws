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
    var ProcessContainer = function (_React$Component) {
        _inherits(ProcessContainer, _React$Component);
        function ProcessContainer() {
            _classCallCheck(this, ProcessContainer);
            return _possibleConstructorReturn(this, (ProcessContainer.__proto__ || Object.getPrototypeOf(ProcessContainer)).apply(this, arguments));
        }
        _createClass(ProcessContainer, [
            {
                key: 'componentDidMount',
                value: function componentDidMount() {
                    lazyLoadImage.init();
                }
            },
            {
                key: 'render',
                value: function render() {
                    return _react2.default.createElement('div', { className: 'livehelp-box-main livehelp-box-main-process' }, _react2.default.createElement('div', { className: 'livehelp-rule-title' }, '检测流程'), _react2.default.createElement('div', { className: 'livehelp-rule-line' }), _react2.default.createElement('div', { className: 'livehelp-process' }, _react2.default.createElement('div', { className: 'livehelp-process-content' }, '1. 打开直播助手登录学生账号\uFF0C若不记得密码可以通过\u201C手机动态码登录\u201D\uFF0C若没有注册可以登录官网注册\u3002'), _react2.default.createElement('img', {
                        className: 'livehelp-rule-pic livehelp-process-pic-one',
                        'data-src': 'https://imgs.genshuixue.com/0cms/d/file/content/2017/05/59154cfb356e2.png'
                    })), _react2.default.createElement('div', { className: 'livehelp-process' }, _react2.default.createElement('div', { className: 'livehelp-process-content' }, '2. 进入直播助手\uFF0C点击体验教室\uFF08仅限老师端\uFF09或某门正在直播的课程 \u201C进入课堂\u201D 按钮\u3002'), _react2.default.createElement('img', {
                        className: 'livehelp-rule-pic livehelp-process-pic-two',
                        'data-src': 'https://imgs.genshuixue.com/0cms/d/file/content/2017/05/59154e0a8ddcb.png'
                    })), _react2.default.createElement('div', { className: 'livehelp-process' }, _react2.default.createElement('div', { className: 'livehelp-process-content' }, '3. 点击左下角的\u201C设备检测\u201D按钮开始音视频设备检测\u3002'), _react2.default.createElement('img', {
                        className: 'livehelp-rule-pic',
                        'data-src': 'https://imgs.genshuixue.com/0cms/d/file/content/2017/05/59154e462fb7a.png'
                    })), _react2.default.createElement('div', { className: 'livehelp-process' }, _react2.default.createElement('div', { className: 'livehelp-process-title' }, '4. 检测扬声器'), _react2.default.createElement('div', { className: 'livehelp-process-content-2' }, '系统会播放一段音乐\uFF0C如果可以听到\uFF0C说明扬声器工作正常\uFF1B如果听不到\uFF0C请按照界面提示进行操作或求助技术支持\u3002'), _react2.default.createElement('img', {
                        className: 'livehelp-rule-pic livehelp-process-pic-three',
                        'data-src': 'https://imgs.genshuixue.com/0cms/d/file/content/2017/05/59154e9f017b8.png'
                    })), _react2.default.createElement('div', { className: 'livehelp-process' }, _react2.default.createElement('div', { className: 'livehelp-process-title' }, '5. 检测麦克风'), _react2.default.createElement('div', { className: 'livehelp-process-content-2' }, '请对着麦克风讲话\uFF0C当听到自己的回声或界面提示成功检测到声音输入\uFF0C说明麦克风工作正常\uFF1B如果提示未检测到声音输入\uFF0C请按照界面提示进行操作或求助技术支持\u3002'), _react2.default.createElement('img', {
                        className: 'livehelp-rule-pic livehelp-process-pic-four',
                        'data-src': 'https://imgs.genshuixue.com/0cms/d/file/content/2017/05/59154ed1975b6.png'
                    })), _react2.default.createElement('div', { className: 'livehelp-process' }, _react2.default.createElement('div', { className: 'livehelp-process-title' }, '6. 检测摄像头'), _react2.default.createElement('div', { className: 'livehelp-process-content-2' }, '此时直播助手会打开摄像头\uFF0C如果可以看到画面无异常\uFF0C说明摄像头工作正常\uFF1B如果显示黑屏\uFF0C请检查摄像头连接驱动\uFF1B如果提示被占用\uFF0C请关闭正在使用摄像头的软件\uFF0C重新进行检测\uFF0C或请按照界面提示进行操作或求助技术支持\u3002'), _react2.default.createElement('img', {
                        className: 'livehelp-rule-pic livehelp-process-pic-five',
                        'data-src': 'https://imgs.genshuixue.com/0cms/d/file/content/2017/05/59154f0c4b8b4.png'
                    })), _react2.default.createElement('div', { className: 'livehelp-process' }, _react2.default.createElement('div', { className: 'livehelp-process-title' }, '检测遇到问题怎么办\uFF1F'), _react2.default.createElement('div', { className: 'livehelp-process-content-2' }, '当您使用直播助手遇到问题时\uFF0C请点击直播助手教室右下角"求助"按钮\uFF0C我们的技术支持人员将与您连线远程协助\u3002'), _react2.default.createElement('img', {
                        className: 'livehelp-rule-pic',
                        'data-src': 'https://imgs.genshuixue.com/0cms/d/file/content/2017/05/59154f3ca2816.png'
                    })));
                }
            }
        ]);
        return ProcessContainer;
    }(_react2.default.Component);
    ;
    exports.default = ProcessContainer;
});