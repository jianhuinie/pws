define(function (require) {
    var _react = require('react');
    var _reactDom = require('react-dom');
    var _index = require('./index');
    'use strict';
    var _react2 = _interopRequireDefault(_react);
    var _reactDom2 = _interopRequireDefault(_reactDom);
    var _index2 = _interopRequireDefault(_index);
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
    }
    _reactDom2.default.render(_react2.default.createElement(_index2.default, null), document.getElementById('app'));
});