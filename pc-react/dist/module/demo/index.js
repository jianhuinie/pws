define(function (require, exports) {
    'use strict';
    var _react = require('react');
    var _reactRouter = require('react-router');
    var _antd = require('antd');
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
    var IndexDemo = function (_React$Component) {
        _inherits(IndexDemo, _React$Component);
        function IndexDemo() {
            _classCallCheck(this, IndexDemo);
            return _possibleConstructorReturn(this, (IndexDemo.__proto__ || Object.getPrototypeOf(IndexDemo)).apply(this, arguments));
        }
        _createClass(IndexDemo, [{
                key: 'render',
                value: function render() {
                    return _react2.default.createElement('div', null, _react2.default.createElement(_antd.Button, { type: 'primary' }, '搜索'), _react2.default.createElement('h3', null, 'demo示例\uFF1A'), _react2.default.createElement('ul', { role: 'nav' }, _react2.default.createElement('li', null, _react2.default.createElement(_reactRouter.Link, { to: '/demo/react' }, 'react组件写法')), _react2.default.createElement('li', null, _react2.default.createElement(_reactRouter.Link, { to: '/demo/styl' }, 'styl使用方式')), _react2.default.createElement('li', null, _react2.default.createElement(_reactRouter.Link, { to: '/demo/ajax' }, 'ajax使用方式')), _react2.default.createElement('li', null, _react2.default.createElement(_reactRouter.Link, { to: '/demo/async' }, 'async使用方式')), _react2.default.createElement('li', null, _react2.default.createElement(_reactRouter.Link, { to: '/demo/react-redux' }, 'react-redux使用方式'))), _react2.default.createElement(_antd.Button, { className: 'pink-btn classic-btn md-' }, '这里'), this.props.children);
                }
            }]);
        return IndexDemo;
    }(_react2.default.Component);
    IndexDemo.propTypes = { children: _react.PropTypes.element };
    IndexDemo.defaultProps = { children: '' };
    exports.default = IndexDemo;
});