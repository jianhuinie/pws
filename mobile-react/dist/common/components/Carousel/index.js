define(function (require, exports) {
    'use strict';
    var _swiper = require('swiper');
    var _react = require('react');
    var _PageController2 = require('common/controller/PageController');
    (require('css-loader!./index.styl'))
    Object.defineProperty(exports, '__esModule', { value: true });
    var _swiper2 = _interopRequireDefault(_swiper);
    var _react2 = _interopRequireDefault(_react);
    var _PageController3 = _interopRequireDefault(_PageController2);
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
    var Carousel = function (_PageController) {
        _inherits(Carousel, _PageController);
        function Carousel() {
            var _ref;
            var _temp, _this, _ret;
            _classCallCheck(this, Carousel);
            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }
            return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Carousel.__proto__ || Object.getPrototypeOf(Carousel)).call.apply(_ref, [this].concat(args))), _this), _this.jump = function (e) {
                var url = $(e.target).data('url');
                if (url) {
                    location.href = url;
                }
            }, _temp), _possibleConstructorReturn(_this, _ret);
        }
        _createClass(Carousel, [
            {
                key: 'componentDidUpdate',
                value: function componentDidUpdate() {
                    var me = this;
                    this.swiper = new _swiper2.default('.swiper-container', {
                        initialSlide: me.props.initialSlide,
                        autoplay: 3000,
                        loop: true,
                        pagination: '.swiper-pagination',
                        onSlideChangeEnd: function onSlideChangeEnd(swiper) {
                            var fun = me.props.onSlideChange;
                            if (fun && typeof fun === 'function') {
                                fun(swiper.activeIndex);
                            }
                        }
                    });
                }
            },
            {
                key: 'render',
                value: function render() {
                    var self = this;
                    return _react2.default.createElement('div', {
                        className: 'swiper-container',
                        id: 'swiper-container'
                    }, _react2.default.createElement('div', { className: 'swiper-wrapper' }, self.props.images.map(function (image) {
                        return _react2.default.createElement('div', {
                            key: image.id,
                            className: 'swiper-slide'
                        }, _react2.default.createElement('img', {
                            className: 'swiper-slide-img',
                            src: image.coverUrl,
                            'data-url': image.clickUrl,
                            onClick: self.jump
                        }));
                    })), _react2.default.createElement('div', { className: 'swiper-pagination' }));
                }
            }
        ]);
        return Carousel;
    }(_PageController3.default);
    Carousel.propTypes = {
        images: _react.PropTypes.array.isRequired,
        onSlideChange: _react.PropTypes.func,
        initialSlide: _react.PropTypes.number
    };
    Carousel.defaultProps = {
        initialSlide: 0,
        onSlideChange: function onSlideChange() {
        }
    };
    exports.default = Carousel;
    ;
});