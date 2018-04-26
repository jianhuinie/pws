define(function (require, exports) {
    'use strict';
    var _react = require('react');
    var _PageController2 = require('common/controller/PageController');
    var _index = require('../CarouselCardItem/index');
    var _dragula = require('dragula');
    var _antd = require('antd');
    (require('css-loader!./index.styl'))
    Object.defineProperty(exports, '__esModule', { value: true });
    var _react2 = _interopRequireDefault(_react);
    var _PageController3 = _interopRequireDefault(_PageController2);
    var _index2 = _interopRequireDefault(_index);
    var _dragula2 = _interopRequireDefault(_dragula);
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
    var CarouselCard = function (_PageController) {
        _inherits(CarouselCard, _PageController);
        function CarouselCard() {
            var _ref;
            var _temp, _this, _ret;
            _classCallCheck(this, CarouselCard);
            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }
            return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = CarouselCard.__proto__ || Object.getPrototypeOf(CarouselCard)).call.apply(_ref, [this].concat(args))), _this), _this.handleDrag = function (carousleCard) {
                var me = _this;
                if (carousleCard) {
                    var options = {
                        accepts: function accepts(el, target, source, sibling) {
                            if (sibling) {
                                me.props.onChangeSeq(Number(el.id), Number(sibling.id));
                            } else {
                                me.props.onChangeSeq(Number(el.id), undefined);
                            }
                            return true;
                        }
                    };
                    (0, _dragula2.default)([carousleCard], options);
                }
            }, _temp), _possibleConstructorReturn(_this, _ret);
        }
        _createClass(CarouselCard, [{
                key: 'render',
                value: function render() {
                    var _this2 = this;
                    return _react2.default.createElement('div', { className: 'carousel-card' }, _react2.default.createElement('div', { className: 'carousel-card-title' }, '课堂轮播图'), _react2.default.createElement('div', {
                        className: 'carousel-card-items',
                        ref: this.handleDrag
                    }, this.props.list ? this.props.list.map(function (item) {
                        return _react2.default.createElement(_index2.default, {
                            key: item.bannerId,
                            item: item,
                            onChange: _this2.props.onChange,
                            onDelete: _this2.props.onDelete
                        });
                    }) : null), _react2.default.createElement('div', { className: 'carousel-card-add' }, _react2.default.createElement(_antd.Button, {
                        className: this.props.list.length > 7 ? 'carousel-card-add-button white-btn classic-btn disabled' : 'carousel-card-add-button white-btn classic-btn',
                        onClick: this.props.onAdd
                    }, '添加课堂轮播图'), _react2.default.createElement('span', { className: 'carousel-card-add-tip' }, '最多添加8张')));
                }
            }]);
        return CarouselCard;
    }(_PageController3.default);
    CarouselCard.propTypes = {
        list: _react.PropTypes.array,
        onChange: _react.PropTypes.func,
        onDelete: _react.PropTypes.func,
        onAdd: _react.PropTypes.func,
        onChangeSeq: _react.PropTypes.func
    };
    exports.default = CarouselCard;
});