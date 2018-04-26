define(function (require, exports) {
    'use strict';
    var _react = require('react');
    var _CommonController2 = require('common/controller/CommonController');
    var _zepto = require('zepto');
    (require('css-loader!./index.styl'))
    Object.defineProperty(exports, '__esModule', { value: true });
    var _react2 = _interopRequireDefault(_react);
    var _CommonController3 = _interopRequireDefault(_CommonController2);
    var _zepto2 = _interopRequireDefault(_zepto);
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
    var $body = (0, _zepto2.default)('body');
    var $html = (0, _zepto2.default)('html');
    var pageMain = (0, _zepto2.default)('#app');
    var lastScrollY = 0;
    var SlideInDialog = function (_CommonController) {
        _inherits(SlideInDialog, _CommonController);
        function SlideInDialog(props) {
            _classCallCheck(this, SlideInDialog);
            var _this = _possibleConstructorReturn(this, (SlideInDialog.__proto__ || Object.getPrototypeOf(SlideInDialog)).call(this, props));
            _this.closeHander = _this.closeHander.bind(_this);
            _this.state = { isShowDialog: false };
            return _this;
        }
        _createClass(SlideInDialog, [
            {
                key: 'componentDidMount',
                value: function componentDidMount() {
                    if (typeof this.props.onAfterOpenHandler === 'function') {
                        this.props.onAfterOpenHandler();
                    }
                    $body.attr('data-origin-overflow', $body.css('overflow'));
                    $html.attr('data-origin-overflow', $html.css('overflow'));
                    pageMain.attr('data-origin-overflow', pageMain.css('overflow'));
                    lastScrollY = window.scrollY;
                }
            },
            {
                key: 'componentWillReceiveProps',
                value: function componentWillReceiveProps(nextProps) {
                    var isShowDialog = nextProps.isShowDialog;
                    this.setState({ isShowDialog: isShowDialog });
                }
            },
            {
                key: 'componentDidUpdate',
                value: function componentDidUpdate() {
                    var isShowDialog = this.state.isShowDialog;
                    if (isShowDialog) {
                        this.onShowHandler();
                        return;
                    }
                    this.onHideHandler();
                }
            },
            {
                key: 'componentWillUnmount',
                value: function componentWillUnmount() {
                }
            },
            {
                key: 'onShowHandler',
                value: function onShowHandler() {
                    var innerHeight = window.innerHeight;
                    window.scrollTo(0, 0);
                    this.setCss($body, innerHeight + 'px', 'hidden');
                    this.setCss($html, innerHeight + 'px', 'hidden');
                }
            },
            {
                key: 'onHideHandler',
                value: function onHideHandler() {
                    window.scrollTo(0, lastScrollY);
                    this.setCss($html, 'initial', $html.attr('data-origin-overflow'));
                    this.setCss($body, 'initial', $body.attr('data-origin-overflow'));
                    this.setCss(pageMain, 'initial', pageMain.attr('data-origin-overflow'));
                }
            },
            {
                key: 'setCss',
                value: function setCss(dom, height, overflow) {
                    dom.css({
                        maxHeight: height,
                        overflow: overflow
                    });
                }
            },
            {
                key: 'closeHander',
                value: function closeHander(e) {
                    if (!(0, _zepto2.default)(e.target).hasClass('slide-dialog-mask')) {
                        return;
                    }
                    this.setState({ isShowDialog: false });
                    if (typeof this.props.onCloseHandler === 'function') {
                        this.props.onCloseHandler('cancel');
                    }
                }
            },
            {
                key: 'render',
                value: function render() {
                    var _props = this.props, portalClassName = _props.portalClassName, contentClassName = _props.contentClassName, children = _props.children, maskClassName = _props.maskClassName, shouldCloseOnMaskClick = _props.shouldCloseOnMaskClick;
                    var isShowDialog = this.state.isShowDialog;
                    return _react2.default.createElement('div', { className: portalClassName + ' ' + (!isShowDialog && 'hidden') }, _react2.default.createElement('div', {
                        className: 'slide-dialog-mask ' + (isShowDialog && 'on'),
                        style: { height: isShowDialog ? window.innerHeight : '0px' },
                        onClick: shouldCloseOnMaskClick && this.closeHander
                    }, _react2.default.createElement('div', { className: '' + contentClassName }, children)), _react2.default.createElement('div', { className: '' + maskClassName }));
                }
            }
        ]);
        return SlideInDialog;
    }(_CommonController3.default);
    SlideInDialog.propTypes = {
        isShowDialog: _react.PropTypes.bool,
        onCloseHandler: _react.PropTypes.func,
        children: _react.PropTypes.node.isRequired,
        portalClassName: _react.PropTypes.string,
        maskClassName: _react.PropTypes.string,
        contentClassName: _react.PropTypes.string,
        shouldCloseOnMaskClick: _react.PropTypes.bool,
        onAfterOpenHandler: _react.PropTypes.func
    };
    SlideInDialog.defaultProps = {
        isShowDialog: false,
        onCloseHandler: null,
        portalClassName: 'slide-dialog-wrapper',
        maskClassName: 'slide-mask-div',
        contentClassName: 'slide-dialog-content',
        shouldCloseOnMaskClick: true,
        onAfterOpenHandler: null
    };
    exports.default = SlideInDialog;
});