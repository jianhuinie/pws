define(function (require, exports) {
    'use strict';
    var _react = require('react');
    (require('css-loader!./index.styl'))
    Object.defineProperty(exports, '__esModule', { value: true });
    var _react2 = _interopRequireDefault(_react);
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
    }
    function StepTitle(_ref) {
        var title = _ref.title, title2 = _ref.title2;
        return _react2.default.createElement('div', { className: 'recruit-home-step-title' }, _react2.default.createElement('div', { className: 'title' }, _react2.default.createElement('p', null, title), _react2.default.createElement('p', null, title2)), _react2.default.createElement('div', null, _react2.default.createElement('i', { className: 'icon icon-caret-down' })));
    }
    exports.default = StepTitle;
});