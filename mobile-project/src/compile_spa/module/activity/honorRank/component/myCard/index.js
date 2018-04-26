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
    var MyItem = function (_React$Component) {
        _inherits(MyItem, _React$Component);
        function MyItem() {
            _classCallCheck(this, MyItem);
            return _possibleConstructorReturn(this, (MyItem.__proto__ || Object.getPrototypeOf(MyItem)).apply(this, arguments));
        }
        _createClass(MyItem, [
            {
                key: 'componentDidMount',
                value: function componentDidMount() {
                    lazyLoadImage.init();
                }
            },
            {
                key: 'render',
                value: function render() {
                    var item = this.props.item;
                    return _react2.default.createElement('div', { className: 'my-rank-card' }, _react2.default.createElement('div', { className: 'forward' }, _react2.default.createElement('div', { className: item.order ? 'order-text' : 'order-text hide' }, item.order), _react2.default.createElement('div', { className: !item.order ? 'order-text-small' : 'order-text-small hide' }, '暂无排名'), _react2.default.createElement('div', { className: item.order ? 'texts' : 'texts hide' }, '我的排名')), _react2.default.createElement('div', {
                        className: 'title-avatar-cover',
                        'data-src': item.img
                    }, _react2.default.createElement('img', { 'data-src': item.img })), _react2.default.createElement('div', { className: 'item-content' }, _react2.default.createElement('div', { className: 'item-name line-clamp' }, item.name), _react2.default.createElement('div', { className: 'help-number' }, _react2.default.createElement('i', { className: 'icon-two-people' }), _react2.default.createElement('span', { className: this.props.type === 'popular' ? 'number-people' : 'number-people hide' }, '助力人数: ', item.invite_count), _react2.default.createElement('span', { className: this.props.type === 'share' ? 'number-people' : 'number-people hide' }, '邀请人数: ', item.invite_count)), _react2.default.createElement('div', { className: this.props.type === 'share' ? 'coupon-content' : 'coupon-content hide' }, _react2.default.createElement('div', { className: 'coupon-money' }, '\uFFE5 ', item.coupon), _react2.default.createElement('div', { className: 'coupon-text' }, '优惠券'))));
                }
            }
        ]);
        return MyItem;
    }(_react2.default.Component);
    MyItem.propTypes = {
        item: _react.PropTypes.object.isRequired,
        type: _react.PropTypes.string.isRequired
    };
    ;
    exports.default = MyItem;
});