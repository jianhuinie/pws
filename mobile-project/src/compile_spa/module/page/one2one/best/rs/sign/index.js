define(function (require, exports) {
    'use strict';
    var _react = require('react');
    var setShare = require('common/share/initialize');
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
    var SignContainer = function (_React$Component) {
        _inherits(SignContainer, _React$Component);
        function SignContainer() {
            _classCallCheck(this, SignContainer);
            return _possibleConstructorReturn(this, (SignContainer.__proto__ || Object.getPrototypeOf(SignContainer)).apply(this, arguments));
        }
        _createClass(SignContainer, [
            {
                key: 'componentDidMount',
                value: function componentDidMount() {
                    setShare({
                        title: '优选一对一邀请您签约',
                        content: '优质生源推荐\uFF0C专属助教服务\uFF0C让您专注教学\uFF0C快来加入我们吧',
                        img: 'https://imgs.genshuixue.com/0cms/d/file/content/2017/04/58eb7e93724d7.png',
                        url: location.href
                    });
                }
            },
            {
                key: 'render',
                value: function render() {
                    app.setPageTitle('优选1对1签约');
                    return _react2.default.createElement('div', { className: 'sign' }, this.props.children);
                }
            }
        ]);
        return SignContainer;
    }(_react2.default.Component);
    SignContainer.propTypes = { children: _react2.default.PropTypes.element };
    SignContainer.defaultProps = { children: '' };
    ;
    exports.default = SignContainer;
});