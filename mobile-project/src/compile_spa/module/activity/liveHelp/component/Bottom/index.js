define(function (require, exports) {
    'use strict';
    var _react = require('react');
    var lazyLoadImage = require('common/lazyLoadImage');
    var app = require('common/app');
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
    var BottomContainer = function (_React$Component) {
        _inherits(BottomContainer, _React$Component);
        function BottomContainer(props) {
            _classCallCheck(this, BottomContainer);
            var _this = _possibleConstructorReturn(this, (BottomContainer.__proto__ || Object.getPrototypeOf(BottomContainer)).call(this, props));
            _this.playNumber = _this.playNumber.bind(_this);
            return _this;
        }
        _createClass(BottomContainer, [
            {
                key: 'componentDidMount',
                value: function componentDidMount() {
                    lazyLoadImage.init();
                }
            },
            {
                key: 'playNumber',
                value: function playNumber() {
                    if (app.isApp()) {
                        app.send('toMakePhoneCall', { phone_number: ' 4000-910-910' });
                    } else {
                        location.href = 'tel://4000-910-910';
                    }
                }
            },
            {
                key: 'render',
                value: function render() {
                    return _react2.default.createElement('div', { className: 'livehelp-bottom' }, _react2.default.createElement('div', { className: 'livehelp-bottom-main' }, _react2.default.createElement('i', { className: 'icon-heart livehelp-bottom-heart' }), _react2.default.createElement('span', { className: 'livehelp-bottom-sub' }, '感谢您的使用')), _react2.default.createElement('div', { className: 'livehelp-bottom-sub' }, _react2.default.createElement('span', { className: 'livehelp-bottom-sub-text' }, '服务热线\uFF1A'), _react2.default.createElement('span', {
                        className: 'livehelp-bottom-sub-number',
                        onClick: this.playNumber
                    }, '4000-910-910')), _react2.default.createElement('div', { className: 'livehelp-bottom-sub-fuwu' }, 'Copyright \xA9 2014 - 2017 北京百家互联科技有限公司版权所有.'));
                }
            }
        ]);
        return BottomContainer;
    }(_react2.default.Component);
    ;
    exports.default = BottomContainer;
});