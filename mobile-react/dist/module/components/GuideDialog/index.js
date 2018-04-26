define(function (require, exports) {
    'use strict';
    var _react = require('react');
    var _index = require('common/components/Dialog/index');
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
    var GuideDialog = function (_React$Component) {
        _inherits(GuideDialog, _React$Component);
        function GuideDialog(props) {
            _classCallCheck(this, GuideDialog);
            var _this = _possibleConstructorReturn(this, (GuideDialog.__proto__ || Object.getPrototypeOf(GuideDialog)).call(this, props));
            _this.closeGuideDialog = function () {
                _this.setState({ isShowDialog: false });
            };
            _this.state = { isShowDialog: props.isShowDialog };
            return _this;
        }
        _createClass(GuideDialog, [
            {
                key: 'componentWillReceiveProps',
                value: function componentWillReceiveProps(nextProps) {
                    this.setState({ isShowDialog: nextProps.isShowDialog });
                }
            },
            {
                key: 'render',
                value: function render() {
                    return _react2.default.createElement(_index2.default, {
                        shouldCloseOnOverlayClick: false,
                        dialogClassName: 'guide-dialog',
                        isShowDialog: this.state.isShowDialog,
                        isHiddenClose: Boolean(true)
                    }, _react2.default.createElement('div', { className: 'new-guide' }, _react2.default.createElement('div', { className: this.props.isAuth ? 'hide' : 'new-guide-desc' }, '点击操作\uFF0C进入课堂管理,', _react2.default.createElement('br', null), '进行实名加V认证\u3002'), _react2.default.createElement('div', { className: this.props.isAuth ? 'new-guide-desc' : 'hide' }, '点击操作\uFF0C进入课堂管理\u3002'), _react2.default.createElement('div', { className: 'new-guide-arrow icon-arrow-right-bottom' }), _react2.default.createElement('div', { className: 'new-guide-operate' }, _react2.default.createElement('div', { className: 'new-guide-operate-btn' }, _react2.default.createElement('div', { className: 'icon-operate' }), '操作')), _react2.default.createElement('div', {
                        onClick: this.closeGuideDialog,
                        className: 'new-guide-close'
                    }, '我知道了')));
                }
            }
        ]);
        return GuideDialog;
    }(_react2.default.Component);
    GuideDialog.propTypes = { isShowDialog: _react.PropTypes.bool };
    GuideDialog.defaultProps = { isShowDialog: true };
    exports.default = GuideDialog;
});