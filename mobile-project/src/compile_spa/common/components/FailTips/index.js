define(function (require, exports) {
    'use strict';
    var _react = require('react');
    var _index = require('../ResultTips/index');
    (require('css-loader!./index.styl'))
    Object.defineProperty(exports, '__esModule', { value: true });
    var _react2 = _interopRequireDefault(_react);
    var _index2 = _interopRequireDefault(_index);
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
    }
    function FailTips(_ref) {
        var title = _ref.title;
        return _react2.default.createElement(_index2.default, {
            containerClass: 'fail-tips',
            title: title,
            iconClass: 'icon-icon-warning'
        });
    }
    FailTips.propTypes = { title: _react.PropTypes.string.isRequired };
    exports.default = FailTips;
});