define(function (require, exports) {
    'use strict';
    var _react = require('react');
    var lazyLoadImage = require('common/lazyLoadImage');
    var APP = require('common/app');
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
    var OrderCard = function (_React$Component) {
        _inherits(OrderCard, _React$Component);
        function OrderCard(props) {
            _classCallCheck(this, OrderCard);
            var _this = _possibleConstructorReturn(this, (OrderCard.__proto__ || Object.getPrototypeOf(OrderCard)).call(this, props));
            _this.pay = _this.pay.bind(_this);
            return _this;
        }
        _createClass(OrderCard, [
            {
                key: 'componentDidMount',
                value: function componentDidMount() {
                    lazyLoadImage.init();
                }
            },
            {
                key: 'pay',
                value: function pay(event) {
                    var data = $(event.target).data('item');
                    if (data && data.purchase_id) {
                        if (APP.isApp()) {
                            APP.toThirdPartyPayment(data.purchase_id);
                        } else {
                            window.location.href = '/pay/payProductPurchase?purchase_id=' + data.purchase_id + '&success_url=' + encodeURIComponent(location.href);
                        }
                    }
                }
            },
            {
                key: 'render',
                value: function render() {
                    var self = this;
                    var data = self.props.item;
                    var dataStr = JSON.stringify(data);
                    return _react2.default.createElement('div', { className: 'order-card' }, _react2.default.createElement('div', { className: 'order-card-title' }, '支付订单'), _react2.default.createElement('div', { className: 'order-card-info' }, _react2.default.createElement('div', { className: 'order-card-avatar' }, _react2.default.createElement('img', {
                        'data-src': data.avatar,
                        alt: ''
                    })), _react2.default.createElement('div', { className: 'order-card-detail' }, _react2.default.createElement('p', { className: 'order-card-teacher ellipsis' }, data.teacher_name, ' - ', data.course_name), _react2.default.createElement('p', { className: 'order-card-price ellipsis' }, data.hours, '课时  共计:\uFFE5', data.total_money, '  实付:\uFFE5', data.pay_money))), _react2.default.createElement('div', {
                        className: 'order-card-btn',
                        'data-item': dataStr,
                        onClick: self.pay
                    }, '立即支付'));
                }
            }
        ]);
        return OrderCard;
    }(_react2.default.Component);
    exports.default = OrderCard;
});