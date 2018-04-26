define(function (require, exports) {
    'use strict';
    var _react = require('react');
    var _index = require('gsx-design/component/ImagePlayer/index');
    Object.defineProperty(exports, '__esModule', { value: true });
    var _react2 = _interopRequireDefault(_react);
    var _index2 = _interopRequireDefault(_index);
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
    var ReactDemo = function (_React$Component) {
        _inherits(ReactDemo, _React$Component);
        function ReactDemo(props) {
            _classCallCheck(this, ReactDemo);
            var _this = _possibleConstructorReturn(this, (ReactDemo.__proto__ || Object.getPrototypeOf(ReactDemo)).call(this, props));
            _this.imagePlayer = new _index2.default([
                'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1514892569833&di=59a60e9990c8a373bca596fd734e73ef&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2Fa9d3fd1f4134970a8563d30d9fcad1c8a7865d84.jpg',
                'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1514892569833&di=7a30e3e169731b933f929f9184641d5b&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2Feac4b74543a9822673e327b98082b9014a90eb0a.jpg'
            ]);
            _this.imagePlayer.show();
            return _this;
        }
        _createClass(ReactDemo, [
            {
                key: 'componentDidMount',
                value: function componentDidMount() {
                    var _this2 = this;
                    window.setTimeout(function () {
                        _this2.imagePlayer.hide();
                    }, 2000);
                }
            },
            {
                key: 'componentWillUnmount',
                value: function componentWillUnmount() {
                    this.imagePlayer.destroy();
                }
            },
            {
                key: 'render',
                value: function render() {
                    return _react2.default.createElement('div', null, 'gsx-design-m的alert测试');
                }
            }
        ]);
        return ReactDemo;
    }(_react2.default.Component);
    exports.default = ReactDemo;
    ;
});