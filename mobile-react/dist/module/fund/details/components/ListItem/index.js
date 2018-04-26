define(function (require, exports) {
    'use strict';
    var _react = require('react');
    var _walletDetailType = require('common/enum/walletDetailType');
    var _moment = require('moment');
    (require('css-loader!./index.styl'))
    Object.defineProperty(exports, '__esModule', { value: true });
    var _react2 = _interopRequireDefault(_react);
    var _moment2 = _interopRequireDefault(_moment);
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
    var ListItem = function (_React$Component) {
        _inherits(ListItem, _React$Component);
        function ListItem() {
            var _ref;
            var _temp, _this, _ret;
            _classCallCheck(this, ListItem);
            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }
            return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ListItem.__proto__ || Object.getPrototypeOf(ListItem)).call.apply(_ref, [this].concat(args))), _this), _this.getTypeText = function (type) {
                switch (type) {
                case _walletDetailType.walletTypeEnum.LIVE:
                    return '直播';
                case _walletDetailType.walletTypeEnum.RELAY:
                    return '视频';
                case _walletDetailType.walletTypeEnum.SERIES:
                    return '系列';
                default:
                    return '';
                }
            }, _temp), _possibleConstructorReturn(_this, _ret);
        }
        _createClass(ListItem, [{
                key: 'render',
                value: function render() {
                    var props = this.props;
                    var typeText = this.getTypeText(this.props.type);
                    var isNegative = [
                        _walletDetailType.walletTypeEnum.WITHDRAW,
                        _walletDetailType.walletTypeEnum.FEE
                    ].indexOf(props.type) > -1;
                    return _react2.default.createElement('div', { className: 'detail-item' }, _react2.default.createElement('div', { className: 'detail-item-top' }, _react2.default.createElement('div', { className: 'remark' }, typeText ? _react2.default.createElement('div', { className: 'remark-type' }, typeText) : '', _react2.default.createElement('div', { className: 'remark-text' }, props.remark)), _react2.default.createElement('div', { className: 'price ' + (isNegative ? 'negative' : 'positive') }, props.money.toFixed(2))), _react2.default.createElement('div', { className: 'detail-item-body' }, (0, _moment2.default)(props.time).format('YYYY-MM-DD HH:mm')));
                }
            }]);
        return ListItem;
    }(_react2.default.Component);
    ListItem.propTypes = {
        id: _react.PropTypes.number.isRequired,
        type: _react.PropTypes.number.isRequired,
        remark: _react.PropTypes.string.isRequired,
        money: _react.PropTypes.number.isRequired,
        time: _react.PropTypes.number.isRequired
    };
    exports.default = ListItem;
});