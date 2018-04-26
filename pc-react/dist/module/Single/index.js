define(function (require, exports) {
    'use strict';
    var _react = require('react');
    Object.defineProperty(exports, '__esModule', { value: true });
    exports.default = Single;
    var _react2 = _interopRequireDefault(_react);
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
    }
    function Single(props) {
        return _react2.default.createElement('div', { className: 'child-page' }, props.children);
    }
});