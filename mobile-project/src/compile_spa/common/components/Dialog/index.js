define(function (require, exports) {
    'use strict';
    var _react = require('react');
    var _reactModal = require('react-modal');
    (require('css-loader!./index.styl'))
    Object.defineProperty(exports, '__esModule', { value: true });
    var _react2 = _interopRequireDefault(_react);
    var _reactModal2 = _interopRequireDefault(_reactModal);
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
    var Dialog = function (_React$Component) {
        _inherits(Dialog, _React$Component);
        function Dialog(props) {
            _classCallCheck(this, Dialog);
            var _this = _possibleConstructorReturn(this, (Dialog.__proto__ || Object.getPrototypeOf(Dialog)).call(this, props));
            _this.closeHander = _this.closeHander.bind(_this);
            _this.state = { isOpen: props.isShowDialog };
            return _this;
        }
        _createClass(Dialog, [
            {
                key: 'componentWillReceiveProps',
                value: function componentWillReceiveProps(nextProps) {
                    this.setState({ isOpen: nextProps.isShowDialog });
                }
            },
            {
                key: 'closeHander',
                value: function closeHander() {
                    this.setState({ isOpen: false });
                    if (typeof this.props.onCloseHandler === 'function') {
                        this.props.onCloseHandler('cancel');
                    }
                }
            },
            {
                key: 'render',
                value: function render() {
                    return _react2.default.createElement(_reactModal2.default, {
                        isOpen: this.state.isOpen,
                        onAfterOpen: this.props.onAfterOpenHandler,
                        onRequestClose: this.closeHander,
                        contentLabel: 'genshuixue',
                        portalClassName: this.props.portalClassName,
                        overlayClassName: this.props.overlayClassName,
                        className: this.props.dialogClassName,
                        shouldCloseOnOverlayClick: this.props.shouldCloseOnOverlayClick,
                        role: 'dialog',
                        parentSelector: function parentSelector() {
                            return document.body;
                        }
                    }, _react2.default.createElement('div', { className: 'header' }, _react2.default.createElement('i', {
                        className: 'icon-close',
                        onClick: this.closeHander
                    })), _react2.default.createElement('div', { className: 'body' }, this.props.children));
                }
            }
        ]);
        return Dialog;
    }(_react2.default.Component);
    Dialog.propTypes = {
        isShowDialog: _react.PropTypes.bool,
        onCloseHandler: _react.PropTypes.func,
        children: _react.PropTypes.node.isRequired,
        portalClassName: _react.PropTypes.string,
        overlayClassName: _react.PropTypes.string,
        dialogClassName: _react.PropTypes.string,
        shouldCloseOnOverlayClick: _react.PropTypes.bool,
        onAfterOpenHandler: _react.PropTypes.func
    };
    Dialog.defaultProps = {
        isShowDialog: false,
        onCloseHandler: null,
        portalClassName: 'dialog-wrapper',
        overlayClassName: 'overlay',
        dialogClassName: 'content',
        shouldCloseOnOverlayClick: true,
        onAfterOpenHandler: null
    };
    exports.default = Dialog;
});