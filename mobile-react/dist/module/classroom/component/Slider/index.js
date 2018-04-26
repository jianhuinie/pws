define(function (require, exports) {
    'use strict';
    var _react = require('react');
    var _PageController2 = require('common/controller/PageController');
    var _swiper = require('swiper');
    (require('css-loader!./index.styl'))
    Object.defineProperty(exports, '__esModule', { value: true });
    var _react2 = _interopRequireDefault(_react);
    var _PageController3 = _interopRequireDefault(_PageController2);
    var _swiper2 = _interopRequireDefault(_swiper);
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
    var swiper = void 0;
    var Slider = function (_PageController) {
        _inherits(Slider, _PageController);
        function Slider(props) {
            _classCallCheck(this, Slider);
            var _this = _possibleConstructorReturn(this, (Slider.__proto__ || Object.getPrototypeOf(Slider)).call(this, props));
            _this.state = {};
            return _this;
        }
        _createClass(Slider, [
            {
                key: 'componentDidMount',
                value: function componentDidMount() {
                    swiper = new _swiper2.default('.swiper-container', {
                        direction: 'vertical',
                        loop: true,
                        pagination: '.swiper-pagination'
                    });
                }
            },
            {
                key: 'render',
                value: function render() {
                    var self = this;
                    return _react2.default.createElement('div', { className: 'class-room' }, _react2.default.createElement('div', { className: 'swiper-container' }, _react2.default.createElement('div', { className: 'swiper-wrapper' }, _react2.default.createElement('div', { className: 'swiper-slide' }, 'Slide 1'), _react2.default.createElement('div', { className: 'swiper-slide' }, 'Slide 2'), _react2.default.createElement('div', { className: 'swiper-slide' }, 'Slide 3')), _react2.default.createElement('div', { className: 'swiper-pagination' })));
                }
            }
        ]);
        return Slider;
    }(_PageController3.default);
    ;
    exports.default = Slider;
});