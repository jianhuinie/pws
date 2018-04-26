define(function (require, exports) {
    'use strict';
    var _react = require('react');
    var _reactDom = require('react-dom');
    var _Component = require('./Component');
    (require('css-loader!./main.styl'))
    Object.defineProperty(exports, '__esModule', { value: true });
    var _react2 = _interopRequireDefault(_react);
    var _reactDom2 = _interopRequireDefault(_reactDom);
    var _Component2 = _interopRequireDefault(_Component);
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
    }
    function StyleDemo() {
        return _react2.default.createElement(_Component2.default, {
            classProp: 'test',
            content: 'style demo'
        });
    }
    exports.default = StyleDemo;
});