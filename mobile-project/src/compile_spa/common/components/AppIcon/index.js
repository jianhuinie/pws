define(function (require, exports) {
    'use strict';
    var _react = require('react');
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
    var APP_ICON = {
        0: '',
        1: 'https://imgs.genshuixue.com/0cms/d/file/content/2017/04/58eb7e93724d7.png',
        2: ''
    };
    var Header = function (_React$Component) {
        _inherits(Header, _React$Component);
        function Header() {
            _classCallCheck(this, Header);
            return _possibleConstructorReturn(this, (Header.__proto__ || Object.getPrototypeOf(Header)).apply(this, arguments));
        }
        _createClass(Header, [{
                key: 'render',
                value: function render() {
                    return _react2.default.createElement('div', { className: 'app-icon ' + this.props.containerClass }, _react2.default.createElement('img', { src: APP_ICON[this.props.type] }));
                }
            }]);
        return Header;
    }(_react2.default.Component);
    Header.propTypes = {
        containerClass: _react.PropTypes.string,
        type: _react.PropTypes.number
    };
    Header.defaultProps = {
        containerClass: '',
        type: 1
    };
    ;
    exports.default = Header;
});