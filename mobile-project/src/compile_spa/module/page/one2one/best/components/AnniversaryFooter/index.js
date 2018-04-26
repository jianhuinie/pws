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
    var AnniversaryFooter = function (_React$Component) {
        _inherits(AnniversaryFooter, _React$Component);
        function AnniversaryFooter() {
            _classCallCheck(this, AnniversaryFooter);
            return _possibleConstructorReturn(this, (AnniversaryFooter.__proto__ || Object.getPrototypeOf(AnniversaryFooter)).apply(this, arguments));
        }
        _createClass(AnniversaryFooter, [{
                key: 'render',
                value: function render() {
                    var self = this;
                    var data = self.props.item || {};
                    var dataList = data.content || [];
                    var textComponents = dataList.map(function (value) {
                        return _react2.default.createElement('p', {
                            className: '',
                            key: value.text
                        }, value.text);
                    });
                    return _react2.default.createElement('div', { className: 'anniversary-footer-item' }, textComponents);
                }
            }]);
        return AnniversaryFooter;
    }(_react2.default.Component);
    exports.default = AnniversaryFooter;
});