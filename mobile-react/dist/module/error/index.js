define(function (require, exports) {
    'use strict';
    var _react = require('react');
    var _PageController2 = require('common/controller/PageController');
    var _index = require('gsx-design/component/lazyLoadImage/index');
    (require('css-loader!./index.styl'))
    Object.defineProperty(exports, '__esModule', { value: true });
    var _react2 = _interopRequireDefault(_react);
    var _PageController3 = _interopRequireDefault(_PageController2);
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
    var num = 3;
    var errorContainer = function (_PageController) {
        _inherits(errorContainer, _PageController);
        function errorContainer(props) {
            _classCallCheck(this, errorContainer);
            var _this = _possibleConstructorReturn(this, (errorContainer.__proto__ || Object.getPrototypeOf(errorContainer)).call(this, props));
            _this.state = { secondNum: num };
            return _this;
        }
        _createClass(errorContainer, [
            {
                key: 'componentDidMount',
                value: function componentDidMount() {
                    var self = this;
                    _index2.default.init();
                    var timer = setInterval(function () {
                        if (num > 0) {
                            var secondNum = --num;
                            self.setState({ secondNum: secondNum });
                        } else {
                            location.href = '/mweb/discovery/';
                        }
                    }, 1000);
                }
            },
            {
                key: 'render',
                value: function render() {
                    var self = this;
                    return _react2.default.createElement('div', { className: 'error-page' }, _react2.default.createElement('div', { className: 'error-text' }, _react2.default.createElement('div', null, '糟糕\uFF0C页面潜水去了'), _react2.default.createElement('div', null, '等待 ', _react2.default.createElement('span', null, self.state.secondNum), ' 秒返回微师首页')), _react2.default.createElement('img', { 'data-src': 'https://imgs.genshuixue.com/0cms/d/file/content/2018/02/5a8961f975be2.png' }));
                }
            }
        ]);
        return errorContainer;
    }(_PageController3.default);
    ;
    exports.default = errorContainer;
});