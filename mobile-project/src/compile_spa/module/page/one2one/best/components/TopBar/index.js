define(function (require, exports) {
    'use strict';
    var _react = require('react');
    var navBar = require('common/navBar');
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
    var TopBar = function (_React$Component) {
        _inherits(TopBar, _React$Component);
        function TopBar(props) {
            _classCallCheck(this, TopBar);
            var _this = _possibleConstructorReturn(this, (TopBar.__proto__ || Object.getPrototypeOf(TopBar)).call(this, props));
            _this.state = {};
            return _this;
        }
        _createClass(TopBar, [
            {
                key: 'componentDidMount',
                value: function componentDidMount() {
                    lazyLoadImage.init();
                    navBar.init();
                }
            },
            {
                key: 'render',
                value: function render() {
                    var self = this;
                    var changeCityUrl = location.origin + '/static/changeCity' + '?redirectUrl=' + encodeURIComponent(location.href);
                    return _react2.default.createElement('div', { className: self.props.isShow ? 'one-top-bar' : 'one-top-bar hide' }, _react2.default.createElement('div', { className: 'change-city' }, _react2.default.createElement('div', { className: 'top-bar-logo' }, _react2.default.createElement('img', { 'data-src': 'https://imgs.genshuixue.com/0cms/d/file/content/2017/04/5902a4d0a855c.png' })), _react2.default.createElement('a', { href: changeCityUrl }, _react2.default.createElement('span', null, self.props.cityName), _react2.default.createElement('span', { className: 'staticv2_index icon-angle-down' }))), _react2.default.createElement('span', { className: 'menu-nav-button' }, _react2.default.createElement('i', { className: 'icon icon-menu' })));
                }
            }
        ]);
        return TopBar;
    }(_react2.default.Component);
    exports.default = TopBar;
});