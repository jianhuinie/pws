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
    var ImgItem = function (_React$Component) {
        _inherits(ImgItem, _React$Component);
        function ImgItem() {
            _classCallCheck(this, ImgItem);
            return _possibleConstructorReturn(this, (ImgItem.__proto__ || Object.getPrototypeOf(ImgItem)).apply(this, arguments));
        }
        _createClass(ImgItem, [
            {
                key: 'componentDidMount',
                value: function componentDidMount() {
                    lazyLoadImage.init();
                }
            },
            {
                key: 'jump',
                value: function jump(data) {
                    if (data && data.href) {
                        window.location.href = data.href;
                    }
                }
            },
            {
                key: 'render',
                value: function render() {
                    var self = this;
                    var data = self.props.item;
                    var baseWidth = 375;
                    var screenWidth = $(window).width();
                    var style = { height: data.height * screenWidth / baseWidth + 'px' };
                    return _react2.default.createElement('div', {
                        className: 'img-item',
                        onClick: self.jump.bind(self, data)
                    }, _react2.default.createElement('img', {
                        className: 'tpl-img',
                        'data-src': data.url,
                        alt: '',
                        style: style
                    }), _react2.default.createElement('p', { className: data.under_title ? '' : 'hide' }, data.under_title));
                }
            }
        ]);
        return ImgItem;
    }(_react2.default.Component);
    exports.default = ImgItem;
});