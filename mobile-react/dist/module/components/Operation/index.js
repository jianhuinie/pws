define(function (require, exports) {
    'use strict';
    var _react = require('react');
    var _index = require('common/components/SlideInDialog/index');
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
            _this.toggleDialog = function () {
                var isShowDialog = _this.state.isShowDialog;
                _this.setState({ isShowDialog: !isShowDialog });
            };
            _this.closeDialog = function () {
                _this.setState({ isShowDialog: false });
            };
            _this.jumpTo = function () {
                location.href = '/mweb/teacher/manager/center';
            };
            _this.state = { isShowDialog: false };
            return _this;
        }
        _createClass(GuideDialog, [{
                key: 'render',
                value: function render() {
                    return _react2.default.createElement('div', { className: 'center-operate ' + (this.props.isShow ? '' : 'hide') }, _react2.default.createElement('div', {
                        className: 'center-operate-btn',
                        onClick: this.toggleDialog
                    }, _react2.default.createElement('div', { className: 'icon-operate' }), '操作'), _react2.default.createElement('div', { className: 'center-operate-wrapper ' + (this.state.isShowDialog ? '' : 'hide') }, _react2.default.createElement('div', { className: 'operation-component' }, _react2.default.createElement('div', {
                        className: 'operation-component-content',
                        onClick: this.jumpTo
                    }, _react2.default.createElement('div', { className: 'operation-item' }, _react2.default.createElement('div', { className: 'icon-room-manager operation-item-icon' }), _react2.default.createElement('div', { className: 'operation-item-desc' }, '课堂管理'))), _react2.default.createElement('div', {
                        onClick: this.closeDialog,
                        className: 'operation-component-close'
                    }, '取消')), _react2.default.createElement('div', {
                        className: 'center-operate-mask',
                        onClick: this.closeDialog
                    })));
                }
            }]);
        return GuideDialog;
    }(_react2.default.Component);
    GuideDialog.propTypes = { isShow: _react.PropTypes.bool };
    GuideDialog.defaultProps = { isShow: true };
    exports.default = GuideDialog;
});