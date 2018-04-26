define(function (require, exports) {
    'use strict';
    var _react = require('react');
    var open400TelDialog = require('common/openAppDialog/open400TelDialog');
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
    var FooterItem = function (_React$Component) {
        _inherits(FooterItem, _React$Component);
        function FooterItem(props) {
            _classCallCheck(this, FooterItem);
            var _this = _possibleConstructorReturn(this, (FooterItem.__proto__ || Object.getPrototypeOf(FooterItem)).call(this, props));
            _this.state = {
                showFooter: 0,
                title: props.title || '预约名师1对1',
                classEle: props.classEle || ''
            };
            _this.scrollTop = _this.scrollTop.bind(_this);
            _this.bindBottomCall = _this.bindBottomCall.bind(_this);
            return _this;
        }
        _createClass(FooterItem, [
            {
                key: 'componentDidMount',
                value: function componentDidMount() {
                    var self = this;
                    if (self.state.classEle) {
                        $(window).scroll(function () {
                            var classNameStr = self.state.classEle;
                            var topBtnOffset = $('.' + classNameStr).offset();
                            var scrollTop = $(window).scrollTop();
                            var baseWidth = 375;
                            var realWidth = $(window).width();
                            var offsetHeight = Math.ceil(48 * realWidth / baseWidth);
                            if (topBtnOffset) {
                                if (scrollTop > topBtnOffset.top + offsetHeight) {
                                    self.setState({ showFooter: 1 });
                                } else {
                                    self.setState({ showFooter: 0 });
                                }
                            }
                        });
                    }
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
                    var self = this;
                    return _react2.default.createElement('div', { className: self.state.showFooter ? 'footer-item-container' : 'footer-item-container hide' }, _react2.default.createElement('div', { className: 'footer no-fixed fixed-footer bottom' }, _react2.default.createElement('div', {
                        className: 'phone consult center analysis-habo-log',
                        'data-tel': '4000910910',
                        onClick: this.bindBottomCall
                    }, _react2.default.createElement('i', { className: 'icon-right-phone' }), _react2.default.createElement('p', { className: 'phone-title' }, '免费咨询')), _react2.default.createElement('div', {
                        className: 'free center',
                        onClick: this.scrollTop
                    }, self.state.title), _react2.default.createElement('div', { className: 'clear' })));
                }
            }
        ]);
        return FooterItem;
    }(_react2.default.Component);
    ;
    exports.default = FooterItem;
});