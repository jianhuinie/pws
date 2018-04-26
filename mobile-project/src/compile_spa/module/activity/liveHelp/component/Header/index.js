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
    var HeaderContainer = function (_React$Component) {
        _inherits(HeaderContainer, _React$Component);
        function HeaderContainer() {
            _classCallCheck(this, HeaderContainer);
            return _possibleConstructorReturn(this, (HeaderContainer.__proto__ || Object.getPrototypeOf(HeaderContainer)).apply(this, arguments));
        }
        _createClass(HeaderContainer, [
            {
                key: 'componentDidMount',
                value: function componentDidMount() {
                    lazyLoadImage.init();
                }
            },
            {
                key: 'render',
                value: function render() {
                    return _react2.default.createElement('div', { className: 'livehelp-header' }, _react2.default.createElement('img', {
                        className: 'livehelp-header-img',
                        'data-src': 'https://imgs.genshuixue.com/0cms/d/file/content/2017/05/59152fe16369a.png'
                    }), _react2.default.createElement('img', {
                        className: 'livehelp-logo',
                        'data-src': 'https://imgs.genshuixue.com/0cms/d/file/content/2017/05/5915305560f44.png'
                    }), _react2.default.createElement('div', { className: 'livehelp-text-title' }, _react2.default.createElement('div', { className: 'livehelp-text-title-main' }, '跟谁学直播助手'), _react2.default.createElement('div', { className: 'livehelp-text-title-sub' }, '使用指南')));
                }
            }
        ]);
        return HeaderContainer;
    }(_react2.default.Component);
    ;
    exports.default = HeaderContainer;
});