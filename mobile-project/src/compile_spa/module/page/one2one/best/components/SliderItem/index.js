define(function (require, exports) {
    'use strict';
    var _react = require('react');
    var lazyLoadImage = require('common/lazyLoadImage');
    var SlideImageControl = require('common/ui/slideImageControl/slideImageControl');
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
    var SliderItem = function (_React$Component) {
        _inherits(SliderItem, _React$Component);
        function SliderItem(props) {
            _classCallCheck(this, SliderItem);
            var _this = _possibleConstructorReturn(this, (SliderItem.__proto__ || Object.getPrototypeOf(SliderItem)).call(this, props));
            _this.clickHandler = _this.clickHandler.bind(_this);
            return _this;
        }
        _createClass(SliderItem, [
            {
                key: 'componentDidMount',
                value: function componentDidMount() {
                    var self = this;
                    self.initSlider();
                }
            },
            {
                key: 'initSlider',
                value: function initSlider() {
                    var cContain = $('.top-sliders-container');
                    var bullets = cContain.find('.slide_position li');
                    var curimage = new SlideImageControl(cContain[0], {
                        auto: 3000,
                        continuous: true,
                        callback: lazyloadSlideImg
                    });
                    function lazyloadSlideImg(index) {
                        var dom = curimage.slides[index];
                        if (!dom.imageLoaded) {
                            lazyLoadImage.init(dom);
                            dom.imageLoaded = true;
                        }
                        bullets.removeClass('on');
                        bullets.eq(index).addClass('on');
                    }
                    lazyloadSlideImg(curimage.get('index'));
                }
            },
            {
                key: 'clickHandler',
                value: function clickHandler(value) {
                    if (value && value.url) {
                        window.location.href = value.url;
                    }
                }
            },
            {
                key: 'render',
                value: function render() {
                    var self = this;
                    var dataList = self.props.item;
                    var imgComponents = dataList.map(function (value, key) {
                        return _react2.default.createElement('li', {
                            className: 'slide',
                            key: value.img,
                            'data-index': key
                        }, _react2.default.createElement('div', {
                            'data-url': value.img,
                            className: 'logClick showClick'
                        }, _react2.default.createElement('img', {
                            width: '100%',
                            height: '100%',
                            className: 'img',
                            'data-src': value.img
                        })));
                    });
                    var positionComponents = dataList.map(function (item, index) {
                        return _react2.default.createElement('li', {
                            key: item.img,
                            className: index ? '' : 'on'
                        }, _react2.default.createElement('span', null));
                    });
                    return _react2.default.createElement('div', { className: 'top-slider top-sliders-container myslider' }, _react2.default.createElement('ul', { className: 'slide_group clearfix' }, imgComponents), _react2.default.createElement('ul', { className: 'slide_position clearfix' }, positionComponents));
                }
            }
        ]);
        return SliderItem;
    }(_react2.default.Component);
    ;
    exports.default = SliderItem;
});