define(function (require, exports) {
    'use strict';
    var _react = require('react');
    var _config = require('./config');
    var lazyLoadImage = require('common/lazyLoadImage');
    (require('css-loader!./index.styl'))
    Object.defineProperty(exports, '__esModule', { value: true });
    var _react2 = _interopRequireDefault(_react);
    var _config2 = _interopRequireDefault(_config);
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
    var ItemCard = function (_React$Component) {
        _inherits(ItemCard, _React$Component);
        function ItemCard() {
            _classCallCheck(this, ItemCard);
            return _possibleConstructorReturn(this, (ItemCard.__proto__ || Object.getPrototypeOf(ItemCard)).apply(this, arguments));
        }
        _createClass(ItemCard, [
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
                    return _react2.default.createElement('div', { className: +item.rank_order < 4 ? _config2.default[+item.rank_order - 1].contentClassName : _config2.default[3].contentClassName }, _react2.default.createElement('div', { className: 'forward' }, _react2.default.createElement('img', {
                        'data-src': +item.rank_order < 4 ? _config2.default[+item.rank_order - 1].img : _config2.default[3].img,
                        className: +item.rank_order < 4 ? 'title-imgs' : 'hide'
                    }), _react2.default.createElement('span', { className: +item.rank_order < 4 ? _config2.default[+item.rank_order - 1].colorClassName + ' text' : _config2.default[3].colorClassName + ' text' }, item.rank_order)), _react2.default.createElement('div', { className: 'title-avatar-cover' }, _react2.default.createElement('img', { 'data-src': item.imgurl })), _react2.default.createElement('div', { className: 'item-content' }, _react2.default.createElement('div', { className: 'item-name line-clamp' }, item.name), _react2.default.createElement('div', { className: +item.rank_order < 4 ? _config2.default[+item.rank_order - 1].colorClassName + ' help-number' : _config2.default[3].colorClassName + ' help-number' }, _react2.default.createElement('i', { className: +item.rank_order < 4 ? _config2.default[+item.rank_order - 1].colorClassName + '-icon icon-two-people' : _config2.default[3].colorClassName + '-icon icon-two-people' }), _react2.default.createElement('div', { className: +item.rank_order < 4 ? _config2.default[+item.rank_order - 1].colorClassName + '-number number-people' : _config2.default[3].colorClassName + '-number number-people' }, _react2.default.createElement('span', { className: this.props.type === 'popular' ? 'text-t' : 'text-t hide' }, '助力人数: ', item.invite_count), _react2.default.createElement('span', { className: this.props.type === 'share' ? 'text-t' : 'text-t hide' }, '邀请人数: ', item.invite_count))), _react2.default.createElement('div', { className: this.props.type === 'share' ? 'coupon-content' : 'coupon-content hide' }, _react2.default.createElement('div', { className: +item.rank_order < 4 ? _config2.default[+item.rank_order - 1].colorClassName + '-money money' : _config2.default[3].colorClassName + '-money money' }, '\uFFE5 ', item.coupon_count), _react2.default.createElement('div', { className: +item.rank_order < 4 ? _config2.default[+item.rank_order - 1].colorClassName + '-money-text money-text' : _config2.default[3].colorClassName + '-money-text money-text' }, '优惠券'))));
                }
            }
        ]);
        return ItemCard;
    }(_react2.default.Component);
    ItemCard.propTypes = {
        item: _react.PropTypes.object.isRequired,
        type: _react.PropTypes.string.isRequired
    };
    ;
    exports.default = ItemCard;
});