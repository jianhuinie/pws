define(function (require, exports) {
    'use strict';
    var _react = require('react');
    var _index = require('compile_spa/module/page/one2one/best/components/FooterItem/index');
    var open400TelDialog = require('common/openAppDialog/open400TelDialog');
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
    var DetailFooter = function (_React$Component) {
        _inherits(DetailFooter, _React$Component);
        function DetailFooter(props) {
            _classCallCheck(this, DetailFooter);
            var _this = _possibleConstructorReturn(this, (DetailFooter.__proto__ || Object.getPrototypeOf(DetailFooter)).call(this, props));
            _this.state = { showKefuIcon: 1 };
            _this.scrollTop = _this.scrollTop.bind(_this);
            _this.bindBottomCall = _this.bindBottomCall.bind(_this);
            return _this;
        }
        _createClass(DetailFooter, [
            {
                key: 'componentDidMount',
                value: function componentDidMount() {
                    var self = this;
                    lazyLoadImage.init();
                    $(window).scroll(function () {
                        var topBtnOffset = $('.one-to-one-post').offset();
                        var scrollTop = $(window).scrollTop();
                        var baseWidth = 375;
                        var realWidth = $(window).width();
                        var offsetHeight = Math.ceil(48 * realWidth / baseWidth);
                        if (topBtnOffset) {
                            if (scrollTop > topBtnOffset.top + offsetHeight) {
                                self.setState({ showKefuIcon: 0 });
                            } else {
                                self.setState({ showKefuIcon: 1 });
                            }
                        }
                    });
                }
            },
            {
                key: 'bindBottomCall',
                value: function bindBottomCall() {
                    open400TelDialog.makePhoneCall('4000910910');
                }
            },
            {
                key: 'scrollTop',
                value: function scrollTop() {
                    $(window).scrollTop(0);
                }
            },
            {
                key: 'render',
                value: function render() {
                    return _react2.default.createElement('div', null, _react2.default.createElement('div', { className: 'footer-container' }, _react2.default.createElement('img', {
                        className: 'footer-back',
                        'data-src': 'https://imgs.genshuixue.com/0cms/d/file/content/2017/05/590af1d43cdcb.png'
                    }), _react2.default.createElement('div', { className: 'back-box' }, _react2.default.createElement('p', { className: 'small-title center' }, '全球好老师数量遥遥领先的'), _react2.default.createElement('p', { className: 'title center' }, '找好老师学习服务平台'), _react2.default.createElement('div', { className: 'number-box' }, _react2.default.createElement('div', { className: 'box' }, _react2.default.createElement('p', { className: 'number center' }, '60万+'), _react2.default.createElement('p', { className: 'exp center' }, '认证老师')), _react2.default.createElement('div', { className: 'box' }, _react2.default.createElement('p', { className: 'number center' }, '8000万+'), _react2.default.createElement('p', { className: 'exp center' }, '用户')), _react2.default.createElement('div', { className: 'box' }, _react2.default.createElement('p', { className: 'number center' }, '400+'), _react2.default.createElement('p', { className: 'exp center' }, '城市')))), _react2.default.createElement(_index2.default, {
                        title: '预约名师试听课',
                        classEle: 'one-to-one-post'
                    })), _react2.default.createElement('div', {
                        className: this.state.showKefuIcon ? 'contact-kefu' : 'contact-kefu hide',
                        onClick: this.bindBottomCall
                    }, _react2.default.createElement('i', { className: 'icon-cellphone' }), _react2.default.createElement('span', {
                        className: 'contact-phone phone',
                        'data-tel': '4000910910'
                    }, '联系客服')));
                }
            }
        ]);
        return DetailFooter;
    }(_react2.default.Component);
    ;
    exports.default = DetailFooter;
});