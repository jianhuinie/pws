define(function (require, exports) {
    'use strict';
    var _react = require('react');
    (require('css-loader!./index.styl'))
    Object.defineProperty(exports, '__esModule', { value: true });
    var _react2 = _interopRequireDefault(_react);
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
    }
    function ResultTips(_ref) {
        var containerClass = _ref.containerClass, title = _ref.title, iconClass = _ref.iconClass;
        return _react2.default.createElement('div', { className: containerClass }, _react2.default.createElement('p', null, _react2.default.createElement('i', { className: 'icon ' + iconClass })), _react2.default.createElement('p', { className: 'tips' }, title));
    }
    ResultTips.propTypes = {
        containerClass: _react.PropTypes.string,
        title: _react.PropTypes.string.isRequired,
        iconClass: _react.PropTypes.string
    };
    ResultTips.defaultProps = {
        containerClass: 'success-tips',
        iconClass: 'icon-ic-success'
    };
    exports.default = ResultTips;
});