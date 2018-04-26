define(function (require, exports) {
    'use strict';
    var _react = require('react');
    var _PageController2 = require('common/controller/PageController');
    var _index = require('gsx-design/component/lazyLoadImage/index');
    var _index3 = require('common/components/LivingAnimation/index');
    (require('css-loader!./index.styl'))
    Object.defineProperty(exports, '__esModule', { value: true });
    var _react2 = _interopRequireDefault(_react);
    var _PageController3 = _interopRequireDefault(_PageController2);
    var _index2 = _interopRequireDefault(_index);
    var _index4 = _interopRequireDefault(_index3);
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
    var enterDiscoveryContainer = function (_PageController) {
        _inherits(enterDiscoveryContainer, _PageController);
        function enterDiscoveryContainer(props) {
            _classCallCheck(this, enterDiscoveryContainer);
            var _this = _possibleConstructorReturn(this, (enterDiscoveryContainer.__proto__ || Object.getPrototypeOf(enterDiscoveryContainer)).call(this, props));
            _this.state = {};
            return _this;
        }
        _createClass(enterDiscoveryContainer, [
            {
                key: 'componentDidMount',
                value: function componentDidMount() {
                    var self = this;
                    if (self.props.show) {
                        _index2.default.init();
                    }
                }
            },
            {
                key: 'render',
                value: function render() {
                    var self = this;
                    return _react2.default.createElement('div', { className: self.props.show ? 'enter-discovery' : 'enter-discovery hide' }, _react2.default.createElement('div', { className: 'logo' }, _react2.default.createElement('img', { 'data-src': 'https://imgs.genshuixue.com/0cms/d/file/content/2018/01/5a587be58971a.png' })));
                }
            }
        ]);
        return enterDiscoveryContainer;
    }(_PageController3.default);
    ;
    exports.default = enterDiscoveryContainer;
});