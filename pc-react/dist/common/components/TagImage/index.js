define(function (require, exports) {
    'use strict';
    var _react = require('react');
    (require('css-loader!./index.styl'))
    Object.defineProperty(exports, '__esModule', { value: true });
    exports.default = TagImage;
    var _react2 = _interopRequireDefault(_react);
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
    }
    function TagImage(props) {
        return _react2.default.createElement('div', { className: 'tag-image' }, _react2.default.createElement('img', {
            src: props.url,
            alt: 'tag',
            className: 'tag-image-picture'
        }), _react2.default.createElement('span', { className: 'tag-image-text' }, props.tag));
    }
});